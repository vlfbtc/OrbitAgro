# 🎬 Sugestão de cenas e sequência de demonstração

---

## A) Cenas sugeridas para o VÍDEO-PITCH (até 3 min)

> Imagens podem ser stock/ilustração. Indicação de cena → ideia visual.

1. **Abertura — satélite observando a Terra**
   Imagem/ilustração de um satélite em órbita com a Terra ao fundo. Texto na tela: *"Todos os dias, satélites observam cada hectare."*

2. **Plantação vista de cima**
   Vista aérea/drone de uma lavoura. Transmite escala e o ambiente do produtor.

3. **Produtor com dificuldade**
   Produtor olhando a lavoura preocupado, ou olhando um relatório técnico confuso (planilha cheia de números). Reforça o problema.

4. **Contraste "dado cru → decisão"**
   Tela dividida: à esquerda `NDVI: 0.43` (frio, técnico); à direita a frase interpretada do OrbitAgro (clara, acionável).

5. **Mapa com área agrícola selecionada**
   Tela real do OrbitAgro: mapa com os talhões; um deles destacado ao ser selecionado.

6. **Clique em "Analisar área" + processamento**
   Mostrar o botão e o estado "Processando dados…".

7. **Dashboard do OrbitAgro**
   Tela do dashboard com o gauge do score em destaque e o badge de nível (🟡/🔴).

8. **Cards de indicadores em destaque**
   Close nos cards: NDVI, temperatura, risco de seca, score. Telemetria em fonte mono.

9. **Diagnóstico em linguagem simples**
   Destaque no painel de diagnóstico, com a frase interpretativa aparecendo na tela.

10. **Impacto econômico, ambiental e social**
    Ícones/infográfico: 💧 menos desperdício de água · 🌱 sustentabilidade · 📉 menos risco financeiro.

11. **Roadmap / integração futura**
    Logos ou chips: Sentinel-2, NASA Earthdata, Open-Meteo, INMET — sugerindo a evolução.

12. **Fechamento com slogan**
    Fundo escuro, logo OrbitAgro e o slogan: *"Do satélite ao campo."*

---

## B) Sequência de demonstração para o VÍDEO TÉCNICO (até 4 min)

> Gravar a tela com o projeto rodando (`npm run dev`). Sequência objetiva:

1. **Abrir a tela inicial (Hero).** Mostrar nome, slogan e a chamada "Analisar uma área".
2. **Rolar até a seção "O problema / A solução"** e ler 1 frase de cada card.
3. **(Opcional) Mostrar a árvore de arquivos no editor** — `data`, `utils`, `components` — explicando a separação de responsabilidades.
4. **Ir até a seção "Analisar área".**
5. **Selecionar o Talhão Central** clicando no polígono do mapa (ele se destaca e o mapa dá zoom).
6. **Clicar em "Analisar área"** e mostrar o estado "Processando dados…".
7. **Mostrar o Score** (60/100) e o **badge "Atenção moderada"**, com a comparação vs. análise anterior.
8. **Percorrer os cards de indicadores** (NDVI, temperatura, risco de seca, área sob estresse, anomalia, score).
9. **Mostrar o gráfico de evolução do NDVI** (queda nos últimos meses).
10. **Mostrar o painel "Como o score é calculado"** — reforçar que é explicável.
11. **Ler o diagnóstico interpretativo** em voz alta (o diferencial do projeto).
12. **Mostrar as recomendações práticas** numeradas.
13. **Trocar para o Talhão Norte (saudável) e/ou Sul (risco)** e re-analisar, para evidenciar que o diagnóstico muda conforme o cenário.
14. **Apontar o aviso de "dados simulados" e a limitação** (não substitui avaliação técnica).
15. **Citar as integrações futuras** (Sentinel Hub, Copernicus, NASA Earthdata, Open-Meteo, INMET, Google Earth Engine).

---

## 💡 Dicas de gravação
- Gravar em **1080p**, janela do navegador limpa (sem abas/extensões visíveis).
- Demonstrar **pelo menos dois cenários** (ex.: Central + Sul) para mostrar diagnósticos diferentes.
- Manter o texto do diagnóstico visível tempo suficiente para leitura.
- Inserir uma **legenda discreta "dados simulados"** durante a demo, por transparência.
- Fechar ambos os vídeos com o **slogan**: *"Do satélite ao campo."*
