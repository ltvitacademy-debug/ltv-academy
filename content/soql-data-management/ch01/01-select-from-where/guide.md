# SELECT, FROM & WHERE

This course is the T-SQL-to-Salesforce bridge. It assumes the SQL you already built in
T-SQL Development — `SELECT`, `FROM`, `WHERE`, joins, aggregation — and teaches how those
same ideas work, and where they genuinely differ, in **SOQL**, Salesforce's own query
language. Salesforce Fundamentals for Data Analysts taught you what the data means; this
course teaches you how to actually get it out.

## What you'll learn

- SOQL's basic SELECT/FROM/WHERE shape, and how close it really is to T-SQL
- The one syntax difference that trips up every SQL developer's first SOQL query
- How to query a real standard Salesforce object

## The shape is genuinely familiar

```sql
SELECT Name, Amount, StageName
FROM Opportunity
WHERE StageName = 'Closed Won'
```

If you can read T-SQL, you can read that. SOQL's `SELECT`/`FROM`/`WHERE` clauses do exactly
what you'd expect: pick columns (called **fields** in Salesforce), pick a table (called an
**object**), filter rows (called **records**). The terminology changes; the logic doesn't.

## The difference that trips people up first: no `SELECT *`

The single most common first mistake a T-SQL developer makes in SOQL is trying to write
`SELECT * FROM Opportunity`. **SOQL has no `SELECT *`.** Every field you want back has to
be named explicitly:

```sql
-- This does NOT work in SOQL:
SELECT * FROM Opportunity

-- This is required instead:
SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunity
```

This isn't an oversight — it's a deliberate constraint tied to how Salesforce bills API
usage and enforces query governor limits (covered later in this path). Naming exact fields
keeps queries predictable and cheap. One habit worth building immediately: `Id` is
Salesforce's real, unique record identifier (covered in depth in Chapter 7) — it's good
practice to include it in almost every SOQL query, even when you don't strictly need it for
the report itself, because it's what you'd use to look up or link back to that exact
record later.

## WHERE works the way you'd expect, with real Salesforce values

```sql
SELECT Name, Amount
FROM Opportunity
WHERE Amount > 50000
  AND StageName != 'Closed Lost'
```

Comparison and logical operators (`=`, `!=`, `>`, `<`, `AND`, `OR`) work exactly like
T-SQL. The real thing to get right is knowing your object's actual field values —
`StageName` here holds whatever your org's sales process actually calls its stages
(`Closed Won`, `Prospecting`, `Negotiation/Review` are common real examples, but every org
customizes this), which is exactly why Salesforce Fundamentals' data-model chapter mattered
before this course started.

## Key terms

| Term | Meaning |
|---|---|
| SOQL | Salesforce Object Query Language — Salesforce's own query language, similar in shape to SQL |
| Object | SOQL's term for what SQL calls a table (e.g. the Opportunity object) |
| Field | SOQL's term for what SQL calls a column |
| Record | SOQL's term for what SQL calls a row |
| Id | Every Salesforce record's real, unique identifier field |

## Check yourself

A T-SQL developer writes `SELECT * FROM Opportunity` in a Salesforce query tool and it
fails. Why, precisely, and what should they write instead?
