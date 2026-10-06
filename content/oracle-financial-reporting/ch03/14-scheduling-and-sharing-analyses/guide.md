# Scheduling and Sharing Analyses

OTBI is built around interactive, real-time viewing — but not everyone who needs the result is going to open the dashboard themselves. This closing lesson of Chapter 3 covers how analysis and dashboard content gets out to people who aren't sitting in front of it: delivery options, catalog sharing permissions, and where OTBI's reach stops and BI Publisher's scheduling takes over.

## What you'll learn

- Catalog permissions: how sharing an analysis actually works
- Delivery options available directly from OTBI
- Why genuinely unattended, scheduled delivery usually means handing off to BI Publisher
- Printing and exporting a result for a one-time distribution

## Sharing through catalog permissions

The simplest form of "sharing" an analysis or dashboard is moving or copying it from My Folders into a Shared Folder in the Reports and Analytics catalog (lesson 2), where catalog permissions — themselves layered on the function and data security from lesson 4 — determine who can open it. A user with access to that folder and the right duty roles sees it the next time they browse the catalog; nothing needs to be emailed or exported for that basic kind of sharing to work.

## Delivery directly from OTBI

Beyond catalog sharing, OTBI supports exporting the current result of an analysis for one-off distribution — to formats like Excel, PDF, or CSV — so a user can grab a snapshot and send it along outside the system. This covers the "I need this one result right now, in a file I can attach to an email" case well.

Oracle's BI platform (which OTBI runs on) has historically also supported "Agents" — scheduled alerts and deliveries that can email a result on a recurring schedule or when a condition is met. Where this capability is enabled and configured in a given Fusion environment, it functions similarly to a lightweight version of BI Publisher's scheduling. In practice, most Fusion Financials implementations route genuinely recurring, must-arrive-every-period deliveries through BI Publisher instead, specifically because BI Publisher's scheduling, output formatting, and delivery options (covered fully in Chapter 4) are more mature and more commonly supported across environments.

## Why BI Publisher usually wins for true automation

Recall the decision framework from lesson 3: "does this need to run unattended, on a schedule, and land in an inbox automatically?" pointed to BI Publisher, not OTBI. That guidance holds here for a concrete reason: OTBI's strength is interactive, ad hoc exploration of live data by a person actively looking at it; BI Publisher's strength is a precisely defined, repeatable, scheduled job. When a request genuinely needs to be "set it and forget it," rebuilding the same logic as a BI Publisher report (sometimes against the exact same underlying data source) is usually the right move rather than stretching OTBI's lighter delivery options to do a job they weren't primarily built for.

## A practical rule of thumb

- **Someone wants to check this themselves, whenever they like** → share it via the catalog; they open the dashboard.
- **Someone wants one specific result right now, to put in an email or a deck** → export it directly from OTBI.
- **Everyone needs this delivered automatically, every period, without anyone remembering to run it** → build it in BI Publisher instead.

## Recap

OTBI content is shared primarily through catalog permissions, with direct export covering one-off distribution; genuinely unattended, recurring, scheduled delivery is better handled by BI Publisher, which is where Chapter 4 picks up. This closes Chapter 3. Next up, lesson 15: BI Publisher overview.
