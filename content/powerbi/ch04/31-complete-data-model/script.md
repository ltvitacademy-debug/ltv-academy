# Lesson 31 — Building a Complete Power BI Data Model · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Six lessons, six pieces. This one puts them together into a checklist you
can run on any set of tables.

## S2 · IMAGE: relationships-options-03.png (real six-table star)

Sort tables into fact and dimension. Arrange them as a star. Create every
relationship you need. Check cardinality — many-to-one, fact pointing at
dimension, is what you'll see most. Set cross filter direction on
purpose. And resolve any table connected more than one way. Here's a real
model built that way: Sales at the center, everything else connected
directly around it.

## S3 · IMAGE: create-manage-relationships-01.png (six-table model, two facts)

Not every real model stays this simple. Here, Sales and Purchases are
both fact-like tables, sharing dimensions between them. Read it the same
way: trace each line, confirm the cardinality, and watch for loops.

## S4 · IMAGE: star-schema-example-1.svg (star schema diagram)

Whatever else grows more complex, the goal never changes: one fact table
doing the summarizing, dimension tables doing the filtering.

## S5 · OUTRO CARD (SVG: chapter complete, LTV seal)

A correct model is what makes the next chapter possible. DAX depends
entirely on your relationships to know which rows to sum, count, or
average — get the model right, and DAX becomes trustworthy. Next up:
Chapter Five, DAX Fundamentals.
