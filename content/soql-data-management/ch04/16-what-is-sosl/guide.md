# What Is SOSL?

Everything so far has been SOQL, and SOQL always starts from one object: `FROM Account`,
`FROM Opportunity`. But some questions don't start from an object. A user types "Acme" in a
search box and wants every record that mentions it, whether it's an Account, a Contact, a
Lead, or something else. That's a different job, and Salesforce has a second language for it.

## What you'll learn

- What SOSL is and how it differs in purpose from SOQL
- The `FIND ... IN ... RETURNING` syntax
- The search scopes, and what SOSL can and cannot match

## SOSL is a search language

**SOSL** stands for Salesforce Object Search Language. Where SOQL is like T-SQL, SOSL is
closer to a full-text search: you give it a word or phrase, and it looks for that text across
the fields and objects you name. It works from a search index rather than scanning tables
row by row, which is what lets it search many objects in one request.

## The syntax

```sql
FIND {Acme}
IN ALL FIELDS
RETURNING Account, Contact, Lead
```

Read it as three parts:

- `FIND {Acme}` is the search term. The braces are required.
- `IN ALL FIELDS` is the search scope: which kinds of fields to look through.
- `RETURNING Account, Contact, Lead` lists the objects whose matching records you want back.

There is no `FROM` and no `WHERE`. The term goes in braces, and the objects go in
`RETURNING`. You can also add `LIMIT` at the end to cap the number of results.

## Search scopes

The `IN` clause limits which fields SOSL looks through:

| Scope | Searches |
|---|---|
| `ALL FIELDS` | Every searchable text field (the default if you leave `IN` out) |
| `NAME FIELDS` | Name fields only |
| `EMAIL FIELDS` | Email fields only |
| `PHONE FIELDS` | Phone fields only |
| `SIDEBAR FIELDS` | The fields the Salesforce sidebar search uses |

Narrowing the scope makes results more relevant. Searching `EMAIL FIELDS` for a domain name,
for instance, won't return a Lead whose description merely mentions it.

## What the search term can do

The match is not case-sensitive, and you can use two wildcards: `*` matches any number of
characters, and `?` matches exactly one.

```sql
FIND {Acme*} IN NAME FIELDS RETURNING Account, Contact
```

That finds records whose name fields contain a word starting with "Acme". Phrases go in
double quotes inside the braces: `FIND {"Acme Corporation"}`.

## What SOSL can and cannot do

- It searches **text**: text, email, and phone fields, and similar. It does not match
  numbers or dates.
- It returns **up to 2,000 records** in total.
- It works from a search index, so a record you just created or edited can take a moment to
  become searchable.
- If you leave off `RETURNING`, you get record Ids for every searchable object that matched.
  Naming objects, and the fields you want from each, is how you get useful results. Lesson 18
  covers that in detail.

## Key terms

| Term | Meaning |
|---|---|
| SOSL | Salesforce Object Search Language: text search across multiple objects |
| `FIND {term}` | The required search term, in braces |
| Search scope | The `IN` clause, such as `ALL FIELDS` or `EMAIL FIELDS` |
| `RETURNING` | Lists the objects (and optionally fields) to return |
| Wildcards | `*` for any number of characters, `?` for exactly one |

## Check yourself

What is the SOSL statement to find every Account, Contact and Lead mentioning "Acme" in any
searchable field? Which clause from a SOQL query is missing entirely, and what takes its place?
