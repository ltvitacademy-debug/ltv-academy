# Lesson 9 — Setting Up the Scheduled Refresh

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 9 of 16**

## What you'll learn

- Why a local SQL Server source needs the On-premises Data Gateway for scheduled refresh
- Publishing the report and registering the gateway data source in the Power BI Service
- Setting a weekly refresh schedule and failure notifications
- What "recurring" really means now that this step is done

## Why this step exists at all

Everything so far has lived in Power BI Desktop, refreshing only when you click **Refresh**
yourself. The Sales Director explicitly asked for a report that updates **on its own** before the
Monday meeting — that only happens in the **Power BI Service**, and the Service can't reach a SQL
Server instance sitting on your own machine or local network without help.

## Step 1: publish the report

In Power BI Desktop: **Home → Publish**, choose a workspace. This creates a dataset and a report
in the Power BI Service, but the dataset's connection to `AdventureWorks2012` doesn't come along
for free — the Service needs its own path to that server.

## Step 2: the On-premises Data Gateway

Because `AdventureWorks2012` runs on a SQL Server instance the Power BI Service can't reach
directly, scheduled refresh requires the **On-premises Data Gateway** — a small Windows service
installed on a machine that *can* reach the SQL Server instance, which the Service then talks to
on your behalf. Without it, the **Schedule refresh** option in the Service either won't appear or
will fail with a connection error every time it runs — this is one of the most common real-world
blockers teams hit the first time they try to schedule a refresh against an on-premises database.

Install the gateway (**On-premises Data Gateway**, standard mode) on a machine with access to the
SQL Server instance, and register it to your Power BI tenant during setup.

## Step 3: register the data source on the gateway

In the Power BI Service: **Settings → Manage connections and gateways → your gateway → Add data
source**. Add a SQL Server connection pointing at the same server/database used in Power BI
Desktop, with credentials that have read access to `dbo.vw_CarrawayWeeklySalesFact`,
`dbo.vw_CarrawayProductDim`, and `dbo.vw_CarrawayTerritoryDim`.

## Step 4: bind the dataset and schedule it

Back on the dataset's **Settings** page: under **Gateway connection**, map the dataset to the
gateway data source you just registered. Then, under **Scheduled refresh**:

- Turn it **On**.
- Set frequency to **Weekly**, on the day/time that gives the Sales Director fresh numbers before
  Monday's meeting — for example, **Sunday at 6:00 PM**.
- Add a **failure notification email** so a failed refresh doesn't go unnoticed until someone
  asks why the numbers look stale.

## Key terms

| Term | Meaning |
|---|---|
| Power BI Service | The cloud-hosted side of Power BI that hosts published reports and runs scheduled refreshes |
| On-premises Data Gateway | A Windows service that lets the Power BI Service reach an on-premises database |
| Scheduled refresh | A configured, recurring automatic refresh of a published dataset |

## Lab

Publish the report, install and register the gateway if you haven't already, bind the dataset to
the gateway data source, and configure a weekly schedule with a failure notification. Trigger one
manual refresh from the dataset's **Refresh now** option to confirm the gateway path actually
works before trusting the schedule to run unattended.

## Check yourself

You're ready for Lesson 10 when you can answer, without looking: why does scheduling a refresh
against `AdventureWorks2012` require the On-premises Data Gateway, and what happens if the
dataset isn't bound to a registered gateway data source?
