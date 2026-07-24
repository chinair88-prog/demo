# Business Recovery Exercise

## Objective

The exercise proves that GTOS can restore service and reconcile business truth after a realistic failure. A successful infrastructure failover without business completeness is a failed exercise.

## Scenario Design

Select a scenario that crosses domains and trust boundaries: regional outage during customs release, Event transport loss during shipment custody transfer, compromised partner credential during payment processing, or data-store restoration while corrections are in flight.

Define failure time, affected components, data boundary, known and hidden symptoms, expected detection, business deadlines, and legal or partner obligations. Inject ambiguity so responders must acquire evidence rather than follow a scripted answer.

## Exercise Phases

1. Detect and declare the incident.
2. Establish command roles and preserve evidence.
3. Contain unsafe execution and compromised authority.
4. Restore identity, policy, authoritative stores, Event transport, workflow, and projections in dependency order.
5. Identify gaps, duplicates, stale projections, and unresolved Commands.
6. Reconcile identities, state, obligations, Decisions, Intent, Events, and financial totals.
7. Notify participants and regulators where required.
8. Return to controlled operation and close temporary authority.

## Success Criteria

RTO and RPO are met or variances explained. No unauthorized default action occurs. Historical and current state can be reconstructed. Duplicate effects are prevented or corrected. Partner exchanges are reconciled. Evidence proves each restoration and decision.

## Review

The review distinguishes technical restoration, business reconciliation, and stakeholder recovery. Actions address architecture, tooling, runbooks, access, training, capacity, and partner agreements. The exercise is repeated until critical weaknesses are verified closed.
