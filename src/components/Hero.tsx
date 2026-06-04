export default function Hero() {
  const scrollToAnalysis = () =>
    document.getElementById('analise')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="fade-up">
          <span className="eyebrow">Global Solution FIAP · Space Connect</span>
          <h1>
            Do satélite ao <span className="grad">campo</span>: dados espaciais que viram decisão.
          </h1>
          <p className="hero-sub">
            O OrbitAgro transforma dados de satélite e sensoriamento remoto em diagnósticos
            simples, visuais e acionáveis sobre a saúde de áreas agrícolas — sem jargão técnico.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={scrollToAnalysis}>
              🛰️ Analisar uma área
            </button>
            <a className="btn btn-ghost" href="#problema">
              Entender o problema
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">0.43→</div>
              <div className="lbl">de índice cru a diagnóstico</div>
            </div>
            <div className="hero-stat">
              <div className="num">3</div>
              <div className="lbl">talhões para explorar</div>
            </div>
            <div className="hero-stat">
              <div className="num">100%</div>
              <div className="lbl">em linguagem do produtor</div>
            </div>
          </div>
        </div>

        <div className="orbit-vis fade-up" style={{ animationDelay: '0.12s' }} aria-hidden="true">
          <div className="orbit-ring" />
          <div className="orbit-ring r2" />
          <div className="orbit-ring r3" />
          <div className="orbit-planet">
            <div className="scan-beam" />
          </div>
          <div className="satellite">
            <span className="sat-body" />
            <span className="sat-panel left" />
            <span className="sat-panel right" />
            <span className="sat-antenna" />
          </div>
        </div>
      </div>
    </section>
  )
}
