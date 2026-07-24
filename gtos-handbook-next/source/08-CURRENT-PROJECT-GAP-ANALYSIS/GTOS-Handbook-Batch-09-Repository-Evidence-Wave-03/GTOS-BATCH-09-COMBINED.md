# GTOS Batch 09 — Repository Evidence Wave 03 Combined Edition


---

<!-- SOURCE: 00-SCOPE-METHOD-AND-SNAPSHOT.md -->

# 00 — Scope, Method, and Snapshot

| Field | Value |
|---|---|
| Repository | `chinair88-prog/allinb2c` |
| Snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| Branch for handbook artifacts | `gtos/handbook-repository-grounded-expansion-v2` |
| Review date | `2026-07-23` |
| Scope | Catalog → Pricing → Checkout → Order → Fulfilment → Returns → Settlement → ESG → AI Evaluation |

## Evidence Method

فایل‌های Java، TypeScript و SQL پس از Repository search مستقیماً خوانده شدند. Classification فقط به کوچک‌ترین ادعای قابل دفاع اختصاص یافت.

تمایزهای اجباری:

1. Product master در برابر Marketplace catalog entry و Offer؛
2. calculated price در برابر published/accepted Price Version؛
3. cart item price در برابر authoritative checkout quote؛
4. Order state در برابر Inventory/Payment/Fulfilment outcome؛
5. shipped/delivered status در برابر carrier observation یا Proof of Delivery؛
6. return inspection record در برابر inventory restock execution؛
7. settlement calculation در برابر payout execution؛
8. sustainability target در برابر independently verified ESG metric؛
9. evaluation submission در برابر trustworthy model evaluation and governance decision.

## Limitations

- Runtime configuration، migration execution و CI results مستقل اجرا نشده‌اند.
- وجود Test file به معنی pass بودن نیست.
- External payment، carrier، customer delivery، sustainability assurance و model-evaluation authority اثبات نشده‌اند.
- Header یا request field فقط در صورت اتصال به trusted identity context، authority محسوب می‌شود.


---

<!-- SOURCE: 01-PRODUCT-CATALOG-MARKETPLACE-AND-OFFER.md -->

# 01 — Product Catalog, Marketplace Catalog, and Offer

## Three overlapping product representations

سه representation اجرایی وجود دارد:

1. `catalog.products` در `product-catalog-service` با `ProductEntity`.
2. یک read mapping دیگر روی همان جدول در `marketplace-service` با `CatalogProductEntity`.
3. `marketplace.product_catalog_entries` با tenant/company، unit price، MOQ، lead time و verification fields.

این وضعیت برای Product Master و Marketplace Offer برابر است با:

`CONFLICT_REQUIRES_CANONICALIZATION`

## Product Catalog Service

`ProductController` و `ProductService` رفتارهای زیر را ارائه می‌کنند:

- list/search/filter؛
- get by ID و slug؛
- create/update/archive؛
- update status؛
- resell from purchase؛
- similar products؛
- tiered pricing.

`ProductEntity` شامل multilingual names، SKU، category، supplier، brand، origin، HS code، status، visibility، base/compare/cost price، dimensions، MOQ، tax، approval fields و source tracking است.

Classification: `IMPLEMENTED_WITH_GAP`.

## Critical catalog findings

- `ProductEntity` tenant/company field ندارد.
- `@Version` روی Product دیده نشد.
- Controller authorization annotation اجرایی دیده نشد و actor fallback برابر `anonymous` است.
- `updateProduct` می‌تواند status را مستقیم از request تنظیم کند و dedicated status workflow را دور بزند.
- `updateProductStatus` transition matrix یا role guard آشکار ندارد.
- `resellFromPurchase` ownership منبع، Inventory possession، Quality eligibility یا legal resale eligibility را verify نمی‌کند.
- Product خود base/cost/compare price نگه می‌دارد، درحالی‌که Pricing و Marketplace نیز pricing دارند.
- Product tier prices hard-coded هستند و Price Version مستقل نیستند.

## Marketplace Product Catalog

`marketplace.product_catalog_entries` tenant/company-aware است و API CRUD، overview و category listing دارد. بااین‌حال:

- create tenant/company را از request می‌پذیرد؛
- get/update/delete by ID tenant predicate آشکار ندارند؛
- `isVerified` و `isFeatured` از request قابل تنظیم‌اند؛
- hard delete وجود دارد؛
- `unitPrice` داخل Catalog Entry ذخیره می‌شود.

Classification: `IMPLEMENTED_WITH_GAP`.

## Missing Offer aggregate

یک Marketplace Offer canonical که Seller، Product Version، Price Version، Inventory Eligibility، Channel، Region، Terms، Availability Window و Publication Decision را immutable snapshot کند، در شواهد بررسی‌شده پیدا نشد.

Target boundary:

```text
ProductMaster
→ ProductVersion
→ SellerAssortmentEligibility
→ PriceVersion
→ MarketplaceOffer
→ OfferPublicationDecision
→ CheckoutOfferSnapshot
```


