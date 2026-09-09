# Lesson 101 — Table Relationships: Many-to-Many · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

We've covered one-to-one and one-to-many. Now the trickiest of the three:
many-to-many, where a plain foreign key genuinely isn't enough.

## S2 · CODE CARD (why not)

Here's why. One sales order can have multiple reasons behind it — price, a
promotion, a referral. And one single reason can apply to thousands of
different orders. Neither table can hold one simple foreign key to the
other, because neither side is really the one.

## S3 · CODE CARD (real junction table)

AdventureWorks has a real table built exactly for this: Sales Order Header
Sales Reason. It sits between orders and reasons, and it has no purpose of
its own beyond connecting the two. Every row is just one order paired with
one reason that applied to it.

## S4 · CODE CARD (structure)

Look at its structure. A foreign key to the order, a foreign key to the
reason, and — following Lesson 95's composite key pattern — its primary
key is BOTH of those foreign keys together. That composite key does two
jobs at once: enforces the relationship in both directions, and makes it
impossible to record the exact same order-reason pair twice.

## S5 · OUTRO CARD

One-to-one, one-to-many, many-to-many — the full relationship trilogy, all
enforced with nothing but keys and constraints. Next lesson:
normalization, the formal rules behind every one of these table shapes.
See you there.
