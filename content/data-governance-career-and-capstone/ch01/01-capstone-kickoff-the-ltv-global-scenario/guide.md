# Lesson 1 — Capstone Kickoff: The LTV Global Scenario

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 1 of 35**

## What you'll learn

- The one continuous fictional scenario this entire capstone follows —
  "LTV Global" — and why it's illustrative, not a real company
- The company's invented industry, scale, regions, and five core systems
- The specific incident that triggers the governance program you'll build
- The 12-lesson arc this chapter follows, end to end, and what you'll have
  produced by the end of it

**A note before we start, repeated throughout this course:** everything
that follows about "LTV Global" is a fictional, illustrative company
invented for this capstone. It is not a real business, it is not based on
a real company, and nothing in it is a real case study. It exists purely
so you can practice building one coherent governance program instead of
fifteen disconnected exercises.

## The company (fictional, illustrative)

**LTV Global** is a fictional mid-sized multinational consumer-products
company — it designs, manufactures, and sells outdoor and home goods
(camping gear, patio equipment, small appliances) through wholesale
retail partners and its own direct-to-consumer channels. It employs
roughly 4,800 people across three regions: headquarters in Atlanta,
Georgia (USA), a regional office in Leeds, United Kingdom, and a
distribution and sales hub in Singapore.

LTV Global is organized into six business units: **Sales & Marketing**,
**Merchandising** (product), **Operations & Fulfillment**, **Finance**,
**Customer Support**, and **IT & Data Services**. Every lesson in this
chapter adds one more piece to a single governance program built for
this company — nothing here is a real business, and no number above is
a real industry statistic; it's just enough invented scale to make the
exercises concrete.

## The systems

LTV Global's data lives in five fictional systems, and you'll see all
five again in later lessons:

- **Atlas** — the core ERP, running on SQL Server. System of record for
  purchasing, invoicing, and order-to-cash. Holds `dbo.Customers`,
  `dbo.Orders`, `dbo.OrderLines`, `dbo.Products`, and `dbo.Payments`.
- **Beacon** — a cloud CRM. Holds sales accounts, contacts, and
  opportunities — and its own copy of "customer," entered by sales reps.
- **Comet** — the direct-to-consumer e-commerce storefront. Holds web
  orders, shopping carts, and a third copy of "customer," created
  whenever someone checks out online.
- **Harbor** — the warehouse management system across six distribution
  centers. Holds inventory on hand, shipments, and returns.
- **Summit** — the intended governed analytics layer: a Snowflake-based
  warehouse, cataloged in Microsoft Purview, reported through Power BI.
  Today, almost nothing feeds it in a trustworthy, documented way.

## The trigger

Three months ago, a customer in Leeds submitted a formal data subject
access request under UK GDPR, asking LTV Global to disclose everything
it held about them. Answering took six weeks and four departments,
because no one could say with confidence where all of that person's
data actually lived. When Customer Support finally assembled an answer,
Beacon and Comet returned two different order histories for the same
person — and nobody could explain why.

That gap reached the board. LTV Global's newly hired Chief Data
Officer, **Dana Whitfield**, was given a mandate and a budget: stand up
a real data governance program, starting now. This capstone follows
that program being built, one deliverable at a time.

## What this capstone builds

Across the 12 lessons in this chapter, you'll build one continuous set
of deliverables for LTV Global, each one depending on the last:

1. A data landscape inventory (Lesson 2)
2. A scored list of critical data elements (Lesson 3)
3. Named data owners and stewards with a RACI (Lesson 4)
4. A business glossary and data dictionary (Lesson 5)
5. A sensitivity classification for key data elements (Lesson 6)
6. Real T-SQL data quality rules against Atlas (Lesson 7)
7. A documented lineage trace into Summit (Lesson 8)
8. Formally declared authoritative sources per domain (Lesson 9)
9. Access and retention policies (Lesson 10)
10. Governance KPIs and an escalation workflow (Lesson 11)
11. A chosen governance operating model (Lesson 12)

Later lessons in this chapter (13 through 18) build on this same
foundation — an AI governance strategy, an architecture diagram, and the
final assembled program documents — before the course moves into career
preparation.

## Key terms

| Term | Meaning |
|---|---|
| LTV Global | This capstone's fictional, illustrative multinational company — never a real business |
| System of record | The one system formally designated as authoritative for a given piece of data |
| DSAR | Data subject access request — an individual's formal request to see the personal data an organization holds about them |
| Golden record | A single, reconciled, trusted version of a data entity (like "customer") built from multiple source systems |

## Lab

Before Lesson 2, write a half-page "program charter" for LTV Global in
your own words: restate the DSAR incident as the business problem,
name the five systems above, and write one sentence on what you
expect the hardest part of unifying "customer" across Atlas, Beacon,
and Comet will be. You'll refer back to this charter as the scenario
develops.

## Check yourself

- Why does this lesson repeat, more than once, that LTV Global is
  fictional?
- Name LTV Global's five systems and one thing each is the source of
  today.
- What specific incident is driving this governance program, and who
  sponsored it?
