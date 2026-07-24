# Repository Evidence Wave 01 - Manufacturing

## Evidence baseline

Inspected files:

- `backend/domain/commerce/manufacturing-service/src/main/java/com/allinb2c/commerce/manufacturing/model/entity/ProductionOrderEntity.java`
- `backend/domain/commerce/manufacturing-service/src/main/java/com/allinb2c/commerce/manufacturing/service/ProductionOrderService.java`
- `backend/domain/commerce/manufacturing-service/src/main/java/com/allinb2c/commerce/manufacturing/controller/ProductionOrderController.java`

Search also found a second `ProductionOrderEntity` in `warehouse-service`, requiring ownership review.

## Verified implementation

The manufacturing Entity maps to `manufacturing.tb_production_order`. It records production-order number, purchase order, supplier, product, quantity, unit, planned and actual dates, status, priority, notes, company, and timestamps.

The service implements:

- production-order list/get/create/update/delete;
- production materials with required, purchased, and received quantities;
- production progress with stage, percentage, completed and defective quantity, images, videos, reporter, and time;
- production schedules with line, date, shift, planned output, actual output, and status.

The controller exposes production-order, material, progress, and schedule routes under `/api/manufacturing/production-orders`.

## Verified gaps

- No tenant field exists on the inspected production-order Entity; company ID is supplied in requests.
- Controller and service methods shown do not establish authorization or company-scope validation.
- Full update permits arbitrary status and field replacement without transition guards.
- Delete removes materials, progress, schedules, and the order, conflicting with history-preservation principles.
- No optimistic lock/version field was found.
- No Events or transactional outbox were found in the inspected service.
- Capacity commitment, factory qualification, BOM/routing, work orders, lot genealogy, quality hold points, and immutable baseline/rebaseline are not modeled in the inspected files.
- A second Production Order implementation under Warehouse indicates an ownership conflict.

## Status decision

| Capability | Status |
|---|---|
| production-order persistence and CRUD | `VERIFIED_IMPLEMENTED` |
| material, progress and schedule records | `VERIFIED_IMPLEMENTED` |
| Portal/API route surface | `VERIFIED_IMPLEMENTED` |
| tenant and authority enforcement | `REQUIRES_REPOSITORY_REVIEW` |
| history preservation and lifecycle guards | `IMPLEMENTED_WITH_GAP` |
| manufacturing Events/outbox | `PLANNED_NOT_IMPLEMENTED` in inspected service |
| capacity and immutable production planning | `PARTIAL_IMPLEMENTATION` |
| canonical Production Order ownership | `CONFLICT_REQUIRES_CANONICALIZATION` |
