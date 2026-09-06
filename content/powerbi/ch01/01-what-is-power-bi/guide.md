# Lesson 1 — What Is Power BI?

**Chapter 1 · Power BI Fundamentals · Lesson 1 of 5**

## What you'll learn

- What Power BI is and the problem it solves
- The three components: Desktop, service, and Mobile — and which does what
- The three building blocks: semantic models, reports, and dashboards
- The five-step Power BI workflow that structures this entire course
- Where Power BI sits inside Microsoft Fabric

## The problem Power BI solves

Every business generates data — sales rows, support tickets, payroll, inventory,
web traffic. Most of it sits in spreadsheets and databases where nobody can see
a pattern. The gap between "we have the data" and "we understand the data" is
where analysts and BI developers earn their living.

Power BI is Microsoft's platform for closing that gap. It connects to data
wherever it lives, reshapes it into a clean model, and presents it as
interactive reports and dashboards that update as the data changes. Because it
speaks Excel's language (and shares its Power Query engine), it has become the
most widely adopted BI tool in the corporate world — which is exactly why it's
worth your study time.

## The three components

| Component | What it is | What you do with it |
|---|---|---|
| **Power BI Desktop** | Free Windows application | Connect, clean, model data; design reports |
| **Power BI service** | Cloud platform (app.powerbi.com) | Publish, share, collaborate, schedule refresh |
| **Power BI Mobile** | Phone/tablet apps | Consume reports and dashboards anywhere |

The rhythm of real work: **build in Desktop → publish to the service → consume
in a browser or on mobile.**

Two facts worth internalizing early:

1. **Desktop is genuinely free and fully featured.** Licensing costs enter the
   picture only when you *share* through the service (covered in Chapter 9).
2. **Desktop and the service are not interchangeable.** Deep modeling and
   report design happen in Desktop. Sharing, permissions, apps, scheduled
   refresh, and dashboards live in the service.

## The three building blocks

- **Semantic model** — your prepared, related data published as a reusable
  source of truth. One model can feed many reports.
- **Report** — one or more interactive pages of visuals built on a single
  semantic model. Reports are where exploration happens: filtering,
  cross-highlighting, drilling down.
- **Dashboard** — a single screen of tiles pinned from one *or many* reports,
  assembled in the service. Dashboards are for monitoring; reports are for
  exploring.

## The five-step workflow

Everything you will ever do in Power BI is one of these five steps:

1. **Get** — connect to Excel, CSV, SQL, web APIs, cloud services (Chapter 2)
2. **Transform** — clean and reshape with Power Query (Chapter 3)
3. **Model** — relate tables in a star schema, write DAX (Chapters 4–6)
4. **Visualize** — build report pages that tell the story (Chapters 7–8)
5. **Publish** — share securely through the service (Chapters 9–11)

This course's chapter order *is* this workflow. When you feel lost later, come
back to this list and find which step you're on.

## Power BI and Microsoft Fabric

Since 2023, Power BI has been one workload inside **Microsoft Fabric**,
Microsoft's umbrella analytics platform (data engineering, warehousing, real-time
analytics, and BI on a shared foundation called OneLake). What this means for
you now: nothing changes in how you build, your Power BI skills transfer
directly, and some licensing/administration vocabulary you'll meet in Chapter 9
is Fabric vocabulary. We'll flag it when it matters.

## Key terms

| Term | Meaning |
|---|---|
| BI (Business Intelligence) | Turning raw data into information people can act on |
| Semantic model | Published, reusable prepared data (formerly "dataset") |
| Report | Interactive visual pages built on one model |
| Dashboard | One screen of pinned tiles from one or more reports |
| Power Query | The data-connection and cleaning engine (Chapter 3) |
| DAX | The formula language for calculations (Chapter 5) |
| Microsoft Fabric | The umbrella analytics platform Power BI belongs to |

## Lab

1. Visit the Power BI Desktop download page (search "Download Power BI Desktop")
   and identify the two install options offered (Microsoft Store vs. installer).
   Don't install yet — that's Lesson 2, where we do it together.
2. Open app.powerbi.com in a browser and note what you can see without signing in.
3. Write down three data sources your current (or target) workplace uses that
   you'd want to connect to Power BI. Keep this list — we'll use it in Chapter 2.

## Check yourself

You're ready for Lesson 2 when you can answer, without looking:
which component do you build reports in, which do you share them from,
and what are the five steps of the workflow?
