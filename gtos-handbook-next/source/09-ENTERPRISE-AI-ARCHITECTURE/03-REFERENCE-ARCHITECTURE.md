# GTOS Reference Architecture

## 1. Architectural style

GTOS should evolve as a domain-oriented modular platform with explicit bounded contexts, event-driven integration, typed APIs, and an AI orchestration layer that never bypasses business-domain controls.

This target does not require premature microservices. A modular monolith is acceptable for early stages when domain boundaries, contracts, ownership, data access, and extraction paths are enforced.

## 2. Logical layers

### Channels

- Executive web portal
- Operations web applications
- Supplier and buyer portals
- Community experience
- Mobile clients
- Voice and conversational interfaces
- Partner and public APIs

### Experience services

- Backend-for-frontend gateways
- Localization and content delivery
- Notification and preference services
- Search and discovery
- Session and interaction telemetry

### AI platform

- AI Core Orchestrator
- Model gateway
- Prompt and policy registry
- Planner and workflow runtime
- Agent registry
- MCP gateway and tool registry
- Memory services
- Retrieval and grounding services
- Evaluation and safety services
- Browser and vision automation

### Business domains

- Identity, Organization, Tenant, and Access
- Customer and CRM
- Supplier and Sourcing
- Catalog and Product
- RFQ, Quote, and Negotiation
- Contract and Order
- Payment, Ledger, and Accounting
- Inventory and Warehouse
- Logistics, Shipment, and Tracking
- Customs, Compliance, and Tax
- Document and Evidence
- Community, Reputation, and Knowledge
- Analytics and Reporting

### Integration backbone

- API gateway
- Event bus
- Schema registry
- Workflow scheduler
- Connector runtime
- Webhooks and partner adapters
- Outbox and inbox processing

### Data platform

- Domain-owned transactional stores
- Search indexes
- Object and document storage
- Analytics warehouse or lakehouse
- Vector store
- Graph store
- Cache
- Data catalog, lineage, quality, and retention controls

### Platform engineering

- CI/CD
- Infrastructure as code
- Container runtime and orchestration
- Secrets and configuration
- Observability
- Security operations
- Backup and disaster recovery
- FinOps and capacity management

## 3. Request path for an AI action

1. A user acts through a trusted channel.
2. Identity and tenant context are established.
3. AI Core classifies intent and sensitivity.
4. Policy engine checks allowed actions and approval needs.
5. Context is retrieved from authorized memory and domain MCP interfaces.
6. Planner produces a bounded workflow.
7. Workflow runtime invokes domain tools or approved browser automation.
8. Domain services enforce business invariants and persist changes.
9. Events, traces, audit records, and evidence are emitted.
10. Validator checks outcome and the user receives a source-aware result.

## 4. Data ownership rules

- Each business entity has one authoritative owning domain.
- Other domains reference it by stable identifiers and contracts.
- Shared databases must not become shared ownership.
- Cross-domain analytics use events, read models, or governed data products.
- AI memory is never the system of record for business facts.
- Community statements are not authoritative legal, financial, customs, or supplier facts unless verified and labeled.

## 5. MCP contract pattern

Each tool definition should include:

- name and semantic purpose;
- owning domain;
- input and output schemas;
- required identity and tenant context;
- permission and sensitivity classification;
- idempotency behavior;
- pagination and partial-result semantics;
- timeout and retry behavior;
- audit fields;
- error taxonomy;
- version and deprecation policy.

Example categories:

- Query tools: read-only and side-effect free.
- Command tools: mutate state and require idempotency.
- Sensitive commands: require step-up authentication or approval.
- Destructive commands: require explicit confirmation and compensating strategy.

## 6. Event contract pattern

Events use a versioned envelope and immutable facts. Producers own schemas; consumers tolerate additive evolution.

Recommended controls:

- transactional outbox;
- consumer deduplication;
- replay policy;
- dead-letter handling;
- data classification;
- schema compatibility validation;
- correlation and causation tracing.

## 7. Knowledge and trust graph

The graph should connect:

- organizations, users, suppliers, buyers, experts, and service providers;
- products, categories, certifications, documents, and evidence;
- RFQs, orders, shipments, routes, customs events, and payments;
- questions, answers, cases, reviews, alerts, and policies;
- trust assertions with source, verification state, scope, and expiration.

Graph-derived insights must remain explainable and must link to supporting evidence.

## 8. Deployment topology

Start with the smallest topology that preserves boundaries. Evolve toward:

- stateless horizontally scalable application services;
- managed transactional databases with tenant controls;
- durable queue and event infrastructure;
- isolated worker pools for AI, documents, browser automation, and analytics;
- regional edge delivery;
- multi-region strategy based on legal, latency, and recovery requirements;
- separate production, staging, test, and development environments.

## 9. Security zones

- Public edge zone
- Authenticated application zone
- Business service zone
- Sensitive finance and identity zone
- AI execution zone
- Browser automation sandbox
- Data and analytics zone
- Operations and security administration zone

Traffic between zones is authenticated, authorized, encrypted, logged, and minimized.

## 10. Architecture evidence model

Every capability in the handbook should carry one status:

- Vision
- Planned
- In Design
- In Implementation
- Implemented
- Production Validated
- Deprecated

Implemented and Production Validated statuses require links to code, tests, deployment, monitoring, and ownership evidence.
