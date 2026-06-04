import { useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MapSection from './components/MapSection'
import AreaSelector from './components/AreaSelector'
import Dashboard from './components/Dashboard'
import MethodologySection from './components/MethodologySection'
import Footer from './components/Footer'
import { areas } from './data/mockAreas'
import { calculateScore, type ScoreResult } from './utils/calculateScore'
import { generateDiagnosis, type Diagnosis } from './utils/generateDiagnosis'
import { buildCustomArea, type LatLngTuple } from './utils/buildCustomArea.ts'

interface Analysis {
  areaId: string
  score: ScoreResult
  diagnosis: Diagnosis
}

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [customAreas, setCustomAreas] = useState<Array<ReturnType<typeof buildCustomArea>>>([])
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const allAreas = useMemo(() => [...areas, ...customAreas], [customAreas])

  const selectedArea = useMemo(
    () => (selectedId ? allAreas.find((area) => area.id === selectedId) : undefined),
    [selectedId, allAreas],
  )

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setAnalysis(null) // exige nova analise ao trocar de talhao
  }

  const handleCreateCustomArea = (polygon: LatLngTuple[]) => {
    const generatedArea = buildCustomArea(polygon)
    setCustomAreas((previous) => [...previous, generatedArea])
    setSelectedId(generatedArea.id)
    setAnalysis(null)
  }

  const handleClearCustomAreas = () => {
    if (customAreas.length === 0) return

    const customIds = new Set(customAreas.map((area) => area.id))

    if (analysis?.areaId && customIds.has(analysis.areaId)) {
      setAnalysis(null)
    }
    if (selectedId && customIds.has(selectedId)) {
      setSelectedId(null)
    }

    setCustomAreas([])
  }

  const handleAnalyze = () => {
    if (!selectedArea) return
    setAnalyzing(true)
    // simula o "processamento" de dados orbitais
    setTimeout(() => {
      const score = calculateScore(selectedArea.indicators)
      const diagnosis = generateDiagnosis(
        selectedArea,
        selectedArea.indicators,
        score.level,
        score.score,
      )
      setAnalysis({ areaId: selectedArea.id, score, diagnosis })
      setAnalyzing(false)
    }, 750)
  }

  const resultArea = useMemo(
    () => (analysis ? allAreas.find((area) => area.id === analysis.areaId) : undefined),
    [analysis, allAreas],
  )

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* problema + solução */}
        <section className="section" id="problema">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Por que isso importa</span>
              <h2>Os dados existem. A decisão, não.</h2>
              <p>
                Pequenos e médios produtores raramente conseguem transformar dados ambientais e
                orbitais em decisões rápidas e compreensíveis sobre a saúde da lavoura.
              </p>
            </div>

            <div className="duo">
              <div className="info-card prob">
                <span className="tag">O problema</span>
                <h3>Dados técnicos demais para decidir no campo</h3>
                <p>
                  Mesmo quando os dados existem, costumam ser técnicos, caros ou inacessíveis.
                  Atrasos em identificar seca, queda de vigor ou estresse hídrico geram perda de
                  produtividade, desperdício de água e insumos, e mais risco financeiro.
                </p>
              </div>
              <div className="info-card sol">
                <span className="tag">A solução</span>
                <h3>Uma camada de interpretação entre o satélite e o produtor</h3>
                <p>
                  Com base em NDVI, temperatura, risco de seca e anomalias, o OrbitAgro interpreta
                  a condição da área selecionada e gera recomendações práticas em linguagem
                  simples — não apenas números crus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* analisador */}
        <section className="section" id="analise">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Demonstração interativa</span>
              <h2>Selecione uma área e gere o diagnóstico</h2>
              <p>
                Escolha um talhão no mapa ou na lista, clique em <strong>Analisar área</strong> e
                veja os dados orbitais virarem decisão.
              </p>
            </div>

            <div className="analyzer-layout">
              {/* painel esquerdo: mapa + seletor + ação */}
              <div className="panel">
                <div className="panel-head">
                  <h3>🗺️ Área de interesse</h3>
                  <span className="hint">OpenStreetMap · talhões simulados</span>
                </div>
                <MapSection
                  areas={allAreas}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  onCreateArea={handleCreateCustomArea}
                  onClearCustomAreas={handleClearCustomAreas}
                  hasCustomAreas={customAreas.length > 0}
                />
                <div className="panel-body">
                  <AreaSelector areas={allAreas} selectedId={selectedId} onSelect={handleSelect} />
                  <div className="analyze-row">
                    <button
                      className="btn btn-primary"
                      onClick={handleAnalyze}
                      disabled={!selectedArea || analyzing}
                    >
                      {analyzing ? '🛰️ Processando dados…' : '🛰️ Analisar área'}
                    </button>
                  </div>
                  {!selectedArea && (
                    <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 12 }}>
                      Selecione um talhão para habilitar a análise.
                    </p>
                  )}
                </div>
              </div>

              {/* painel direito: dashboard */}
              <div className="panel">
                <div className="panel-head">
                  <h3>📊 Diagnóstico da área</h3>
                  <span className="hint">{analysis ? 'análise concluída' : 'aguardando análise'}</span>
                </div>
                <div className="panel-body">
                  {analysis && resultArea ? (
                    <Dashboard
                      area={resultArea}
                      score={analysis.score}
                      diagnosis={analysis.diagnosis}
                    />
                  ) : (
                    <div className="empty-state">
                      <div className="icon">🛰️</div>
                      <p style={{ fontWeight: 600, color: 'var(--text-soft)', marginBottom: 6 }}>
                        Nenhuma análise ainda
                      </p>
                      <p style={{ fontSize: 14 }}>
                        Selecione um talhão e clique em <strong>Analisar área</strong> para gerar o
                        score de saúde, os indicadores e o diagnóstico.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <MethodologySection />
      </main>
      <Footer />
    </>
  )
}
