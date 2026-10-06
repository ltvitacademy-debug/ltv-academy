# Lesson 37 — Creating Accounting in Payables · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Last lesson covered the accounting rules. This lesson covers the process that actually runs them: Create Accounting.

## S2 · STEPS

Create Accounting runs against every outstanding, unaccounted transaction — invoices, payments, prepayment applications — and generates the journal entries behind them. It can run on demand or on a schedule, typically at the business unit or ledger level.

## S3 · STEPS

It runs in one of two modes. Draft generates entries for review without posting anything permanently — useful for catching setup errors first. Final generates permanent entries, which can then move on to becoming GL journals depending on the transfer option selected.

## S4 · CODE

Here's an illustrative example. Harbor Point Logistics has thirty validated invoices and twelve payments from the past week. Running Create Accounting in Draft mode shows all forty-two would account cleanly, except one invoice, which errors out because its expense account combination doesn't exist in the chart of accounts.

## S5 · CODE

That invoice gets corrected. Create Accounting runs again in Final mode for all forty-two transactions, and this time it generates forty-two complete journal entries with no errors.

## S6 · OUTRO

Draft to catch problems, Final to post for real — and the accounting date itself is controlled by setup, not chosen per transaction. Next up, lesson thirty-eight: the Payables to General Ledger transfer, where these journals actually reach the GL.
