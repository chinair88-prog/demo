# GTOS Batch 08 — Repository Evidence Wave 02 Combined Edition


---

<!-- SOURCE: 00-SCOPE-METHOD-AND-SNAPSHOT.md -->

# 00 — Scope, Method, and Repository Snapshot

| Field | Value |
|---|---|
| Repository | `chinair88-prog/allinb2c` |
| Evidence snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| Handbook branch | `gtos/handbook-repository-grounded-expansion-v2` |
| Wave | Repository Evidence Wave 02 |
| Scope | Quality؛ documents؛ customs؛ transport؛ warehouse؛ inventory |
| Evidence standard | ادعای محدود و پشتیبانی‌شده با فایل اجرایی بررسی‌شده |

## روش بررسی

ابتدا جست‌وجوی کد انجام شد و سپس فایل‌های منتخب Java، TypeScript و SQL مستقیماً خوانده شدند. وجود نام فایل یا route به‌تنهایی Implementation محسوب نشد.

در تمام فصل‌ها این تمایزها حفظ شده‌اند:

1. frontend presentation در برابر backend execution؛
2. software quality در برابر trade-goods quality؛
3. platform status در برابر external legal authority؛
4. وجود جدول در برابر lifecycle کامل؛
5. ذخیره idempotency key در برابر جلوگیری واقعی از duplicate؛
6. وجود tenant field در برابر tenant enforcement قابل اعتماد؛
7. status string در برابر state machine کنترل‌شده؛
8. فراخوانی Event publisher در برابر delivery تضمین‌شده و outbox.

## محدودیت‌ها

- Deployment این snapshot اثبات نشده است.
- وجود فایل Test به‌معنی اجرای موفق Test یا CI نیست.
- migrationها از روی source بررسی شده‌اند، نه اجرای مستقل.
- outcomeهای customs، carrier، inspector و warehouse فقط با authority evidence می‌توانند authoritative شوند.
- بخشی از controllerها direct JDBC دارند و هماهنگی runtime datasource با migration نیازمند integration test است.


---

<!-- SOURCE: 01-QUALITY-INSPECTION-QC-HOLD-AND-RELEASE.md -->

# 01 — Quality Inspection, QC Hold, and Release

## نتیجه اجرایی

Aggregate مستقل و canonical برای بازرسی کیفیت کالای تجاری در شواهد بررسی‌شده پیدا نشد. سه مفهوم متفاوت با واژه Quality مخلوط شده‌اند:

1. صفحه `apps/quality-dashboard/app/inspections/page.tsx` داده‌های Inspection را از یک آرایه ثابت محلی می‌خواند.
2. `QualityController` در dashboard-service کیفیت نرم‌افزار/پروژه، metric، gate و report را مدیریت می‌کند.
3. Inventory و Warehouse یک فرآیند محدودتر QC Hold و stock disposition دارند.

| Capability | Status |
|---|---|
| Trade inspection planning and evidence | `REFERENCE_ARCHITECTURE` |
| Quality Dashboard inspection page | `FRONTEND_MOCK` |
| Software-quality gates/reports | `VERIFIED_IMPLEMENTED`، اما Domain متفاوت |
| Stock QC hold and disposition | `PARTIAL_IMPLEMENTATION` |
| Final release certificate | `REQUIRES_REPOSITORY_REVIEW` |

## صفحه Inspection

صفحه Quality Dashboard نوع‌های `incoming`، `in-process`، `final` و `outgoing` و نتیجه‌های `pass`، `fail` و `pending` را نمایش می‌دهد، اما رکوردها در ثابت `INSPECTIONS` تعریف شده‌اند. فیلتر، جست‌وجو و آمار نیز فقط روی همان آرایه اجرا می‌شوند.

این صفحه نباید به‌عنوان اثبات backend inspection معرفی شود.

## Software Quality Controller

مسیر `/api/quality` رفتارهای زیر را دارد:

- dashboard و score بر اساس projectId؛
- trendهای metric؛
- ingestion و aggregation metric؛
- check و status و failed conditions برای quality gate؛
- تولید، export و schedule report.

این مدل فاقد Production Lot، Sample، Measurement، Specification، Inspector، Laboratory، Defect و Release Certificate است؛ بنابراین متعلق به Stage کیفیت کالا نیست.

## رفتار واقعی Inventory QC

`InventoryPostingService` رفتارهای زیر را پیاده‌سازی می‌کند:

- انتقال quantity از Available به QC Hold؛
- کنترل کافی‌بودن available quantity؛
- disposition نوع `PASS` و بازگشت به Available؛
- `FAIL_DAMAGED` و انتقال به Damaged؛
- `FAIL_BLOCKED` و انتقال به Blocked؛
- ثبت ledger eventهای `QC_HOLD`، `QC_PASS`، `QC_FAIL_DAMAGED` و `QC_FAIL_BLOCKED`.

این رفتار stock disposition را ثابت می‌کند، اما ثابت نمی‌کند چه کسی بازرسی کرده، چه specification و sampling plan استفاده شده، چه measurementهایی ثبت شده و چه authorityای release را صادر کرده است.

## QC Hold Workbench

Warehouse UI:

- از `inventoryApi.listQcHolds()` استفاده می‌کند؛
- `PATCH /api/proxy/quality/status` را با actionهای inspect/release/reject فراخوانی می‌کند؛
- stateهای `PENDING`، `INSPECTING`، `RELEASED` و `REJECTED` دارد؛
- ادعا می‌کند Release باعث Inventory Restock و Reject باعث Stock Adjustment می‌شود.

