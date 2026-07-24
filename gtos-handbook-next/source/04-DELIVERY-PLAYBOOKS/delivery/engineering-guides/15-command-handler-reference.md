# Command Handler Reference Flow

## Input

A Command arrives with command identity, type, subject, initiator, authority or Intent reference, requested time, idempotency key, expected version where used, schema version, and payload.

## Processing Steps

1. Authenticate the technical caller and resolve the acting identity.
2. Validate schema and supported version.
3. Retrieve or validate the authority, delegation, mandate, and purpose.
4. Check the idempotency store. If the logical Command completed earlier, return the recorded outcome rather than execute again.
5. Resolve the subject identity and load authoritative state under the aggregate consistency boundary.
6. Evaluate policy and required evidence.
7. Validate state transition and invariants.
8. Apply domain behavior and produce new state plus one or more Events.
9. Persist state and outgoing Events atomically through an outbox, event store, or equivalent guarantee.
10. Record the outcome, decision or policy references, correlation, and telemetry.

## Result Types

The handler returns accepted and completed, accepted for asynchronous processing, rejected by validation, denied by policy, conflict with current state, insufficient evidence, duplicate with prior outcome, or temporarily unavailable. A generic failure response hides business meaning and complicates safe retry.

## Concurrency

Optimistic concurrency is appropriate when conflicts are expected to be rare and domain rules can reject stale commands. Pessimistic coordination MAY be required for high-contention financial or inventory invariants. Distributed locks SHALL not become invisible ownership.

## Failure After Commit

If state commits but the response is lost, a retry with the same idempotency key returns the previous result. If Event publication is delayed, the outbox is retried. The handler SHALL not apply the business transition a second time.

## Audit and Observability

Record Command outcome, policy result, invariant conflict, processing latency, Event publication, and dependency failures. Sensitive payloads are minimized in logs. Operators can locate the full trace through identifiers and evidence references.
