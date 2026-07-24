from pathlib import Path
import shutil, zipfile, os, re, csv, json, hashlib, textwrap, subprocess, sys, datetime, html

DATA = Path('/mnt/data')
STAGE = DATA / '_gtos_final_stage'
V3 = STAGE / 'v3' / 'GTOS-Engineering-Handbook'
EXTRACTED = STAGE / 'extracted'
OUT = DATA / 'GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0'
ZIP_OUT = DATA / 'GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0.zip'

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

# -----------------------------------------------------------------------------
# Utilities
# -----------------------------------------------------------------------------
def write(rel, content):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(textwrap.dedent(content).strip() + '\n', encoding='utf-8')
    return p

def copytree(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(src, dst, dirs_exist_ok=True)

def first_heading(path):
    try:
        for line in path.read_text(encoding='utf-8', errors='replace').splitlines():
            if line.startswith('# '):
                return line[2:].strip()
    except Exception:
        pass
    return path.stem.replace('-', ' ').replace('_', ' ').title()

def count_words(text):
    return len(re.findall(r"\b[\w'-]+\b", text, flags=re.UNICODE))

def sha256_file(path):
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024), b''):
            h.update(chunk)
    return h.hexdigest()

# -----------------------------------------------------------------------------
# Package folders
# -----------------------------------------------------------------------------
for d in [
    '00-START-HERE', '01-NORMATIVE-CORE', '02-FOUNDATIONS', '03-DETAILED-VOLUMES',
    '04-DELIVERY-PLAYBOOKS', '05-DIAGRAMS', '06-CATALOGUES', '07-PDF-EDITION',
    '08-CURRENT-PROJECT-GAP-ANALYSIS', '09-BUILD-AND-VALIDATION'
]:
    (OUT/d).mkdir(parents=True, exist_ok=True)

# -----------------------------------------------------------------------------
# Foundation source from mature v3 corpus
# -----------------------------------------------------------------------------
foundation_map = {
    'reference-theory': '00-REFERENCE-THEORY',
    'volume-00-canon': '01-CANON',
    'volume-01-constitution': '02-CONSTITUTION',
    'volume-02-vision': '03-VISION-AND-TARGET-OPERATING-MODEL',
    'volume-03-business': '04-BUSINESS-OPERATING-MODEL',
    'executive': '05-EXECUTIVE-REFERENCE',
    'glossary': '06-GLOSSARY',
}
for src_name, dst_name in foundation_map.items():
    src = V3 / 'docs' / src_name
    if src.exists():
        copytree(src, OUT / '02-FOUNDATIONS' / dst_name)

# -----------------------------------------------------------------------------
# Detailed volumes from audited batches 01-06
# -----------------------------------------------------------------------------
volume_sources = []
for p in EXTRACTED.glob('GTOS-Handbook-Batch-*-AUDITED-v2/docs/gtos-handbook'):
    if not p.is_dir():
        continue
    for child in sorted(p.iterdir()):
        if child.is_dir() and child.name.startswith('volume'):
            volume_sources.append(child)
        elif child.is_file() and child.suffix == '.md':
            # final protocols from Batch 06
            shutil.copy2(child, OUT / '03-DETAILED-VOLUMES' / child.name)

seen_vols = set()
for src in sorted(volume_sources, key=lambda p:p.name):
    if src.name in seen_vols:
        # Merge only if distinct files exist.
        copytree(src, OUT / '03-DETAILED-VOLUMES' / src.name)
    else:
        copytree(src, OUT / '03-DETAILED-VOLUMES' / src.name)
        seen_vols.add(src.name)

# -----------------------------------------------------------------------------
# Delivery playbooks and implementation aids from v3
# -----------------------------------------------------------------------------
for src_name in ['delivery','implementation-blueprints','standards','scenarios','reference-patterns','reference-matrices','visual-atlas','adr','appendices']:
    src = V3 / 'docs' / src_name
    if src.exists():
        copytree(src, OUT / '04-DELIVERY-PLAYBOOKS' / src_name)

# -----------------------------------------------------------------------------
# Existing diagrams and traceability assets
# -----------------------------------------------------------------------------
if (V3/'diagrams').exists():
    copytree(V3/'diagrams', OUT/'05-DIAGRAMS'/'legacy-and-reference')

# Copy existing xlsx catalogue
xlsx_src = DATA/'GTOS-Handbook-Artifact-Catalogue.xlsx'
if xlsx_src.exists():
    shutil.copy2(xlsx_src, OUT/'06-CATALOGUES'/'GTOS-Handbook-Artifact-Catalogue-legacy.xlsx')

# -----------------------------------------------------------------------------
# Current implementation gap analysis is isolated from normative book
# -----------------------------------------------------------------------------
for batch in [
    'GTOS-Handbook-Batch-07-Audit-Canonicalization-Evidence-Wave-01',
    'GTOS-Handbook-Batch-08-Repository-Evidence-Wave-02',
    'GTOS-Handbook-Batch-09-Repository-Evidence-Wave-03',
]:
    src = DATA / batch
    if src.exists():
        copytree(src, OUT/'08-CURRENT-PROJECT-GAP-ANALYSIS'/batch)

# -----------------------------------------------------------------------------
# Normative core: final editorial layer
# -----------------------------------------------------------------------------
write('00-START-HERE/README.md', r'''
# GTOS Enterprise Engineering Handbook

## Final Edition 1.0

**Global Trade Operating System - Enterprise Architecture, Domain Design, Implementation, Security, AI, Data, Delivery, and Operations Handbook**

This package is the normative design and implementation reference for building GTOS as a global, multi-tenant, event-driven, AI-native trade operating system.

The main book describes **what GTOS shall become and how it shall be implemented**. The current repository is not treated as the architecture authority. Repository findings are isolated under `08-CURRENT-PROJECT-GAP-ANALYSIS` and may be used only to plan migration toward the target architecture.

## Start here

1. Read `PUBLICATION-STATEMENT.md`.
2. Read `MASTER-TABLE-OF-CONTENTS.md`.
3. Read the documents under `01-NORMATIVE-CORE` in numeric order.
4. Use `03-DETAILED-VOLUMES` as the comprehensive domain and platform reference.
5. Use `04-DELIVERY-PLAYBOOKS` to implement each vertical slice.
6. Use `06-CATALOGUES` and `09-BUILD-AND-VALIDATION` for navigation and conformance.

## Edition rule

The words **shall**, **must**, and **required** are normative. **Should** identifies the default engineering choice unless an Architecture Decision Record authorizes an exception. **May** identifies an allowed option.

## Primary outcome

A team conforming to this handbook shall be able to design, implement, verify, deploy, operate, recover, audit, and evolve GTOS without relying on undocumented tribal knowledge.
''')

write('00-START-HERE/PUBLICATION-STATEMENT.md', r'''
# Publication Statement

This edition consolidates the complete handbook corpus produced during the GTOS architecture program into one governed publication.

## What this edition is

- the target enterprise architecture for GTOS;
- the domain and lifecycle specification for global trade;
- the implementation guide for backend, frontend, data, events, workflows, AI, security, testing, infrastructure, and operations;
- the conformance baseline for engineering reviews and release readiness;
- the roadmap for completing and correcting the current project.

## What this edition is not

- a statement that the current source code already conforms;
- legal advice or a substitute for jurisdiction-specific counsel;
- proof that a deployment is secure, compliant, resilient, or production ready;
- permission to bypass architecture, security, financial, quality, customs, or privacy approvals.

## Authority hierarchy

1. Canon and Constitution.
2. Normative Core.
3. Detailed Volumes.
4. Architecture Decision Records.
5. Domain implementation specifications.
6. Code, configuration, migrations, tests, and runtime evidence.
7. Current-project gap reports.

A lower layer may implement or specialize a higher layer; it may not silently contradict it.

## Final-edition interpretation

“Final” means the publication is a complete implementation blueprint and governed reference edition. It does not mean architecture can never evolve. Changes require an ADR, compatibility analysis, migration plan, conformance update, and release note.
''')

