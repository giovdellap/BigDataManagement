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

2) Presentation
   1) Introduction
      1) Scenario: OK
      2) Data structure: OK
      3) Tasks: NO
   2) Information Integration System
      1) Source Schema: OK
      2) Ontology: OK
      3) Mapping: OK
      4) Query
         1) SessionQueryGenerations / No Count
            1) Teoria Influx: OK
            2) Teoria cassandra: OK
         2) BasicRequest Query / No Count
            1) Teoria Influx: OK
            2) Teoria Cassandra: OK 
   3) Implementation
3) Codice
   1) Mediator
   2) Wrappers
      1) Cassandra
         1) Initialize: OK
         2) Insert items: OK
         3) SessionQuery: OK
         4) RequestQuery: OK
      2) Influx
         1) Initialize: OK
         2) Insert items: OK
         3) SessionQuery: OK
         4) RequestQuery: OK
   3) Togliere tutti i riferimenti ai modelli dal frontend
   4) Pulire i log, lasciare solo le query
   5) Frontend in docker

## TODO

1) cassandra:
   1) Vedere come fare write multiple con batch (sembra inutile)
   2) Vedere come creare "cluster"(?) su docker (non funziona)
   3) Vedere se e come fare secondary indexes
   4) Vedere se materialized view serve x information integration
   5) Vedere se cambiare gli INSERT con i JSON nativi delle query
   6) Vedre come salvare e riapplicare db già fatti
2) Generic:
   1) Fix generazione giorni per mese (deve partire dal primo) (febbraio funziona?)
