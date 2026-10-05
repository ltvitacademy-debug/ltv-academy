# Lesson 2 — Reviewing the Data Landscape

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 2 of 35**

## What you'll learn

- Why a data landscape inventory is the first deliverable of any real
  governance program, before owners, rules, or tooling
- How to build one for LTV Global: system, type, hosting, and data
  domains for all five systems from Lesson 1
- What a completed inventory actually reveals about where the risk is
- How this inventory becomes the input every later lesson in this
  chapter builds on

**Reminder:** LTV Global, Atlas, Beacon, Comet, Harbor, and Summit are
all fictional and illustrative, invented for this capstone.

## Why a landscape review comes first

You can't assign an owner to a system nobody has named, write a rule
against a column nobody has documented, or classify data nobody
realizes exists. Before Dana Whitfield's program can do anything else,
Program Lead **Marcus Ibe** (newly appointed Director of Data
Governance) runs the same exercise this course's Architecture chapter
teaches: a plain-language inventory of every system that holds data,
answering four questions per system — what kind of system is it, where
does it run, what data domains does it hold, and what role does it
actually play today, versus the role it should play.

## LTV Global's data landscape (the inventory)

Marcus's team interviews one owner per system and produces this table:

| System | Type | Hosting | Primary data domains | Today's role |
|---|---|---|---|---|
| Atlas | ERP | On-premises SQL Server | Customer, Product, Order, Payment | Finance's system of record; undocumented outside Finance |
| Beacon | CRM (SaaS) | Cloud | Customer, Sales Opportunity | Sales's own customer records, never reconciled with Atlas |
| Comet | E-commerce platform | Cloud | Customer, Web Order, Cart | A third, independent customer record, created at checkout |
| Harbor | Warehouse management | Cloud | Inventory, Shipment, Return | Operations' fulfillment data, isolated from the others |
| Summit | Analytics warehouse | Snowflake, cataloged in Purview, reported in Power BI | Intended: everything | Mostly empty — a handful of ungoverned extracts, not a real governed layer |

This is deliberately a plain inventory, not yet a technical lineage
diagram — that level of detail comes in Lesson 8, once there's a
specific flow worth tracing.

## What the review reveals

Laid out side by side, three things jump out immediately — exactly the
kind of pattern a landscape review exists to surface before anyone
writes a single rule:

- **Three independent copies of "customer."** Atlas, Beacon, and Comet
  each maintain their own record for the same people, with no
  reconciliation step between them — the root cause of the DSAR
  incident from Lesson 1.
- **Summit isn't actually governing anything yet.** The system that's
  supposed to be the trustworthy, cataloged layer is the least mature
  system in the inventory — a common finding, not a special case.
- **No system is formally documented outside its own department.**
  Atlas is well understood inside Finance and invisible everywhere
  else; the same is true of Beacon inside Sales and Comet inside
  Marketing.

## Key terms

| Term | Meaning |
|---|---|
| Data landscape inventory | A plain-language catalog of every system holding data: type, hosting, domains, and current role |
| Data domain | A logical grouping of related data, such as Customer, Product, or Order |
| System of record | The system formally designated as authoritative for a given domain — not yet decided for Customer at LTV Global |

## Lab

Build your own one-page version of the inventory table above for a
system landscape you know — your employer, a side project, or even
three apps on your own phone that all claim to know your contact
information. Use the same four columns: type, hosting, data domains,
and today's actual role versus its intended role.

## Check yourself

- Why does a landscape inventory come before owner assignment or
  quality rules, not after?
- Name the three LTV Global systems that each hold an independent
  "customer" record today.
- What did the inventory reveal about Summit specifically?
