# Lesson 34 — Calculated Columns · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

DAX adds new information to your model two ways. Here's the first:
calculated columns.

## S2 · IMAGE: calccolinpbid_cityandstatefields.png (separate City/State)

Here's a Geography table with separate City and State fields. The report
needs them combined into one value — Seattle comma WA — for a map
visual to plot.

## S3 · CODE: CityState = [City] & "," & [State]

Right-click the table, New Column, and write this. For every row, it
takes City, adds a comma and space, and appends State. The result
appears immediately — computed once, right then, for every row in the
table.

## S4 · IMAGE: calccolinpbid_citystatemap.png (map visual)

And now the map visual knows exactly where to plot each shipment. A
calculated column's values are stored, not recalculated live — they only
update again when the table refreshes. That's the opposite of how a
measure behaves, which is exactly what we cover next.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: measures — the second way DAX adds new information, calculated
fresh every time instead of stored once.
