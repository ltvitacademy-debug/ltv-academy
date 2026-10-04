# Lesson 7 — Profiling With SQL · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 6 gave you the vocabulary. Now we write real T-SQL — the exact queries you'll run, in SSMS, for the rest of this chapter.

## S2 · SCREENSHOT — New Query

Every profiling query starts the same way: right-click a server or database in Object Explorer and choose New Query. That opens a fresh Query Editor tab pointed at that database — the blank page every example in this lesson gets typed into.

## S3 · SCREENSHOT — Execute

Type the query, then click Execute — or press F5. Either one runs whatever's currently in the editor against the connected database.

## S4 · SCREENSHOT — Results grid

And here's where the output lands: the Results grid, right below the query. Every profiling number for the rest of this chapter shows up exactly here, the same way any query's output would.

## S5 · CODE — COUNT and COUNT DISTINCT

The foundational pattern is two functions: COUNT star for the total row count, and COUNT DISTINCT on a column for how many unique values exist. If those two numbers don't match on a column that's supposed to be unique, you've already found something Lesson 15 cares about.

## S6 · CODE — NULL profiling across columns

One query can profile several columns' NULL rates at once, using SUM of CASE WHEN column IS NULL THEN 1 ELSE 0 END. That gives you a NULL count for three columns side by side in a single pass — the quick first look you'd run on any unfamiliar table.

## S7 · CODE — Turning counts into a percentage

Raw counts are useful, but a percentage is what actually gets compared against a threshold later in this course. Multiply by 100 point 0, not 100 — T-SQL's integer division will silently truncate a percentage to zero otherwise.

## S8 · OUTRO

New Query, Execute, read the grid — and three SQL patterns you'll reuse constantly. Next up: Lesson 8 goes deeper into column-level profiling.
