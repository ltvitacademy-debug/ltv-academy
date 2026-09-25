# Querying Custom Objects

Standard objects like Account and Case ship with every org. But almost every real
Salesforce org also has **custom objects and custom fields** that someone built to model the
business: projects, subscriptions, assets, inspections. This lesson closes Chapter One by
showing how SOQL reaches them, and the single naming rule that catches nearly every beginner.

## What you'll learn

- What the `__c` suffix means and where it goes
- How to query a custom object and its custom fields
- How to reach a related record through a custom lookup with `__r`
- How to find the right API names and read the most common error

## The `__c` suffix

Every custom object and custom field has an API name that ends in two underscores and a
lowercase `c`. When an admin creates an object labeled "Project", Salesforce generates the
API name `Project__c`. A field labeled "Start Date" becomes `Start_Date__c`, because spaces
in the label are replaced with underscores.

```sql
SELECT Id, Name, Status__c, Budget__c, Start_Date__c
FROM Project__c
WHERE Status__c = 'Active'
  AND Budget__c > 50000
ORDER BY Start_Date__c DESC
LIMIT 20
```

Everything else about the query is the same as Lesson 5. `Status__c` is a picklist, so it
takes a quoted string. `Budget__c` is a currency field, so it takes a bare number.
`Start_Date__c` is a date field, so it sorts chronologically. Notice that `Id` and `Name`
have no suffix: every custom object gets those **standard fields** automatically, along with
`CreatedDate`, `LastModifiedDate`, and `OwnerId`.

## Custom fields on standard objects

The `__c` suffix is not reserved for custom objects. Admins add custom fields to standard
objects all the time, and those fields carry the suffix too.

```sql
SELECT Id, Name, Industry, Region__c, Customer_Tier__c
FROM Account
WHERE Customer_Tier__c = 'Gold'
```

Here `Account` is a standard object with no suffix, while `Region__c` and `Customer_Tier__c`
are custom fields added on top of it. A useful rule: the suffix belongs to whichever thing is
custom, whether that is the object, the field, or both.

## Custom lookups and `__r`

A custom lookup field, such as `Account__c` on `Project__c`, stores the `Id` of an Account.
To read a field on the related record you switch the suffix from `__c` to `__r`, which stands
for **relationship**, and use dot notation.

```sql
SELECT Name, Budget__c, Account__c, Account__r.Name
FROM Project__c
WHERE Account__r.Industry = 'Technology'
```

`Account__c` returns the raw `Id`. `Account__r.Name` follows the relationship and returns the
name of that Account, and it can also be used in `WHERE`. The full story of relationship
traversal is Chapter 3; for now, remember the pairing: `__c` is the field that holds the
`Id`, `__r` is the name you use to walk through it. Standard lookups follow the same pattern
without the suffix, as in `Account.Name` on a Contact.

## Finding names, and reading the error

The API name you need is never a guess. Open Setup, then Object Manager, choose the object,
and read Fields & Relationships. Forgetting the suffix is the classic mistake, and Salesforce
tells you exactly what happened:

```
No such column 'Budget' on entity 'Project__c'.
If you are attempting to use a custom field, be sure to
append the '__c' after the custom field name.
```

That same error can also appear when the field exists but the user running the query has no
field-level security access to it, so if the suffix is right and it still fails, check
permissions. Fields that come from an installed managed package add a namespace prefix as
well, such as `acme__Score__c`; copy the full name from Object Manager.

## Chapter One in review

You can now read and write SOQL's SELECT, FROM, WHERE, ORDER BY, and LIMIT clauses. You know
what SOQL does differently from T-SQL: no `SELECT *`, no arbitrary `JOIN`, and no data
changes. You have queried Account, Contact, Case, and custom objects. Chapter Two moves from
listing records to summarizing them.

## Key terms

| Term | Meaning |
|---|---|
| Custom object | An object an admin or developer created, with an API name ending in `__c` |
| Custom field | A field an admin added to any object, with an API name ending in `__c` |
| `__r` | The relationship name for a custom lookup, used in dot notation to reach the related record's fields |
| Standard field | A field every object receives automatically, such as `Id`, `Name`, and `CreatedDate`, with no suffix |
| Namespace prefix | A package-specific prefix added to names from managed packages, such as `acme__Score__c` |

## Check yourself

A query `SELECT Name, Budget FROM Project__c` fails. What is wrong, what does the error
message tell you, and if you fix that and it still fails, what would you check next?
