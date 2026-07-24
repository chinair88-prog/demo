# Architecture Debt Management

## Definition

Architecture debt is a known divergence from the target semantics, controls, or operating model that increases future change cost or present risk. Debt is not every imperfect implementation. It is a governed condition with observable consequence.

## Debt Record

A debt item identifies affected capability, Canon or standard, reason, owner, introduced date, business and technical impact, security or compliance exposure, dependent work, compensating control, remediation options, cost estimate, and expiry or review date.

## Categories

Semantic debt includes ambiguous ownership, identifiers, state, or contracts. Data debt includes missing lineage, temporal meaning, or quality. Security debt includes weak delegation, purpose, or audit. Operational debt includes absent SLOs, runbooks, or recovery. Platform debt includes unsupported dependencies and brittle shared capabilities.

## Prioritization

Prioritize by probability and impact of invalid business effect, blocked evolution, incident exposure, regulatory consequence, partner burden, and repeated exception cost. A small code cleanup is not automatically more important than an unowned proposition used in financial decisions.

## Controls

Debt with critical impact may block release. Accepted debt has accountable authority and compensating controls. Repeated temporary exceptions are converted into debt and reviewed at portfolio level. Delivery metrics SHOULD track debt created and retired, not reward teams for hiding it.

## Remediation

Remediation may involve semantic clarification, contract version, migration, policy, testing, platform capability, or organizational ownership. Completion requires evidence that the risk and dependent work are resolved, not only that a ticket closed.