---

<!-- SOURCE: 02-PRICING-PRICE-VERSION-AND-COMMERCIAL-SNAPSHOT.md -->

# 02 — Pricing, Price Version, and Commercial Snapshot

## Implemented pricing capabilities

دو implementation اصلی وجود دارد:

### Pricing Service Target Price

`TargetPriceController` و `TargetPriceService`:

- create/update/delete policy؛
- list by tenant/product؛
- lookup active target price.

### Marketplace Smart Pricing

`SmartPricingService` و `SmartPricingController`:

- Price Rule CRUD؛
- Landed Cost CRUD؛
- Market Price Snapshot؛
- competitor averages؛
- price calculation؛
- pricing overview.

Strategies شامل Cost Plus، Market Based، Dynamic، Penetration، Skimming، Volume Tiered، Promotional و Bundle هستند.

Classification: `IMPLEMENTED_WITH_GAP`.

## Critical pricing findings

- tenant/company در Target Price و Smart Pricing از request/query گرفته می‌شوند.
- get/update/delete rule by ID tenant-scoped نیستند.
- Target Price status string آزاد است.
- Catalog Product و Marketplace Catalog Entry نیز قیمت مستقل ذخیره می‌کنند.
- Category و Warehouse rule matching در engine عملاً `true` و با comment `simplified` اجرا می‌شود؛ در نتیجه rule می‌تواند خارج از scope اعمال شود.
- Volume tiers hard-coded هستند.
- manual discount/surcharge از request پذیرفته می‌شود.
- response currency در محاسبه Smart Pricing به USD hard-code شده است.
- competitor source authenticity، timestamp policy و observation confidence محدود است.
- Price Version، approval، publication، effective interval، supersession و accepted checkout quote مستقل پیدا نشد.

## Canonical pricing model

```text
CostObservation
+ LandedCostVersion
+ MarketPriceObservation
+ PricingRuleVersion
→ PriceCalculation
→ PriceApprovalDecision
→ PriceVersion
→ OfferPrice
→ CheckoutPriceSnapshot
```

Cart و Order باید Price Snapshot را با rule/version/effective time ذخیره کنند، نه اینکه `unitPrice` Client را حقیقت تلقی کنند.


---

<!-- SOURCE: 03-CART-CHECKOUT-AND-AI-INSIGHTS.md -->

# 03 — Cart, Checkout, and AI Insights

## Cart implementation

`CartController` و `CartService` رفتارهای زیر را دارند:

- create/get cart by user or session؛
- get by cart ID؛
- add/update/remove item؛
- coupon attach/remove؛
- guest-to-user merge؛
- clear and expiry cleanup.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Cart security and commercial integrity gaps

- userId، sessionId و cartId از request پذیرفته می‌شوند.
- get/update/delete by cart ID ownership check آشکار ندارند.
- Cart item فیلدهای SKU، name، unitPrice، currency، providerId و attributes را از Client می‌پذیرد.
- Catalog/Offer/Inventory lookup قبل از add دیده نشد.
- MOQ، maximum quantity، channel eligibility و availability validate نمی‌شوند.
- Coupon فقط به cart attach می‌شود؛ comment صریحاً می‌گوید validation واقعی بعداً توسط CouponService انجام می‌شود.
- guest merge با userId/sessionId ارسالی Caller انجام می‌شود.

## Checkout implementation

`CheckoutController`:

- checkout start؛
- cart-to-order conversion؛
- checkout validation؛
- order verification؛
- payment confirmation؛
- AI insights.

اما checkout قیمت‌های Cart را مستقیماً به Order Item منتقل می‌کند. comparison واقعی با Catalog/Offer انجام نمی‌شود. tenantId نیز از Checkout request وارد Order می‌شود، مگر TenantContext در Order layer آن را override کند.

`confirm-payment` مستقیماً Order را paid می‌کند و در فایل بررسی‌شده signed provider callback، idempotency، amount/currency reconciliation یا Payment Intent ownership اثبات نشد.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Simulated AI

کد صریحاً AI analysis را `reference implementation that simulates AI decisions` معرفی می‌کند.

Fraud score، ETA، payment suggestion، warehouse routing و upsell با ruleهای محلی و hard-coded ساخته می‌شوند؛ برای نمونه warehouseهای `wh-main` و `wh-special` و carrierهای فرضی انتخاب می‌شوند.

Classification:

- AI checkout advice: `SIMULATED_REFERENCE_IMPLEMENTATION`
- persisted AI decision: `PLANNED_NOT_IMPLEMENTED`؛ کد فقط آن را log می‌کند.

## Required checkout contract

Checkout باید:

1. actor/cart ownership را verify کند؛
2. Offer و Price Version را دوباره resolve کند؛
3. availability و reservation را اجرا کند؛
4. shipping/tax/discount را authoritative محاسبه کند؛
5. quote expiry و idempotency داشته باشد؛
6. Payment Intent بسازد؛
7. Order Snapshot immutable ایجاد کند؛
8. AI output را advisory و traceable نگه دارد.


