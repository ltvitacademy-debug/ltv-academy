# Lesson 7 — The Purview Data Map · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Everything in this chapter organizes where things live. This lesson is about what the Data Map itself actually measures — and what it costs.

## S2 · STEPS CARD (one account, one Data Map)

Every Purview account has exactly one Data Map — the metadata foundation for discovery and governance across every connected source. It starts at one capacity unit: 25 operations per second, 10 gigabytes of metadata storage. And it autoscales automatically up to 10 capacity units based on load.

## S3 · SCREENSHOT (data map metrics)

You can watch this happen in real time. The account's Overview page in the Azure portal has a Monitoring section right there — Data Map Capacity Units and Data Map Storage Size, live.

## S4 · STEPS CARD (billing examples)

Billing is hourly, and it's based on whichever need is larger that hour, not an average. Twenty ops per second and 15 gigabytes stored costs 2 capacity units, because storage alone exceeds what 1 CU covers. Push throughput to 250 ops per second, and you're at 10 CUs — throughput alone maxes out the window.

## S5 · SCREENSHOT (metrics blade)

For deeper analysis, Monitoring, then Metrics opens the full Azure Monitor view. Select Data Map Capacity Units or Storage Size — or plot scan outcomes right alongside them, which matters once you get to this chapter's scanning lessons.

## S6 · SCREENSHOT (capacity over time)

Chart capacity usage over time, and what actually matters is sustained peaks near your ceiling — not a single momentary spike.

## S7 · STEPS CARD (six levers)

Six practical ways to keep capacity and cost under control. Scope and stagger your scans. Reduce frequency where your freshness needs allow it. Disable lineage extraction you don't need, and clean up stale historical metadata periodically.

## S8 · OUTRO CARD

Next lesson: registering data sources — giving the Data Map its first real address to actually go scan.
