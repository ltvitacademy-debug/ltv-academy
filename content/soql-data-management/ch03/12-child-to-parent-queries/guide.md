# Child-to-Parent Queries

Parent-to-child queries needed a nested subquery, a relationship name, and its own `WHERE`.
The other direction — starting at a child record and reaching up to its parent's fields —
is genuinely simpler. No subquery, no parentheses. Just a dot.

## What you'll learn

- SOQL's dot-notation syntax for reaching up to a parent object's fields
- Why child-to-parent is structurally simpler than parent-to-child
- Dot notation with custom relationships (`__r`)

## The syntax: dot notation

```sql
SELECT Name, Account.Name
FROM Contact
```

That's the whole pattern. `Account.Name` reaches up from the Contact record to its parent
Account and pulls that Account's `Name` field, flattened right into the same row as the
Contact's own `Name`. No nested `SELECT`, no relationship-name plural, no separate `FROM`.
You just write `ParentRelationship.Field` in the outer query's field list, the same list
where every other field lives.

## Why this direction is simpler

Parent-to-child needed a subquery because one Account can have *many* Contacts — the result
has to represent a list within each row. Child-to-parent doesn't have that problem: every
Contact has exactly **one** Account (via a single lookup or master-detail field), so there's
nothing to nest. The parent's fields just become more fields on the same row:

```sql
SELECT Name, Account.Name, Account.Industry, Account.BillingCity
FROM Contact
WHERE Account.Industry = 'Technology'
```

Notice `Account.Industry` also works directly in the `WHERE` clause — you can filter Contact
records by a field that actually lives on the parent Account, in the same flat query, with
no subquery required either direction.

## Dot notation with custom relationships

Standard relationships (like Contact to Account) use the parent object's name directly:
`Account.Name`. Custom lookup or master-detail relationships use the relationship name with
a `__r` suffix instead of the field's own `__c` suffix:

```sql
SELECT Name, Account__r.Name, Account__r.Industry__c
FROM Invoice__c
```

`Account__r` is the relationship name for a custom lookup field (which would itself be
called `Account__c`) pointing at Account. The pattern to remember: `__c` names the field
that *stores* the relationship; `__r` names the relationship you *traverse* to reach the
parent's fields.

## Key terms

| Term | Meaning |
|---|---|
| Child-to-parent query | A SOQL query reaching up to a parent object's fields via dot notation |
| Dot notation | `Relationship.Field` syntax, no subquery required |
| `__r` | Suffix for a custom relationship name, used when traversing to a parent |

## Check yourself

Why doesn't a child-to-parent query need a nested subquery the way a parent-to-child query
does?
