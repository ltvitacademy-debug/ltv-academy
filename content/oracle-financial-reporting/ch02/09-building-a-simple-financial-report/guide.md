# Building a Simple Financial Report

Time to put the building blocks from lesson 8 together. This lesson walks through the conceptual steps of constructing a simple financial report in Financial Reporting Studio — a condensed, three-line summary report, the kind of thing you might build before tackling a full Income Statement. The goal is to understand the *workflow*: what decisions get made in what order, not to memorize exact click paths that change release to release.

## What you'll learn

- The typical build sequence: grid, rows, columns, point of view, format, save
- A worked example: building a simple Revenue / Expense / Net Result report
- Where headers and titles pick up point-of-view values automatically
- The difference between saving a report and publishing it to the Financial Reporting Center

## The build sequence

Building a Financial Reporting Studio report generally follows this order:

1. **Start a new report and add a grid.** A report can contain one or more grids; a simple report typically has just one.
2. **Define the rows.** Decide what you're reporting on — in our example, three rows: Total Revenue, Total Expenses, and Net Result.
3. **Define the columns.** Decide what's being compared — in our example, a single column for "Actual," though a real report would often add a prior-period or budget column for comparison.
4. **Set the point of view.** Attach the dimensions not already covered by rows or columns — ledger, and which period the report should default to when run (the user can usually still change this at run time).
5. **Format the grid.** Apply number formatting (commas, parentheses for negative values, currency symbols), add a report title and column headers, and adjust fonts or column widths.
6. **Preview, then save.** Run the report against a real point of view to confirm the numbers look sane before saving it.

## Worked example: a three-line summary report

Imagine building the simplest possible management report: Revenue, Expenses, and the Net Result between them.

- **Row 1 — Total Revenue:** references the parent node of the revenue account hierarchy, so it automatically includes every revenue account beneath it.
- **Row 2 — Total Expenses:** references the parent node of the expense account hierarchy, the same way.
- **Row 3 — Net Result:** a formula row, defined as Row 1 minus Row 2, rather than pulling from the cube directly.
- **Column — Actual:** a single column showing the Actual scenario for whatever period the point of view specifies.

Run this against the point of view "Ledger: US Operations, Period: March 2026, Scenario: Actual," and you get three lines: total revenue for March, total expenses for March, and the net result, computed live from the other two rows. Change the point of view to April and rerun it, and the same three-row, one-column design now reports April's numbers instead — this is the payoff of separating report *design* from point of view described in lesson 6.

## Headers that pick up the point of view automatically

A well-built report doesn't hard-code "March 2026" into its title as literal text. Instead, the title and column headers reference the point-of-view values themselves, so when you change the period and rerun the report, the header updates automatically to say "April 2026" without anyone editing the report design. This single habit prevents an entire category of embarrassing errors — a report whose heading still says January while its numbers are from March, because someone forgot to update a hard-coded label.

## Saving versus publishing

Saving a report keeps your work; it does not automatically mean every user with Financial Reporting Center access can see it. **Publishing** a report to the appropriate folder in the Financial Reporting Center is the separate step that makes it available to the audience it was built for — which is why the Financial Reporting Center you toured in lesson 5 can contain both Oracle-seeded reports and reports your own team has authored and published.

## Recap

Building a simple Financial Reporting Studio report follows a consistent sequence: define rows, define columns, set the point of view, format the grid, then preview and save — followed by a separate publish step to make it visible in the Financial Reporting Center. This closes out Chapter 2. Next up, Chapter 3 begins with lesson 10: OTBI and subject areas, moving from formatted statements to ad hoc exploration.
