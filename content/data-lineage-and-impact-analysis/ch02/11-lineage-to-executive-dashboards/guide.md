# Lesson 11 — Lineage to Executive Dashboards

**Chapter 2 · Tracing Data · Lesson 11 of 25**

## What you'll learn

- How the same dataset → report → dashboard chain from Lesson 10 looks at enterprise scale, in Microsoft Purview
- Why a dashboard is the "visible tip" of a much longer chain most of its viewers never see
- How certification and promotion badges act as a trust shortcut for people who will never open the lineage diagram
- How this closes out Chapter 2, setting up Chapter 3's impact analysis

## A quick recap, then zooming out

Lesson 10 showed lineage view inside a single Power BI workspace, ending at a dashboard card on the right-hand side of the canvas.

![Screenshot of the Power BI lineage view canvas, showing semantic models and dataflows on the left connected by curved lines to reports and a dashboard called Customers360 on the right.](/courses/data-lineage-and-impact-analysis/ch02/11-lineage-to-executive-dashboards/service-data-lineage-view.png)
*The same canvas from Lesson 10 — `Customers360`, top right, is the dashboard. Everything to its left is invisible to whoever just opens that dashboard.*

Most organizations also govern Power BI centrally through **Microsoft Purview**, which scans Power BI tenants and pulls that same lineage — dataset, report, dashboard — into an enterprise-wide catalog alongside every other scanned data source.

![Screenshot of a Microsoft Purview lineage graph showing a SQL Server source feeding a Power BI dataset called Sales health, which feeds a Sales health report, which feeds a Sales health dashboard, with Highly Confidential and Promoted governance badges shown on the dataset.](/courses/data-lineage-and-impact-analysis/ch02/11-lineage-to-executive-dashboards/powerbi-lineage.png)
*The same pattern as Lesson 10, drawn at enterprise scale: a SQL source feeds a dataset, which feeds a report, which feeds the dashboard an executive actually opens — now carrying governance badges directly on the chain.*

Read left to right: `PBIConnectDM` (the underlying SQL source) feeds the `Sales health` Power BI dataset, which feeds the `Sales health` report, which feeds the `Sales health` dashboard — the exact `Dataflow/Dataset → Report → Dashboard` pattern Chapter 2 has been building toward since Lesson 6. The dataset itself carries two governance badges right on the card: **Highly Confidential\Ninja FTE** (a sensitivity label) and **Promoted** (an endorsement status) — the same kind of badges you saw briefly in Power BI's own lineage view in Lesson 10.

## The dashboard is the tip of the chain

Here's the point this lesson exists to make: an executive opening that dashboard every morning sees exactly one box — the rightmost one. They never see `PBIConnectDM`, never see the dataset, never see the report underneath. Every number on their screen is the end of a chain most of its audience doesn't know exists. That's exactly why lineage tooling matters more for dashboards than almost anywhere else in this course: when a number looks wrong on an executive dashboard, the person asking the question has no visibility into the chain at all — someone else has to trace it for them, fast.

## Certification badges: a trust shortcut for people who'll never see the diagram

![Screenshot showing Promoted and Certified labels annotated on two lineage cards — Social info marked Promoted, and Account revenues marked Certified.](/courses/data-lineage-and-impact-analysis/ch02/11-lineage-to-executive-dashboards/service-data-lineage-promoted-certified.png)
*Promoted and Certified are endorsement levels set by content owners — a signal an executive can trust without ever opening the lineage view themselves.*

Not every viewer of a dashboard will trace its lineage, and most shouldn't have to. **Promoted** means a content owner has flagged it as good practice to reuse. **Certified** means it's been through a more rigorous review, typically by a central BI or governance team — the strongest trust signal Power BI itself offers. These badges exist precisely because full lineage tracing doesn't scale to every viewer of every dashboard; certification is lineage's trust compressed into a single glance.

## Closing Chapter 2

Chapters 6 through 11 traced one path end to end: a source system extracted, transformed through ETL or ELT, landed in a lake or warehouse, modeled in a semantic layer, and surfaced through Power BI all the way to a dashboard. You can now follow a number *forward*, from source to screen. Chapter 3 turns that same chain around and asks the harder question: if something upstream changes, what *breaks* — and how do you find out before your executive does?

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview | An enterprise data governance catalog that scans Power BI (and other sources) to surface lineage centrally |
| Dataflow/Dataset → Report → Dashboard | The standard Power BI artifact chain, from data to the final visual surface |
| Promoted | An endorsement level set by a content owner, signaling good practice to reuse |
| Certified | The strongest Power BI endorsement level, typically set after review by a central governance team |

## Lab

Think of one dashboard you or your organization checks regularly. Without opening any lineage tool, write down your best guess at its full chain — source system, transformation, warehouse table, semantic model, report, dashboard. Then, if you have access, open its actual lineage (Power BI's own view, or a catalog like Purview) and compare. Where was your guess wrong, and what would that gap have cost you if you'd had to debug a bad number under pressure?

## Check yourself

Can you explain, without looking back, why an executive dashboard is described in this lesson as "the tip of a chain most of its viewers never see" — and what two things (one enterprise tool, one badge system) exist specifically to make that invisible chain manageable?
