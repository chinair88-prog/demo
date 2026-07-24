# Correction Propagation Pattern

## Problem

A corrected fact may have influenced projections, decisions, documents, payments, risk scores, or downstream participants.

## Pattern

The correction Event references the original assertion and reason. An impact service identifies dependent artifacts through lineage. Each owner decides whether to recompute, appeal, notify, compensate, or retain the prior result as historically valid.

## Distinctions

- A corrected Observation may change Knowledge.
- New Knowledge may justify a new Decision.
- A new Decision may create remediation Intent.
- Remediation Execution produces new Outcomes.
- None of these erase the prior chain.

## Controls

Propagation SHALL be prioritized by legal and business impact. Automated recomputation SHALL not retroactively rewrite signed documents or completed decisions without authority. Consumers SHALL record correction-handling status.

## Measure

Correction closure includes detection time, affected artifact count, unresolved high-impact dependencies, notification completion, and reconciliation evidence.
