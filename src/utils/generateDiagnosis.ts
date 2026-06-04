import type { AreaData, Indicators } from '../data/mockAreas'
import type { HealthLevel } from './calculateScore'

// ============================================================
// Diagnostico em linguagem natural + recomendacoes praticas.
// Traduz indicadores espaciais em interpretacao acessivel.
// Linguagem sempre de APOIO: "sugere", "possivel", "recomenda-se".
// ============================================================

export interface Diagnosis {
  paragraphs: string[]
  recommendations: string[]
}

const pct = (v: number) => `${Math.round(v)}%`

export function generateDiagnosis(
  area: AreaData,
  ind: Indicators,
  level: HealthLevel,
  score: number,
): Diagnosis {
  const paragraphs: string[] = []
  const recommendations: string[] = []

  // ---- Paragrafo de abertura por nivel ----
  if (level === 'saudavel') {
    paragraphs.push(
      `O ${area.name} apresenta vegetação vigorosa e condição favorável. ` +
        `O conjunto de indicadores — NDVI de ${ind.ndvi.toFixed(2)}, temperatura de ` +
        `${ind.temperature}°C e baixo risco de seca — sugere que a cultura segue um ` +
        `desenvolvimento saudável, com apenas ${pct(ind.stressArea)} da área sob algum estresse.`,
    )
    paragraphs.push(
      `Não há sinais relevantes de anomalia no polígono analisado. O cenário é de ` +
        `manutenção: o foco recomendado é preservar o manejo atual e monitorar a evolução ` +
        `para antecipar qualquer mudança.`,
    )
  } else if (level === 'atencao') {
    paragraphs.push(
      `O ${area.name} apresenta vegetação em condição moderada, com sinais de estresse em ` +
        `parte do terreno (cerca de ${pct(ind.stressArea)} da área). A combinação entre ` +
        `NDVI médio (${ind.ndvi.toFixed(2)}), temperatura elevada (${ind.temperature}°C) e ` +
        `risco de seca ${ind.droughtLevel} sugere possível deficiência hídrica ou ` +
        `irregularidade no desenvolvimento da cultura.`,
    )
    paragraphs.push(
      `O nível de anomalia detectado é ${ind.anomalyLevel}, o que indica variações que ` +
        `merecem acompanhamento. Recomenda-se priorizar a inspeção nos pontos destacados ` +
        `e verificar o histórico recente de chuva e irrigação antes que a condição evolua.`,
    )
  } else {
    paragraphs.push(
      `O ${area.name} apresenta baixa vitalidade vegetal, com NDVI de ${ind.ndvi.toFixed(2)} e ` +
        `${pct(ind.stressArea)} da área sob estresse. A temperatura de ${ind.temperature}°C ` +
        `somada a um risco de seca ${ind.droughtLevel} aponta para possível seca severa, ` +
        `estresse hídrico acentuado ou falha de plantio em parte do polígono.`,
    )
    paragraphs.push(
      `O nível de anomalia é ${ind.anomalyLevel}, reforçando que a área merece atenção ` +
        `imediata. A queda consistente do vigor da vegetação nos últimos meses sugere um ` +
        `problema em progressão, e não uma variação pontual.`,
    )
  }

  // ---- Recomendacoes dinamicas por indicador ----
  if (ind.droughtRisk >= 50 || ind.temperature >= 31) {
    recommendations.push(
      'Verificar a irrigação e consultar o histórico recente de chuvas na região.',
    )
  }
  if (ind.stressArea >= 20) {
    recommendations.push(
      'Inspecionar em campo os pontos destacados como sob estresse para confirmar a causa.',
    )
  }
  if (ind.ndvi < 0.5) {
    recommendations.push(
      'Avaliar possível falha de plantio, perda de vigor da cultura ou solo exposto.',
    )
  }
  if (ind.anomaly >= 40) {
    recommendations.push(
      'Investigar ocorrência de pragas, doenças ou compactação de solo nas zonas anômalas.',
    )
  }

  // recomendacoes comuns
  recommendations.push('Acompanhar a evolução dos indicadores nos próximos dias.')

  if (level !== 'saudavel') {
    recommendations.push(
      'Em caso de persistência, consultar um técnico agrícola ou agrônomo para avaliação presencial.',
    )
  } else {
    recommendations.push('Manter o manejo atual e registrar o histórico para comparação futura.')
  }

  // contexto do score
  paragraphs.push(
    `Score geral de saúde: ${score}/100 (anterior: ${area.previousScore}/100). ` +
      `Este número resume o vigor da vegetação, o risco de seca, a temperatura e o nível de ` +
      `anomalia em um único indicador comparável ao longo do tempo.`,
  )

  return { paragraphs, recommendations }
}
