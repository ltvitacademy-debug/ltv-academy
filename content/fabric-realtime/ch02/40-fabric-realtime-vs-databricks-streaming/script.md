# Lesson 40 — Comparing Fabric Real-Time to Databricks Structured Streaming · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Comparing fabric real-time to databricks structured streaming —
the same problems, two different engines.

## S2 · CODE CARD (the concept map)

Eventstream versus read stream. KQL database versus delta tables.
Window nodes versus group by window. Watermark settings versus
with watermark. Every row here solves the identical underlying
problem.

## S3 · CODE CARD (the real difference)

The real difference is no-code versus code-first. Fabric's canvas
is configured through a UI. Databricks is PySpark, written and
version-controlled like any other program. Neither is simply
better.

## S4 · STEPS CARD (choosing between them)

Choose fabric if you're already using no-code tools and want
something running fast. Choose databricks for existing PySpark
skills or complex custom logic. Many real teams actually use both
together.

## S5 · OUTRO CARD

Same vocabulary, same computer science, different tradeoffs. Next
up: putting the whole chapter together — a real-time NYC taxi
dashboard, start to finish.
