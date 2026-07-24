# AI Release Engineering Guide

## Release Unit

An AI release includes model, route, prompt or task definition, retrieval configuration, tool registry, policy, structured output schema, evaluation set, thresholds, observability, and rollback controls. Changing any component can change behavior.

## Pre-Release Evaluation

Evaluate task quality, factuality, evidence faithfulness, calibration, uncertainty, prohibited behavior, bias, security, latency, cost, and tool safety. High-impact use cases include representative edge cases, contradictory evidence, missing evidence, policy changes, and adversarial inputs.

## Staged Deployment

Use offline evaluation, shadow operation, limited internal users, low-impact traffic, controlled participant cohorts, and progressive automation. Compare recommendations or decisions against an approved baseline. Do not expose execution tools before recommendation and policy behavior are stable.

## Runtime Controls

The runtime validates structured output, enforces policy outside the model, limits tools and egress, applies budgets, records evidence and tool calls, and supports human escalation. A kill switch can disable model routes, tools, Mandates, or decision classes.

## Monitoring

Track success, evidence support, hallucination, unsafe requests, tool denial, escalation, decision reversal, downstream outcome, latency, and cost. Drift includes data, policy, prompt, tool, and user behavior—not only model statistics.

## Rollback

Rollback returns to an approved release configuration. It does not rewrite decisions or outcomes already produced. A harmful decision may require appeal, correction, notification, or remediation.

## Approval

AI owner, domain authority, security, data, operations, and architecture approve according to impact. The Decision Record identifies evidence and conditions for continued operation.
