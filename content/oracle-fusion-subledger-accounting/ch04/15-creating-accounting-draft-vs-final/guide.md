# Creating Accounting: Draft vs. Final

Chapters 1 through 3 were entirely about setup: events, rules, AADs, methods, validation, activation. Chapter 4 is where all of that setup actually runs against real transactions. This lesson covers the program that does the running — Create Accounting — and its single most important parameter: Draft or Final mode.

## What you'll learn

- What the Create Accounting process actually does
- The difference between Draft mode and Final mode
- Why Draft mode exists as a safe, reviewable step
- What becomes possible, and what becomes locked in, once Final mode runs

## What Create Accounting does

**Create Accounting** is the process — run as a scheduled job — that takes eligible accounting events sitting in a subledger application and actually applies the active accounting method's AADs to them, producing subledger journal entries. Every concept from Chapters 1 through 3 exists to feed this one process: it looks up the right AAD for the event's subledger application, finds the journal entry rule set for the event's class and type, and executes every rule inside it.

You run Create Accounting per subledger application, for a given ledger, specifying which events to pick up (often, anything eligible since the last run). Its output is a batch of subledger journal entries, whatever errors occurred along the way, and a report summarizing both.

## Draft mode: reviewable, not yet permanent

When Create Accounting runs in **Draft** mode, it produces subledger journal entries that can be reviewed — you can look at the lines, the accounts, the amounts, and the descriptions — but those entries cannot be transferred to the General Ledger, and they are not permanent. Draft mode exists specifically so a consultant, or an accountant, can sanity-check what the rules actually produced before committing to it. If something looks wrong — a line posting to an unexpected account, a missing supporting reference — Draft mode gives you a safe place to notice that, with nothing locked in yet.

Draft accounting can be re-run as many times as needed. Each new draft run simply replaces the previous draft for that event, so experimenting with rule adjustments and re-checking the result in Draft mode carries no risk to anything downstream.

## Final mode: permanent, and transferable

When Create Accounting runs in **Final** mode, the resulting journal entries become permanent for that event — they are the official subledger accounting record, and they become eligible to transfer to the General Ledger (the subject of lesson 19). Final mode is not something you casually re-run the way you might re-run Draft; correcting a Final entry means using the error-handling and correction techniques covered in lesson 18, not simply overwriting it the way a new Draft run replaces an old one.

## Choosing between them in practice

Many companies run Create Accounting in Draft mode first — sometimes automatically, right after a transaction is saved — purely so the resulting accounting is visible to review without any risk. Final mode then runs on a schedule (nightly, or at period-end) once transactions are considered settled, or it can be triggered on demand once review is complete. The exact cadence is a business decision, but the Draft-then-Final pattern itself is the standard, safe way nearly every Fusion Financials implementation uses this process.

## Recap

Create Accounting is the process that applies your accounting method's rules to real events, producing subledger journal entries. Draft mode is reviewable and safely re-runnable; Final mode is the permanent record that becomes eligible for transfer to the General Ledger. Next up, lesson 16: creating accounting in Payables and Receivables, where you'll see exactly how and when this process gets triggered in the two subledgers you already know best.
