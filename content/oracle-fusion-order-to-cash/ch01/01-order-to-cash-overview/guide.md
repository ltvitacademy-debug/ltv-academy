# Order-to-Cash Overview

Welcome to Oracle Fusion Order-to-Cash, part of the "End-to-End Business Processes" stage of the Oracle Fusion Financials Consultant path. In Procure-to-Pay you followed a single purchase across the buying side of the business, from requisition to the supplier's cash. This course follows the mirror process: a sale, from the moment a customer places an order to the moment the resulting revenue is sitting correctly in the General Ledger and the customer's cash is in the bank.

## What you'll learn

- What "Order-to-Cash" (O2C) means as a business process, not just a system module
- The five areas of Oracle Fusion a single sales order can touch, in sequence
- Why O2C is called a cycle, and what "closing the loop" means
- How this course connects to Receivables, Cash Management, and Subledger Accounting

## One sale, five stops

A customer calling to place an order feels like one event. Inside Oracle Fusion, that one event can touch five different areas before it is finished:

1. **Order Management** captures what the customer wants, at what price, and under what terms, and decides whether the order is allowed to proceed (credit checks, approvals, holds).
2. **Inventory and Shipping** picks, packs, and ships the physical goods, and tells the rest of the system that the goods actually left the warehouse.
3. **Receivables** turns the shipped order into a legal demand for payment: an invoice, sent to the customer, with a due date.
4. **Cash Management** receives and matches the customer's payment against that invoice.
5. **General Ledger**, by way of Subledger Accounting, records the accounting impact: revenue recognized, a receivable created, and later, cash replacing that receivable.

Every one of those areas has its own course in this path, or close to it. This course's job is not to re-teach any of them from scratch — it is to show you how a single order moves across all five, in the order they actually happen, and what a consultant needs to understand at each handoff.

## Why "cycle," not "transaction"

A purchase is a transaction: it happens once, documents are created, and it's done. Order-to-Cash is called a cycle because what happens at the end feeds the beginning of the next one. A customer's payment history and open balance affect whether their next order passes a credit check. An unresolved billing dispute can delay the next invoice from going out cleanly. A pattern of late payments can raise a customer's risk tier in the next round of order approvals. Treating O2C as a straight line, rather than a loop, is one of the most common mistakes a new functional consultant makes — and it is why troubleshooting an O2C issue often means looking backward into an earlier cycle, not just forward in the current one.

## How this fits the rest of your path

By this point you've learned Enterprise Structures and Chart of Accounts, General Ledger, Accounts Payable, and Accounts Receivable, and Procure-to-Pay has shown you the buying side end to end. This course assumes you remember how a Receivables invoice and a cash receipt work from the Accounts Receivable course — it will not re-explain transaction types or receipt classes from zero. What it adds is Order Management: the piece that generates the invoice in the first place, and the holds, approvals, and pricing decisions that happen before Receivables ever sees a transaction.

## Recap

Order-to-Cash is the process that turns a customer's order into cash in the bank and correctly recorded revenue, moving through Order Management, Shipping, Receivables, Cash Management, and the General Ledger. It is a cycle, not a one-way transaction, because what happens at the end shapes what happens at the start of the next one. Next up, lesson 2: the stages of the customer lifecycle and the people responsible for each one.
