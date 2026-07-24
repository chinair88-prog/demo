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