backend متناظر `/quality/status` در شواهد این Wave پیدا نشد؛ بنابراین این side effectها `CLIENT_CONTRACT_UNVERIFIED` هستند.

## Subjects مفقود

برای تکمیل Stage کیفیت هنوز این Subjects لازم‌اند:

- `InspectionPlan`
- `Inspection`
- `Sample`
- `Measurement`
- `SpecificationVersion`
- `Defect`
- `Nonconformance`
- `CorrectiveAction`
- `QualityDecision`
- `ReleaseCertificate`
- `ReleaseRevocation`
- Inspector/Laboratory mandate و calibration evidence

## اقدامات اصلاحی

1. Software Quality از Trade Quality نام‌گذاری و ownership جدا داشته باشد.
2. Mock inspection UI به API واقعی متصل یا صریحاً Demo علامت‌گذاری شود.
3. Quality Domain مستقل از Inventory ایجاد شود.
4. Quality Decision از طریق Command تایپ‌شده به Inventory disposition متصل شود.
5. specification version، inspector identity، evidence، rationale و revocation ثبت شوند.
6. proxy مربوط به `/quality/status` پیدا، مستند و integration-test شود.


---

<!-- SOURCE: 02-PACKING-LIST-AND-COMMERCIAL-INVOICE.md -->

# 02 — Packing List and Commercial Invoice

## نتیجه Ownership

دو مدل Packing List وجود دارد:

- Tajerestan با JPA و جدول `tb_packing_list`؛
- Provider/Partner با direct JDBC و جدول `partner.packing_lists`.

Commercial Invoice نیز در `partner.commercial_invoices` نگهداری می‌شود.

تا زمان تعیین System of Record، وضعیت Packing List برابر `CONFLICT_REQUIRES_CANONICALIZATION` است.

## Tajerestan Packing List

Entity واقعی شامل این فیلدهاست:

- شماره PL؛
- PI و Purchase Order reference؛
- supplier؛
- box count؛
- net/gross weight و volume؛
- packing method و marks؛
- status و company؛
- child boxes.

Service واقعی:

- شماره `PL-...` تولید می‌کند؛
- package count، gross weight و volume را جمع می‌کند؛
- boxها را ذخیره می‌کند؛
- get و list دارد؛
- Event با نام `trade.packing-list.created` منتشر می‌کند.

### Gapهای قطعی

- `DEFAULT_COMPANY_ID` هم برای supplier و هم company استفاده می‌شود.
- `totalNetWeight` صفر می‌ماند.
- `netWeightKg` هر box صفر ثبت می‌شود.
- immutable issued version، signature و supersession دیده نشد.
- status transition guard و optimistic locking دیده نشد.
- outbox تراکنشی اثبات نشد.

Classification: `IMPLEMENTED_WITH_GAP`.

## Partner Packing List

Partner Logistics Controller:

- list و get از `partner.packing_lists`؛
- PATCH محدودشده به Partner احراز‌شده؛
- audit log برای update؛
- merge metadata.

اما POST create با 503 و پیام `notAvailable` پاسخ می‌دهد. مدل update نیز طیف بزرگی از فیلدها را مستقیم تغییر می‌دهد و version immutable ندارد.

| Operation | Status |
|---|---|
| List/Get | `VERIFIED_IMPLEMENTED` |
| Partner-scoped Patch/Audit | `IMPLEMENTED_WITH_GAP` |
| Create | `PLANNED_NOT_IMPLEMENTED` |

## Commercial Invoice

Migration واقعی این اطلاعات را ذخیره می‌کند:

- unique invoice number؛
- Packing List، Shipment، Quotation و Order references؛
- Partner و Customer؛
- invoice date، currency، amount؛
- Incoterm و payment terms؛
- ports، origin و destination؛
- HS code و declared value؛
- status، issuer، lineItems و metadata.

Controller list، get و Partner-scoped patch را اجرا می‌کند. بااین‌حال:

- create با 503 پاسخ می‌دهد؛
- generate-from-packing-list با 503 پاسخ می‌دهد؛
- issue/sign/version/supersede workflow وجود ندارد.

## Canonicalization موردنیاز

1. یک Packing List System of Record انتخاب شود.
2. Document identity، version، issuance، signature، supersession و cancellation تعریف شوند.
3. JSON line items و relational boxes reconciliation شوند.
4. quantities/weights با Production، Quality Release، PO و Shipment تطبیق داده شوند.
5. HS-code suggestion از legal classification جدا باشد.
6. discrepancy/correction به‌صورت Aggregate ثبت شود، نه mutable patch.


---

<!-- SOURCE: 03-EXPORT-CUSTOMS-AND-LEGAL-RELEASE.md -->

# 03 — Export Customs and Legal Release

## Provider implementation

Migration واقعی `partner.export_declarations` را با این داده‌ها ایجاد می‌کند:

- declaration number و customs office؛
- shipment، commercial invoice و packing list؛
- Partner و declarant؛
- transport، vessel، voyage و container؛
- ports و destination country؛
- package/weight/value/currency؛
- status، customs response و metadata.

Partner Logistics Controller رفتارهای list، detail، create، update و submit را دارد و status history و audit ثبت می‌کند.

ثبت `SUBMITTED` فقط یک platform fact است: سیستم ثبت کرده کاربر submission action انجام داده است. این وضعیت اثبات نمی‌کند Customs Authority اظهارنامه را پذیرفته یا کالا را release کرده است.

Customs document add/remove هنوز با 503 پاسخ می‌دهند.

## Tajerestan Customs

Tajerestan مسیرهای زیر را دارد:

- `POST /api/v1/trade/customs/{poId}/clear`
- get status؛
- list و stats.

