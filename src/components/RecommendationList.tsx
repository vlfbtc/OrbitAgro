interface Props {
  items: string[]
}

export default function RecommendationList({ items }: Props) {
  return (
    <div>
      <div className="diag" style={{ borderLeftColor: 'var(--leaf)', background: 'transparent', padding: 0, border: 0 }}>
        <div className="head" style={{ marginBottom: 14 }}>
          <span className="ico" aria-hidden="true">
            ✅
          </span>
          <h4>Recomendações práticas</h4>
        </div>
      </div>
      <div className="recs">
        {items.map((rec, i) => (
          <div className="rec" key={i}>
            <span className="num">{i + 1}</span>
            <p>{rec}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
