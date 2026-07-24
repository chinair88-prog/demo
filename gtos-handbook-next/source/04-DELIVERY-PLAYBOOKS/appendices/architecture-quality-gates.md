# Architecture Quality Gates

## Gate 1 — Semantic Integrity

All business concepts use glossary definitions. Ownership, identity, time, state, and relationship semantics are explicit. Commands and Events are distinct.

## Gate 2 — Authority and Decision

Decision classes identify authority, evidence, policy, escalation, appeal, and expected outcome. AI outputs are typed. Execution traces to Intent.

## Gate 3 — Data and History

Authoritative and derived data are distinguishable. Temporal semantics, lineage, quality, retention, correction, and reconstruction are testable.

## Gate 4 — Security and Privacy

Identity, delegation, purpose, jurisdiction, classification, authorization, audit, and threat controls are complete.

## Gate 5 — Resilience and Operations

SLO, RTO, RPO, degradation, replay, reconciliation, runbooks, incident evidence, and recovery exercises exist.

## Gate 6 — Change Safety

Contracts, compatibility, migration, rollback, observability, and deprecation are defined.

A release failing a mandatory Gate SHALL not claim architectural conformance.
