# Lesson 10 — Access Control Best Practices

**Chapter 2 · Permissions · Lesson 10 of 25**

## What you'll learn

- Why grant to groups, not individual users, as the default habit
- Least privilege in practice: granting at the narrowest level that still does the job
- Why relying on `account users` should be the exception, not the default
- Making `SHOW GRANTS` a habit, not a last resort
- How this chapter's five lessons combine into one realistic access request

## Grant to groups, not individuals

Every lesson in this chapter has used groups in its examples for a reason: granting to **`data-analysts`** instead of five individual email addresses means onboarding and offboarding become a group-membership change, not five separate `GRANT`/`REVOKE` pairs someone has to remember to run. Individual user grants accumulate as silent, hard-to-audit exceptions — the access equivalent of technical debt.

```sql
-- Harder to audit, doesn't scale
GRANT SELECT ON TABLE finance.accounts_payable.invoices TO `alice@example.com`;
GRANT SELECT ON TABLE finance.accounts_payable.invoices TO `bob@example.com`;

-- Scales with the team, auditable in one place
GRANT SELECT ON TABLE finance.accounts_payable.invoices TO `data-analysts`;
```

## Least privilege: grant at the narrowest level that works

Lesson 9 showed that a privilege on a catalog reaches every schema and table inside it, present and future. That's powerful — and exactly why it should be used deliberately, not by default. If a group only needs one schema, grant on that schema, not the whole catalog. The narrower grant does less collateral damage if that group's membership changes later, and it's far easier to reason about when auditing who can see what.

```sql
-- Broader than necessary, if only one schema is actually needed
GRANT SELECT ON CATALOG finance TO `accounts-payable-team`;

-- Narrower, matches the actual need
GRANT SELECT ON SCHEMA finance.accounts_payable TO `accounts-payable-team`;
```

## Use `account users` sparingly

Lesson 6 introduced the built-in `account users` group — every user on the account, in one grant. It's the right tool for something genuinely public, like a shared reference schema. It's the wrong tool as a default shortcut to avoid setting up a proper group, because it makes "who can see this" unanswerable by anything other than "everyone."

## Make `SHOW GRANTS` routine, not reactive

```sql
-- What can everyone see on this table?
SHOW GRANTS ON TABLE finance.accounts_payable.invoices;

-- What can this specific group see?
SHOW GRANTS `data-analysts` ON SCHEMA finance.accounts_payable;
```

Don't wait for an audit request to run `SHOW GRANTS` for the first time. Checking it periodically — especially on sensitive schemas — catches the grant someone made six months ago for a project that's since ended and was never revoked.

## Putting the chapter together

A realistic access request for a new analyst joining the `data-analysts` group touches everything in this chapter: a **principal** (Lesson 6) needs the **usage-privilege chain** (Lessons 7 and 9) to reach an object it has an **object-level privilege** on, and whoever approves the request is almost always the **owner** (Lesson 8) of the catalog or schema in question.

```sql
GRANT USE CATALOG ON CATALOG finance TO `data-analysts`;
GRANT USE SCHEMA ON SCHEMA finance.accounts_payable TO `data-analysts`;
GRANT SELECT ON TABLE finance.accounts_payable.invoices TO `data-analysts`;
```

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting at the narrowest scope that still satisfies the actual need |
| Group-based access | Granting privileges to groups rather than individual users, so access scales with membership changes |
| `SHOW GRANTS` | The SQL statement for auditing who has what privilege on an object — worth running proactively |

## Lab

A new engineer joins the `data-engineers` group and needs to write to `finance.accounts_payable.invoices`. Write the complete set of `GRANT` statements needed, following least privilege — grant only what's required for that one table, nothing broader.

## Check yourself

- Why does granting to a group scale better than granting to five individual users?
- What's the tradeoff between granting at the catalog level versus the schema level?
- Name one reason to run `SHOW GRANTS` proactively rather than only when an audit demands it.
