# Multi-Object Search

You know what SOSL is and when to use it. This lesson is the working example: a real
multi-object search that returns exactly the fields you want from each object, and filters
each object separately. It's the chapter finale, so we'll build it in steps.

## What you'll learn

- How to return specific fields per object in `RETURNING`
- How to filter, sort and cap each object's results independently
- How to read multi-object results

## Step 1: the scenario

A prospect emails from `acme.com`. You want every Account, Contact and Lead connected to
that name, with the fields you'd actually use to follow up. Start with the bare search:

```sql
FIND {Acme} IN ALL FIELDS
RETURNING Account, Contact, Lead
```

That works, but without field lists it returns only record Ids. Not very useful.

## Step 2: choose fields for each object

Put the fields you want in parentheses after each object name:

```sql
FIND {Acme} IN ALL FIELDS
RETURNING
  Account(Id, Name, Industry, BillingCity),
  Contact(Id, FirstName, LastName, Email, Title),
  Lead(Id, Name, Company, Status)
```

Each object gets its own field list, because each object has different fields that matter.
The list is comma-separated and there is no `SELECT` keyword. This is what makes multi-object
search practical: a single statement returns Account details, Contact details and Lead
details together, each shaped for its own object.

## Step 3: filter each object separately

Inside each object's parentheses you can add `WHERE`, `ORDER BY` and `LIMIT`. They apply to
that object only:

```sql
FIND {Acme} IN ALL FIELDS
RETURNING
  Account(Id, Name, Industry WHERE Industry = 'Technology' ORDER BY Name LIMIT 10),
  Contact(Id, FirstName, LastName, Email ORDER BY LastName),
  Lead(Id, Name, Company, Status WHERE IsConverted = false)
```

Now the text search finds "Acme" everywhere, then:

- Accounts are limited to the Technology industry, sorted by name, ten at most.
- Contacts are sorted by last name.
- Leads exclude any already converted.

That is how you combine SOSL's text matching with SOQL-style precision. The `WHERE` is a
real filter, so this is also where you'd use the numeric and date conditions that the search
term itself can't handle.

## Step 4: reading the results

A SOSL result is grouped by object, one group per object named in `RETURNING`, not a single
flat table. In Apex, you write the statement in square brackets and get back a list of lists,
in the same order as `RETURNING`:

```apex
List<List<SObject>> results = [
  FIND 'Acme' IN ALL FIELDS
  RETURNING Account(Id, Name), Contact(Id, LastName), Lead(Id, Name)
];
List<Account> accounts = (List<Account>) results[0];
List<Contact> contacts = (List<Contact>) results[1];
```

Note Apex uses quotes around the term where the API form uses braces. Tools like Workbench,
which you'll meet later in this course, present SOSL results grouped by object too.

## Common mistakes

- **Forgetting field lists.** Without them you get only Ids.
- **Expecting one combined table.** Each object's results are separate, with different
  columns.
- **Overly broad terms.** A short term across ALL FIELDS can hit the 2,000-record cap. Narrow
  the scope, add `LIMIT`, or filter per object.

## Key terms

| Term | Meaning |
|---|---|
| `RETURNING Object(fields)` | Names an object and the fields to return for it |
| Per-object clauses | `WHERE`, `ORDER BY` and `LIMIT` inside an object's parentheses |
| List of lists | How Apex returns SOSL results: one list per object, in `RETURNING` order |
| Result cap | SOSL returns up to 2,000 records in total |

## Check yourself

Write a SOSL search for "Northwind" across Account, Contact and Lead that returns `Name` and
`Industry` for Accounts, `LastName` and `Email` for Contacts, and `Name`, `Company` and
`Status` for Leads, excluding converted Leads.
