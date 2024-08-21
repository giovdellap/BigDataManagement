## TODO

## Visual Analytics
1) Codice
   1) SELETTORE DI RISOLUZIONE

## Information Integration

1) Pulire i log, lasciare solo le query


## Big Data Management 

1) Codice
   1) Replication cassandra docker
   2) Query create table replication
   3) Pulire i log
2) Slide
   1) Cassandra
      1) Replication
   2) Project
      1) Create Table Query
      2) Docker
         1) Infrastructure
         2) Replication

## PARTITIONING CASSANDRA
1) vedere come configurare docker con 3 repliche
2) vedere slide meetup-docker su downloads
3) https://portworx.com/wp-content/uploads/2017/10/Portworx_Cassandra_Guide_10-17-17.pdf
4) https://medium.com/@kayvan.sol2/deploying-apache-cassandra-cluster-3-nodes-with-docker-compose-3634ef8345e8

### Presentzione
1) Cassandra
   1) Generic
      1) https://dataxschool.medium.com/cassandra-internals-architecture-9824897ff11e (BELLO)
      2) https://docs.datastax.com/en/cql/hcd-1.0/overview/cassandra-structure.html
   2) Logical Data Model (progetto)
      1) Lucidchart
   3) Native storage data structure - OK
      1) https://www.baeldung.com/cassandra-storage-engine
      2) 
   4) query language (CQL)
      1) Data Definition - OK
      2) Data Manipulation - OK
   5) features
   6) Project features
      1) Cassandra utils 
         1) libreria js
         2) Come facciamo le insert multiple
      2) Query factory + query
2) Influx
   1) Logical Data Model
   2) Native storage data structure
   3) query language
   4) features


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
