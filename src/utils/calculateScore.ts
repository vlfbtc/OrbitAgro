import type { Indicators } from '../data/mockAreas'

// ============================================================
// Calculo do Score de Saude da Area (0-100)
// Composicao explicavel:
//   NDVI ............... 40%
//   Risco de seca ...... 25%
//   Temperatura ........ 20%
//   Anomalia/estresse .. 15%
// ============================================================

export type HealthLevel = 'saudavel' | 'atencao' | 'risco'

export interface ScoreBreakdownItem {
  label: string
  weight: number // 0-1
  raw: number // pontuacao normalizada 0-100 do indicador
}

export interface ScoreResult {
  score: number // 0-100
  level: HealthLevel
  breakdown: ScoreBreakdownItem[]
}

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v))

export function calculateScore(ind: Indicators): ScoreResult {
  // NDVI: 0.80+ considerado vigor excelente
  const ndviScore = clamp((ind.ndvi / 0.8) * 100)
  // Risco de seca: quanto maior o risco, menor a pontuacao
  const droughtScore = clamp(100 - ind.droughtRisk)
  // Temperatura: faixa de conforto ~26C; desvios penalizam
  const tempScore = clamp(100 - Math.abs(ind.temperature - 26) * 4)
  // Ambiente: combina area sob estresse (60%) e anomalia (40%)
  const envScore = clamp(100 - (ind.stressArea * 0.6 + ind.anomaly * 0.4))

  const breakdown: ScoreBreakdownItem[] = [
    { label: 'Vigor da vegetação (NDVI)', weight: 0.4, raw: ndviScore },
    { label: 'Risco de seca', weight: 0.25, raw: droughtScore },
    { label: 'Temperatura de superfície', weight: 0.2, raw: tempScore },
    { label: 'Anomalia / área sob estresse', weight: 0.15, raw: envScore },
  ]

  const score = Math.round(
    breakdown.reduce((acc, item) => acc + item.raw * item.weight, 0),
  )

  const level: HealthLevel =
    score >= 70 ? 'saudavel' : score >= 50 ? 'atencao' : 'risco'

  return { score, level, breakdown }
}

export const levelMeta: Record<
  HealthLevel,
  { label: string; tone: 'ok' | 'warn' | 'danger'; emoji: string }
> = {
  saudavel: { label: 'Área saudável', tone: 'ok', emoji: '🟢' },
  atencao: { label: 'Atenção moderada', tone: 'warn', emoji: '🟡' },
  risco: { label: 'Risco elevado', tone: 'danger', emoji: '🔴' },
}
