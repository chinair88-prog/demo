# 03 — Cart, Checkout, and AI Insights

## Cart implementation

`CartController` و `CartService` رفتارهای زیر را دارند:

- create/get cart by user or session؛
- get by cart ID؛
- add/update/remove item؛
- coupon attach/remove؛
- guest-to-user merge؛
- clear and expiry cleanup.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Cart security and commercial integrity gaps

- userId، sessionId و cartId از request پذیرفته می‌شوند.
- get/update/delete by cart ID ownership check آشکار ندارند.
- Cart item فیلدهای SKU، name، unitPrice، currency، providerId و attributes را از Client می‌پذیرد.
- Catalog/Offer/Inventory lookup قبل از add دیده نشد.
- MOQ، maximum quantity، channel eligibility و availability validate نمی‌شوند.
- Coupon فقط به cart attach می‌شود؛ comment صریحاً می‌گوید validation واقعی بعداً توسط CouponService انجام می‌شود.
- guest merge با userId/sessionId ارسالی Caller انجام می‌شود.

## Checkout implementation

`CheckoutController`:

- checkout start؛
- cart-to-order conversion؛
- checkout validation؛
- order verification؛
- payment confirmation؛
- AI insights.

اما checkout قیمت‌های Cart را مستقیماً به Order Item منتقل می‌کند. comparison واقعی با Catalog/Offer انجام نمی‌شود. tenantId نیز از Checkout request وارد Order می‌شود، مگر TenantContext در Order layer آن را override کند.

`confirm-payment` مستقیماً Order را paid می‌کند و در فایل بررسی‌شده signed provider callback، idempotency، amount/currency reconciliation یا Payment Intent ownership اثبات نشد.

Classification: `IMPLEMENTED_WITH_CRITICAL_GAPS`.

## Simulated AI

کد صریحاً AI analysis را `reference implementation that simulates AI decisions` معرفی می‌کند.

Fraud score، ETA، payment suggestion، warehouse routing و upsell با ruleهای محلی و hard-coded ساخته می‌شوند؛ برای نمونه warehouseهای `wh-main` و `wh-special` و carrierهای فرضی انتخاب می‌شوند.

Classification:

- AI checkout advice: `SIMULATED_REFERENCE_IMPLEMENTATION`
- persisted AI decision: `PLANNED_NOT_IMPLEMENTED`؛ کد فقط آن را log می‌کند.

## Required checkout contract

Checkout باید:

1. actor/cart ownership را verify کند؛
2. Offer و Price Version را دوباره resolve کند؛
3. availability و reservation را اجرا کند؛
4. shipping/tax/discount را authoritative محاسبه کند؛
5. quote expiry و idempotency داشته باشد؛
6. Payment Intent بسازد؛
7. Order Snapshot immutable ایجاد کند؛
8. AI output را advisory و traceable نگه دارد.
