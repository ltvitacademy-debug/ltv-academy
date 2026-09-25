# CRM Analytics vs. Native Reports

You spent an entire course mastering native Salesforce reports and dashboards, and you have now seen datasets, recipes, dashboards, and lenses in CRM Analytics. This lesson closes out the fundamentals chapter by putting the two side by side. The goal is not to crown a winner. It is to give you a fast, defensible way to decide which one a given request deserves, because a Salesforce data analyst is asked that question constantly.

## What you'll learn

- The core architectural difference between live reports and loaded datasets
- Where CRM Analytics genuinely goes beyond native reporting
- Where native reports are still the better choice
- A simple decision rule you can apply to a real request

## Live records versus prepared datasets

A native report queries your Salesforce records directly when it runs, so what you see is current as of that moment. Everything you learned about report types, filters, and formulas operates on live object data.

CRM Analytics works on **datasets**: data that has been extracted, prepared, and stored in a format optimized for analysis. A recipe or connection loads it on a schedule. Two consequences follow. First, datasets can combine Salesforce data with data from other sources and be reshaped before anyone queries them. Second, the data is only as fresh as the last refresh.

## Where CRM Analytics goes further

- **Scale and speed.** Because datasets are precomputed for aggregation, exploration stays responsive on volumes that make a report feel slow.
- **Blending.** Datasets can be built from more than one source, and prepared with joins and transformations before they reach a dashboard.
- **Interactivity.** In a CRM Analytics dashboard, selecting a value in one chart re-slices the other widgets that share the same data. This is called faceting. In a native dashboard, each component runs its own report, and clicking a chart does not filter its neighbors.
- **Exploration.** Any widget can be opened as a lens for further questions, as you saw in the last lesson.
- **Programmability.** Dashboards can be customized with bindings, and queries can be written directly in SAQL, which Chapter 3 covers.

## Where native reports still win

Native reports are the right answer more often than people admit.

- **Simple operational lists.** A rep's open opportunities this week is a five-minute report, always current, with no data prep.
- **Inherited security.** Reports respect your sharing model automatically. CRM Analytics needs security deliberately configured on datasets, which is the subject of Chapter 8.
- **Embedded in the workflow.** Reports and dashboards sit naturally on record pages and in familiar tabs.
- **Lower overhead.** No recipes to maintain, no refresh schedule to monitor, and generally no separate license question.

Licensing deserves a note. CRM Analytics is typically licensed separately from the core platform, so confirm what your organization has before designing around it.

## A decision rule

Ask three questions about the request:

1. Does it need data from outside Salesforce, or a volume that strains a report?
2. Does it need users to explore interactively, not just read?
3. Does it need calculations or prepared data a report cannot express?

If the answer to all three is no, build a report. If any is yes, CRM Analytics earns its added complexity. Many organizations use both, with reports for daily operations and CRM Analytics for deeper analysis.

## Recap

Native reports query live records with minimal setup and inherited security. CRM Analytics queries prepared datasets, which brings scale, blending, faceting, and programmability at the cost of data prep, refresh scheduling, deliberate security, and licensing. Choose by the need, not the novelty.
