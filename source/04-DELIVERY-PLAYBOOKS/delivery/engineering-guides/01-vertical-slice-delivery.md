# Vertical Slice Delivery Guide

## Objective

A vertical slice proves one meaningful business outcome across user interaction, domain logic, contract, persistence, policy, observability, and operation. It is not a thin user-interface prototype connected to placeholder logic. The slice must demonstrate that the architecture can carry a real governed fact from observation or command through outcome and evidence.

## Slice Selection

Choose a slice with a clear subject, one or two critical invariants, a known truth owner, a small number of partner dependencies, and an observable business outcome. Avoid selecting the easiest technical endpoint if it bypasses identity, time, state, authority, or correction. A useful early slice often includes one Command, one Decision or policy check, two or three Events, a projection, and an operational alert.

## Required Design

The slice SHALL define the domain aggregate, identifiers, temporal fields, Command contract, Event contract, authorization context, failure behavior, idempotency, data classification, SLO, and recovery test. If AI is involved, the output type, evidence source, evaluation, and execution boundary are explicit.

## Implementation Sequence

1. Write scenario examples and acceptance evidence.
2. Define state and invariants before data tables.
3. Publish contract drafts and consumer expectations.
4. Implement domain behavior with invariant tests.
5. Add persistence and Event publication through an outbox or equivalent reliable pattern.
6. Build the projection and user or partner interface.
7. Add policy, security, telemetry, and runbook.
8. Exercise retry, duplicate, late data, correction, and dependency failure.
9. Demonstrate the end-to-end trace and business outcome.

## Review Questions

Can a domain expert explain every state transition? Is an Event a completed fact rather than a request? Can a repeated Command create a duplicate effect? What happens when the response is lost? Can an operator see why the slice is blocked? Can a historical decision be reviewed using knowledge available at the time?

## Completion

A vertical slice is complete when it runs in a production-like environment, contract tests pass, observability exposes technical and business state, security controls are enforced, a runbook is exercised, and Canon traceability is inspectable.
