## Come costruire i log

1) Definire wli (same as rate)
2) Prendere token random
3) Prendere temperatura random
4) Prendere parameters random
5) Assegnare satifaction in base alla tabella
6) Assegnare generations in base alla tabella

### Satisfaction table

Satisfaction = 5 meno:
- wli_factor: wli * 0.1
- tokens_factor: tokens * 0.5 / 10000 
- if ((wli_factor + tokens_factor) > 0.75
  - togli ulteriore (wli_factor + tokens_factor)
- temperature_factor: 
  - if (temp > 0.4) => temp else 0

### Generations table

Generations = 1/2 (random) più:
- tokens / 5000
- wli * 0.2
- if (temp > 0.4) => temp*2 else 0