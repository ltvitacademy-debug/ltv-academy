# Lesson 31 — Practice Questions: OneLake and Lakehouses

**Chapter 2 · DP-700 Certification Prep · Lesson 31 of 81**

## What you'll learn

- How Domain 1's OneLake/Lakehouse material turns into real DP-700
  scenario questions
- A worked set of practice questions at exam difficulty, with full
  reasoning for each answer
- Which specific earlier lessons to revisit if a question exposes a
  gap

## How to use this lesson

This lesson is deliberately quiz-dense — it's a drill, not a new
lesson. Read each scenario the way DP-700 presents it: as a short
business situation, not a direct definition question. Work out your
own answer before reading the reasoning underneath it. The quiz at
the end of this lesson has more questions than usual (this chapter's
practice lessons run 6–8 questions instead of 5) and is scored the
same as any other quiz.

## Worked question 1

*A retail company has a Lakehouse with raw sales files landing daily.
An analyst asks why files loaded into the Lakehouse's Files section
don't automatically appear as queryable tables. What's the correct
explanation?*

Loading a file into a Lakehouse's **Files** area just stores it —
converting it into a queryable **Tables** entry requires an explicit
load-to-table step (or a notebook/pipeline that reads the file and
writes a Delta table). This is the Files-vs-Tables split from Fabric
Lesson 4: Files is unmanaged storage, Tables is the managed, Delta-
backed, SQL-queryable layer.

## Worked question 2

*A finance team has data in a Lakehouse in Workspace A. A separate
team in Workspace B needs to query that same data in their own
Warehouse, without copying it. What Fabric feature solves this?*

A **Shortcut** (Fabric Lesson 7). Shortcuts create a reference to
data that physically lives elsewhere in OneLake (or even outside it,
via ADLS/S3/Dataverse connectors), so Workspace B reads the same
bytes without a copy job, and the data never goes stale from a
missed refresh.

## Worked question 3

*A team wants Power BI reports on top of their Lakehouse data with
the lowest possible latency and no explicit dataset refresh
schedule. What should they use?*

**Direct Lake Mode** (Fabric Lesson 12). It reads the Lakehouse's
Delta files straight from OneLake, skipping both a scheduled Import
refresh and a live DirectQuery round trip — provided the table stays
within Direct Lake's size and row-group limits (Lesson 30 of this
chapter covers the fallback if it doesn't).

## Key terms

| Term | Meaning |
|---|---|
| Files vs. Tables | Unmanaged storage vs. the managed, Delta-backed, queryable layer in a Lakehouse |
| Shortcut | A reference to data stored elsewhere, avoiding a copy |
| Direct Lake Mode | Reading Delta files from OneLake directly, without Import or DirectQuery |

## Check yourself

Take the quiz below before moving to Lesson 32. If you miss more than
one question, revisit Fabric Lessons 3, 4, 7, and 12 before
continuing.
