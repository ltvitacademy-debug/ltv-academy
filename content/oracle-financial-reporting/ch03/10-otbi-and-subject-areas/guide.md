# OTBI and Subject Areas

Chapter 3 moves from formatted statements to ad hoc exploration: Oracle Transactional Business Intelligence, or OTBI. This lesson covers the foundational concept you need before building anything in OTBI — subject areas — and how OTBI differs architecturally from the Financial Reporting Studio tool you just spent a chapter on.

## What you'll learn

- What OTBI is and the kind of question it's built to answer
- What a subject area is, and the facts/dimensions vocabulary inside one
- The financial subject areas available in Oracle Fusion Financials
- Why OTBI queries live transactional data instead of a pre-summarized cube

## What OTBI is for

Oracle Transactional Business Intelligence is used to analyze your business and take action with embedded and ad hoc analysis of your transactional data. Unlike Financial Reporting Studio, which reports off a pre-summarized GL balances cube refreshed on a schedule, OTBI queries live, current transactional data directly — the exact state of Payables invoices, Receivables transactions, or GL journals right now, not as of the last cube refresh. That makes OTBI the right tool for "what does this look like at this exact moment," which is a different question from "what does the formatted monthly statement show."

## Subject areas: curated building blocks

You don't query OTBI with raw SQL against Oracle's underlying tables. Instead, Oracle curates **subject areas**: pre-built, business-friendly groupings of the data you're allowed to analyze for a given area of the application. Each subject area organizes two kinds of things:

- **Facts** — the measures you want to total or calculate: amounts, counts, quantities. Examples: invoice amount, days overdue, transaction count.
- **Dimensions** — the business attributes you want to slice those facts by: business unit, customer, supplier, item, cost center, period.

Building an analysis (covered in lesson 11) means picking facts and dimensions out of a subject area and letting OTBI assemble the underlying query for you — no SQL required.

## The financial subject areas

Oracle Fusion Financials ships curated subject areas aligned to its product areas, including: Assets, Budgetary Control, Cash Management, Expenses, General Ledger, Intercompany, Payables, Receivables, Revenue Management, and Subledger Accounting. Each one exposes the facts and dimensions relevant to that product — the Payables subject area, for instance, gives you invoice-level facts and dimensions like supplier, invoice status, and due date; it does not give you Fixed Assets data, because that lives in its own subject area.

This product-aligned structure is also why reporting security (lesson 4) grants subject area access per product: a user's duty roles determine which of these subject areas even show up for them when they start building an analysis.

## Why OTBI feels different from Financial Reporting Studio

Under the hood, OTBI integrates with Oracle's Application Development Framework (ADF) to run real-time analysis directly against the application's own view objects and underlying database tables — rather than against a separately maintained cube. The BI Server translates your drag-and-drop selections of facts and dimensions into physical queries at run time. That architectural choice is exactly why OTBI can show you an invoice entered thirty seconds ago, where a Financial Reporting Studio report tied to a nightly-refreshed cube cannot.

## Recap

OTBI analyzes live transactional data through curated subject areas — business-friendly packages of facts (measures) and dimensions (attributes to slice by) — rather than querying a pre-summarized cube the way Financial Reporting Studio does. Financial subject areas are organized per product area: GL, Payables, Receivables, Assets, Cash Management, and more. Next up, lesson 11: actually building your first OTBI analysis.
