// ============================================================
// OrbitAgro — Dados simulados (mock)
// Tres talhoes de uma propriedade ficticia no interior de MG.
// Coordenadas reais para que o mapa renderize corretamente.
// Os indicadores sao SIMULADOS para demonstrar o fluxo da solucao.
// ============================================================

export type RiskLevel = 'baixo' | 'moderado' | 'alto'

export interface Indicators {
  /** Indice de Vegetacao por Diferenca Normalizada (0 a 1) */
  ndvi: number
  /** Temperatura de superficie estimada (graus C) */
  temperature: number
  /** Risco de seca em escala 0-100 (maior = pior) */
  droughtRisk: number
  droughtLevel: RiskLevel
  /** Percentual da area sob estresse */
  stressArea: number
  /** Nivel de anomalia 0-100 (maior = pior) */
  anomaly: number
  anomalyLevel: RiskLevel
}

export interface AreaData {
  id: string
  name: string
  subtitle: string
  /** cor de marcacao no mapa */
  color: string
  /** vertices do poligono [lat, lng] */
  polygon: [number, number][]
  center: [number, number]
  /** hectares aproximados */
  hectares: number
  indicators: Indicators
  /** NDVI dos ultimos 6 meses (simulado) */
  ndviHistory: { mes: string; ndvi: number }[]
  /** score da analise anterior, para comparacao */
  previousScore: number
}

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']

export const areas: AreaData[] = [
  {
    id: 'norte',
    name: 'Talhão Norte',
    subtitle: 'Soja · Triângulo Mineiro · ~48 ha',
    color: '#34d399',
    center: [-19.5864, -47.961],
    hectares: 48,
    polygon: [
      [-19.5836, -47.9672],
      [-19.5836, -47.9548],
      [-19.5892, -47.9548],
      [-19.5892, -47.9672],
    ],
    indicators: {
      ndvi: 0.72,
      temperature: 27,
      droughtRisk: 15,
      droughtLevel: 'baixo',
      stressArea: 8,
      anomaly: 16,
      anomalyLevel: 'baixo',
    },
    ndviHistory: meses.map((m, i) => ({
      mes: m,
      ndvi: [0.61, 0.64, 0.68, 0.7, 0.71, 0.72][i],
    })),
    previousScore: 83,
  },
  {
    id: 'central',
    name: 'Talhão Central',
    subtitle: 'Milho · Triângulo Mineiro · ~62 ha',
    color: '#fbbf24',
    center: [-19.5945, -47.9612],
    hectares: 62,
    polygon: [
      [-19.5915, -47.9672],
      [-19.5915, -47.9548],
      [-19.5976, -47.9548],
      [-19.5976, -47.9672],
    ],
    indicators: {
      ndvi: 0.48,
      temperature: 32,
      droughtRisk: 55,
      droughtLevel: 'moderado',
      stressArea: 24,
      anomaly: 50,
      anomalyLevel: 'moderado',
    },
    ndviHistory: meses.map((m, i) => ({
      mes: m,
      ndvi: [0.62, 0.6, 0.57, 0.53, 0.5, 0.48][i],
    })),
    previousScore: 71,
  },
  {
    id: 'sul',
    name: 'Talhão Sul',
    subtitle: 'Cana · Triângulo Mineiro · ~55 ha',
    color: '#fb7185',
    center: [-19.6027, -47.9612],
    hectares: 55,
    polygon: [
      [-19.5999, -47.9672],
      [-19.5999, -47.9548],
      [-19.6055, -47.9548],
      [-19.6055, -47.9672],
    ],
    indicators: {
      ndvi: 0.31,
      temperature: 36,
      droughtRisk: 82,
      droughtLevel: 'alto',
      stressArea: 42,
      anomaly: 78,
      anomalyLevel: 'alto',
    },
    ndviHistory: meses.map((m, i) => ({
      mes: m,
      ndvi: [0.58, 0.52, 0.46, 0.4, 0.35, 0.31][i],
    })),
    previousScore: 52,
  },
]

export const getAreaById = (id: string) => areas.find((a) => a.id === id)
