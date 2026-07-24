# Testing and Conformance

## Test layers

- unit tests for pure rules and invariants;
- property-based tests for state and numerical constraints;
- database/migration tests with real engines;
- component integration tests with real dependencies;
- API and Event contract tests;
- workflow restart, timeout, duplicate, ordering, and compensation tests;
- security, authorization, tenant-isolation, privacy, and abuse tests;
- Portal E2E tests;
- performance, capacity, soak, and resilience tests;
- backup/restore and disaster-recovery exercises;
- AI evaluation and adversarial tests.

## Conformance levels

- C0: documentation skeleton;
- C1: Domain semantics and contracts defined;
- C2: implementation and automated tests exist;
- C3: security, observability, recovery, and migration verified;
- C4: production evidence and operational ownership established;
- C5: independently certified for high-assurance use where required.

## Release evidence

A release package contains versioned artifacts, SBOM, signatures, migration report, test results, security findings, compatibility report, performance evidence, runbook, rollback plan, dashboards, approvals, and known limitations.