Service مستقیماً فیلدهای customs روی Purchase Order را تغییر می‌دهد و `trade.customs.cleared` منتشر می‌کند. External customs adapter، signed authority response یا declaration aggregate در فایل‌های بررسی‌شده دیده نشد.

این رابطه نادرست است:

```text
Application user sets PO.customsStatus = CLEARED
    ≠
Customs authority issued legal release
```

این بخش برای ثبت internal status، `IMPLEMENTED_WITH_GAP` است؛ برای legal release، `REFERENCE_ARCHITECTURE`.

## Gapهای اصلی

- statusها string آزاد هستند.
- Partner ownership در همه SQL statementها یکدست دیده نمی‌شود.
- callback signature، response correlation، Outcome Unknown و revocation وجود ندارد.
- document attachment executable نیست.
- history در JSON mutable ذخیره می‌شود.
- Partner declaration و Tajerestan PO customs دو مدل رقیب‌اند.

## تصمیم canonical

Export Customs باید این Truthها را جدا کند:

1. `ExportDeclarationPrepared`
2. `ExportDeclarationSubmitted`
3. `AuthorityResponseObserved`
4. `ExportLegalReleaseObserved`
5. `AuthorityDecisionCorrectedOrRevoked`
6. derived shipment-readiness perspective

Legal release فقط با authority evidence معتبر است.


---

<!-- SOURCE: 04-IMPORT-CUSTOMS-DUTIES-AND-RELEASE.md -->

# 04 — Import Customs, Duties, and Release

## Evidence maturity

Import Customs یکی از بالغ‌ترین بخش‌های بررسی‌شده در Wave 02 است.

Migration V16 این جدول‌ها را ایجاد می‌کند:

- `partner.import_declarations`
- `partner.wms_inbound_orders`
- `partner.wms_inbound_items`
- `partner.warehouse_receipts`

Controller یک lifecycle Partner-scoped دارد:

- list و detail؛
- create از Shipment متعلق به Partner؛
- generic update فقط در `DRAFT` و `CUSTOMS_HOLD`؛
- submit اختصاصی؛
- mark-duty-paid اختصاصی؛
- mark-cleared اختصاصی؛
- status history و audit؛
- sync وضعیت Shipment به `CUSTOMS_CLEARED`.

Classification: `IMPLEMENTED_WITH_GAP`.

## کنترل‌های مثبت

- Partner ID از JWT principal گرفته می‌شود.
- بسیاری از read/writeها با Partner ID محدود می‌شوند.
- create بررسی می‌کند Shipment متعلق به Partner باشد.
- terminal status از generic PATCH ممنوع است.
- submit فقط از `DRAFT` مجاز است.
- clear به Shipment لینک‌شده نیاز دارد.
- audit snapshot و history ثبت می‌شود.

## Gapهای مهم

1. Migration عمداً `partner.import_declarations` را DROP و recreate می‌کند؛ این رفتار destructive است.
2. `mark-duty-paid` از وضعیت `CLEARED` نیز مجاز است که lifecycle را غیرمنطقی می‌کند.
3. duty/tax صفر یا null فقط warning ایجاد می‌کند و عملیات را block نمی‌کند.
4. `mark-cleared` یک application action است و authority response خارجی اثبات نشده.
5. Shipment status با direct cross-table mutation تغییر می‌کند.
6. JDBC updateها optimistic version predicate ندارند.
7. status history در JSON mutable است.
8. Provider WMS tables با Warehouse/Inventory ownership هم‌پوشانی دارند.

## مدل canonical

Truthهای زیر باید مستقل باشند:

- `ImportDeclarationSubmitted` — platform fact؛
- `DutyAssessmentObserved` — authority observation؛
- `DutyPaymentIntent` و `DutyPaymentOutcome` — Finance/Payment؛
- `ImportReleaseObserved` — authority observation؛
- `ShipmentCustomsPerspectiveChanged` — projection.

هیچ کاربر برنامه نباید بدون authority evidence بتواند legal clearance بسازد.


---

<!-- SOURCE: 05-TRANSPORT-BOOKING-HANDOVER-SHIPMENT-AND-TRACKING.md -->

# 05 — Transport Booking, Handover, Shipment, and Tracking

## Contextهای اجرایی

دو Context اصلی وجود دارد:

1. `provider-service` برای Partner logistics و Booking؛
2. `shipping-service` برای `shipping.trade_shipments` و API حمل B2B.

مرزهای Booking، Shipment، Carrier Observation، Handover و Custody هنوز canonical نشده‌اند.

## Booking

Migration `partner.bookings` اطلاعات carrier، mode، vessel/flight، container، ports، dates، transit estimate، agent، confirmation، status، Partner و metadata را ذخیره می‌کند.

Export Handover Portal از API واقعی `/api/v1/logistics/bookings` استفاده می‌کند و این stateها را نمایش می‌دهد:

- `REQUESTED`
- `CONFIRMED`
- `LOADED`
- `HANDED_OVER`
- `CANCELLED`

Portal همچنین pickup address، loading time، contact، seal number و referenceهای Packing List و Commercial Invoice را می‌گیرد.

این journey اجرایی مفید است، اما `HANDED_OVER` به‌تنهایی Custody Transfer معتبر نیست.

## Trade Shipment

`TradeShipmentEntity` شامل این داده‌هاست:

- Purchase Order و Trade Order reference؛
- carrier و tracking number؛
- transport mode و booking reference؛
- master/house bill؛
- container count و forwarder؛
- origin/destination؛
- status، ETA و actual delivery؛
- weight، volume و package count؛
- metadata و tenant.

