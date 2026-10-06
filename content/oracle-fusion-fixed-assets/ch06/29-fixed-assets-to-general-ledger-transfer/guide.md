# Lesson 29 — Fixed Assets to General Ledger Transfer

**Chapter 6 · Accounting, Reporting and Close · Lesson 29 of 33**

## What you'll learn

- What the GL transfer process actually does after Create Accounting
- The difference between transferring and posting in the General Ledger
- How transfer frequency affects how current GL balances are
- What to check when Assets and GL don't appear to agree

## One more step after Create Accounting

Lesson 28 covered Create Accounting producing journal entries in final mode — but those journal entries exist inside the Assets subledger until a separate step, the **Fixed Assets to General Ledger transfer**, actually moves them into the General Ledger's journal batches. In many implementations this transfer can be triggered automatically as part of running Create Accounting in final mode, or run as its own separate scheduled process — either way, it's a distinct, identifiable step worth understanding on its own, because it's where a problem in Assets either does or doesn't make it into the company's consolidated financial picture.

## Transfer versus post

Two different actions, often confused:

- **Transfer** — moves the journal entry data from Assets into the General Ledger as an unposted journal batch. At this point, the entries exist in GL, but haven't yet updated account balances.
- **Post** — the separate General Ledger action that actually updates account balances based on a journal batch. A transferred-but-unposted batch is visible in GL but doesn't yet affect reported balances.

This two-step design gives GL its own checkpoint: journals transferred from any subledger (Assets, Payables, Receivables alike) can be reviewed in GL before posting, rather than automatically and immediately changing balances the moment a subledger creates them.

## Why transfer frequency matters

How often Fixed Assets transfers to GL — every transaction, daily, or only at period end — affects how current the General Ledger's picture of fixed assets is at any given moment. A company that only transfers at period end will see GL balances for fixed-asset accounts lag behind what Assets itself shows throughout the month; a company transferring more frequently keeps GL closer to real time, at the cost of more frequent processing. Neither is universally "more correct" — it's a tradeoff implementations make deliberately, and it directly affects how Lesson 31's reconciliation actually behaves day to day.

## What to check when something looks out of balance

If Assets and GL appear to disagree on a fixed-asset account balance, the gap is very often explained by timing, not an actual error: transactions have been created and accounted in Assets, but not yet transferred; or transferred, but not yet posted in GL. Before assuming something is genuinely wrong, the first check is simple: is there a batch sitting in GL, transferred but unposted, or a batch in Assets, accounted but not yet transferred? Lesson 31 covers the fuller reconciliation process, but this transfer-versus-post distinction is the first thing to rule out.

## Key terms

| Term | Meaning |
|---|---|
| Transfer | Moving accounted journal entry data from a subledger into GL as an unposted batch |
| Post | The GL action that updates account balances from a journal batch |
| Transfer frequency | How often the Fixed Assets to GL transfer runs — affects how current GL's fixed-asset balances are |

## Lab

Meridian's accounting team notices the fixed-asset accumulated depreciation account in GL doesn't match what the Assets reserve ledger shows for the current period. Before escalating this as an error, describe the two timing-related explanations you'd check first.

## Check yourself

Without looking back, can you explain the difference between transferring and posting, and name one tradeoff involved in how frequently Fixed Assets transfers to GL?
