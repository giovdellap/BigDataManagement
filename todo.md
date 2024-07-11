## COSE DA AGGIUSTARE
1) Satisfaction page - scatterplot
   1) Alcuni grafici non hanno senso
   2) Aggiustare i filtri (per i modelli che non hanno alcuni parametri, quei parametri dovrebbero essere disabled)

## TODO

1) Scatterplot Gerations
   1) Controller BE
   2) Query cassandra
   3) grafici FE
2) Aggiustare factory logs (le cose che vorremmo uscissero non escono)
3) Cose da vedere visual analytics
   1) Vedere slide 5 - trivariate (ci servono? possiamo usarli?)
   2) Fine slide 5 - I flitri non si usano solo per escludere ma anche per colorare diversamente
4) cassandra:
   1) Vedere come fare write multiple con batch (sembra inutile)
   2) Vedere come creare "cluster"(?) su docker (non funziona)
   3) Vedere se e come fare secondary indexes
   4) Vedere se materialized view serve x information integration
   5) Vedere se cambiare gli INSERT con i JSON nativi delle query
   6) Vedre come salvare e riapplicare db già fatti
5) influx:
   1) Inizializzare query 1
6) Generic:
   1) Automatizzare riempimento db
   2) Definire req/res backend