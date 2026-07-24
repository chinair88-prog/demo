# Scenario — Sanctions and Restricted-Party Screening

## Context

Trade participants and beneficial owners are screened against external lists that change over time and contain uncertain identity information.

## Knowledge Discipline

A screening match is a Claim or risk signal, not proof that the party is sanctioned. The system preserves list edition, matching method, identifiers, confidence, and analyst evidence.

## Decision

Policy defines thresholds for automatic clear, evidence request, human review, or prohibition. A binding decision requires authority and records the knowledge cutoff.

## Temporal Behavior

A party may be clear when an order is accepted and later listed before shipment. GTOS distinguishes decision time, policy effective time, and execution time. Controls may require re-screening at defined lifecycle points.

## Correction

False-positive resolution records evidence and authority. It does not remove the fact that a match occurred and influenced earlier operations.

## AI

AI may assist entity resolution and evidence summarization, but SHALL not promote probabilistic similarity into legal identity without the approved decision path.
