import type { AreaData } from '../data/mockAreas'

interface Props {
  areas: AreaData[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function AreaSelector({ areas, selectedId, onSelect }: Props) {
  return (
    <div className="selector" role="radiogroup" aria-label="Selecione um talhão">
      {areas.map((area) => {
        const active = area.id === selectedId
        return (
          <button
            key={area.id}
            className={`area-opt ${active ? 'active' : ''}`}
            onClick={() => onSelect(area.id)}
            role="radio"
            aria-checked={active}
          >
            <span className="area-dot" style={{ background: area.color }} />
            <span className="meta">
              <strong>{area.name}</strong>
              <span>{area.subtitle}</span>
            </span>
            <span className="pin">
              {area.center[0].toFixed(3)}, {area.center[1].toFixed(3)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
