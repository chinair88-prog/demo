# 08 — ESG, Sustainability Goals, and Assurance

## Implemented goal management

Compliance Service برای Sustainability Goal این رفتارها را دارد:

- create/update؛
- activate؛
- update progress؛
- archive/delete؛
- get/list/filter by tenant/status/type؛
- Kafka send برای goal events.

Goal شامل baseline، target، year، scope، reduction type، framework، SBTi flag، plan، milestones، owner، budget و progress است.

Classification: `IMPLEMENTED_WITH_GAP`.

## Critical ESG findings

- Controller authorization و trusted tenant context آشکار ندارد.
- tenantId از request/path گرفته می‌شود.
- get/update/activate/delete by ID tenant-scoped نیستند.
- `getAllGoals()` global است.
- currentValue از request parameter مستقیم پذیرفته می‌شود؛ Measurement Source، methodology، evidence و assurance وجود ندارد.
- progress formula target semantics را مخلوط می‌کند: درصد کاهش محاسبه‌شده با `targetValue` مقایسه می‌شود، درحالی‌که targetValue ممکن است absolute target باشد.
- statusهای ON_TRACK/BEHIND_SCHEDULE فقط با threshold ثابت 75 تعیین می‌شوند و timeline نسبت به targetYear لحاظ نمی‌شود.
- `isScienceBased` و SBTi fields self-asserted هستند.
- Event payload فقط string نوع و ID است؛ failure catch/log می‌شود و outbox ندارد.
- hard delete برای ESG goal وجود دارد.
- یک SustainabilityGoal Entity دیگر در `specialized/carbon-tracking-service` وجود دارد؛ ownership conflict باید حل شود.

## Assurance boundary

یک Goal record به‌تنهایی ESG disclosure، verified carbon footprint یا SBTi validation نیست.

مدل هدف:

```text
MeasurementSource
→ ActivityData
→ EmissionFactorVersion
→ CalculationMethodVersion
→ SustainabilityMetricObservation
→ AssuranceEvidence
→ GoalProgressAssessment
→ DisclosureVersion
```
