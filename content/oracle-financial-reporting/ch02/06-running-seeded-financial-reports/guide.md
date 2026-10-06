# Running Seeded Financial Reports

Oracle Fusion ships with predefined, "seeded" financial reports already built in Financial Reporting Studio format — common statements like an Income Statement or Balance Sheet structure that implementation teams can use as-is or copy and adjust. This lesson covers the mechanics of actually running one: picking a point of view, understanding what happens when you run it, and reading the output.

## What you'll learn

- What a point of view (POV) is, and why every seeded report asks for one
- The typical POV dimensions: ledger, period, scenario, and sometimes currency
- The difference between viewing a report online and exporting it
- What to check first when a seeded report's numbers look unexpected

## Point of view: telling the report what slice of data to show

Every Financial Reporting Studio report is built against the General Ledger balances cube — a multidimensional structure summarizing GL balances by dimensions like ledger, period, account, and cost center. The report *design* (which rows, which columns, which formulas) stays fixed, but the report needs to know, each time it runs, which specific slice of that cube to pull. That's the point of view, commonly set through prompts such as:

- **Ledger** — which ledger's data to report on (a company might have several, for different legal entities or reporting purposes).
- **Period** — which accounting period, such as "Period 3, 2026."
- **Scenario** — typically "Actual," but some configurations also support Budget or Forecast scenarios if they've been loaded.
- **Currency** — ledger currency by default, though some reports support reporting currency if one is configured.

Change the point of view, rerun the same report design, and you get the equivalent statement for a different ledger or period — the same way changing the slide on a projector changes what's shown without changing the projector.

## Viewing versus exporting

Once you select a point of view and run the report, you typically have a choice:

- **View online**, inside the Financial Reporting Center, with the ability to drill into underlying balances (where drill is enabled) directly from the report.
- **Export**, commonly to PDF or Excel, for sharing outside the system or archiving a specific period's result exactly as it looked at close.

Most monthly close processes do both: review online first to catch anything unusual, then export the final, reviewed version for the close binder or for distribution.

## When the numbers look wrong

A report returning unexpected numbers doesn't automatically mean the report design is broken. Work through these in order before assuming that:

1. **Check the point of view first.** A report accidentally run against the wrong period or the wrong ledger will "look wrong" while actually being correct for the slice it was given.
2. **Check data security next** (from lesson 4) — a user's data access set might be scoping the result more narrowly than expected.
3. **Only then** look at the report design itself — the row and column definitions, covered starting in lesson 8.

Jumping straight to "the report must be broken" and rebuilding it is a common and avoidable waste of time for a new consultant.

## Recap

Seeded financial reports are run by selecting a point of view — typically ledger, period, and scenario — against the fixed report design, then either viewed online with drill capability or exported for distribution. When numbers look wrong, check the point of view and data security before assuming the report itself has a problem. Next up, lesson 7: Account Groups, a lighter-weight way to monitor specific key accounts.
