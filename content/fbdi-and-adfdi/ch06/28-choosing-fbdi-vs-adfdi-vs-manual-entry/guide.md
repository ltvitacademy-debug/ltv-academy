# Choosing FBDI vs. ADFdi vs. Manual Entry

This course opened with four doors into Oracle Fusion and a promise that the right one depends on the job, not on preference. Twenty-seven lessons later, you've built, broken, and fixed loads through two of those doors in real detail. This final lesson pulls the whole course into one decision framework you can actually use on the job.

## What you'll learn

- A single decision framework covering manual entry, FBDI, and ADFdi
- How to apply it to the five Chapter 4 modules at a glance
- A recap of this course's recurring ideas, in one place
- Where this course leads next in the Oracle Fusion Financials Consultant path

## The decision framework, restated

Three questions, from lesson 1, now fully earned through five chapters of detail:

- **How many rows?** A handful: manual entry or ADFdi. Hundreds to tens of thousands, especially as a one-time load: FBDI.
- **How often?** One-time conversion or large scheduled batch: FBDI's staging pipeline is built for exactly this. Interactive, as-needed entry: ADFdi. Continuous, unattended, system-to-system: neither — that's the REST API integration territory ahead.
- **Who's doing the work, and how much review do they want before it's final?** A finance power user who wants to see validation immediately, inside Excel: ADFdi. A technical load with no particular urgency for instant feedback, run and reviewed later through reports and logs: FBDI.

## Applying it across the five modules

- **Journals**: FBDI's Import Journals for payroll feeds or large external sub-ledger conversions; ADFdi's Create Journal in Spreadsheet for a controller's ad-hoc adjusting entries.
- **Payables invoices**: FBDI for a nightly supplier-portal file of thousands; ADFdi's Create Invoice in Spreadsheet for a handful that arrived by email.
- **Receivables (AutoInvoice)**: almost always FBDI, since receivables volume typically originates from another system entirely, rarely from a person typing directly into Oracle Fusion.
- **Fixed Assets**: FBDI for a legacy register conversion; the day-to-day trickle from capital-coded Payables invoices arrives automatically either way, needing only the create-then-post review.
- **Bank statements**: FBDI, always — a recurring feed from an external bank file, never a manual or ADFdi candidate.

## This course's recurring ideas, in one place

Every module in Chapters 4 through 6 turned out to be the same handful of ideas, reapplied: data stages before it's real; a product-specific process applies business rules a file-format check never could; a rejected row with a reason is a solvable problem, not a mystery; fix and resubmit only what actually failed; and purge only once you're sure nothing needs that evidence anymore.

## Where this leads

This course completes the Data Loading & Integrations stage of the Oracle Fusion Financials Consultant path alongside its companion course. The next course in this path is **REST APIs & Integration Fundamentals**, which picks up exactly where lesson 1's fourth door was left unopened: the system-to-system integrations that run with no file, no spreadsheet, and no person clicking submit at all.

## Recap

The choice between manual entry, FBDI, and ADFdi always comes down to volume, frequency, and who's doing the work — never preference. You've now applied that framework across five real Financials modules and built a repeatable troubleshooting discipline for both tools. Next up: REST APIs & Integration Fundamentals.
