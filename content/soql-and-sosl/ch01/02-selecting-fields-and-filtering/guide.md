# Lesson 2 — Selecting Fields and Filtering

**Chapter 1 · Querying Salesforce · Lesson 2 of 23**

## What you'll learn

- How to pick exactly the fields you need, and why that discipline matters more in SOQL than in most SQL dialects
- How `WHERE` filters rows before they come back
- Combining multiple filter conditions
- Why field-level security and sharing silently shrink what a query can see

## Naming your field list deliberately

Lesson 1 established that SOQL has no `SELECT *`. That's not just a syntax quirk — it's meant to push you toward naming only the fields a given piece of code or report actually needs:

```sql
SELECT Id, FirstName, LastName, Email
FROM Contact
```

Every field you add to the list is a field Salesforce has to fetch and serialize on every row, so a query against a wide object with 40 fields runs measurably differently depending on whether you ask for 4 fields or all 40. On top of the performance angle, a narrow, deliberate field list documents intent — six months from now, the query itself tells you (or a future architect reviewing it) exactly what the code depends on.

## Filtering with WHERE

`WHERE` narrows which rows come back, evaluated before the rows are returned to you:

```sql
SELECT Id, Name, Industry
FROM Account
WHERE Industry = 'Technology'
```

Only `Account` rows whose `Industry` field equals the literal string `'Technology'` are returned. String literals always take single quotes; numbers and booleans don't:

```sql
SELECT Id, Name, AnnualRevenue
FROM Account
WHERE AnnualRevenue > 1000000
```

## Combining conditions

Chain multiple conditions with `AND` / `OR`, same as SQL:

```sql
SELECT Id, Name
FROM Account
WHERE Industry = 'Technology'
AND AnnualRevenue > 1000000
```

This returns only Technology accounts whose revenue also clears a million. Swap `AND` for `OR` and you'd get every Technology account *plus* every account over a million regardless of industry — a much larger, looser result set. Mixing `AND` and `OR` in the same clause needs parentheses to be unambiguous, exactly like in SQL:

```sql
SELECT Id, Name
FROM Account
WHERE (Industry = 'Technology' OR Industry = 'Finance')
AND AnnualRevenue > 1000000
```

Without the parentheses around the two `Industry` checks, SOQL would evaluate `AND` before `OR` and give you a different, almost certainly wrong, result set.

## What filtering can't bypass

A WHERE clause only decides which rows among the ones you're *allowed to see* come back — it never grants access you don't already have. Two layers sit underneath every query, invisibly:

- **Field-level security.** If the running user's profile or permission set doesn't grant read access to a field, that field simply isn't returned, even if you asked for it in a query that otherwise runs in "user mode" context (the Apex default as of API 55.0's `accessLevel` controls, and always true for queries run through the UI or API as a specific user).
- **Sharing rules.** A user only sees records they have access to via org-wide defaults, role hierarchy, sharing rules, or ownership — regardless of how a query's `WHERE` clause is written.

Apex running in the classic default system mode has historically bypassed both of these, which is exactly why "should this query run as the user or as the system" is a real architectural decision you'll return to later in this course, not a detail to wave away.

## Key terms

| Term | Meaning |
|---|---|
| Field list | The explicit list of fields named after SELECT — never a wildcard |
| WHERE clause | Filters which rows are returned, evaluated before results come back |
| Field-level security | Per-profile/permission-set control over which fields a user can read, enforced independently of any query |
| Sharing rules | Record-level access rules that limit which rows a user can see regardless of a query's filter |

## Lab

In a Developer Edition org's Query Editor, run a query against `Opportunity` that selects `Id`, `Name`, `StageName`, and `Amount`, filtered to only opportunities where `StageName = 'Closed Won'` and `Amount > 10000`. Then change the `AND` to `OR` and compare how much larger the result set gets. Finally, add a third condition with `OR` and parenthesize it correctly so the query still means "Closed Won AND Amount over 10000, OR something else you choose" rather than an ambiguous mix.

## Check yourself

Why does naming a narrow field list matter beyond just "it's required syntax"? If a WHERE clause doesn't filter out a record, but the running user has no sharing access to it, will the record still come back — and why or why not?
