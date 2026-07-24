# Long-Running Trade Workflow Pattern

## Context

International trade workflows may span weeks, involve many organizations, depend on documents and decisions, and encounter partial failure. A single distributed transaction is neither available nor desirable.

## Pattern

A workflow coordinates Intent, Commands, Events, timers, evidence requests, human tasks, and compensation. Domains remain authoritative for their facts. The workflow owns coordination state only.

## Example Sequence

1. An accepted Order creates Intent to fulfil.
2. Shipment planning requests transport booking.
3. The Transport Domain records booking outcome.
4. Documentation requests missing certificates.
5. Compliance evaluates evidence and may request inspection.
6. Finance confirms payment conditions.
7. Release Decision authorizes delivery execution.
8. Outcome Events close obligations.

## Rules

Every step SHALL be idempotent. Timers SHALL identify business meaning, not only technical delay. Compensation SHALL be modeled as new authorized action, not deletion of history. Human intervention SHALL be first-class. Workflow retry SHALL NOT assume the prior Command failed merely because a response was lost.

## Observability

Operators need workflow age, blocked reason, missing evidence, current authority dependency, retry state, and expected next outcome. Technical traces alone are insufficient.
