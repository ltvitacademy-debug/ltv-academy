# Lesson 28 — Real-Time Dashboards · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Real-time dashboards — a fabric item built directly on KQL, no
power BI involved at all.

## S2 · CODE CARD (the dashboard item)

Write a query in a KQL queryset, pin it to a dashboard, and it
becomes a live tile. This one renders trip counts per minute as a
time chart, straight off the raw trip events table.

## S3 · CODE CARD (auto-refresh, base queries, cross-filter)

Every tile can auto-refresh on a timer. Base queries let multiple
tiles share filter logic. And cross-filtering lets clicking one
tile filter the others — all native to KQL, no semantic model
needed.

## S4 · STEPS CARD (vs. Direct Lake)

Real-time dashboards refresh on a simple timer, straight against
the eventhouse. Power BI direct lake, from lesson 12, sits behind
a semantic model with its own refresh trigger. Both skip a
separate copy step — that part's the same.

## S5 · OUTRO CARD

One's built for operational, seconds-old monitoring. The other's
built for business reporting with relationships and measures.
Next up: windowing — how you aggregate a stream that never
actually ends.
