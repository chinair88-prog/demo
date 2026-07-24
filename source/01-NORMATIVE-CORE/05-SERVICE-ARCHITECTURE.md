# Service Architecture

## Service boundary

A service is justified by independent business ownership, lifecycle, scaling, security, data, or operational needs. A table group or UI menu is not sufficient reason for a service.

Each service contains:

```text
API / Adapter Layer
Application Layer
Domain Layer
Persistence and Integration Layer
Security and Policy Layer
Event and Workflow Layer
Observability and Operations Layer
Test and Conformance Layer
```

## Database ownership

Each service owns its writes. Cross-service database joins and updates are prohibited. Read models may be built through Events, APIs, CDC under governance, or analytical pipelines.

## Synchronous communication

Use synchronous calls for bounded request-response interactions where the caller requires an immediate answer and the dependency can meet the latency and availability budget. Apply timeouts, circuit breaking, authentication, authorization, tracing, idempotency, and explicit error contracts.

## Asynchronous communication

Use Events for completed facts and durable decoupling. Producers commit state plus outbox atomically. Consumers use inbox/idempotency, versioned schemas, replay safety, ordering strategy, DLQ, and reconciliation.

## Long-running processes

Use a durable workflow engine or persisted saga state for multi-step trade processes. Workflow state is coordination state, not Domain truth.

## Service template

Every service repository module shall include ownership metadata, ADRs, API/Event specifications, migrations, dependency policy, SLO, dashboards, alerts, runbooks, threat model, test strategy, and deprecation plan.
