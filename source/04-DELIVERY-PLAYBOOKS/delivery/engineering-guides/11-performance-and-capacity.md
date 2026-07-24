# Performance and Capacity Engineering

## Business Workload Model

Capacity begins with trade volumes, lifecycle peaks, partner deadlines, jurisdictional cutoffs, document size, Event fan-out, workflow duration, analytical demand, and AI usage. Average requests per second alone is insufficient.

## Critical Paths

Identify synchronous decision paths, asynchronous flow paths, batch deadlines, recovery replay, and user investigation. Each has latency and throughput objectives. External authorities may dominate latency; the system must expose blocked dependency rather than appear generally slow.

## Load Profiles

Test normal, peak, burst, partner reconnect, backlog drain, Event replay, migration, incident diagnostics, and regional failover. Include large Relationships, long histories, high-cardinality searches, and worst-case policy evaluation.

## Resource Controls

Apply quotas, fairness, backpressure, rate limits, queue isolation, workload priority, and AI token or tool budgets. One tenant, partner, Agent, or replay SHALL not exhaust shared capacity.

## Degradation

Define which functions can serve stale projections, queue work, require manual review, or suspend action. Degradation SHALL not bypass authorization, evidence, or invariant checks.

## Cost

Track unit cost by business outcome, domain, partner, data product, and AI use case. Cost controls SHALL not delete required history, reduce audit, disable security, or route sensitive data through unapproved processors.

## Capacity Review

Review before major seasonal peaks, partner launches, policy changes, model expansion, or migrations. Evidence includes forecasts, tests, observed headroom, dependency limits, and contingency.
