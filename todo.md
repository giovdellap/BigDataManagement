## TODO

## Visual Analytics
1) Controllo errori teoria
2) Powerpoint
3) Report
4) Ricerca paper


## TODO

1) information integration:
   1) Source schema
   2) Global schema
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
   1) Fix generazione giorni per mese (deve partire dal primo) (febbraio funziona?)
   2) Mettere both db come opzione per le query
   3) Tasto delete DB