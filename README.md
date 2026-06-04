# 🛰️ OrbitAgro

> **Do satélite ao campo: dados espaciais traduzidos em decisões simples para o produtor rural.**

OrbitAgro é uma plataforma web que transforma dados de satélite e sensoriamento remoto em **diagnósticos simples, visuais e acionáveis** sobre a saúde de áreas agrícolas. Em vez de mostrar números crus como `NDVI: 0.43`, o sistema entrega uma interpretação em linguagem natural e recomendações práticas para a tomada de decisão no campo.

Projeto desenvolvido para a **Global Solution da FIAP — tema Space Connect**.

---

## 🌍 Contexto do desafio — Space Connect

A Global Solution tem como tema **Space Connect**: conectar o ecossistema espacial a desafios reais da sociedade usando tecnologias emergentes e dados em escala global.

O OrbitAgro se conecta diretamente a esse tema porque:

- usa **dados orbitais** (sensoriamento remoto) como base conceitual;
- aplica imagens e indicadores derivados de satélite ao **agronegócio**;
- traduz infraestrutura espacial em **decisão prática na Terra**;
- contribui para **sustentabilidade**, produção de alimentos e uso consciente de recursos.

> *"O OrbitAgro mostra como dados espaciais podem sair da órbita e chegar ao campo em forma de decisão prática."*

---

## ❗ Problema abordado

Muitos pequenos e médios produtores, técnicos agrícolas e gestores rurais **não conseguem transformar dados ambientais e orbitais em decisões práticas e compreensíveis** sobre a saúde de uma área agrícola.

O problema não é só falta de dados — muitas vezes eles existem, mas são técnicos demais, caros ou inacessíveis. Atrasos em identificar seca, queda de vigor da vegetação, falhas de plantio ou estresse hídrico causam perda de produtividade, desperdício de água e insumos, e maior risco financeiro.

---

## 💡 Solução proposta

O OrbitAgro atua como uma **camada de interpretação** entre os dados espaciais e o usuário final. Com base em indicadores como NDVI, temperatura, risco de seca e anomalias, o sistema:

1. interpreta a condição da área selecionada;
2. gera um **score de saúde** (0–100) explicável;
3. produz um **diagnóstico em linguagem natural**;
4. sugere **recomendações práticas**;
5. exibe a evolução do indicador ao longo do tempo.

---

## 🧰 Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Framework | **React 18** + **Vite** |
| Linguagem | **TypeScript** |
| Mapa | **Leaflet** + OpenStreetMap |
| Gráficos | **Recharts** |
| Estilização | CSS design system próprio (tema espacial/agro) |
| Tipografia | Bricolage Grotesque · IBM Plex Sans · IBM Plex Mono |
| Dados | JSON/TS mockado (`src/data/mockAreas.ts`) |

---

## ▶️ Como executar o projeto

Pré-requisito: **Node.js 18+**.

```bash
# 1. instalar as dependências
npm install

# 2. rodar em modo desenvolvimento (abre em http://localhost:5173)
npm run dev

# 3. (opcional) gerar build de produção
npm run build
npm run preview
```

---

## 🧪 Como os dados são simulados

Esta versão **não faz chamadas a satélites reais**. Os três talhões usam dados mockados coerentes em `src/data/mockAreas.ts`, representando três cenários:

| Talhão | NDVI | Temp. | Risco de seca | Área sob estresse | Score | Nível |
|---|---|---|---|---|---|---|
| **Norte** | 0.72 | 27 °C | Baixo | 8 % | 90 | 🟢 Saudável |
| **Central** | 0.48 | 32 °C | Moderado | 24 % | 60 | 🟡 Atenção |
| **Sul** | 0.31 | 36 °C | Alto | 42 % | 39 | 🔴 Risco |

O **score** é calculado de forma explícita e auditável (`src/utils/calculateScore.ts`):

```
Score = NDVI (40%) + Risco de seca (25%) + Temperatura (20%) + Anomalia/estresse (15%)
```

O **diagnóstico** em linguagem natural é gerado em `src/utils/generateDiagnosis.ts`, variando conforme o cenário e os indicadores fracos detectados.

Quando o usuário desenha uma área personalizada no mapa, os indicadores e a série histórica são simulados dinamicamente em `src/utils/buildCustomArea.ts`, preservando o mesmo fluxo de análise do dashboard.

---

## 🔌 Possíveis integrações futuras

A camada de dados é isolada — bastaria substituir os mocks por chamadas reais, mantendo a mesma interface e lógica de diagnóstico. Fontes candidatas:

- **Sentinel Hub** / **Copernicus Sentinel-2** (imagens ópticas, NDVI)
- **NASA Earthdata** (observação da Terra)
- **Open-Meteo** / **INMET** (clima e histórico de chuva)
- **MapBiomas** (uso e cobertura do solo)
- **Google Earth Engine** (processamento geoespacial em escala)
- **Mapbox** / **OpenStreetMap** / **Leaflet** (camada de mapa)

---

## 📈 Impactos esperados

- **Democratização** do acesso à tecnologia espacial para pequenos e médios produtores.
- Decisões mais rápidas sobre **irrigação, manejo e inspeção**.
- Redução de **desperdício de água, fertilizantes e defensivos**.
- Menor **risco financeiro** e maior **sustentabilidade** no uso da terra.

---

## ⚠️ Limitações do MVP

- Utiliza **dados simulados**; não há integração com satélites reais nesta versão.
- **Não substitui** avaliação de campo, análise laboratorial ou a avaliação de um agrônomo.
- O modelo de score é **didático e simples**, voltado a demonstrar o conceito — não tem pretensão de precisão agronômica definitiva.
- Linguagem sempre de apoio: *"os dados sugerem"*, *"possível risco"*, *"recomenda-se verificar"*.

---

## 🗂️ Estrutura de pastas

```
orbitagro/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── MapSection.tsx
│   │   ├── AreaSelector.tsx
│   │   ├── Dashboard.tsx
│   │   ├── IndicatorCard.tsx
│   │   ├── DiagnosisPanel.tsx
│   │   ├── RecommendationList.tsx
│   │   ├── MethodologySection.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── mockAreas.ts
│   ├── utils/
│   │   ├── buildCustomArea.ts
│   │   ├── calculateScore.ts
│   │   └── generateDiagnosis.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── roteiro-video-pitch.md
│   ├── roteiro-video-tecnico.md
│   └── sugestao-cenas-e-demo.md
├── index.html
├── package.json
└── README.md
```