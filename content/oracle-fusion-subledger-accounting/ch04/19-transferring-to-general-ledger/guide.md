# Transferring to General Ledger

A Final subledger journal entry exists, but it hasn't reached the General Ledger yet. This lesson covers the process that moves it there: Transfer Journal Entries to GL, and the posting decision that follows.

## What you'll learn

- What the Transfer Journal Entries to GL process does
- Why transfer is a separate step from Create Accounting, not automatic
- The posting option, and what posting actually changes
- What "eligible" means when picking up entries to transfer

## Why transfer is a separate step

You might expect Final mode to automatically push journal entries into the General Ledger the instant they're created. Oracle deliberately keeps this as a separate, distinct process: **Transfer Journal Entries to GL**. Separating creation from transfer gives a controller or implementation team a clean checkpoint — final subledger accounting can accumulate, be spot-checked, and then transferred to GL as a deliberate, scheduled action, rather than every single transaction landing in GL journal batches continuously throughout the day.

## What Transfer Journal Entries to GL does

This process looks at Final subledger journal entries that have not yet been transferred, for a specified ledger (and optionally a specific subledger application, date range, or batch), and moves them into the General Ledger as GL journal batches — the same kind of journal batch you learned to work with in your General Ledger course. The program can pick up entries from the current run and also any eligible entries left over from previous runs that, for whatever reason, didn't get transferred yet.

## The posting option

Transfer Journal Entries to GL includes a **Post in General Ledger** option. If selected, the program doesn't just move the journal into GL as an unposted batch — it also posts it, updating account balances immediately as part of the same run. If this option isn't selected, the journal arrives in GL as an unposted batch, and someone (perhaps following period-end review procedures) posts it separately later, giving one more checkpoint before balances actually change.

This mirrors a distinction you already understand from General Ledger: a journal batch existing is not the same thing as that batch being posted and reflected in account balances. Transfer Journal Entries to GL lets you decide, per run, whether to combine those two steps or keep them separate.

## What "eligible" means

Only Final subledger journal entries are eligible for transfer — Draft entries, as you learned in lesson 15, cannot be transferred under any circumstance. An entry also needs to actually be new (not already transferred in a previous run) to be picked up. This is why the lesson 18 skill of knowing whether an entry is Draft or Final matters so directly here: an entry stuck in Draft, for whatever reason, will never show up for transfer until it's actually finalized.

## Recap

Transfer Journal Entries to GL is the deliberate, separate step that moves Final subledger journal entries into General Ledger journal batches, with an option to post them immediately or leave them for a separate posting step later. Only Final, not-yet-transferred entries are eligible. Next up, lesson 20: journal import from subledgers, which looks at the mechanics of how this journal data actually lands inside General Ledger's own journal structures.
