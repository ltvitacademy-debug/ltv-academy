# Lesson 24 — Principle of Least Privilege

**Chapter 4 · Authentication & Authorization · Lesson 6 of 7**

## What you'll learn

- Least privilege as an operational discipline, not a one-time setup step
- The `db_owner` anti-pattern, and why it's so common anyway
- Starting from nothing and adding only what's proven necessary
- How Lessons 21-23's tools (roles, `GRANT`, `DENY`) actually implement this

## The anti-pattern you'll see constantly

```sql
-- The fast, common, wrong answer to "the app can't read this table":
ALTER ROLE db_owner ADD MEMBER app_service_account;
```

This "works" immediately, which is exactly the problem — it makes the
error go away without anyone ever confirming what access was actually
needed. `app_service_account` can now drop tables, change permissions
for every other account, and read every row of every table, because
one query needed to read one table. This isn't hypothetical; it's the
single most common real-world permissions mistake a DBA inherits from
someone else's shortcut.

## Least privilege — the actual discipline

Least privilege means: **an account starts with no access, and gains
only the specific permissions it's been shown to need — nothing
granted "to be safe" or "to make it work faster."**

```sql
-- Start here: the account exists, but can do nothing yet
CREATE USER app_service_account FROM EXTERNAL PROVIDER;

-- Add exactly what the app's actual queries require --
-- confirmed by reading the application's code/queries, not guessed
GRANT SELECT ON Sales.Orders TO app_service_account;
GRANT SELECT, INSERT ON Sales.OrderLog TO app_service_account;
GRANT EXECUTE ON Sales.usp_PlaceOrder TO app_service_account;
```

Every permission above traces back to a real, specific need. If the
app later needs to read a new table, that's one more `GRANT` — not a
reason to reach for `db_owner` "just in case."

## Why the anti-pattern happens anyway

- **Time pressure** — `db_owner` fixes the symptom in one line;
  finding the actual three permissions needed takes longer.
- **Nobody owns the cleanup** — broad access that "works" rarely gets
  revisited once the immediate problem is gone.
- **Fear of breaking something** — narrowing an account's access
  later feels riskier than it is, so it never happens.

## Least privilege as an ongoing operational discipline

Least privilege isn't a setting you configure once — it's a habit
enforced continuously:

- **Audit what's actually used**, not just what's granted.
  `sys.database_permissions` and query logs show the gap between
  the two.
- **Grant additively, in response to a proven need** — a support
  ticket or a code review, not a guess about future requirements.
- **Revisit access when a role changes** — an account that used to
  need broader access during a migration should lose that access
  once the migration is done.
- **Prefer `DENY` for carve-outs** (Lesson 23) over avoiding a
  useful broad role entirely — you don't have to choose between
  "convenient role" and "least privilege" when `DENY` can exclude
  the one sensitive object.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting only the specific access an account has been shown to need, nothing more |
| `db_owner` anti-pattern | Granting full database control to make an access error disappear quickly |
| Additive grants | Adding permissions in response to a proven, specific need, rather than up front |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why
does granting `db_owner` to fix "the app can't read this table" create
a much bigger problem than it solves, and what should happen instead?
