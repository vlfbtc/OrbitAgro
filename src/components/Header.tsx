export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="OrbitAgro - inicio">
          <span className="brand-logo">
            <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="20" fill="none" stroke="#1f3a5f" strokeWidth="2" />
              <circle cx="32" cy="32" r="13" fill="#0f2d3a" />
              <path d="M32 40c0-6 5-11 11-11-1 7-5 11-11 11z" fill="#4ade80" />
              <path d="M32 40c0-6-5-11-11-11 1 7 5 11 11 11z" fill="#22c55e" />
              <circle cx="48" cy="16" r="3" fill="#38bdf8" />
            </svg>
          </span>
          <span className="brand-name">
            Orbit<b>Agro</b>
          </span>
        </a>

        <nav className="nav">
          <a href="#problema">O problema</a>
          <a href="#analise">Analisar área</a>
          <a href="#metodologia">Metodologia</a>
          <a className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: 14 }} href="#analise">
            Demonstração
          </a>
        </nav>
      </div>
    </header>
  )
}
