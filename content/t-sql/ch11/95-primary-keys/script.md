# Lesson 95 — Primary Keys · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter Eleven, Database Design Fundamentals. We start with the
single most fundamental building block of relational design: the primary
key.

## S2 · CODE CARD (inline)

A primary key guarantees two things about a column at once: every value is
unique, and no value is ever NULL. Together, that means a primary key
value always identifies exactly one row. You can define one right inline
when you create the table.

## S3 · CODE CARD (ALTER TABLE)

You can also add one after the table already exists, with ALTER TABLE ADD
CONSTRAINT. Naming it explicitly — PK underscore Department — is good
practice. It gives you a predictable name to reference later, instead of
relying on whatever SQL Server auto-generates.

## S4 · CODE CARD (composite key)

Sometimes no single column is unique by itself, but a combination of
columns is. AdventureWorks's real Sales Order Detail table is exactly
this: order ID alone isn't unique, line number alone isn't unique, but the
PAIR of order ID and line number together always is. That's a composite
primary key.

## S5 · CODE CARD (clustered by default)

Here's the hidden connection back to Lesson 88. When you create a primary
key without saying otherwise, SQL Server builds it as a CLUSTERED index by
default — physically sorting the table by that key. That's why a good
primary key should also be narrow, unique, and ever-increasing. It's not
just an identity guarantee, it's your table's physical sort order too.

## S6 · OUTRO CARD

Every table you design from here on should start with this question: what
uniquely identifies one row? Next lesson: foreign keys — how one table's
primary key protects another table's data. See you there.
