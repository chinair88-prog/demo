# GTOS API Contract Standard

## Resource and Action Semantics

APIs SHALL use domain language. A resource endpoint represents a governed concept or perspective. An action endpoint represents a Command or Decision request. API naming SHALL not imply authority the provider does not own.

## Required Metadata

Requests and responses include correlation identity, caller identity through security context, version, content type, and temporal fields where relevant. Commands additionally include idempotency key, authority context, expected subject version, and Intent reference when execution is involved.

## Error Model

Errors are categorized as authentication failure, authorization denial, invalid evidence, validation failure, invariant conflict, optimistic concurrency conflict, policy requirement, dependency failure, rate limit, or internal fault. Error responses SHALL not expose sensitive implementation details.

## Compatibility

Adding an optional field may be compatible. Changing meaning, units, identifier scope, default policy, time semantics, or authority is breaking. Deprecation identifies consumers and sunset date.

## Query Semantics

Queries SHALL declare whether they return authoritative current state, a projection, historical state, decision-time knowledge, or analytical output. Pagination ordering SHALL be stable. Filters SHALL have defined timezone and comparison semantics.

## Idempotency

Commands capable of side effects SHALL support idempotency appropriate to business identity. An idempotency key maps to one logical attempt and outcome. Reuse with materially different input is rejected.

## Security

Object-level and relationship-level authorization is mandatory. Bulk endpoints require scope and volume controls. Sensitive fields are minimized and purpose-controlled.

## Observability

Metrics include request outcome, policy denial, invariant conflict, dependency latency, consumer version, and business effect. Logs preserve correlation without leaking secrets or prohibited personal data.
