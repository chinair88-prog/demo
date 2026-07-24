# Playbook — AI Use-Case Qualification

## Purpose

Determine whether AI is appropriate and what authority boundary applies.

## When to Use

Use this playbook when creating or materially changing a GTOS domain, platform capability, integration, data product, AI capability, security control, migration, or operational process. The facilitator SHALL adapt detail to impact without removing foundational questions.

## Preparation

Identify sponsor, accountable owner, participants, decisions required, source evidence, current constraints, affected jurisdictions, and the deadline. Distribute existing domain models, contracts, incidents, policies, and metrics before the session.

## Working Steps

1. Classify output type.
2. Identify evidence and uncertainty.
3. Assess impact and reversibility.
4. Define human oversight.
5. Select evaluation metrics.
6. Design containment.


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

- use-case card
- risk classification
- agent mandate
- evaluation plan
- tool policy
- incident controls


## Quality Controls

Outputs SHALL use GTOS terminology, identify Canon dependencies, distinguish authority from technical ownership, and include unresolved questions. Decisions made during the playbook are captured in ADRs or governed registries.

## Completion Evidence

The playbook is complete when accountable owners approve the outputs, downstream teams can implement from them, testable acceptance criteria exist, and critical uncertainty is either resolved or formally controlled.
