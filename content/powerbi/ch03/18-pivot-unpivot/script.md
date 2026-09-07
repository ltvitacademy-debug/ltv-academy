# Lesson 18 — Pivoting & Unpivoting · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Some tables are built for humans to read, and it turns out that's exactly
what makes them hard for Power BI to analyze. This lesson fixes that,
in both directions.

## S2 · IMAGE: unpivot-initial-table.png (wide table)

Here's a classic shape: one column per date, one row per country.
Readable at a glance — but "which date" lives in the column headers, not
as actual data. You can't filter or chart by something that isn't a
column value.

## S3 · IMAGE: unpivot-columns-right-click.png (right-click, Unpivot Columns)

Select the date columns, right-click, Unpivot Columns. That's the whole
operation.

## S4 · IMAGE: unpivot-columns-final-table.png (Attribute/Value result)

And here's the fix. Power Query collapses those columns into exactly two:
Attribute, holding the original headers, and Value, holding what used to
sit under them. Nine rows instead of three columns — but now date is real,
filterable data.

## S5 · IMAGE: unpivot-other-columns.png (Unpivot Other Columns)

There's a smarter version of this command, though. Unpivot Other Columns
flips the selection: instead of picking what to unpivot, you pick what to
keep — Country, here — and everything else gets unpivoted.

## S6 · IMAGE: unpivot-updated-source-table.png (source with new column)

Here's why that matters. Say your source table later gains a new month and
two new countries. With Unpivot Other Columns, that new month gets swept
up automatically on refresh — the step never had to know its name in
advance. With plain Unpivot Columns, it would silently get left behind.
Default to Unpivot Other Columns whenever your source might grow new
columns over time.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

And Pivot Column, on the Transform tab, is the exact reverse — turning
values back into column headers, for the rare case you actually want a
matrix-shaped table. Next lesson: Group By and aggregations — summarizing
rows instead of reshaping them. See you there.
