# Enterprise AI Core and Go-Live Constitution

## 1. Role and operating posture

Engineering agents and teams working on GTOS must act as system architects and maintainers of an existing enterprise platform, not as isolated feature builders.

Before changing code, they must inspect the relevant repository areas, dependencies, data contracts, authorization rules, deployment configuration, and business workflows. Unknowns must be recorded explicitly. No component may be described as implemented without evidence.

## 2. No-duplication policy

Do not create a new service, store, workflow engine, authentication path, integration adapter, event channel, or AI subsystem until the repository and runtime inventory prove that an equivalent capability does not already exist.

Preferred order:

1. Reuse an existing capability.
2. Extend it through a stable contract.
3. Consolidate duplicate logic.
4. Refactor with compatibility protection.
5. Create a new bounded component only with an approved ADR.

## 3. Unified AI Core

All AI-initiated work must pass through a unified orchestration boundary.

The AI Core owns:

- intent classification;
- context acquisition;
- plan construction;
- risk and cost evaluation;
- policy and permission checks;
- tool and model selection;
- workflow execution;
- validation and self-correction;
- event emission;
- audit records;
- user-facing result synthesis.

No AI agent may directly mutate business state, bypass policy checks, or access persistence through an ungoverned path.

## 4. MCP and domain access

MCP is the governed AI-facing integration boundary. It is not a replacement for domain ownership.

Each MCP server or adapter must:

- map to a clearly owned business domain;
- expose typed request and response schemas;
- validate tenant, identity, role, and resource scope;
- distinguish read, write, destructive, and approval-required operations;
- be versioned and backward-compatible;
- emit audit and observability events;
- handle timeouts, partial failures, and retries;
- avoid exposing raw database or unrestricted SQL access.

Initial domain surfaces:

- Identity and Tenancy
- Customers and CRM
- Suppliers and Sourcing
- Catalog and Products
- RFQ and Negotiation
- Orders and Contracts
- Inventory and Warehouse
- Logistics and Shipping
- Customs, Compliance, and Tax
- Payments and Accounting
- Documents
- Community and Reputation
- Analytics and Reports
- Security and Audit
- Knowledge and Search

## 5. Workflow engine

Every non-trivial AI action follows a durable workflow lifecycle:

1. Intent parsing
2. Context retrieval
3. Authorization and policy evaluation
4. Planning
5. Human approval when required
6. Tool execution
7. Output validation
8. State persistence
9. Event emission
10. Result synthesis
11. Post-execution evaluation

Workflow requirements:

- correlation ID and causation chain;
- explicit state machine;
- idempotency key for repeatable writes;
- retry policy and dead-letter handling;
- compensation or rollback where possible;
- resumability after interruption;
- deterministic checkpoints;
- full audit trail.

## 6. Multi-agent runtime

Agents are specialized workers behind the AI Core, not autonomous parallel products.

Canonical roles:

- Executive Orchestrator
- Planner
- Policy and Risk Agent
- Workflow Agent
- MCP Router
- Browser Agent
- Vision Agent
- Memory Agent
- Validation Agent

The Executive Orchestrator controls delegation, budgets, deadlines, and final validation. Agents must not share unrestricted memory or permissions.

## 7. Browser and vision automation

Browser automation is an enterprise subsystem, not a collection of raw scripts.

Required components:

- session and credential manager;
- navigation planner;
- tab and window manager;
- action queue;
- selector resolver;
- DOM and accessibility-tree interpreter;
- screenshot and vision fallback;
- OCR only where justified;
- download and upload manager;
- retry and recovery engine;
- evidence capture and redaction.

The browser agent must prefer stable APIs and structured integrations over UI automation. Vision fallback may assist recovery but must not silently authorize or execute high-risk actions.

## 8. Memory architecture

Memory is separated by purpose and retention:

- execution memory;
- conversation memory;
- workflow state;
- business knowledge;
- semantic retrieval memory;
- user preferences;
- audit history.

Every memory class requires:

- retention policy;
- tenant and subject scope;
- sensitivity classification;
- access policy;
- provenance;
- versioning;
- conflict handling;
- deletion and legal-hold behavior.

## 9. Event backbone

Important state changes and AI operations emit structured, versioned events.

Core envelopes include:

- event ID;
- event type and version;
- occurred time;
- tenant and actor;
- correlation and causation IDs;
- source domain;
- sensitivity level;
- payload schema reference;
- trace context.

Representative events:

- workflow.started / completed / failed;
- policy.checked;
- approval.requested / granted / rejected;
- mcp.requested / completed / failed;
- browser.action.started / completed / failed;
- memory.read / written;
- domain entity state changed;
- security violation detected.

## 10. Zero-trust security

No permission means no execution.

Every operation evaluates:

- authenticated identity;
- tenant boundary;
- role and attribute policy;
- resource ownership and scope;
- action sensitivity;
- regional and regulatory restrictions;
- approval requirement;
- data minimization and redaction.

Required controls include encryption, secret management, token rotation, rate limits, WAF/API protection, audit logs, supply-chain security, dependency scanning, SAST/DAST, and incident response.

## 11. Observability

Every important AI and business workflow must be traceable across services.

Minimum telemetry:

- structured logs;
- metrics and service-level indicators;
- distributed traces;
- model and tool latency;
- token and monetary cost;
- policy decisions;
- retries and fallbacks;
- user-visible and hidden failures;
- data quality and drift signals.

Sensitive prompts, documents, and business fields must be redacted or tokenized according to policy.

## 12. Type and contract safety

All application and integration boundaries are strongly typed and runtime-validated.

Requirements:

- TypeScript strict mode;
- no implicit any;
- no unchecked external payloads;
- schema validation at trust boundaries;
- typed MCP contracts;
- versioned events and APIs;
- migration and compatibility tests;
- generated clients where appropriate.

## 13. Reliability and self-healing

Self-healing means controlled recovery, not uncontrolled autonomous behavior.

Required mechanisms:

- bounded retries with jitter;
- circuit breakers;
- timeout budgets;
- fallback strategies;
- queue redelivery and dead letters;
- session recovery;
- workflow resume;
- health checks;
- rollback and compensation;
- operator escalation.

## 14. Production and go-live gate

A release cannot be declared production-ready solely because it builds.

Go-live evidence must include:

- approved architecture and threat model;
- green CI/CD;
- deployment and rollback runbooks;
- tenant-isolation verification;
- contract, integration, E2E, and security tests;
- capacity and load tests;
- backup and disaster-recovery test;
- monitoring dashboards and alerts;
- incident ownership;
- data migration rehearsal;
- absence of unresolved critical defects.

Mocks, TODOs, and feature flags may exist only when explicitly tracked and prevented from entering an unsafe production path.
