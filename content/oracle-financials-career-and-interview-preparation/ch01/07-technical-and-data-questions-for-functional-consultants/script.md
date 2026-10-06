# Lesson 7 — Technical and Data Questions for Functional Consultants · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

You're not interviewing to be a developer, but Financials roles increasingly expect comfort around data. This lesson closes Chapter 1 with exactly that kind of question.

## S2 · STEPS — How technical, really?

Answer precisely. Not a developer, but you've built FBDI loads, written SQL to reconcile subledgers to the GL, and worked with OTBI and BI Publisher. FBDI is batch - prepare a file, load it all at once. A REST API call is real-time, suited to integrating with another live system.

## S3 · CODE — A reconciliation query you should be able to read

This joins a GL balance to the AP subledger's total for the same account and period, and returns only the rows where they don't match - exactly the check that would have flagged the capstone's GRNI mismatch before the CFO's call.

## S4 · STEPS — What to own, what to escalate

Writing new integration code, table structure, performance tuning at scale - that's development work, escalate it. What the data means functionally - why a transaction belongs in a given account, what a status represents - that's exactly what you're expected to own.

## S5 · OUTRO

Practice reading that SQL query out loud in under thirty seconds, in plain English. Chapter 1 is done - next, Chapter 2 starts with turning this knowledge into a resume.
