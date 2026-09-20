# Script — Automatic Plan Correction

## Segment 1 (title)

Lesson 34 had you manually finding a good plan and forcing it. SQL Server can do a version of that job itself — Automatic Tuning watches Query Store's own data for plan regressions and can force the last known-good plan back automatically.

## Segment 2 (code: turning it on)

Turning it on is one option — FORCE_LAST_GOOD_PLAN under AUTOMATIC_TUNING. It requires Query Store already enabled, because Automatic Tuning is built directly on top of the plan and runtime-stats history you already know.

## Segment 3 (steps: how detection works)

Detection is a closed loop. SQL Server compares a query's current plan against its own recent history, and if a plan change is followed by a statistically significant regression, it automatically forces the last known-good plan — then keeps monitoring, and will un-force it if that doesn't actually help either.

## Segment 4 (code: auditing what it did)

Nothing here is a black box. sys.dm_db_tuning_recommendations shows every recommendation and action, applied or just offered, with the regressed plan and the recommended plan spelled out in the JSON details.

## Segment 5 (outro)

Automatic Tuning is a safety net for sudden regressions, not a replacement for judgment — it won't catch a slow, gradual drift. Next up: the manual regressed-queries workflow that covers what it can't.
