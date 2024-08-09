# Source schema

## InfluxDB
UserSatisfaction (timestamp, UserID, name, version, presence_penalty, frequency_penalty, top_p, temperature, Sat, tokens, wli)
UserGenerations (timestamp, UserID, name, version, presence_penalty, frequency_penalty, top_p, temperature, Gen, tokens, wli)
ServiceRequest(timestamp, tokens, messages, input_t, input_d, l_time)

## Cassandra
SessionRelevation(logID, ts, name, version, satisfaction, generations)
SessionSpecification(logID, user, tokens, wli, p_penalty, f_penalty, top_p, temp)
ExternalRequest(rid, timestamp, tokens, messages, time, input_tokens)
RequestAttachment(rid, d)

# Global Schema
Session(timestamp, UserID, ModelName, ModelVersion, presence_penalty, frequency_penalty, top_p, temperature, Satisfaction, Generations, Tokens, wli)
Request(timestamp, input_tokens, total_tokens, input_dimension, Messages, LoadingTime)


# ESEMPIO SLIDE 3.3 ALLA FINE
# DA VEDERE QUERY ANSWERING 2 - GAV SLIDE 63

# Specs

## Context of Application
Intra-organizational

## Classification of the IIS

### Scope
Domain-Based IIS 

### Result
Result as Logical Theory
There is no Global Schema, there is an Ontology
Non dovrebbero servire Global Schema Constraints

### Mapping
Sound Semantics of Mapping (3.3 slide 19/38)
GAV (Global-As-View)

### Representation
Virtualization
Forse servono Wrappers e mediator (slide 3.1 45)

## Technological Approach
Multiple Stores - Federated data Management (copiare immagine slide 3.1 67)



# Abstract

# Source Schema

## Cassandra

## Influx

# Global Schema

# Mapping