# Sales Cloud vs. Service Cloud

Salesforce isn't one monolithic product — it's a shared platform with different "Clouds" built
on top of it for different jobs. The two you'll run into constantly as a data analyst are Sales
Cloud and Service Cloud. Knowing which one a report is pulling from (and why) is often the first
thing that tells you what a dataset actually means.

## What you'll learn

- What Sales Cloud is for, and the core object it revolves around
- What Service Cloud is for, and the core object it revolves around
- Why both sit on the same shared data model, and what that means for an analyst

## Sales Cloud: managing the sales pipeline

**Sales Cloud** is Salesforce's product for managing the sales process — everything from a
prospect's first contact to a signed deal. Its center of gravity is the sales pipeline: **Leads**
come in, get qualified, and convert into **Opportunities**, which sales reps push through stages
until they're won or lost. A sales manager pulling a Sales Cloud report is usually asking
pipeline questions: how much is in the pipeline this quarter, what's the close rate by rep, which
deals are stalling. If you're building a pipeline or forecast report, you're almost certainly
querying Sales Cloud objects.

## Service Cloud: managing customer support

**Service Cloud** is Salesforce's product for managing customer support after the sale closes.
Its center of gravity is the **Case** — a customer's question, complaint, or issue, tracked from
open to resolved. A support manager pulling a Service Cloud report is usually asking different
questions entirely: average time to resolve a case, case volume by channel, which agents are
overloaded. If a report is measuring support load or resolution time, it's a Service Cloud report,
not a Sales Cloud one — and mixing the two up is a fast way to hand a stakeholder the wrong
number.

## One shared platform underneath both

Here's the part that matters most for an analyst: Sales Cloud and Service Cloud aren't separate
databases. They're both built on the same core Salesforce platform, and they share foundational
objects — most importantly **Account** (the company) and **Contact** (the person). A single
Account can have Opportunities in Sales Cloud *and* Cases in Service Cloud at the same time,
because both products are just different views into the same underlying org. That's why a
question like "which of our biggest accounts are also our biggest support burden" is answerable
at all — it's a join across Sales Cloud and Service Cloud data sitting on one shared model, not
two different systems bolted together after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Sales Cloud | Salesforce product for managing the sales pipeline (Leads → Opportunities) |
| Service Cloud | Salesforce product for managing customer support (Cases) |
| Opportunity | A Sales Cloud object representing an in-progress or closed deal |
| Case | A Service Cloud object representing a customer support issue |
| Account / Contact | Shared objects both Sales Cloud and Service Cloud build on |

## Check yourself

Why can an analyst join Sales Cloud data (like Opportunities) with Service Cloud data (like
Cases) for the same customer, without needing to combine two separate systems?
