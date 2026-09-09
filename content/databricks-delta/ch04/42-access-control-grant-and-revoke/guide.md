# Lesson 42 — Access Control — GRANT and REVOKE

**Chapter 4 · Unity Catalog · Lesson 42 of 57**

## What you'll learn

- Finally solving the actual problem Lesson 38 opened this chapter with
- `GRANT` / `REVOKE` — the real SQL syntax for permissions
- `USE CATALOG` / `USE SCHEMA` as required privileges, not just convenience
- Privilege inheritance — why granting on a catalog can be broader than intended

## The problem, finally solved

Lesson 38 opened this chapter naming the real gap: anyone with
workspace access could query or `MERGE` into any table this course
built. `GRANT` is the actual mechanism that closes it.

```sql
GRANT SELECT ON TABLE nyc_taxi.gold.daily_revenue TO `analytics-team`;

GRANT SELECT, MODIFY ON SCHEMA nyc_taxi.silver TO `data-engineers`;

REVOKE SELECT ON TABLE nyc_taxi.gold.daily_revenue FROM `analytics-team`;
```

`GRANT <privilege> ON <object> TO <principal>` — a user, a service
principal, or a group. `SELECT` means read access; `MODIFY` covers
`INSERT`/`UPDATE`/`DELETE`/`MERGE` together. `REVOKE` undoes exactly
what a matching `GRANT` gave.

## USE CATALOG / USE SCHEMA as required privileges

```sql
GRANT USE CATALOG ON CATALOG nyc_taxi TO `analytics-team`;
GRANT USE SCHEMA ON SCHEMA nyc_taxi.gold TO `analytics-team`;
GRANT SELECT ON TABLE nyc_taxi.gold.daily_revenue TO `analytics-team`;
```

Lesson 39 introduced `USE CATALOG`/`USE SCHEMA` as a session
convenience. Under access control, they're actually **required
privileges** — a user needs `USE CATALOG` on `nyc_taxi` and `USE
SCHEMA` on `gold`, in addition to `SELECT` on the specific table,
before that `SELECT` grant does anything at all. All three grants
are necessary; any one missing means access still fails.

## Privilege inheritance — a real, easy-to-miss risk

```sql
-- This grants SELECT on EVERY current and future table in the schema:
GRANT SELECT ON SCHEMA nyc_taxi.silver TO `contractors`;
```

A privilege granted at the catalog or schema level automatically
applies to everything inside it — including tables created **after**
the grant. Granting broadly is convenient, but it's a real way to
accidentally expose more than intended; granting `SELECT` at the
table level, one table at a time, is more work but far more
precise about exactly what's actually being shared.

## Key terms

| Term | Meaning |
|---|---|
| `GRANT` / `REVOKE` | The real syntax for giving and removing a privilege on an object |
| `USE CATALOG` / `USE SCHEMA` | Required privileges, not just session convenience, under access control |
| Privilege inheritance | A catalog/schema-level grant applies to everything inside it, including future objects |

## Check yourself

You're ready for Lesson 43 when you can explain, without looking: why
would granting `SELECT` at the schema level be riskier than granting
it on one specific table?