Service رفتار create، list/filter، get، update، tracking append، stats و Kafka send را دارد. Controller نیز `/api/shipping/trade/shipments` را ارائه می‌دهد.

Classification: `IMPLEMENTED_WITH_GAP`.

## یافته‌های بحرانی کد

- هنگام ساخت Shipment Item، `tenantId` برابر Shipment UUID قرار داده می‌شود، نه tenant واقعی.
- list/get/update/track در Service بررسی‌شده tenant-scoped نیستند.
- items با `findAll()` گرفته و in-memory فیلتر می‌شوند.
- status string بدون transition guard است.
- tracking history در metadata JSON mutable ذخیره می‌شود.
- متد publish پارامتر `eventType` می‌گیرد، اما آن را داخل payload قرار نمی‌دهد.
- خطای Kafka catch و log می‌شود و DB transaction می‌تواند بدون Event موفق بماند.
- outbox تراکنشی پیدا نشد.
- delayed count برابر صفر hard-code شده است.
- observationهای carrier فاقد source event ID، observed/received time، confidence و correction lineage هستند.

## Custody

وضعیت `HANDED_OVER` در Booking و Portal دیده می‌شود، اما Aggregate مستقل Custody پیدا نشد.

Custody معتبر باید شامل این موارد باشد:

- Cargo/Package Set مشخص؛
- handing party و mandate؛
- receiving party و mandate؛
- time و location؛
- seal، package count و weight observation؛
- attestation دو طرف یا exception؛
- refusal/discrepancy؛
- correction؛
- onward transfer یا custody termination.

نتیجه: Booking و Shipment `IMPLEMENTED_WITH_GAP`؛ Custody `REFERENCE_ARCHITECTURE`.


---

<!-- SOURCE: 06-WAREHOUSE-RECEIVING-AND-RECEIPT.md -->

# 06 — Warehouse Receiving and Receipt

## Warehouse Service

`AsnEntity` این اطلاعات را ذخیره می‌کند:

- ASN number و reference؛
- Purchase Order، warehouse، tenant و supplier؛
- carrier و tracking؛
- pallet count، line count و expected quantity؛
- estimated/actual arrival؛
- dock appointment؛
- line items در JSON؛
- status و timestamps.

`AsnService` رفتارهای زیر را دارد:

- create ASN؛
- update status؛
- link به Dock Appointment؛
- get/list/pending؛
- conflict detection برای dock؛
- create/check-in/complete/cancel appointment؛
- receiving summary.

`AsnController` مسیرهای `/api/v1/warehouse/receiving` را ارائه می‌دهد.

Classification: `IMPLEMENTED_WITH_GAP`.

## Provider WMS

Migration V16 در Provider schema نیز این‌ها را ایجاد می‌کند:

- `wms_inbound_orders`
- `wms_inbound_items`
- `warehouse_receipts`

این مدل با Warehouse Service هم‌پوشانی دارد و وضعیت آن `CONFLICT_REQUIRES_CANONICALIZATION` است.

## Gapهای قطعی

- ASN status مستقیماً از string درخواست پذیرفته می‌شود.
- get/update/link بر اساس ID، tenant scope آشکار ندارند.
- optimistic lock روی ASN یا Dock Appointment دیده نشد.
- Event/outbox برای اتصال Receiving به Inventory پیدا نشد.
- line items در TEXT/JSON ذخیره می‌شوند.
- summary تعداد کل dock door را همیشه ۱۰ فرض می‌کند.
- receipt line scan، package identity، damage evidence، quarantine، discrepancy و signed proof در Service بررسی‌شده وجود ندارند.
- Provider warehouse receipt می‌تواند به System of Record دوم تبدیل شود.
- Delivery/POD و Warehouse Receipt از هم به‌وضوح تفکیک نشده‌اند.

## مرز canonical

Warehouse باید Physical Receiving Execution و Receipt Observation را مالک باشد. Inventory باید Stock Position را مالک بماند. Provider tableها باید integration projection باشند، مگر اینکه تصمیم معماری خلاف آن را رسماً ثبت کند.

جریان هدف:

```text
ASN + Dock Appointment
→ Arrival Observation
→ Package/Line Receiving
→ Damage/Discrepancy/Quarantine
→ Authorized Warehouse Receipt
→ Inventory Posting Command
→ Stock Position and Ledger
```


---

<!-- SOURCE: 07-INVENTORY-SYNCHRONIZATION-RESERVATION-AND-QC.md -->

# 07 — Inventory Synchronization, Reservation, and QC Disposition

## Stock Model

`StockBalanceEntity` یک composite identity دارد:

- tenant
- company
- warehouse
- SKU
- bin
- batch

مقادیر زیر جدا نگهداری می‌شوند:

- on hand
- available
- reserved
- damaged
- QC hold
- blocked
- in transit

وجود `@Version` optimistic locking را در سطح Entity فراهم می‌کند.

## Inventory Posting

`InventoryPostingService` رفتارهای transactional زیر را دارد:

- Receipt؛
- Transfer؛
- Adjustment؛
- انتقال Available به QC Hold؛
- QC PASS به Available؛
- QC FAIL به Damaged یا Blocked؛
- ثبت Stock Ledger.

## Reservation

`ReservationService`:

- quantity مثبت را validate می‌کند؛
- balanceهای tenant/company/warehouse/SKU را می‌خواند؛
- اولین balance دارای available کافی را انتخاب می‌کند؛
- Available را کم و Reserved را زیاد می‌کند؛
- Reservation با state `ACTIVE` می‌سازد؛
- در Release مقدار آزادشدنی را به Available برمی‌گرداند.

