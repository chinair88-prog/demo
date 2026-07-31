# GTOS Enterprise Architecture Implementation Roadmap

## Guiding rule

Do not attempt to build every target capability at once. The architecture must be introduced through evidence-based increments that preserve the current system and create reusable foundations.

## Phase 0 — Repository and runtime discovery

Deliverables:

- repository map and dependency inventory;
- application and service catalog;
- data-store and schema inventory;
- current authentication, authorization, and tenancy map;
- API, event, job, and integration inventory;
- deployment and environment map;
- observability and test coverage map;
- duplication and architectural-risk register;
- capability status matrix using Vision / Planned / Implemented / Production Validated.

Exit gate:

No implementation plan is approved until major unknowns, system owners, and critical risks are documented.

## Phase 1 — Architecture governance and contracts

Deliverables:

- Architecture Council and domain ownership;
- ADR process;
- bounded-context map;
- API and event standards;
- TypeScript and runtime-schema standards;
- tenant-context and identity propagation standard;
- error taxonomy;
- audit and correlation identifiers;
- security classification and approval policy;
- CI checks for type safety, linting, tests, secrets, and dependency risk.

Exit gate:

New code cannot merge without ownership, contracts, authorization behavior, tests, and observability expectations.

## Phase 2 — AI Core foundation

Deliverables:

- AI Core API boundary;
- model gateway and provider abstraction;
- intent and sensitivity classification;
- tool registry;
- policy enforcement point;
- execution budget and timeout controls;
- workflow state model;
- audit event model;
- evaluation harness;
- human approval interface for sensitive actions.

Initial scope must be read-only or low-risk. Do not begin with autonomous financial, contract, or destructive operations.

## Phase 3 — MCP/domain integration pilot

Choose two mature domains, preferably one read-heavy and one controlled write domain.

Deliverables:

- typed MCP contracts;
- tenant and permission enforcement;
- adapter to existing domain services;
- idempotency for commands;
- contract tests;
- latency, failure, and audit telemetry;
- deprecation and versioning process.

Exit gate:

The pilot demonstrates that AI cannot bypass domain rules or access raw persistence.

## Phase 4 — Durable workflow and event backbone

Deliverables:

- workflow engine selection or implementation;
- state-machine conventions;
- retry, timeout, dead-letter, and compensation patterns;
- event envelope and schema registry;
- transactional outbox/inbox pattern;
- correlation across AI, MCP, and domain operations;
- operational dashboards and runbooks.

## Phase 5 — Community MVP

Deliverables:

- discussions, Q&A, accepted answers, case studies;
- structured trade context;
- content moderation and reporting;
- profiles and baseline reputation;
- search, route, and category filters;
- product and supplier linking;
- source-linked AI summaries and duplicate suggestions;
- privacy and evidence controls.

Cold-start plan:

- official route guides;
- verified expert contributors;
- seeded Q&A from real operational problems;
- structured success and failure cases;
- moderation staffing and response targets.

## Phase 6 — Knowledge, memory, and trust graph

Deliverables:

- governed semantic retrieval;
- vector indexing with provenance and access control;
- graph model for entities, trade flows, content, and evidence;
- memory classes and retention policies;
- freshness and contradiction handling;
- verified trust assertions;
- explainable AI retrieval with source links.

## Phase 7 — Browser and vision automation

Begin only where APIs or partner integrations are unavailable.

Deliverables:

- isolated browser worker runtime;
- credential and session vault;
- navigation and action planner;
- DOM/accessibility-first resolver;
- vision fallback;
- evidence capture and redaction;
- allowlists, approvals, and action limits;
- recovery, retry, and operator handoff;
- full automation test suite.

## Phase 8 — Enterprise hardening

Deliverables:

- threat models and security testing;
- regional data and compliance controls;
- backup, restore, and disaster-recovery exercises;
- load, soak, and failure-injection tests;
- SLOs and error budgets;
- cost and capacity controls;
- incident response and on-call ownership;
- supply-chain and dependency security;
- release, migration, rollback, and business-continuity runbooks.

## Phase 9 — Production validation

A capability reaches Production Validated only after:

- real deployment evidence;
- monitored SLO performance;
- tenant-isolation tests;
- security sign-off;
- recovery and rollback test;
- operational ownership;
- acceptable user and business outcomes;
- no unresolved critical defects.

## First 12 implementation epics

1. Repository and runtime evidence inventory
2. Domain and ownership map
3. Architecture governance and ADR system
4. Contract and schema standards
5. Identity, tenant, policy, and audit context
6. AI Core read-only foundation
7. MCP pilot for two domains
8. Durable workflow and event contracts
9. Community MVP domain model and APIs
10. Search, semantic retrieval, and provenance
11. Reputation, moderation, and trust controls
12. Production readiness, observability, and security gates

## Explicit non-goals for the first release

- pretending that every handbook capability already exists;
- introducing dozens of microservices without operational need;
- allowing AI raw database access;
- autonomous high-risk financial or legal actions;
- unverified public accusations in reputation features;
- browser automation where a supported API exists;
- training models on private community or transaction data without policy and consent.
