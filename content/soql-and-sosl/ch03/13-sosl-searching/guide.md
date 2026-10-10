# Lesson 13 — SOSL Searching

**Chapter 3 · Search and SOSL · Lesson 13 of 23**

## What you'll learn

- The core FIND syntax and how it differs depending on where you write it
- Wildcards and combining search terms with AND/OR
- The IN SearchGroup clause and what each search group actually scopes
- The RETURNING clause for shaping which objects and fields come back

## The basic FIND statement

SOSL — Salesforce Object Search Language — answers a different question than SOQL. Instead of "give me records matching this exact field filter," it answers "find this text, wherever it might be." The basic shape:

```sql
FIND {search term} IN SearchGroup RETURNING ObjectsAndFields
```

In the Query Editor or API, the search term goes inside curly braces. In Apex, you write it as a quoted string instead:

```apex
List<List<SObject>> results = [FIND 'Acme' IN ALL FIELDS RETURNING Account(Name), Contact(FirstName, LastName)];
```

Both `IN SearchGroup` and `RETURNING` are optional — a bare `FIND {Acme}` searches across all fields of every searchable object and returns just IDs, which is almost never what you actually want, so in practice you'll write both clauses on nearly every real search.

## Wildcards and combining terms

SOSL supports two wildcards in the search term, and they mean the same thing they do in SOQL's `LIKE`:

- `*` matches zero or more characters
- `?` matches exactly one character

Search text is case-insensitive. You can combine multiple terms with `AND` / `OR` and group them with parentheses:

```sql
FIND {Acme AND (Corp OR Industries)} IN ALL FIELDS
```

## IN SearchGroup

`IN SearchGroup` scopes which fields SOSL actually searches against:

- `ALL FIELDS` — the default scope if you omit the clause entirely
- `NAME FIELDS` — name-type fields, plus a documented set of extra fields on certain standard objects (e.g. `Website` and `Site` on `Account`)
- `EMAIL FIELDS` — only email fields
- `PHONE FIELDS` — only phone number fields
- `SIDEBAR FIELDS` — fields shown in the sidebar search results in Salesforce Classic

Narrowing the search group isn't just an optimization — it changes what a search can even match. A search for a phone number scoped to `NAME FIELDS` would never find it, because phone fields aren't in that scope at all.

## RETURNING: shaping the result

`RETURNING` controls which objects and fields come back, and lets you add a per-object field list — and even per-object filters and limits:

```sql
FIND {Wingo} IN ALL FIELDS
RETURNING Account(Name), Contact(FirstName, LastName, Department)
```

Without `RETURNING`, a search returns only the IDs of every matching record across every searchable object — rarely useful on its own. With it, you get back exactly the fields you asked for, per object type, in one search.

## Key terms

| Term | Meaning |
|---|---|
| FIND | The core SOSL clause; search term in curly braces (Query Editor/API) or quotes (Apex) |
| SearchGroup | The IN clause scoping which fields get searched: ALL FIELDS, NAME FIELDS, EMAIL FIELDS, PHONE FIELDS, SIDEBAR FIELDS |
| RETURNING | Specifies which objects and fields a search result includes, instead of just record IDs |

## Lab

In a Developer Edition org's Query Editor, run a SOSL search for a common word likely to appear in both account and contact names, scoped to `NAME FIELDS`, returning `Name` from `Account` and `FirstName, LastName` from `Contact`. Then rerun the same search with `IN ALL FIELDS` and compare the result counts — note any extra matches that came from fields outside the name scope.

## Check yourself

What's the difference between what FIND {Acme} IN ALL FIELDS returns with no RETURNING clause, versus with one? Why would narrowing a search to PHONE FIELDS sometimes find zero results for a search term that clearly exists somewhere in the org's data?
