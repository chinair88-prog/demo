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
