# Architecture-Aware Backlog Decomposition

## Problem

Traditional backlogs split work by screen, API, database, or team. This creates horizontal layers that appear busy but delay proof of business correctness. GTOS decomposes work around business outcomes and governed changes.

## Work Item Anatomy

A well-formed work item identifies subject, desired outcome, truth owner, triggering observation or Intent, state transition, invariant, decision or policy, Command, Event, evidence, consumer, security context, and operational acceptance. Not every item requires all elements, but omitted elements are consciously assessed.

## Decomposition Patterns

Use lifecycle slices such as create, validate, approve, execute, correct, and close. Use risk slices such as normal path, insufficient evidence, policy denial, partner delay, correction, and recovery. Use authority slices when human approval, delegated authority, and automated decision have different controls. Use temporal slices when current-state and historical reconstruction require separate projections.

## Enablers

Foundational enablers include identity resolution, schema registry, policy enforcement, Event transport, evidence store, observability, and deployment automation. Enablers SHALL have explicit consumers and acceptance outcomes; otherwise they become infrastructure programs detached from value.

## Anti-Patterns

“Create microservice,” “add Kafka,” “build AI agent,” “sync customer data,” and “make dashboard” are not outcome-ready items. They hide semantics and encourage technical completion without operational usefulness.

## Definition of Ready

The team can state what becomes true, who owns that truth, how the change is authorized, which evidence proves completion, how failure is visible, and how rollback or correction behaves. Dependencies have owners and contract expectations.

## Definition of Done

The implemented change includes tests, contracts, security, telemetry, documentation, migration, runbook, and traceability. Product acceptance confirms the business outcome, not only that the interface responds.
