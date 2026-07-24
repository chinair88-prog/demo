# Temporal Reconstruction Pattern

## Purpose

Auditors, operators, and AI reviewers frequently need to know not only the current state but what was true, what was recorded, and what was knowable at a previous time.

## Model

A governed record may include:

- valid-from and valid-to;
- observed-at;
- recorded-at;
- corrected-at;
- supersedes reference;
- source and authority;
- transaction sequence.

The reconstruction service accepts a subject, business-time boundary, knowledge-time boundary, and perspective. It returns the state derivable from assertions valid under those boundaries.

## Example

A customs release was legally effective at 10:00. GTOS received the release at 10:08. A carrier decision made at 10:05 could not legitimately rely on the release even though a present-day query shows the cargo as released at 10:00.

## Requirements

Reconstruction SHALL use the same rules and schema versions applicable to the historical period or explicitly disclose reinterpretation. Late data and corrections SHALL not be silently back-projected into a decision-time knowledge view. Queries SHALL name their temporal semantics.

## Operational Use

Temporal reconstruction supports incident analysis, legal evidence, model evaluation, customer dispute resolution, correction propagation, and recovery reconciliation.
