# Connecting Leads, Accounts, Contacts & Opportunities

Every Project 1 question crosses object boundaries. "Which lead sources convert?" starts on Leads and ends on Opportunities. "Which accounts drive revenue?" starts on Accounts. Before you build a single report, you need to know which objects carry which fields, how they relate, and where the connections break. You already learned the data model in Salesforce Fundamentals, so this lesson recaps it quickly and applies it to Alder & Vale.

## What you'll learn

- How records connect: lead conversion, account lookups, and contact roles
- Which report type answers which Project 1 question
- How to follow relationships in SOQL, both up to a parent and down to children
- The data-quality checks to run before trusting any number

## The connection map

Recall how a sale flows through the platform:

- A **Lead** is an unqualified prospect. When a rep converts it, Salesforce creates an **Account** (the company), a **Contact** (the person), and usually an **Opportunity** (the potential deal). The lead keeps a permanent record of that event in fields such as `IsConverted`, `ConvertedDate`, `ConvertedAccountId`, `ConvertedContactId`, and `ConvertedOpportunityId`.
- An **Opportunity** looks up to one **Account** (`AccountId`) and has an **Owner**, the user who owns the deal. Here, that is one of the six Alder & Vale reps.
- A **Contact** relates to an Opportunity through **Opportunity Contact Roles**, a junction that lets one deal involve several people.
- The **Lead Source** on a lead is carried onto the opportunity during conversion, which is what lets you trace revenue back to where it originated.

The lesson for analysis: conversion links a lead to its downstream records, but only when reps actually convert leads rather than creating opportunities by hand.

## Match the question to the report type

| Project 1 question | Report type |
|---|---|
| Which lead sources convert? | Leads |
| Where did converted leads end up? | Leads with Converted Lead Information |
| Pipeline and coverage | Opportunities |
| Rep pacing | Opportunities, grouped by Opportunity Owner |
| Deal size and cycle | Opportunities |
| Who is involved in a deal? | Opportunities with Contact Roles |
| Which accounts have (or lack) deals? | Accounts, with a cross filter on Opportunities |

The Accounts row uses a **cross filter**: "Accounts with Opportunities," or "without," depending on whether you are finding customers or untouched targets.

## Following relationships in SOQL

Some questions are faster to answer with a query. SOQL follows relationships with dot notation when moving up to a parent:

```sql
SELECT Name, Amount, StageName,
       Account.Name, Owner.Name
FROM Opportunity
WHERE IsClosed = false
```

Going down to children uses a subquery on the child relationship name, which for opportunities under an account is `Opportunities`:

```sql
SELECT Name,
       (SELECT Name, Amount FROM Opportunities)
FROM Account
```

Use whichever fits the moment: reports when someone else needs to reuse the result, SOQL when you are exploring or auditing.

## Data quality checks before you analyze

A wrong number that looks right is worse than no number. Before Lesson 6, run these checks:

- **Blank lead sources.** Any lead source analysis silently drops records with none. Count them first.
- **Missing amounts.** Opportunities with a null `Amount` distort averages.
- **Converted leads with no opportunity.** Conversion allows skipping the opportunity, so these leads convert without any pipeline:

```sql
SELECT COUNT(Id) FROM Lead
WHERE IsConverted = true
AND ConvertedOpportunityId = null
```

- **Opportunities with no contact role.** An anti-join finds them:

```sql
SELECT Id, Name FROM Opportunity
WHERE Id NOT IN
  (SELECT OpportunityId FROM OpportunityContactRole)
```

- **Stale close dates.** Open opportunities whose close date has already passed inflate pipeline. Decide with the business how to treat them, and write that decision into your definitions.

Record what you find. Data limitations belong in your final write-up.

## Recap

Leads convert into an Account, a Contact, and an Opportunity, and the Opportunity keeps its Account and Owner. Choose the report type that already contains the fields your question needs, use cross filters for account-level questions, and use SOQL to follow relationships or to audit. Always check for blanks, nulls, and orphaned records before analyzing.

## Check yourself

A rep creates an opportunity manually instead of converting the lead that produced it. Which Project 1 question becomes harder to answer, and why?
