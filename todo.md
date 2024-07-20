## COSE DA AGGIUSTARE
1) Satisfaction page - scatterplot
   1) Alcuni grafici non hanno senso
   2) Aggiustare i filtri (per i modelli che non hanno alcuni parametri, quei parametri dovrebbero essere disabled)
   3) mettere tooltip sui punti (da vedere)


## TODO
1) Cose da vedere visual analytics
   1) Vedere slide 5 - trivariate (ci servono? possiamo usarli?)
   2) Fine slide 5 - I flitri non si usano solo per escludere ma anche per colorare diversamente
2) cassandra:
   1) Vedere come fare write multiple con batch (sembra inutile)
   2) Vedere come creare "cluster"(?) su docker (non funziona)
   3) Vedere se e come fare secondary indexes
   4) Vedere se materialized view serve x information integration
   5) Vedere se cambiare gli INSERT con i JSON nativi delle query
   6) Vedre come salvare e riapplicare db già fatti
3) influx:
   1) controllo che scriva bene il ts e dove lo mette (_time)
   2) Basic query con field 2 temperature o presence_penalty si rompe perché chi non ce l'ha ritorna NaN
   3) basic query con loading time non funziona
4) Generic:
   1) Vedere perché alcuni grafici ci mettono una vita a caricare (se caricano)
   2) Fix generazione giorni per mese (deve partire dal primo) (febbraio funziona?)
   3) Mettere both db come opzione per le query