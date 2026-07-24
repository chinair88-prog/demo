# 12 — Wave 03 Issue Register

| ID | Severity | Area | Finding | Required action |
|---|---|---|---|---|
| W3-001 | Critical | Catalog | ProductEntity has no tenant/company field | Add canonical tenant ownership or explicitly global product governance. |
| W3-002 | Critical | Catalog | Product update can set status directly | Remove status from generic update and enforce transition/role policy. |
| W3-003 | High | Catalog | Product status update lacks visible authorization and transition matrix | Require actor role, allowed transitions, reason and version. |
| W3-004 | High | Catalog | Product has no optimistic version | Add @Version and conflict handling. |
| W3-005 | Critical | Catalog | Resell-from-purchase does not verify source ownership or stock eligibility | Validate order ownership, receipt, quality and resale rights. |
| W3-006 | Critical | Catalog | Three product/catalog representations compete | Canonicalize Product Master, Marketplace projection and Offer. |
| W3-007 | High | Marketplace Catalog | Tenant/company and verification flags come from request | Derive identity and restrict verified/featured changes. |
| W3-008 | Critical | Marketplace Catalog | Get/update/delete by ID are not visibly tenant-scoped | Use tenant-qualified repository methods. |
| W3-009 | High | Marketplace Catalog | Hard delete removes catalog evidence | Use archive/supersession and retention policy. |
| W3-010 | Critical | Offer | No independent Marketplace Offer aggregate found | Implement seller/product/price/availability/terms snapshot. |
| W3-011 | Critical | Pricing | Pricing authority is split across Product, Marketplace Catalog, Target Price and Smart Pricing | Create canonical PriceVersion ownership. |
| W3-012 | Critical | Pricing | Tenant IDs are accepted from request/query | Use trusted tenant context. |
| W3-013 | High | Pricing | Rule get/update/delete by ID are unscoped | Use tenant-qualified lookup. |
| W3-014 | High | Pricing | Category and warehouse scopes match all rules | Implement real category/warehouse matching. |
| W3-015 | High | Pricing | Calculation response currency is hard-coded USD | Preserve and validate currency. |
| W3-016 | High | Pricing | Manual adjustments have no approval/limit evidence | Add policy, authorization and audit. |
| W3-017 | High | Pricing | Hard-coded volume tiers exist in multiple services | Govern pricing rule versions centrally. |
| W3-018 | Critical | Cart | Cart ownership relies on request user/session/cart IDs | Bind carts to authenticated principal/session token. |
| W3-019 | Critical | Cart | Client supplies SKU, unitPrice, provider and currency | Resolve authoritative offer server-side. |
| W3-020 | High | Cart | Coupon code is stored without validation | Integrate governed promotion service. |
| W3-021 | High | Cart | Quantity and availability policy is absent | Validate MOQ, max, inventory and channel rules. |
| W3-022 | Critical | Checkout | Checkout converts client-priced cart directly to Order | Reprice and snapshot offer before order creation. |
| W3-023 | Critical | Checkout | confirm-payment can directly mark Order paid | Require signed provider outcome, amount/currency match and idempotency. |
| W3-024 | High | Checkout | Price validation is only zero-price warning | Compare PriceVersion and quote expiry. |
| W3-025 | High | Checkout AI | AI insights are simulated but exposed as AI-powered | Label simulation and separate production adapter. |
| W3-026 | High | Checkout AI | AI decisions are logged but not governed/persisted | Store advisory decision provenance or remove claim. |
| W3-027 | Critical | Order | Tenant-scoped list executes repository.findAll | Fix repository call and add isolation test. |
| W3-028 | Critical | Order | Bulk approve/cancel/refund use unscoped findAllById | Use tenant-scoped bulk lookup. |
| W3-029 | High | Order | System context is fail-open | Require explicit privileged system identity. |
| W3-030 | High | Order | History transition records current status for both from/to | Use captured old status and test history. |
| W3-031 | Critical | Order | markPaid lacks payment outcome guards | Move payment truth to Payment service. |
| W3-032 | High | Order | Auto-approval threshold ignores currency and risk | Use normalized amount and policy engine. |
| W3-033 | Critical | Order Saga | Inventory/payment/fulfilment steps are comments only | Implement durable saga and compensation. |
| W3-034 | High | Order Events | Only local Spring events are published | Add durable outbox/broker. |
| W3-035 | Critical | Fulfilment | Deprecated SalesOrder get/update is unscoped | Remove or tenant-scope during migration. |
| W3-036 | Critical | PickPack | Task/wave IDs are not tenant-scoped | Use tenant/warehouse-qualified lookup. |
| W3-037 | High | PickPack | Over-pick is accepted as PICKED | Reject or explicitly handle excess quantity. |
| W3-038 | Critical | PickPack | No inventory reservation consumption found | Integrate Inventory ledger and idempotency. |
| W3-039 | High | PickPack | Pack references are not validated | Verify order/shipment/warehouse relation. |
| W3-040 | High | Last Mile | Carrier rates and profiles are static in memory | Use versioned provider quotes and live adapters. |
| W3-041 | Critical | Delivery | Order can become DELIVERED without POD | Require qualified carrier/POD observation. |
| W3-042 | Critical | Returns | Returns are auto-approved on creation | Implement eligibility and authorization decision. |
| W3-043 | Critical | Returns | Actors are random UUIDs | Use authenticated actor identity. |
| W3-044 | Critical | Returns | Receive/inspect paths lack visible tenant guard | Tenant-scope return and receipt operations. |
| W3-045 | High | Returns | Receive sets all requested quantity as received | Capture item/package discrepancies. |
| W3-046 | Critical | Returns | RESTOCK only logs; Inventory is not updated | Execute idempotent Inventory posting. |
| W3-047 | High | Disputes | Detail/evidence/rebuttal/decision paths query case by ID without tenant predicate | Enforce case ownership. |
| W3-048 | High | Disputes | Evidence and timeline are mutable JSON | Use append-only evidence records. |
| W3-049 | Critical | Settlement | Marketplace and Payment settlement ownership overlaps | Separate seller ledger from money movement. |
| W3-050 | Critical | Settlement | Marketplace cycle/transaction ID operations are unscoped | Tenant-scope every operation. |
| W3-051 | Critical | Settlement | Transaction tenant/company may differ from cycle | Derive scope from cycle and validate reference. |
| W3-052 | High | Settlement | Dashboard totalCycles is global | Use tenant-scoped count. |
| W3-053 | High | Settlement | Dashboard monetary values are zero placeholders | Calculate real tenant metrics. |
| W3-054 | Critical | Payment Settlement | All captured payments can be grouped globally | Partition by tenant, seller, currency and payout destination. |
| W3-055 | Critical | Payout | SETTLED state has no verified provider transfer | Separate approval from payout outcome. |
| W3-056 | Critical | ESG | Goal ID operations and getAll are unscoped | Use trusted tenant context and role policy. |
| W3-057 | High | ESG | Progress accepts self-reported currentValue without evidence | Attach measurement source and methodology. |
| W3-058 | High | ESG | Progress formula may compare percentage to absolute target | Define target semantics and validate units. |
| W3-059 | High | ESG | Science-based/SBTi status is self-asserted | Store external assurance evidence. |
| W3-060 | High | ESG | Kafka failure is swallowed and payload is minimal | Use outbox and governed event envelope. |
| W3-061 | Critical | ESG | Duplicate Sustainability Goal models exist | Canonicalize Compliance and specialized Carbon ownership. |
| W3-062 | Critical | AI Evaluation | Evaluations-by-run ignore tenant header | Query by tenant and run. |
| W3-063 | Critical | AI Evaluation | Evaluator identity is client-supplied | Use authenticated reviewer identity and role. |
| W3-064 | High | AI Evaluation | Agent run existence and tenant ownership are not verified | Link evaluation to immutable run record. |
| W3-065 | High | AI Evaluation | Scores have no range validation | Validate 0-100 and missing-value policy. |
| W3-066 | High | AI Evaluation | Duplicate/conflicting evaluations are unrestricted | Define reviewer and revision policy. |
| W3-067 | High | AI Evaluation | Model/prompt/tool/dataset versions are not snapshotted | Bind evaluation to reproducible run context. |
| W3-068 | High | Cross-domain | No durable outbox found across reviewed workflows | Standardize outbox/inbox and replay controls. |
