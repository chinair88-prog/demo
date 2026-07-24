# 01 — Product Catalog, Marketplace Catalog, and Offer

## Three overlapping product representations

سه representation اجرایی وجود دارد:

1. `catalog.products` در `product-catalog-service` با `ProductEntity`.
2. یک read mapping دیگر روی همان جدول در `marketplace-service` با `CatalogProductEntity`.
3. `marketplace.product_catalog_entries` با tenant/company، unit price، MOQ، lead time و verification fields.

این وضعیت برای Product Master و Marketplace Offer برابر است با:

`CONFLICT_REQUIRES_CANONICALIZATION`

## Product Catalog Service

`ProductController` و `ProductService` رفتارهای زیر را ارائه می‌کنند:

- list/search/filter؛
- get by ID و slug؛
- create/update/archive؛
- update status؛
- resell from purchase؛
- similar products؛
- tiered pricing.

`ProductEntity` شامل multilingual names، SKU، category، supplier، brand، origin، HS code، status، visibility، base/compare/cost price، dimensions، MOQ، tax، approval fields و source tracking است.

Classification: `IMPLEMENTED_WITH_GAP`.

## Critical catalog findings

- `ProductEntity` tenant/company field ندارد.
- `@Version` روی Product دیده نشد.
- Controller authorization annotation اجرایی دیده نشد و actor fallback برابر `anonymous` است.
- `updateProduct` می‌تواند status را مستقیم از request تنظیم کند و dedicated status workflow را دور بزند.
- `updateProductStatus` transition matrix یا role guard آشکار ندارد.
- `resellFromPurchase` ownership منبع، Inventory possession، Quality eligibility یا legal resale eligibility را verify نمی‌کند.
- Product خود base/cost/compare price نگه می‌دارد، درحالی‌که Pricing و Marketplace نیز pricing دارند.
- Product tier prices hard-coded هستند و Price Version مستقل نیستند.

## Marketplace Product Catalog

`marketplace.product_catalog_entries` tenant/company-aware است و API CRUD، overview و category listing دارد. بااین‌حال:

- create tenant/company را از request می‌پذیرد؛
- get/update/delete by ID tenant predicate آشکار ندارند؛
- `isVerified` و `isFeatured` از request قابل تنظیم‌اند؛
- hard delete وجود دارد؛
- `unitPrice` داخل Catalog Entry ذخیره می‌شود.

Classification: `IMPLEMENTED_WITH_GAP`.

## Missing Offer aggregate

یک Marketplace Offer canonical که Seller، Product Version، Price Version، Inventory Eligibility، Channel، Region، Terms، Availability Window و Publication Decision را immutable snapshot کند، در شواهد بررسی‌شده پیدا نشد.

Target boundary:

```text
ProductMaster
→ ProductVersion
→ SellerAssortmentEligibility
→ PriceVersion
→ MarketplaceOffer
→ OfferPublicationDecision
→ CheckoutOfferSnapshot
```
