# Invoice Types

Chapter 2 built the supplier side of Payables; Chapter 3 turns to the document everything else in this course revolves around: the invoice. Not every invoice looks the same, though, and Oracle Fusion gives each shape its own **invoice type** so Payables knows how to treat it — whether it owes money, returns money, or references another invoice entirely.

## What you'll learn

- The seven invoice types Payables supports, and what each one is for
- The difference between a credit memo and a debit memo — a distinction almost everyone mixes up at first
- What makes a mixed invoice different from a standard one
- Which invoice types later chapters return to in depth

## The seven invoice types

- **Standard** — the ordinary case: an invoice from a supplier for goods or services rendered, representing an amount Brightfield owes. This is the type every example so far in this course has implicitly assumed.
- **Credit memo** — a document from the supplier extending credit, reducing what Brightfield owes them. The supplier issues this; Brightfield records it.
- **Debit memo** — the mirror image: credit Brightfield claims from a supplier *who hasn't issued a credit memo themselves*. If Vantree Industrial Parts overbilled Brightfield and hasn't sent a correction, Brightfield can record a debit memo internally to reflect the credit it believes it's owed.
- **Mixed** — a single document combining both positive and negative line items, effectively a standard invoice and a credit memo rolled into one. Useful when a supplier bills for new goods and nets out a return or adjustment on the same document.
- **PO Price Adjustment** — corrects the price on an invoice that's already matched to a purchase order, after the fact, without reversing the whole original invoice.
- **Prepayment** — an advance payment made to a supplier before the related goods or services are actually billed, later applied against a future standard invoice to reduce what's owed on it.
- **Expense Report** — captures an employee's reimbursable expenses as a payable transaction, so Payables (not just HR or payroll) handles reimbursing the employee.

## Credit memo vs. debit memo: who issues it

This is the single most common point of confusion in this lesson, so it's worth stating plainly: a **credit memo comes from the supplier** — they're telling you they owe you credit. A **debit memo is recorded by Brightfield** when Brightfield believes it's owed credit but the supplier hasn't formally issued one. Functionally, both reduce what's owed; the difference is about who originated the document and why. Chapter 5 (matching and special invoices) covers both of these, along with prepayments, in practical detail.

## Mixed invoices: one document, both directions

A mixed invoice exists because real supplier billing isn't always one clean direction. If Solara Packaging Co. bills Brightfield $5,000 for a new shipment but also credits $300 for a prior short shipment on the very same statement, a mixed invoice records both lines on one invoice rather than requiring two separate documents (a standard invoice and a separate credit memo) that then have to be reconciled against each other manually.

## Why invoice type matters beyond labeling

Invoice type isn't just a label for a report — it changes how Payables behaves. A credit memo or debit memo naturally carries a negative amount and typically can't be matched to a purchase order the same way a standard invoice is. A prepayment invoice follows its own application rules (Chapter 5) rather than simply being paid and closed. Choosing the right type up front avoids having to correct the invoice later.

## Recap

Payables recognizes seven invoice types — Standard, Credit Memo, Debit Memo, Mixed, PO Price Adjustment, Prepayment, and Expense Report — each describing a different real-world billing situation. Credit memos come from the supplier; debit memos are recorded by Brightfield when the supplier hasn't issued one. Next up, lesson 13: creating standard invoices, the type you'll use constantly.
