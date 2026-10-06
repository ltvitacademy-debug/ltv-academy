# Lesson 5 — NULLs and Data Quality Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Before Finance trusts any total you calculate, you need to know how to
find — and handle — missing data. This lesson closes out Chapter 1 with
NULLs, Oracle's representation of unknown or missing information.

## S2 · CODE CARD (the WHERE = NULL trap)

Here's the trap that catches almost everyone once: NULL isn't equal to
anything, not even another NULL. So "where vendor site id equals NULL"
doesn't error — it just silently returns nothing, every single time, even
for rows that genuinely have a NULL there. The only correct way to test is
IS NULL, or IS NOT NULL.

## S3 · CODE CARD (NVL)

N-V-L substitutes a value when something's NULL. N-V-L of discount amount
taken, comma zero — if that column is NULL, you get zero back instead.
This matters because unguarded NULLs can quietly wipe out a calculation:
100 plus NULL is NULL, not 100.

## S4 · CODE CARD (NVL2)

N-V-L-2 goes one step further — it picks between two different values
depending on whether something's NULL. Discount taken, or no discount, in
one expression, instead of writing out a full CASE statement for something
this simple.

## S5 · CODE CARD (COALESCE)

And COALESCE is the ANSI-standard equivalent — with two arguments it
behaves exactly like NVL, but it can also take more than two, checked left
to right until it finds something that isn't NULL. You'll see both NVL and
COALESCE in real Fusion customizations; both are correct.

## S6 · OUTRO CARD

NULL means unknown, IS NULL is the only safe test for it, and NVL, NVL2,
and COALESCE all help you handle it in a calculation. That's Chapter 1
complete. Next: Chapter 2, joining the financial tables that actually hold
your data together.
