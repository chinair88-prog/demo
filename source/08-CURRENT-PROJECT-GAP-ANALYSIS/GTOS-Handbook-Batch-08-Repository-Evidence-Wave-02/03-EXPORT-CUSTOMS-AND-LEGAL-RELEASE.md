# 03 — Export Customs and Legal Release

## Provider implementation

Migration واقعی `partner.export_declarations` را با این داده‌ها ایجاد می‌کند:

- declaration number و customs office؛
- shipment، commercial invoice و packing list؛
- Partner و declarant؛
- transport، vessel، voyage و container؛
- ports و destination country؛
- package/weight/value/currency؛
- status، customs response و metadata.

Partner Logistics Controller رفتارهای list، detail، create، update و submit را دارد و status history و audit ثبت می‌کند.

ثبت `SUBMITTED` فقط یک platform fact است: سیستم ثبت کرده کاربر submission action انجام داده است. این وضعیت اثبات نمی‌کند Customs Authority اظهارنامه را پذیرفته یا کالا را release کرده است.

Customs document add/remove هنوز با 503 پاسخ می‌دهند.

## Tajerestan Customs

Tajerestan مسیرهای زیر را دارد:

- `POST /api/v1/trade/customs/{poId}/clear`
- get status؛
- list و stats.

Service مستقیماً فیلدهای customs روی Purchase Order را تغییر می‌دهد و `trade.customs.cleared` منتشر می‌کند. External customs adapter، signed authority response یا declaration aggregate در فایل‌های بررسی‌شده دیده نشد.

این رابطه نادرست است:

```text
Application user sets PO.customsStatus = CLEARED
    ≠
Customs authority issued legal release
```

این بخش برای ثبت internal status، `IMPLEMENTED_WITH_GAP` است؛ برای legal release، `REFERENCE_ARCHITECTURE`.

## Gapهای اصلی

- statusها string آزاد هستند.
- Partner ownership در همه SQL statementها یکدست دیده نمی‌شود.
- callback signature، response correlation، Outcome Unknown و revocation وجود ندارد.
- document attachment executable نیست.
- history در JSON mutable ذخیره می‌شود.
- Partner declaration و Tajerestan PO customs دو مدل رقیب‌اند.

## تصمیم canonical

Export Customs باید این Truthها را جدا کند:

1. `ExportDeclarationPrepared`
2. `ExportDeclarationSubmitted`
3. `AuthorityResponseObserved`
4. `ExportLegalReleaseObserved`
5. `AuthorityDecisionCorrectedOrRevoked`
6. derived shipment-readiness perspective

Legal release فقط با authority evidence معتبر است.
