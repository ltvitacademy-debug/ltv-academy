# Business Analytics Case Study

**Chapter 4 · Business Analytics · Lesson 21 of 22**

Time to put Chapters 1 through 4 together on one problem, start to finish. Meet **Meridian Outdoor Supply**, a fictional mid-size retailer of camping and outdoor gear, selling through both a direct sales team (wholesale to outdoor shops) and a support team (warranty claims and order issues). Their VP of Sales and Director of Support each came to the admin team with a complaint. This lesson walks through diagnosing and solving both with reports and dashboards alone.

## What you'll learn

- How to translate a vague business complaint into a specific report
- Choosing report type, format, and grouping to match the actual question
- Combining reports from two different objects into one leadership dashboard
- Where folder sharing and dynamic dashboards solve a real distribution problem

## The complaint: "Our pipeline looks fine, but we keep missing the number"

Meridian's VP of Sales had one pipeline dashboard, showing total open pipeline at a healthy $4.2M against a $1M quarterly quota — more than 3x coverage, which should be comfortable. But the team was still missing its number quarter after quarter.

**Diagnosis:** The existing dashboard had exactly one widget — total pipeline — and nothing else. Building a **days-in-stage** report (Lesson 19) revealed the real problem: 40% of that $4.2M had been sitting in "Proposal" for over 60 days, well past Meridian's typical 21-day proposal-to-close cycle. The pipeline wasn't thin — it was stale. Total value alone had been hiding exactly the thing that mattered.

**Fix:** A new widget — a table of deals with Days in Current Stage greater than 45 — was added next to the existing total. The VP could now see coverage *and* staleness on one screen, and started running a weekly "stale pipeline" review using that exact table.

## The complaint: "Support says they're fast, but customers are still unhappy"

Meridian's Director of Support had a dashboard showing average resolution time at 18 hours — comfortably under their 24-hour target. Satisfaction scores, however, kept slipping.

**Diagnosis:** The 18-hour average was being pulled down by a large volume of simple, fast cases (password resets, order-status checks) that resolved in minutes. A small number of complex warranty claims — the cases customers actually remembered and rated — were taking 4-5 days, invisible inside a single blended average (Lesson 20's point about volume alone hiding real problems, applied here to averages instead).

**Fix:** The resolution-time report was rebuilt as a Matrix, grouped by **Case Type** in addition to the existing date grouping, splitting "Account Admin" (fast, high-volume) from "Warranty Claim" (slow, high-impact) instead of blending them into one number.

## Pulling it together: one dashboard, two audiences

Both fixes needed to reach different people without building two separate dashboards per team. The solution used tools from Chapter 3 directly: a shared **Leadership Overview** folder (Lesson 10) holding both the pipeline-staleness and case-type-split components, and a **dynamic dashboard** (Lesson 17) so the VP of Sales sees their own team's numbers and the Director of Support sees theirs, from the one dashboard definition.

## Recap

- A vague complaint ("we keep missing the number") usually points to a report that's answering the wrong question, not a data problem.
- Averages and simple totals routinely hide the real story — stale pipeline, blended resolution times.
- The fix is almost always: a more specific grouping, or a second widget that surfaces what the first one hid.
- Folder sharing and dynamic dashboards let one build serve multiple audiences without duplication.

## Check yourself

Meridian's Director of Support wants a single resolution-time number that doesn't mislead leadership the way the blended 18-hour average did, without losing the ability to see the overall trend. What report change from this case study solves that, specifically?
