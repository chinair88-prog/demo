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
