# Lesson 1 — What SQL Is and How Finance Uses It

**Chapter 1 · SQL Foundations for Finance · Lesson 1 of 5**

## What you'll learn

- What SQL actually is, and why a financials consultant needs it
- The running example this entire course builds toward
- Where SQL fits next to the Oracle Fusion screens you already know
- The handful of statement types you'll touch in this course

## Why a functional consultant needs SQL at all

Every Oracle Fusion Financials screen you've used so far — Manage Invoices,
Manage Receipts, the General Accounting dashboard — is a user interface sitting
on top of a database. Click a button, and behind the scenes Oracle runs a
query against tables like `AP_INVOICES_ALL` or `GL_JE_LINES` and hands the
result back to the screen.

Most of the time the screens are enough. But Finance doesn't always ask
questions the screens were built to answer. Finance asks things like:

> "Give me every unpaid supplier invoice over $10,000 that's more than 30 days
> old."

No standard Payables inquiry screen has a single button for that — it mixes a
dollar threshold, an age calculation, and a payment-status filter all at once.
**SQL** (Structured Query Language) is how you answer it directly: you tell
the database exactly which tables to look at and exactly which rows qualify,
and it hands back precisely that list.

## The challenge this course builds toward

That unpaid-invoice question isn't a hypothetical — it's the running example
this course returns to again and again, a little more sophisticated each
time, until Chapter 5 builds the complete, production-ready version of it.
By the end of this course you'll be able to write it, explain every clause in
it, and adapt the same pattern to dozens of similar finance questions:
overdue receivables, unapplied cash, journals that don't balance, duplicate
payments.

## SQL is a request, not a program

A SQL statement doesn't describe *how* to find the answer step by step, the
way a traditional program would. It describes *what* result you want, and the
database figures out how to produce it:

```sql
SELECT invoice_num, invoice_amount
FROM ap_invoices_all
WHERE invoice_amount > 10000;
```

Read that almost like English: "Give me the invoice number and invoice
amount, from the invoices table, where the invoice amount is over ten
thousand." That's the whole mental model for this entire course — you
describe the result, SQL describes nothing about the mechanics.

## The statement types you'll use here

This course is about **reading and investigating** financial data, not
changing it, so it focuses on one SQL statement almost exclusively:

| Statement | Purpose | Used in this course? |
|---|---|---|
| `SELECT` | Retrieve rows that match a condition | Yes — nearly every lesson |
| `INSERT` | Add new rows | No — that's a data-loading concern (FBDI/ADFdi) |
| `UPDATE` | Change existing rows | No |
| `DELETE` | Remove rows | No |

A consultant who can write a precise `SELECT` can investigate almost any
question Finance raises without waiting on IT to build a custom report.

## Key terms

| Term | Meaning |
|---|---|
| SQL | Structured Query Language — the standard language for querying relational databases |
| `SELECT` | The statement that retrieves rows from one or more tables |
| Oracle SQL | Oracle Database's dialect of SQL — mostly standard, with some of its own syntax (covered as it comes up) |

## Lab

No database needed yet — just write down, in plain English, three other
finance questions you've been asked (or can imagine being asked) that a
standard Oracle Fusion screen couldn't answer in one click. You'll recognize
the shape of several of them again by Chapter 5.

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: why can SQL
answer a question like the unpaid-invoices-over-$10,000 example when a
standard inquiry screen often can't, and which single SQL statement does
nearly all the work in this course?