---

<!-- SOURCE: 04-CUSTOMER-ORDER-AND-WORKFLOW.md -->

# 04 — Customer Order and Workflow

## Implemented order model

`OrderEntity` دارای:

- Order، Payment و Fulfilment statusهای جدا؛
- tenantId؛
- monetary totals و currency؛
- item/address snapshots؛
- payment/shipping references؛
- history؛
- `@Version` optimistic locking؛
- transition methods برای approve/process/ship/deliver/cancel/hold/refund/return.

`OrderApplicationService` CRUD، workflow، analytics، import و editing را facade می‌کند.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Positive controls

- several state transitions validate current state؛
- entity uses enums؛
- optimistic version exists؛
- per-ID reads and workflow commands use TenantContext-aware lookup when context exists؛
- cache keys often include tenant key؛
- order history entity exists.

## Critical findings

1. `OrderCrudService.list()` در هر دو branch شرط، `repository.findAll()` اجرا می‌کند؛ tenant-scoped list عملاً leak دارد.
2. bulk approve/cancel/refund از `findAllById` بدون tenant filter استفاده می‌کنند.
3. system/internal context عمداً fail-open است.
4. Order Items قیمت و snapshot را از request می‌پذیرند.
5. `recordTransition` پس از تغییر status، همان status فعلی را برای from و to می‌خواند؛ local variable `from` استفاده نمی‌شود.
6. `markPaid` state، amount، currency، transaction uniqueness یا provider signature guard ندارد.
7. hold از هر status قابل اعمال است.
8. local Spring Event استفاده می‌شود؛ broker/outbox وجود ندارد.
9. `OrderWorkflowOrchestrator` مراحل Inventory Reservation، Payment Capture، Fulfilment، Settlement و Returns را فقط در comment ثبت کرده است.
10. auto-approval threshold برابر 1000 است، بدون currency normalization و risk policy.

## Correct truth boundaries

Order باید تعهد تجاری را نگه دارد؛ اما:

- Payment outcome متعلق به Payment Domain است.
- Inventory reservation متعلق به Inventory است.
- Pick/Pack متعلق به Warehouse است.
- Shipment/Delivery observation متعلق به Shipping/Carrier integration است.
- Settlement متعلق به Finance/Marketplace settlement owner است.

Order status باید projection این facts باشد، نه جایگزین آن‌ها.


---

<!-- SOURCE: 05-ALLOCATION-FULFILMENT-PICK-PACK-AND-LAST-MILE.md -->

# 05 — Allocation, Fulfilment, Pick, Pack, and Last Mile

## Allocation

Inventory Reservation در Wave 02 وجود داشت، اما اتصال واقعی Order به Inventory در `OrderWorkflowOrchestrator` فقط comment است:

- validate products؛
- reserve inventory؛
- pre-authorize/capture payment؛
- create fulfilment order.

بنابراین Order-driven Allocation برابر است با `PLANNED_NOT_IMPLEMENTED`.

## Legacy Fulfilment

Warehouse `FulfillmentService`:

- deprecated و forRemoval است؛
- Sales Order list/get/update status دارد؛
- get/update by ID tenant scope آشکار ندارند؛
- status string آزاد است.

Classification: `DEPRECATED_IMPLEMENTATION`.

## Pick and Pack

`PickPackService` و Controller واقعاً این Subjects را مدیریت می‌کنند:

- Pick Wave؛
- Pick Task؛
- Pack Task؛
- assign/start/complete/cancel؛
- picked quantity و short pick؛
- tracking number، shipping label، weight، volume و box count.

Classification: `IMPLEMENTED_WITH_GAP`.

## Pick/Pack gaps

- tenantId از request گرفته می‌شود.
- get/update operations by ID tenant-scoped نیستند.
- statusها string و transitionها محدود/ناهمگون‌اند.
- confirmPick over-pick را منع نمی‌کند؛ quantity برابر یا بزرگ‌تر از requested، `PICKED` می‌شود.
- Inventory reservation consumption/decrement دیده نشد.
- wave/task creation به Order/Inventory entitlement متصل نیست.
- Pack Task order/shipment references را verify نمی‌کند.
- Event/outbox برای Picked/Packed پیدا نشد.
- Dispatch/Handover از Pack completion جدا و canonical نشده است.

## Last-Mile Optimizer

`LastMileCarrierOptimizer`:

- Carrier profileهای DHL، FedEx، UPS و China Post را در memory seed می‌کند؛
- static rate table دارد؛
- rate shopping، composite scoring، fallback chain و delivery promise می‌سازد.

این یک static decision engine است، نه live carrier integration.

Classification: `SIMULATED_REFERENCE_IMPLEMENTATION`.

موارد مفقود:

- negotiated/live rates؛
- currency و quote expiry؛
- serviceability/capacity؛
- carrier booking/label purchase؛
- provider request/response IDs؛
- pickup acceptance؛
- tracking webhook؛
- delivery exception؛
- Proof of Delivery.

## Delivery Proof

