# Status Flags and Lifecycle Columns

Every lesson in this chapter has quietly pointed at the same idea: a transaction doesn't just exist or not exist — it moves through stages, and those stages are recorded in status columns scattered across multiple tables, not conveniently summarized in one place. This lesson makes that idea explicit, so you can read a transaction's lifecycle correctly instead of guessing at it from one column.

## What you'll learn

- Why a transaction's lifecycle is recorded across several tables, not one
- How AP invoice status differs in meaning from AR's "open balance" approach
- What posting-related status columns tell you about the subledger-to-GL handoff
- A practical habit for reading any unfamiliar status column

## A lifecycle has stages, and each stage leaves a mark

Think about everything that happens to a single supplier invoice: it's entered, then validated (checked for completeness and matched against a PO if required), then accounted (a subledger journal entry is generated), then posted to GL, then scheduled for payment, then actually paid. Each of those stages leaves evidence somewhere — sometimes a status column on the header, sometimes a status on a related table, sometimes just a timestamp with no explicit "status" word at all. There's no single `LIFECYCLE_STAGE` column anywhere that summarizes all of this; you have to know which table holds which piece.

## AP: a status column exists, but doesn't tell the whole story

`AP_INVOICES_ALL` carries a status column reflecting the validation/accounting state of the invoice header itself (broadly: whether it's been validated, and whether it's been cancelled). But that column says nothing about whether the invoice has been *paid* — that's a completely separate fact, living in `AP_INVOICE_PAYMENTS_ALL`, as covered in lesson 9 and reinforced in lesson 11. Reading only the header status and assuming it tells you payment state is a common, avoidable mistake.

## AR: no single "paid" flag — a stored balance instead

Receivables takes a different approach for the "is it settled" question. Rather than a single payment-state flag, `AR_PAYMENT_SCHEDULES_ALL` carries a `STATUS` (commonly OPEN or CLOSED) alongside a numeric amount-due-remaining figure. The numeric figure is the actually authoritative signal — a transaction's status can say OPEN while its remaining balance is a very small leftover amount from a rounding adjustment, and a careful query checks the amount, not just the status word, depending on exactly what question is being asked.

## Posting status: has this reached the General Ledger yet?

Separately from "has this been paid," there's the question of whether a subledger transaction's accounting has actually made it into the General Ledger. Distribution-level and subledger accounting tables carry their own posting-related status indicating whether a distribution's accounting has been transferred to GL yet. This is a different axis entirely from payment status — an invoice can be posted to GL and still unpaid, or (less commonly, and worth investigating if you see it) paid before its accounting was ever transferred. Chapter 4 picks this exact thread back up when you study the subledger-to-GL handoff directly.

## A practical reading habit

When you encounter an unfamiliar status or flag column, don't assume you know what it governs just because it's on the same row as other data you understand. Ask three questions: What table is this column on? What specific thing does *that table* represent (header, line, distribution, schedule)? And does the documented description (lesson 3's skill) match what you assumed? That habit will catch the invoice-status-versus-payment-status confusion, and dozens of others like it, before it turns into a wrong report.

## Recap

A transaction's lifecycle is recorded across multiple tables, not summarized in one place. AP's header status reflects validation/accounting state, not payment state. AR relies on a stored remaining-balance figure in `AR_PAYMENT_SCHEDULES_ALL` rather than a single payment flag. Posting status (has accounting reached GL) is a separate axis again. Chapter 3 is complete — you now understand how both subledgers represent their core transactions. Next up, Chapter 4: Ledger Data, where you'll see exactly where all of this accounting ends up.
