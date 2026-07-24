# Architecture Design Review Facilitation

## Before the Review

The author distributes a concise context, proposed decision, diagrams, scenarios, Canon dependencies, alternatives, risks, contracts, and open questions. Reviewers receive enough time to inspect the material. A meeting is not used to reveal an unread design for the first time.

## Review Sequence

Begin with business reality and intended outcome. Confirm the truth owner and authority boundary. Walk through identities, Relationships, time, state, Commands, Events, Decisions, Intent, and corrections. Then review data, AI, security, platform, infrastructure, and operations.

Use concrete scenarios rather than debating abstract preferences. Include a normal case, an invalid transition, late evidence, contradictory evidence, retry after response loss, partner outage, security abuse, and disaster recovery.

## Decision Matrix

| Dimension | Questions |
|---|---|
| Correctness | Does the design preserve the GTOS concepts and invariants? |
| Authority | Are assertions, Decisions, delegation, and execution legitimate? |
| Compatibility | Can existing consumers and historical data retain meaning? |
| Security | Are trust boundaries, purpose, jurisdiction, and abuse controlled? |
| Operability | Can teams observe, support, recover, and reconcile? |
| Evolution | Can the design change without semantic fragmentation? |
| Cost | Is complexity proportional to business impact? |

## Review Outcomes

Outcomes are approved, approved with conditions, revise and return, or rejected. Conditions have owners and due dates. Dissent and rejected alternatives are preserved. Approval applies to a version and scope, not to all future implementation changes.

## Healthy Review Behavior

Reviewers challenge the design, not the person. Seniority does not replace evidence. Novelty is neither a virtue nor a defect. A simpler design wins only when it preserves required semantics and controls. A sophisticated design is rejected when operational ownership is not credible.

## After the Review

Update the ADR, architecture models, risks, contracts, and backlog. Verify that conditions enter delivery planning. Significant deviations return to review rather than appearing only in code.
