# Lesson 15 — Publishing and Scheduled Refresh

**Chapter 4 · The Power BI Operational Dashboard · Lesson 15 of 26**

## What you'll learn

- How to publish this report to a Power BI Service workspace
  Executives can actually reach
- How to set up a scheduled refresh, and why its timing has to respect
  both the warehouse load and Chapter 3's validation run
- Why an On-premises Data Gateway is the real piece that makes a
  scheduled refresh against SQL Server possible at all
- What "done" means for the Power BI deliverable specifically — not
  the whole capstone, just this one front-end

## Publishing to the Power BI Service

From Power BI Desktop: **Home → Publish**, choosing (or creating) a
workspace Executives have access to, e.g. "Thornbury Executive
Reporting." Once published, the Executive Summary and Regional
Drill-Down pages become a report Executives can open from a browser or
the Power BI mobile app — no Power BI Desktop installation required on
their end, which matters for a dashboard meant to be clicked through
live in a meeting room.

## Setting up scheduled refresh

In the Power BI Service: open the semantic model's **Settings →
Scheduled refresh**, and configure it to refresh once daily. The
timing decision here is the real lesson:

| Step | When it runs | Why |
|---|---|---|
| 1. Warehouse load | e.g. 1:00 AM | The nightly `dw.*` refresh Chapter 2's load logic runs on |
| 2. Validation | e.g. 2:00 AM | Chapter 3's Python script, logging to `dw.DataQualityLog` |
| 3. Power BI refresh | e.g. 3:00 AM | Only after both of the above are known-good |

Scheduling the Power BI refresh *before* the validation step would
mean Executives could open a dashboard reflecting data nobody has
checked yet. Scheduling it strictly after both the load and the
validation finish means that by the time anyone opens this dashboard,
that night's numbers have already passed every check from Chapter 3.

## Why a gateway is required

Power BI Service is a cloud product; the `dw.*` warehouse lives on an
on-premises (or private-network) SQL Server instance. Those two have
to be bridged by an **On-premises Data Gateway** — a small Microsoft
service installed on a machine with network access to SQL Server,
which the Power BI Service talks to in order to reach data it
otherwise couldn't. Without a gateway configured and running, the
scheduled refresh has no way to actually reach `dw.FactProductSales`
on its own, even if every setting above is configured correctly.

## What "done" means here — and what it doesn't mean yet

Finishing this lesson means the Power BI deliverable for Executives is
complete: a published, scheduled, refreshing dashboard. It does **not**
mean this capstone is done — Chapters 5 and 6 still have to build the
Board's Tableau deck and Finance's Excel workbook completely
independently, on top of the same warehouse. Each front-end gets built
to completion on its own, one at a time, rather than all three being
half-finished simultaneously.

## Key terms

| Term | Meaning |
|---|---|
| Power BI Service | The cloud platform that hosts published reports for viewing in a browser or mobile app |
| On-premises Data Gateway | A bridge service that lets Power BI Service reach data sources that aren't directly reachable from the cloud |
| Scheduled refresh | A configured, recurring automatic reload of a published semantic model's data |

## Lab

1. Publish your report to a workspace of your choosing in the Power
   BI Service.
2. Configure a daily scheduled refresh, and write down the three-step
   timing table above with real times of your own choosing.
3. Confirm (or research, if you don't have a live gateway to test)
   what an On-premises Data Gateway actually is and why Power BI
   Service can't reach an on-premises SQL Server without one.

## Check yourself

You're ready for Chapter 5 when you can explain why the Power BI
refresh has to be scheduled after both the warehouse load and the
Python validation finish, what an On-premises Data Gateway bridges,
and why finishing this lesson doesn't mean this capstone is finished.
