# Lesson 12 — The Instance Health Dashboard

**Chapter 4 · Instance Health & Monitoring · Lesson 12 of 25**

## What you'll learn

- What Instance Health actually tracks, and why it's a different tool from the Slow Request Log
- The real distinction between a per-transaction view and an instance-wide trend view
- The core metrics Instance Health watches over time: response time, transaction volume, and error rate
- Why "is the whole instance getting slower" is a different question from "is this one page slow"
- When to reach for Instance Health instead of chasing one more slow-transaction record

## A different question than Chapter 1 asked

Chapter 1 opened this course with the Slow Request Log — the tool you reach for when one specific
transaction, on one specific page, needs explaining. That log answers "how slow was *this* request,
and where did the time go." It is deliberately narrow: one transaction, one record, one breakdown.
Instance Health asks a completely different question. Instead of "how slow was this one page load,"
it asks "is the instance, as a whole, trending slower over the last week than it was last month."
That's not a question any single slow-transaction record can answer, no matter how many of them you
read one at a time. You need a view that aggregates across the whole instance and tracks it over
time — and that's exactly what Instance Health is built to provide.

## What Instance Health actually tracks

ServiceNow's built-in Instance Health capability monitors instance-wide health metrics continuously,
plotting them over time rather than capturing a single snapshot. The core metrics it watches include
response times across the instance (not one transaction — the aggregate pattern), transaction volume
(how much work the instance is actually processing), and error rates (how often requests are failing
outright, not just running slowly). Watched together and over time, these three tell a story no
single number can: a climbing average response time paired with rising transaction volume might just
mean the business is busier than usual; a climbing response time with flat or falling volume is a
much more concerning signal that something about the platform itself has degraded.

## Trend over time, not a single data point

The defining trait of Instance Health is the time axis. A single response-time number, on its own,
tells you almost nothing — is 800ms good or bad? Instance Health's value comes from comparison: this
week's average against last week's, this month's error rate against last month's, this hour's
transaction volume against the same hour yesterday. That comparison is what turns a number into a
signal. A slow transaction log entry is evidence about one event that already happened. An Instance
Health trend is evidence about a direction the whole instance is moving in — degrading, holding
steady, or improving — which is a fundamentally different kind of question, and one you can only ask
by watching metrics accumulate over days and weeks, not by inspecting any single request.

## Why this distinction actually matters in practice

Mixing these two tools up wastes real diagnostic time. If a user reports one slow incident form, going
straight to Instance Health won't help — it has nothing to say about one specific transaction, because
it isn't built to say anything about one specific transaction. Conversely, if you're trying to answer
"has the instance been getting generally slower since last Tuesday's change," digging through
individual slow-transaction records one at a time is the wrong tool for that job too — you'd be trying
to reconstruct a trend by hand from dozens of isolated snapshots. Knowing which question you're
actually being asked — "why was this one thing slow" versus "is everything trending slower" — is what
tells you which tool to open first, and that choice is the real skill this lesson is teaching.

## Key terms

| Term | Meaning |
|---|---|
| Instance Health | ServiceNow's built-in capability that tracks instance-wide health metrics over time |
| Response time (instance-wide) | The aggregate response-time pattern across the whole instance, not one transaction |
| Transaction volume | How much total work the instance is processing over a given period |
| Error rate | How often requests fail outright, tracked as a trend rather than a single incident |
| Trend | A pattern visible only by comparing a metric across multiple points in time |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: a user says "the instance has felt
sluggish all week." Why is Instance Health the right tool to open first for that complaint, while the
Slow Request Log from Chapter 1 would be the right tool for "this one incident form was slow just
now" — and what's the actual difference in the question each tool is built to answer?
