# 00 — Scope, Method, and Snapshot

| Field | Value |
|---|---|
| Repository | `chinair88-prog/allinb2c` |
| Snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| Branch for handbook artifacts | `gtos/handbook-repository-grounded-expansion-v2` |
| Review date | `2026-07-23` |
| Scope | Catalog → Pricing → Checkout → Order → Fulfilment → Returns → Settlement → ESG → AI Evaluation |

## Evidence Method

فایل‌های Java، TypeScript و SQL پس از Repository search مستقیماً خوانده شدند. Classification فقط به کوچک‌ترین ادعای قابل دفاع اختصاص یافت.

تمایزهای اجباری:

1. Product master در برابر Marketplace catalog entry و Offer؛
2. calculated price در برابر published/accepted Price Version؛
3. cart item price در برابر authoritative checkout quote؛
4. Order state در برابر Inventory/Payment/Fulfilment outcome؛
5. shipped/delivered status در برابر carrier observation یا Proof of Delivery؛
6. return inspection record در برابر inventory restock execution؛
7. settlement calculation در برابر payout execution؛
8. sustainability target در برابر independently verified ESG metric؛
9. evaluation submission در برابر trustworthy model evaluation and governance decision.

## Limitations

- Runtime configuration، migration execution و CI results مستقل اجرا نشده‌اند.
- وجود Test file به معنی pass بودن نیست.
- External payment، carrier، customer delivery، sustainability assurance و model-evaluation authority اثبات نشده‌اند.
- Header یا request field فقط در صورت اتصال به trusted identity context، authority محسوب می‌شود.
