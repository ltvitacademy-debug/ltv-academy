# Lesson 28 — One-to-Many, One-to-One & Many-to-Many

**Chapter 4 · Data Modeling · Lesson 5 of 8**

## What you'll learn

- What cardinality actually describes about a relationship
- The four cardinality types Power BI supports
- Why "many to one" is the default you'll use most often
- When Power BI changes cardinality automatically, and why

## What cardinality describes

**Cardinality** answers one question about a relationship: on each side,
can a value repeat, or must it be unique? Look back at a star schema, and
you'll usually see the same pattern on every spoke:

![Diagram of a star schema with a fact table at the center and dimension tables around it, each connection labeled with a 1 near the dimension and an asterisk near the fact table.](/courses/power-bi/ch04/28-cardinality/star-schema-example-2.svg)
*The "1" sits on the dimension side — each product, date, or region appears once. The "*" sits on the fact side — each can be referenced by many rows.*

## The four cardinality types

Power BI's **Create relationship** and **Edit relationship** dialogs offer
four options:

| Cardinality | Meaning |
|---|---|
| Many to one (\*:1) | The default. Many rows in one table match one row in the related table — a fact table pointing at a dimension table. |
| One to many (1:\*) | The same relationship, described from the other direction. |
| One to one (1:1) | Exactly one row on each side matches exactly one row on the other. |
| Many to many (\*:\*) | Neither side needs unique values — available with composite models. |

You'll set **many to one** or **one to many** for the overwhelming majority
of relationships you build — it's exactly the shape a fact table pointing
at a dimension table takes.

![Screenshot of the lower portion of the Create relationship dialog, showing Cardinality set to "Many to one (*:1)" and Cross filter direction set to "Both."](/courses/power-bi/ch04/28-cardinality/candmrel_advancedoptions2.png)
*Power BI usually sets this correctly on its own — but it's worth understanding what it chose and why.*

## When Power BI picks one-to-one

Sometimes two tables happen to line up so that a value never repeats on
either side. Power BI notices, and sets cardinality to **one to one**
automatically:

![Screenshot of the Create relationship dialog with Cardinality automatically set to One to one (1:1), joining an Approved Projects column to a ProjName column.](/courses/power-bi/ch04/28-cardinality/candmrel_create_compproj_appproj2.png)
*Both ProjectBudget and CompanyProjectPriority happen to list each project only once — so Power BI defaults to one-to-one here.*

Be careful with this default, though. If you know your data will change
— say, a future refresh adds a second budget row for the same project —
that one-to-one relationship will break the moment duplicates appear.
Override the cardinality to **many to one** yourself if you can see that
coming, with the "many" side pointed at the table that will eventually
repeat values.

## Why cardinality matters beyond labeling

Cardinality isn't just documentation — it determines which side of a
relationship can be summarized against the other. A "many" side can always
be summed and grouped by its related "one" side. Get the direction
backwards, and Power BI either won't let you create the relationship (both
sides need a unique-values column somewhere) or your numbers won't
aggregate the way you expect.

## Key terms

| Term | Meaning |
|---|---|
| Cardinality | Whether values can repeat on each side of a relationship |
| Many to one (\*:1) | The default: many fact rows point to one dimension row |
| One to one (1:1) | Exactly one row matches exactly one row on both sides |
| Many to many (\*:\*) | Neither side requires unique values |

## Lab

1. Open **Manage relationships** on any model with at least one
   relationship, and select **Edit** on one of them.
2. Note what Cardinality is currently set to, and why — look at whether
   either column actually holds unique values.
3. If you have two tables where each value appears only once on both
   sides, create a relationship between them and confirm Power BI defaults
   it to One to one.

## Check yourself

You're ready for Lesson 29 when you can explain, without looking it up,
why "many to one" is the cardinality you'll reach for most often when
connecting a fact table to a dimension table.
