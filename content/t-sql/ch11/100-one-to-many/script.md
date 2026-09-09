# Lesson 100 — Table Relationships: One-to-Many · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

One-to-one was the rarest relationship shape. One-to-many is the one
you'll actually use constantly — it's the shape behind almost every
foreign key you've written so far in this course.

## S2 · CODE CARD (real example)

A real AdventureWorks example: one Sales Order Header row — one order —
has MANY Sales Order Detail rows, its line items. Each line item belongs
to exactly one order. That's one-to-many in a nutshell.

## S3 · CODE CARD (no special trick)

Unlike last lesson's one-to-one, there's no special trick here. It's just
an ordinary foreign key, with no extra UNIQUE constraint forcing it down
to a single match. Many employees can share one department ID, and that's
completely fine.

## S4 · CODE CARD (proof)

Here's the proof, straight from the real data: group Sales Order Detail
by Sales Order ID, and you'll see a count well above one for plenty of
orders. That works because Sales Order ID alone isn't the primary key
over there — remember Lesson 95, it's a composite key with Sales Order
Detail ID.

## S5 · OUTRO CARD

One-to-many is the default. Leave a foreign key alone, without a UNIQUE
constraint, and this is what you get. Next lesson: many-to-many — when
neither side can honestly be called the one. See you there.
