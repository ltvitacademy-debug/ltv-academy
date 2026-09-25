# Performance Tuning for CRM Analytics

A dashboard that takes fifteen seconds to load is a dashboard people stop opening. In the last lesson you saw how interactions multiply: each widget is a query, each selection can fire more of them. This lesson gives you a working method for making CRM Analytics dashboards fast, starting with measurement rather than guesswork. As with all Salesforce performance guidance, thresholds and features change by release, so treat the specifics here as principles and confirm limits in current documentation.

## What you'll learn

- Why a dashboard's speed is really the speed of its queries
- How to measure with the Dashboard Inspector before changing anything
- The main levers: dataset design, query count, filters, pages, and bindings
- What the lens Query Limit setting is telling you

## Speed is query speed

Every chart, number, and table on a dashboard is backed by a step, and each step is a query sent to the CRM Analytics engine. A dashboard with thirty steps fires thirty queries when it loads, and the page is not ready until they finish. You already know this instinct from T-SQL: the fix for a slow report is rarely the report's formatting. It is fewer queries, smaller result sets, and better-shaped source data.

## Measure first: the Dashboard Inspector

The designer includes a **Dashboard Inspector**. Salesforce's documentation describes it as collecting performance metrics for the dashboard and pointing out bottlenecks such as redundant queries and slow queries, with a Performance tab summarizing the results. Two habits follow from that:

- Run it before you optimize, so you know which query is actually slow.
- Run it on every layout, and on every page if the dashboard has several, because different layouts can contain different widgets and queries.

## The main levers

**1. Fix it in the dataset, not the dashboard.** Salesforce's guidance is to do calculations at the dataset level, in the dataflow or recipe, rather than in dashboard queries. A derived field computed once during the data prep run costs nothing at view time. The same calculation redone in every query costs time on every load.

**2. Fewer queries and widgets.** Keep query and widget counts lean. Remove duplicate steps the inspector flags, and reuse one step for several widgets where the design allows.

**3. Modularize with pages.** Practitioners note that when a dashboard has multiple pages, only the queries on the default landing page run at load. Splitting a crowded dashboard into pages spreads the cost so viewers pay only for what they open.

**4. Prefer global filters to selection-based filters.** A global filter narrows the data before the queries run, so each query works against a smaller set. Selection-based filters can add extra steps. Where a filter applies to the whole dashboard, a global filter is usually the cheaper design.

**5. Use bindings judiciously.** Bindings are powerful, but each can add a round trip between browser and server. Use them where they earn their place, not as decoration.

## The lens Query Limit

The lens editor in the screenshot shows a **Query Limit** setting at the bottom of the left panel, set to Default. It is a reminder that queries return a bounded number of rows and that showing fewer results is cheaper. Exact limits differ by query type and can change, so check the CRM Analytics limits documentation rather than memorizing numbers.

## A repeatable routine

1. Open the Dashboard Inspector and note the slowest queries.
2. Ask whether the slowness is really in the data: can the dataset pre-compute it?
3. Cut redundant steps and move whole-dashboard filters to global filters.
4. Split into pages if the landing page is heavy.
5. Re-measure to prove the change helped.

## Recap

- A dashboard is only as fast as its slowest queries
- Measure with the Dashboard Inspector on every layout
- Pre-compute in the dataset, keep queries few, use global filters and pages, bind sparingly
- Verify limits in current documentation

## Check yourself

A dashboard's landing page has 40 widgets and loads slowly. Name two changes you would consider and how you would prove they worked.
