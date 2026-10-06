# Script — Reimbursements Through Payables

## Segment 1 (title)

An approved expense report is not yet a payment. Lesson one called Expenses a feeder system, and this lesson shows exactly how that handoff works: an approved report becomes an invoice in Payables, and follows the same payment process you learned in the Payables course.

## Segment 2 (steps)

Once a report finishes approval, a scheduled process called Process Expense Reimbursement picks it up. It populates the Payables Open Invoice Interface tables with one child line per eligible expense item - the amount, tax classification, project info, payment method, and critically, the correct payee. Then it invokes Import Payables Invoices, the same open interface architecture used for other invoice-import sources.

## Segment 3 (steps)

Who's the payee depends on card liability from lesson nine. For cash expenses and individual-liability card transactions, the payee is the employee. For company-liability card transactions, the payee is the corporate card issuer directly, since the company owes that balance, not the employee.

## Segment 4 (code)

A single report can even produce two different payees. A cash taxi receipt of thirty-four dollars becomes an invoice paying the employee. A company-liability hotel charge of eight twenty-five on the same report becomes a separate invoice paying the card issuer instead.

## Segment 5 (steps)

Why route this through a standard invoice instead of a separate payment mechanism? Because every reimbursement then automatically gets Payables' existing controls for free - payment terms, payment process requests, positive pay, payment holds, AP aging. A consultant never has to build a second payment pipeline.

## Segment 6 (outro)

The Import Payables Invoices Report lists what succeeded and what failed, with a specific reason - a bad GL account, an inactive payee, a currency mismatch. A failed expense invoice means an employee is waiting on money that hasn't actually moved. Up next, lesson thirteen: what happens when a report needs correcting after submission.
