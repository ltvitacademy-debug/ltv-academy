# Lesson 15 — Searching Multiple Objects

**Chapter 3 · Search and SOSL · Lesson 15 of 23**

## What you'll learn

- Writing a single SOSL search that returns results from several object types at once
- How the returned result is shaped in Apex, and how to unpack it
- Adding per-object filters and per-object LIMIT inside RETURNING
- Using OFFSET to page through a single-object search

## One search, several objects

The real power of `RETURNING` is listing more than one object, each with its own field list, in a single `FIND`:

```sql
FIND {Acme} IN ALL FIELDS
RETURNING Account(Id, Name), Contact(Id, FirstName, LastName), Lead(Id, Name, Company)
```

One search call checks `Account`, `Contact`, and `Lead` simultaneously for anything matching "Acme," returning matches from all three in one response — this is exactly the shape of a global search feature's backing query.

## How this looks in Apex

In Apex, a SOSL search returns a `List<List<SObject>>` — an outer list with one inner list per object type named in `RETURNING`, in the same order you listed them:

```apex
List<List<SObject>> searchResults = [
    FIND 'Acme' IN ALL FIELDS
    RETURNING Account(Id, Name), Contact(Id, FirstName, LastName)
];
List<Account> foundAccounts = (List<Account>) searchResults[0];
List<Contact> foundContacts = (List<Contact>) searchResults[1];
```

Position matters here — `searchResults[0]` corresponds to the first object named in `RETURNING`, `searchResults[1]` to the second, and so on. Getting the order wrong (or the object count wrong, after editing the query later and forgetting to update the Apex) is a very real, very common bug — it's worth a defensive comment in the code next to a multi-object SOSL search reminding future-you (or a reviewer) which index maps to which object.

## Per-object filtering and limits inside RETURNING

Each object inside `RETURNING` can carry its own `WHERE` and `LIMIT`, independent of the others:

```sql
FIND {Acme} IN ALL FIELDS
RETURNING
    Account(Id, Name WHERE Industry = 'Technology' LIMIT 10),
    Contact(Id, FirstName, LastName WHERE Email != null LIMIT 25)
```

This narrows the `Account` matches to Technology-industry accounts only, caps them at 10, and separately caps matching `Contacts` with a non-null email at 25 — each object's slice of the overall search tuned independently, without touching the other.

## Paging with OFFSET

When a search targets a single object, you can add `OFFSET` to page through results, the same idea as SOQL's `OFFSET` from Chapter 1, with the same 2,000-row documented ceiling:

```sql
FIND {Acme} IN ALL FIELDS
RETURNING Account(Id, Name ORDER BY Name LIMIT 100 OFFSET 100)
```

That fetches the second page of 100 matching accounts. Two restrictions worth remembering: `OFFSET` in SOSL only works when the search targets a single object (not the multi-object pattern from earlier in this lesson), and it must be the last clause in that object's sub-clause.

## Key terms

| Term | Meaning |
|---|---|
| Multi-object RETURNING | Listing several objects, each with its own field list, in one FIND statement |
| List<List<SObject>> | The Apex return type for a SOSL search; one inner list per RETURNING object, in listed order |
| Per-object WHERE/LIMIT | A filter and row cap scoped to just one object inside a multi-object RETURNING clause |

## Lab

Write a SOSL search in a Developer Edition org that returns matches from `Account`, `Contact`, and `Lead` in one `FIND`, each with its own field list and its own `LIMIT`. Run it in Apex, unpack the resulting `List<List<SObject>>` into three typed lists, and print the count found for each object type.

## Check yourself

In Apex, how do you know which inner list in a SOSL search's List<List<SObject>> result corresponds to which object? Why can OFFSET only be used in a SOSL search that targets a single object, not a multi-object RETURNING search?