write('00-START-HERE/READING-GUIDE.md', r'''
# Reading Guide

## Executive and product leaders

Read the System Blueprint, Target Operating Model, Domain Map, Lifecycle, AI Governance, Security, Roadmap, and Completion Definition.

## Architects

Read the Canon, Constitution, Normative Core, Domain Architecture volumes, Data and Contract volumes, Platform, Infrastructure, Security, Migration, and Conformance volumes.

## Backend engineers

Start with Service Architecture, Data Architecture, API and Event Architecture, Workflow and Saga Architecture, Engineering Standards, Testing, and the relevant Domain packs.

## Frontend engineers

Read Portal and Experience Architecture, Identity and Authorization, API Contracts, Event/Reactivity patterns, Accessibility, localization, observability, and the relevant Domain journeys.

## Data and AI engineers

Read the Reference Theory, Data and Database Reference, AI Operating System, AI Security, Evaluation, lineage, evidence, uncertainty, and model/tool governance.

## SRE and security engineers

Read Platform, Infrastructure, Security, Operations, SRE, Testing, Disaster Recovery, Incident Management, and Production Readiness.

## How to implement a feature

For every feature, traverse this chain:

```text
Business capability
-> Domain owner
-> Aggregate and invariant
-> Decision and authority
-> Command and workflow
-> API and Event contract
-> Database ownership
-> Portal journey
-> Security and privacy controls
-> SLO and runbook
-> Tests and release evidence
```
''')

write('00-START-HERE/COMPLETION-DEFINITION.md', r'''
# GTOS Completion Definition

A GTOS capability is complete only when every required question below has an evidence-backed answer.

## Business and ownership

- What business outcome does the capability produce?
- Which bounded context owns each proposition?
- Which external authority owns legal, financial, quality, carrier, or regulatory outcomes?
- Who may decide, approve, execute, correct, revoke, and appeal?

## Domain model

- What are the canonical subjects and stable identities?
- What are the aggregates, entities, value objects, relationships, and invariants?
- What state machines exist and what guards every transition?
- What history, correction, supersession, contradiction, and dispute semantics apply?

## Contracts and data

- What Commands, Events, queries, APIs, webhooks, files, and tools exist?
- Which service owns each database, schema, table, index, and migration?
- How are idempotency, concurrency, ordering, replay, reconciliation, and versioning handled?
- How are lineage, classification, retention, residency, and deletion handled?

## Experience and automation

- Which personas and Portals participate?
- How are partial, stale, denied, failed, disputed, and outcome-unknown states displayed?
- What AI tasks are allowed, what autonomy level applies, and what human approval is required?
- What evidence and explanation accompany automated recommendations and actions?

## Quality and operations

- What security and privacy controls are enforced?
- What SLOs, dashboards, alerts, runbooks, capacity limits, and recovery objectives exist?
- What unit, property, integration, contract, security, performance, chaos, migration, E2E, and DR tests prove the behavior?
- What release evidence demonstrates deployability and operability?

A module name, route, table, mock screen, plan, or generated document is never sufficient evidence by itself.
''')

write('00-START-HERE/VERSION.md', f'''
# Version

- Product: GTOS Enterprise Engineering Handbook
- Edition: 1.0 Final Master Edition
- Publication date: {datetime.date.today().isoformat()}
- Packaging format: Markdown source, PDF collection, diagrams, catalogues, playbooks, validation artifacts
- Primary language: English technical reference, with internationalization requirements for implementation
- Change model: semantic editioning plus ADR-governed amendments
''')

write('00-START-HERE/RELEASE-NOTES.md', r'''
# Release Notes - Final Edition 1.0

## Consolidated

- Canon, Constitution, reference theory, vision, business operating model.
- End-to-end 27-stage global trade lifecycle.
- Portal, identity, tenant, and organization architecture.
- Commerce, fulfilment, supply-chain, engagement, and communications domains.
- AI operating system, data, APIs, Events, workflows, and tools.
- Platform, infrastructure, security, privacy, engineering, SRE, testing, and migration.
- Implementation profiles, generated references, delivery playbooks, diagrams, catalogues, and current-project gap appendices.

## Editorial changes

- Target architecture is now the main publication.
- Current repository issues are isolated in an appendix.
- A normative core and completion definition were added.
- A single master table of contents and artifact manifest were generated.
- PDF books are split into coherent volumes for reliable reading and printing.
''')