`OrderEntity.deliver()` فقط از SHIPPED به DELIVERED تغییر می‌دهد و timestamp ثبت می‌کند. Signature، recipient identity، delivery photo، geo/location، carrier event reference یا correction flow پیدا نشد.

Classification:

- Order delivery status: `IMPLEMENTED_WITH_GAP`
- Proof of Delivery: `PLANNED_NOT_IMPLEMENTED`


---

<!-- SOURCE: 06-RETURNS-INSPECTION-DISPUTES-AND-REFUND.md -->

# 06 — Returns, Inspection, Disputes, and Refund

## Returns implementation

`ReturnsController` و `ReturnsService` رفتارهای زیر را دارند:

- create return/RMA؛
- create return lines؛
- receive at warehouse؛
- inspect received items؛
- create return-to-stock decision؛
- dispute claim، evidence، rebuttal، decision و appeal workspace.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Strong structural evidence

- Return، Return Item، Receipt، Inspection و Return-to-Stock Decision entities جدا هستند.
- tenant/company روی Return و Receipt ذخیره می‌شود.
- classification به RESTOCK/HOLD/DAMAGED/SCRAP نگاشت می‌شود.
- dispute workspace evidence/timeline، liability، financial impact و appeal دارد.

## Critical returns findings

1. هر Return در create فوراً `authorizationStatus = APPROVED` می‌گیرد.
2. `createdBy`، `receivedBy`، `inspectedBy` و `executedBy` با UUID تصادفی تولید می‌شوند، نه actor واقعی.
3. source order line، customer/supplier و SKU ownership/eligibility verify نمی‌شود.
4. receive by returnId و inspect by receiptId tenant/company guard آشکار ندارند.
5. receive تمام requested quantity را بدون scan/discrepancy برابر received می‌کند.
6. Inspection result/classification از request پذیرفته می‌شود و authority/calibration/evidence ندارد.
7. RESTOCK فقط log می‌شود؛ Inventory posting در comment به آینده موکول شده است.
8. Refund execution به Payment Domain متصل نیست.
9. dispute detail، evidence، rebuttal، decision و appeal در چند مسیر record را by ID بدون tenant predicate می‌خوانند.
10. workspace برای Returnها `findAll()` و in-memory tenant filtering دارد.
11. evidence/timeline در JSON mutable ذخیره می‌شود.
12. Dispute financial decision به payout/refund execution وصل نیست.

## Canonical return flow

```text
ReturnRequest
→ EligibilityDecision
→ ReturnAuthorization
→ InboundShipment/Receipt
→ Item-Level Inspection Evidence
→ Disposition Decision
→ Inventory Posting or Scrap/Repair
→ Refund/Replacement Intent
→ Payment Outcome
→ Resolution and Appeal
```


---

<!-- SOURCE: 07-SETTLEMENT-RECONCILIATION-AND-PAYOUT.md -->

# 07 — Settlement, Reconciliation, and Payout

## Competing settlement owners

دو Settlement Service اجرایی وجود دارد:

1. Marketplace Settlement:
   - cycles؛
   - transactions؛
   - commission/discount aggregation؛
   - reconciliation؛
   - dashboard؛
   - scheduler.
2. Payment Settlement:
   - batch کردن Payment Captureهای `CAPTURED`؛
   - gross/fee/net calculation؛
   - اتصال captureها به batch.

وضعیت ownership:

`CONFLICT_REQUIRES_CANONICALIZATION`

## Marketplace Settlement

نقاط مثبت:

- state transition map؛
- cycle calculation؛
- audit و metrics؛
- reconciliation records؛
- auto-generation با overlap check؛
- tenant-aware list endpoints.

Classification: `IMPLEMENTED_WITH_GAP`.

### Material gaps

- tenant/company از request وارد create می‌شوند.
- get/update/calculate cycle by ID tenant guard آشکار ندارد.
- addTransaction بررسی نمی‌کند request tenant/company با cycle یکسان باشد.
- transaction reference authenticity و idempotency دیده نشد.
- Dashboard `totalCycles` را با global `cycleRepository.count()` می‌سازد و می‌تواند cross-tenant count leak کند.
- dashboard monetary summaries صفر hard-code شده‌اند.
- status `SETTLED` فقط state update است؛ bank/payout provider execution پیدا نشد.
- reconciliation actualAmount و resolvedBy از request پذیرفته می‌شوند.
- LLM settlement disabled است.
- multi-currency aggregation normalization دیده نشد.

## Payment Settlement

Payment service captureهای تسویه‌نشده را globally جمع می‌کند، fee rate را اعمال و Settlement Batch می‌سازد.

Classification: `IMPLEMENTED_WITH_GAP`.

### Material gaps

- list و run settlement tenant/company scope ندارند.
- capture grouping بر اساس seller، tenant، currency یا payout destination نیست.
- تمام CAPTURED records در یک batch جمع می‌شوند.
- payout execution، provider transfer، retry، reconciliation و failure recovery دیده نشد.
- overlap با Marketplace Settlement روشن نشده است.

