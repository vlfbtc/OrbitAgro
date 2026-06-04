import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import type { AreaData } from '../data/mockAreas'
import { type ScoreResult, levelMeta } from '../utils/calculateScore'
import type { Diagnosis } from '../utils/generateDiagnosis'
import IndicatorCard from './IndicatorCard'
import DiagnosisPanel from './DiagnosisPanel'
import RecommendationList from './RecommendationList'

interface Props {
  area: AreaData
  score: ScoreResult
  diagnosis: Diagnosis
}

const riskTone = (level: 'baixo' | 'moderado' | 'alto') =>
  level === 'baixo' ? 'ok' : level === 'moderado' ? 'warn' : 'danger'

const riskLabel = (level: 'baixo' | 'moderado' | 'alto') =>
  ({ baixo: 'Baixo', moderado: 'Moderado', alto: 'Alto' }[level])

export default function Dashboard({ area, score, diagnosis }: Props) {
  const ind = area.indicators
  const meta = levelMeta[score.level]
  const gaugeColor =
    meta.tone === 'ok'
      ? 'var(--ok)'
      : meta.tone === 'warn'
        ? 'var(--warn)'
        : 'var(--danger)'

  const delta = score.score - area.previousScore

  return (
    <div className="dash fade-up">
      {/* score hero */}
      <div className={`score-hero ${meta.tone}`}>
        <div
          className="gauge"
          style={
            {
              ['--val' as string]: score.score,
              ['--col' as string]: gaugeColor,
            } as React.CSSProperties
          }
        >
          <div className="gv">
            <b>{score.score}</b>
            <span>/ 100</span>
          </div>
        </div>
        <div className="score-meta">
          <h3>Score de saúde da área</h3>
          <div className="area-name">
            {area.name} · {area.subtitle} · {area.hectares} ha
          </div>
          <span className={`badge ${meta.tone}`}>
            <span className="dot" />
            {meta.label}
          </span>
          <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} pts vs. análise anterior ({area.previousScore})
          </div>
        </div>
      </div>

      {/* indicadores */}
      <div className="ind-grid">
        <IndicatorCard icon="🌱" label="NDVI médio" value={ind.ndvi.toFixed(2)} />
        <IndicatorCard icon="🌡️" label="Temperatura" value={`${ind.temperature}`} unit="°C" />
        <IndicatorCard
          icon="💧"
          label="Risco de seca"
          value={riskLabel(ind.droughtLevel)}
          level={{ text: `${ind.droughtRisk}/100`, tone: riskTone(ind.droughtLevel) }}
        />
        <IndicatorCard icon="📉" label="Área sob estresse" value={`${ind.stressArea}`} unit="%" />
        <IndicatorCard
          icon="⚠️"
          label="Nível de anomalia"
          value={riskLabel(ind.anomalyLevel)}
          level={{ text: `${ind.anomaly}/100`, tone: riskTone(ind.anomalyLevel) }}
        />
        <IndicatorCard
          icon="🛰️"
          label="Score geral"
          value={`${score.score}`}
          unit="/100"
          level={{ text: meta.label, tone: meta.tone }}
        />
      </div>

      {/* gráfico de evolução do NDVI */}
      <div className="chart-card">
        <h4>Evolução do NDVI (últimos 6 meses)</h4>
        <div className="sub">Série simulada — tendência do vigor da vegetação no talhão</div>
        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={area.ndviHistory} margin={{ top: 6, right: 10, left: -18, bottom: 0 }}>
            <CartesianGrid stroke="#1b3050" strokeDasharray="3 3" />
            <XAxis dataKey="mes" stroke="#6b85a6" fontSize={12} tickLine={false} />
            <YAxis domain={[0, 1]} stroke="#6b85a6" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#14253d',
                border: '1px solid #1f3553',
                borderRadius: 10,
                color: '#eaf2ff',
                fontSize: 13,
              }}
              labelStyle={{ color: '#a7bdd9' }}
            />
            <Line
              type="monotone"
              dataKey="ndvi"
              stroke={area.color}
              strokeWidth={3}
              dot={{ r: 3, fill: area.color }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* composição do score */}
      <div className="chart-card">
        <h4>Como o score é calculado</h4>
        <div className="sub">Modelo explicável e transparente — sem caixa-preta</div>
        <div className="score-breakdown">
          {score.breakdown.map((b) => (
            <div className="sb-row" key={b.label}>
              <span className="k">
                {b.label} <em style={{ color: 'var(--text-dim)', fontStyle: 'normal' }}>({Math.round(b.weight * 100)}%)</em>
              </span>
              <span className="bar">
                <i style={{ width: `${b.raw}%` }} />
              </span>
              <span className="v">{Math.round(b.raw)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* diagnóstico e recomendações */}
      <DiagnosisPanel paragraphs={diagnosis.paragraphs} />
      <RecommendationList items={diagnosis.recommendations} />

      {/* aviso de limitação */}
      <div className="notice" role="note">
        <span className="ico" aria-hidden="true">
          ℹ️
        </span>
        <div>
          <h4>Ferramenta de apoio à decisão</h4>
          <p>
            Este MVP utiliza dados simulados. O diagnóstico apresentado é um apoio à decisão e
            não substitui avaliação de campo, análise laboratorial ou a avaliação de um
            profissional agrônomo.
          </p>
        </div>
      </div>
    </div>
  )
}
