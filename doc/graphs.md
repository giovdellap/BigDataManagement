## Basic graphs
- bar chart
- scatterplot
- boxplot
- line graph

## Visualization types

### SINGLE
SVG singolo
Un solo valore(scala) per X e uno solo per Y
Filtri:
- Cambio di variabile su X
- Cambio di variabile su Y

### MULTIPLE
SVG multipli
Stesso valore(scala) per ogni grafico su X o Y
Valori diversi(scala) per ogni grafico su X o Y

### LEGEND
SVG singolo
Un solo valore(scala) per X o Y
Categorie diverse per ogni linea(colore) per X o Y

## LOGS TABLE

### SINGLE - Scatterplot satisfaction
- Y axis: satisfaction
- X axis: choose between: 
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X
  - scegli modello

### SINGLE - Barchart satisfaction - model
- Y axis: satisfaction
- X axis: model
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X

### SINGLE - Linechart satisfaction
- Y axis: satisfaction
- X axis: (prendi la media di ogni n)
  - tokens (n = 10(1?))
  - wli (n = 1)
  - temperature (solo chi ce l'ha - n = 0.01)
  - presence penalty (solo chi ce l'ha - n = 0.01)
  - tokens/wli rateo (n = boh(0.01?))
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X
  - scegli model

### MULTIPLE - Scatterplot satisfaction
- Y axis: satisfaction
- X values:
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo
- filters:
  - scegli modello
    - apply to all graphs

### MULTIPLE - Linechart satisfaction
- Y axis: satisfaction
- X axis: (prendi la media di ogni n)
  - tokens (n = 10(1?))
  - wli (n = 1)
  - temperature (solo chi ce l'ha - n = 0.01)
  - presence penalty (solo chi ce l'ha - n = 0.01)
  - tokens/wli rateo (n = boh(0.01?))
- visualizzazione:
  - un singolo valore su X

### SINGLE - Scatterplot generations 
- Y axis: generations
- X axis: choose between: 
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo
- visualizzazione:
  - un singolo valore su X
- filters:
  - scegli valore X

### MULTIPLE - Scatterplot generations
- Y axis: generations
- X values:
  - tokens
  - wli
  - temperature (solo chi ce l'ha?)
  - presence penalty (solo chi ce l'ha?)
  - tokens/wli rateo

## REQUEST TABLE

### SINGLE - Barchart(linechart) weekday-hour
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- X values:
  - weekday
- visualizzazione:
  - un singolo valore su X

### MULTIPLE - linechart weekday-hour
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- visualizzazione:
  - un singolo valore su X
- filters:
  - weekday

### LEGEND - linechart weekday-hour
- Y axis: loading time (mean of the hour(minute?) for each value that has that weekday (tutte le settimane))
- X axis: hour
- X values:
  - weekday
- visualizzazione:
  - multipli valori di X

### Linechart weekday
- Y axis: loading time
- X axis: mean of the hour for each value that has that weekday (tutte le settimane)
