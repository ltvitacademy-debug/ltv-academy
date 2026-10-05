# Lesson 17 — Account Usage Views · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 16 covered two views. SNOWFLAKE.ACCOUNT_USAGE actually holds dozens, grouped loosely by what they audit.

## S2 · STEPS CARD (categories)

Activity views like QUERY_HISTORY and SESSIONS. Security views like GRANTS_TO_USERS and GRANTS_TO_ROLES. Usage and cost views like WAREHOUSE_METERING_HISTORY. This lesson focuses on the security and object-inventory views — the backbone of a governance audit.

## S3 · CODE CARD (GRANTS_TO_USERS)

GRANTS_TO_USERS is a point-in-time view of current role assignments. Filtering deleted_on is null gives you only active grants. That's different from querying QUERY_HISTORY for GRANT statements — this gives you current state, not the history of grant events.

## S4 · STEPS CARD (ACCOUNT_USAGE vs INFORMATION_SCHEMA)

Two schemas can look similar. INFORMATION_SCHEMA is near-real-time but scoped to one database and never shows a dropped object. ACCOUNT_USAGE is account-wide, retains up to a year of history, and critically, still shows objects after they're dropped.

## S5 · CODE CARD (finding soft-deleted objects)

Here's that advantage in practice: querying ACCOUNT_USAGE.TABLES for rows where deleted is not null. If someone drops a table to cover their tracks, INFORMATION_SCHEMA never shows it existed — ACCOUNT_USAGE does, with a timestamp of exactly when.

## S6 · OUTRO CARD

Next lesson: Auditing Access — turning these views into a repeatable audit, not a one-off query.