Classification: `IMPLEMENTED_WITH_GAP`.

## نقاط قوت

- stock states صریح و تفکیک‌شده؛
- tenant/company در composite key؛
- optimistic locking؛
- ledger دارای source و idempotency field؛
- insufficient-stock check برای reservation و QC hold؛
- Reservation Entity مستقل.

## Gapهای بحرانی

1. Controller، tenant، company و user را از query parameter می‌گیرد؛ این اطلاعات authority قابل اعتماد نیستند.
2. `GET /stock/ledger` در Controller بررسی‌شده بدون tenant filter است.
3. Posting APIهای عمومی در همان Controller دیده نشدند و caller/orchestration هنوز verify نشده است.
4. idempotency key در ledger ذخیره می‌شود، اما قبل از balance mutation duplicate lookup انجام نمی‌شود.
5. Transfer و Adjustment می‌توانند quantity منفی بسازند.
6. Reservation اولین balance مناسب را بدون policy مشخص انتخاب می‌کند.
7. retry strategy برای optimistic-lock conflict پیدا نشد.
8. Receipt، good quantity را فوراً Available می‌کند و quarantine/quality gate اجباری ندارد.
9. Event/outbox برای Inventory facts پیدا نشد.
10. Provider WMS و Warehouse Receiving با Inventory ownership مرز روشن ندارند.

## اصلاح لازم

Warehouse Receipt باید ورودی governed برای Inventory باشد. Availability باید با Policyهایی مانند Quality، Quarantine، Lot، Expiry، Compliance و Channel Eligibility محاسبه شود؛ نه صرفاً با receipt فیزیکی.


---

<!-- SOURCE: 08-CROSS-DOMAIN-CONTRADICTIONS.md -->

# 08 — Cross-Domain Contradictions and Canonicalization Register

| ID | Conflict | Required canonical decision |
|---|---|---|
| C-201 | Quality به software gates، mock inspection و stock QC اشاره می‌کند | Trade Quality Domain مستقل ایجاد شود |
| C-202 | Packing List در Tajerestan و Partner وجود دارد | یک System of Record و migration direction تعیین شود |
| C-203 | Commercial Invoice table/read/update دارد، ولی create/generate ندارد | Document lifecycle کامل شود |
| C-204 | Customs با تغییر PO یا declaration action می‌تواند Cleared شود | legal release فقط authority observation باشد |
| C-205 | Import Controller مستقیماً Shipment table را تغییر می‌دهد | Event/contract یا ownership مشترک رسمی تعریف شود |
| C-206 | Booking و Trade Shipment بدون boundary واضح جدا شده‌اند | Booking، Shipment، Leg و Observation ownership تعیین شود |
| C-207 | `HANDED_OVER` به‌جای Custody evidence استفاده می‌شود | CustodyRelationship مستقل ایجاد شود |
| C-208 | Receiving هم در Warehouse Service و هم Provider WMS وجود دارد | Warehouse owner و Provider projection مشخص شود |
| C-209 | Inventory Receipt بلافاصله Available می‌شود | quarantine/quality/channel policy اعمال شود |
| C-210 | tenant field وجود دارد ولی APIها گاهی request parameter یا unscoped lookup دارند | trusted identity context و isolation test |
| C-211 | Eventها بدون outbox فرستاده و خطا swallow می‌شود | outbox/inbox استاندارد شود |
| C-212 | status history در metadata JSON mutable است | append-only transition journal ایجاد شود |


---

<!-- SOURCE: 09-IMPLEMENTATION-STATUS-MATRIX.md -->

# 09 — Implementation Status Matrix

| Area | Narrow verified behavior | Classification | Main blocker |
|---|---|---|---|
| Trade Quality Inspection | Mock inspection UI only | `REFERENCE_ARCHITECTURE` | Aggregate/API/Evidence missing |
| Software Quality Gates | Metrics, gates, reports | `VERIFIED_IMPLEMENTED` | Different Domain |
| Inventory QC Hold | Hold and disposition | `PARTIAL_IMPLEMENTATION` | Inspection Decision absent |
| Tajerestan Packing List | Entity, create/get/list/Event | `IMPLEMENTED_WITH_GAP` | identity, weights, versioning |
| Partner Packing List | list/get/patch/audit | `IMPLEMENTED_WITH_GAP` | create unavailable, duplicate owner |
| Commercial Invoice | table/list/get/patch | `PARTIAL_IMPLEMENTATION` | create/generate/issue missing |
| Export Declaration | table/create/list/update/submit | `IMPLEMENTED_WITH_GAP` | authority evidence/doc operations |
| PO Customs | mutable PO status and Event | `IMPLEMENTED_WITH_GAP` | not legal release |
| Import Declaration | full operational lifecycle | `IMPLEMENTED_WITH_GAP` | manual authority/state/migration gaps |
| Booking | table and real Portal/API | `IMPLEMENTED_WITH_GAP` | custody boundary |
| Trade Shipment | entity/API/tracking/Kafka | `IMPLEMENTED_WITH_GAP` | tenant and Event reliability |
| Custody Transfer | HANDED_OVER status only | `CLIENT_CONTRACT_PRESENT` | no bilateral evidence |
| Warehouse ASN/Dock | create/status/schedule/check-in | `IMPLEMENTED_WITH_GAP` | scoping, receipt evidence, Event |
| Provider WMS | tables and references | `VERIFIED_IMPLEMENTED` schema | competing owner/runtime verification |
| Inventory | balance/posting/QC/reservation | `IMPLEMENTED_WITH_GAP` | auth, idempotency, invariants |


---

<!-- SOURCE: 10-WAVE-02-ISSUE-REGISTER.md -->

