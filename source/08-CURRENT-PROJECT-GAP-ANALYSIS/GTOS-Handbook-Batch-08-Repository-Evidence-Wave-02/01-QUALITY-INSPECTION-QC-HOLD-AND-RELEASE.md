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
