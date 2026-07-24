# Data Pipeline Engineering Guide

## Source Classification

Every source is classified as authoritative, observational, derived, reference, or external unverified. The pipeline preserves source identity, contract version, extraction time, event or observation time, and transformation lineage.

## Ingestion

Ingestion validates schema, integrity, authority, subject identity, classification, and temporal fields. Invalid records are quarantined with reason and ownership. The system does not silently coerce identifiers, currencies, units, or unknown enum values.

## Transformation

Transformations are deterministic where practical, versioned, tested, and traceable. Normalization preserves original representation. Joins declare temporal semantics and identity rules. AI extraction or classification creates derived claims with confidence and source span.

## Quality

Quality checks cover completeness, validity, uniqueness, consistency, timeliness, authority, and lineage. Thresholds are tied to use; a dataset suitable for trend analysis may be unsafe for a legal decision.

## Publication

A data product publishes grain, owner, schema, metric definitions, quality SLOs, access policy, retention, residency, and consumer support. Projections clearly disclose freshness and correction behavior.

## Replay and Backfill

Backfill is governed because current transformation logic may reinterpret historical data. The pipeline records code and rule versions and separates historically reproduced results from newly derived perspectives.

## Operations

Operators monitor lag, quarantine, schema change, quality drift, lineage failure, correction propagation, cost, and consumer impact. Recovery verifies completeness and avoids duplicate downstream effects.
