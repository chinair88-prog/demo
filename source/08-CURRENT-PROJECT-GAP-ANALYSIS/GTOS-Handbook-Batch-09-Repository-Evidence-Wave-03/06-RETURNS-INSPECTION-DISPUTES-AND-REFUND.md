# 06 — Returns, Inspection, Disputes, and Refund

## Returns implementation

`ReturnsController` و `ReturnsService` رفتارهای زیر را دارند:

- create return/RMA؛
- create return lines؛
- receive at warehouse؛
- inspect received items؛
- create return-to-stock decision؛
- dispute claim، evidence، rebuttal، decision و appeal workspace.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Strong structural evidence

- Return، Return Item، Receipt، Inspection و Return-to-Stock Decision entities جدا هستند.
- tenant/company روی Return و Receipt ذخیره می‌شود.
- classification به RESTOCK/HOLD/DAMAGED/SCRAP نگاشت می‌شود.
- dispute workspace evidence/timeline، liability، financial impact و appeal دارد.

## Critical returns findings

1. هر Return در create فوراً `authorizationStatus = APPROVED` می‌گیرد.
2. `createdBy`، `receivedBy`، `inspectedBy` و `executedBy` با UUID تصادفی تولید می‌شوند، نه actor واقعی.
3. source order line، customer/supplier و SKU ownership/eligibility verify نمی‌شود.
4. receive by returnId و inspect by receiptId tenant/company guard آشکار ندارند.
5. receive تمام requested quantity را بدون scan/discrepancy برابر received می‌کند.
6. Inspection result/classification از request پذیرفته می‌شود و authority/calibration/evidence ندارد.
7. RESTOCK فقط log می‌شود؛ Inventory posting در comment به آینده موکول شده است.
8. Refund execution به Payment Domain متصل نیست.
9. dispute detail، evidence، rebuttal، decision و appeal در چند مسیر record را by ID بدون tenant predicate می‌خوانند.
10. workspace برای Returnها `findAll()` و in-memory tenant filtering دارد.
11. evidence/timeline در JSON mutable ذخیره می‌شود.
12. Dispute financial decision به payout/refund execution وصل نیست.

## Canonical return flow

```text
ReturnRequest
→ EligibilityDecision
→ ReturnAuthorization
→ InboundShipment/Receipt
→ Item-Level Inspection Evidence
→ Disposition Decision
→ Inventory Posting or Scrap/Repair
→ Refund/Replacement Intent
→ Payment Outcome
→ Resolution and Appeal
```
