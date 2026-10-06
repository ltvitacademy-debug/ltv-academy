# Data Cleaning Practice

**Chapter 3 · Data Quality · Lesson 16 of 20**

Lessons 14 and 15 gave you the tools: validation rules, picklists, before-save Flows. This lesson is the worked example — a small, genuinely messy export, cleaned row by row, the way you'd actually do it before a real import. No single screen captures this either; it's spreadsheet work, so the slides are the CSV itself.

## What you'll learn

- How to read a messy export and name each problem before fixing it
- Cleaning text in a spreadsheet with TRIM, PROPER, and SUBSTITUTE before you ever open Data Loader
- Why "looks the same" and "is the same" aren't the same thing in a CSV
- What to fix before import vs. what to fix with a validation rule afterward

## The messy export

Five rows, pulled from a lead-capture spreadsheet before anyone cleaned it up:

```
Company,State,Phone,Email
Acme Corp,TX,555-123-4567,jane@acme.com
acme corp ,Texas,(555) 123-4567,jane@acme.com
Globex Inc,CA,555.987.6543,
Globex Inc.,California,555-987-6543,bob@globex.com
Initech,tx,5551112222,
```

## Naming the problems before fixing them

| Row | Problem | Category |
|---|---|---|
| 1 vs. 2 | "Acme Corp" vs. "acme corp " (case + trailing space) — likely the same company | Consistency / possible duplicate |
| 1 vs. 2 | "TX" vs. "Texas" — same state, two spellings | Consistency |
| 1 vs. 2 | "555-123-4567" vs. "(555) 123-4567" — same number, two formats | Consistency |
| 3 | Email is blank | Completeness |
| 3 vs. 4 | "Globex Inc" vs. "Globex Inc." — punctuation difference, likely the same company | Consistency / possible duplicate |
| 5 | "tx" lowercase, phone with no separators at all | Consistency |

Naming the category first matters: consistency problems get fixed with formulas and picklists (Lesson 15), completeness problems get a validation rule or a required field (Lesson 14), and "likely the same company" problems get flagged for a human to review as a possible duplicate, not silently merged.

## Cleaning it in the spreadsheet, before import

Three spreadsheet formulas do most of the work, applied in a helper column before you save the file for Data Loader:

```
=TRIM(PROPER(A2))              -- "acme corp " -> "Acme Corp"
=SUBSTITUTE(SUBSTITUTE(C2,
   "(",""),") ","-")            -- strips phone punctuation to digits+dashes
=TRIM(UPPER(B2))                -- "tx" / "Texas" -> still inconsistent!
```

Notice the last one: `TRIM(UPPER("tx"))` gives `"TX"`, but `TRIM(UPPER("Texas"))` gives `"TEXAS"` — formulas standardize *case*, not *content*. "TX" and "TEXAS" are still two different strings. State abbreviation really needs a lookup table or, better, the State and Country Picklist from Lesson 15 doing the enforcement on the Salesforce side.

## The cleaned result

```
Company,State,Phone,Email
Acme Corp,TX,555-123-4567,jane@acme.com
Acme Corp,TX,555-123-4567,jane@acme.com
Globex Inc,CA,555-987-6543,[NEEDS EMAIL]
Globex Inc,CA,555-987-6543,bob@globex.com
Initech,TX,555-111-2222,[NEEDS EMAIL]
```

Rows 1 and 2 are now identical — exactly what you want a duplicate rule to catch at import time, rather than creating two Account records for one real company. The two blank emails are flagged, not guessed at; inventing a value would trade a completeness problem for an accuracy problem, which is a worse trade.

## Recap

- Name each problem's category before fixing it: consistency, completeness, or likely-duplicate.
- TRIM, PROPER, and SUBSTITUTE clean formatting and case in a spreadsheet, before the file ever reaches Data Loader.
- Case-normalizing formulas don't fix content differences — "TX" vs. "TEXAS" still needs a controlled picklist or lookup table.
- Never invent a value to fill a blank. Flag it and let a human or a validation rule decide.

## Check yourself

In the cleaned CSV above, rows 1 and 2 became identical. What should happen next — import both, or something else? Explain in one sentence.
