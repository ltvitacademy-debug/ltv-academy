# Scheduling and Subscriptions

**Chapter 2 · Report Management · Lesson 11 of 22**

Nobody wants to be the person who manually runs the same report every Monday morning and emails it around. Salesforce's answer is the **subscription**: a schedule attached to a report or dashboard that delivers fresh results by email, to as many people as you want, without anyone lifting a finger after the first setup.

## What you'll learn

- How report subscriptions differ from dashboard refresh schedules
- The subscription schedule and attachment options
- Recipients: adding other users, groups, and roles
- Run Report As: whose data access a subscription uses
- Conditional subscriptions — only send when something's true

## Subscribing to a report

From the Reports tab or a report's run page, open the menu and choose **Subscribe**. From there you configure:

- **Schedule** — how often the report refreshes and sends (daily, weekly, monthly, with day and time controls).
- **Attach File** (optional) — deliver the results as a **Formatted Report** (.xlsx) or **Report Details** (.csx), so recipients can open it without logging in.

Dashboards subscribe the same way: open a dashboard and click **Subscribe** in the toolbar, which delivers a snapshot image of the dashboard on the schedule you set.

## Recipients

You're added as a recipient automatically, but you can remove yourself if you're only setting this up for others. Click **Edit Recipients** to add other users, public groups, or roles — only people who already have permission to access the report show up as valid matches, so subscriptions can't be used to route data around sharing rules.

## Run Report As

Every subscription has to decide whose eyes the data goes through:

- **Me** — recipients see exactly what you'd see if you ran it yourself.
- **Another Person** — recipients see what that specific person would see, which can be more or less data than they'd normally have access to.

This setting is easy to overlook and has real consequences: picking the wrong "running user" can either leak data a recipient shouldn't see, or quietly under-deliver results because the running user has narrower access than expected.

## Conditions

Add up to five conditions to a subscription — an aggregate measure, an operator, and a value — and the report is only emailed when every condition is met on that run. This turns a subscription into an alert: "only send me this report if total pipeline drops below $500K," instead of a guaranteed delivery on schedule regardless of what the numbers say.

## Recap

- Subscriptions deliver report or dashboard results by email on a schedule, no manual running required.
- Recipients must already have access to the underlying report or dashboard.
- Run Report As controls whose data-level access the delivered results reflect.
- Conditions turn a routine delivery into a threshold-based alert.

## Check yourself

A VP wants a weekly pipeline report sent to the whole sales team, but only when total pipeline value drops below target. Which two subscription settings, together, make that possible?
