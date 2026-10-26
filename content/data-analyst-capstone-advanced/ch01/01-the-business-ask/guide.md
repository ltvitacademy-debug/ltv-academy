# Lesson 1 — The Business Ask: Three Audiences, One Quarter

**Chapter 1 · Scoping the Quarterly Business Review Package · Lesson 1 of 26**

## What you'll learn

- The business scenario this capstone runs start to finish: Thornbury Cycle
  Supply Co.'s Quarterly Business Review (QBR) package
- Why one request actually breaks into **three different deliverables**,
  for three audiences, in three different tools
- Why "one warehouse feeds all three" is the real architectural decision
  this capstone is built around — not a detail, the point
- What "real analyst work" looks like once the request leaves the comfort
  of a single dashboard

## The company

Thornbury Cycle Supply Co. is a mid-size reseller of Adventure Works
Cycles products — the same fictional business this career path's
Beginner and Intermediate capstones already built reporting for. Its
order data lives in **AdventureWorks2012**, the real Microsoft sample
OLTP database: `Sales.SalesOrderHeader`, `Sales.SalesOrderDetail`,
`Production.Product`, and the territory and customer tables that go
with them. Nothing in this capstone is invented data — every number
you'll produce traces back to real rows in that database.

## The request

Thornbury's leadership wants a **Quarterly Business Review (QBR)
package** — and when you sit down with the stakeholder who asked for
it, "a QBR package" turns out to mean three separate things to three
separate people:

| Audience | What they actually want | Why |
|---|---|---|
| **Executives** | An interactive Power BI dashboard they can click into during the quarterly meeting | They want to drill from "sales were down" to "sales were down *in the Pacific territory*" live, in the room |
| **The Board** | A polished Tableau deck | The board is a mix of internal and external members; Tableau's dashboards are built to be presented and screenshotted, not clicked through live by a novice |
| **Finance** | An Excel workbook | Finance doesn't want a BI tool at all — they want numbers they can pull apart, re-sum, and sanity-check with their own formulas before they sign off on anything |

Three audiences, three tools, three genuinely different jobs-to-be-done.
A dashboard that satisfies an executive in a live meeting is the wrong
deliverable for a finance team that wants to audit a total with
`SUMIFS`. This is not a case where one output can be screenshotted
three different ways — each audience needs its own, real artifact.

## Why this is normal, not a scope-creep problem

It's tempting to read "three tools" as the request ballooning out of
control. In a real BI role, it's the opposite: this is one of the most
common shapes a senior analyst's work actually takes. The business
doesn't organize itself around your tooling preferences — it organizes
itself around *who's in the room*, and each room has different norms
for how it wants to consume numbers. Handling that well, instead of
forcing every audience into one tool because it's less work for you,
is a meaningful part of what separates a senior analyst from a junior
one.

## The one thing that keeps this sane: one source of truth

Three front-ends built independently, each querying its own copy of
"the data," is a quiet disaster waiting to happen — and you'll watch it
happen, on purpose, later in this capstone. The only way to build three
deliverables that **agree with each other** is to build them all on top
of the exact same underlying numbers. That means:

1. One warehouse — a new `dw.*` schema, built with real T-SQL, that
   sits between the raw OLTP tables and every reporting tool
2. One automated validation layer underneath it (built in Python),
   catching data-quality problems before any of the three front-ends
   ever see them
3. Three independent front-ends — Power BI, Tableau, and Excel — all
   reading from that same warehouse, never from each other

That's the architecture this entire capstone builds, chapter by
chapter. Lesson 2 turns this plain-English plan into the actual pieces
you're going to build.

## Key terms

| Term | Meaning |
|---|---|
| QBR (Quarterly Business Review) | A recurring business meeting where leadership reviews the quarter's performance, typically needing fresh reporting each cycle |
| Source of truth | The single underlying dataset every downstream report is required to agree with |
| Front-end | A reporting tool (Power BI, Tableau, Excel) that *reads* a shared warehouse, rather than owning its own copy of the data |

## Lab

1. In SSMS, connect to `AdventureWorks2012` and run
   `SELECT COUNT(*) FROM Sales.SalesOrderDetail;` — this is the real
   order-line volume every deliverable in this capstone will ultimately
   summarize three different ways.
2. Write one sentence for each of the three audiences (Executives,
   Board, Finance) explaining *in your own words* why their tool
   choice fits how they actually consume numbers.
3. List the three front-end tools and the one thing they're all
   required to share. You'll need this list again at the end of nearly
   every remaining lesson in this capstone.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking, why
this capstone builds three deliverables instead of one, and why
building them all on top of one shared warehouse is the decision that
keeps them from quietly disagreeing with each other later.
