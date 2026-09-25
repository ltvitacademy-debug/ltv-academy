# Querying Standard Objects

Everything so far has leaned on `Opportunity`. This lesson puts the same skills to work across
three more of Salesforce's core standard objects — `Account`, `Contact`, and `Case` — with
realistic field lists, so the shape of a good SOQL query starts to feel automatic no matter
which object you're pointed at.

## What you'll learn

- Realistic queries against `Account`, `Contact`, and `Case`
- How field names map to the kind of business data each standard object holds
- Why picking the right fields up front matters more in SOQL than in ad-hoc T-SQL

## Account: the company record

```sql
SELECT Id, Name, Industry, AnnualRevenue, BillingCity, BillingState
FROM Account
WHERE Industry = 'Technology'
  AND AnnualRevenue > 1000000
ORDER BY AnnualRevenue DESC
LIMIT 20
```

`Account` represents a company or organization. Notice the query reaches for `BillingCity` and
`BillingState` rather than a single flat "address" field — Salesforce splits address data into
several discrete fields, and you name each one you want, same as any other field.

## Contact: the person record

```sql
SELECT Id, FirstName, LastName, Email, Phone, Title, AccountId
FROM Contact
WHERE MailingState = 'GA'
  AND Email != null
ORDER BY LastName ASC
```

`Contact` represents an individual person, usually tied to an `Account` through the `AccountId`
lookup field. `Email != null` is a common, practical filter: it screens out contacts you have no
way to reach by email before you export or act on the list.

## Case: the support ticket record

```sql
SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate, ContactId
FROM Case
WHERE Status != 'Closed'
  AND Priority IN ('High', 'Critical')
ORDER BY CreatedDate ASC
```

`Case` represents a customer support ticket. This query is a realistic support-queue view: every
open case at High or Critical priority, oldest first — exactly the kind of list a support team
lead pulls to see what needs attention first.

## Reading field names like a native

A pattern worth internalizing across all three: Salesforce field names are consistently
descriptive — `BillingCity`, `MailingState`, `CreatedDate` — which makes an unfamiliar standard
object's field list fairly guessable once you've seen a few. That's a genuine advantage over
some T-SQL schemas where column names are abbreviated or inconsistent across tables.

## Key terms

| Term | Meaning |
|---|---|
| Account | Standard object representing a company or organization |
| Contact | Standard object representing an individual person, usually linked to an Account |
| Case | Standard object representing a customer support ticket |
| Lookup field | A field like AccountId or ContactId that links a record to a related object |

## Check yourself

Write a SOQL query against `Case` that returns `CaseNumber`, `Subject`, and `Status` for every
case with `Priority = 'Critical'` that is not yet `Closed`, sorted with the newest case first.
