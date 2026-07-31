# GTOS Enterprise AI Architecture

Status: Canonical architecture baseline
Owner: GTOS Architecture Council
Scope: AI-native B2B2C operating system for global trade

## Purpose

This directory turns the Enterprise AI Core constitution and the ALLINB2C Trade Community architecture into an implementation-controlled architecture baseline for GTOS.

The repository is currently a handbook and architecture portal. These documents therefore define the target system, engineering contracts, sequencing, governance, and go-live gates. They do not falsely claim that production services already exist.

## Canonical Documents

1. [Enterprise AI Constitution](./01-ENTERPRISE-AI-CONSTITUTION.md)
2. [Trade Community and Trust Layer](./02-TRADE-COMMUNITY-TRUST-LAYER.md)
3. [Reference Architecture](./03-REFERENCE-ARCHITECTURE.md)
4. [Implementation Roadmap](./04-IMPLEMENTATION-ROADMAP.md)
5. [Architecture Decision Records](./adr/README.md)

## Non-negotiable principles

- Read and map the existing system before implementation.
- Preserve working behavior and backward compatibility.
- Do not create duplicate services, parallel data paths, or shadow architectures.
- All AI actions pass through a unified AI Core.
- Business data access is typed, permission-checked, auditable, and mediated through approved MCP/domain interfaces.
- Every privileged action is tenant-aware and policy-controlled.
- Every workflow is observable, recoverable, testable, and idempotent where required.
- Community is not a detached forum; it is a knowledge, trust, growth, and risk layer integrated with products, suppliers, orders, routes, shipments, and services.
- Architecture claims must be evidence-based. Planned systems are marked Planned; implemented systems require repository and runtime evidence.

## Target capability map

### Experience layer
- Web applications
- Mobile experiences
- Voice and conversational control
- Executive dashboards
- Community and trade intelligence

### Intelligence layer
- AI Core Orchestrator
- Planning and policy engine
- Workflow engine
- Multi-agent runtime
- Memory services
- Knowledge and trust graph
- Browser and vision automation

### Integration layer
- MCP gateway and registry
- Domain adapters
- Event bus
- API gateway
- Identity and policy enforcement

### Business domains
- Identity and tenancy
- CRM and customers
- Suppliers and sourcing
- Catalog and products
- RFQ and negotiation
- Orders and contracts
- Payments and accounting
- Inventory and warehouse
- Logistics, shipping, customs, and tax
- Community, reputation, and knowledge
- Analytics and reporting

### Platform layer
- OLTP stores
- Search index
- Vector store
- Graph store
- Object storage
- Cache and queues
- Observability
- CI/CD and infrastructure

## Definition of done

A capability is considered Implemented only when it has:

- an owner and bounded context;
- code and deployment evidence;
- typed contracts and versioning policy;
- authorization and tenant isolation tests;
- unit, integration, contract, and relevant E2E tests;
- logs, metrics, traces, and runbooks;
- failure handling, retry, rollback, and recovery behavior;
- security review and production readiness evidence.
