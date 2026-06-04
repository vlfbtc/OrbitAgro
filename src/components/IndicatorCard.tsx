interface Props {
  icon: string
  label: string
  value: string
  unit?: string
  level?: { text: string; tone: 'ok' | 'warn' | 'danger' }
}

export default function IndicatorCard({ icon, label, value, unit, level }: Props) {
  return (
    <div className="ind-card">
      <div className="top">
        <span className="label">{label}</span>
        <span className="ico" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="val">
        {value}
        {unit && <small>{unit}</small>}
      </div>
      {level && <div className={`lvl ${level.tone}`}>{level.text}</div>}
    </div>
  )
}
