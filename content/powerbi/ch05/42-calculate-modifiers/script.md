# Lesson 42 — CALCULATE's Filter Modifiers · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Beyond simple conditions like column equals value, CALCULATE also
accepts entire functions that change how the filtering itself actually
behaves underneath. Three of them are genuinely worth knowing well.

## S2 · CODE: REMOVEFILTERS

REMOVEFILTERS clears filters away — either from one specific column, or
from absolutely everywhere at once. Here it strips every single filter
away for the denominator specifically, giving you the true grand total
no matter what's currently selected anywhere on the report. Divide the
filtered total by that grand total, and you get percent of total — a
pattern you'll genuinely use constantly for the rest of your DAX career.

## S3 · CODE: KEEPFILTERS

Remember from earlier: CALCULATE normally just overwrites an existing
filter sitting on the same column. KEEPFILTERS changes that default
behavior — the new filter now intersects with whatever's already active
instead of replacing it outright. Reach for this specifically when you
want to add an additional constraint on top, not swap one filter out for
a completely different one.

## S4 · CODE: USERELATIONSHIP

And USERELATIONSHIP activates an otherwise inactive relationship, just
for one single calculation. This is the exact mechanism behind a single
Date table filtering a fact table three genuinely different ways, even
though only one of those three relationships is ever active by default
at any given moment.

## S5 · OUTRO CARD

Next: FILTER itself, the actual function that builds the table
expressions both CALCULATE and SUMX have been quietly relying on this
entire time.
