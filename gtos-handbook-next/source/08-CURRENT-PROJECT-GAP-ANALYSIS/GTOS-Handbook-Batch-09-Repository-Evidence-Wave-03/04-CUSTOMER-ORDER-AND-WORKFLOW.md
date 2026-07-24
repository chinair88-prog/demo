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
