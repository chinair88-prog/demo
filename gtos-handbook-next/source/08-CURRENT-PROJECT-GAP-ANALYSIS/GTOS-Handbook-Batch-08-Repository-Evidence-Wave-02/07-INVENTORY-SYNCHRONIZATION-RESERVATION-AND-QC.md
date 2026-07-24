# 07 — Inventory Synchronization, Reservation, and QC Disposition

## Stock Model

`StockBalanceEntity` یک composite identity دارد:

- tenant
- company
- warehouse
- SKU
- bin
- batch

مقادیر زیر جدا نگهداری می‌شوند:

- on hand
- available
- reserved
- damaged
- QC hold
- blocked
- in transit

وجود `@Version` optimistic locking را در سطح Entity فراهم می‌کند.

## Inventory Posting

`InventoryPostingService` رفتارهای transactional زیر را دارد:

- Receipt؛
- Transfer؛
- Adjustment؛
- انتقال Available به QC Hold؛
- QC PASS به Available؛
- QC FAIL به Damaged یا Blocked؛
- ثبت Stock Ledger.

## Reservation

`ReservationService`:

- quantity مثبت را validate می‌کند؛
- balanceهای tenant/company/warehouse/SKU را می‌خواند؛
- اولین balance دارای available کافی را انتخاب می‌کند؛
- Available را کم و Reserved را زیاد می‌کند؛
- Reservation با state `ACTIVE` می‌سازد؛
- در Release مقدار آزادشدنی را به Available برمی‌گرداند.

Classification: `IMPLEMENTED_WITH_GAP`.

## نقاط قوت

- stock states صریح و تفکیک‌شده؛
- tenant/company در composite key؛
- optimistic locking؛
- ledger دارای source و idempotency field؛
- insufficient-stock check برای reservation و QC hold؛
- Reservation Entity مستقل.

## Gapهای بحرانی

1. Controller، tenant، company و user را از query parameter می‌گیرد؛ این اطلاعات authority قابل اعتماد نیستند.
2. `GET /stock/ledger` در Controller بررسی‌شده بدون tenant filter است.
3. Posting APIهای عمومی در همان Controller دیده نشدند و caller/orchestration هنوز verify نشده است.
4. idempotency key در ledger ذخیره می‌شود، اما قبل از balance mutation duplicate lookup انجام نمی‌شود.
5. Transfer و Adjustment می‌توانند quantity منفی بسازند.
6. Reservation اولین balance مناسب را بدون policy مشخص انتخاب می‌کند.
7. retry strategy برای optimistic-lock conflict پیدا نشد.
8. Receipt، good quantity را فوراً Available می‌کند و quarantine/quality gate اجباری ندارد.
9. Event/outbox برای Inventory facts پیدا نشد.
10. Provider WMS و Warehouse Receiving با Inventory ownership مرز روشن ندارند.

## اصلاح لازم

Warehouse Receipt باید ورودی governed برای Inventory باشد. Availability باید با Policyهایی مانند Quality، Quarantine، Lot، Expiry، Compliance و Channel Eligibility محاسبه شود؛ نه صرفاً با receipt فیزیکی.
