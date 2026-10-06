# Creating Accounting in Receivables

Lesson 35 explained what accounting entries look like conceptually. This lesson covers the actual program that produces them: **Create Accounting**. Nothing posts to the GL — in fact, nothing even becomes a finished journal entry — until this process runs.

## What you'll learn

- What the Create Accounting program does
- Draft versus final accounting
- The Transfer to General Ledger parameter
- Common reasons a transaction fails to account

## What Create Accounting does

The **Create Accounting** program processes every eligible accounting event sitting in Receivables — invoices completed, receipts applied, adjustments approved, credit memos issued — and applies the AutoAccounting rules (lesson 35) to generate the actual subledger journal entries. It can be run for a single transaction, a batch, or an entire period, and it can be submitted on a schedule or run on demand.

## Draft versus final

Create Accounting supports two modes:

- **Draft accounting** generates a preview of what the journal entries would look like, without making them final or usable for reporting. This is useful mid-period, to spot-check that a batch of unusual transactions is going to account the way you expect before committing to it.
- **Final accounting** locks in the journal entries. Once accounting is final for a transaction, it's no longer in a "pending" state — it's an authoritative, auditable entry.

A company will often run draft accounting informally throughout the month and final accounting as a deliberate step at or near period close.

## The Transfer to General Ledger parameter

When submitting Create Accounting, one key parameter is **Transfer to General Ledger**, which determines whether the final journal entries also get sent on to the GL in the same run:

- Set to **Yes**, Create Accounting both finalizes the subledger journal entries and submits the transfer to the GL immediately, in one combined step.
- Set to **No**, Create Accounting finalizes the entries in the subledger but leaves them there — someone would run a separate transfer process later (covered in the next lesson) to actually move them to the GL.

This flexibility matters for a company that wants to finalize Receivables accounting continuously throughout the month but control exactly when data lands in the GL, perhaps coordinating the transfer timing across all subledgers (AP, AR, fixed assets) together.

## Why a transaction might fail to account

Create Accounting doesn't blindly force every transaction through. Common reasons a transaction is rejected:

- A required AutoAccounting rule has no matching value for some attribute on the transaction (an incomplete setup)
- The transaction references a GL account combination that's invalid or disabled in the chart of accounts
- The accounting date falls in a period that isn't open

When a transaction fails, it stays in Receivables unaccounted, and the exceptions need to be reviewed and corrected before the next Create Accounting run can succeed for that transaction — this is exactly the kind of issue that becomes urgent at period close, when every transaction needs to account before the books can close.

## Recap

Create Accounting applies AutoAccounting rules to turn pending Receivables activity into actual journal entries, with a draft mode for previewing and a final mode that locks entries in. The Transfer to General Ledger parameter controls whether finalized entries move to the GL immediately or wait for a separate transfer. Transactions can fail to account for setup or period-status reasons, and those failures need resolution before close. Next up, lesson 37: the Receivables to General Ledger transfer itself.