# 10 — Wave 02 Issue Register

| ID | Severity | Area | Finding | Required action |
|---|---|---|---|---|
| W2-001 | Critical | Quality | Inspection page uses static mock records | Replace with real API or label as demo. |
| W2-002 | Critical | Quality | No canonical trade Inspection/Measurement/Release aggregate | Create Quality Domain and authority model. |
| W2-003 | High | Quality | Warehouse client claims /quality/status side effects; backend target not located | Resolve route and add integration tests. |
| W2-004 | Critical | Packing | Tajerestan and Partner packing lists compete | Declare System of Record and migration. |
| W2-005 | High | Packing | PackingListService calculates no net weight | Extend request model and validate totals. |
| W2-006 | Critical | Packing | Default UUID used as supplier and company | Use trusted tenant/organization context. |
| W2-007 | High | Documents | Commercial Invoice create/generate endpoints return 503 | Implement governed creation. |
| W2-008 | High | Documents | Issued document version/signature model absent | Add immutable versions and signing. |
| W2-009 | Critical | Customs | PO customs clear can be mistaken for legal release | Require authority evidence and rename internal action. |
| W2-010 | High | Export Customs | Customs document endpoints return 503 | Implement evidence attachment. |
| W2-011 | High | Export Customs | Partner predicate not visible in all SQL operations | Enforce ownership on every query/update. |
| W2-012 | Critical | Import Customs | Migration drops import_declarations | Add environment/data gate and non-destructive migration. |
| W2-013 | High | Import Customs | CLEARED may transition to DUTY_PAID | Correct state machine. |
| W2-014 | High | Import Customs | Zero duty/tax values only produce warnings | Require policy/exception approval. |
| W2-015 | Critical | Import Customs | Manual mark-cleared lacks authority adapter evidence | Store signed authority observation. |
| W2-016 | High | Shipping | Shipment item tenantId is assigned shipment UUID | Correct code and migrate data. |
| W2-017 | Critical | Shipping | Shipment reads/writes are not visibly tenant-scoped | Apply trusted tenant context and isolation tests. |
| W2-018 | High | Shipping | Kafka failure is swallowed after DB mutation | Use transactional outbox. |
| W2-019 | High | Shipping | eventType is not included in payload | Use governed Event envelope. |
| W2-020 | High | Shipping | Status is unrestricted string | Add typed transitions. |
| W2-021 | High | Shipping | Tracking history is mutable JSON | Create qualified observation journal. |
| W2-022 | Critical | Custody | HANDED_OVER status is not custody proof | Implement bilateral custody evidence. |
| W2-023 | Critical | Warehouse | ASN ID operations lack visible tenant scoping | Scope repository methods. |
| W2-024 | High | Warehouse | ASN status accepts arbitrary string | Use typed Commands and guards. |
| W2-025 | Medium | Warehouse | Receiving summary assumes ten dock doors | Model facility capacity. |
| W2-026 | Critical | Warehouse | Provider WMS and Warehouse Service overlap | Canonicalize ownership. |
| W2-027 | Critical | Inventory | Tenant/company/user are accepted via query parameters | Derive from auth context. |
| W2-028 | Critical | Inventory | Ledger endpoint appears globally unscoped | Add tenant/warehouse filtering and authorization. |
| W2-029 | High | Inventory | Idempotency key is stored but not checked first | Add duplicate guard before mutation. |
| W2-030 | High | Inventory | Transfer/adjustment can create negative stock | Add invariants and DB constraints. |
| W2-031 | High | Inventory | Receipt immediately increases available stock | Apply quarantine/quality policy. |
| W2-032 | Medium | Inventory | Reservation uses first matching balance | Define deterministic allocation policy. |
| W2-033 | High | Cross-domain | No transactional outbox found for reviewed flows | Standardize outbox/inbox. |
| W2-034 | Medium | Testing | Test-file existence is not execution evidence | Run CI and attach logs/results. |


---

<!-- SOURCE: 11-WAVE-02-TRACEABILITY-MATRIX.md -->

# 11 — Wave 02 Traceability Matrix