# Normative Core documents
core_docs = {
'00-SYSTEM-BLUEPRINT.md': r'''
# GTOS System Blueprint

## Mission

GTOS is a global trade operating system that coordinates commercial intent, organizations, suppliers, products, procurement, contracts, trade documents, payments, production, quality, customs, transport, warehouses, inventory, marketplaces, customer orders, delivery, returns, settlement, reporting, ESG, and AI-assisted operations.

GTOS shall not be designed as a collection of screens around a shared database. It shall be designed as a network of accountable bounded contexts that exchange typed contracts and preserve independent truth ownership.

## Architectural shape

GTOS uses five interacting planes:

1. **Business Domain Plane** - canonical aggregates, Decisions, obligations, Commands, Events, and history.
2. **Experience Plane** - customer, partner, provider, operator, warehouse, admin, developer, and AI-control Portals.
3. **Integration Plane** - APIs, Event Bus, workflow engine, provider adapters, webhooks, files, EDI, and MCP tools.
4. **Intelligence Plane** - context assembly, retrieval, planning, recommendations, tool execution, evaluation, and governed autonomy.
5. **Platform Plane** - identity, policy, secrets, observability, deployment, data infrastructure, reliability, and developer platform.

## Foundational truth model

GTOS shall preserve the following distinctions:

```text
Entity != Observation != Claim != Evidence
Prediction != Recommendation != Decision
Decision != Intent != Command != Execution != Outcome
Custody != Ownership
Application status != external legal authority
Document != truth
Projection != source of record
```

Every material fact must identify its owner, subject, source, time, effective interval, confidence or qualification, policy context, authority, and correction lineage.

## System boundaries

GTOS coordinates external systems but does not own their authority. Banks own provider payment outcomes. Customs authorities own legal release. Carriers own qualified carrier observations. Laboratories and inspectors own their signed observations. The platform records, verifies, relates, and derives perspectives from those outcomes.

## Reference deployment

- multi-region capable;
- tenant- and jurisdiction-aware;
- database-per-service or strongly isolated schema ownership;
- asynchronous integration through durable Events;
- durable workflow for long-running trade processes;
- zero-trust service identity;
- typed AI tools rather than direct model access to databases;
- immutable audit for binding Decisions and privileged execution;
- observable and recoverable partial failure.

## Non-negotiable qualities

- historical integrity;
- explicit authority;
- deterministic identifiers;
- idempotent execution;
- secure tenant isolation;
- correction without erasure;
- explainable automation;
- contract compatibility;
- operational recovery;
- evidence-backed conformance.
''',
'01-ARCHITECTURAL-PRINCIPLES.md': r'''
# Architectural Principles

## 1. Truth has an owner

Every proposition has exactly one authoritative owner at a given level of abstraction. Other services may cache or project it but may not mutate it by shared-table access.

## 2. History is append-oriented

Approved, issued, submitted, signed, paid, released, inspected, delivered, and settled facts shall not be rewritten. Corrections and revocations create new facts linked to the originals.

## 3. Authority is evaluated at action time

Authentication alone is insufficient. Every binding action must evaluate principal, represented organization, role, relationship, delegation, mandate, jurisdiction, purpose, and policy.

## 4. Distributed execution assumes partial failure

Every external or cross-service action must support idempotency, timeouts, retries, duplicate messages, out-of-order delivery, replay, outcome unknown, reconciliation, and compensation.

## 5. Events describe completed facts

Commands use imperative names. Events use past-tense completed-fact names. Plans, requests, and predictions are not Events.

## 6. AI is governed software

AI may extract, classify, summarize, predict, recommend, plan, or invoke typed tools within policy. It shall not own canonical truth, invent authority, conceal uncertainty, or bypass approval.

## 7. Security is architectural

Tenant isolation, least privilege, data minimization, secret isolation, integrity, audit, and incident containment are designed into every Domain and contract.

## 8. Operational ownership is part of design

Every service and workflow has an owner, SLO, dashboard, alert, runbook, capacity plan, dependency map, recovery procedure, and decommissioning plan.

## 9. Compatibility is explicit

APIs, Events, database migrations, files, tools, prompts, and policy versions evolve through documented compatibility rules.

## 10. Completion requires evidence

A capability is not complete because code compiles. It is complete when invariants, security, interoperability, recovery, performance, and business outcomes are proven by executable evidence.
''',
'02-TARGET-OPERATING-MODEL.md': r'''
# Target Operating Model

## Product organization

GTOS should be operated through durable product and platform teams aligned to bounded contexts, not temporary component projects.

### Business product groups

- Identity and Organization;
- Customer and CRM;
- Product, Catalog, Marketplace, Pricing, and Promotions;
- Procurement, Quotation, Contract, PI, and Purchase Order;
- Payment, Wallet, Billing, Finance Control, and Settlement;
- Manufacturing and Quality;
- Shipping, Customs, Provider, and Regulatory;
- Warehouse, Inventory, Fulfilment, Delivery, and Returns;
- Engagement and Communications.

### Platform groups

- Developer Platform and API Gateway;
- Data Platform;
- Event and Workflow Platform;
- Identity and Security Platform;
- AI Platform and Model Governance;
- Observability and Reliability Platform;
- Cloud and Infrastructure Platform.

## Decision rights

- Domain teams own business semantics and invariants.
- Platform teams own reusable technical capabilities and paved roads.
- Security and privacy authorities define mandatory controls and exceptions.
- Architecture governance resolves ownership and compatibility disputes.
- SRE defines production readiness and reliability policy.
- AI Governance approves autonomy, tools, evaluation, and kill-switch policy.

## Delivery model

Work is delivered as vertical slices that include Domain behavior, persistence, contract, Portal journey, security, observability, tests, migration, runbook, and release evidence.

## Governance cadence

- weekly Domain design review;
- biweekly contract and integration review;
- monthly architecture and security council;
- quarterly resilience, disaster recovery, and AI governance review;
- release-specific production readiness review;
- annual Canon and Constitution review.
''',
'03-DOMAIN-MAP-AND-OWNERSHIP.md': r'''
# Domain Map and Ownership

## Core commercial domains

- **Product Catalog** owns canonical product identity and versioned product content.
- **Marketplace** owns seller/channel offers and publication eligibility.
- **Pricing** owns Price Versions and pricing policies.
- **Cart and Checkout** own shopping intent and authoritative checkout quotes.
- **Order** owns accepted customer commercial obligations.
- **Payment** owns Payment Intent and provider financial outcomes.
- **Settlement** owns financial entitlements, reconciliation, payout Intent, and settlement state.

## Trade execution domains

- **Procurement** owns RFQ, supplier invitations, and Purchase Orders.
- **Quotation** owns supplier commercial proposals and versions.
- **Contract** owns negotiated binding terms.
- **Trade Documents** owns Proforma Invoice, Packing List, Commercial Invoice, certificates, and document versions.
- **Manufacturing** owns production plans, orders, lots, progress, and capacity commitments.
- **Quality** owns inspection, measurements, nonconformance, and quality-release Decisions.
- **Regulatory and Customs** own platform declarations and authority observations.
- **Shipping** owns shipment, legs, booking relationships, transport observations, and exceptions.

## Fulfilment domains

- **Warehouse** owns physical receiving, storage operations, pick, pack, and dispatch handover.
- **Inventory** owns stock positions, reservations, allocations, movements, and adjustments.
- **Fulfilment** coordinates accepted demand to physical execution without taking ownership of Order or Inventory truth.
- **Delivery** owns last-mile attempts and qualified Proof of Delivery observations.
- **Returns** owns return authorization, reverse logistics, inspection, disposition, claims, and disputes.

## Supporting domains

- Identity, Organization, Tenant, Customer, Supplier, Provider, CRM, Communications, Reporting, ESG, and AI Evaluation.

## Ownership rule

A shared concept may appear in several contexts as a reference or projection. Only one context owns each authoritative proposition. Ownership is recorded in the Domain Catalogue and enforced by contracts and database boundaries.
''',
'04-END-TO-END-GLOBAL-TRADE-LIFECYCLE.md': r'''
# End-to-End Global Trade Lifecycle

The canonical lifecycle contains 27 stages:

1. Organization identity and onboarding.
2. Demand and requirement definition.
3. Request for quotation.
4. Supplier discovery and qualification.
5. Quotation invitation and submission.
6. Comparison and normalization.
7. Negotiation and supplier selection.
8. Contract and accepted terms.
9. Proforma Invoice.
10. Payment and risk approval.
11. Purchase Order and acknowledgement.
12. Production planning and capacity commitment.
13. Production execution and milestones.
14. Quality inspection, nonconformance, and release.
15. Packing List and Commercial Invoice.
16. Export customs and legal release.
17. Transport planning and booking.
18. Pickup, custody, and handover.
19. International transport and tracking.
20. Import customs, duties, and legal release.
21. Delivery and warehouse receiving.
22. Inventory synchronization and availability.
23. Product publication and marketplace eligibility.
24. Checkout and customer order.
25. Allocation, fulfilment, and last-mile delivery.
26. Returns, claims, refunds, and disputes.
27. Settlement, reporting, ESG, and learning.

## Stage contract

Every stage must specify:

- owner and external authority;
- entry and exit criteria;
- canonical subjects and versions;
- state machines and invariants;
- Decisions, Commands, Events, and queries;
- evidence and documents;
- workflow, deadlines, retries, and compensation;
- APIs, database ownership, and Portal journeys;
- AI participation and autonomy;
- security, privacy, SLOs, tests, and recovery;
- correction and dispute behavior.

## Lifecycle orchestration

The lifecycle is not a single central transaction. Durable workflows coordinate independently owned aggregates. State is advanced only by verified facts. If an external outcome is unknown, the process enters an explicit reconciliation state rather than assuming success or repeating the action blindly.
''',
'05-SERVICE-ARCHITECTURE.md': r'''
# Service Architecture

## Service boundary

A service is justified by independent business ownership, lifecycle, scaling, security, data, or operational needs. A table group or UI menu is not sufficient reason for a service.

Each service contains:

```text
API / Adapter Layer
Application Layer
Domain Layer
Persistence and Integration Layer
Security and Policy Layer
Event and Workflow Layer
Observability and Operations Layer
Test and Conformance Layer
```

## Database ownership

Each service owns its writes. Cross-service database joins and updates are prohibited. Read models may be built through Events, APIs, CDC under governance, or analytical pipelines.

## Synchronous communication

Use synchronous calls for bounded request-response interactions where the caller requires an immediate answer and the dependency can meet the latency and availability budget. Apply timeouts, circuit breaking, authentication, authorization, tracing, idempotency, and explicit error contracts.

## Asynchronous communication

Use Events for completed facts and durable decoupling. Producers commit state plus outbox atomically. Consumers use inbox/idempotency, versioned schemas, replay safety, ordering strategy, DLQ, and reconciliation.

## Long-running processes

Use a durable workflow engine or persisted saga state for multi-step trade processes. Workflow state is coordination state, not Domain truth.

## Service template

Every service repository module shall include ownership metadata, ADRs, API/Event specifications, migrations, dependency policy, SLO, dashboards, alerts, runbooks, threat model, test strategy, and deprecation plan.
''',
'06-DATA-ARCHITECTURE.md': r'''
# Data Architecture

## Principles

- database ownership follows Domain ownership;
- identifiers are stable, opaque, and namespace-aware;
- recorded time and effective time are distinct;
- binding versions are immutable;
- corrections append rather than overwrite;
- lineage is first-class;
- sensitive data is classified and minimized;
- analytical and AI stores are projections.

## Storage patterns

- relational databases for transactional aggregates and constraints;
- object storage for documents, evidence, large media, and signed artifacts;
- search indexes for discovery and text retrieval;
- time-series systems for metrics and telemetry;
- graph or relationship projections where relationship traversal is central;
- vector indexes for governed retrieval, never as source of truth;
- warehouse/lakehouse for analytical and regulatory reporting.

## Schema design

Every table has tenant or ownership scope where applicable, primary key, business-key uniqueness, version or concurrency mechanism, timestamps, classification, and retention policy. Monetary values store amount plus currency. Physical measures store value plus unit. External references store issuer and namespace.

## Migration standard

Migrations are forward-only, reviewable, repeatable in CI, compatible with rolling deployment, and tested against empty and realistic upgrade datasets. Destructive changes require export, backfill, validation, cutover, rollback, and retention approval.

## Recovery

Each datastore defines RPO, RTO, backup schedule, encryption, restore test, regional strategy, corruption detection, and reconciliation process.
''',
'07-API-EVENT-AND-TOOL-ARCHITECTURE.md': r'''
# API, Event, and Tool Architecture

## REST and BFF

APIs use resource or command-oriented contracts with explicit versions, idempotency, optimistic concurrency, pagination, filtering, problem details, authorization, and trace propagation. Tenant identity is derived from trusted authentication context, never from an untrusted browser header.

## Events

Every Event includes event ID, type, schema version, subject, tenant, producer, occurred time, recorded time, correlation, causation, trace context, source version, and payload.

Events are immutable completed facts. Consumers must tolerate duplicates and unknown fields. Breaking semantic changes require a new Event type or governed version migration.

## Webhooks and external callbacks

Verify provider identity, signature, timestamp, nonce/replay protection, payload schema, and correlation. Store the original message. Respond quickly, process asynchronously, and reconcile missing or contradictory outcomes.

## Files and EDI

File exchanges define format, encoding, naming, checksums, signatures, encryption, partial-file handling, duplicate detection, acknowledgement, retention, and reconciliation.

## AI and MCP tools

Tools expose narrow typed operations with schemas, policy, authorization, approval, idempotency, timeout, cost limit, audit, and outcome observation. Models never receive direct database credentials.
''',
'08-WORKFLOW-SAGA-AND-RECOVERY-ARCHITECTURE.md': r'''
# Workflow, Saga, and Recovery Architecture

## Workflow responsibilities

A workflow coordinates time, dependencies, approvals, external calls, retries, and compensation. It does not own the business facts produced by Domain services.

## Required workflow state

- process ID and business correlation;
- participating subjects and exact versions;
- current step and deadlines;
- submitted Commands and idempotency keys;
- observed Events and external responses;
- approvals and authority;
- retry budget and next action;
- compensation status;
- operator interventions;
- final outcome and audit.

## Outcome Unknown

When a call times out after possible external execution, the workflow records Outcome Unknown. It queries the provider, waits for a verified callback, or opens reconciliation. It does not retry a financial, customs, custody, or irreversible physical action blindly.

## Compensation

Compensation creates a new authorized Intent: release reservation, cancel booking, reverse ledger entry, issue correction, or request refund. It never deletes the original completed fact.

## Operational requirements

Workflows must survive process restart, deployment, broker outage, duplicate Event, late Event, timer loss, and manual intervention. Stalled and orphaned instances are observable and recoverable.
''',
'09-AI-NATIVE-ARCHITECTURE.md': r'''
# AI-Native Architecture

## AI control plane

GTOS AI consists of:

- AI Gateway and provider abstraction;
- Model Router and policy-aware selection;
- Context Builder and governed retrieval;
- Prompt and instruction registry;
- Agent Runtime and state machine;
- Planner, critic, verifier, and supervisor;
- Tool Registry and execution gateway;
- short-term, episodic, semantic, and organizational memory;
- evaluation, observability, safety, incident, and kill-switch systems.

## Autonomy levels

- A0: information only;
- A1: recommendation requiring human Decision;
- A2: automatic low-risk action with reviewable evidence;
- A3: bounded workflow autonomy under policy and approval thresholds;
- A4: exceptional high autonomy allowed only for explicitly certified domains.

Financial, legal, customs, quality release, custody, privileged security, and authoritative correction actions default to A0 or A1.

## Agent run record

Every run records tenant, principal, purpose, input, knowledge cutoff, context sources, prompt/model/tool versions, policy evaluations, approvals, tool calls, structured outputs, uncertainty, costs, observed outcomes, corrections, and evaluation.

## RAG and memory

Retrieved text is evidence, not authority. Sources require access control, version, effective time, provenance, and freshness. Memory cannot silently create canonical business facts.

## Evaluation

Evaluate quality, factuality, safety, security, policy compliance, tool correctness, business outcome, latency, cost, drift, and subgroup performance. Promotions require sample thresholds, human approval, rollback, and incident controls.
''',
'10-SECURITY-PRIVACY-AND-COMPLIANCE.md': r'''
# Security, Privacy, and Compliance

## Identity

GTOS recognizes human, organization, service, workload, device, provider, and AI Agent identities. Authentication uses standards-based federation, strong service identity, MFA for privileged users, and managed session lifecycles.

## Authorization

Authorization evaluates principal, represented party, tenant, organization, relationship, role, attributes, delegation, mandate, purpose, resource, action, jurisdiction, risk, and time. High-impact actions require separation of duties and step-up authentication.

## Tenant isolation

Tenant context is established at the trusted edge, cryptographically or operationally bound to identity, propagated through calls and Events, and enforced in every repository query, cache key, search index, object path, log, metric, and analytical dataset. Tests attempt cross-tenant access continuously.

## Data protection

Classify data, minimize collection, encrypt in transit and at rest, tokenize high-risk values, isolate keys and secrets, rotate credentials, prevent sensitive logs/prompts, and enforce purpose, consent, retention, residency, legal hold, export, and deletion rules.

## Application and integration security

Apply threat modeling, secure coding, dependency and container scanning, signed artifacts, SBOM, rate limits, abuse detection, webhook verification, SSRF protection, file scanning, browser sandboxing, prompt-injection defenses, and privileged tool controls.

## Audit and non-repudiation

Binding Decisions, document issuance, payments, customs submissions, quality release, custody, settlement, access-policy changes, AI tool execution, and emergency access require immutable audit with actor, authority, source, time, reason, before/after, and integrity evidence.
''',
'11-RELIABILITY-SRE-AND-OPERATIONS.md': r'''
# Reliability, SRE, and Operations

## Reliability model

Availability is only one dimension. GTOS defines durability, correctness, freshness, latency, recoverability, security, and business deadline objectives.

## Service level management

Each user journey and service defines SLIs, SLOs, error budgets, dependencies, capacity, failure modes, and escalation. Business process SLOs track stuck orders, expiring documents, customs holds, delayed shipments, unprocessed returns, and unreconciled payments.

## Observability

Use structured logs, metrics, traces, profiles, Event-flow telemetry, workflow state, audit links, business KPIs, and synthetic journeys. Correlation IDs connect Portal action through workflow, service, database, Event, provider, and final outcome.

## Incident management

Define severity, command roles, communication, evidence preservation, containment, recovery, customer/regulatory notification, reconciliation, correction, and post-incident learning.

## Disaster recovery

Test backups, restore, regional failover, broker recovery, workflow replay, secret/key recovery, object-store recovery, external-provider reconciliation, and data-integrity verification. A DR document without a successful exercise is not evidence.

## Change and release

Use progressive delivery, feature flags, compatibility windows, migration gates, automated rollback criteria, release observability, change freeze rules, and post-launch stabilization.
''',
'12-ENGINEERING-STANDARDS.md': r'''
# Engineering Standards

## Code structure

Use clear Domain, application, adapter, and infrastructure boundaries. Domain code must not depend on transport frameworks. Persistence models should not dictate business semantics.

## Quality gates

Every change passes formatting, static analysis, dependency rules, unit/property tests, integration tests, contract tests, security checks, migration checks, build reproducibility, and documentation validation.

## Git and review

Use small reviewable changes, protected branches, signed or attributable commits, mandatory review for critical areas, CODEOWNERS, semantic commit messages, and linked ADR/issue/test evidence.

## Configuration

Configuration is typed, validated, environment-specific, secret-free in source, and observable. Defaults must be safe. Runtime changes are audited.

## Error handling

Errors are typed and classified as validation, authorization, conflict, dependency, timeout, outcome unknown, business rejection, or internal defect. Do not expose secrets or implementation details.

## Documentation as code

Architecture, APIs, Events, migrations, operational procedures, diagrams, and conformance evidence live with version control and CI validation.
''',
'13-TESTING-AND-CONFORMANCE.md': r'''
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
''',
'14-IMPLEMENTATION-ROADMAP.md': r'''
# Implementation Roadmap

## Phase 0 - Governance and foundations

Adopt Canon, Constitution, Domain ownership, identity model, tenant model, engineering standards, ADR process, catalogues, CI quality gates, and production-readiness policy.

## Phase 1 - Platform paved roads

Deliver identity, service templates, API gateway, secrets, observability, Event Bus, outbox/inbox, workflow engine, database migration framework, developer environment, test harnesses, and deployment platform.

## Phase 2 - Core commerce

Implement Product, Marketplace Offer, Price Version, Cart, Checkout Quote, Customer Order, Payment Intent, Inventory Reservation, and reliable Order saga.

## Phase 3 - Trade and supply chain

Implement RFQ, Quotation, Contract, PI, PO, Manufacturing, Quality, documents, customs, shipping, custody, warehouse receiving, inventory, and fulfilment.

## Phase 4 - After-sales and finance

Implement delivery evidence, returns, claims, refund, settlement, reconciliation, reporting, and ESG evidence.

## Phase 5 - AI-native operations

Introduce retrieval, recommendations, planning, typed tools, supervised agents, evaluation, safety, and bounded autonomy after the underlying Domain controls are mature.

## Phase 6 - Global scale and certification

Add multi-region, jurisdiction profiles, advanced resilience, partner certification, data residency, high-assurance controls, cost optimization, and formal compliance evidence.

## Prioritization rule

Build the smallest complete vertical slice, not isolated tables or screens. Platform foundations must be delivered just ahead of the slices that require them, avoiding both premature platform construction and repeated local reinvention.
''',
'15-DOMAIN-IMPLEMENTATION-TEMPLATE.md': r'''
# Domain Implementation Template

Every Domain pack shall include:

1. Purpose, scope, owner, external authorities, and non-goals.
2. Ubiquitous language and subject identities.
3. Context map and upstream/downstream relationships.
4. Aggregates, entities, value objects, invariants, and state machines.
5. Decisions, authority, policies, exceptions, appeals, and corrections.
6. Commands, Events, queries, API, webhook, file, and tool contracts.
7. Durable workflows, deadlines, retries, idempotency, reconciliation, and compensation.
8. Database schema, keys, constraints, indexes, versions, migrations, lineage, and retention.
9. Portal journeys, personas, accessibility, localization, and error states.
10. AI use cases, autonomy, context, tools, evaluation, and prohibited behavior.
11. Security, privacy, threat model, tenant isolation, and audit.
12. SLOs, dashboards, alerts, runbooks, capacity, backup, and recovery.
13. Tests, conformance evidence, rollout, migration, compatibility, and deprecation.
14. Worked scenarios including success, partial failure, contradiction, correction, and dispute.

A Domain review is rejected if any section is replaced by “TBD” without an owner, due date, and risk decision.
''',
'16-PRODUCTION-READINESS-STANDARD.md': r'''
# Production Readiness Standard

A capability may enter production only when:

- ownership and on-call are assigned;
- threat model and privacy review are complete;
- authentication, authorization, tenant isolation, rate limiting, and audit are tested;
- migrations are upgrade-tested and rollback/backout is defined;
- idempotency and concurrency behavior are proven;
- Events and workflows survive duplicate, loss, delay, restart, and replay;
- dependencies have timeouts, circuit breakers, and fallback/reconciliation;
- SLOs, dashboards, alerts, runbooks, and capacity exist;
- backup and restore have been exercised;
- performance and failure tests meet thresholds;
- Portal E2E and accessibility pass;
- AI evaluations and kill switches pass where AI is used;
- release, rollback, and communication plans are approved;
- known risks and exceptions are recorded with expiry.

Production readiness is a joint Decision by the Domain owner, platform owner, security, SRE, and relevant business authority.
''',
}
for name, content in core_docs.items():
    write('01-NORMATIVE-CORE/'+name, content)

