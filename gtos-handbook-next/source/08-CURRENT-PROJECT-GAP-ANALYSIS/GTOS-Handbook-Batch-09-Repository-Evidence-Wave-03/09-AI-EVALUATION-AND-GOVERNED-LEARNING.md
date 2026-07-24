# 09 — AI Evaluation and Governed Learning

## Implemented evaluation capability

AI Orchestrator این رفتارها را دارد:

- submit human evaluation برای Agent Run؛
- recent evaluations by tenant؛
- evaluations by run؛
- use-case stats؛
- autonomy-level recommendation.

Evaluation شامل rating، accuracy، safety، usefulness، comment، corrections و tags است. Rolling averages و recommendation ruleها نیز اجرا می‌شوند.

Classification: `IMPLEMENTED_WITH_GAP`.

## Positive evidence

- rating enum-like validation دارد.
- aggregate stats per tenant/use case ذخیره می‌شود.
- high/low safety and accuracy thresholds recommendation تولید می‌کنند.
- minimum sample sizes برای برخی escalationها در نظر گرفته شده است.

## Critical evaluation findings

1. evaluatorUserId از request پذیرفته و فقط با prefix `human:` ذخیره می‌شود.
2. Agent Run existence، completion، tenant ownership و use-case match verify نمی‌شود.
3. `GET evaluations/{runId}` header tenant را می‌گیرد ولی Service فقط بر اساس runId query می‌کند.
4. accuracy/safety/usefulness score range validate نمی‌شود.
5. duplicate evaluation یا evaluator conflict policy دیده نشد.
6. evaluation independence، reviewer role، blind review و conflict-of-interest وجود ندارد.
7. corrections/tags به‌صورت strings/JSON ذخیره می‌شوند.
8. recommendation فقط heuristic است و policy change خودکار/approval governance کامل ندارد.
9. default current autonomy level برابر 3 است، حتی بدون profile evidence.
10. evaluation quality، dataset version، model version، prompt/tool configuration و output artifact به‌طور صریح snapshot نشده‌اند.

## Governed learning boundary

Evaluation feedback نباید مستقیماً Model یا Autonomy را تغییر دهد. Recommendation باید با evidence window، model/run version، reviewer authority، safety veto، approval و rollback همراه باشد.
