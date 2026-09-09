# Lesson 102 — Normalization: 1NF · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

You've now seen every relationship shape. Normalization is the formal
rulebook behind WHY those shapes are the right ones. We start with First
Normal Form — 1NF, the ground floor.

## S2 · CODE CARD (violation)

Here's a design that violates it: cramming multiple phone numbers into
one comma-separated column. It looks convenient, but it's unusable for
real queries — you can't search for one specific phone number without
parsing every row's string by hand.

## S3 · CODE CARD (real fix)

AdventureWorks already gets this right. Instead of one crowded column on
Person, Person Phone gives every phone number its own row. One person,
potentially many phone rows, each with exactly one atomic number.

## S4 · CODE CARD (three rules)

That's 1NF in three rules: every column holds one atomic value, every row
is unique with a primary key, and there are no repeating groups of
columns like Phone1, Phone2, Phone3. And notice — this fix IS Lesson
100's one-to-many relationship, just applied to solve a normalization
problem.

## S5 · OUTRO CARD

Every relationship shape you've learned exists partly to keep tables in
proper normal form. Next lesson: 2NF and 3NF, removing dependencies
that are sneakier than a simple repeating group. See you there.
