# Lesson 4 — Why This Data Needs Python Before Power BI

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 4 of 16**

## What you'll learn

- Profiling both extracts to actually see the problem, not just assume it
- The specific duplicate-row issue that shows up in the customer extract
- The specific inconsistent-value issue that shows up in the territory extract
- Why this particular cleanup is a better fit for Python than for manual Power Query clicks

## Profile before you clean

Lesson 1 described the symptom in plain English: duplicate rows and inconsistent values once the
two extracts are combined. Before fixing anything, profile both extracts and see the actual
problem directly — the same discipline the Beginner project used before touching any data.

## Problem 1: the customer extract has duplicate rows

The person who pulled the customer-segment extract exported it, then re-ran the same export a
second time without clearing the first file — a completely ordinary mistake when extracts get
re-pulled during testing. The result: every `(CustomerID, SalesOrderID)` combination from that
first run appears twice in the final file. Summing `LineTotal` straight out of this file would
silently double-count every sale from that first batch.

## Problem 2: the territory extract has inconsistent values

The territory extract was pulled by a different person, using a spreadsheet tool to review the
CSV before handing it off. That review pass introduced extra leading/trailing whitespace and
inconsistent capitalization on `TerritoryName` for a handful of rows — `"Southwest "` next to
`"Southwest"`, `"canada"` next to `"Canada"`. Harmless to a human reading the file, but exactly the
kind of thing that silently breaks a join or a `GROUP BY` that depends on matching that column by
exact text.

## Why Python, deliberately, instead of only Power Query

Power Query *could* clean either of these problems. This project uses Python instead, on purpose,
because:

- The fixes are short, explicit, and reviewable as code — `.drop_duplicates()`,
  `.str.strip()`, `.str.title()` — rather than a sequence of UI clicks that are harder to audit
  later.
- The same cleaned DataFrame gets reused for the join in Lesson 6, so doing the cleaning in pandas
  keeps the whole cross-extract reconciliation in one place, in one script, instead of split
  across two separate Power Query queries.
- This is the real skill this project is building: T-SQL for extraction, Python for
  cross-source reconciliation, Power BI for modeling and reporting. Each tool does the job it's
  actually best suited for.

## Key terms

| Term | Meaning |
|---|---|
| Profiling | Inspecting a dataset's actual values before deciding how to clean it |
| Duplicate rows | The same logical record appearing more than once |
| Inconsistent values | The same real-world value represented with different text (casing, whitespace) |

## Lab

Open both extract files (or re-run both T-SQL queries) and look directly for the two problems
described above: count how many `(CustomerID, SalesOrderID)` pairs in the customer extract appear
more than once, and list every distinct value of `TerritoryName` in the territory extract to spot
the casing/whitespace inconsistencies.

## Check yourself

You're ready for Lesson 5 when you can answer, without looking: what specific problem does the
customer extract have, what specific problem does the territory extract have, and why would simply
summing `LineTotal` on the raw customer extract give a wrong number?
