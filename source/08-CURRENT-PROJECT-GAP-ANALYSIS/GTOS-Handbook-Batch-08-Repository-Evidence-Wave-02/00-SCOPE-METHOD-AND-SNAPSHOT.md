# 00 — Scope, Method, and Repository Snapshot

| Field | Value |
|---|---|
| Repository | `chinair88-prog/allinb2c` |
| Evidence snapshot | `14cc83805e7386c3d5cdec6ad191b1078fd502ff` |
| Handbook branch | `gtos/handbook-repository-grounded-expansion-v2` |
| Wave | Repository Evidence Wave 02 |
| Scope | Quality؛ documents؛ customs؛ transport؛ warehouse؛ inventory |
| Evidence standard | ادعای محدود و پشتیبانی‌شده با فایل اجرایی بررسی‌شده |

## روش بررسی

ابتدا جست‌وجوی کد انجام شد و سپس فایل‌های منتخب Java، TypeScript و SQL مستقیماً خوانده شدند. وجود نام فایل یا route به‌تنهایی Implementation محسوب نشد.

در تمام فصل‌ها این تمایزها حفظ شده‌اند:

1. frontend presentation در برابر backend execution؛
2. software quality در برابر trade-goods quality؛
3. platform status در برابر external legal authority؛
4. وجود جدول در برابر lifecycle کامل؛
5. ذخیره idempotency key در برابر جلوگیری واقعی از duplicate؛
6. وجود tenant field در برابر tenant enforcement قابل اعتماد؛
7. status string در برابر state machine کنترل‌شده؛
8. فراخوانی Event publisher در برابر delivery تضمین‌شده و outbox.

## محدودیت‌ها

- Deployment این snapshot اثبات نشده است.
- وجود فایل Test به‌معنی اجرای موفق Test یا CI نیست.
- migrationها از روی source بررسی شده‌اند، نه اجرای مستقل.
- outcomeهای customs، carrier، inspector و warehouse فقط با authority evidence می‌توانند authoritative شوند.
- بخشی از controllerها direct JDBC دارند و هماهنگی runtime datasource با migration نیازمند integration test است.
