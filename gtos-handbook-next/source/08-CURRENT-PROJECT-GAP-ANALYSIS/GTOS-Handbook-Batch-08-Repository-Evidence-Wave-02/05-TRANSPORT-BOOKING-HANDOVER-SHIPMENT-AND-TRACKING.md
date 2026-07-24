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
