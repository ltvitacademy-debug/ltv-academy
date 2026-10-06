# Joined Reports

**Chapter 1 · Reports · Lesson 6 of 22**

Every format so far has worked within a single report type. A **joined report** breaks that rule: it puts several separate **blocks** — each its own report, potentially on a different report type — side by side in one view. This lesson covers when that's useful and how the pieces fit together.

## What you'll learn

- How to switch a report to the Joined format
- What a block is, and how many a joined report can hold
- Grouping across blocks with a shared row field
- Cross-block summary formulas

## Turning a report into a Joined report

From the Report dropdown in the builder, choose **Choose Format**, then select **Joined Report** instead of the default **Report** option, and click **Apply**. Your existing report becomes the first **block**. Click **Add Block** to add more — up to five total — and each block can use the same report type as the others or a completely different one, as long as they're compatible enough to share a common set of groupable fields.

## Grouping across blocks

A joined report's real power is the **Group Across Blocks** row grouping at the top of the Outline panel — a single field (like Opportunity Owner) that every block groups by, so each block's numbers line up against the same set of rows. A sales report might show three blocks — Closed Opportunities, Open Pipeline, and Win Rate & Projection — all grouped by the same Opportunity Owner, turning three separate reports into one readable comparison.

## Cross-block summary formulas

Beyond the regular, per-block summary formulas from Lesson 7, a joined report unlocks **cross-block summary formulas** — a calculation that references a value from more than one block at once, like dividing a dollar amount in Block A by a count in Block B. You add one from the same Columns dropdown used for a regular summary formula, except **Add Cross-Block Summary Formula** reaches across every block in the report instead of staying inside one.

## When to reach for a joined report

Use a joined report when the comparison you need spans more than one report type, or more than one filtered slice of the same type, and a single block (even a matrix) can't hold it all. If everything you need fits inside one report type with one set of filters, a matrix report is almost always simpler.

## Key terms

| Term | Meaning |
|---|---|
| Block | One report's worth of columns and filters inside a joined report |
| Choose Format | The dropdown where you switch a report to Joined |
| Group Across Blocks | A shared row grouping applied to every block at once |
| Cross-block summary formula | A formula that references values from more than one block |
