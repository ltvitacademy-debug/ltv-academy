# Lesson 17 — Query Practice: Service Data

**Chapter 3 · Search and SOSL · Lesson 17 of 23**

## What you'll learn

- Applying SOQL and SOSL together against Case/service data, a different object shape than sales data
- Handling polymorphic fields that show up naturally in service scenarios
- A worked SOSL-then-SOQL pattern for a support search feature
- Spotting when a service question needs a null check versus a straightforward filter

## Why service data is a useful second practice domain

`Case` and its related objects (`Contact`, `Account`, `CaseComment`, and activities like `Task`/`Event`) give you a different flavor of question than the sales examples in Lesson 16 — more free-text searching (case subjects and descriptions), more status/priority grouping, and the `Task`/`Event` polymorphic `WhatId`/`WhoId` fields from Lesson 12 showing up for real, not just as a textbook example.

## Question 1: "Find every open, high-priority case for a given account."

A straightforward filtered child-to-parent query:

```sql
SELECT Id, Subject, Status, Priority, CreatedDate
FROM Case
WHERE Account.Name = 'Acme Corporation'
AND IsClosed = false
AND Priority = 'High'
ORDER BY CreatedDate ASC
```

## Question 2: "How many cases, and the average time open, are there per status, for cases opened in the last 30 days — only for statuses with at least 5 cases?"

`GROUP BY` plus `HAVING` plus a date literal, same combination from Lesson 16, different object:

```sql
SELECT Status, COUNT(Id) caseCount
FROM Case
WHERE CreatedDate = LAST_N_DAYS:30
GROUP BY Status
HAVING COUNT(Id) >= 5
ORDER BY caseCount DESC
```

(Average *time* open specifically would need a duration field or formula — SOQL's aggregates summarize existing field values, they don't calculate elapsed time between two dates on their own, which is a limitation worth knowing rather than assuming SOQL can do.)

## Question 3: a support search feature

A support agent types a customer's name or phone number into a single search box, and needs matching cases, contacts, and accounts back in one call. This is the SOSL-then-SOQL pattern from Lesson 14:

```sql
FIND {555-0142} IN PHONE FIELDS
RETURNING Contact(Id, FirstName, LastName, Phone), Account(Id, Name, Phone)
```

Once you have a matching `Contact` or `Account` ID back from the search, a follow-up SOQL semi-join pulls that person's or company's open cases:

```sql
SELECT Id, Subject, Status
FROM Case
WHERE ContactId IN ('0031...', '0032...')
AND IsClosed = false
```

This two-step pattern — SOSL to find *who*, SOQL to pull *their open cases* — is close to exactly how a real console search feature works under the hood.

## Question 4: a polymorphic activity question

"List every logged call (`Task`) related to either an `Account` or a `Case`, with different fields depending on which":

```sql
SELECT TYPEOF What
    WHEN Account THEN Name, Phone
    WHEN Case THEN CaseNumber, Status
    ELSE Id
END
FROM Task
WHERE Subject = 'Call'
```

## Key terms

| Term | Meaning |
|---|---|
| SOSL-then-SOQL pattern | Using a SOSL search to find candidate people/companies by free text, then a SOQL semi-join to pull their related records |
| Aggregate vs. calculated duration | SOQL aggregates summarize existing field values; they don't calculate elapsed time between two dates by themselves |

## Lab

Using sample `Case`, `Contact`, and `Account` data in a Developer Edition org, build the SOSL-then-SOQL support search pattern end to end: search for a contact by name across `NAME FIELDS`, then write a follow-up SOQL query that pulls every open case for whichever contact ID(s) came back. Confirm the two-step result matches what a single, more complex query would have to do in one pass.

## Check yourself

Why can't a single SOQL aggregate function calculate "average time a case stayed open" directly from CreatedDate and ClosedDate without a stored duration field? What's the advantage of the SOSL-then-SOQL pattern over trying to do the whole support search in one SOQL query?
