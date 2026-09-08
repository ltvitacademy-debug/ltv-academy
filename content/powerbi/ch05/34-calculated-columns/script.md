# Lesson 34 — Calculated Columns · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

DAX adds new information to your model in two genuinely different ways.
Here's the first one: calculated columns, and how they differ from the
custom columns you already built back in Chapter Three.

## S2 · IMAGE: calccolinpbid_cityandstatefields.png

Here's a Geography table with separate City and State fields, sitting
right next to each other but never actually combined. The report
specifically needs them as one single value, something like Seattle
comma W-A, so a map visual can actually plot each location correctly.

## S3 · CODE: CityState = [City] & "," & [State]

Right-click the table, select New Column, and write this formula. For
every single row in the table, it takes the value in City, appends a
comma, and adds the value in State right after it. The result appears
immediately as a brand new field, computed once, right at the moment you
enter the formula — not recalculated live the way you might expect.

## S4 · IMAGE: calccolinpbid_citystatemap.png

And now the map visual knows exactly where to plot every single
shipment, because CityState gives it one recognizable combined location
instead of two separate, disconnected fields. A calculated column's
values stay stored exactly like this until the table refreshes or the
file gets reopened — they genuinely don't recalculate on their own just
because you're viewing the report.

## S5 · OUTRO CARD

That's the opposite of how a measure behaves, which is exactly what
comes next. Keep the trade-off in mind going forward: calculated columns
cost storage space and refresh time, since every row's value has to be
computed and stored. Measures, which you're about to meet, cost query
time instead, calculated fresh every single time someone actually views
the report. Next: measures, the second way DAX adds new information to
your model.
