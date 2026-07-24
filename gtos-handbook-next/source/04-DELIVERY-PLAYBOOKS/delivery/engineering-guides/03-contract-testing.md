# Contract Testing Guide

## Scope

Contract testing protects meaning exchanged through APIs, Commands, Events, data products, policy interfaces, and AI tools. Syntax validation is necessary but insufficient. A consumer may parse a payload while reaching the wrong business conclusion because units, temporal meaning, authority, or defaults changed.

## Test Layers

Schema tests validate required fields, types, formats, and structural compatibility. Semantic tests validate examples, units, identifier scope, state meaning, temporal interpretation, and authority. Provider tests prove production behavior conforms to the contract. Consumer tests prove supported versions and expected conclusions. Negative tests cover unauthorized subjects, stale evidence, invalid transitions, unknown enum values, and prohibited fields.

## Event Tests

Event tests verify past-tense semantics, immutable identity, subject, source, occurrence and recording time, schema version, replay, ordering scope, duplicate handling, and correction references. A consumer SHALL tolerate at-least-once delivery and explicit version evolution.

## API Tests

API tests verify authentication, relationship-aware authorization, idempotency, concurrency, pagination order, error categories, deprecation headers, and temporal query semantics. Commands test rejection and conflict as first-class outcomes.

## Data Product Tests

Data products test grain, uniqueness, point-in-time correctness, lineage, quality thresholds, access classification, and backward compatibility. Analytical output SHALL not silently become authoritative operational truth.

## Certification

External partners receive a conformance pack containing schemas, examples, test endpoints or fixtures, security requirements, replay and retry behavior, version policy, and support contacts. Certification results are versioned and expire when a breaking change or trust change occurs.

## Release Gate

A release fails when material consumers are unknown, semantic changes lack migration, or contract tests do not cover authority and time. Temporary waivers identify affected consumers and sunset dates.
