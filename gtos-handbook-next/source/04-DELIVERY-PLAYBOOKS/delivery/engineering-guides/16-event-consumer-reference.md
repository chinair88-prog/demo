# Event Consumer Reference Flow

## Receipt

The consumer receives an Event envelope and records transport receipt time. Receipt is not acceptance. The consumer verifies source identity, integrity, schema support, subject, classification, and authorization to process the Event.

## Deduplication

Event identity is checked against the consumer's processed-event record or idempotent business operation. A duplicate may update transport metrics but SHALL not repeat business effects.

## Interpretation

The consumer applies semantics for the declared Event version. Occurrence time and recording time remain distinct. Ordering assumptions are limited to the producer's documented scope. An Event arriving late may still change a projection or trigger an impact assessment.

## Processing Types

Projection consumers update a derived view. Workflow consumers advance coordination state. Domain consumers may issue a new Command under their own authority and policy; they do not directly mutate the producer's truth. Notification consumers communicate under replay controls. Analytical consumers preserve lineage.

## Failure

Transient infrastructure failure triggers bounded retry with backoff. Invalid schema, unsupported semantic version, prohibited data, or invariant contradiction enters quarantine or a case with owner and reason. Infinite retry without visibility is prohibited.

## Replay

Replay is explicitly authorized. Consumers know whether they are rebuilding state, re-evaluating current policy, or reproducing historical behavior. Irreversible notifications and payments are disabled unless replay Intent specifically permits them.

## Correction

A correction Event references the original. The consumer identifies affected projections, Decisions, documents, or executions. Some results are recomputed; others remain historically valid and create remediation. The correction is never treated as proof that the original Event did not exist.

## Operational Signals

Monitor lag by occurrence and receipt, processing success, quarantine, duplicates, unsupported versions, replay position, correction backlog, and business outcome. Queue depth alone is not enough.
