# Lesson 16 — Hierarchies and Relationships · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every domain in this chapter leaned on a hierarchy without defining one.
This lesson makes it explicit: what a hierarchy is, and the two shapes
it comes in.

## S2 · STEPS CARD (why flat records aren't enough)

A single record rarely answers the real question — not "what is this
customer's data," but "how do all the customers under this parent look
together." Without an explicit hierarchy, that roll-up gets answered by
new logic every time, inconsistently. Model it once, as data.

## S3 · STEPS CARD (two shapes)

A fixed-level hierarchy has a known number of levels for every record —
brand to category to product, always four deep. A recursive hierarchy
has variable depth — a corporate family tree might be two levels for one
customer, six for another.

## S4 · CODE CARD (parent-child table)

The simplest model for a recursive hierarchy: every row stores its own
ID and its parent's ID. Walk the chain of parent pointers to assemble
the tree at query time — the same shape works for customers, employees,
or product categories.

## S5 · STEPS CARD (why they break)

Hierarchies aren't set once. A merger adds a subsidiary tree overnight.
A reorg moves a department. A product gets reclassified. Each of those
is a hierarchy change that needs the same discipline as any other
master data change — who approved it, and what reports will shift.

## S6 · OUTRO CARD

Chapter three is done. Chapter four turns to reference data — the small,
stable code lists that every one of these domains also depends on.
