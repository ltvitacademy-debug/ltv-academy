# How Financial Data Is Organized in Oracle Fusion

Welcome to Oracle Financials Data, the course right after Oracle Financial Reporting in the Reporting & Data stage of the Oracle Fusion Financials Consultant path. That course taught you the tools for building reports — OTBI, BI Publisher, Smart View. This course goes one level deeper: the actual tables and views those tools (and your own SQL, once you reach the next course) sit on top of. Before you can write a reliable query or troubleshoot a stuck transaction, you need a mental map of where financial data actually lives inside Oracle Fusion. This lesson builds that map at the highest level.

## What you'll learn

- Why Oracle Fusion Financials data is organized by subledger, not by screen
- The role each major module plays: Payables, Receivables, Fixed Assets, Cash Management, General Ledger
- How Subledger Accounting (SLA) connects every subledger to the General Ledger
- Why shared identity data (suppliers, customers, contacts) lives in its own layer

## One database, organized by subledger

Everything you do in Oracle Fusion Financials — entering a supplier invoice, recording a customer payment, running a depreciation schedule — ends up as rows in an Oracle database. That database is organized by **subledger**: a module that owns the detailed transactions for one area of the business.

- **Payables (AP)** — supplier invoices and the payments made against them
- **Receivables (AR)** — customer transactions (invoices, credit memos) and the receipts applied against them
- **Fixed Assets (FA)** — asset additions, depreciation, retirements
- **Cash Management (CE)** — bank accounts and bank statement reconciliation
- **Expenses (EXM)** — employee expense reports

Each subledger has its own set of tables, and nearly every table name is prefixed with that module's two- or three-letter code: `AP_` for Payables, `AR_` for Receivables, `FA_` for Fixed Assets, `CE_` for Cash Management. Once you know the prefix convention, you can usually guess which module owns a table just by reading its name.

## The General Ledger sits above every subledger

None of the subledgers report financial results on their own. Every one of them eventually needs to turn its transactions into a balanced debit/credit journal entry and hand that entry to the **General Ledger (GL)** — the single place where a company's full financial position is summarized. The GL doesn't know anything about "supplier invoices" or "customer payments"; it only knows journal entries made up of accounts, amounts, and periods.

The bridge between a subledger transaction and a GL journal entry is a separate engine called **Subledger Accounting**, abbreviated **SLA**, whose tables all carry the prefix `XLA_`. Every subledger — Payables, Receivables, Fixed Assets, and more — routes through this same shared engine on its way to GL, which is why this course spends real time on `XLA_` tables later: they are the connective tissue of the entire financial data model, not just an AP or AR detail.

## Identity data lives in its own shared layer

One more piece doesn't belong to any single subledger: the actual identity of the people and organizations your company deals with. A supplier and a customer are both, at the core, a "party" — and Oracle Fusion stores that core identity in a shared architecture called **Trading Community Architecture (TCA)**, whose tables carry the `HZ_` prefix (a naming holdover from the architecture's original name). A real-world company that both sells to you and buys from you is stored once as a party, then layered with a supplier role and a customer role on top. You'll spend all of Chapter 2 inside this layer.

## The shape to keep in your head

```
Subledger transaction (AP, AR, FA, ...)
        |
        v
Subledger Accounting event (XLA_*)
        |
        v
General Ledger journal entry (GL_*)
```

Every lesson in this course fits somewhere on that line: Chapters 2 and 3 live in the subledgers, Chapter 4 lives in SLA and GL, and Chapter 5 is about using the whole map in practice.

## Recap

Oracle Fusion Financials data is organized by subledger (Payables, Receivables, Fixed Assets, Cash Management, Expenses), each with its own table prefix. Every subledger transaction eventually becomes a General Ledger journal entry, and Subledger Accounting (`XLA_` tables) is the shared engine that makes that conversion. Shared identity data for suppliers and customers lives separately, in the `HZ_` Trading Community Architecture tables. Next up, lesson 2: business units, ledgers, and how Oracle Fusion decides who can see what data.
