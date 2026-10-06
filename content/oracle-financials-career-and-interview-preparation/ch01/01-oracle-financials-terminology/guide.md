# Oracle Financials Terminology

**Chapter 1 · Interview Preparation · Lesson 1 of 15**

Welcome to Oracle Financials Career & Interview Preparation, the final course in the Oracle Fusion Financials Consultant path. You have already built the enterprise structure, configured every subledger, run a real month-end close, and fixed six planted problems in the LTV Manufacturing Corporation capstone. This course does not teach new Oracle configuration. It teaches you how to talk about everything you already know — in an interview, on a resume, and in your first ninety days on a real engagement.

This lesson is a working glossary. Interviewers rarely ask "define General Ledger." They ask questions that assume you already use these terms correctly in a sentence. If a term here is fuzzy, go back to the course where it was taught in depth — this lesson only refreshes and connects them.

## What you'll learn

- The vocabulary that spans every course in this path, organized by subledger and function
- Terms that are commonly confused with each other, and why the distinction matters in an interview
- How to use this vocabulary fluently instead of just recognizing it on a quiz

## Enterprise structure and General Ledger terms

- **Legal entity** — a real, legally registered company (LTV Manufacturing Corporation and LTV Manufacturing Canada ULC are the two in your capstone).
- **Ledger** — the record-keeping structure (chart of accounts, calendar, currency, accounting method) a legal entity's transactions post to. A **primary ledger** is the official book of record; a **secondary ledger** restates the same activity under a different convention (a different accounting method or currency) without touching the primary.
- **Chart of accounts (COA)** — the segmented structure (Company, Cost Center, Account, and so on) every journal line codes to.
- **Balancing segment** — the COA segment (Company, in the capstone's design) that must net to zero for each legal entity, which is what makes intercompany elimination possible.
- **Business unit (BU)** — the operational entity (think "Savannah Procurement" or "Windsor Receivables") that subledger transactions are processed under; a BU is assigned a primary ledger but is distinct from the legal entity itself.
- **Journal source and category** — the system or process that created a journal (Payables, Receivables, Manual) and the business reason it was created (Accrual, Invoices, Depreciation).
- **Period close** — the formal status change that locks a period against further posting once every subledger reconciles to the General Ledger.

## Subledger terms (AP, AR, Assets, Cash Management)

- **GRNI (Goods Received, Not Invoiced)** — an accrual liability recorded when goods are received before the matching invoice arrives; it should auto-reverse when the invoice posts. An unreversed GRNI accrual was the root cause behind one of the capstone's six planted problems.
- **Matching (2-way, 3-way)** — comparing a Payables invoice to its purchase order (2-way) or to the PO and the receipt (3-way) before it can be paid without a hold.
- **AutoInvoice** — the Receivables process that imports external sales data into AR invoices and credit memos.
- **Receipt application** — assigning an incoming customer payment to the specific invoice(s) it pays; a misapplied receipt was another of the capstone's six root causes.
- **Asset category** — the Fixed Assets classification that drives an asset's depreciation method and useful life; assigning the wrong category understates or overstates depreciation, exactly as it did for the capstone's mis-categorized lathe.
- **Bank statement reconciliation** — matching the bank's reported activity, line by line, against the GL cash account; an unresolved reconciling item signals either a timing difference or a real error.

## Subledger Accounting and reporting terms

- **Subledger Accounting (SLA)** — the engine that turns subledger transactions (an AP invoice, an AR receipt) into balanced journal entries using account rules, before they reach the GL. Watch the overload: "SLA" means Subledger Accounting in this path, not the everyday "service level agreement" — say which one you mean if the context isn't obvious.
- **Create Accounting** — the process that runs SLA's account rules against a batch of transactions; a transaction that fails comes back **Incomplete** rather than Final.
- **Accounting status: Incomplete vs. Final** — Incomplete means Create Accounting could not generate a journal (often a missing account rule mapping); Final means the journal posted successfully to the GL.
- **OTBI (Oracle Transactional Business Intelligence)** — real-time, ad hoc reporting against live transactional data.
- **BI Publisher** — the tool for pixel-perfect, scheduled, formatted reports (statements, checks, regulatory filings).
- **FBDI (File-Based Data Import)** — Oracle's standard spreadsheet-to-interface-table bulk load method, used heavily for data migration.
- **ADFdi (Application Development Framework Desktop Integration)** — the Excel-integrated interface for entering and uploading data (journals, for example) directly from a spreadsheet into Oracle Fusion.

## Key terms

| Term | Meaning |
|---|---|
| SLA | Subledger Accounting — the engine that converts subledger transactions into GL journals (not "service level agreement" in this context) |
| GRNI | Goods Received, Not Invoiced — an accrual that must reverse when the real invoice posts |
| FBDI / ADFdi | Oracle's two standard bulk-load methods: file-based interface tables versus Excel-integrated entry |
| Incomplete (accounting status) | A transaction Create Accounting could not turn into a journal, usually from a missing account rule |

## Lab

Write a one-paragraph answer, in your own words and without looking anything up, to: "What is the difference between Subledger Accounting and the General Ledger, and why does Oracle separate them into two layers?" If you can't answer fluently, that's the term to revisit before lesson 2.

## Check yourself

- What is the difference between a primary ledger and a secondary ledger?
- Why does an unreversed GRNI accrual cause AP aging and the GL to disagree?
- What does an accounting status of "Incomplete" actually mean, and what usually causes it?
- Name the two standard Oracle bulk-load methods and the one practical difference between them.
