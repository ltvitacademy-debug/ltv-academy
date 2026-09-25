# SOSL vs. SOQL: When to Use Each

You now have two query languages that both return Salesforce records. Picking the wrong
one doesn't just feel awkward; it can make a task impossible. This lesson gives you a plain
rule for choosing.

## What you'll learn

- The core difference: structured queries versus text search
- A side-by-side comparison of what each can do
- A simple decision rule with worked examples

## The core difference

**SOQL** answers "give me the records from this object that meet these conditions." You
know the object, and you know the fields and values. It's precise and structured, like
T-SQL.

**SOSL** answers "where does this text appear?" You don't know which object or field holds
it, and you want matches across several objects at once.

```sql
-- SOQL: I know exactly where to look
SELECT Id, Name FROM Account WHERE Industry = 'Technology'

-- SOSL: I have a word and no idea where it lives
FIND {Acme} IN ALL FIELDS RETURNING Account(Name), Contact(Name), Lead(Name)
```

## Side by side

| | SOQL | SOSL |
|---|---|---|
| Purpose | Retrieve records that meet conditions | Search text across objects |
| Objects per query | One (plus related objects via relationships) | Several, in one statement |
| Filtering | Precise conditions on any field, including numbers and dates | Matches text; per-object `WHERE` in `RETURNING` for extra filtering |
| Aggregates | `COUNT`, `SUM`, `GROUP BY`, `HAVING` | None |
| Related records | Subqueries, dot notation, semi-joins | Not designed for this |
| Results | Rows, in the order you set | Records grouped by object, ranked by relevance |
| Result size | Large result sets can be retrieved in batches | Up to 2,000 records in total |
| Wildcards | `LIKE` with `%` and `_` | `*` and `?` in the search term |

## When to reach for each

**Use SOQL when:**

- You know the object and the fields you want.
- You need exact conditions: numbers, dates, picklist values, ranges.
- You need counts, totals, or grouping.
- You need related records via dot notation, subqueries or semi-joins.
- You are extracting large volumes of data, as you will with Data Loader in the next chapter.

**Use SOSL when:**

- You have a piece of text, like a name, an email, or a phone number, and don't know where
  it lives.
- You need to search across multiple objects in one request.
- You want relevance-ranked results, the way a search box behaves.
- You are searching text fields that are awkward to filter in SOQL, such as long text areas.

## Worked examples

**"How many Opportunities closed last quarter, by stage?"** SOQL. It needs a date condition
and grouping, and it's on one known object.

**"A customer called from 555-0100. Who are they?"** SOSL. The number could be on an Account,
a Contact, or a Lead. `FIND {5550100} IN PHONE FIELDS RETURNING Account, Contact, Lead`
checks all three at once.

**"Export every Contact created this year."** SOQL. One object, a date filter, and a large
result set.

**"Find anything mentioning 'renewal' in a note."** SOSL, since it's a text search across
whatever objects you name.

## Key terms

| Term | Meaning |
|---|---|
| Structured query | You specify the object, fields and conditions exactly (SOQL) |
| Text search | You specify a term and Salesforce finds where it occurs (SOSL) |
| Relevance ranking | SOSL orders matches by how well they fit the term |
| Aggregate | Counts and totals; supported by SOQL only |

## Check yourself

For each task, say SOQL or SOSL and why: (a) total Opportunity amount by owner; (b) find
every record mentioning a customer's email; (c) list all Accounts in Georgia with more than
500 employees.
