# Lesson 13 — What a Sentinel Workbook Actually Does

**Chapter 4 · Workbooks & Visualization · Lesson 13 of 32**

## What you'll learn

- What a Sentinel workbook actually is under the hood, and why it isn't a Sentinel-specific feature at all
- The three building blocks every workbook is assembled from: text, queries, and parameters
- Why a workbook is interactive rather than a static picture, and why that matters mid-investigation
- How a workbook connects back to the Log Analytics workspace and the KQL skills built in Chapter 2

## A workbook is Azure Monitor's reporting engine, borrowed by Sentinel

The dashboard concept you already know — a live view that answers "what needs attention right
now" instead of summarizing the past — has a specific implementation inside Sentinel, and it's
called a **workbook**. Workbooks aren't a feature Microsoft built just for Sentinel. They're part
of **Azure Workbooks**, a reporting framework that lives in Azure Monitor and is reused across
many Azure services. Sentinel surfaces that same framework under its own **Workbooks** page (in
the Azure portal, under Threat Management), pre-pointed at your Sentinel data. That reuse matters
practically: once you understand how a Sentinel workbook works, you can read a workbook built for
Azure VM monitoring or Office 365 reporting too — the engine underneath is identical.

## What's actually inside one: text, queries, and parameters

A workbook is assembled from a small set of building-block "steps," stacked in order on a canvas:

```
Text step      — markdown explaining what a section shows
Query step     — a KQL query, rendered as a table, chart, or grid
Parameter step — a dropdown or time-range picker that feeds other steps
Link step       — a tile or tab that jumps to another view or workbook
```

A query step is where Chapter 2's KQL work pays off directly: every chart and table in a workbook
is backed by a real KQL query run against your Log Analytics workspace, the same workspace
covered in Lesson 2. A parameter step is what turns a flat report into something you can steer —
pick a different time range or a specific hostname from a dropdown, and every query step wired to
that parameter re-runs and updates in place.

## Interactive, not static: why that matters mid-investigation

A screenshot of a chart answers one question, frozen at one moment. A workbook answers a family of
related questions, because an analyst can change a parameter and immediately see the same queries
re-run against a different slice of data — narrow a sign-in failures workbook from "last 24 hours"
to "last hour," or from "all users" to one specific account, without touching KQL at all. That's
the practical reason Sentinel leans on workbooks instead of static dashboards for investigation
work: the person using it rarely wants the exact view the workbook's author first built, they want
a starting point they can reshape live.

## Key terms

| Term | Meaning |
|---|---|
| Workbook | An interactive Azure Monitor report made of text, query, parameter, and link steps |
| Azure Workbooks | The underlying Azure Monitor framework Sentinel's Workbooks page is built on |
| Query step | A workbook component backed by a real KQL query against the Log Analytics workspace |
| Parameter step | A workbook control (dropdown, time range, etc.) that other steps react to live |

## Check yourself

A coworker says "a workbook is just a dashboard with extra steps." What's the one detail in this
lesson that makes that description incomplete — specifically, what can a reader of a workbook
*do* that they can't do with a static dashboard tile?
