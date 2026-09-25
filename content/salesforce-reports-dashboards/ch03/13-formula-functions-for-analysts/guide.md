# Formula Functions for Analysts

The last two lessons showed where formulas live. This one covers what you can put inside them. Salesforce formula syntax feels closer to Excel than to T-SQL: functions take arguments in parentheses, text goes in double quotes, and there is no `SELECT` or `FROM`. You already know the ideas from T-SQL; this lesson maps them to the names you will see in the **Functions** tab.

## What you'll learn

- How the formula editor's Fields and Functions tabs work
- The main function families: logical, math, text, date, and summary-specific
- Which families belong mostly to row-level formulas and which to summary formulas
- How blanks and errors behave, and how to handle them
- A quick translation table from T-SQL

## The editor: Fields and Functions

The screenshot shows the left side of the formula editor. On the **Fields** tab you search for a field (here, "won"), select it, choose a summary type such as Sum from the dropdown, and press **Insert**. The neighboring **Functions** tab lists every function you can use, grouped by category with a short description of each. When you are unsure of a function's exact name or arguments, the Functions tab is the source of truth for your org's release, so prefer it over memory.

Function availability is not identical across formula types. In most orgs, row-level formulas expose a broad set of text, math, logical, and date functions. Summary formulas offer a smaller set, focused on math, logic, and functions that understand groupings. If a function you expect is missing, check which kind of formula you are in.

## Logical functions

These control decisions, and you will use them constantly:

- `IF(test, if_true, if_false)` for conditional values, which nest for multiple tiers
- `AND(...)`, `OR(...)`, `NOT(...)` for combining conditions
- Functions for testing blanks, such as `ISBLANK`, and for substituting a default, such as `BLANKVALUE`
- `CASE` for multi-way branching on a value, where the org's release supports it in reports

`IF` is your `CASE WHEN ... THEN ... ELSE ... END`. For a simple two-way split it reads: `IF(AMOUNT > 50000, "Big", "Small")`.

## Math functions

`ABS`, `ROUND`, `CEILING`, `FLOOR`, and basic operators (`+ - * /`) cover most needs. `ROUND(x, 2)` is worth knowing because percentages and averages otherwise display long decimals. Division is the operator to guard: dividing by zero errors out, so test the denominator first.

## Text functions

For row-level cleanup and labeling: `LEFT`, `RIGHT`, `MID`, `LEN`, `FIND`, `CONTAINS`, `UPPER`, `LOWER`, and `TRIM`, plus `TEXT` and `VALUE` to convert between text and numbers. Use `&` to concatenate text. Typical analyst uses include extracting an email domain, flagging a name that contains a keyword, or building a label such as region plus year.

## Date functions

`TODAY()`, `NOW()`, `DATE(y, m, d)`, `DATEVALUE(...)`, and pieces like `YEAR`, `MONTH`, and `DAY`. Subtracting two dates gives a number of days, which is how age and cycle-time calculations work: `CLOSE_DATE - CREATED_DATE`. Remember that date and datetime fields are different, so convert with `DATEVALUE` when you mix them.

## Summary-specific functions

Summary formulas add functions that understand the report's grouping structure. The two to remember are:

- `PARENTGROUPVAL(field, level)` returns the value from a higher grouping level, which is how you compute share of parent or share of grand total.
- `PREVGROUPVAL(field, level)` returns the value from the previous group at a given level, which is how you compute change from the prior period.

They only make sense when the report is grouped, so they are not offered in row-level formulas. The next lesson puts both to work.

## Blanks and errors

Blank numeric fields can be treated as zero or as empty depending on the function, so results can surprise you. Defensive habits: test with `ISBLANK` or use `BLANKVALUE(field, 0)`, guard every division, and spot check a few known records against the formula's output.

## T-SQL translation

| T-SQL | Report formula |
|---|---|
| `CASE WHEN ... END` | `IF(...)`, nested |
| `ISNULL(x, 0)` | `BLANKVALUE(x, 0)` |
| `LEFT(s, n)` | `LEFT(s, n)` |
| `DATEDIFF(day, a, b)` | `b - a` |
| `ROUND(x, 2)` | `ROUND(x, 2)` |
| `LAG(x)` over ordered groups | `PREVGROUPVAL` |

## Recap

Formulas read like spreadsheet expressions. Use the Functions tab to confirm names, remember the five families, know that summary formulas have group-aware functions and row-level formulas have richer text and date support, and guard blanks and divisions.

## Check yourself

You want each opportunity's age in days and a label of "Stale" when it is over 90 days. Which function families do you use, and is this a row-level or summary formula?
