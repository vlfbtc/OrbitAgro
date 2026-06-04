import { useCallback, useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import type { AreaData } from '../data/mockAreas'
import type { LatLngTuple } from '../utils/buildCustomArea.ts'

type DrawMode = 'polygon' | 'rectangle'

const toRectangle = (start: LatLngTuple, end: LatLngTuple): LatLngTuple[] => {
  const minLat = Math.min(start[0], end[0])
  const maxLat = Math.max(start[0], end[0])
  const minLng = Math.min(start[1], end[1])
  const maxLng = Math.max(start[1], end[1])

  return [
    [maxLat, minLng],
    [maxLat, maxLng],
    [minLat, maxLng],
    [minLat, minLng],
  ]
}

interface Props {
  areas: AreaData[]
  selectedId: string | null
  onSelect: (id: string) => void
  onCreateArea: (polygon: LatLngTuple[]) => void
  onClearCustomAreas: () => void
  hasCustomAreas: boolean
}

export default function MapSection({
  areas,
  selectedId,
  onSelect,
  onCreateArea,
  onClearCustomAreas,
  hasCustomAreas,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layersRef = useRef<Record<string, L.Polygon>>({})
  const hasFittedRef = useRef(false)
  const draftLayerRef = useRef<L.Polyline | L.Polygon | L.CircleMarker | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawMode, setDrawMode] = useState<DrawMode>('polygon')
  const [draftPoints, setDraftPoints] = useState<LatLngTuple[]>([])
  const [previewPoint, setPreviewPoint] = useState<LatLngTuple | null>(null)

  // mantem o onSelect mais recente sem reinicializar o mapa
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect
  const onCreateAreaRef = useRef(onCreateArea)
  onCreateAreaRef.current = onCreateArea

  const isDrawingRef = useRef(isDrawing)
  isDrawingRef.current = isDrawing

  const drawModeRef = useRef(drawMode)
  drawModeRef.current = drawMode

  const draftPointsRef = useRef(draftPoints)
  draftPointsRef.current = draftPoints

  // inicializa o mapa uma unica vez
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [-19.5945, -47.9612],
      zoom: 14,
      zoomControl: true,
      doubleClickZoom: false,
      attributionControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map)

    map.on('click', (event) => {
      if (!isDrawingRef.current) return

      if (drawModeRef.current === 'rectangle') {
        const point: LatLngTuple = [event.latlng.lat, event.latlng.lng]
        const points = draftPointsRef.current

        if (points.length === 0) {
          setDraftPoints([point])
          setPreviewPoint(point)
          return
        }

        const rectangle = toRectangle(points[0], point)
        onCreateAreaRef.current(rectangle)
        setDraftPoints([])
        setPreviewPoint(null)
        setIsDrawing(false)
        return
      }

      setDraftPoints((previous) => [...previous, [event.latlng.lat, event.latlng.lng]])
    })

    map.on('mousemove', (event) => {
      if (!isDrawingRef.current || drawModeRef.current !== 'rectangle') return
      if (draftPointsRef.current.length !== 1) return
      setPreviewPoint([event.latlng.lat, event.latlng.lng])
    })

    return () => {
      hasFittedRef.current = false
      map.remove()
      mapRef.current = null
      layersRef.current = {}
      draftLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const nextIds = new Set(areas.map((area) => area.id))

    Object.entries(layersRef.current).forEach(([id, layer]) => {
      if (!nextIds.has(id)) {
        map.removeLayer(layer)
        delete layersRef.current[id]
      }
    })

    areas.forEach((area) => {
      if (layersRef.current[area.id]) return

      const poly = L.polygon(area.polygon, {
        color: area.color,
        weight: 2,
        fillColor: area.color,
        fillOpacity: 0.18,
      })
        .addTo(map)
        .bindTooltip(`${area.name} · ${area.subtitle}`, { sticky: true })
        .on('click', () => {
          if (isDrawingRef.current) return
          onSelectRef.current(area.id)
        })

      layersRef.current[area.id] = poly
    })

    if (!hasFittedRef.current && Object.values(layersRef.current).length > 0) {
      const group = L.featureGroup(Object.values(layersRef.current))
      map.fitBounds(group.getBounds().pad(0.25))
      hasFittedRef.current = true
    }
  }, [areas])

  // atualiza destaque ao trocar a selecao
  useEffect(() => {
    Object.entries(layersRef.current).forEach(([id, poly]) => {
      const active = id === selectedId
      poly.setStyle({
        weight: active ? 4 : 2,
        fillOpacity: active ? 0.4 : 0.18,
        dashArray: active ? undefined : '4 4',
      })
      if (active) {
        poly.bringToFront()
        mapRef.current?.flyToBounds(poly.getBounds().pad(0.4), { duration: 0.6 })
      }
    })
  }, [selectedId])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (draftLayerRef.current) {
      map.removeLayer(draftLayerRef.current)
      draftLayerRef.current = null
    }

    if (!isDrawing || draftPoints.length === 0) {
      map.getContainer().style.cursor = ''
      return
    }

    map.getContainer().style.cursor = 'crosshair'

    if (drawMode === 'rectangle') {
      if (draftPoints.length === 1 && previewPoint) {
        draftLayerRef.current = L.polygon(toRectangle(draftPoints[0], previewPoint), {
          color: '#38bdf8',
          weight: 2,
          fillColor: '#38bdf8',
          fillOpacity: 0.2,
          dashArray: '5 4',
        }).addTo(map)
        return
      }

      draftLayerRef.current = L.circleMarker(draftPoints[0], {
        radius: 5,
        color: '#38bdf8',
        fillColor: '#38bdf8',
        fillOpacity: 0.8,
      }).addTo(map)
      return
    }

    if (draftPoints.length >= 3) {
      draftLayerRef.current = L.polygon(draftPoints, {
        color: '#38bdf8',
        weight: 2,
        fillColor: '#38bdf8',
        fillOpacity: 0.18,
        dashArray: '6 6',
      }).addTo(map)
      return
    }

    draftLayerRef.current = L.polyline(draftPoints, {
      color: '#38bdf8',
      weight: 2,
      dashArray: '6 6',
    }).addTo(map)
  }, [draftPoints, drawMode, isDrawing, previewPoint])

  const handleStartDraw = (mode: DrawMode) => {
    setDrawMode(mode)
    setDraftPoints([])
    setPreviewPoint(null)
    setIsDrawing(true)
  }

  const handleCancelDraw = () => {
    setDraftPoints([])
    setPreviewPoint(null)
    setIsDrawing(false)
  }

  const handleFinishDraw = useCallback(() => {
    if (draftPoints.length < 3) return
    onCreateAreaRef.current(draftPoints)
    setDraftPoints([])
    setPreviewPoint(null)
    setIsDrawing(false)
  }, [draftPoints])

  const isPolygonMode = drawMode === 'polygon'
  const canFinishPolygon = isPolygonMode && draftPoints.length >= 3

  return (
    <div>
      <div ref={containerRef} id="map" role="application" aria-label="Mapa de talhões agrícolas" />
      <div className="map-tools">
        {!isDrawing ? (
          <>
            <button className="btn-map primary" onClick={() => handleStartDraw('rectangle')}>
              Retângulo rápido (2 cliques)
            </button>
            <button className="btn-map" onClick={() => handleStartDraw('polygon')}>
              Polígono livre
            </button>
          </>
        ) : (
          <>
            {isPolygonMode && (
              <button className="btn-map primary" onClick={handleFinishDraw} disabled={!canFinishPolygon}>
                Concluir polígono ({draftPoints.length} pontos)
              </button>
            )}
            <button className="btn-map" onClick={handleCancelDraw}>
              Cancelar desenho
            </button>
          </>
        )}

        {hasCustomAreas && !isDrawing && (
          <button className="btn-map" onClick={onClearCustomAreas}>
            Limpar áreas personalizadas
          </button>
        )}

        <span className="map-tools-hint">
          {isDrawing
            ? isPolygonMode
              ? 'Modo polígono: clique para adicionar vértices. Conclua com 3 pontos ou mais.'
              : 'Modo retângulo: clique no primeiro canto e depois no canto oposto.'
            : 'Use retângulo rápido para delimitar talhões regulares ou polígono livre para contornos complexos.'}
        </span>
      </div>
    </div>
  )
}
