# API, Event, and Tool Architecture

## REST and BFF

APIs use resource or command-oriented contracts with explicit versions, idempotency, optimistic concurrency, pagination, filtering, problem details, authorization, and trace propagation. Tenant identity is derived from trusted authentication context, never from an untrusted browser header.

## Events

Every Event includes event ID, type, schema version, subject, tenant, producer, occurred time, recorded time, correlation, causation, trace context, source version, and payload.

Events are immutable completed facts. Consumers must tolerate duplicates and unknown fields. Breaking semantic changes require a new Event type or governed version migration.

## Webhooks and external callbacks

Verify provider identity, signature, timestamp, nonce/replay protection, payload schema, and correlation. Store the original message. Respond quickly, process asynchronously, and reconcile missing or contradictory outcomes.

## Files and EDI

File exchanges define format, encoding, naming, checksums, signatures, encryption, partial-file handling, duplicate detection, acknowledgement, retention, and reconciliation.

## AI and MCP tools

Tools expose narrow typed operations with schemas, policy, authorization, approval, idempotency, timeout, cost limit, audit, and outcome observation. Models never receive direct database credentials.