## Canonical boundary

Payment باید money movement و provider facts را مالک باشد. Marketplace باید seller ledger، commission، entitlement و reconciliation را مالک باشد. Settlement approval نباید خودبه‌خود به معنی payout success باشد.


---

<!-- SOURCE: 08-ESG-SUSTAINABILITY-GOALS-AND-ASSURANCE.md -->

# 08 — ESG, Sustainability Goals, and Assurance

## Implemented goal management

Compliance Service برای Sustainability Goal این رفتارها را دارد:

- create/update؛
- activate؛
- update progress؛
- archive/delete؛
- get/list/filter by tenant/status/type؛
- Kafka send برای goal events.

Goal شامل baseline، target، year، scope، reduction type، framework، SBTi flag، plan، milestones، owner، budget و progress است.

Classification: `IMPLEMENTED_WITH_GAP`.

## Critical ESG findings

- Controller authorization و trusted tenant context آشکار ندارد.
- tenantId از request/path گرفته می‌شود.
- get/update/activate/delete by ID tenant-scoped نیستند.
- `getAllGoals()` global است.
- currentValue از request parameter مستقیم پذیرفته می‌شود؛ Measurement Source، methodology، evidence و assurance وجود ندارد.
- progress formula target semantics را مخلوط می‌کند: درصد کاهش محاسبه‌شده با `targetValue` مقایسه می‌شود، درحالی‌که targetValue ممکن است absolute target باشد.
- statusهای ON_TRACK/BEHIND_SCHEDULE فقط با threshold ثابت 75 تعیین می‌شوند و timeline نسبت به targetYear لحاظ نمی‌شود.
- `isScienceBased` و SBTi fields self-asserted هستند.
- Event payload فقط string نوع و ID است؛ failure catch/log می‌شود و outbox ندارد.
- hard delete برای ESG goal وجود دارد.
- یک SustainabilityGoal Entity دیگر در `specialized/carbon-tracking-service` وجود دارد؛ ownership conflict باید حل شود.

## Assurance boundary

یک Goal record به‌تنهایی ESG disclosure، verified carbon footprint یا SBTi validation نیست.

مدل هدف:

```text
MeasurementSource
→ ActivityData
→ EmissionFactorVersion
→ CalculationMethodVersion
→ SustainabilityMetricObservation
→ AssuranceEvidence
→ GoalProgressAssessment
→ DisclosureVersion
```


---

<!-- SOURCE: 09-AI-EVALUATION-AND-GOVERNED-LEARNING.md -->

# 09 — AI Evaluation and Governed Learning

## Implemented evaluation capability

AI Orchestrator این رفتارها را دارد:

- submit human evaluation برای Agent Run؛
- recent evaluations by tenant؛
- evaluations by run؛
- use-case stats؛
- autonomy-level recommendation.

Evaluation شامل rating، accuracy، safety، usefulness، comment، corrections و tags است. Rolling averages و recommendation ruleها نیز اجرا می‌شوند.

Classification: `IMPLEMENTED_WITH_GAP`.

## Positive evidence

- rating enum-like validation دارد.
- aggregate stats per tenant/use case ذخیره می‌شود.
- high/low safety and accuracy thresholds recommendation تولید می‌کنند.
- minimum sample sizes برای برخی escalationها در نظر گرفته شده است.

## Critical evaluation findings

1. evaluatorUserId از request پذیرفته و فقط با prefix `human:` ذخیره می‌شود.
2. Agent Run existence، completion، tenant ownership و use-case match verify نمی‌شود.
3. `GET evaluations/{runId}` header tenant را می‌گیرد ولی Service فقط بر اساس runId query می‌کند.
4. accuracy/safety/usefulness score range validate نمی‌شود.
5. duplicate evaluation یا evaluator conflict policy دیده نشد.
6. evaluation independence، reviewer role، blind review و conflict-of-interest وجود ندارد.
7. corrections/tags به‌صورت strings/JSON ذخیره می‌شوند.
8. recommendation فقط heuristic است و policy change خودکار/approval governance کامل ندارد.
9. default current autonomy level برابر 3 است، حتی بدون profile evidence.
10. evaluation quality، dataset version، model version، prompt/tool configuration و output artifact به‌طور صریح snapshot نشده‌اند.

## Governed learning boundary

Evaluation feedback نباید مستقیماً Model یا Autonomy را تغییر دهد. Recommendation باید با evidence window، model/run version، reviewer authority، safety veto، approval و rollback همراه باشد.


---

<!-- SOURCE: 10-CROSS-DOMAIN-CONFLICTS-AND-CANONICALIZATION.md -->

# 10 — Cross-Domain Conflicts and Canonicalization

