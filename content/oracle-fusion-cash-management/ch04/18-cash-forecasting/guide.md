# Cash Forecasting

Cash Positioning (Lesson 17) answers "what do I have right now." Cash Forecasting answers a harder question: "what should I expect over the weeks and months ahead." This lesson covers the two main approaches Oracle Fusion Cash Management supports, and how a forecast gets structured.

## What you'll learn

- The two main forecasting approaches: transaction-based and trend-based
- What a forecast template actually defines
- How multi-currency and multi-org forecasting works
- Why a forecast is a planning tool, not a guarantee

## Two approaches to building a forecast

- **Transaction-based forecasting** uses transactions that already exist somewhere in Oracle but haven't settled yet — open Payables invoices not yet due, open Receivables invoices not yet collected, purchase orders expected to turn into payments. This approach answers "based on what we already know is coming, what does cash look like?"
- **Trend-based (historical) forecasting** analyzes past actual cash flows — historical payments and receipts — and projects that trend forward. This approach answers "based on what's happened before, what should we expect to happen again?" It's useful for categories of cash flow that don't show up as a clean open transaction anywhere (retail cash sales, for instance) but that have a predictable historical pattern.

Many real-world forecasts blend both: known open transactions for the near term, where they exist, and historical trend analysis to fill in categories or periods where no open transaction tells the story.

## What a forecast template defines

A **cash forecast template** defines the structure of the forecast: which rows (sources of cash flow — Payables, Receivables, Payroll, a trend-based category) and which columns (time buckets — daily, weekly, monthly) it's built from. A company might run one template for a tight 30-day, weekly-bucketed operational forecast, and a separate template for a 12-month, monthly-bucketed strategic forecast — same underlying data sources, structured differently for different audiences.

## Multi-currency and multi-org forecasting

Oracle Fusion Cash Management "supports forecasting in any currency, across different organizations, for multiple time periods" — meaning a single forecast can roll up cash flows from subsidiaries operating in different currencies and different business units into one consolidated view, which matters enormously for a multinational treasury function trying to see the whole company's cash picture at once, not just one entity's.

## A forecast is a planning tool, not a guarantee

A forecast built from open transactions can still be wrong if those transactions don't actually settle on schedule (a customer pays late; a supplier's invoice gets disputed and delayed). A trend-based forecast can be wrong if the future doesn't behave like the past (a seasonal spike, a one-time event). Treasury uses a forecast to plan — deciding whether to arrange a line of credit, or whether there's room to invest — not as a number guaranteed to be exactly right.

## A worked example

Harborview Metals Inc. builds a 13-week operational cash forecast: rows for open Payables invoices (transaction-based), open Receivables invoices (transaction-based), and "miscellaneous cash sales" (trend-based, projected from the last six months' actuals), in weekly columns, consolidated across its US entity and UK subsidiary in both USD and GBP, rolled up to a single USD-equivalent total for the CFO's weekly review.

## Key terms

| Term | Meaning |
|---|---|
| Transaction-based forecasting | Built from open, not-yet-settled system transactions |
| Trend-based forecasting | Built from projecting historical actuals forward |
| Cash forecast template | Defines the rows (sources) and columns (time buckets) of a forecast |

## Recap

Cash Forecasting blends transaction-based and trend-based approaches, structured by a template's rows and time-bucket columns, and can consolidate multiple currencies and organizations into one view — useful for planning, not a guaranteed number. Next up, lesson 19: how all of this cash activity actually becomes accounting entries.
