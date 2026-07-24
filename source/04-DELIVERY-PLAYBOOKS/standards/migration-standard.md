# Semantic Migration Standard

## Scope

Migration includes database change, service extraction, platform replacement, partner transition, schema evolution, identity merge, policy change, and model upgrade.

## Required Plan

A migration plan defines source and target semantics, ownership, mapping, temporal treatment, correction behavior, compatibility, validation, cutover, rollback, reconciliation, and retirement.

## Dual Operation

During dual run, one truth owner remains explicit. Dual writes require deterministic conflict handling and reconciliation. Comparing record counts is insufficient; propositions and outcomes are compared.

## Historical Data

Historical data retains original identifiers, source, time, and meaning. Transformations record lineage. Present-day rules SHALL not silently reinterpret historical facts.

## Cutover

Cutover criteria include data completeness, invariant validity, consumer readiness, operational telemetry, rollback window, and unresolved exceptions.

## AI and Analytics

Feature and model migrations require point-in-time validation and decision comparison. Vector embeddings or summaries SHALL not become the only retained representation of evidence.

## Completion

Migration completes only after old write paths are disabled, consumers are migrated, evidence is archived, reconciliation passes, and ownership is updated.
