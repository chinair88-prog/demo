# Identity Resolution Pattern

## Problem

Global trade participants are represented through legal names, registration numbers, tax identifiers, customs identifiers, partner codes, account numbers, facility identifiers, and credentials. These identifiers may be incomplete, duplicated, expired, reassigned, or valid only within a jurisdiction or relationship.

## Pattern

GTOS separates the Entity from every Identifier. Each Identifier records issuer, namespace, jurisdiction, validity, verification status, evidence, and confidence. Identity resolution proposes candidate matches; an authorized identity decision establishes merge, link, split, or rejection.

## Required Flow

1. Receive an Observation containing one or more identifiers.
2. Normalize without discarding the original representation.
3. Retrieve candidate Entities.
4. Evaluate deterministic and probabilistic evidence.
5. Produce a Recommendation with confidence and explanation.
6. Make an authorized identity Decision when consequences are material.
7. Preserve the original Observation, Decision, and resulting Relationship.
8. Propagate correction through governed events.

## Failure Controls

A high similarity score SHALL NOT automatically merge legal parties when sanctions, payments, title, or regulatory rights may be affected. Merge operations SHALL be reversible through preserved history. Consumers SHALL distinguish canonical Entity identity from partner-specific identifiers.

## Canon Traceability

CANON-001, CANON-002, CANON-003, CANON-008, CANON-009, and CANON-010.
