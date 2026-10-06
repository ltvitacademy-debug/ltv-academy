# Ticket: Customer Statement Is Wrong

**Chapter 3 · Receivables and Cash Tickets · Lesson 4 of 5**

## What you'll learn

- How a customer statement is actually assembled, and what parameters shape what appears on it
- Why "wrong" can mean the statement is working exactly as configured, not broken
- How to check whether a missing invoice is a timing issue, a transaction issue, or a true statement issue
- A resolution note that distinguishes "statement is correct but confusing" from "statement is actually wrong"

## The ticket

> **Ticket #40467 — Cascade Outdoor Supply.** AR manager reports: "Customer Ridge & Pine Outfitters says their statement doesn't show an invoice they know they owe. They're threatening to withhold payment on everything until it's explained." Severity: High.

## What shapes a statement

A customer statement is generated from the customer's open and recent transactions as of a run date, using parameters that determine the window: a statement cycle (which customers are included in this run), a date range, and sometimes an "include disputed items" or similar flag. A transaction can be entirely real and correctly entered in Receivables and still not appear on a given statement run if it falls outside that run's parameters — which is a configuration/timing explanation, not a data error.

## Investigating

1. **Find the invoice the customer is asking about.** Invoice INV-11284, dated the 29th of last month, for Ridge & Pine Outfitters — it exists in Receivables and is open (unpaid).
2. **Check why it's missing from the statement.** The statement was run on the 1st of this month, covering a cycle parameter of "transactions dated through the 28th of the prior month." INV-11284 is dated the 29th — one day outside the window.
3. **Confirm this isn't a deeper issue.** The invoice itself is correctly accounted, with no holds, no misapplication — it's purely a date-boundary exclusion.

## Root cause

The invoice is dated one day after the statement cycle's cutoff date, so it was correctly excluded from this particular statement run under the configured parameters — the statement isn't malfunctioning, and the invoice isn't missing from Receivables. It's a legitimate consequence of where the cutoff falls relative to when the invoice was entered.

## Resolving it

There's nothing to "fix" in the data — both the invoice and the statement are correct given the parameters. The resolution here is **explanation plus a process check**: confirm with the customer that INV-11284 is real, open, and will appear on next month's statement (or send it to them directly now if they need it sooner). Separately, it's worth checking whether this cutoff timing causes this same confusion regularly — if invoices routinely get dated right around the cycle boundary, that's worth raising with AR management as a process question, not something a single ticket should silently work around.

## Documenting it

> **Ticket #40467 — Cascade Outdoor Supply.** Customer Ridge & Pine Outfitters reported invoice INV-11284 missing from their statement.
> **Root cause:** Invoice is dated the 29th of the prior month; the statement cycle cutoff is the 28th, so the invoice correctly fell outside this run's window. No data or setup error.
> **Fix:** None required to the data. Sent the customer a copy of INV-11284 directly and confirmed it will appear on next month's regular statement.
> **Verified:** Confirmed invoice is open, correctly accounted, and carries no holds.
> **Note:** Flagging to AR management that invoices dated near month-end routinely raise this same question — worth considering whether the cycle cutoff should be adjusted.

## Key terms

| Term | Meaning |
|---|---|
| Statement cycle | The parameter set defining which customers and date range a statement run covers |
| Cutoff date | The date boundary beyond which a transaction won't appear on that statement run |
| Timing exclusion | A transaction correctly omitted from a report because it falls outside the run's parameters, not because of an error |

## Check yourself

Why is it important to distinguish "the statement is wrong" from "the statement is correct but the customer is confused by a timing boundary," and how did this investigation tell the two apart?
