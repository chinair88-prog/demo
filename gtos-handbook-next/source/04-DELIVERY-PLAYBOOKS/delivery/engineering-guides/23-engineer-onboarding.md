# Engineer Onboarding Guide

## First Principles

A new GTOS engineer first learns the conceptual distinctions that drive implementation: reality is not the database; identity is not an identifier; state is scoped; Events are completed facts; Observations are not automatically truth; recommendations are not Decisions; execution requires Intent; correction preserves history.

## First Week

Read the Reference Theory, Canon, Constitution, Domain Architecture, Engineering Standards, and the charter for the assigned domain. Review one end-to-end scenario, one incident, one ADR, one Command, one Event, and one runbook. Set up the local environment and run validation and build tools.

## First Assignment

The initial assignment SHOULD be a bounded vertical slice or defect that crosses model, test, observability, and documentation. Purely cosmetic work does not teach authority, contracts, or operations. Pair with a domain expert and experienced engineer.

## Required Competencies

The engineer can explain the domain owner, aggregates, invariants, Command and Event semantics, temporal fields, idempotency, contract versions, authorization context, data classification, SLOs, and recovery. AI engineers additionally explain evidence, output type, Mandate, tools, evaluation, and containment.

## Development Workflow

Before coding, confirm Definition of Ready. During implementation, update tests, contracts, documentation, telemetry, and ADRs. Before review, run validation and demonstrate failure paths. Code review examines business meaning and operability, not only style.

## Production Responsibility

Engineers participate in production readiness, observe deployments, learn runbooks, and review incidents. Ownership does not end when code merges. Teams are expected to understand how their capability behaves under duplicate, delay, correction, dependency failure, and recovery.

## Learning Path

After domain proficiency, engineers rotate through partner integration, security or policy, data lineage, AI evaluation, and operations. The objective is not that every engineer becomes a chief architect, but that local decisions preserve the end-to-end operating model.
