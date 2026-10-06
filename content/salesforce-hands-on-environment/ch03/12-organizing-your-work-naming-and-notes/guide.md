# Organizing Your Work: Naming and Notes

**Chapter 3 · Your Permanent Training Environment · Lesson 12 of 14**

A permanent org is only useful if you can still make sense of it a year from now. This lesson is
about the habits that keep it that way: consistent naming, and Salesforce's own built-in Notes tool.

## What you'll learn

- A naming convention for test records and custom objects that still makes sense months later
- Where Salesforce's built-in Notes tool lives, for jotting down context on a record
- Why the same naming discipline matters for imported data, not just records you create by hand

## A naming convention that scales

The habit starts as early as naming the org itself (Lesson 3's Create Playground dialog), but it
matters even more for everything you build inside it:

- **Prefix by course** — something like `SF-Admin-` or `T-SQL-` in front of a custom object or
  test record name makes it obvious later which course a given piece of work came from.
- **Date your test data** — "Test Account 2026-10" tells you something useful six months from now;
  "Test Account 3" tells you nothing.
- **Clean up periodically** — a permanent org doesn't mean permanent clutter. Deleting records
  you're genuinely done with keeps the org navigable.

## Using Notes for context

Salesforce has a real, built-in **Notes** object for exactly this purpose — attaching context to a
record without leaving the org. It's reachable from the App Launcher's **All Items** list, or
directly from most record pages. A short note like "built for Lesson 14's Flow lab — safe to
delete after Chapter 5" on a test record saves your future self real guesswork.

## Naming matters for imported data too

This same discipline isn't only about records you create by hand. Later in this path, you'll use
the **Data Import Wizard** to bring in data from a CSV file. Its field-mapping step — matching your
file's columns to Salesforce fields — only goes smoothly when the source file's column names are
clear and consistent in the first place. Sloppy naming costs you time at import just as much as it
does inside the org later.

## Key terms

| Term | Meaning |
|---|---|
| Naming convention | A consistent pattern for naming records/objects, like course-prefixed names |
| Notes | A built-in Salesforce object for attaching context to a record |
| Field mapping | Matching an imported file's column names to Salesforce fields during import |

## Check yourself

What are the three habits this lesson recommends for keeping a permanent org organized over time?
