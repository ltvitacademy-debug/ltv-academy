# Putting It Together: What an Analyst Actually Needs

This is the last lesson of Salesforce Fundamentals for Data Analysts. Lesson 1 promised this
course wouldn't teach SOQL first — it would build the platform understanding underneath it.
Six chapters later, that promise is kept. This lesson recaps what you actually built, and
hands it directly to the next course in the path.

## What you'll learn

- A structured recap of everything this course covered, in the order it actually matters
- Why platform, data model, and security understanding are inseparable for a real analyst
- What "SOQL & Salesforce Data Management," the next course in this path, assumes you already
  know

## What you actually know now

- **The platform (Chapters 1–2).** What Salesforce is, where it sits in the CRM market, how
  editions and the AppExchange shape a real org, and the core Sales Cloud objects — Leads,
  Accounts, Contacts, Opportunities, Campaigns, Activities — that almost every analyst project
  touches.
- **Fields and customization (Chapters 3–4).** Standard vs. custom fields, field types that
  actually change how you'd query and interpret data (picklists, formulas, roll-ups), and how
  to read a custom field the way an analyst — not an admin — needs to.
- **The data model (Chapter 5).** Lookup vs. Master-Detail relationships and the real
  consequences of each (cascade delete, inherited security, roll-up eligibility), the junction
  object pattern for many-to-many, Schema Builder as a visual diagnostic tool, and a repeatable
  process for reading an unfamiliar org's data model before writing a single query.
- **Security (Chapter 6).** Licenses as the hard ceiling on access, the Role Hierarchy's
  upward-flowing default visibility, Profiles as the mandatory baseline with Permission Sets
  stacked additively on top, Sharing Rules extending visibility by ownership or criteria, and
  Field-Level Security as the finest-grained, most easily overlooked layer of all.

## Why none of this is optional before SOQL

Every one of those pieces answers a question SOQL syntax alone cannot answer for you. SOQL can
tell you how to write `SELECT Amount FROM Opportunity WHERE StageName = 'Closed Won'`. It
cannot tell you whether `Amount` means what you think it means in this specific org, whether
the Opportunity records you're seeing are all of them or only the ones your role and sharing
rules expose to you, or whether a field you expected in the results is silently missing
because of FLS. A technically perfect query built on a wrong mental model of the data produces
a confident, wrong number — and that's precisely the analyst mistake this course was built to
prevent, all the way back from Lesson 1.

## What comes next

The next course in the Salesforce Data Analyst path is **SOQL & Salesforce Data
Management** — the T-SQL-to-Salesforce bridge, teaching SOQL, SOSL, Data Loader, Workbench,
data quality, and data migration, assuming exactly the platform and data-model understanding
this course just built. You're not starting that course from zero. You're starting it knowing
what an Opportunity actually represents, how it relates to the objects around it, who can see
it, and why a query result might not mean what it appears to mean — which is the entire point.

## Key terms

| Term | Meaning |
|---|---|
| Platform understanding | What this course built: objects, fields, relationships, and security, before any query syntax |
| SOQL & Salesforce Data Management | The next course in this path — SOQL, SOSL, and Salesforce data-movement tools |

## Check yourself

Explain, in your own words, why a technically correct SOQL query can still return a
"confidently wrong" number if the analyst writing it skipped everything this course covered.
