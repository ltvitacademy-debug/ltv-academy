# Joined Reports

A **joined report** lets you put up to several report **blocks** side by side in one view. Each block can have its own filters, and blocks can even come from different report types. It is the format for comparisons that no single report type can answer, such as "hot accounts next to their open cases".

## What you'll learn

- What a block is and how blocks line up
- The two common uses: same type with different filters, and different types together
- How a joined report differs from a SQL join
- The main limitations

## Blocks and common groupings

A joined report is built from **blocks**. Each block is like a mini report with its own report type, columns, and filters. The blocks are lined up by a **common grouping**, a field that exists in every block, such as Account Name or Priority. Rows with the same value of the shared grouping appear on the same line across all blocks.

In the Report Builder for joined reports you add blocks by choosing to add a report type or block (menu wording varies by release), then filter and choose columns per block.

## Two common patterns

**1. Same report type, different filters.** Take the Cases report type and create three blocks: closed cases, new cases, and cases that are working or escalated. Group all three by Priority. You get the priority breakdown for each status side by side, with a subtotal for every block. A single summary report could not show these three filtered populations at once.

**2. Different report types together.** Put an Accounts block (filtered to Rating = Hot) next to a Cases block (open cases). Grouped by Account Name, each hot account is shown beside its open cases. The report types must be compatible, meaning they share a common field to group on.

## It is not a SQL join

Do not picture `SELECT ... FROM Account JOIN Case ON ...` producing one wide result set. Each block runs as its own query with its own `WHERE`, and the shared grouping field lines the results up visually. The closest T-SQL mental model is running separate queries, then placing their outputs next to each other keyed on a common column.

A consequence: a row can have a value in one block and nothing in another (a hot account with no open cases). That is expected, and it is often the point of the comparison.

## Limitations to know

- **Block count.** A joined report typically allows up to five blocks.
- **Common fields required.** Blocks must share a field to align on. If two report types have no common field, you cannot combine them.
- **Dashboard use.** In most orgs a joined report cannot be used as a normal dashboard source, so it is mostly for people who run the report directly.
- **Formulas and features.** Some report features, such as cross-block summary formulas, work differently than in other formats, and some features are unavailable. Always check the current documentation before building a design on a joined report.

## When to use joined reports

Use one when the comparison across populations is the deliverable: status side by side, this year against last, accounts against cases. If you only need one population, or you need to chart the result on a dashboard, a summary or matrix report is simpler.

## Recap

- A joined report is a set of blocks, each with its own type and filters.
- Blocks line up on a shared grouping field.
- It behaves like side-by-side queries, not a single SQL join.
- Expect limits: about five blocks, common fields, and restricted dashboard use.

## Check yourself

You want to compare closed, new, and escalated cases by priority in one view. Explain how you would build that as a joined report, and what field aligns the blocks.
