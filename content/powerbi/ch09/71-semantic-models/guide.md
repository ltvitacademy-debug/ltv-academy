# Lesson 71 — Semantic Models

**Chapter 9 · Power BI Service & Fabric · Lesson 5 of 8**

## What you'll learn

- What a semantic model actually is, in service terms
- The three storage modes: Import, DirectQuery, Composite
- Live connections to externally hosted models
- Semantic model ownership and row-level security in the service

## The published version of your model

Every DAX measure and every relationship you built in Chapters 4-6
lives inside what the service calls a **semantic model** — the term
Power BI now uses for what used to be called a "dataset." When you
published a report, its semantic model came along, ready for other
reports to be built against it too.

A semantic model is "ready for reporting" data: not raw source tables,
but the modeled, related, measure-bearing shape you spent five
chapters building. That's exactly why the service treats it as its own
first-class object, separate from any one report.

## Three ways a semantic model gets its data

| Mode | How it works |
|---|---|
| **Import** | Data is copied into the model and stored in memory. Fast to query, but needs a scheduled or on-demand refresh to stay current |
| **DirectQuery** | No data is copied — every query passes through live to the source (like your SQL Server AdventureWorks connection). Always current, but slower and dependent on the source being reachable |
| **Composite** | Some tables Import, others DirectQuery, in the same model — mixing the two where each fits best |

Import and DirectQuery models that connect to on-premises sources
(your SQL Server instance, for AdventureWorks or Northwind) need a
**gateway** if the data isn't reachable directly from the internet —
the same gateway concept Chapter 2, Lesson 9 introduced.

## Live connections to externally hosted models

Some organizations already have a mature model hosted outside Power
BI entirely — in SQL Server Analysis Services or Azure Analysis
Services. Power BI can make a **live connection** to that model
instead of importing anything:

![Diagram showing how a live connection semantic model passes queries through to an externally hosted model.](/courses/power-bi/ch09/71-semantic-models/live-connection-dataset.png)
*A live-connection semantic model doesn't hold data itself — it passes every query straight through.*

This matters when an enterprise data warehouse team has already
invested years into an Analysis Services model: Power BI reports can
sit on top of it without duplicating that work, and permissions
enforce using the actual report viewer's identity.

## Ownership and row-level security

If you're not the owner of a semantic model, you see it in read-only
mode — you can view its settings but not change them, and you'd need
to ask the owner or take over ownership yourself to make edits.

Semantic models can also enforce **row-level security (RLS)** — for
example, restricting a "Salespeople" group to only the sales region
rows relevant to them. RLS roles are either **dynamic** (filter based
on who's viewing) or **static** (the same filter for everyone assigned
to that role).

## Key terms

| Term | Meaning |
|---|---|
| Semantic model | The published, modeled version of your data — what used to be called a "dataset" |
| Import mode | Data copied into memory; fast, needs refresh |
| DirectQuery mode | No data copied; queries pass through live to the source |
| Composite mode | Some tables Import, others DirectQuery, in one model |
| Live connection | A semantic model that queries an externally hosted Analysis Services model directly |
| Row-level security (RLS) | Rules that restrict which rows different users can see in the same semantic model |

## Lab

1. Open the semantic model behind your `AdventureWorksDW2014` report
   in the service (**Settings → Semantic models**, or from the
   workspace content list).
2. Check its storage mode — since you connected via the SQL Server
   connector and imported the data, it should show as Import.
3. Note where a scheduled refresh would be configured for this model
   (you'll set one up properly in the next chapter, on refresh and
   gateways) — for now, just locate the **Refresh** button and the
   **Scheduled refresh** setting in the model's "..." menu.

## Check yourself

You're ready for Lesson 72 when you can explain, in one sentence each,
the difference between Import, DirectQuery, and a live connection to
an externally hosted model.
