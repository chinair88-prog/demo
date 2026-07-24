# 07 — Settlement, Reconciliation, and Payout

## Competing settlement owners

دو Settlement Service اجرایی وجود دارد:

1. Marketplace Settlement:
   - cycles؛
   - transactions؛
   - commission/discount aggregation؛
   - reconciliation؛
   - dashboard؛
   - scheduler.
2. Payment Settlement:
   - batch کردن Payment Captureهای `CAPTURED`؛
   - gross/fee/net calculation؛
   - اتصال captureها به batch.

وضعیت ownership:

`CONFLICT_REQUIRES_CANONICALIZATION`

## Marketplace Settlement

نقاط مثبت:

- state transition map؛
- cycle calculation؛
- audit و metrics؛
- reconciliation records؛
- auto-generation با overlap check؛
- tenant-aware list endpoints.

Classification: `IMPLEMENTED_WITH_GAP`.

### Material gaps

- tenant/company از request وارد create می‌شوند.
- get/update/calculate cycle by ID tenant guard آشکار ندارد.
- addTransaction بررسی نمی‌کند request tenant/company با cycle یکسان باشد.
- transaction reference authenticity و idempotency دیده نشد.
- Dashboard `totalCycles` را با global `cycleRepository.count()` می‌سازد و می‌تواند cross-tenant count leak کند.
- dashboard monetary summaries صفر hard-code شده‌اند.
- status `SETTLED` فقط state update است؛ bank/payout provider execution پیدا نشد.
- reconciliation actualAmount و resolvedBy از request پذیرفته می‌شوند.
- LLM settlement disabled است.
- multi-currency aggregation normalization دیده نشد.

## Payment Settlement

Payment service captureهای تسویه‌نشده را globally جمع می‌کند، fee rate را اعمال و Settlement Batch می‌سازد.

Classification: `IMPLEMENTED_WITH_GAP`.

### Material gaps

- list و run settlement tenant/company scope ندارند.
- capture grouping بر اساس seller، tenant، currency یا payout destination نیست.
- تمام CAPTURED records در یک batch جمع می‌شوند.
- payout execution، provider transfer، retry، reconciliation و failure recovery دیده نشد.
- overlap با Marketplace Settlement روشن نشده است.

## Canonical boundary

Payment باید money movement و provider facts را مالک باشد. Marketplace باید seller ledger، commission، entitlement و reconciliation را مالک باشد. Settlement approval نباید خودبه‌خود به معنی payout success باشد.
