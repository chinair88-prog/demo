# GTOS Event Contract Standard

## Business Naming

Event names describe completed business facts in past tense. `ShipmentReleased` is valid; `ReleaseShipment` is a Command. Technical lifecycle Events are allowed but SHALL not masquerade as business facts.

## Envelope

The Event envelope includes event identity, type, subject identity, source identity and domain, occurrence time, observation time where applicable, recording time, schema version, authority reference where material, correlation, causation, integrity, and payload.

## Immutability

Published Events are immutable. A correction or retraction is a new Event referencing the prior Event. Infrastructure metadata may be appended without changing business payload meaning.

## Ordering

Ordering is guaranteed only within an explicitly declared scope such as aggregate identity or partition key. Consumers SHALL not assume global order. Occurrence order, publication order, and receipt order are distinct.

## Delivery and Idempotency

At-least-once delivery is expected. Consumers deduplicate by Event identity and protect business invariants. A duplicate Event SHALL not create duplicate business effect.

## Schema Evolution

Schemas have semantic owners. Breaking changes use a major version or a new Event type. Translators preserve original identity and provenance. Historical Events remain readable for the required retention period.

## Replay

Replay is controlled, observable, and authorized. Consumers distinguish live and replay processing when operational behavior differs. Notifications and irreversible side effects SHALL not be repeated without explicit replay policy.

## Privacy

Events contain the minimum necessary information. Highly sensitive payloads SHOULD use references with access control rather than broad replication.
