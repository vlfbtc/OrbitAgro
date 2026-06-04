# 🛠️ Roteiro — Vídeo técnico (até 4 minutos)

**Projeto:** OrbitAgro
**Tema:** Global Solution FIAP — Space Connect
**Público:** banca / avaliação técnica.
**Tom:** técnico, claro e demonstrativo.
**Duração-alvo:** ~3min50s.

> ⚠️ Apenas o **roteiro**. O grupo grava e edita. Recomenda-se gravar a tela com o projeto rodando (`npm run dev`).

---

## ⏱️ Estrutura e falas sugeridas

### 1. Identificação do problema — (0:00–0:30)
> "O OrbitAgro resolve um problema concreto: pequenos e médios produtores têm dificuldade de transformar dados ambientais e orbitais em decisões práticas. Os dados existem, mas são técnicos demais e chegam tarde — o que leva a perdas por seca, estresse hídrico e falhas de plantio."

---

### 2. Explicação da solução — (0:30–1:00)
> "Nossa solução é uma camada de interpretação entre o satélite e o produtor. A partir de indicadores de sensoriamento remoto, o sistema gera um score de saúde, um diagnóstico em linguagem natural e recomendações práticas para a área selecionada."

---

### 3. Tecnologias utilizadas — (1:00–1:30)
> "Tecnicamente, o front-end é **React com Vite e TypeScript**. O mapa interativo usa **Leaflet** sobre **OpenStreetMap**. Os gráficos são feitos com **Recharts**. A estilização é um design system próprio em CSS, com tema espacial e agrícola."

> "Os dados desta versão são **mockados** em TypeScript, mas a arquitetura isola essa camada para futura integração com APIs reais."

---

### 4. Arquitetura / organização — (1:30–2:00)
> "A organização separa responsabilidades: a pasta `data` guarda os cenários dos talhões; `utils` contém a lógica — `calculateScore` para o score e `generateDiagnosis` para o texto; e `components` traz a interface modular: mapa, seletor, cards de indicadores, painel de diagnóstico e dashboard."

*(Mostrar rapidamente a árvore de arquivos no editor.)*

> "O estado central fica no `App`: ao selecionar um talhão e analisar, ele combina dados, score e diagnóstico e os repassa ao Dashboard."

---

### 5. Demonstração prática — (2:00–3:00)
*(Gravar a tela seguindo a sequência de demonstração — ver `sugestao-cenas-e-demo.md`.)*

> "Na prática: abro a aplicação, seleciono o **Talhão Central** no mapa e clico em **Analisar área**."

> "O sistema processa e retorna o **score 60 de 100**, classificado como **atenção moderada**. Vejo os indicadores — NDVI 0.48, temperatura 32 graus, risco de seca moderado e 24% da área sob estresse."

> "Abaixo, o **gráfico mostra a queda do NDVI** nos últimos meses, e o painel de **composição do score** explica de onde vem cada ponto."

> "E aqui está o diferencial: o **diagnóstico em linguagem natural** explica que há sinais de estresse e possível deficiência hídrica, seguido de **recomendações práticas** — verificar irrigação, inspecionar pontos críticos e acompanhar a evolução."

---

### 6. Explicação dos dados simulados — (3:00–3:20)
> "É importante a transparência: os dados são simulados nesta versão. Temos três cenários — saudável, atenção e risco — para demonstrar o fluxo completo. O modelo de score é explícito: NDVI vale 40%, risco de seca 25%, temperatura 20% e anomalia/estresse 15%."

---

### 7. Resultados esperados — (3:20–3:35)
> "O resultado é que dados orbitais complexos viram uma resposta que qualquer produtor entende em segundos, apoiando decisões de irrigação, manejo e inspeção."

---

### 8. Impacto positivo — (3:35–3:48)
> "O impacto é democratizar a tecnologia espacial, reduzir desperdício de água e insumos e aumentar a sustentabilidade — conectando o espaço a um problema cotidiano e real."

---

### 9. Limitações e evolução futura — (3:48–4:00)
> "Como evolução, a camada de dados pode ser conectada a Sentinel-2, NASA Earthdata, Open-Meteo e INMET. Reforçamos: é uma ferramenta de **apoio à decisão** e não substitui a avaliação de um agrônomo. OrbitAgro: do satélite ao campo."

---

## ✅ Checklist técnico (não esquecer de mostrar)
- [ ] Árvore de pastas (`data`, `utils`, `components`).
- [ ] Seleção de talhão + clique em "Analisar área".
- [ ] Score, indicadores e badge de nível.
- [ ] Gráfico de evolução do NDVI.
- [ ] Painel "Como o score é calculado".
- [ ] Diagnóstico em linguagem natural + recomendações.
- [ ] Aviso de dados simulados e de limitação.