| ID | Conflict | Canonical decision required |
|---|---|---|
| C-301 | Product master در catalog.products و marketplace.product_catalog_entries تکرار شده | Product Master، Offer Projection و migration owner تعیین شود |
| C-302 | قیمت در Product، Marketplace Catalog، Target Price و Smart Pricing وجود دارد | Price Version و Pricing authority واحد تعریف شود |
| C-303 | Cart unit price را از Client می‌پذیرد | Checkout باید Offer/Price Snapshot authoritative بسازد |
| C-304 | confirm-payment مستقیماً Order را Paid می‌کند | Payment provider outcome تنها منبع Payment truth باشد |
| C-305 | Order list و bulk operations tenant leak دارند | تمام repository accessها fail-closed tenant-scoped شوند |
| C-306 | Order Saga فقط comment است | Inventory/Payment/Fulfilment orchestration واقعی و compensating actions ساخته شود |
| C-307 | Warehouse Sales Order deprecated با Customer Order overlap دارد | Fulfilment Order boundary و migration تعیین شود |
| C-308 | Pick/Pack به Inventory consumption متصل نیست | Reservation consumption و stock ledger contract پیاده شود |
| C-309 | Delivered بدون POD ثبت می‌شود | Delivery Observation و POD مستقل ایجاد شود |
| C-310 | Return RESTOCK فقط log است | Return disposition به Inventory Posting متصل شود |
| C-311 | Refund در Order/Return با Payment execution جداست | Refund Intent و Provider Outcome canonical شود |
| C-312 | Marketplace و Payment هر دو Settlement owner هستند | Seller ledger و money movement ownership جدا شود |
| C-313 | Sustainability Goal در دو Service وجود دارد | ESG/Carbon owner و projectionها تعیین شوند |
| C-314 | AI evaluation run lookup tenant-scoped نیست | Evaluation identity و run ownership سخت‌گیری شود |
| C-315 | local/in-memory/static engines به‌عنوان AI/Carrier behavior معرفی می‌شوند | Simulation label و production provider boundary اجباری شود |


---

<!-- SOURCE: 11-IMPLEMENTATION-STATUS-MATRIX.md -->

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


---

<!-- SOURCE: 12-WAVE-03-ISSUE-REGISTER.md -->

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


---

<!-- SOURCE: 13-WAVE-03-TRACEABILITY-MATRIX.md -->

# 13 — Wave 03 Traceability Matrix

