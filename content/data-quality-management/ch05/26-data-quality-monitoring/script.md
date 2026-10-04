# Lesson 26 — Data Quality Monitoring · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson twenty-six turns the rule checks from Chapter four into something that runs on its own, on a schedule, and tells someone the moment something breaks.

## S2 · STEPS — FROM CHECKS TO MONITORING

A rule check answers "is this data bad right now." Monitoring answers that same question continuously, on a schedule, comparing each result to an expected range — and alerting the moment it falls outside it.

## S3 · STEPS — THREE THINGS TO MONITOR

Three things worth monitoring: data quality metrics, the pass rate of your rules over time; pipeline health, did the load job even run on schedule; and drift — a metric quietly getting worse without crossing a hard threshold yet.

## S4 · CODE — LOGGING A CHECK OVER TIME

The SQL barely changes — what changes is what happens around it. Log the same completeness check with a timestamp every time it runs, and that one row becomes a trend line instead of a single pass or fail.

## S5 · STEPS — WHAT MAKES A GOOD ALERT

A monitor that fires on every tiny fluctuation gets ignored within a month. A good alert uses an agreed threshold, not noise; routes to an actual owner; explains what broke; and distinguishes a warning from a hard breach.

## S6 · STEPS — WHERE MONITORING FEEDS NEXT

Monitoring isn't the end of the line. The pass-rate history it builds is exactly what a scorecard visualizes, and every unresolved alert is a candidate to become a tracked issue.

## S7 · OUTRO

Next lesson is where that history gets visualized — Lesson twenty-seven, data quality scorecards and dashboards.
