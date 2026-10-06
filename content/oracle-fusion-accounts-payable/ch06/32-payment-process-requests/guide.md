# Lesson 32 — Payment Process Requests

**Chapter 6 · Payments · Lesson 32 of 42**

## What you'll learn

- What a Payment Process Request (PPR) is and the problem it solves
- The stages a PPR goes through, from selection to final payment
- The selection criteria that decide which invoices get pulled in
- Why PPRs include a review step before anything is final

## Why batch, instead of paying invoice by invoice

An organization might have hundreds of invoices due on any given day. Paying each one individually — the quick-payment approach from Lesson 31 — doesn't scale. A **Payment Process Request (PPR)** is the batch process that selects every eligible invoice due for payment, groups them sensibly, and builds the actual payments in one run, whether triggered on a schedule or submitted on demand.

## The stages of a PPR

1. **Selection** — the PPR scans open, validated, unpaid invoices against criteria you define: due date range, business unit, supplier, payment priority, pay group, and so on.
2. **Build proposed payments** — selected invoices are grouped according to the rules in the applicable Payment Process Profile (one payment per supplier, one per invoice, etc.) into a set of **proposed payments** — not yet final.
3. **Review** — before anything is submitted, the proposed payments can be reviewed: removing an invoice that shouldn't be paid yet, adjusting a payment date, or pulling a supplier out entirely if a dispute just surfaced.
4. **Build payments** — once reviewed and confirmed, the PPR creates the actual payment records.
5. **Format / generate payment file** — the final output: either a printable check layout or an electronic payment file (covered in Lesson 33), ready for transmission.

## Selection criteria that matter most

| Criterion | What it controls |
|---|---|
| **Pay through date** | Only invoices due on or before this date are picked up |
| **Pay group** | A grouping (e.g., "Employees," "Trade Suppliers") used to run separate PPRs for different invoice populations |
| **Business unit** | Restricts the PPR to one or more operating units |
| **Payment priority** | A numeric ranking on the invoice that can be used to sequence or filter which invoices get paid first when funds are limited |

## Illustrative example

**Solace Robotics** (fictional, reused from Lesson 27) runs a weekly PPR every Thursday for its "Trade Suppliers" pay group, with a pay-through date of the following Wednesday. The PPR selects 42 validated invoices across 15 suppliers, groups them into 15 proposed payments (one per supplier) under the "US Domestic ACH" Payment Process Profile, and presents them for review. The AP supervisor pulls one supplier's invoice out of the batch because a credit memo is expected imminently, approves the remaining 14 proposed payments, and the PPR proceeds to build and format those payments into a NACHA file.

## Why the review step exists

Automating selection doesn't mean removing human judgment — the review stage is the deliberate checkpoint where someone confirms the batch makes sense before money actually moves, which is exactly the kind of control a fully automatic, no-review process would be missing.

## Key terms

| Term | Meaning |
|---|---|
| Payment Process Request (PPR) | The batch process that selects, groups, and pays eligible invoices |
| Proposed payment | A grouped, not-yet-final payment awaiting review within a PPR |
| Pay group | A categorization used to run separate PPRs for different invoice populations |

## Check yourself

You're ready for Lesson 33 when you can answer, without looking: what are the five stages a Payment Process Request moves through, from selection to a finished payment file?
