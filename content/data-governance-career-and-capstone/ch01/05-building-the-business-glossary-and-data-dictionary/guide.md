# Lesson 5 — Building the Business Glossary and Data Dictionary

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 5 of 35**

## What you'll learn

- How to write glossary definitions for LTV Global's core business
  terms that pass a four-part clarity test
- How to pull real structural facts for a data dictionary straight
  from `INFORMATION_SCHEMA`, instead of a blank template
- How the glossary and dictionary link together for the same element
- Why "Customer" needed a harder definition than it looks like it does

**Reminder:** LTV Global, its systems, and the schema shown below are
fictional and illustrative, invented for this capstone.

## The four-part test, applied to "Customer"

A usable glossary definition states **what the term is**, **what it
explicitly excludes**, **how it's measured or identified**, and **who
approved it**. Steward Priya Anand drafts the term that matters most
after Lesson 1's incident:

> **Customer** — An individual or company that has placed at least one
> completed order with LTV Global within the past 24 months, uniquely
> identified by a reconciled Customer ID in Summit (see Lesson 9),
> never by any single source system's internal ID alone. This
> explicitly excludes a **Prospect** — someone with a Beacon record and
> no completed order. Approved by data owner Renata Silva.

Two more terms get the same treatment:

> **Order Total** — The sum of all order line extended prices, plus
> shipping and tax, minus applied discounts, in the selling region's
> currency, as calculated by Atlas at order completion. Excludes
> **Cart Value**, Comet's pre-checkout subtotal before tax and
> shipping are applied. Approved by data owner Grant Lindqvist.

> **Product** — An item LTV Global sells, uniquely identified by the
> SKU Atlas assigns when the item is approved for sale. A discontinued
> item keeps its SKU permanently; SKUs are never reused for a different
> item. Approved by data owner Tom Okafor.

## Building the dictionary from the real schema

A data dictionary documents the actual columns, not an idealized
version of them. Pulling structural facts straight from Atlas's
`INFORMATION_SCHEMA` is faster and more accurate than writing the
dictionary from memory:

```sql
SELECT c.TABLE_SCHEMA, c.TABLE_NAME, c.COLUMN_NAME,
       c.DATA_TYPE, c.CHARACTER_MAXIMUM_LENGTH, c.IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS AS c
WHERE c.TABLE_NAME IN ('Customers', 'Orders', 'Products')
ORDER BY c.TABLE_NAME, c.ORDINAL_POSITION;
```

That query returns the real shape of each table — type, length,
nullability — which the dictionary then pairs with the glossary-linked
business meaning:

| Column | Data type | Nullable | Glossary term |
|---|---|---|---|
| `dbo.Customers.Email` | `VARCHAR(255)` | No | Links to **Customer** — the contact address, not an identity key on its own |
| `dbo.Orders.OrderTotal` | `DECIMAL(12,2)` | No | Links to **Order Total** above |
| `dbo.Products.SKU` | `VARCHAR(20)` | No | Links to **Product** above |

Each dictionary row names the real column and its real type, and then
points at the glossary term that gives it business meaning — the same
pairing Lesson 3's CDE list, Lesson 4's owners, and the quality rules
in Lesson 7 all rely on being consistent.

## Key terms

| Term | Meaning |
|---|---|
| Business glossary | The collection of business-term definitions passing the four-part test |
| Data dictionary | The documentation of actual columns — type, nullability, constraints — tied to glossary terms |
| INFORMATION_SCHEMA | SQL Server's built-in metadata views describing real tables and columns |

## Lab

Write a four-part-test definition for one term from your own work or
a hobby project that currently means slightly different things to
different people (LTV Global's example: "Customer"). Then run an
`INFORMATION_SCHEMA.COLUMNS` query against one real table you have
access to, and pair one of its columns with your new definition.

## Check yourself

- What four things does a usable glossary definition have to state?
- Why does "Customer" explicitly exclude a Beacon lead with no
  completed order?
- Why pull dictionary facts from `INFORMATION_SCHEMA` instead of
  writing them from memory?