| Evidence ID | Repository path | Blob SHA | Classification |
|---|---|---|---|
| `QUALITY-UI-MOCK` | `apps/quality-dashboard/app/inspections/page.tsx` | `ca8b5c61b956a6d96ea8010180d6fc4c3f3ee093` | `FRONTEND_MOCK` |
| `QUALITY-SOFTWARE-GATES` | `backend/domain/engagement/dashboard-service/src/main/java/com/allinb2c/engagement/dashboard/quality/controller/QualityController.java` | `6410c6402611f0d78e82cff2e2480b644de751a2` | `VERIFIED_IMPLEMENTED` |
| `QUALITY-QC-WORKBENCH` | `apps/warehouse-operator/components/qc-hold/qc-hold-workbench.tsx` | `fc4a0f3087df0a08f97b4ceece24d739d9955ff5` | `CLIENT_CONTRACT_UNVERIFIED` |
| `PACKING-ENTITY` | `backend/domain/commerce/tajerestan-services/src/main/java/com/allinb2c/commerce/tajerestan/entity/PackingListEntity.java` | `5317c771765edadf8483d0a8827d2ddd56cb14f2` | `VERIFIED_IMPLEMENTED` |
| `PACKING-SERVICE` | `backend/domain/commerce/tajerestan-services/src/main/java/com/allinb2c/commerce/tajerestan/service/PackingListService.java` | `7502b07ed6b29882c904ac69862e667c7443f6a7` | `IMPLEMENTED_WITH_GAP` |
| `COMMERCIAL-INVOICE-DDL` | `backend/domain/commerce/provider-service/src/main/resources/db/migration/V7__phase_3c_commercial_invoices.sql` | `9c8133be1f5805cb64af021770819e173bd9af25` | `VERIFIED_IMPLEMENTED` |
| `PARTNER-LOGISTICS` | `backend/domain/commerce/provider-service/src/main/java/com/allinb2c/commerce/provider/api/PartnerLogisticsController.java` | `8e49184334fb4b87228876c38eb40e59d15a08fb` | `IMPLEMENTED_WITH_GAP` |
| `EXPORT-DDL` | `backend/domain/commerce/provider-service/src/main/resources/db/migration/V10__phase_4b_export_declarations.sql` | `5f110ad3c3ad3d5cfb609c4aecae3f26d2ad8743` | `VERIFIED_IMPLEMENTED` |
| `TAJERESTAN-CUSTOMS` | `backend/domain/commerce/tajerestan-services/src/main/java/com/allinb2c/commerce/tajerestan/service/CustomsService.java` | `7fcb117de233e9900881479d42a96d35c7b74d22` | `IMPLEMENTED_WITH_GAP` |
| `IMPORT-CONTROLLER` | `backend/domain/commerce/provider-service/src/main/java/com/allinb2c/commerce/provider/api/PartnerImportController.java` | `40a0fb1f289fea319a7822945932bcb242e40852` | `IMPLEMENTED_WITH_GAP` |
| `IMPORT-WMS-DDL` | `backend/domain/commerce/provider-service/src/main/resources/db/migration/V16__phase_6a_import_wms.sql` | `c32d37a25ad374acf6dc9bc356e1d1349b551780` | `IMPLEMENTED_WITH_GAP` |
| `TRADE-SHIPMENT-ENTITY` | `backend/domain/fulfillment/shipping-service/src/main/java/com/allinb2c/fulfillment/shipping/domain/TradeShipmentEntity.java` | `dbd89d171bcf44274d46dd75bd8117e806eaecde` | `VERIFIED_IMPLEMENTED` |
| `TRADE-SHIPMENT-SERVICE` | `backend/domain/fulfillment/shipping-service/src/main/java/com/allinb2c/fulfillment/shipping/service/TradeShipmentService.java` | `3e663f6f02c8ab0adaa6b1258c6b142085c45c9d` | `IMPLEMENTED_WITH_GAP` |
| `TRADE-SHIPMENT-CONTROLLER` | `backend/domain/fulfillment/shipping-service/src/main/java/com/allinb2c/fulfillment/shipping/controller/TradeShipmentController.java` | `f4e2677a455a200240629367ac851fb9752af7ca` | `VERIFIED_IMPLEMENTED` |
| `BOOKING-DDL` | `backend/domain/commerce/provider-service/src/main/resources/db/migration/V9__phase_4b_bookings.sql` | `cbce5a59c3be64d2f1d731cfdadc193714833ad8` | `VERIFIED_IMPLEMENTED` |
| `EXPORT-HANDOVER-PORTAL` | `apps/partner-portal/app/partner/export-handover/page.tsx` | `b4d1831a45b9cd93e0f2cd92ed755bb34a7b0ef5` | `CLIENT_CONTRACT_PRESENT` |
| `ASN-ENTITY` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/domain/AsnEntity.java` | `2cf9087a494877821f2488caeb2ad9a86a7b31c9` | `VERIFIED_IMPLEMENTED` |
| `ASN-SERVICE` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/service/AsnService.java` | `6fcd4eb6f1e92262f73106f08e3c4f968cd1d75e` | `IMPLEMENTED_WITH_GAP` |
| `ASN-CONTROLLER` | `backend/domain/fulfillment/warehouse-service/src/main/java/com/allinb2c/fulfillment/warehouse/controller/AsnController.java` | `94aabea2d7743182a8de8d45427657a164192ee4` | `VERIFIED_IMPLEMENTED` |
| `STOCK-BALANCE` | `backend/domain/fulfillment/inventory-service/src/main/java/com/allinb2c/fulfillment/inventory/model/entity/StockBalanceEntity.java` | `4b8cfad0e6cfec626c5c6f0c7835d34cc7fea68c` | `VERIFIED_IMPLEMENTED` |
| `INVENTORY-POSTING` | `backend/domain/fulfillment/inventory-service/src/main/java/com/allinb2c/fulfillment/inventory/service/InventoryPostingService.java` | `a7efd075874daee8e6a849cb61f82ac65b738962` | `IMPLEMENTED_WITH_GAP` |
| `INVENTORY-CONTROLLER` | `backend/domain/fulfillment/inventory-service/src/main/java/com/allinb2c/fulfillment/inventory/controller/InventoryController.java` | `02b1c4dce7367fe41e733fe5315aa726ebfd35ef` | `IMPLEMENTED_WITH_GAP` |
| `RESERVATION-SERVICE` | `backend/domain/fulfillment/inventory-service/src/main/java/com/allinb2c/fulfillment/inventory/service/ReservationService.java` | `fec768ef4cfd702328660bccab6ffcae73268566` | `IMPLEMENTED_WITH_GAP` |


---

<!-- SOURCE: 12-REMEDIATION-AND-VERIFICATION-PLAN.md -->

# 12 — Remediation and Verification Plan

## Priority 0 — جلوگیری از False Authority

1. PO یا declaration application status نباید legal customs release نامیده شود.
2. tenant/company/user از request به‌عنوان authority پذیرفته نشود.
3. Shipping، Warehouse، Inventory و Partner SQL کاملاً tenant-scoped شوند.
4. مالکیت Packing List، Warehouse Receipt، Shipment و Customs canonical شود.
5. tenant assignment اشتباه Shipment Item اصلاح و داده موجود migrate شود.

