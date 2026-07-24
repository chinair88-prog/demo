# 02 — Pricing, Price Version, and Commercial Snapshot

## Implemented pricing capabilities

دو implementation اصلی وجود دارد:

### Pricing Service Target Price

`TargetPriceController` و `TargetPriceService`:

- create/update/delete policy؛
- list by tenant/product؛
- lookup active target price.

### Marketplace Smart Pricing

`SmartPricingService` و `SmartPricingController`:

- Price Rule CRUD؛
- Landed Cost CRUD؛
- Market Price Snapshot؛
- competitor averages؛
- price calculation؛
- pricing overview.

Strategies شامل Cost Plus، Market Based، Dynamic، Penetration، Skimming، Volume Tiered، Promotional و Bundle هستند.

Classification: `IMPLEMENTED_WITH_GAP`.

## Critical pricing findings

- tenant/company در Target Price و Smart Pricing از request/query گرفته می‌شوند.
- get/update/delete rule by ID tenant-scoped نیستند.
- Target Price status string آزاد است.
- Catalog Product و Marketplace Catalog Entry نیز قیمت مستقل ذخیره می‌کنند.
- Category و Warehouse rule matching در engine عملاً `true` و با comment `simplified` اجرا می‌شود؛ در نتیجه rule می‌تواند خارج از scope اعمال شود.
- Volume tiers hard-coded هستند.
- manual discount/surcharge از request پذیرفته می‌شود.
- response currency در محاسبه Smart Pricing به USD hard-code شده است.
- competitor source authenticity، timestamp policy و observation confidence محدود است.
- Price Version، approval، publication، effective interval، supersession و accepted checkout quote مستقل پیدا نشد.

## Canonical pricing model

```text
CostObservation
+ LandedCostVersion
+ MarketPriceObservation
+ PricingRuleVersion
→ PriceCalculation
→ PriceApprovalDecision
→ PriceVersion
→ OfferPrice
→ CheckoutPriceSnapshot
```

Cart و Order باید Price Snapshot را با rule/version/effective time ذخیره کنند، نه اینکه `unitPrice` Client را حقیقت تلقی کنند.
