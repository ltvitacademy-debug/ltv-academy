# Bucketing

**Chapter 1 · Reports · Lesson 8 of 22**

Sometimes you don't need a formula or a new custom field — you just need to lump existing values into a few named categories, right inside the report. That's what a **bucket column** does: Small / Medium / Large instead of an exact employee count, Region instead of individual countries. This lesson closes out the chapter with the last tool on the Columns menu.

## What you'll learn

- How to add a bucket column from the Columns dropdown
- How buckets, values, and unbucketed values relate
- Why bucketing beats a formula field for quick, one-off categorization
- Limits on bucket columns and buckets per report

## Adding a bucket column

From the same Columns dropdown used for row-level and summary formulas, choose **Add Bucket Column**. Pick the field to bucket (say, Billing Country), name the new bucket column (say, Region), then build buckets by naming each one and dragging — or checking — the source values that belong in it. A **Billing Country** field with values China, France, and USA might become a **Region** bucket with "NA" containing USA and "Europe" containing France, while China is left out.

## Unbucketed values

Any source value you don't explicitly assign to a bucket shows up under **Unbucketed Values** — not an error, just Salesforce telling you those records exist but haven't been categorized yet. Leaving values unbucketed on purpose is fine (they'll show as blank in the bucket column), but it's worth checking that list before you run the report, in case you simply forgot one.

## Why bucket instead of building a formula field

A bucket column lives entirely inside **one report** — no new field on the object, no page layout changes, no impact on any other report or list view. That makes it the right tool for a one-off categorization a single report needs, and the wrong tool for a category every report and every user should see consistently (that calls for an actual custom field or formula field on the object instead).

## Limits

A single report can have up to **five bucket columns**, and each bucket column can contain up to **twenty buckets**. Once created, a bucket column behaves like any other column: you can sort by it, filter by it, and — like any grouping field — group rows or columns by it, which is exactly how a "Region" bucket could become the row grouping for a summary or matrix report.

## Key terms

| Term | Meaning |
|---|---|
| Bucket column | A report-only column that groups existing values into named categories |
| Bucket | One named category inside a bucket column |
| Unbucketed values | Source values not yet assigned to any bucket |
| Add Bucket Column | The Columns dropdown option that starts the process |
