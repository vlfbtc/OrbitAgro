const sources = [
  'Sentinel Hub',
  'Copernicus Sentinel-2',
  'NASA Earthdata',
  'Open-Meteo',
  'INMET',
  'MapBiomas',
  'Google Earth Engine',
  'Leaflet',
  'Mapbox',
  'OpenStreetMap',
]

export default function MethodologySection() {
  return (
    <section className="section" id="metodologia">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Como funciona</span>
          <h2>Metodologia e transparência</h2>
          <p>
            O OrbitAgro foi desenhado para ser honesto sobre o que é simulação e o que seria
            integração real. A arquitetura já prevê a troca da camada de dados sem reescrever a
            interface.
          </p>
        </div>

        <div className="method-grid">
          <div className="method-list">
            <div className="method-item">
              <h4>🛰️ Indicadores considerados</h4>
              <p>
                NDVI (vigor da vegetação), temperatura de superfície, risco de seca, percentual de
                área sob estresse e nível de anomalia — derivados de sensoriamento remoto.
              </p>
            </div>
            <div className="method-item">
              <h4>🧮 Score explicável</h4>
              <p>
                A nota de 0 a 100 combina NDVI (40%), risco de seca (25%), temperatura (20%) e
                anomalia/estresse (15%). É um modelo simples e auditável, não uma caixa-preta.
              </p>
            </div>
            <div className="method-item">
              <h4>🧪 Dados simulados nesta versão</h4>
              <p>
                Os três talhões usam dados mockados coerentes para demonstrar o fluxo completo da
                solução. Nenhuma chamada a satélite real é feita neste MVP.
              </p>
            </div>
            <div className="method-item">
              <h4>🔌 Integração futura</h4>
              <p>
                A camada de dados é isolada: bastaria substituir os mocks por chamadas a APIs de
                imagem orbital e clima, mantendo a mesma interface e lógica de diagnóstico.
              </p>
            </div>
          </div>

          <div className="info-card">
            <span className="tag" style={{ color: 'var(--space)' }}>
              Fontes que poderiam alimentar a versão real
            </span>
            <p style={{ color: 'var(--text-soft)', marginBottom: 4 }}>
              O OrbitAgro foi pensado para consumir dados públicos e abertos de observação da
              Terra:
            </p>
            <div className="sources">
              {sources.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <div className="notice" style={{ marginTop: 22 }}>
              <span className="ico" aria-hidden="true">
                ⚠️
              </span>
              <div>
                <h4>Limitação do MVP</h4>
                <p>
                  Não substitui avaliação técnica presencial, análise agronômica ou laboratorial.
                  O foco é demonstrar a experiência e a lógica de tradução de dados espaciais em
                  decisão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
