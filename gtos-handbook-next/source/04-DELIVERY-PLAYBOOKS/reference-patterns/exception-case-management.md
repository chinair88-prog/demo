# Exception and Case Management Pattern

## Context

Not every trade condition can be automated safely. Missing documents, conflicting identities, damaged cargo, policy ambiguity, suspected fraud, and partner disagreement require collaborative resolution.

## Case Structure

A Case contains issues, subjects, participants, authority, severity, tasks, evidence requests, decisions, communications, deadlines, and resolution.

## Rules

A Case SHALL not become a second source of domain truth. It references domain facts and publishes authorized Decisions and Outcomes back to owning domains. Case notes are Observations unless formally asserted under authority.

## Closure

Closure requires resolution criteria, authority, downstream remediation, and evidence completeness. Reopening creates new history. Metrics include age, blocked time, evidence wait, decision reversal, and recurrence.

## AI

AI may summarize, classify, identify missing evidence, or recommend next action. It SHALL not fabricate closure evidence or silently decide high-impact disputes.
