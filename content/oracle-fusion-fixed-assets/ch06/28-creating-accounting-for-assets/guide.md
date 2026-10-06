# Lesson 28 — Creating Accounting for Assets

**Chapter 6 · Accounting, Reporting and Close · Lesson 28 of 33**

## What you'll learn

- What Create Accounting actually does with the transactions covered so far
- Which events in this course each generate their own journal entry
- The difference between draft and final accounting
- Why Create Accounting sits between Assets and the General Ledger

## Turning transactions into journal entries

Every transaction type covered in this course — additions, depreciation runs, cost adjustments, reclassifications, revaluations, impairments, transfers, retirements — has an accounting consequence: a debit and credit somewhere in the chart of accounts. **Create Accounting** is the process that reads these transactions and generates the actual subledger journal entries representing them, using Oracle Fusion's Subledger Accounting engine shared across Payables, Receivables, and Assets.

## Which events generate which entries

A few representative examples tie straight back to earlier lessons:

- **An addition** (Chapter 3) debits the asset cost account and credits the asset clearing account, closing out the liability Payables originally created when the invoice posted.
- **A depreciation run** (Lesson 17) debits depreciation expense and credits accumulated depreciation, for every asset that successfully calculated.
- **A retirement with a gain** (Lesson 26) removes the asset's cost and accumulated depreciation from the books, records any proceeds received, and credits a gain account for the difference (a loss debits a loss account instead).
- **A revaluation** (Lesson 21) debits the asset cost (or a separate revaluation account) and credits the revaluation reserve.

Every one of these uses the default accounts set up all the way back in Chapter 2's category books — which is exactly why getting those defaults right during setup matters for far more than data entry convenience; it's what makes Create Accounting produce correct journal entries automatically, transaction after transaction, without someone manually coding each one.

## Draft versus final accounting

Like depreciation runs (Lesson 17), Create Accounting can run in **draft** mode — generating journal entries for review without posting them anywhere permanent — or **final** mode, which commits the entries and makes them eligible to transfer to the General Ledger (Lesson 29). Draft mode is the review checkpoint: exactly where someone would catch a transaction pointing at the wrong account before it becomes a real, posted journal entry.

## Where this sits in the bigger picture

Create Accounting is the bridge between everything this course has covered inside Assets and the General Ledger that ultimately reports the company's financial position. Assets keeps far more transactional detail — individual asset numbers, locations, categories — than the General Ledger ever needs; Create Accounting is what summarizes that detail into the account-level journal entries GL actually wants to see.

## Key terms

| Term | Meaning |
|---|---|
| Create Accounting | The process generating subledger journal entries from Assets transactions |
| Subledger Accounting | The shared Oracle Fusion engine that generates accounting from Assets, Payables, Receivables, and other subledgers |
| Draft accounting | Generated journal entries available for review before being committed |

## Lab

Meridian Fabrication Co. runs Create Accounting in draft mode after a period's depreciation run and notices one asset's depreciation expense is pointing at the wrong department's account. Explain why catching this in draft mode is meaningfully better than catching it after final accounting and the GL transfer.

## Check yourself

Without looking back, can you explain what Create Accounting actually does, and name two transaction types from earlier chapters along with the accounts each one typically affects?
