# X-Ray & Distributed Tracing

Logs Insights can tell you that one checkout request took 4 seconds. It's much weaker at telling you *where* those 4 seconds went — was it the database, the payment gateway, or the service's own code? That's the gap AWS X-Ray fills: distributed tracing that follows one request across every service boundary it crosses and shows exactly how long each hop took.

## What you'll learn

- What a trace, segment, and subsegment are, and how they nest
- How the X-Ray service map visualizes your application's topology from trace data
- How to read a trace timeline to find the hop that's actually slow
- What sampling is, and why X-Ray doesn't trace every single request

## Segments and subsegments

Each service a request passes through records a **segment** — a record of the work that service did, with a start time, end time, and metadata. A segment can contain **subsegments** for finer detail: a checkout service's segment might have a subsegment for "query inventory database" and another for "call payment gateway." Stitched together across every service a request touched, these segments and subsegments form one **trace**.

## The service map: topology from trace data

X-Ray builds a service map automatically from the traces it collects — no separate configuration describing your architecture:

![AWS X-Ray console service map page, showing a graph of connected service nodes with latency and request-volume indicators on each node and edge.](/courses/monitoring-logging-and-observability/ch03/12-x-ray-and-distributed-tracing/xray-service-map.png)
*Each node's color reflects its health — green for successful calls, red for faults, yellow for client errors — built entirely from the traces X-Ray has already collected.*
Source: [Using the X-Ray trace map — AWS Documentation](https://docs.aws.amazon.com/xray/latest/devguide/xray-console-servicemap.html)

This is conceptually the same idea as Azure's Application Map from Chapter 2 — a topology diagram built from real traffic, not from a diagram someone drew by hand — just AWS's version of it.

## Reading a trace timeline

Clicking into one specific trace shows a timeline of every segment and subsegment that request touched, stacked to show how they overlapped or waited on each other:

![AWS X-Ray trace details view, showing a timeline with multiple segments and subsegments stacked beneath a trace map, each bar labeled with its duration.](/courses/monitoring-logging-and-observability/ch03/12-x-ray-and-distributed-tracing/xray-trace-details.png)
*The widest bar is where the time actually went — here you'd look for which segment dominates the checkout request's total duration.*
Source: [Viewing traces and trace details — AWS Documentation](https://docs.aws.amazon.com/xray/latest/devguide/xray-console-traces.html)

If Northbridge's checkout request took 4 seconds and the timeline shows the "call payment gateway" subsegment alone took 3.8 of those seconds, you've found your answer without touching a log line.

## Sampling: why X-Ray doesn't trace everything

Tracing every single request in a high-traffic service like checkout would be expensive to store and process, and mostly redundant — thousands of successful, fast requests look identical. X-Ray uses **sampling rules** to trace a representative subset (the default rule traces the first request each second, plus 5% of any additional requests), while still capturing enough to catch patterns. Sampling rules are configurable, so you can, for example, always trace requests that return an error, regardless of the sampling rate applied to successful ones.

## Key terms

- **Segment** — one service's record of the work it did for a request, within a trace
- **Subsegment** — a finer-grained breakdown within a segment, e.g. one downstream call
- **Trace** — the full set of segments and subsegments for one request, stitched across every service it touched
- **Service map** — a topology diagram built automatically from trace data, colored by health
- **Sampling rule** — the configuration controlling what percentage of requests X-Ray actually traces
