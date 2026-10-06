# Leads, Opportunities, and Cases

**Chapter 1 · Objects · Lesson 4 of 23**

Account and Contact (Lesson 3) answer *who* the data is about. Lead, Opportunity, and Case answer
*what's happening* to them — a prospect being worked, a deal in progress, a problem being resolved.

## What you'll learn

- What a Lead is, and why it's kept separate from Account/Contact until it's qualified
- What Lead conversion actually creates
- What an Opportunity tracks, and how Case fits on the service side

## Lead: not a customer yet

A **Lead** represents an unqualified prospect — a person or company that hasn't been confirmed as a
real sales opportunity. Leads are intentionally siloed from Account, Contact, and Opportunity: a
Lead record has its own Status field (New, Working - Contacted, Closed - Not Converted...) and its
own Activity timeline, separate from the "real" Sales Cloud objects.

## Convert: where a Lead becomes real data

Clicking **Convert** on a Lead is a one-step action that typically creates:

- A new **Account** (or links to an existing one)
- A new **Contact** (or links to an existing one)
- A new **Opportunity** (optional — there's a checkbox to skip this)

All three are pre-filled from whatever data the Lead already had. This is the one moment the Lead
object hands off to the rest of the data model — after conversion, the Lead record becomes read-only
and the real work continues on the Account, Contact, and Opportunity it created.

## Opportunity: a deal, tracked to a close

An **Opportunity** represents a specific deal in progress. Its defining feature is the **stage**,
shown as a path across the top of the record (Prospecting → Qualification → ... → Closed Won /
Closed Lost). Opportunities also carry an Amount and a Close Date, which is what makes pipeline and
forecast reporting possible — a topic this course returns to in a later course on Reports &
Dashboards.

## Case: the service side

A **Case** represents a customer service issue or request — a question, a complaint, a bug report.
Cases are typically tied to an Account and/or Contact, so a support rep can see a customer's full
history. Like Leads and Opportunities, Cases can be reassigned — **Change Owner** moves a case to a
different rep or to a queue, which is how teams distribute incoming case volume.

## Key terms

| Term | Meaning |
|---|---|
| Lead | An unqualified prospect, kept separate from Account/Contact until converted |
| Convert | The action that turns a Lead into an Account, Contact, and (optionally) an Opportunity |
| Opportunity | A tracked deal, moving through stages toward Closed Won or Closed Lost |
| Case | A customer service issue, typically tied to an Account and/or Contact |

## Recap

- Leads are deliberately separate from Account/Contact/Opportunity until converted.
- Convert creates an Account, a Contact, and (optionally) an Opportunity from one Lead.
- An Opportunity's stage path and Case's owner/queue are both about tracking work in progress.

## Check yourself

A Lead is converted with the "Don't create an opportunity upon conversion" box checked. What two
objects does that conversion still create?
