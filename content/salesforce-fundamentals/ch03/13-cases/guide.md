# Cases

Chapter 2 covered the Sales Cloud objects that track a deal before it closes. Chapter 3
shifts to what happens after the sale: a customer has a problem, and Service Cloud exists
to track and resolve it. The core object for that is **Case** — and as an analyst, Case
data is where you'll find support volume, response times, and customer-satisfaction
signals.

## What you'll learn

- What a Case record actually represents
- The key fields that make Case data reportable: Status, Priority, Origin, Case Number
- How Cases connect to the Accounts and Contacts you already know from Chapter 2

## Case: a tracked customer support request

A **Case** is a single customer question, problem, or request for help — a support ticket,
in plain language. A customer emails in with a billing question, calls in about a broken
feature, or opens a chat asking how to use something: each of those becomes one Case
record. Just like a Lead or an Opportunity, a Case is a row in a table with fields that
describe it, and every Case rolls up into the reporting an analyst is asked to produce:
how many cases came in this week, how fast are they getting resolved, which customers are
filing the most of them.

Cases relate to the objects you already know. A Case typically has a lookup to the
**Contact** who filed it and the **Account** that Contact belongs to — which is exactly
why the Chapter 2 groundwork on Accounts and Contacts matters here. A support case isn't
a floating, standalone record; it's tied to a real customer relationship, and reporting on
"cases per account" only works because that relationship exists in the data model.

## The fields that make a Case reportable

A handful of fields carry almost all the analytical weight on the Case object:

- **Case Number** — a system-generated, sequential, read-only identifier (like
  `00001026`). You never set it; Salesforce assigns it the moment the Case is created, and
  it's the number a support rep reads back to a customer over the phone.
- **Status** — a picklist tracking where the case is in its lifecycle: values like New,
  Working, Escalated, and Closed are common, though the exact list is configured per org
  (Chapter 4 covers why picklist values vary org to org). Status is the single most-used
  field for support dashboards — "open cases," by definition, means Status is not in a
  closed value.
- **Priority** — a picklist like Low, Medium, High, or Urgent, reflecting how urgently the
  case needs attention. Analysts use it to check whether high-priority cases are actually
  getting resolved faster than low-priority ones.
- **Origin** — a picklist recording the channel the case came in through: Email, Phone,
  Web, or Chat are typical values. Origin is what lets an analyst answer "which support
  channel generates the most volume?"

Subject and Description hold the free-text detail of what the customer actually said, and
Case Owner tracks which support rep (or queue) is responsible for working it.

## Key terms

| Term | Meaning |
|---|---|
| Case | A single customer support request or ticket, tracked as one record |
| Case Number | System-generated, sequential, read-only identifier for a Case |
| Status | Picklist tracking a Case's position in its lifecycle (e.g. New, Working, Closed) |
| Priority | Picklist reflecting how urgently a Case needs attention |
| Origin | Picklist recording the channel a Case came in through (Email, Phone, Web, Chat) |

## Check yourself

Why does a Case record typically carry lookups to both a Contact and an Account, rather
than standing alone? What kind of report would break if that relationship didn't exist?
