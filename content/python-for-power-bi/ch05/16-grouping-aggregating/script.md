# Lesson 16 — Grouping & Aggregating · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Every calculated column up to this point worked on exactly one row at a
time. Grouping does the genuine opposite — collapsing many rows together
into one summary per group, which is a completely different kind of
question to ask of your data.

## S2 · CODE: df.groupby("Region")["Revenue"].sum()

Groupby splits the whole DataFrame apart by a column's values, then
applies an aggregation to each resulting group separately. Every single
West row's revenue gets added together into one combined number. This is
the exact same underlying idea as dragging Region into a matrix visual's
rows and Revenue into its values inside Power BI.

## S3 · CODE: .groupby("Region")["Revenue"].mean()

Sum is genuinely just one choice among several available to you. Swap it
out for mean instead to get the average per group, or count to see
simply how many rows actually landed in each group — the right
aggregation to reach for always depends entirely on what specific
question you're actually trying to answer with the data.

## S4 · CODE: .agg(["sum", "mean", "count"])

Rather than running groupby three completely separate times for sum,
then mean, then count, agg computes all three of those aggregations
together in one single pass over the data. One line of code, one pass,
three answers delivered side by side — genuinely faster to write and
easier to compare at a glance than three separate calls would be.

## S5 · OUTRO CARD

Group first, then aggregate — sum, mean, count, or realistically all
three at once using agg. Lesson 17 covers the last genuinely major
Pandas operation this entire course needs: joining two separate tables
together into one, the same way a relationship connects two tables
inside Power BI's model view.