# -----------------------------------------------------------------------------
# Generate Graphviz diagrams
# -----------------------------------------------------------------------------
diag_specs = {
'system-blueprint.dot': r'''
digraph G {
  graph [rankdir=TB, bgcolor="transparent", pad=0.25, nodesep=0.35, ranksep=0.55];
  node [shape=box, style="rounded,filled", fillcolor="#eef4fb", color="#244b74", fontname="DejaVu Sans", fontsize=10];
  edge [color="#496b8c", arrowsize=0.7];
  Experience [label="Experience Plane\nCustomer | Partner | Provider | Operator | Warehouse | Admin | Developer"];
  Domains [label="Business Domain Plane\nCommerce | Trade | Supply Chain | Finance | Engagement"];
  Integration [label="Integration Plane\nAPI Gateway | Event Bus | Workflow | Adapters | MCP Tools"];
  Intelligence [label="Intelligence Plane\nAI Gateway | RAG | Agents | Evaluation | Safety"];
  Platform [label="Platform Plane\nIdentity | Data | Security | Observability | Cloud | Developer Platform"];
  External [label="External Authorities and Providers\nBanks | Customs | Carriers | Labs | Marketplaces", fillcolor="#fff3db", color="#9a6b1f"];
  Experience -> Domains;
  Domains -> Integration;
  Intelligence -> Integration [dir=both];
  Platform -> Experience [dir=both];
  Platform -> Domains [dir=both];
  Platform -> Integration [dir=both];
  Platform -> Intelligence [dir=both];
  Integration -> External [dir=both];
}
''',
'domain-map.dot': r'''
digraph G {
  graph [rankdir=LR, bgcolor="transparent", pad=0.2, nodesep=0.25, ranksep=0.5];
  node [shape=box, style="rounded,filled", fillcolor="#f3f7fb", color="#315d88", fontname="DejaVu Sans", fontsize=9];
  edge [color="#6c8093", arrowsize=0.6];
  Identity -> Customer -> Cart -> Checkout -> Order -> Fulfilment -> Delivery -> Returns;
  Product -> Offer -> Checkout;
  Pricing -> Offer;
  Inventory -> Checkout;
  Order -> Payment -> Settlement;
  Order -> Inventory -> Warehouse -> Shipping -> Delivery;
  Procurement -> Quotation -> Contract -> PI -> PO -> Manufacturing -> Quality -> Documents -> ExportCustoms -> Shipping;
  Shipping -> ImportCustoms -> Warehouse;
  AI [fillcolor="#eee8ff", color="#6650a4"];
  Platform [fillcolor="#e5f4ec", color="#287552"];
  AI -> Checkout [style=dashed]; AI -> Manufacturing [style=dashed]; AI -> Shipping [style=dashed]; AI -> Returns [style=dashed];
  Platform -> Identity [style=dashed]; Platform -> Payment [style=dashed]; Platform -> Shipping [style=dashed];
}
''',
'event-workflow.dot': r'''
digraph G {
  graph [rankdir=LR, bgcolor="transparent", pad=0.2];
  node [shape=box, style="rounded,filled", fillcolor="#f5f8fb", color="#2c5275", fontname="DejaVu Sans", fontsize=9];
  edge [color="#4f6b83", arrowsize=0.7];
  Portal -> API [label="authenticated Command"];
  API -> Domain [label="authorize + validate"];
  Domain -> Database [label="state"];
  Domain -> Outbox [label="completed fact"];
  Outbox -> Broker [label="publish"];
  Broker -> Inbox [label="at-least-once"];
  Inbox -> Consumer [label="deduplicate"];
  Consumer -> Workflow [label="advance"];
  Workflow -> API [label="next Command"];
  External -> Adapter [label="callback/observation"];
  Adapter -> Inbox;
  Reconcile [fillcolor="#fff0e5", color="#9a5521"];
  Workflow -> Reconcile [label="outcome unknown"];
  Reconcile -> External [label="query"];
}
''',
'ai-control-plane.dot': r'''
digraph G {
  graph [rankdir=LR, bgcolor="transparent", pad=0.2];
  node [shape=box, style="rounded,filled", fillcolor="#f3efff", color="#6650a4", fontname="DejaVu Sans", fontsize=9];
  edge [color="#7868a6", arrowsize=0.65];
  Request -> AIGateway -> Policy -> ContextBuilder -> Planner -> ModelRouter -> Candidate;
  Candidate -> Critic -> Approval -> ToolGateway -> DomainAPI -> OutcomeObserver -> Evaluation;
  RAG -> ContextBuilder;
  Memory -> ContextBuilder;
  ToolRegistry -> ToolGateway;
  KillSwitch -> AIGateway [style=dashed];
  Audit -> AIGateway [dir=back, style=dashed];
  Audit -> ToolGateway [dir=back, style=dashed];
}
''',
'security-zones.dot': r'''
digraph G {
  graph [rankdir=TB, bgcolor="transparent", pad=0.2];
  node [shape=box, style="rounded,filled", fillcolor="#f7fbf8", color="#2b6f4e", fontname="DejaVu Sans", fontsize=9];
  edge [color="#4c7863", arrowsize=0.65];
  Internet -> EdgeGateway [label="WAF, rate limit, auth"];
  EdgeGateway -> PortalBFF [label="trusted identity context"];
  EdgeGateway -> ServiceMesh [label="service identity"];
  PortalBFF -> DomainServices;
  ServiceMesh -> DomainServices;
  DomainServices -> OwnedDatabases;
  DomainServices -> EventPlatform;
  DomainServices -> Secrets [label="workload identity"];
  AITools -> DomainServices [label="typed authorized tools"];
  ExternalProviders -> IntegrationAdapters [label="signed callbacks"];
  IntegrationAdapters -> DomainServices;
}
''',
'roadmap.dot': r'''
digraph G {
  graph [rankdir=LR, bgcolor="transparent", pad=0.2];
  node [shape=box, style="rounded,filled", fillcolor="#eef4fb", color="#315d88", fontname="DejaVu Sans", fontsize=9];
  edge [color="#55728b", arrowsize=0.7];
  P0 [label="Phase 0\nGovernance and Foundations"];
  P1 [label="Phase 1\nPlatform Paved Roads"];
  P2 [label="Phase 2\nCore Commerce"];
  P3 [label="Phase 3\nTrade and Supply Chain"];
  P4 [label="Phase 4\nAfter-sales, Finance, ESG"];
  P5 [label="Phase 5\nAI-native Operations"];
  P6 [label="Phase 6\nGlobal Scale and Certification"];
  P0 -> P1 -> P2 -> P3 -> P4 -> P5 -> P6;
}
'''
}
for fn, spec in diag_specs.items():
    dotp = OUT/'05-DIAGRAMS'/'normative'/fn
    dotp.parent.mkdir(parents=True, exist_ok=True)
    dotp.write_text(textwrap.dedent(spec), encoding='utf-8')
    svgp = dotp.with_suffix('.svg')
    subprocess.run(['dot','-Tsvg',str(dotp),'-o',str(svgp)],check=True)

