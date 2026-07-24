# Production Readiness Review

## Purpose

The Production Readiness Review establishes that a capability can safely carry real trade decisions and effects. It combines architecture, engineering, security, data, AI, and operations evidence.

## Service Ownership

The service has an accountable product owner, domain owner, engineering owner, security contact, and on-call rotation. Escalation paths include partner, regulatory, financial, and executive contacts where applicable.

## Functional Integrity

State models and invariants are implemented and tested. Commands are idempotent. Events represent completed facts. Corrections preserve history. Domain and contract versions are registered. Data migration and reconciliation are complete.

## Security and Privacy

Threat models are current. Identities, credentials, delegation, policy, purpose, classification, secrets, encryption, audit, and incident containment are tested. Administrative capabilities use stronger controls. AI tools cannot bypass external policy enforcement.

## Reliability

SLOs and error budgets reflect business journeys. Capacity covers peak, replay, recovery, and partner delay. Dependencies have timeout, retry, circuit, degradation, and ownership. Backups and restoration have been tested. Recovery includes business reconciliation.

## Observability

Dashboards show availability, latency, errors, saturation, Event freshness, queue age, business state age, policy denial, evidence gaps, decision outcomes, and correction backlog. Alerts map to runbooks and accountable responders.

## Change and Rollback

Deployment is staged and observable. Rollback criteria are objective. Rollback SHALL not delete new business facts or re-enable incompatible contracts. Feature flags, policy switches, tool disablement, or traffic controls support containment.

## Go/No-Go

Critical findings block launch. Major findings require approved compensating controls and dates. The decision record captures attendees, evidence, dissent, risks, authority, and conditions. A successful review is valid only for the declared release, environment, and scope.
