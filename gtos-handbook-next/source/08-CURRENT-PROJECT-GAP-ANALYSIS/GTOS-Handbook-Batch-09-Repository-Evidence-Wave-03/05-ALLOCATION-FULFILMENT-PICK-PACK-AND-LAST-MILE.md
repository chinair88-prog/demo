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