# -----------------------------------------------------------------------------
# Master table of contents and catalogues
# -----------------------------------------------------------------------------
all_md = sorted([p for p in OUT.rglob('*.md') if '09-BUILD-AND-VALIDATION' not in p.parts])
rows=[]
for p in all_md:
    txt=p.read_text(encoding='utf-8', errors='replace')
    rel=p.relative_to(OUT).as_posix()
    top=rel.split('/')[0]
    title=first_heading(p)
    rows.append({
        'path':rel,'section':top,'title':title,'words':count_words(txt),'bytes':p.stat().st_size,'sha256':sha256_file(p)
    })

# TOC grouped by top-level and next folder
lines=['# Master Table of Contents','']
current=None
for r in rows:
    parts=r['path'].split('/')
    group='/'.join(parts[:2]) if len(parts)>1 else parts[0]
    if group != current:
        lines += [f'## {group}', '']
        current=group
    lines.append(f"- [{r['title']}](../{r['path']}) - {r['words']:,} words")
write('00-START-HERE/MASTER-TABLE-OF-CONTENTS.md','\n'.join(lines))

# Artifact catalog CSV
with (OUT/'06-CATALOGUES'/'ARTIFACT-CATALOGUE.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['path','section','title','words','bytes','sha256'])
    w.writeheader(); w.writerows(rows)

# Volume catalog
vol_rows=[]
for d in sorted((OUT/'03-DETAILED-VOLUMES').iterdir()):
    if not d.is_dir(): continue
    files=list(d.rglob('*.md'))
    words=sum(count_words(p.read_text(encoding='utf-8',errors='replace')) for p in files)
    vol_rows.append({'volume':d.name,'files':len(files),'words':words})
with (OUT/'06-CATALOGUES'/'VOLUME-CATALOGUE.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['volume','files','words']); w.writeheader(); w.writerows(vol_rows)

# Domain catalog based on subfolders of domain volumes
catalog_domains=[]
for vol in ['volume-06-commerce-domain-architecture','volume-07-fulfilment-supply-chain-domain-architecture','volume-08-engagement-communication-architecture']:
    vd=OUT/'03-DETAILED-VOLUMES'/vol
    if not vd.exists(): continue
    for d in sorted(vd.iterdir()):
        if d.is_dir():
            fs=list(d.rglob('*.md'))
            catalog_domains.append({'volume':vol,'domain':d.name,'files':len(fs),'words':sum(count_words(p.read_text(encoding='utf-8',errors='replace')) for p in fs)})
with (OUT/'06-CATALOGUES'/'DOMAIN-CATALOGUE.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['volume','domain','files','words']); w.writeheader(); w.writerows(catalog_domains)

# Implementation roadmap CSV
roadmap_rows=[
('0','Governance and Foundations','Canon, Constitution, ownership, identity, ADR, standards, catalogues','Architecture governance','P0'),
('1','Platform Paved Roads','Gateway, identity, secrets, observability, Events, workflows, migrations, developer platform','Platform teams','P0'),
('2','Core Commerce','Product, Offer, Price, Cart, Checkout, Order, Payment, Inventory reservation','Commerce teams','P0'),
('3','Trade and Supply Chain','Procurement through warehouse and fulfilment','Trade and supply-chain teams','P1'),
('4','After-sales and Finance','Delivery evidence, returns, settlement, reporting, ESG','Finance and after-sales teams','P1'),
('5','AI-native Operations','RAG, agents, tools, evaluation, safety, supervised autonomy','AI platform and domain teams','P2'),
('6','Global Scale and Certification','Multi-region, jurisdictions, certification, cost and resilience','Platform, security, compliance','P2'),
]
with (OUT/'06-CATALOGUES'/'IMPLEMENTATION-ROADMAP.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(['phase','name','scope','owner','priority']); w.writerows(roadmap_rows)

# -----------------------------------------------------------------------------
# Static HTML start page
# -----------------------------------------------------------------------------
html_rows=[]
for vol in vol_rows:
    html_rows.append(f"<tr><td>{html.escape(vol['volume'])}</td><td>{vol['files']}</td><td>{vol['words']:,}</td></tr>")
start_html=f'''<!doctype html><html><head><meta charset="utf-8"><title>GTOS Handbook Final Edition</title>
<style>body{{font-family:Arial,sans-serif;max-width:1100px;margin:40px auto;line-height:1.55;color:#172435}}h1{{color:#123b63}}a{{color:#165d96}}table{{border-collapse:collapse;width:100%}}th,td{{border:1px solid #cbd5df;padding:8px;text-align:left}}th{{background:#eaf1f7}}code{{background:#eef2f5;padding:2px 5px}}</style></head>
<body><h1>GTOS Enterprise Engineering Handbook - Final Edition 1.0</h1>
<p>This is the normative architecture and implementation guide for GTOS. Start with the files in <code>00-START-HERE</code>, then read the Normative Core.</p>
<ul><li><a href="README.md">README</a></li><li><a href="PUBLICATION-STATEMENT.md">Publication Statement</a></li><li><a href="MASTER-TABLE-OF-CONTENTS.md">Master Table of Contents</a></li><li><a href="../01-NORMATIVE-CORE/00-SYSTEM-BLUEPRINT.md">System Blueprint</a></li><li><a href="../07-PDF-EDITION/00-MASTER-OVERVIEW.pdf">Master Overview PDF</a></li></ul>
<h2>Detailed volumes</h2><table><tr><th>Volume</th><th>Files</th><th>Words</th></tr>{''.join(html_rows)}</table>
<p>Current-project audit material is isolated under <code>08-CURRENT-PROJECT-GAP-ANALYSIS</code>.</p></body></html>'''
(OUT/'00-START-HERE'/'START-HERE.html').write_text(start_html,encoding='utf-8')

# -----------------------------------------------------------------------------
# PDF generation helpers
# -----------------------------------------------------------------------------
CSS = r'''
@page { size: A4; margin: 18mm 15mm 18mm 15mm; @bottom-center { content: "GTOS Handbook | " counter(page); font-size: 8pt; color: #667788; } }
body { font-family: "DejaVu Sans", Arial, sans-serif; font-size: 9.3pt; line-height: 1.46; color: #172435; }
h1 { color: #123b63; font-size: 23pt; page-break-before: always; border-bottom: 2px solid #b8c9d8; padding-bottom: 6px; }
h1:first-of-type { page-break-before: avoid; }
h2 { color: #1e527f; font-size: 16pt; margin-top: 1.2em; page-break-after: avoid; }
h3 { color: #315d7e; font-size: 12.5pt; page-break-after: avoid; }
h4 { font-size: 10.5pt; page-break-after: avoid; }
p, li { orphans: 3; widows: 3; }
table { border-collapse: collapse; width: 100%; font-size: 7.6pt; margin: 0.8em 0; table-layout: fixed; }
th, td { border: 0.6px solid #9fb2c3; padding: 4px; vertical-align: top; overflow-wrap: anywhere; }
th { background: #e7eef5; color: #173a59; }
pre { white-space: pre-wrap; overflow-wrap: anywhere; background: #f3f5f7; border: 1px solid #d6dde3; padding: 8px; font-size: 7.6pt; }
code { font-family: "DejaVu Sans Mono", monospace; font-size: 0.93em; }
blockquote { border-left: 4px solid #7b9bb7; margin-left: 0; padding-left: 12px; color: #40566a; }
a { color: #155c91; text-decoration: none; }
img, svg { max-width: 100%; height: auto; }
hr { border: 0; border-top: 1px solid #bdc9d3; margin: 1.5em 0; }
.pagebreak { page-break-after: always; }
.titlepage { page-break-after: always; text-align:center; padding-top: 55mm; }
.titlepage h1 { page-break-before: avoid; border:0; font-size:30pt; }
.toc { font-size: 8.4pt; }
'''
css_path=OUT/'09-BUILD-AND-VALIDATION'/'pdf.css'
css_path.write_text(CSS,encoding='utf-8')

# PDF groups: selected files/directories
pdf_groups = [
('00-MASTER-OVERVIEW.pdf','GTOS Handbook - Master Overview', [OUT/'00-START-HERE', OUT/'01-NORMATIVE-CORE']),
('01-FOUNDATIONS.pdf','GTOS Handbook - Foundations, Canon, Constitution, and Vision', [OUT/'02-FOUNDATIONS']),
('02-LIFECYCLE-PORTALS-IDENTITY.pdf','GTOS Handbook - Lifecycle, Portals, Identity, and Organization', [OUT/'03-DETAILED-VOLUMES'/'volume-03-end-to-end-global-trade-lifecycle', OUT/'03-DETAILED-VOLUMES'/'volume-04-portal-and-experience-architecture', OUT/'03-DETAILED-VOLUMES'/'volume-05-identity-tenant-organization']),
('03-COMMERCE-SUPPLY-ENGAGEMENT.pdf','GTOS Handbook - Commerce, Supply Chain, and Engagement', [OUT/'03-DETAILED-VOLUMES'/'volume-06-commerce-domain-architecture', OUT/'03-DETAILED-VOLUMES'/'volume-07-fulfilment-supply-chain-domain-architecture', OUT/'03-DETAILED-VOLUMES'/'volume-08-engagement-communication-architecture']),
('04-AI-DATA-CONTRACTS.pdf','GTOS Handbook - AI, Data, APIs, Events, Workflows, and Tools', [OUT/'03-DETAILED-VOLUMES'/'volume-09-ai-operating-system', OUT/'03-DETAILED-VOLUMES'/'volume-10-data-database-reference', OUT/'03-DETAILED-VOLUMES'/'volume-11-api-event-workflow-tool-contracts']),
('05-PLATFORM-INFRASTRUCTURE-SECURITY.pdf','GTOS Handbook - Platform, Infrastructure, Security, and Privacy', [OUT/'03-DETAILED-VOLUMES'/'volume-12-platform-architecture', OUT/'03-DETAILED-VOLUMES'/'volume-13-infrastructure-deployment', OUT/'03-DETAILED-VOLUMES'/'volume-14-security-privacy-compliance']),
('06-ENGINEERING-OPERATIONS-TESTING-MIGRATION.pdf','GTOS Handbook - Engineering, Operations, Testing, and Migration', [OUT/'03-DETAILED-VOLUMES'/'volume-15-engineering-handbook', OUT/'03-DETAILED-VOLUMES'/'volume-16-operations-sre', OUT/'03-DETAILED-VOLUMES'/'volume-17-testing-verification-conformance', OUT/'03-DETAILED-VOLUMES'/'volume-18-migration-legacy-evolution']),
('07-PROFILES-ROADMAP-APPENDICES.pdf','GTOS Handbook - Implementation Profiles, Roadmap, and Appendices', [OUT/'03-DETAILED-VOLUMES'/'volume-19-implementation-profiles', OUT/'03-DETAILED-VOLUMES'/'volume-20-appendices-generated-reference', OUT/'04-DELIVERY-PLAYBOOKS']),
('08-CURRENT-PROJECT-GAP-ANALYSIS.pdf','GTOS Handbook - Current Project Gap Analysis Appendix', [OUT/'08-CURRENT-PROJECT-GAP-ANALYSIS']),
]

build_pdf_src = OUT/'09-BUILD-AND-VALIDATION'/'pdf-sources'
build_pdf_src.mkdir(parents=True,exist_ok=True)

def collect_markdown(paths):
    files=[]
    for p in paths:
        if p.is_file() and p.suffix.lower()=='.md': files.append(p)
        elif p.is_dir(): files.extend(sorted(p.rglob('*.md')))
    # Skip generated manifests/reports that bloat or duplicate; keep substantive docs.
    skip_names={'MANIFEST.md','INTEGRITY-REPORT.md.original.md','README.md.original.md','RELEASE-REPORT.md.original.md'}
    return [p for p in files if p.name not in skip_names]

pdf_results=[]
for filename,title,paths in pdf_groups:
    mdfiles=collect_markdown(paths)
    combined=build_pdf_src/(filename.replace('.pdf','.md'))
    chunks=[f'<div class="titlepage">\n\n# {title}\n\n**Final Edition 1.0**\n\nGlobal Trade Operating System\n\n</div>\n\n', '# Contents\n\n']
    # Simple file-level TOC
    for p in mdfiles:
        chunks.append(f"- {first_heading(p)}  \n")
    chunks.append('\n<div class="pagebreak"></div>\n')
    for p in mdfiles:
        rel=p.relative_to(OUT).as_posix()
        txt=p.read_text(encoding='utf-8',errors='replace')
        # Avoid embedded local markdown links breaking conversion; keep text.
        chunks.append(f"\n\n<div class=\"pagebreak\"></div>\n\n<!-- SOURCE: {rel} -->\n\n")
        chunks.append(txt)
    combined.write_text(''.join(chunks),encoding='utf-8')
    htmlfile=build_pdf_src/(filename.replace('.pdf','.html'))
    cmd=['pandoc',str(combined),'--from=gfm','--to=html5','--standalone','--toc','--toc-depth=2','--metadata',f'title={title}','--css',str(css_path),'--resource-path',str(OUT)]
    with htmlfile.open('w',encoding='utf-8') as out_f:
        subprocess.run(cmd,check=True,stdout=out_f)
    pdfpath=OUT/'07-PDF-EDITION'/filename
    subprocess.run(['weasyprint',str(htmlfile),str(pdfpath)],check=True)
    pdf_results.append({'file':filename,'sources':len(mdfiles),'bytes':pdfpath.stat().st_size,'sha256':sha256_file(pdfpath)})

# PDF catalogue
with (OUT/'06-CATALOGUES'/'PDF-CATALOGUE.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['file','sources','bytes','sha256']);w.writeheader();w.writerows(pdf_results)

# -----------------------------------------------------------------------------
# Final manifest and integrity
# -----------------------------------------------------------------------------
manifest=[]
for p in sorted(OUT.rglob('*')):
    if p.is_file() and p.name not in {'MANIFEST.json','MANIFEST.csv','SHA256SUMS.txt'}:
        rel=p.relative_to(OUT).as_posix()
        data=p.read_bytes()
        words=0; lines=0
        if p.suffix.lower() in {'.md','.txt','.csv','.json','.html','.dot'}:
            try:
                t=data.decode('utf-8'); words=count_words(t); lines=t.count('\n')+(1 if t else 0)
            except: pass
        manifest.append({'path':rel,'bytes':len(data),'words':words,'lines':lines,'sha256':hashlib.sha256(data).hexdigest()})

(OUT/'09-BUILD-AND-VALIDATION'/'MANIFEST.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
with (OUT/'09-BUILD-AND-VALIDATION'/'MANIFEST.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['path','bytes','words','lines','sha256']);w.writeheader();w.writerows(manifest)
with (OUT/'09-BUILD-AND-VALIDATION'/'SHA256SUMS.txt').open('w',encoding='utf-8') as f:
    for r in manifest: f.write(f"{r['sha256']}  {r['path']}\n")

# Integrity stats
md_count=sum(1 for p in OUT.rglob('*.md'))
md_words=sum(count_words(p.read_text(encoding='utf-8',errors='replace')) for p in OUT.rglob('*.md'))
empty=[p.relative_to(OUT).as_posix() for p in OUT.rglob('*.md') if not p.read_text(encoding='utf-8',errors='replace').strip()]
pdfs=list((OUT/'07-PDF-EDITION').glob('*.pdf'))
volumes=[d for d in (OUT/'03-DETAILED-VOLUMES').iterdir() if d.is_dir()]
report=f'''# Final Integrity Report

- Edition: 1.0 Final Master Edition
- Generated: {datetime.datetime.now(datetime.timezone.utc).isoformat()}
- Markdown files: {md_count:,}
- Markdown words: {md_words:,}
- Detailed volumes: {len(volumes)}
- PDF books: {len(pdfs)}
- Catalogue entries: {len(rows):,}
- Empty Markdown files: {len(empty)}
- Manifest entries: {len(manifest):,}

## Structural checks

- Normative Core present: {'PASS' if len(list((OUT/'01-NORMATIVE-CORE').glob('*.md'))) >= 17 else 'FAIL'}
- Canon and Constitution present: {'PASS' if (OUT/'02-FOUNDATIONS'/'01-CANON').exists() and (OUT/'02-FOUNDATIONS'/'02-CONSTITUTION').exists() else 'FAIL'}
- Lifecycle volume present: {'PASS' if (OUT/'03-DETAILED-VOLUMES'/'volume-03-end-to-end-global-trade-lifecycle').exists() else 'FAIL'}
- Volumes through 20 present: {'PASS' if len(volumes) >= 18 else 'FAIL'}
- Gap analysis isolated: {'PASS' if (OUT/'08-CURRENT-PROJECT-GAP-ANALYSIS').exists() else 'FAIL'}
- PDF collection generated: {'PASS' if len(pdfs) == len(pdf_groups) else 'FAIL'}
- Empty Markdown: {'PASS' if not empty else 'FAIL'}

## Publication interpretation

This package is the final normative architecture and implementation handbook edition. Current-project evidence remains an appendix and does not override the Canon, Constitution, Normative Core, or target Domain architecture.
'''
write('09-BUILD-AND-VALIDATION/FINAL-INTEGRITY-REPORT.md',report)

# Copy builder for reproducibility
shutil.copy2(Path(__file__), OUT/'09-BUILD-AND-VALIDATION'/'build_final.py')

# Rebuild manifest once after report + builder
manifest=[]
for p in sorted(OUT.rglob('*')):
    if p.is_file() and p.name not in {'MANIFEST.json','MANIFEST.csv','SHA256SUMS.txt'}:
        rel=p.relative_to(OUT).as_posix(); data=p.read_bytes(); words=lines=0
        if p.suffix.lower() in {'.md','.txt','.csv','.json','.html','.dot','.py'}:
            try: t=data.decode('utf-8'); words=count_words(t); lines=t.count('\n')+(1 if t else 0)
            except: pass
        manifest.append({'path':rel,'bytes':len(data),'words':words,'lines':lines,'sha256':hashlib.sha256(data).hexdigest()})
(OUT/'09-BUILD-AND-VALIDATION'/'MANIFEST.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
with (OUT/'09-BUILD-AND-VALIDATION'/'MANIFEST.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['path','bytes','words','lines','sha256']);w.writeheader();w.writerows(manifest)
with (OUT/'09-BUILD-AND-VALIDATION'/'SHA256SUMS.txt').open('w',encoding='utf-8') as f:
    for r in manifest: f.write(f"{r['sha256']}  {r['path']}\n")

# Zip final package
if ZIP_OUT.exists(): ZIP_OUT.unlink()
with zipfile.ZipFile(ZIP_OUT,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in sorted(OUT.rglob('*')):
        if p.is_file(): z.write(p,arcname=f'{OUT.name}/{p.relative_to(OUT).as_posix()}')
with zipfile.ZipFile(ZIP_OUT) as z:
    bad=z.testzip(); members=len(z.namelist())

summary={
    'root':str(OUT),'zip':str(ZIP_OUT),'zip_sha256':sha256_file(ZIP_OUT),'zip_bytes':ZIP_OUT.stat().st_size,
    'zip_members':members,'zip_crc_error':bad,'markdown_files':md_count,'markdown_words':md_words,
    'detailed_volumes':len(volumes),'pdf_books':len(pdfs),'catalogue_entries':len(rows),'empty_markdown':len(empty),
    'pdfs':pdf_results,
}
(OUT/'09-BUILD-AND-VALIDATION'/'BUILD-SUMMARY.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
