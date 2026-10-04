# Lesson 5 — The Data Quality Lifecycle · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Everything we've covered so far — the definition, the six dimensions, the cost, who's responsible — comes together into one repeatable cycle. Data quality isn't a project with an end date. It's a loop.

## S2 · STEPS — Five stages

The loop has five stages. Profile: find out what's actually in the data before judging it — that's all of Chapter 2, starting next lesson. Define: turn findings into explicit, testable rules — Chapter 4. Measure: run those rules repeatedly and track results over time, not just once. Remediate: fix what measurement finds, and trace the root cause. Monitor: keep watching continuously, so the next problem gets caught early instead of becoming a business incident.

## S3 · STEPS — The shortcut that backfires

The most common mistake is skipping straight to "define" — writing rules from assumption instead of from what the data actually contains. A rule assuming every phone number is 10 digits fails instantly against real international numbers, because nobody profiled the column first. Profiling isn't optional — it's the stage that keeps every later stage honest.

## S4 · STEPS — It's a loop, not a finish line

After remediation and monitoring, new data keeps arriving — a new source system, a new field, a changed business rule. That resets the loop: profile again, define again, measure again. Teams that treat this as a one-time cleanup are describing a single trip around the loop. Teams that treat it as a discipline run it continuously.

## S5 · OUTRO

Profile, define, measure, remediate, monitor — five stages, one continuous loop, and the rest of this course is organized around teaching you each one. Next up: Chapter 2 starts with profiling, hands-on, in SQL Server Management Studio.
