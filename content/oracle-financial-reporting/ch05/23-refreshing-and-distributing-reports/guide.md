# Refreshing and Distributing Reports

Chapter 5 closes by tying together everything Smart View does: once a worksheet or a Report Package exists, how does it stay current, and how does it reach the people who need it, without becoming yet another manual, error-prone monthly task?

## What you'll learn

- Refresh behavior on ad hoc worksheets, revisited for a team workflow
- Importing and exporting metadata and data between Smart View and Excel
- Distributing finished Smart View workbooks
- How this chapter's tools compare to BI Publisher's distribution model from Chapter 4

## Refreshing as a team habit, not just an individual one

Lesson 21 covered refreshing a single worksheet. In a real close process, refresh becomes a team habit: a controller builds the variance analysis workbook once, early in the period, then the whole team refreshes the same file repeatedly as subledgers close and balances firm up — Payables first, then Receivables, then the final GL close — rather than everyone rebuilding their own version from scratch at each stage. The workbook stays the single source of truth; only the underlying numbers change as refresh is clicked.

## Import and export between Smart View and Excel

Smart View supports moving data and structure both directions:

- **Importing** metadata or data from the connected Fusion environment into a worksheet — the core operation behind every ad hoc analysis in lesson 21.
- **Exporting** or uploading locally built queries and workbooks back up to the Financial Reporting Center (recall from lesson 5 that the Financial Reporting Center explicitly lists "Smart View reports" as one of its content types) — so a useful ad hoc workbook one person built can be shared with others through the same catalog-based mechanism covered for OTBI in lesson 14, rather than only existing as an email attachment.

## Distributing finished workbooks

Once a workbook is finished and refreshed, distributing it to people without Smart View access themselves generally means one of:

- Sharing the workbook as a static Excel file (a snapshot as of the last refresh) by email or a shared drive — fine for a one-time distribution, but it will go stale the moment the next period closes.
- Publishing the workbook (or a Report Package built on top of it) to the Financial Reporting Center, so others with the appropriate access can open a live or recently refreshed version themselves.
- For Report Packages specifically, publishing through the Narrative Reporting sign-off workflow from lesson 22, so the final, approved version reaches its audience with a documented approval trail attached.

## Comparing this to BI Publisher's distribution model

Chapter 4 covered BI Publisher's scheduled, automated delivery — the right model for recurring, must-arrive-every-period reports with little judgment involved. Smart View's distribution model is different on purpose: it assumes a human is actively building, reviewing, or refreshing the workbook, because the whole point of Smart View is interactive, judgment-driven analysis, not unattended automation. Recognizing which model a given deliverable actually needs is the same decision-framework thinking from lesson 3, now applied one level deeper, inside a single tool's own feature set.

## Recap

Smart View content gets refreshed as a team habit through a close cycle, moved in and out of Excel through import/export, and distributed either as a static snapshot, a published catalog item, or a formally signed-off Report Package — a distribution model built around active human involvement, deliberately different from BI Publisher's unattended scheduling. This closes Chapter 5. Next up, Chapter 6: the specific financial and operational reports — Income Statement, Balance Sheet, Trial Balance, AP/AR aging, and more — a working consultant must know cold.
