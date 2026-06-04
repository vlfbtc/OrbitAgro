interface Props {
  paragraphs: string[]
}

export default function DiagnosisPanel({ paragraphs }: Props) {
  return (
    <div className="diag">
      <div className="head">
        <span className="ico" aria-hidden="true">
          🧭
        </span>
        <h4>Diagnóstico interpretativo</h4>
      </div>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}