| Evidence ID | Repository path | Blob SHA | Classification |
|---|---|---|---|
| `CATALOG-PRODUCT-CONTROLLER` | `backend/domain/commerce/product-catalog-service/src/main/java/com/allinb2c/commerce/productcatalog/api/ProductController.java` | `5d1153964968cc4a51674833c808616bd51325e2` | `IMPLEMENTED_WITH_GAP` |
| `CATALOG-PRODUCT-SERVICE` | `backend/domain/commerce/product-catalog-service/src/main/java/com/allinb2c/commerce/productcatalog/service/ProductService.java` | `54b0cbc821d6480be31585254405a1d000e06b7a` | `IMPLEMENTED_WITH_GAP` |
| `CATALOG-PRODUCT-ENTITY` | `backend/domain/commerce/product-catalog-service/src/main/java/com/allinb2c/commerce/productcatalog/entity/ProductEntity.java` | `bad889f79bbcbb281e5f0afaec1360183b927b95` | `IMPLEMENTED_WITH_GAP` |
| `MARKETPLACE-CATALOG-MAPPING` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/catalog/CatalogProductEntity.java` | `5a78fddadc333c2b49458e3d8df7b60cb5580100` | `CONFLICT_REQUIRES_CANONICALIZATION` |
| `MARKETPLACE-ECOSYSTEM-DDL` | `backend/domain/commerce/marketplace-service/src/main/resources/db/migration/V8__phase_h_marketplace_ecosystem.sql` | `e3f04355db77b411a03d77ff1b7c7f20c1b96727` | `VERIFIED_IMPLEMENTED` |
| `MARKETPLACE-CATALOG-CONTROLLER` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/controller/ProductCatalogController.java` | `6b7a2675f1283e2fece8ca1a997d4deabd20126f` | `IMPLEMENTED_WITH_GAP` |
| `MARKETPLACE-CATALOG-SERVICE` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/service/ProductCatalogService.java` | `1d5c280c0e5086c5fd7ed34e944fe0cb782951df` | `IMPLEMENTED_WITH_GAP` |
| `TARGET-PRICE-CONTROLLER` | `backend/domain/commerce/pricing-service/src/main/java/com/allinb2c/commerce/pricing/controller/TargetPriceController.java` | `4dd2bf14a963a27d9a4276df4e55703d61dca56b` | `IMPLEMENTED_WITH_GAP` |
| `TARGET-PRICE-SERVICE` | `backend/domain/commerce/pricing-service/src/main/java/com/allinb2c/commerce/pricing/service/TargetPriceService.java` | `8e1dfde40c29a53dcae6cd4e72993a5c22595d19` | `IMPLEMENTED_WITH_GAP` |
| `SMART-PRICING-CONTROLLER` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/controller/SmartPricingController.java` | `20079cc399fcc65d9512715c50e339f183945045` | `IMPLEMENTED_WITH_GAP` |
| `SMART-PRICING-SERVICE` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/service/SmartPricingService.java` | `8be4df025c3836f5395284415149268a45ca69ef` | `IMPLEMENTED_WITH_GAP` |
| `CART-CONTROLLER` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/api/CartController.java` | `2f1f550db8296746b41f6e87eadf4899615fd0d3` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `CART-SERVICE` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/service/CartService.java` | `9f7194377156c248973ebb46a9507b4eb50f5060` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `CHECKOUT-CONTROLLER` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/api/CheckoutController.java` | `77cf28681bd107a6cc0227938328d18d86b1836e` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `ORDER-APPLICATION` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/service/OrderApplicationService.java` | `7fba54d4dfb94afcc8d2f575191d10ab95b3ff60` | `IMPLEMENTED_WITH_GAP` |
| `ORDER-ENTITY` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/entity/OrderEntity.java` | `1f3efa66e3830dc2c7e85866faab8cd8a604b552` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `ORDER-CRUD` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/service/OrderCrudService.java` | `df6182d7681f495b4ba7915adb46cc281fe56735` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `ORDER-WORKFLOW` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/service/OrderWorkflowService.java` | `925e9a08b779fa5bb3fae3e2fbc10417d1fdd930` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `ORDER-EVENT-PUBLISHER` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/event/OrderEventPublisher.java` | `2e845993a7a7f582bf29c5f5eca411419c28e98f` | `LOCAL_EVENT_ONLY` |
| `ORDER-ORCHESTRATOR` | `backend/domain/commerce/order-service/src/main/java/com/allinb2c/commerce/order/service/OrderWorkflowOrchestrator.java` | `85b7b03ac88825db7ad2862e2f0be311a63df015` | `PLANNED_NOT_IMPLEMENTED` |
| `LEGACY-FULFILMENT` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/service/FulfillmentService.java` | `9f7906ea15fb5b7717bc03dbc47d20c0b7c0b084` | `DEPRECATED_IMPLEMENTATION` |
| `PICK-PACK-SERVICE` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/service/PickPackService.java` | `b34fe872f1b365d1fe81bd42ea09f7262d030873` | `IMPLEMENTED_WITH_GAP` |
| `PICK-PACK-CONTROLLER` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/controller/PickPackController.java` | `19619f06c31753480139e2abb65669418e9006af` | `IMPLEMENTED_WITH_GAP` |
| `LAST-MILE-OPTIMIZER` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/routing/LastMileCarrierOptimizer.java` | `b937fc261f5f0b36017526b4e50087e3d18cc727` | `SIMULATED_REFERENCE_IMPLEMENTATION` |
| `RETURNS-CONTROLLER` | `backend/domain/commerce/returns-service/src/main/java/com/allinb2c/commerce/returns/controller/ReturnsController.java` | `1dfa9a38b5aa5ea897983f57a8677d5b98c46969` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `RETURNS-SERVICE` | `backend/domain/commerce/returns-service/src/main/java/com/allinb2c/commerce/returns/service/ReturnsService.java` | `56f7daeb6050444bcf661de67e59ee9789934478` | `IMPLEMENTED_WITH_CRITICAL_GAPS` |
| `RETURNS-WORKSPACE` | `backend/domain/commerce/returns-service/src/main/java/com/allinb2c/commerce/returns/service/ReturnsResolutionWorkspaceService.java` | `5e2054b768d6714eb97a6fade8a8c2f24ed97628` | `IMPLEMENTED_WITH_GAP` |
| `MARKETPLACE-SETTLEMENT-CONTROLLER` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/controller/SettlementController.java` | `b7c07f242f699f22817ef1fa8a6f23a049469a4a` | `IMPLEMENTED_WITH_GAP` |
| `MARKETPLACE-SETTLEMENT-SERVICE` | `backend/domain/commerce/marketplace-service/src/main/java/com/allinb2c/commerce/marketplace/service/SettlementService.java` | `e1a9c2bc7fa3d534d6473c8fd8efd7c56bc03616` | `IMPLEMENTED_WITH_GAP` |
| `PAYMENT-SETTLEMENT-SERVICE` | `backend/domain/commerce/payment-service/src/main/java/com/allinb2c/commerce/payment/service/SettlementService.java` | `d22c93a39b7bef2beabc33a5e028d8986dbf2b2f` | `IMPLEMENTED_WITH_GAP` |
| `ESG-GOAL-CONTROLLER` | `backend/domain/engagement/compliance-service/src/main/java/com/allinb2c/engagement/compliance/carbontracking/api/SustainabilityGoalController.java` | `6adbd69c94842195498fad0a7bbafa0cbe9dea6c` | `IMPLEMENTED_WITH_GAP` |
| `ESG-GOAL-SERVICE` | `backend/domain/engagement/compliance-service/src/main/java/com/allinb2c/engagement/compliance/carbontracking/service/SustainabilityGoalService.java` | `f57f361dd603d06487a7584fa9ed7f06d40949ae` | `IMPLEMENTED_WITH_GAP` |
| `AI-EVALUATION-CONTROLLER` | `backend/domain/intelligence/ai-orchestrator/src/main/java/com/allinb2c/intelligence/orchestrator/evaluation/EvaluationController.java` | `4477c54867d7113c70c7f93cd37d35070c459a28` | `IMPLEMENTED_WITH_GAP` |
| `AI-EVALUATION-SERVICE` | `backend/domain/intelligence/ai-orchestrator/src/main/java/com/allinb2c/intelligence/orchestrator/evaluation/EvaluationService.java` | `66445f266f5aae7347cf1bd1c6b0945f8787904a` | `IMPLEMENTED_WITH_GAP` |


