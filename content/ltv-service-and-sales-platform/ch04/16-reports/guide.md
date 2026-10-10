# Lesson 16 — Reports

**Chapter 4 · Analytics and Delivery · Lesson 16 of 25**

## What you'll learn

- The four Salesforce report formats and which one fits each Solstice question
- A custom report type connecting Warranty_Claim__c to its related Asset and Case
- Bucket fields for grouping claim amounts without new formula fields
- Why report-level logic, not Apex, is the right tool for ad hoc business questions

## Why reports, after all that code

Chapters 2 and 3 built code because the logic needed to run automatically, be tested, or call an external system. Reports are different: they answer **ad hoc, user-driven questions** — "how many open Installation Jobs does each technician have right now" — that change in shape depending on who's asking and when. Building a custom Apex page for every such question would be exactly the over-engineering Lesson 2's declarative-first principle warns against; Salesforce's native Report Builder is the right tool for this entire lesson.

## The four report formats

| Format | Shape | Fits |
|---|---|---|
| **Tabular** | Flat rows and columns, no grouping | A simple list, like "all open Warranty Claims" for a quick export |
| **Summary** | Rows grouped with subtotals | "Opportunities by Stage" — Renata's sales pipeline view |
| **Matrix** | Grouped by rows *and* columns | "Installation Jobs by Technician (rows) and Status (columns)" — Dmitri's team capacity view |
| **Joined** | Multiple report blocks from different report types on one report | Comparing Opportunity pipeline and Warranty Claim volume side by side for Renata's combined sales-and-service review |

## A custom report type for claims

Solstice's standard "Warranty Claims" report type (created automatically from the object) only exposes `Warranty_Claim__c`'s own fields. A **custom report type** lets you build a report that also pulls fields from related objects without writing a SOQL query — exactly what Dmitri needs to see a claim's Asset serial number and Case subject on the same row:

- Primary object: `Warranty_Claim__c`
- Related object (via lookup, "each... may or may not have related records"): Case
- Related object: Asset (via the Asset lookup)

Once defined in Setup → Report Types, this exposes `Case.Subject` and `Asset.SerialNumber` as selectable columns on any report built from this report type — the declarative equivalent of the child-to-parent SOQL query from Lesson 8, available to anyone who can build a report, not just a developer.

## Bucket fields

Renata wants claims grouped into "Small" (under $200), "Medium" ($200–$500), and "Large" (over $500) for a quick visual read, but `Claim_Amount__c` has no such categorization on the object itself, and adding a formula field just for one report would be a permanent schema change for a temporary reporting need. A **bucket field** solves this inside the report itself: it creates a report-only grouping column that sorts each row's value into named buckets you define, with no new field on the object and no Apex required.

## Report folders and sharing

Every report in this platform lives in a folder shared according to who needs it — a "Sales Reports" folder visible to the Sales role, a "Service Reports" folder visible to the Service role, matching the security model from Lesson 4 rather than contradicting it. Report folder access controls who can *see and run* a report; it doesn't override the underlying record-level security, so a Sales Rep running a Service report still only sees the Cases and Warranty Claims the OWD, role hierarchy, and sharing rules from Lesson 4 already allow them to see.

## Key terms

| Term | Meaning |
|---|---|
| Tabular / Summary / Matrix / Joined report | The four native Salesforce report formats |
| Custom report type | A report type exposing fields from an object plus specified related objects |
| Bucket field | A report-only column grouping a field's values into named ranges, with no schema change |
| Report folder | A container controlling who can see and run a set of reports |

## Lab

Build the custom report type described above (Warranty_Claim__c with Case and Asset as related objects). Create a Matrix report grouping Installation_Job__c by Technician (rows) and Status (columns), and a Summary report on Warranty_Claim__c with a bucket field grouping Claim_Amount__c into Small/Medium/Large. Place both in a "Service Reports" folder shared with the Service role.

## Check yourself

- Why does Renata's combined sales-and-service review need a Joined report rather than a Summary report?
- What does a custom report type let you do that the object's default, automatically generated report type doesn't?
- Why is a bucket field the right tool for the Small/Medium/Large grouping instead of a new formula field on `Warranty_Claim__c`?
