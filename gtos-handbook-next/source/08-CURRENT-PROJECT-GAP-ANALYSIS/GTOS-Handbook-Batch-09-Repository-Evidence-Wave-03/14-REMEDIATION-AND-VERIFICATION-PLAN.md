# 14 — Remediation and Verification Plan

## Priority 0 — Security and Commercial Integrity

1. Fix Order `list()` tenant leak and all bulk operation leaks.
2. Scope Cart, Marketplace Catalog, Pricing, Fulfilment, Returns, Settlement, ESG and AI Evaluation ID lookups to trusted tenant context.
3. Stop accepting authoritative price, user, payment and verification state from Client input.
4. Disable or protect direct `confirm-payment`, direct product approval and self-verified catalog fields.
5. Correct Order history from/to status recording.
6. Replace random actor UUIDs in Returns with authenticated actor identity.
7. Require POD before Order becomes Delivered.

## Priority 1 — Canonical Ownership

1. Product Master versus Marketplace Catalog/Offer.
2. Price authority and immutable Price Version.
3. Customer Order versus Warehouse Fulfilment Order.
4. Marketplace settlement ledger versus Payment payout execution.
5. Compliance ESG versus specialized Carbon service.
6. Return disposition versus Inventory stock posting.

## Priority 2 — Reliable Execution

1. Transactional outbox/inbox for Order، Pick/Pack، Returns، Settlement و ESG.
2. Order Saga with inventory reservation, payment authorization, fulfilment creation and compensation.
3. Idempotent Checkout، Payment confirmation، Return receive/inspect and Settlement transaction ingestion.
4. Live carrier adapter، quote expiry، booking، tracking webhook and POD.
5. Immutable evidence journals instead of mutable JSON timelines.
6. Multi-currency normalization and financial reconciliation.

## Required verification

- tenant isolation tests including list/bulk/cache paths؛
- client price tampering E2E؛
- duplicate checkout/payment webhook tests؛
- order saga failure/compensation tests؛
- concurrent stock allocation and over-pick tests؛
- return quantity discrepancy and duplicate restock tests؛
- settlement cross-tenant/currency/provider reconciliation؛
- ESG methodology/version/assurance tests؛
- AI evaluation run ownership, score range and duplicate-review tests؛
- CI logs and migration upgrade evidence.
