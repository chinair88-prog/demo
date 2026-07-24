# Deontic and Authority Model

## Deontic Concepts

GTOS distinguishes:

- **Permission:** an action may be performed.
- **Obligation:** an action is required.
- **Prohibition:** an action must not be performed.
- **Authority:** an actor may make a binding assertion or decision.
- **Delegation:** bounded authority is granted to another actor.
- **Mandate:** an actor is instructed to pursue an objective within constraints.
- **Liability:** accountability for a consequence or failure.

## Authority Invariants

1. Technical capability does not imply business authority.
2. Access to data does not imply authority to alter truth.
3. AI recommendation does not imply authority to decide.
4. Authority SHALL have scope, source, validity, and revocation semantics.
5. Delegation SHALL NOT silently expand through service composition.
6. Emergency authority SHALL expire and be reviewed.

## Policy Result

A policy evaluation may return permit, deny, require approval, require evidence, or require additional obligations. It SHALL identify the policy version and evaluation context.
