# Payables Reports: Aging and Payments

With the general-ledger-level reports covered, Chapter 6 now moves module by module through the operational reports a consultant produces most often, starting with Payables. This lesson covers the two report families you'll use constantly: aging reports and payment-related reports.

## What you'll learn

- The Payables Invoice Aging Report: structure and purpose
- Why aging buckets matter for cash management and vendor relationships
- Payment-related predefined reports
- Reconciling Payables to the General Ledger

## The Payables Invoice Aging Report

The **Payables Invoice Aging Report** lists unpaid invoices according to specified aging periods — commonly buckets like "current," "1–30 days past due," "31–60," "61–90," and "over 90." Each unpaid invoice falls into exactly one bucket based on how far past its due date it is as of the report's run date. This is the formal, often BI Publisher-delivered counterpart to the ad hoc OTBI aging analysis you built back in lesson 11 — same underlying question, different tool, different purpose (one for a quick internal check, one for a formal, often scheduled, distributable report).

Reading an aging report well means looking beyond the total: a company with a large "over 90" bucket relative to its total payables has either a cash flow problem, a dispute with a supplier that's stalling payment, or a data problem (an invoice that should have been paid or cancelled but wasn't). Each of those has a different next action, which is exactly why a consultant needs to actually read the report, not just confirm it ran.

## Why aging buckets matter beyond "who do we owe"

Aging data feeds decisions beyond simple bookkeeping: a treasury or cash management function uses the aging profile to plan upcoming cash outflows (money that will need to leave the bank soon), and a procurement or vendor management function watches for suppliers whose invoices are consistently aging into later buckets, which can signal either an internal process problem (invoices aren't getting approved in time) or a deliberate strategy of stretching payment terms.

## Payment-related reports

Beyond aging, Payables ships predefined reports covering the payment side of the lifecycle: registers of payments issued over a period, details supporting a specific payment run, and reports tied to netting (where payables and receivables with the same business partner are offset against each other) and to income tax and withholding reporting, relevant whenever payments to certain suppliers carry tax withholding obligations.

## Reconciling Payables to the General Ledger

A **Payables-to-Ledger Reconciliation** report (mentioned back in lesson 19) ties the subledger's view of what's owed and what's been paid to the balances actually posted in the General Ledger through Subledger Accounting. During close, this reconciliation is a standard checkpoint: if Payables' own subledger total doesn't match what landed in the GL's Accounts Payable liability account, something in the subledger-to-GL transfer needs investigation before the period can close cleanly.

## Recap

The Payables Invoice Aging Report buckets unpaid invoices by how overdue they are, feeding both cash planning and vendor-relationship decisions; payment registers and reconciliation reports round out the module's reporting needs, tying the subledger back to the General Ledger. Next up, lesson 27: Receivables reports — aging and collections, the mirror image on the other side of the business.
