# Article 09 — Conformance and Exceptions

## Rule

> **Conformance SHALL be demonstrated through evidence. Exceptions SHALL be explicit, scoped, owned, time-bounded, and reviewed.**

## Normative Requirements

- An exception does not amend the standard.
- Repeated exceptions trigger architecture review.
- Critical non-conformance may block release or operation.

## Governance Mechanism

The responsible architecture authority SHALL maintain ownership, evidence, exception status, and amendment history for this Article.

## Required Evidence

- architecture ownership record;
- applicable policy or registry entry;
- implementation traceability;
- review or approval record;
- conformance test result;
- unresolved exceptions.

## Violation Consequence

A material violation SHALL be recorded as architecture debt or operational risk. Where the violation can produce invalid authority, loss of historical truth, security compromise, or harmful automated action, deployment or execution SHALL be blocked until an approved control exists.

## Canon Dependencies

All Articles derive from CANON-001 and CANON-002. Additional dependencies SHALL be recorded in the traceability registry.
