# Reimbursements Through Payables

An approved expense report is not yet a payment. Lesson 1 called Expenses a feeder system, and this lesson shows exactly how that handoff works: an approved report becomes an invoice in Oracle Fusion Payables, and from there follows the same payment process you learned in the Payables course.

## What you'll learn

- The Process Expense Reimbursement program and what it does
- How expense data lands in the Payables Open Interface
- Why expense reports become invoices, specifically, not direct payments
- How individual-liability and company-liability reimbursements differ at this stage

## From approved report to Payables invoice

Once an expense report finishes approval, a scheduled process called **Process Expense Reimbursement** picks it up. This program does two things:

1. It invokes the **Import Payables Invoices** process in Payables.
2. Before doing so, it populates the **Payables Open Invoice Interface** tables with the data Payables needs to build an invoice: one child line per eligible expense item, carrying the expense amount, tax classification, project and task information (if relevant), payment function, payment method, and — critically — the correct **payee**.

This is the same open interface architecture used for other invoice-import sources, which is why the skills you built in the Payables course for troubleshooting import issues apply directly here.

## Who is the payee?

The payee on the resulting invoice depends on card liability, covered in lesson 9:

- For **cash expenses** and **individual-liability card transactions**, the payee is the **employee**.
- For **company-liability card transactions**, the payee is the **corporate card issuer**, not the employee, since the company owes the issuer directly.

A single expense report can generate invoice lines with two different payees at once — Castellan reimburses the employee directly for a cash meal on the same report that also pays the card issuer for a company-liability hotel charge, as two separate resulting invoices.

```
Expense report -> Payables invoices (illustrative)
  Item: Cash taxi receipt         $34.00   -> Invoice payee: Employee
  Item: Company-liability hotel  $825.00   -> Invoice payee: Card Issuer
```

## Why an invoice, not a direct payment

Routing expense reimbursement through the standard Payables invoice process, rather than some separate payment mechanism unique to Expenses, means every reimbursement automatically benefits from Payables' existing controls: payment terms, payment process requests, positive pay files, payment holds, and the same AP aging and liability reporting used for supplier invoices. A consultant does not need to build or maintain a second payment pipeline.

## Validating the import

The **Import Payables Invoices Report** lists every invoice the process created successfully, and separately lists any invoice data that failed to import along with the specific reason — a missing or invalid GL account combination, a payee record that isn't active, or a currency mismatch are the most common causes at Castellan. An AP analyst (or a consultant during testing) reviews that failure list the same way they would review any other invoice import exception, since a failed expense invoice means an employee is waiting on money that has not actually moved yet.

## Recap

Approved expense reports flow into Payables through Process Expense Reimbursement, which populates the standard Open Invoice Interface and triggers Import Payables Invoices — the exact same mechanism used for other invoice sources. The payee is the employee for cash and individual-liability charges, and the card issuer for company-liability charges. Failures surface on the Import Payables Invoices Report just like any other import. Next up, lesson 13: what happens when a report needs to be corrected after submission, instead of sailing straight through.
