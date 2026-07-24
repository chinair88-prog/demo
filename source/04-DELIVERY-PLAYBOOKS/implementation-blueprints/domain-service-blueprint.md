# Domain Service Blueprint

## Purpose

A GTOS Domain Service is a deployable capability that protects a coherent set of business invariants and authoritative propositions. It is not defined by technology, team size, or database ownership alone. The service boundary exists because a specific authority is responsible for a specific meaning.

## Required Components

A conforming Domain Service SHALL include:

- a published domain purpose and non-goals;
- authoritative proposition catalogue;
- aggregate and invariant definitions;
- command handlers;
- event publication;
- query projections;
- temporal and correction behavior;
- policy and authorization integration;
- observability;
- migration and recovery procedures;
- Canon traceability.

## Command Processing

The service authenticates the caller, evaluates authority and policy, validates command schema, resolves subject identity, loads the aggregate under the required consistency boundary, checks invariants, records state change, publishes Events, and returns an outcome.

Command acceptance does not imply successful execution. A Command may be rejected because authority is absent, evidence is incomplete, state is incompatible, policy denies the action, or a dependency is unavailable.

## Persistence

The persistence model may use relational, document, event, graph, or mixed storage. The model SHALL preserve identity, history, temporal meaning, provenance, and correction. Storage selection SHALL not redefine the domain.

## Query Model

Query projections are perspectives optimized for use cases. They SHALL identify freshness, source, and temporal semantics. A projection failure SHALL not corrupt authoritative state.

## Recovery

Recovery procedures include restoring persistence, replaying Events, rebuilding projections, validating invariants, reconciling outbox or message state, and confirming downstream consumer position. Recovery evidence SHALL prove business consistency, not merely process uptime.

## Deployment

A Domain Service MAY be deployed as a modular monolith, microservice, serverless capability, or managed workflow. Deployment topology is subordinate to domain authority and operational requirements.
