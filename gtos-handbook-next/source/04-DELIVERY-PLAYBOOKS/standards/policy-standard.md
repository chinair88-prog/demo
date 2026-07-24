# GTOS Policy Standard

## Purpose

Policy expresses permission, prohibition, obligation, required approval, threshold, routing, or evidence requirement.

## Policy Anatomy

A policy has identity, owner, authority basis, scope, effective time, version, inputs, rule logic, result types, explanation template, tests, and retirement state.

## Input Context

Inputs may include actor identity, organizational Relationship, delegation, resource, action, purpose, jurisdiction, time, classification, risk, evidence, and operational state.

## Results

A result includes permit, deny, require approval, require evidence, or permit with obligations. The result records policy version, material inputs, reason codes, and decision time.

## Separation

Policy evaluation is not always a business Decision. A policy may provide a required control used by an authorized Decision process. Where policy automatically produces a binding determination, the evaluation is recorded as a Decision with authority.

## Testing

Policies require positive, negative, boundary, temporal, jurisdiction, delegation, and conflict tests. Production policy changes use staged rollout and decision comparison.

## Conflict Resolution

Conflicts are resolved by explicit priority and authority, not rule order accident. More restrictive rules do not automatically win when jurisdictions or legal authorities differ; the applicable authority model determines precedence.

## Explainability

Explanations identify the governing rule and material facts without exposing secrets or enabling control evasion.

## Lifecycle

Policies are reviewed when law, contract, risk, business model, or evidence changes. Expired policy SHALL not remain silently active.
