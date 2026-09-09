# Lesson 27 — The Silver Layer · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's build the second layer — silver, cleaned and conformed.

## S2 · CODE CARD (Chapter 4, applied)

This is nothing new syntactically — casting, deduplication, null
handling, all exactly as Foundations' Chapter 4 taught. Silver is
exactly where that work actually gets used, for real, on real
ingested bronze data.

## S3 · CODE CARD (order matters)

And order matters. Cast first, so later steps see real types, not
strings — drop duplicates on the string 14.50 versus the double
14.5 would treat them as different values, since they're not even
the same type yet.

## S4 · CODE CARD (conforming)

Silver also conforms data — reconciling naming, units, and
categorical values across potentially multiple sources. If one
source calls it fare amt and another calls it fare amount, silver
is where that gets fixed, so gold never has to know two sources
were even involved.

## S5 · OUTRO CARD

Read bronze, transform, write silver — that's the mechanical shape
every layer transition takes. Next lesson: the gold layer,
business-level aggregates.
