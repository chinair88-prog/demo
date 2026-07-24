# End-to-End Observability Standard

## Four Views

GTOS observability includes technical health, business flow, decision quality, and evidence integrity.

## Technical Health

Metrics cover latency, errors, saturation, dependency behavior, queue age, storage, and deployment.

## Business Flow

Metrics cover value-stream cycle time, state age, exception rate, blocked reason, missing evidence, command rejection, Event freshness, and completion outcome.

## Decision Quality

Metrics cover recommendation acceptance, reversal, appeal, calibration, outcome quality, policy denial, human escalation, and automation suspension.

## Evidence Integrity

Metrics cover missing provenance, stale source, failed signature, lineage gap, correction backlog, and reconstruction success.

## Correlation

Correlation links related work but does not merge identities or authority. Trace context SHALL be sanitized at trust boundaries.

## Alerting

Alerts map to an owned response and user or business impact. High-cardinality business identifiers are controlled to avoid leakage and cost.

## Retention

Telemetry retention follows operational, security, privacy, and legal requirements. Audit evidence may require stronger integrity than ordinary logs.
