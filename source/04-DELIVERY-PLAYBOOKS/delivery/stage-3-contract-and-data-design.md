# Stage 3 — Contract and Data Design

## Objective

Specify APIs, Commands, Events, schemas, temporal rules, data products, quality, lineage, retention, and migration.

## Entry Conditions

The preceding stage has approved evidence, open risks are visible, accountable roles are assigned, and the scope is versioned. Urgent delivery MAY begin earlier only through an explicit exception with compensating controls.

## Required Work

1. Confirm business outcome and affected value streams.
2. Identify Canon and constitutional dependencies.
3. Resolve truth ownership, identity, time, state, authority, and evidence questions.
4. Produce the stage artifacts and validate them with downstream teams.
5. Record consequential decisions and rejected alternatives.
6. Evaluate security, privacy, AI, resilience, migration, and operations implications.
7. Demonstrate the completion criteria through evidence.

## Mandatory Artifacts

- contract catalogue
- schema registry
- event catalogue
- data contracts
- migration plan


## Review Table

| Review Area | Question | Evidence |
|---|---|---|
| Business | Is the intended outcome measurable? | metric definition and baseline |
| Semantics | Are concepts and ownership unambiguous? | glossary, registry, domain model |
| Authority | Who may assert, decide, delegate, and execute? | authority and policy model |
| Time and History | Can historical truth and knowledge be reconstructed? | temporal model and tests |
| Integration | Are contracts versioned and semantically safe? | API, Event, and data contracts |
| Security | Are identity, purpose, jurisdiction, and threats controlled? | threat model and policies |
| Operations | Can the capability be observed, recovered, and reconciled? | SLOs, runbooks, recovery test |

## Stop Conditions

- **STOP:** Schema compatibility confused with semantic compatibility.
- **STOP:** Historical meaning not preserved.
- **STOP:** Projections claim authority.


## Exit Criteria

- all mandatory artifacts are approved or have explicit exceptions;
- high-impact risks have owners and controls;
- traceability to Canon is recorded;
- delivery teams understand the next-stage obligations;
- no critical semantic, authority, security, or recovery uncertainty remains hidden.

## Accountable Roles

The stage owner coordinates completion. Domain owners approve meaning and truth. Security, data, AI, and operations approve their control areas. The Architecture Council resolves cross-domain conflicts.
