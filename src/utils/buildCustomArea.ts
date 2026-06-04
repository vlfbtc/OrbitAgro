import type { AreaData, Indicators, RiskLevel } from '../data/mockAreas'

export type LatLngTuple = [number, number]

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const riskFromValue = (value: number): RiskLevel => {
  if (value >= 70) return 'alto'
  if (value >= 35) return 'moderado'
  return 'baixo'
}

const random01 = (seed: number, salt: number) => {
  const x = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const centroid = (polygon: LatLngTuple[]): LatLngTuple => {
  const total = polygon.reduce<[number, number]>(
    (acc, point) => [acc[0] + point[0], acc[1] + point[1]],
    [0, 0],
  )

  return [total[0] / polygon.length, total[1] / polygon.length]
}

const hectaresFromPolygon = (polygon: LatLngTuple[]): number => {
  if (polygon.length < 3) return 0

  const earthRadius = 6378137
  const [lat0] = centroid(polygon)
  const lat0Rad = (lat0 * Math.PI) / 180

  const pointsMeters = polygon.map(([lat, lng]) => {
    const x = ((lng * Math.PI) / 180) * earthRadius * Math.cos(lat0Rad)
    const y = ((lat * Math.PI) / 180) * earthRadius
    return [x, y] as const
  })

  let areaM2 = 0
  for (let i = 0; i < pointsMeters.length; i += 1) {
    const [x1, y1] = pointsMeters[i]
    const [x2, y2] = pointsMeters[(i + 1) % pointsMeters.length]
    areaM2 += x1 * y2 - x2 * y1
  }

  return Math.max(1, Math.round(Math.abs(areaM2) / 2 / 10000))
}

const buildIndicators = (seed: number): Indicators => {
  const ndvi = clamp(0.3 + random01(seed, 1) * 0.48, 0.25, 0.82)
  const droughtRisk = Math.round(clamp(10 + random01(seed, 2) * 80, 8, 92))
  const temperature = Math.round(clamp(24 + random01(seed, 3) * 14, 22, 40))
  const stressArea = Math.round(clamp(6 + random01(seed, 4) * 42, 3, 58))
  const anomaly = Math.round(clamp(8 + random01(seed, 5) * 82, 6, 94))

  return {
    ndvi,
    temperature,
    droughtRisk,
    droughtLevel: riskFromValue(droughtRisk),
    stressArea,
    anomaly,
    anomalyLevel: riskFromValue(anomaly),
  }
}

const buildHistory = (seed: number, currentNdvi: number) => {
  const start = clamp(currentNdvi + (random01(seed, 6) - 0.5) * 0.24, 0.2, 0.86)

  return months.map((month, index) => {
    const t = index / (months.length - 1)
    const base = start + (currentNdvi - start) * t
    const noise = (random01(seed, 10 + index) - 0.5) * 0.04

    return {
      mes: month,
      ndvi: Number(clamp(base + noise, 0.15, 0.9).toFixed(2)),
    }
  })
}

export function buildCustomArea(polygon: LatLngTuple[]): AreaData {
  const baseSeed = polygon.reduce((acc, [lat, lng], index) => {
    const factor = index + 1
    return acc + lat * 1000 * factor + lng * 1000 * (factor + 7)
  }, 0)

  const center = centroid(polygon)
  const hectares = hectaresFromPolygon(polygon)
  const indicators = buildIndicators(baseSeed)
  const previousScore = Math.round(clamp(38 + random01(baseSeed, 40) * 52, 30, 94))

  const uniqueId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`

  return {
    id: `custom-${uniqueId}`,
    name: 'Área Personalizada',
    subtitle: `Polígono desenhado · ~${hectares} ha`,
    color: '#38bdf8',
    polygon,
    center,
    hectares,
    indicators,
    ndviHistory: buildHistory(baseSeed, indicators.ndvi),
    previousScore,
  }
}