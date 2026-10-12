# Paginated Report Design & QA Checklist

Run through this before calling any report "done." Every item maps back to
a specific lesson in this course — if a check fails, that lesson is where
the fix lives.

## Layout & page setup (Chapter 2, Lesson 11)

- [ ] Page size, orientation, and margins are set explicitly on
      **Report Properties → Page Setup**, not left at Microsoft's default.
- [ ] The report body's width, including margins, does not exceed the
      physical page width — check in **Run → Print Layout**, which is the
      only view that actually simulates the printed page.
- [ ] Wide tables/matrices have been narrowed to only the columns the data
      needs, with short headers, before reaching for `WritingMode =
      Rotate270` as a last resort.
- [ ] Unused white space between data regions and at the body's edges has
      been trimmed — every unnecessary inch risks pushing content onto an
      extra page.
- [ ] If the report targets PDF specifically, the report width accounts
      for the PDF page size and margins together.

## Parameters (Chapter 3)

- [ ] Every report parameter has a human-readable **Prompt** — not the
      internal query-variable name it was auto-created from.
- [ ] Data type matches the real underlying column type (a parameter
      auto-created from a query defaults to Text even for numeric IDs).
- [ ] For any cascading chain, parent parameters appear **above** their
      dependents under the Parameters node, and each dependent dataset's
      Filters tab references the parameter one level up.
- [ ] For any multi-value parameter: the dataset query uses `IN` (not
      `=`), every Tablix filter referencing it uses **In** (not
      **equals**), and any direct display expression uses
      `Join(Parameters!X.Label, ", ")` instead of `[@X]` alone.
- [ ] Defaults are set wherever a report should run immediately on open —
      and no default expression references a field from the report's own
      main dataset (defaults resolve before that dataset runs).
- [ ] Parameters meant only to be supplied by a drillthrough action or
      subscription are set to **Internal**, not left visible with no
      default.

## Expressions & formatting (Chapter 4)

- [ ] Every number/date/currency text box has an explicit format (`C2`,
      `N0`, `P0`, `d`, `D`, or a custom .NET format string) — not raw
      decimal output from the dataset.
- [ ] Conditional formatting lives on the style property it belongs on
      (`Color`, `BackgroundColor`, `Fill`) as an IIF/Switch expression —
      confirm it with **three or more** outcomes uses `Switch`, not
      nested IIFs that are harder to read.
- [ ] If a number or date renders as unformatted literal text, the format
      string itself has been double-checked for a typo first — SSRS fails
      silently here instead of raising an error.

## Drillthrough & navigation (Chapter 6)

- [ ] The drillthrough target report was built and tested **before** the
      link was wired up.
- [ ] Every parameter **Name** in the Action's parameter grid matches the
      target report's actual parameter name exactly, including case.
- [ ] The Action was set on the specific cell/text box intended — not
      accidentally on a row or column header.
- [ ] Both source and target reports were deployed to the same Report
      Server folder before the final test (a Report action resolves by
      server path, not by local preview).

## Before deployment

- [ ] The report has been run with realistic parameter combinations,
      including edge cases (empty result set, every value selected on a
      multi-value parameter, the earliest/latest date in range).
- [ ] Data source connections use **Test Connection** successfully against
      the actual target server/database, not just against a local copy.
