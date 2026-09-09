# Lesson 116 — Slowly Changing Dimensions (SCD) · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 108 called a warehouse time-variant — but that was really about
facts, sales history. Dimensions change too, just slower. A customer
moves cities. A product gets reclassified. What happens to the OLD value
when that update arrives?

## S2 · STEPS CARD (three types)

There are three classic answers. Type 1: overwrite it, no history at
all. Type 2: insert a brand new row with a new key, and mark the old row
with an end date — full history preserved. Type 3: add one extra column
for just the immediately prior value — a middle ground, rarely used.

## S3 · CODE CARD (real Type 2)

Here's the thing — Type 2 isn't just theory. AdventureWorks D-W's real
Dim Product table has exactly the columns built for it: start date, end
date, status. A row with a non-null end date is a retired version,
superseded by a brand new product key. Every historical sale still
points at the OLD key, so it keeps showing exactly what was true at the
time.

## S4 · CODE CARD (Type 1)

Compare that to Type 1: just update the city in place. Simple — but now
every historical sale, even ones from years ago, shows the customer's
CURRENT city, not where they actually lived when they bought.

## S5 · OUTRO CARD

Type 2 is genuinely how a warehouse delivers time-variance for dimension
attributes, not just fact rows. Next lesson: why Type 2 needs a
completely NEW key instead of reusing the original — surrogate keys
versus natural keys. See you there.
