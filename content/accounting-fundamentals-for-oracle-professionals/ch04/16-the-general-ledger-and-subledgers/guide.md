# The General Ledger and Subledgers

This is arguably the single most important lesson in the entire course for a future Oracle Fusion Financials consultant. The general ledger / subledger relationship is not just an accounting concept — it is the literal architecture of Oracle Fusion Financials, and nearly everything you will configure, troubleshoot, and explain to clients sits somewhere inside this structure.

## What you'll learn

- What the general ledger (GL) is and what it contains
- What a subledger is, and why businesses use them instead of recording everything directly in the GL
- How detail flows from subledgers up into the GL, in summary form
- Why this exact structure is Oracle Fusion Financials' core architecture

## The general ledger: the summary of everything

The **general ledger** is the master record of all of a business's accounts — every asset, liability, equity, revenue, and expense account, together with its balance. It's where the "big picture" financial statements ultimately get built. Historically, every single transaction was recorded directly into the general ledger. As businesses grew, that became unworkable: a large company might process millions of customer invoices a year, and posting each one as its own individual line directly into the main ledger would bury the big picture in overwhelming detail.

## Subledgers: detail, organized by business process

A **subledger** is a detailed, specialized ledger that tracks one category of transactions in depth — far more detail than the GL needs — and then periodically summarizes its activity into the GL. Common subledgers include:

- **Accounts Payable subledger**: every supplier invoice, every payment, tracked per supplier
- **Accounts Receivable subledger**: every customer invoice, every payment, tracked per customer
- **Fixed Assets subledger**: every individual asset, its cost, and its depreciation schedule

A business might have thousands of individual supplier invoices in a month. The AP subledger tracks every one of them individually (which supplier, which invoice number, when it's due). But the general ledger doesn't need all of that individual detail — it just needs the *summarized* effect: total Accounts Payable increased by $400,000 this month, total expenses recognized were $380,000, and so on.

## How detail flows upward

```
Individual transactions          Summarized postings
(subledger detail)      ───────▶  (general ledger)

AP: 1,200 supplier invoices  ──▶  one summarized journal entry
AR: 3,400 customer invoices  ──▶  one summarized journal entry
FA: 85 asset depreciation runs ─▶ one summarized journal entry
```

Crucially, the detail isn't lost — it still exists in the subledger, and a well-designed system lets you "drill down" from a GL balance back to the individual subledger transactions that made it up. This drill-down capability is one of the most valuable features any accounting system (including Oracle Fusion) can offer.

## This is Oracle Fusion's core architecture

Oracle Fusion Financials is built around exactly this pattern:

- **Oracle Fusion Payables, Receivables, Fixed Assets, Expenses** — these are subledgers, each tracking their category of transaction in full detail.
- **Oracle Fusion General Ledger** — the summary-level ledger that receives periodic, summarized postings from each subledger.
- **Subledger Accounting (SLA)** — the engine in between, applying configurable accounting rules to transform subledger transaction detail into correctly formed, summarized GL journal entries.

Once you reach the hands-on portion of this career path and start configuring Oracle Fusion directly, you will recognize this exact lesson everywhere: it's why Payables and Receivables feel like "their own little worlds" with their own detail, while General Ledger feels like the place everything eventually lands.

## Recap

The general ledger holds summarized balances across all account types; subledgers hold detailed, process-specific transactions (AP, AR, Fixed Assets) that periodically summarize up into the GL, without losing the ability to drill back down. This structure is, almost unchanged, the core architecture of Oracle Fusion Financials. Next up, lesson 17: the trial balance, the report that proves the whole system still balances.
