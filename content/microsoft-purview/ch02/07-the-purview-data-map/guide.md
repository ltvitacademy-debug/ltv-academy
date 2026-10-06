# Lesson 7 — The Purview Data Map

**Chapter 2 · The Data Map · Lesson 7 of 35**

## What you'll learn

- What the Data Map actually is: the foundation for discovery and governance across every Purview solution
- The two things a capacity unit (CU) measures, and what "elastic" autoscaling really means
- How Data Map billing is calculated, hour by hour, with a worked example
- Where to go in the Azure portal to watch your own Data Map's capacity and storage in real time
- Practical levers for keeping capacity — and cost — under control

## The foundation everything else sits on

The Microsoft Purview **Data Map** is the foundation for data discovery and governance in Purview. It captures metadata about data across analytics systems, SaaS applications, and operational systems, whether they live on-premises, in one cloud, or across several — and it stays current through built-in scanning and classification. Every Microsoft Purview account has exactly one Data Map, and it starts at one capacity unit and scales from there based on how much you put into it and how hard you query it.

Everything you've learned so far in this chapter — domains, collections, roles — organizes *where* things live in the Data Map. This lesson is about what the Data Map itself actually measures and costs.

## Capacity units: two things, one number

A **capacity unit (CU)** bundles two separate resources into one billable number:

- **Operation throughput** — create, read, write, update, and delete operations against Data Map metadata (creating an asset, adding a lineage relationship, editing a description, running a search that returns results)
- **Metadata storage** — the technical, business, operational, and semantic metadata the Data Map holds

Each capacity unit buys you **25 operations per second and 10 GB of metadata storage** — and critically, those two numbers scale together. You can't buy extra storage without extra throughput capacity, or vice versa; whichever one you need more of in a given hour determines how many CUs you're billed for.

| Capacity units | Operations/second | Storage (GB) |
|---|---|---|
| 1 | 25 | 10 |
| 2 | 50 | 20 |
| 5 | 125 | 50 |
| 10 | 250 | 100 |

By default, a new account starts at 1 CU and **autoscales automatically up to 10 CUs** based on load — that's the "elastic" in Elastic Data Map. Going beyond 10 requires a support-ticket quota increase.

## How billing actually works

Billing is calculated **hourly**, and for each hour, Microsoft Purview looks at whichever need was larger that hour — throughput or storage — and bills for the capacity units that covers the larger one, with a one-CU minimum:

- 20 ops/sec and 1 GB stored in an hour → 1 CU (both needs fit inside CU 1)
- 20 ops/sec and 15 GB stored → 2 CUs (storage alone pushes you past CU 1's 10 GB)
- 50 ops/sec and 15 GB stored → 2 CUs (throughput now needs 2 CUs; storage still fits)
- 250 ops/sec and 15 GB stored → 10 CUs (throughput alone maxes out the elasticity window)

Over a six-hour window with changing load, you're billed CU-hours — add up the maximum CU needed in each individual hour, not an average across the whole window. A realistic six-hour example in Microsoft's own documentation comes out to 22 total capacity-unit hours (1+3+4+5+6+3across six separate hours) — a useful reminder that one spiky hour can cost more than several quiet ones combined.

## Watching it happen

You don't have to guess at your own usage. The Purview account's **Overview** page in the Azure portal has a Monitoring section showing both metrics at a glance:

![Screenshot of the ContosoPurview account Overview page in the Azure portal, with the Monitoring section showing Data Map Capacity Units and Data Map Storage Size line charts for the last day.](/courses/microsoft-purview/ch02/07-the-purview-data-map/data-map-metrics.png)
*The account Overview page: Data Map Capacity Units and Data Map Storage Size, right alongside Open governance portal and Manage users.*

For deeper analysis, **Monitoring → Metrics** opens the full Azure Monitor experience, where you can select either metric, change the aggregation, and plot multiple metrics or scan outcomes (Scan Completed, Scan Failed, Scan Cancelled) on the same chart:

![Screenshot of the Azure Monitor Metrics page for a Purview account, with a dropdown showing selectable metrics: Data Map Capacity Units, Data Map Storage Size, Scan Cancelled, Scan Completed, Scan Failed, and Scan time taken.](/courses/microsoft-purview/ch02/07-the-purview-data-map/elastic-data-map-metrics.png)
*The full Metrics blade — note that scan outcome metrics live right alongside the two Data Map capacity metrics, foreshadowing Chapter 2's later lessons on scanning.*

You can change the time range from the default last-24-hours view to compare usage over days or weeks:

![Screenshot comparing two Data Map Capacity Units charts side by side, both showing the metric peaking around 9-11 capacity units over roughly a day of usage.](/courses/microsoft-purview/ch02/07-the-purview-data-map/data-map-capacity-default.png)
*Capacity unit usage charted over time — watch for sustained peaks near your ceiling, not just momentary spikes.*

## Keeping capacity (and cost) under control

A handful of practical habits go a long way, straight from Microsoft's own optimization guidance:

- Run **incremental scans** after the first full scan — they only process what changed
- **Scope scans** to what you actually need, using Advanced mode to include/exclude specific paths
- **Stagger scan schedules** rather than running several at once
- **Reduce scan frequency** where your freshness requirement allows it (daily instead of hourly, for example)
- **Disable lineage extraction** when you don't need it
- Periodically **clean up historical lineage and stale metadata**

Several of these — scan scope, scan frequency, lineage extraction — are exactly what the next few lessons in this chapter teach you to configure directly.

## Key terms

| Term | Meaning |
|---|---|
| Data Map | Purview's metadata foundation: discovery and governance across every connected source |
| Capacity unit (CU) | The Data Map's billing unit: 25 ops/sec + 10 GB metadata storage, bundled together |
| Elastic Data Map | Autoscaling from 1 to 10 CUs automatically based on load |
| Operation throughput | Create/read/write/update/delete actions against Data Map metadata, measured per second |

## Lab

Using the billing table above, work out how many capacity units an hour with 75 ops/sec and 22 GB of storage would cost. Show which of the two factors (throughput or storage) determines the answer, and why.

## Check yourself

What two separate things does a single capacity unit actually measure, and what determines how many CUs get billed in any given hour — the average load, or something else?
