# Scenario — Customs Declaration and Release

## Context

An importer, broker, carrier, customs authority, and terminal coordinate declaration and release.

## Authority

The importer owns commercial and product information within its scope. The broker acts through a mandate. Customs owns legal acceptance, inspection, and release determinations. The terminal owns physical gate and cargo movement observations.

## Flow

A broker submits a declaration Command under a valid Relationship and delegation. Customs records `DeclarationSubmitted`, evaluates policy and evidence, and may produce `InspectionOrdered` or `GoodsReleased`. The carrier's operational view consumes the customs Event but remains a perspective.

## Late Information

A corrected classification arrives after release. GTOS preserves the original declaration, knowledge available to customs, policy version, and release Decision. The correction triggers impact analysis for duty, license, risk, and audit. It does not rewrite the original decision into a fictional present-day evaluation.

## Security

Authorization considers importer-broker relationship, jurisdiction, commodity scope, mandate validity, and purpose. Possession of a declaration identifier does not grant access.

## Operational Requirement

If messaging is unavailable, customs authority may still make a decision through its own system. Later ingestion records observation and recording time, preserving that reality preceded GTOS representation.