## Priority 1 — Truth Preservation و Execution Safety

1. document version/signature immutable اضافه شود.
2. outbox/inbox برای Trade Documents، Customs، Shipping، Warehouse و Inventory ایجاد شود.
3. JSON history با append-only journal جایگزین شود.
4. idempotency قبل از stock mutation بررسی شود.
5. state transition guard و optimistic version predicate اضافه شود.
6. external outcome دارای source reference، observed time، received time و correction باشد.

## Priority 2 — تکمیل Capability

1. Trade Quality Aggregate ساخته شود.
2. Commercial Invoice create و PL-to-CI reconciliation پیاده‌سازی شود.
3. customs document و authority-response ingestion ساخته شود.
4. CustodyRelationship با attestations پیاده شود.
5. Warehouse Receipt با typed contract به Inventory متصل شود.
6. quarantine و channel eligibility قبل از availability اعمال شود.

## Evidence لازم برای ارتقای Status

- migration روی empty و upgrade database؛
- tenant-isolation tests؛
- concurrent posting/reservation tests؛
- duplicate/replay tests؛
- outbox failure/recovery؛
- customs/provider signature verification؛
- cross-document reconciliation؛
- Portal E2E بدون mock fallback؛
- audit reconstruction و backup/restore.


---

<!-- SOURCE: 13-NEXT-WAVE-PLAN.md -->

# 13 — Repository Evidence Wave 03 Plan

Wave 03 باید مسیر Customer-facing Commerce را بررسی کند:

1. Product Catalog و Product Identity
2. Pricing و Price Version
3. Marketplace Offer و Publication Eligibility
4. Cart و Checkout
5. Customer Order Acceptance/Cancellation
6. Allocation و Fulfilment
7. Pick، Pack و Dispatch
8. Last-Mile Delivery و Proof
9. Returns، Claims، Refunds و Disputes
10. Settlement، Reporting، ESG و AI Evaluation

قانون ثابت است: route، plan، README یا UI contract به‌تنهایی Implementation را اثبات نمی‌کند.


---

<!-- SOURCE: IMPLEMENTATION-STATUS-VOCABULARY.md -->

# Implementation and Evidence Status Vocabulary

| Status | Meaning |
|---|---|
| `VERIFIED_IMPLEMENTED` | فایل اجرایی یا migration بررسی شده و ادعای محدود را اثبات می‌کند |
| `IMPLEMENTED_WITH_GAP` | رفتار اجرایی وجود دارد ولی Gap مهم دارد |
| `PARTIAL_IMPLEMENTATION` | فقط بخشی از Capability اجرا شده |
| `CLIENT_CONTRACT_PRESENT` | Client contract وجود دارد؛ backend ممکن است کامل نباشد |
| `CLIENT_CONTRACT_UNVERIFIED` | Client side effect یا endpoint ادعا می‌کند ولی backend پیدا نشده |
| `FRONTEND_MOCK` | UI از داده ثابت/ساختگی محلی استفاده می‌کند |
| `DOCUMENTATION_ONLY_CLAIM` | فقط سند یا plan وجود دارد |
| `CONFLICT_REQUIRES_CANONICALIZATION` | Implementation یا ownershipهای رقیب وجود دارند |
| `REFERENCE_ARCHITECTURE` | طراحی هدف؛ بدون ادعای Implementation |
| `REQUIRES_REPOSITORY_REVIEW` | شواهد بیشتری لازم است |
| `TEST_FILE_DISCOVERED` | فایل Test پیدا شده ولی اجرا/نتیجه اثبات نشده |


---

<!-- SOURCE: README.md -->

# GTOS Handbook — Batch 08

## Repository Evidence Wave 02

این بسته حوزه‌های زیر را از متن عمومی معماری به گزارش‌های code-grounded تبدیل می‌کند:

- Quality Inspection و QC disposition
- Packing List و Commercial Invoice
- Export Customs
- Import Customs و Duties
- Booking، Handover، Shipment و Tracking
- Warehouse Receiving
- Inventory Synchronization و Reservation

| Field | Value |
|---|---|
| Repository | `chinair88-prog/allinb2c` |
| Snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| Handbook Branch | `gtos/handbook-repository-grounded-expansion-v2` |
| Publication maturity | Review artifact؛ نه نسخه نهایی کتاب |

نتیجه این Wave به‌معنی تکمیل نرم‌افزار نیست. هر ادعا فقط به کوچک‌ترین رفتار قابل اثبات محدود شده و outcomeهای گمرک، حمل، بازرسی و تحویل به‌عنوان حقیقت خارجی جعل نشده‌اند.


---

<!-- SOURCE: RELEASE-REPORT.md -->

# Batch 08 Release Report

| Field | Value |
|---|---|
| Release | Repository Evidence Wave 02 |
| Repository snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| Publication maturity | Code-grounded review artifact |
| Final handbook status | Not complete |

## Principal conclusions

- Trade Quality Inspection در حد mock UI و stock disposition است.
- دو Packing List implementation رقیب وجود دارد.
- Commercial Invoice persistence/read/update دارد، ولی create/generate کامل نیست.
- Export/Import workflow اجرایی دارد، ولی application status معادل legal authority نیست.
- Shipping اجرا شده اما tenant isolation و Event delivery Gap بحرانی دارد.
- Warehouse ASN/Dock و Provider WMS هم‌پوشانی دارند.
- Inventory مدل قوی دارد، اما request-derived identity، idempotency و invariant Gap دارد.
