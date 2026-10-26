# Lesson 1 — The Ask Grows: Two Stakeholders, One Messy Dataset

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 1 of 16**

## What you'll learn

- How this project differs from the Beginner project: two stakeholders, not one
- The two real asks: a customer-segment view and a territory benchmark view
- Why two independently-pulled extracts don't automatically combine cleanly
- The shape of the pipeline this project is going to build, stage by stage

## Where the Beginner project left off

At Thornbury Cycle Supply Co., the Beginner project solved one problem for one person: a single
clean T-SQL extract, straight into Power BI, answering one stakeholder's question. That's a real
and common shape of BI work — but it's not the only shape. This project starts the moment that
assumption breaks.

## Two stakeholders, two different questions

Two people independently ask for a report in the same week:

- The **Marketing Manager** wants to understand the sales mix between **Individual customers**
  and **Store/Reseller customers** — not a marketing segmentation score, but a real distinction
  that already exists in Thornbury's own sales data: some customers are individual people buying
  for themselves, and some are stores or resellers buying on account.
- The **Sales Director** wants a **territory benchmark**: how each sales territory's total
  compares to the company as a whole, so a region's performance can be read in context instead of
  as an isolated number.

Two different questions, on two different grains of the same underlying sales data.

## Two different extracts, pulled by two different people

Because the two asks look unrelated at first, two different people pull two different T-SQL
extracts from Thornbury's AdventureWorks2012 database: one focused on customer-level detail, one
focused on territory-level detail. Each extract looks fine on its own.

The trouble starts when someone tries to combine them into a single Power BI model so both pages
can live in one report, sharing one refresh schedule. Lined up side by side, the two extracts
don't agree cleanly — some customer rows show up more than once, and a few values don't match
between the two files the way they should. That's not a one-off fluke. It's what happens, in real
BI work, when two people pull overlapping data independently without a shared plan.

## What this project is actually building

Rather than patch the two extracts by hand in Excel, this project builds a real, repeatable
pipeline: a T-SQL extract stage, a Python cleaning-and-joining stage, and a Power BI modeling and
reporting stage — one combined, reliable dataset feeding two report pages, one for each
stakeholder. Lesson 2 lays that pipeline out in plain English before any code gets written.

## Key terms

| Term | Meaning |
|---|---|
| Individual customer | A `Sales.Customer` row with `PersonID` populated — a person buying directly |
| Store/Reseller customer | A `Sales.Customer` row with `StoreID` populated — a store or reseller account |
| Extract | A query result pulled out of a source database for use somewhere else |
| Sales mix | The share of total sales coming from each of two or more categories |

## Lab

Without writing any SQL yet, write down in plain English: what table and columns would the
Marketing Manager's question need, and what table and columns would the Sales Director's question
need? Note where the two overlap (hint: both ultimately need order totals).

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: what are the two separate
stakeholder questions in this project, and why don't two independently-pulled extracts combine
cleanly just because they both come from the same database?
