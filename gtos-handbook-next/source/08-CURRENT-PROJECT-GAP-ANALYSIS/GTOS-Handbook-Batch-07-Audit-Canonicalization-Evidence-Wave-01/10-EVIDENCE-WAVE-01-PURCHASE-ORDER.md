# Repository Evidence Wave 01 - Purchase Order

## Evidence baseline

Two independent implementations were inspected.

Procurement:

- `backend/domain/commerce/procurement-service/.../PurchaseOrderEntity.java`
- `backend/domain/commerce/procurement-service/.../PurchaseOrderService.java`
- `backend/domain/commerce/procurement-service/.../PurchaseOrderController.java`

Tajerestan:

- `backend/domain/commerce/tajerestan-services/.../PurchaseOrderEntity.java`
- `backend/domain/commerce/tajerestan-services/.../PurchaseOrderService.java`

## Procurement implementation

The Procurement Entity maps to `procurement.purchase_orders` and records tenant, company, PO number, supplier, RFQ, status, order and delivery dates, currency, financial totals, notes, creator, approver, and timestamps.

The service implements list by tenant/company, get, create, full update, delete, and item CRUD. The controller exposes these operations under `/api/procurement/purchase-orders`.

## Tajerestan implementation

The Tajerestan Entity maps to an unqualified `purchase_orders` table. It includes RFQ and quotation references, buyer and supplier identities/names, Incoterm, shipping, tax and totals, balance due, payment terms, tracking, carrier, planned/actual dates, approval, cancellation, completion, customs fields, documents, tenant, and line items.

The service implements creation and financial calculation, list/search, update, approve, receive goods, statistics, and Events `trade.po.created`, `.updated`, `.approved`, and `.goods-received`.

## Critical ownership conflict

The repository contains at least two materially different Purchase Order aggregates with different packages, schemas, identity types, fields, APIs, lifecycle scope, and responsibilities. Neither can be silently declared the canonical PO without an ownership decision.

## Verified gaps

- Procurement get-by-ID is not tenant-scoped in the inspected service.
- Procurement accepts tenant/company from request data and its controller exposes tenant as query input; trusted-context enforcement was not found in the inspected files.
- Procurement full update can replace status and commercial values without state guards or immutable versions.
- Procurement delete physically removes items and the PO, conflicting with historical-integrity requirements.
- Tajerestan update and approve methods use direct string state mutation without visible transition guards.
- Tajerestan `receiveGoods` mixes warehouse receiving and PO state.
- Supplier acknowledgement is not represented as a distinct aggregate or Decision in inspected files.

## Status decision

| Capability | Status |
|---|---|
| Procurement PO CRUD and item operations | `VERIFIED_IMPLEMENTED` |
| Tajerestan PO creation, approval, receipt and Events | `VERIFIED_IMPLEMENTED` |
| canonical PO ownership | `CONFLICT_REQUIRES_CANONICALIZATION` |
| tenant isolation | `IMPLEMENTED_WITH_GAP` / `REQUIRES_REPOSITORY_REVIEW` |
| immutable PO versions and governed amendments | `PLANNED_NOT_IMPLEMENTED` in inspected code |
| supplier acknowledgement | `REQUIRES_REPOSITORY_REVIEW` |
| historical integrity | `IMPLEMENTED_WITH_GAP` because destructive delete exists |
