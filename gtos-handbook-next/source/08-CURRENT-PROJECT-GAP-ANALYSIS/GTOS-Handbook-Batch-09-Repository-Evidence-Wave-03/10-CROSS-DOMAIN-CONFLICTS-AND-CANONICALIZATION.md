# 10 — Cross-Domain Conflicts and Canonicalization

| ID | Conflict | Canonical decision required |
|---|---|---|
| C-301 | Product master در catalog.products و marketplace.product_catalog_entries تکرار شده | Product Master، Offer Projection و migration owner تعیین شود |
| C-302 | قیمت در Product، Marketplace Catalog، Target Price و Smart Pricing وجود دارد | Price Version و Pricing authority واحد تعریف شود |
| C-303 | Cart unit price را از Client می‌پذیرد | Checkout باید Offer/Price Snapshot authoritative بسازد |
| C-304 | confirm-payment مستقیماً Order را Paid می‌کند | Payment provider outcome تنها منبع Payment truth باشد |
| C-305 | Order list و bulk operations tenant leak دارند | تمام repository accessها fail-closed tenant-scoped شوند |
| C-306 | Order Saga فقط comment است | Inventory/Payment/Fulfilment orchestration واقعی و compensating actions ساخته شود |
| C-307 | Warehouse Sales Order deprecated با Customer Order overlap دارد | Fulfilment Order boundary و migration تعیین شود |
| C-308 | Pick/Pack به Inventory consumption متصل نیست | Reservation consumption و stock ledger contract پیاده شود |
| C-309 | Delivered بدون POD ثبت می‌شود | Delivery Observation و POD مستقل ایجاد شود |
| C-310 | Return RESTOCK فقط log است | Return disposition به Inventory Posting متصل شود |
| C-311 | Refund در Order/Return با Payment execution جداست | Refund Intent و Provider Outcome canonical شود |
| C-312 | Marketplace و Payment هر دو Settlement owner هستند | Seller ledger و money movement ownership جدا شود |
| C-313 | Sustainability Goal در دو Service وجود دارد | ESG/Carbon owner و projectionها تعیین شوند |
| C-314 | AI evaluation run lookup tenant-scoped نیست | Evaluation identity و run ownership سخت‌گیری شود |
| C-315 | local/in-memory/static engines به‌عنوان AI/Carrier behavior معرفی می‌شوند | Simulation label و production provider boundary اجباری شود |