---

<!-- SOURCE: 14-REMEDIATION-AND-VERIFICATION-PLAN.md -->

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


---

<!-- SOURCE: 15-NEXT-WAVE-PLAN.md -->

# 15 — Repository Evidence Wave 04 Plan

Wave 04 باید زیرساخت cross-cutting را بررسی کند:

1. Identity، Authentication، Authorization و Tenant Isolation
2. Audit، Evidence Integrity و Non-Repudiation
3. Event Bus، Outbox/Inbox، Idempotency و Replay
4. API Gateway، Rate Limiting و Abuse Protection
5. Secrets، Key Management و Encryption
6. Observability، SLO، Incident و Disaster Recovery
7. Database ownership، migration safety و backup/restore
8. Data Privacy، Retention، Consent و Residency
9. CI/CD، Supply Chain Security و Deployment Evidence
10. Production Readiness and Go-Live Evidence

بدون Wave 04 هیچ Stage تجاری نباید production-certified اعلام شود.


---

<!-- SOURCE: IMPLEMENTATION-STATUS-VOCABULARY.md -->

# Implementation and Evidence Status Vocabulary

| Status | Meaning |
|---|---|
| `VERIFIED_IMPLEMENTED` | Executable code or migration supports the narrow claim |
| `IMPLEMENTED_WITH_GAP` | Executable behavior exists with material gaps |
| `IMPLEMENTED_WITH_CRITICAL_GAPS` | Executable behavior exists but security or truth-integrity defects block safe use |
| `PARTIAL_IMPLEMENTATION` | Only a subset of the capability is executable |
| `DEPRECATED_IMPLEMENTATION` | Executable but explicitly deprecated or pending removal |
| `LOCAL_EVENT_ONLY` | In-process event exists without durable broker/outbox evidence |
| `SIMULATED_REFERENCE_IMPLEMENTATION` | Static, in-memory, or rule simulation; not a production external integration |
| `PLANNED_NOT_IMPLEMENTED` | Intent/comments/contracts exist without executable end-to-end behavior |
| `CONFLICT_REQUIRES_CANONICALIZATION` | Competing owners or Systems of Record exist |
| `REQUIRES_REPOSITORY_REVIEW` | Evidence remains insufficient |
| `TEST_FILE_DISCOVERED` | Test source exists; execution result is unverified |


---

<!-- SOURCE: README.md -->

# GTOS Handbook — Batch 09

## Repository Evidence Wave 03

این بسته بخش Customer-facing Commerce را بر اساس کد اجرایی Repository بررسی می‌کند:

- Product Catalog and Marketplace Catalog
- Pricing and Price Calculation
- Cart and Checkout
- Customer Order
- Allocation, Pick, Pack, Fulfilment
- Last-Mile and Delivery Proof
- Returns, Inspection, Disputes
- Settlement and Reconciliation
- ESG / Sustainability Goals
- AI Evaluation and Governed Learning

| Field | Value |
|---|---|
| Repository | `chinair88-prog/allinb2c` |
| Evidence snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| GitHub branch | `gtos/handbook-repository-grounded-expansion-v2` |
| Release | Batch 09 / Evidence Wave 03 |
| Publication maturity | Code-grounded review artifact |

این بسته Deployment، CI success، provider outcome یا production certification را اثبات نمی‌کند.


---

<!-- SOURCE: RELEASE-REPORT.md -->

# Batch 09 Release Report

| Field | Value |
|---|---|
| Release | Repository Evidence Wave 03 |
| Repository snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| GitHub branch | `gtos/handbook-repository-grounded-expansion-v2` |
| Scope | Catalog through AI Evaluation |
| Maturity | Review artifact, not production certification |

## Principal conclusions

- Product/Catalog and Pricing have multiple competing authorities.
- Cart and Checkout trust Client-supplied identity and price.
- Customer Order has a tenant leak in list and unscoped bulk workflows.
- Cross-service Order Saga is not implemented.
- Pick/Pack is executable but not connected to Inventory consumption.
- Last-Mile is a static in-memory optimizer and POD is absent.
- Returns creates useful records but auto-approves, invents actor IDs, and does not execute restock/refund.
- Marketplace and Payment both implement Settlement with unclear ownership.
- ESG Goal tracking is self-reported and duplicated across services.
- AI Evaluation is executable but run ownership, reviewer identity, score bounds and reproducibility are incomplete.

No area in this Wave is certified end-to-end complete.
