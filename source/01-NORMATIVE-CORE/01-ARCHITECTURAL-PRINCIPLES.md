# Architectural Principles

## 1. Truth has an owner

Every proposition has exactly one authoritative owner at a given level of abstraction. Other services may cache or project it but may not mutate it by shared-table access.

## 2. History is append-oriented

Approved, issued, submitted, signed, paid, released, inspected, delivered, and settled facts shall not be rewritten. Corrections and revocations create new facts linked to the originals.

## 3. Authority is evaluated at action time

Authentication alone is insufficient. Every binding action must evaluate principal, represented organization, role, relationship, delegation, mandate, jurisdiction, purpose, and policy.

## 4. Distributed execution assumes partial failure

Every external or cross-service action must support idempotency, timeouts, retries, duplicate messages, out-of-order delivery, replay, outcome unknown, reconciliation, and compensation.

## 5. Events describe completed facts

Commands use imperative names. Events use past-tense completed-fact names. Plans, requests, and predictions are not Events.

## 6. AI is governed software

AI may extract, classify, summarize, predict, recommend, plan, or invoke typed tools within policy. It shall not own canonical truth, invent authority, conceal uncertainty, or bypass approval.

## 7. Security is architectural

Tenant isolation, least privilege, data minimization, secret isolation, integrity, audit, and incident containment are designed into every Domain and contract.

## 8. Operational ownership is part of design

Every service and workflow has an owner, SLO, dashboard, alert, runbook, capacity plan, dependency map, recovery procedure, and decommissioning plan.

## 9. Compatibility is explicit

APIs, Events, database migrations, files, tools, prompts, and policy versions evolve through documented compatibility rules.

## 10. Completion requires evidence

A capability is not complete because code compiles. It is complete when invariants, security, interoperability, recovery, performance, and business outcomes are proven by executable evidence.
