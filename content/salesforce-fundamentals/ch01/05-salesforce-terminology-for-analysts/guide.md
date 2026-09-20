# Salesforce Terminology for Analysts

Every Salesforce conversation you'll have — with a sales manager, another analyst, or in
Salesforce's own documentation — assumes you know a small set of core vocabulary. This lesson is
that vocabulary. None of it is complicated, but getting it precise now means the rest of this
course (and every SOQL query you write later) won't trip over words that quietly mean something
more specific than they sound like.

## What you'll learn

- The six terms that come up constantly: org, object, record, field, tab, app
- How these terms relate to each other, in plain concrete terms
- Why precision here prevents real confusion later

## Org, object, and record: the three layers of "the data"

An **org** (short for organization) is one complete, self-contained Salesforce instance — your
company's whole Salesforce environment, with its own data, users, and configuration, separate
from any other company's org. Inside an org, an **object** is a table-like structure that defines
a type of thing being tracked — Account, Contact, Opportunity, and Case are all objects. A
**record** is one specific instance of an object — not "the Account object" in the abstract, but
one particular company's Account, like "Acme Corp." If object is the table, record is the row.

## Field, tab, and app: how you see and interact with data

A **field** is one piece of data on an object — Amount and Close Date are fields on the
Opportunity object; Email and Phone are fields on the Contact object. Every record has a value (or
a blank) in each of its object's fields. A **tab** is the clickable UI element on the navigation
bar (covered in Lesson 4) that opens a list view of records for a given object. And an **app** is
a bundled collection of tabs and configuration, presented together for a specific job — Sales
Cloud's Sales app bundles the tabs a sales rep needs; Service Cloud's Service app bundles what a
support agent needs. Same org, same underlying objects, different app depending on who's using it
and why.

## Why precision matters here

These words get used loosely in casual conversation — someone might say "pull that field" when
they mean "pull that record," or "the Opportunities app" when they mean "the Opportunities tab."
As an analyst, precision protects you: when you eventually write `SELECT Amount FROM Opportunity
WHERE StageName = 'Closed Won'`, you're querying an **object** (Opportunity), for specific
**fields** (Amount, StageName), across every matching **record** in the **org**. Every one of
those words in the query maps directly back to a term from this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Org | One complete, self-contained Salesforce instance/environment |
| Object | A table-like structure defining a type of thing tracked (Account, Contact, etc.) |
| Record | One specific instance of an object (one particular Account) |
| Field | One piece of data on an object (Amount, Email, Close Date) |
| Tab | The clickable navigation-bar element that opens a list view for an object |
| App | A bundled set of tabs/configuration for a specific job (Sales app, Service app) |

## Check yourself

Using this lesson's vocabulary precisely: is "Acme Corp" an object or a record? Is "Amount" an
object, a field, or a record?
