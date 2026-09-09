# Lesson 36 — GROUP BY Multiple Columns · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Grouping by one column is useful, but real reports usually need more than
that — the average price per color AND per size, together. Adding a
second column to GROUP BY makes the groups more specific.

## S2 · CODE CARD (GROUP BY Color, Size)

Color, size, average of list price, count star, group by color, size. Now
a group is every unique COMBINATION of color and size, not color alone.
Red and Large is one group. Red and Small is a completely separate group.
Each gets its own average, its own count.

## S3 · CODE CARD (parallel to SELECT DISTINCT)

This should feel familiar — it's the exact same idea as select distinct
color, size, from Lesson 9. DISTINCT compares the whole combination of
columns, not each one independently, and GROUP BY groups on that same
combination. The difference is what happens next: DISTINCT just removes
duplicates. GROUP BY lets you aggregate inside each group.

## S4 · CODE CARD (rule still applies — ProductLine error)

And the rule from last lesson still applies, just with more columns to
satisfy. Add product line here without adding it to GROUP BY, and it
fails, for the exact same reason as before — multiple rows share each
color-size combination, so there's no single product line to show. The
fix: add product line to GROUP BY as well.

## S5 · OUTRO CARD

More grouping columns means more groups, each one narrower — the row
count can only stay the same or grow as you add columns, never shrink.
Next lesson: HAVING versus WHERE, for filtering groups instead of
individual rows. See you there.
