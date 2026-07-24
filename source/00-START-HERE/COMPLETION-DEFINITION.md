# GTOS Completion Definition

A GTOS capability is complete only when every required question below has an evidence-backed answer.

## Business and ownership

- What business outcome does the capability produce?
- Which bounded context owns each proposition?
- Which external authority owns legal, financial, quality, carrier, or regulatory outcomes?
- Who may decide, approve, execute, correct, revoke, and appeal?

## Domain model

- What are the canonical subjects and stable identities?
- What are the aggregates, entities, value objects, relationships, and invariants?
- What state machines exist and what guards every transition?
- What history, correction, supersession, contradiction, and dispute semantics apply?

## Contracts and data

- What Commands, Events, queries, APIs, webhooks, files, and tools exist?
- Which service owns each database, schema, table, index, and migration?
- How are idempotency, concurrency, ordering, replay, reconciliation, and versioning handled?
- How are lineage, classification, retention, residency, and deletion handled?

## Experience and automation

- Which personas and Portals participate?
- How are partial, stale, denied, failed, disputed, and outcome-unknown states displayed?
- What AI tasks are allowed, what autonomy level applies, and what human approval is required?
- What evidence and explanation accompany automated recommendations and actions?

## Quality and operations

- What security and privacy controls are enforced?
- What SLOs, dashboards, alerts, runbooks, capacity limits, and recovery objectives exist?
- What unit, property, integration, contract, security, performance, chaos, migration, E2E, and DR tests prove the behavior?
- What release evidence demonstrates deployability and operability?

A module name, route, table, mock screen, plan, or generated document is never sufficient evidence by itself.
