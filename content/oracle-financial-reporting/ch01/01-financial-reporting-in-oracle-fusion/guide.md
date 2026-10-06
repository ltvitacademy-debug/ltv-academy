# Financial Reporting in Oracle Fusion

Welcome to Oracle Financial Reporting, the fifth course in the Oracle Fusion Financials Consultant path. You have already configured enterprise structures, the General Ledger, Payables, Receivables, Cash Management, Fixed Assets, Expenses, and the business processes that move transactions through Subledger Accounting into the ledger. Every one of those modules exists, in the end, to produce numbers somebody needs to read: a controller closing the books, a CFO signing a board deck, an auditor testing a balance, a collections analyst chasing overdue invoices. This course is about the tools Oracle Fusion gives you to get those numbers out of the system and in front of the right person, in the right shape. We start with the landscape: what reporting tools exist in Oracle Fusion Cloud Financials, and why there are so many of them.

## What you'll learn

- Why Oracle Fusion ships several different reporting tools instead of one
- The four reporting "jobs" financial reporting has to cover
- A first look at where each tool fits: Financial Reporting Studio, OTBI, BI Publisher, and Smart View
- Why this course is organized the way it is

## One system, many kinds of readers

Think back to the readers you met in Accounting Fundamentals: owners and investors, lenders, managers, tax authorities, and in an Oracle Fusion implementation, internal auditors and regulators too. Each of those readers wants something different from the same underlying transactions:

- A **board member** wants a clean, formatted Income Statement and Balance Sheet that looks the same every month and ties to prior periods.
- A **collections analyst** wants to slice open receivables by customer, by age bucket, this afternoon, without waiting on IT.
- A **compliance team** wants a pixel-perfect, scheduled report — maybe a 1099 form or a statutory disclosure — that goes out automatically, in the same layout, every period.
- A **controller doing close** wants to pull live ledger balances into Excel, pivot them five different ways, and build a management package by Friday.

No single report-writing tool is good at all four of those jobs at once. A tool built for fast ad hoc slicing is usually weak at producing a precisely formatted statutory PDF, and a tool built for pixel-perfect output is usually too heavyweight for "let me just check something quickly." Oracle Fusion Cloud Financials solves this by giving you several purpose-built tools rather than one tool trying to do everything.

## The four reporting jobs, and the tools built for them

| Job | What it needs | Primary Oracle Fusion tool |
|---|---|---|
| Formatted financial statements (Income Statement, Balance Sheet, Trial Balance) that must look consistent period after period | A grid-based report built against GL balances, with a defined point of view for ledger and period | **Financial Reporting Studio** (Financial Reporting Web Studio), run from the Financial Reporting Center |
| Ad hoc, real-time exploration and dashboards over live transactional data | Drag-and-drop analysis against curated subject areas, no SQL required | **Oracle Transactional Business Intelligence (OTBI)** |
| Pixel-perfect, often scheduled output — regulatory forms, invoices, checks, statutory reports | A data model plus a precise layout template (RTF, Excel, PDF) that reproduces an exact required format | **BI Publisher** (Oracle Analytics Publisher) |
| Excel-native, multidimensional analysis of ledger balances, plus collaborative narrative reporting packages | A spreadsheet interface connected live to Fusion data, with pivoting, drill, and (for packages) author/review/sign-off workflow | **Smart View**, including Report Packages |

You will spend one chapter on the Financial Reporting Center (where Financial Reporting Studio output lives), one chapter on OTBI, one on BI Publisher, and one on Smart View, before finishing with the specific financial and operational reports — financial statements, trial balance, AP/AR aging, fixed assets, cash management — that a working consultant is asked to produce every single month.

## Where these tools live

All four tools are reachable from inside Oracle Fusion Cloud Financials, not from a separate application you have to log into:

- The **Financial Reporting Center** is a page inside the General Accounting work area.
- **OTBI** analyses and dashboards appear both in a general Reports and Analytics catalog and embedded as panel tabs directly inside work areas like Payables or Receivables.
- **BI Publisher** reports are launched and scheduled from the Scheduled Processes work area, or from the same Reports and Analytics catalog.
- **Smart View** is a Microsoft Office add-in that connects out to your Fusion environment once it is installed and configured.

You'll meet the catalog that ties several of these together, the Reports and Analytics pane, in the very next lesson.

## Recap

Oracle Fusion Cloud Financials has four main reporting tools — Financial Reporting Studio, OTBI, BI Publisher, and Smart View — because financial reporting is really four different jobs: formatted statements, ad hoc exploration, pixel-perfect scheduled output, and Excel-native analysis. None of them replaces the others; a real consultant uses all four, often in the same week. Next up, lesson 2: the Reports and Analytics pane, the catalog where most of this output is found and launched.
