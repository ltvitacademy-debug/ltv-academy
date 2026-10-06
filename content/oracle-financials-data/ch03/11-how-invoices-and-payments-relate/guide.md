# How Invoices and Payments Relate

Lessons 8 through 10 walked through Payables and Receivables separately, table by table. This lesson steps back and puts both chains side by side, because the pattern underneath them is genuinely the same shape, just wearing different names. Seeing that shared shape is what lets you write a SQL query against either side of the business — in the next course — without re-learning the logic from scratch.

## What you'll learn

- The full AP chain, from invoice header to distribution to payment, in one view
- The full AR chain, from transaction header to line to receipt application, in one view
- Why both chains follow the same header → line → money-matching pattern
- Why a single flag is never enough to answer "is this paid"

## The Payables chain, end to end

```
AP_INVOICES_ALL (header, INVOICE_ID)
    ├── AP_INVOICE_LINES_ALL (what was billed)
    │       └── AP_INVOICE_DISTRIBUTIONS_ALL (how it's accounted)
    └── AP_INVOICE_PAYMENTS_ALL (how much has been paid, and by which payment)
```

An invoice's header carries the total; its lines and distributions explain what was billed and how it's accounted; and separately, its payment applications explain how much of it has actually been settled. These two branches — accounting detail and payment detail — don't depend on each other; an invoice can be fully accounted and posted to GL long before it's paid, or fully paid while an accounting correction is still pending.

## The Receivables chain, end to end

```
RA_CUSTOMER_TRX_ALL (header, CUSTOMER_TRX_ID)
    ├── RA_CUSTOMER_TRX_LINES_ALL (LINE / TAX / FREIGHT)
    ├── AR_PAYMENT_SCHEDULES_ALL (the authoritative balance due)
    └── AR_RECEIVABLE_APPLICATIONS_ALL (receipts matched against it)
            └── AR_CASH_RECEIPTS_ALL (the money that came in)
```

The shape is the same: a header, lines that explain what was billed, and a separate branch that tracks money matching. The difference is vocabulary (receipt instead of payment, applied instead of paid) and the fact that AR gives you a dedicated balance table (`AR_PAYMENT_SCHEDULES_ALL`) rather than making you sum applications yourself the way you would in AP.

## The pattern that repeats

Strip away the product-specific prefixes and both chains reduce to the same three ideas:

1. **A header** that represents one transaction and carries its total
2. **Lines** that explain what that total is made of
3. **A money-matching table** that records how (and how much) the transaction has actually been settled, separate from the header and lines

This is a useful mental shortcut: once you understand one side deeply, you're not starting from zero on the other — you're mostly relearning vocabulary, not relearning structure. It also explains why Oracle Fusion feels consistent once you've worked with more than one subledger: the underlying design discipline repeats on purpose.

## Why one flag is never enough

Precisely because money-matching lives in a separate branch from the header, you can never trust a single cached flag on the header to answer "is this paid/applied?" with full confidence — the real answer always requires joining into the money-matching branch and checking amounts, not reading a status column in isolation. This is the exact setup for lesson 12, which looks at status and lifecycle columns across the whole model in more depth.

## Recap

AP and AR each split into a header/lines branch (what was transacted) and a separate money-matching branch (what's been settled). The vocabulary differs — payments versus receipts, `AP_INVOICE_PAYMENTS_ALL` versus `AR_RECEIVABLE_APPLICATIONS_ALL` — but the structural pattern is identical. Trusting a single header-level flag over actually joining into the money-matching tables is a common and avoidable mistake. Next up, lesson 12: status flags and lifecycle columns, examined directly.
