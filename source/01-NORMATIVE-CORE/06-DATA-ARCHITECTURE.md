# Data Architecture

## Principles

- database ownership follows Domain ownership;
- identifiers are stable, opaque, and namespace-aware;
- recorded time and effective time are distinct;
- binding versions are immutable;
- corrections append rather than overwrite;
- lineage is first-class;
- sensitive data is classified and minimized;
- analytical and AI stores are projections.

## Storage patterns

- relational databases for transactional aggregates and constraints;
- object storage for documents, evidence, large media, and signed artifacts;
- search indexes for discovery and text retrieval;
- time-series systems for metrics and telemetry;
- graph or relationship projections where relationship traversal is central;
- vector indexes for governed retrieval, never as source of truth;
- warehouse/lakehouse for analytical and regulatory reporting.

## Schema design

Every table has tenant or ownership scope where applicable, primary key, business-key uniqueness, version or concurrency mechanism, timestamps, classification, and retention policy. Monetary values store amount plus currency. Physical measures store value plus unit. External references store issuer and namespace.

## Migration standard

Migrations are forward-only, reviewable, repeatable in CI, compatible with rolling deployment, and tested against empty and realistic upgrade datasets. Destructive changes require export, backfill, validation, cutover, rollback, and retention approval.

## Recovery

Each datastore defines RPO, RTO, backup schedule, encryption, restore test, regional strategy, corruption detection, and reconciliation process.
