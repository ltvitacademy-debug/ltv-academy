# Lesson 36 — Measures vs. Calculated Columns · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Same underlying language, two genuinely different jobs. Now that you've
met both calculated columns and measures separately, let's put them
directly side by side and settle the decision for good.

## S2 · CODE: CityState = [City] & "," & [State]

A calculated column: computed exactly once, stored per row inside the
model, and genuinely filterable — you can drag it straight into a
slicer, use it as a legend, or drop it into a table's rows, exactly like
any other imported column. Once it's calculated, it behaves like data
that was always there, indistinguishable from a column that loaded
straight from the source.

## S3 · CODE: Projected Sales = SUM('Reseller Sales'[Last Years Sales])*1.06

A measure: computed completely fresh every single time it's actually
viewed, based on whatever happens to be filtering it in that moment. But
here's the trade-off — a measure can't be filtered by, or dragged into a
slicer, the way a column can. It can only be summarized and displayed,
never used to group or slice anything else.

## S4 · OUTRO CARD

One question genuinely settles this every time: do you need to filter or
group by this specific value, or do you just need to show a calculated
number on the page? Filtering or grouping means a column. Just
displaying a number means a measure. Get this backwards, and nothing
throws an obvious error at you — it just quietly doesn't behave the way
you'd expect, which is honestly worse than an error would be, since it
can take a while to even notice something's wrong. Next: the basic
aggregation functions that nearly every measure you'll ever write
actually builds on top of.
