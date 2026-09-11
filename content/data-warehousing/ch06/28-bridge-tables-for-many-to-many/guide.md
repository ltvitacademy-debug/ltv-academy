# Lesson 28 — Bridge Tables for Many-to-Many Relationships

**Chapter 6 · Advanced Warehouse Patterns · Lesson 28 of 39**

## What you'll learn

- Why some real-world relationships genuinely can't be modeled as
  clean one-to-many, no matter how the fact table is designed
- What a bridge table is, and the two one-to-many relationships it's
  built from
- A concrete example: multiple salespeople credited on one sale
- Why a bridge table, without any other columns, is itself a
  factless fact table

## When one-to-many isn't the truth

Every dimension you've modeled so far relates to its fact table
through a clean one-to-many relationship: one product can appear on
many sales lines, one customer can place many orders. That works
because, in those cases, the *real-world* relationship actually is
one-to-many.

Some relationships aren't. Consider crediting a sale to salespeople:
a single sale might legitimately be split across two or three
salespeople who worked the deal together, and any one salesperson is
naturally credited on many sales. That's a genuine **many-to-many**
relationship between the fact ("this sale") and a dimension ("who
sold it"), and no amount of clever fact-table design turns it into a
one-to-many by itself.

## The fix: a bridge table

The resolution is a **bridge table** (also called a join table): a
third table sitting between the two entities, storing one row for
every valid combination. Instead of one foreign key on the fact table
pointing straight at the salesperson dimension, the fact relates to
the bridge table, and the bridge table relates to the salesperson
dimension — two clean one-to-many relationships standing in for one
many-to-many relationship.

Microsoft's Fabric Warehouse dimensional modeling guidance
illustrates the identical pattern with a different pair of entities:
customers and bank accounts. A customer can hold multiple accounts,
and an account can have multiple joint holders — a genuine
many-to-many. The `Account` dimension relates to the `Transaction`
fact table directly, while the `Customer` dimension relates to that
same fact table only *through* a `Customer Account` bridge table that
stores one row per customer-account pairing.

![Diagram of an Account dimension relating to a Transaction fact table, with Customer related through a Customer Account bridge table.](/courses/data-warehousing/ch06/28-bridge-tables-for-many-to-many/multivalued-dimension.svg)

*Two one-to-many relationships resolve one many-to-many relationship.*

Applied back to the salespeople example: a `Sale` fact table relates
directly to a `Date` and `Product` dimension as usual, but relates to
the `Salesperson` dimension only through a `Sale Salesperson` bridge
table — one row per sale-salesperson pairing, so a three-way split
sale produces three bridge rows, each pointing at the same sale and a
different salesperson.

## A bridge table is a factless fact table

Look closely at what a bridge table actually contains: nothing but
foreign keys. `SaleID`, `SalespersonID` — no measures, no numeric
columns to sum. That makes it, by the definition you learned when
fact tables were classified by type, a **factless fact table**: a
row records that an association happened (this salesperson was
credited on this sale), and the only measurement it supports is a
count of rows. Microsoft's own guidance makes this connection
explicitly for the customer-account bridge table too — when a table
storing a many-to-many association contains only identifier columns,
that's exactly what a factless fact table is.

## Key terms

| Term | Meaning |
|---|---|
| Many-to-many relationship | A relationship where either side can legitimately relate to multiple rows on the other side |
| Bridge table | A table storing one row per valid combination, resolving a many-to-many relationship into two one-to-many relationships |
| Factless fact table | A fact table with no measures, whose rows record that an event or association occurred, countable but not summable |

## Lab

1. Design (on paper, no need to build it) a bridge table for
   many-to-many salespeople-per-sale: name its columns, and state the
   two one-to-many relationships it sits between.
2. For a sale split three ways among salespeople A, B, and C, list
   the exact rows that would appear in the bridge table for that one
   sale.

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: why
some relationships genuinely can't be one-to-many, what a bridge table
does about it, and why a plain bridge table is itself a factless fact
table.
