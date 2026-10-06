# Receivables Reports: Aging and Collections

Receivables mirrors Payables on the other side of the business: instead of tracking what the company owes, these reports track what customers owe the company. This lesson covers Receivables aging, customer statements, and the collections-focused reporting that keeps cash actually coming in the door.

## What you'll learn

- Receivables aging reports, and how they differ in purpose from Payables aging
- Customer statements
- Invoice and receipts registers
- How aging data drives collections activity

## Receivables aging: a mirror image with a different urgency

Just as Payables has an aging report for unpaid invoices owed, Receivables has aging reports for unpaid invoices owed *to* the company by its customers, bucketed the same way — current, and then successive past-due ranges. The structure is similar to the Payables version, but the business urgency runs the opposite direction: an aging Payables balance is a company choosing (or being forced) to delay outgoing cash; an aging Receivables balance is incoming cash that hasn't arrived yet, directly affecting how much cash the company actually has on hand to operate with. This is why Receivables aging reports feed collections activity far more directly and urgently than Payables aging feeds anything comparable.

## Customer statements

A **customer statement** is a formatted, often BI Publisher-delivered document summarizing a specific customer's account activity — invoices issued, payments received, and the resulting balance — over a period, formatted the way a bank statement formats your own account activity. Customer statements are typically a BI Publisher job specifically because they're customer-facing: they need a consistent, professional, pixel-perfect layout (the company's logo, clear invoice references, a running balance) every single time they're generated, for potentially hundreds of customers at once, which is exactly the "pixel-perfect, templated, scheduled" use case from Chapter 4.

## Invoice and receipts registers

Beyond aging and statements, Receivables ships registers that list transactions over a period in detail:

- An **invoice register** lists invoices issued during a period, useful for audit and reconciliation purposes.
- A **receipts register** lists payments (receipts) received from customers during a period, similarly useful for confirming that recorded cash receipts match what actually came in.

These registers are the Receivables-side equivalent of the payment registers covered for Payables in lesson 26 — detail-level, audit-friendly listings rather than summarized, formatted statements.

## How aging drives collections

A collections team's daily work is largely organized around the aging report: calls and follow-ups prioritize the oldest, largest past-due balances first, with escalation (a formal demand letter, a hold on future orders, referral to a collections agency) increasing as an account ages further past due without payment. This is also a good example of where the Chapter 3 decision framework shows up in practice: a collections analyst checking aging constantly throughout the day is exactly the live, interactive use case OTBI serves well, while the formal, customer-facing statement that eventually goes out is BI Publisher's job.

## Recap

Receivables aging reports track overdue customer balances with direct, urgent cash-flow implications; customer statements are BI Publisher's pixel-perfect, customer-facing deliverable; invoice and receipts registers provide audit-level detail — together driving a collections team's daily prioritization. Next up, lesson 28: Fixed Assets and Cash Management reports.
