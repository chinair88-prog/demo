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
