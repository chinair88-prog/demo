# Playbook — SLO and Runbook Design

## Purpose

Translate business criticality into measurable reliability and executable operations.

## When to Use

Use this playbook when creating or materially changing a GTOS domain, platform capability, integration, data product, AI capability, security control, migration, or operational process. The facilitator SHALL adapt detail to impact without removing foundational questions.

## Preparation

Identify sponsor, accountable owner, participants, decisions required, source evidence, current constraints, affected jurisdictions, and the deadline. Distribute existing domain models, contracts, incidents, policies, and metrics before the session.

## Working Steps

1. Identify user journeys.
2. Choose service indicators.
3. Set objectives and error budgets.
4. Define alerts.
5. Write runbooks.
6. Exercise recovery.


## Facilitation Questions

- What exists in business reality independently of our software?
- Who owns each proposition and under what authority?
- Which identifiers remain stable through change?
- Which time dimensions matter?
- What state and invariants must be protected?
- Which messages are Commands, Events, Observations, Recommendations, or Decisions?
- What evidence is available and what remains uncertain?
- What Intent authorizes execution?
- How are correction, replay, recovery, and dispute handled?

## Outputs

- SLO catalogue
- dashboard
- alert map
- runbooks
- exercise evidence


## Quality Controls

Outputs SHALL use GTOS terminology, identify Canon dependencies, distinguish authority from technical ownership, and include unresolved questions. Decisions made during the playbook are captured in ADRs or governed registries.

## Completion Evidence

The playbook is complete when accountable owners approve the outputs, downstream teams can implement from them, testable acceptance criteria exist, and critical uncertainty is either resolved or formally controlled.
