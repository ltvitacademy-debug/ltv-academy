# Payables Work Areas and the Invoice Lifecycle

Now that you know where Payables sits in the procure-to-pay chain, it's time to open the application itself. Oracle Fusion organizes Payables around a small number of **work areas** — landing pages built around the daily job of an AP specialist — and every invoice that enters one of those work areas travels through a predictable **lifecycle** of statuses. Learn the work areas and the lifecycle together, and almost every screen you see later in this course will already make sense.

## What you'll learn

- What a "work area" is in Oracle Fusion, and the two that matter most to Payables
- The infotiles on the Invoices work area and what each one is telling you
- The four separate status fields every invoice carries, and why they're separate
- How to read an invoice's current state at a glance

## Work areas: landing pages built for a job, not a menu

A work area in Oracle Fusion is a dashboard-style landing page built around a role's daily tasks, rather than a flat list of menu items. It typically shows **infotiles** — clickable summary tiles — across the top, with a content area below that fills in once you click one.

The two work areas you'll live in as a Payables user are:

- **Invoices** — the home base for entering, finding, validating, and resolving problems with invoices. Infotiles here commonly include invoices awaiting entry or import, invoices with holds, invoices awaiting approval, and invoices due for payment soon.
- **Payments** — where payment process requests are built, payment files are reviewed, and issued payments are tracked. This course covers it in Chapter 6.

Suppliers themselves live in a separate **Suppliers** work area, shared with Procurement, which Chapter 2 of this course covers in depth.

## The Invoices work area, infotile by infotile

Open the Invoices work area for a typical AP specialist and you'll usually see tiles summarizing:

- Invoices still **incomplete** or awaiting import that need to be finished
- Invoices currently on **hold** and blocked from payment
- Invoices **pending approval**, broken out by whose approval is pending
- Invoices **due for payment** in upcoming aging buckets (for example, due in 7 days, 30 days)

Clicking any tile drops a filtered table into the content area below — this is the fastest way to triage a day's work without running a report first.

## An invoice's lifecycle is four statuses, not one

It's tempting to think of an invoice as moving through one single status — "entered," then "approved," then "paid." Oracle Fusion actually tracks **four independent status fields** on every invoice, because each one answers a different question:

1. **Invoice status** — has the invoice passed validation? (Incomplete, Never Validated, Needs Revalidation, Validated, Cancelled)
2. **Approval status** — has it cleared the approval workflow, if one applies? (Required, Not Required, Initiated, Approved, Rejected)
3. **Accounting status** — has it been accounted to the ledger? (Unaccounted, Partially Accounted, Accounted)
4. **Payment status** — has it been paid? (Unpaid, Partially Paid, Paid)

These are independent on purpose. An invoice can be **Validated**, **Approved**, and still **Unpaid** and **Unaccounted** — that's a completely normal, healthy state for an invoice sitting in the queue a week before its due date. A holds problem only ever blocks the invoice status and, through it, payment; it has nothing to do with whether the invoice was approved.

## Why separating these statuses matters in practice

When a supplier calls asking "where's my payment," a one-field status wouldn't tell you much. Four fields let you answer precisely: the invoice validated cleanly, it was approved three days ago, it has been accounted, and it is sitting unpaid only because its due date is still eleven days away. Each lesson in this course maps onto one of these four fields — validation and holds affect invoice status, Chapter 4 covers approval status, accounting status is Chapter 7, and payment status is Chapter 6.

## Recap

Payables work is organized around work areas, with Invoices as the daily home base and infotiles as the entry point into anything needing attention. Every invoice carries four separate status fields — invoice, approval, accounting, and payment — that move somewhat independently of each other. Next up, lesson 3: a review of the Payables setup that has to exist before any of this can work.
