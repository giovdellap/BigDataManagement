## TODO



## Visual Analytics
1) Codice
   1) SELETTORE DI RISOLUZIONE
   2) bottone per chiudere tendina
   3) angular in docker
2) Report
   1) RELATED PAPERS


## Information Integration

1) Generic
   1) Definire source schema: OK
   2) Definire global schema(ontology): OK
   3) Mapping FOL: OK
   4) Query
      1) BasicQuery / No Count
         1) Teoria Influx
         2) Teoria cassandra
         3) codice cassandra: OK
      2) BasicRequest Query / No Count
         1) Teoria Influx
         2) Teoria Cassandra
         3) Codice Cassandra: OK
2) Presentation
   1) Introduction
      1) Scenario
      2) Data structure
      3) Tasks
   2) Information Integration System
   3) Implementation
3) Codice
   1) Split repo
   2) Mediator
   3) Wrappers (RIFARE GLI HANDLER)
      1) Cassandra
      2) Influx

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
4) Generic:
   1) Fix generazione giorni per mese (deve partire dal primo) (febbraio funziona?)
   2) Mettere both db come opzione per le query
   3) Tasto delete DB