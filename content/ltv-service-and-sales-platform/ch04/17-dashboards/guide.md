# Lesson 17 — Dashboards

**Chapter 4 · Analytics and Delivery · Lesson 17 of 25**

## What you'll learn

- How a dashboard component differs from the report behind it
- The specific dashboard this capstone builds for Renata's combined sales-and-service view
- Dynamic dashboards and the "View dashboard as" setting
- Dashboard subscriptions, and why they matter for Dmitri's daily routine

## A dashboard visualizes a report; it isn't a replacement for one

Every dashboard component in Salesforce is backed by exactly one report — a dashboard doesn't query data on its own, it renders whatever report you point it at as a chart, gauge, metric, or table. That has a direct consequence for how you build one: if a number on the dashboard looks wrong, the fix is almost always in the underlying report (its filters, its grouping), not in the dashboard component itself.

## The Solstice Executive Dashboard

Renata asked for one dashboard she can open each morning that shows both sides of the business at a glance:

| Component | Type | Backed by |
|---|---|---|
| Open pipeline by stage | Horizontal bar chart | The Summary report on Opportunity grouped by Stage (Lesson 16-style) |
| Closed Won this quarter vs. target | Gauge | A Summary report on Opportunity filtered to Closed Won, this fiscal quarter |
| Warranty claims by status | Donut chart | The Summary report on Warranty_Claim__c grouped by Claim_Status__c |
| Installation Jobs by technician | Table | The Matrix report on Installation_Job__c from Lesson 16 |
| Claim amount by size bucket | Vertical bar chart | The bucketed Summary report from Lesson 16 |

Five components, five underlying reports — this is the normal shape of a real executive dashboard: a handful of focused reports, each answering one question clearly, rather than one report trying to answer everything at once.

## Dynamic dashboards: one dashboard, different data per viewer

A **dynamic dashboard** runs each component using the *viewing user's* own record access rather than a single fixed "running user," which matters here because Renata's dashboard needs to show org-wide numbers for her, while a Sales Manager viewing a similar dashboard should only see their own team's pipeline. Setting a dashboard to "View dashboard as: the logged-in user running the dashboard" is what makes this work — it respects each viewer's actual sharing and visibility from Lesson 4's security model instead of showing everyone the dashboard's original owner's full access.

## Why this matters for the security model, not just the UI

Because dynamic dashboards run as the viewing user, Chapter 1's security model does real work here too: a Sales Rep who opens a dashboard component backed by the Installation Jobs Matrix report sees only the jobs their own Case-sharing visibility already allows, by the exact same OWD/role-hierarchy/sharing-rule logic from Lesson 4 — the dashboard doesn't bypass or duplicate that logic, it inherits it automatically.

## Subscriptions

Dmitri doesn't want to remember to open the dashboard every morning. A **dashboard subscription** lets a user schedule an automatic email (or in-app notification) with a snapshot of the dashboard — daily, weekly, or on a custom schedule — so the relevant numbers land in his inbox before his first stand-up, without him having to log in and navigate to it.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard component | A chart, gauge, metric, or table on a dashboard, backed by exactly one report |
| Dynamic dashboard | A dashboard that runs each component using the viewing user's own access, not a fixed running user |
| "View dashboard as" | The dashboard setting controlling whose access each component's data reflects |
| Dashboard subscription | A scheduled, automatic snapshot of a dashboard delivered to a user |

## Lab

Build the five-component Executive Dashboard described above in your scratch org, backed by the reports from Lesson 16 (stub any you haven't built yet with simple Tabular reports). Set it to run as "the logged-in user" and subscribe to a daily delivery as if you were Dmitri.

## Check yourself

- If a number on a dashboard component looks wrong, where should you look first, and why?
- What does setting a dashboard to run as "the logged-in user" actually change about what different viewers see?
- Why does Renata's dashboard reflect the same security model from Lesson 4, rather than a separate set of visibility rules?
