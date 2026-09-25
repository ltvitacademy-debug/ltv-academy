# Querying Standard Objects

The last four lessons taught SOQL's grammar one clause at a time. This lesson puts the pieces
together on the three standard objects you will query more than any others in a real org:
**Account**, **Contact**, and **Case**. Each one comes with a realistic field list, a real
filter, and a habit worth building.

## What you'll learn

- The fields you actually reach for on Account, Contact, and Case
- How to combine SELECT, WHERE, ORDER BY, and LIMIT in one realistic query
- How a lookup field like `AccountId` links one object to another
- Why you should confirm field API names before you write the query

## Account: the company

```sql
SELECT Id, Name, Type, Industry, AnnualRevenue,
       NumberOfEmployees, BillingCity, BillingState
FROM Account
WHERE Industry = 'Technology'
  AND AnnualRevenue > 1000000
ORDER BY AnnualRevenue DESC
LIMIT 25
```

`Industry` and `Type` are picklists, so the value you filter on has to match one of your
org's real picklist values. `AnnualRevenue` is a currency field, so you compare it to a bare
number with no quotes and no currency symbol. The billing address is stored as separate
fields (`BillingStreet`, `BillingCity`, `BillingState`, `BillingPostalCode`,
`BillingCountry`), which is why you name `BillingCity` and `BillingState` individually.

## Contact: the person

```sql
SELECT Id, FirstName, LastName, Email, Phone,
       Title, Department, AccountId
FROM Contact
WHERE Email != null
  AND AccountId != null
ORDER BY LastName, FirstName
```

Two things to notice. First, `!= null` is how SOQL tests for a populated field; it works the
same way as `IS NOT NULL` in T-SQL. Second, `AccountId` is a **lookup field**: it stores the
`Id` of the Account the contact belongs to. It is the link between the two objects, and you
already know from Lesson 4 that SOQL has no arbitrary `JOIN`, so this stored `Id` is what
relationship queries in Chapter 3 will follow.

## Case: the support request

```sql
SELECT Id, CaseNumber, Subject, Status, Priority,
       Origin, AccountId, ContactId, CreatedDate
FROM Case
WHERE IsClosed = false
  AND Priority = 'High'
ORDER BY CreatedDate DESC
LIMIT 50
```

`CaseNumber` is the human-readable number a support agent sees (like `00001026`), while `Id`
is the real unique identifier. `IsClosed` is a boolean field Salesforce maintains for you
based on the case's `Status`, so filtering `IsClosed = false` is safer than listing every
open status by name, because each org defines its own status values. Booleans are written
`true` and `false` with no quotes.

## Check the API name before you query

The label a user sees on a page layout is not always the API name you type in SOQL. Before
writing a query against an unfamiliar object, open Setup, go to Object Manager, choose the
object, and read the **Fields & Relationships** list: it shows each field's API name and
data type. SOQL is not case-sensitive for field names, but a misspelled or non-existent name
fails immediately with an error like `No such column`, which is a much better failure than
a silently wrong result.

## Key terms

| Term | Meaning |
|---|---|
| Standard object | An object that ships with Salesforce itself, such as Account, Contact, Case, or Opportunity |
| Lookup field | A field that stores the `Id` of a related record, such as `AccountId` on Contact |
| Picklist | A field limited to a defined list of values, such as `Industry` or `Priority` |
| CaseNumber | The auto-generated, human-readable case number, distinct from the record's `Id` |
| API name | The exact field or object name used in SOQL, visible in Object Manager |

## Check yourself

You need every open, high-priority Case, newest first, capped at 50 rows. Which fields and
clauses would you use, and why is `IsClosed = false` a safer filter than checking `Status`
against a list of names?
