# 11 — Implementation Status Matrix

| Area | Narrow verified capability | Classification |
|---|---|---|
| Product Catalog Service | CRUD/status/resell/similar | `IMPLEMENTED_WITH_GAP` |
| Marketplace Product Catalog | tenant-aware table and CRUD | `IMPLEMENTED_WITH_GAP` |
| Canonical Marketplace Offer | Not found as independent aggregate | `PLANNED_NOT_IMPLEMENTED` |
| Target Pricing | Policy CRUD and lookup | `IMPLEMENTED_WITH_GAP` |
| Smart Pricing | Rules, landed cost, market snapshots, calculation | `IMPLEMENTED_WITH_GAP` |
| Price Version / Checkout Quote | No immutable accepted version | `PLANNED_NOT_IMPLEMENTED` |
| Cart | CRUD, merge, coupon attachment | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| Checkout | Cart-to-order and validation | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| Checkout AI | Hard-coded local rules | `SIMULATED_REFERENCE_IMPLEMENTATION` |
| Customer Order | Entity, workflow, history, optimistic lock | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| Order Saga | Comments only for cross-service steps | `PLANNED_NOT_IMPLEMENTED` |
| Allocation | Inventory reservation exists, order orchestration absent | `PARTIAL_IMPLEMENTATION` |
| Legacy Fulfilment Sales Order | Deprecated CRUD/status | `DEPRECATED_IMPLEMENTATION` |
| Pick/Pack | Waves/tasks/confirm/pack/verify | `IMPLEMENTED_WITH_GAP` |
| Last-Mile Optimizer | Static in-memory rates and profiles | `SIMULATED_REFERENCE_IMPLEMENTATION` |
| Proof of Delivery | Not found | `PLANNED_NOT_IMPLEMENTED` |
| Returns/RMA | Return, receipt, inspection, disposition | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| Disputes | Evidence, rebuttal, decision, appeal | `IMPLEMENTED_WITH_GAP` |
| Marketplace Settlement | Cycles, transactions, calculation, reconciliation | `IMPLEMENTED_WITH_GAP` |
| Payment Settlement | Capture batching | `IMPLEMENTED_WITH_GAP` |
| Payout Execution | Not verified | `PLANNED_NOT_IMPLEMENTED` |
| ESG Goals | CRUD, progress, events | `IMPLEMENTED_WITH_GAP` |
| Verified ESG Metrics | Not found | `PLANNED_NOT_IMPLEMENTED` |
| AI Evaluation | Feedback, stats, recommendations | `IMPLEMENTED_WITH_GAP` |
