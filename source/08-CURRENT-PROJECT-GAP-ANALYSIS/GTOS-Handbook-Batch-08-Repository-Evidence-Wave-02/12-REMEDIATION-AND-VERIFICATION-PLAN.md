# 12 — Remediation and Verification Plan

## Priority 0 — جلوگیری از False Authority

1. PO یا declaration application status نباید legal customs release نامیده شود.
2. tenant/company/user از request به‌عنوان authority پذیرفته نشود.
3. Shipping، Warehouse، Inventory و Partner SQL کاملاً tenant-scoped شوند.
4. مالکیت Packing List، Warehouse Receipt، Shipment و Customs canonical شود.
5. tenant assignment اشتباه Shipment Item اصلاح و داده موجود migrate شود.

## Priority 1 — Truth Preservation و Execution Safety

1. document version/signature immutable اضافه شود.
2. outbox/inbox برای Trade Documents، Customs، Shipping، Warehouse و Inventory ایجاد شود.
3. JSON history با append-only journal جایگزین شود.
4. idempotency قبل از stock mutation بررسی شود.
5. state transition guard و optimistic version predicate اضافه شود.
6. external outcome دارای source reference، observed time، received time و correction باشد.

## Priority 2 — تکمیل Capability

1. Trade Quality Aggregate ساخته شود.
2. Commercial Invoice create و PL-to-CI reconciliation پیاده‌سازی شود.
3. customs document و authority-response ingestion ساخته شود.
4. CustodyRelationship با attestations پیاده شود.
5. Warehouse Receipt با typed contract به Inventory متصل شود.
6. quarantine و channel eligibility قبل از availability اعمال شود.

## Evidence لازم برای ارتقای Status

- migration روی empty و upgrade database؛
- tenant-isolation tests؛
- concurrent posting/reservation tests؛
- duplicate/replay tests؛
- outbox failure/recovery؛
- customs/provider signature verification؛
- cross-document reconciliation؛
- Portal E2E بدون mock fallback؛
- audit reconstruction و backup/restore.
