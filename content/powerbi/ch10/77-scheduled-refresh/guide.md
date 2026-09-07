# Lesson 77 — Scheduled Refresh

**Chapter 10 · Refresh & Gateways · Lesson 3 of 4**

## What you'll learn

- The exact path to a semantic model's Schedule refresh screen
- How gateway connection and data source credentials fit together
- What frequency and time slots you can actually configure
- The inactivity pause that quietly disables refresh after two months

## Getting to Schedule refresh

1. Go to the workspace and select the semantic model from its content
   list.
2. On the semantic model details page, select **Refresh → Schedule
   refresh**.

![Screenshot of the Schedule refresh menu option on a semantic model details page.](/courses/power-bi/ch10/77-scheduled-refresh/semantic-model-schedule-refresh.png)
*Every setting in this lesson lives behind this one menu.*

## Setting the schedule

Set **Configure a refresh schedule** to **On**, then choose frequency
(daily or weekly) and one or more time slots:

![Screenshot of scheduled refresh settings showing frequency and time slots.](/courses/power-bi/ch10/77-scheduled-refresh/scheduled-refresh.png)
*Each added time slot counts toward the daily quota Lesson 75 covered — 8 or 48, depending on capacity.*

Power BI targets starting the refresh within 15 minutes of the
scheduled slot, though a delay up to an hour can happen if the service
can't allocate resources sooner. It can also start as early as five
minutes before the slot.

## Gateway connection

This section shows which gateway — personal or standard — is
available and online for this semantic model:

![Screenshot of gateway connection section showing available personal and on-premises data gateways.](/courses/power-bi/ch10/77-scheduled-refresh/gateway-connection.png)
*If Lesson 76's gateway install isn't online, this section shows it as unavailable — fix that first.*

## Data source credentials

What you see here depends on which gateway type you're using:

- **Personal-mode gateway** — you supply the sign-in credentials for
  the underlying data source yourself; they're retained after the
  first successful refresh.

  ![Screenshot of data source credentials dialog for a personal-mode gateway.](/courses/power-bi/ch10/77-scheduled-refresh/data-source-credentials-pgw.png)
  *You're only prompted the first time — after that, credentials stay attached to the semantic model.*

- **Standard (enterprise) gateway** — credentials are defined by the
  gateway administrator, not you, so this section is grayed out:

  ![Screenshot of data source credentials section grayed out for a standard gateway managed by an admin.](/courses/power-bi/ch10/77-scheduled-refresh/data-source-credentials-egw.png)
  *Nothing to configure here — a gateway admin already set this up centrally.*

## Refresh frequency limits, restated

- **Power BI Pro** (shared capacity): up to 8 scheduled refreshes/day.
- **PPU, Premium, or Fabric capacity**: up to 48/day.

## The inactivity pause — easy to miss

If no user opens *any* report or dashboard built on a semantic model
for **two months**, Power BI automatically pauses its scheduled
refresh, emails the owner, and marks the schedule **Disabled**. Any
view — including through an app — resets that inactivity counter. To
resume, open any report or dashboard using the semantic model, then
re-enable the schedule if it doesn't restart on its own.

## Key terms

| Term | Meaning |
|---|---|
| Schedule refresh | The service screen for configuring frequency, time slots, and credentials |
| Gateway connection | The section showing which gateway is available/online for this refresh |
| Inactivity pause | Automatic refresh-pausing after two months with no report/dashboard views |

## Lab

1. Open your `AdventureWorksDW2014` semantic model and go to **Refresh
   → Schedule refresh**.
2. Set the schedule to **On**, choose a daily frequency, and add one
   time slot.
3. Confirm your Lesson 76 gateway shows as online in **Gateway
   connection**, and that credentials are already saved (from your
   very first refresh) rather than being prompted again.

## Check yourself

You're ready for Lesson 78 when you can explain what happens to a
scheduled refresh after two full months with no one viewing its
report — and how to bring it back.
