# Lesson 29 — Data Quality Case Study: Customer Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter six applies this whole course to realistic, connected problems. Lesson twenty-nine is a customer data case study — fictional company, real pattern.

## S2 · STEPS — THE SETUP

Northfield Outfitters is a fictional retailer whose e-commerce and in-store systems both feed a shared customer table. Marketing just asked why the loyalty program shows one-point-four million members against roughly six hundred thousand real households.

## S3 · STEPS — PROFILING FINDS THE SHAPE

Row count versus expectation is the first signal. Uniqueness profiling shows thirty-five percent of emails repeating. Pattern profiling shows the same person twice — one row per source system, differing only in name formatting.

## S4 · STEPS — DIAGNOSIS

Three dimensions, together: uniqueness, one customer represented as multiple rows; consistency, name formatting differs by system; completeness, in-store rows are missing email because checkout never required it.

## S5 · STEPS — REMEDIATION

The fix works at two levels: an immediate deduplication pass matching records on name and phone, merging loyalty points into one survivor record — and a rewrite of the nightly load to upsert against a new cross-system match key, so duplicates stop recurring.

## S6 · STEPS — MONITORING AND THE RESULT

A monitor tracks the duplicate rate daily, surfaced on a scorecard. After the fix, the customer table drops from one-point-four million rows to about six hundred forty thousand — and stays there, because the root cause, not just the symptom, got fixed.

## S7 · OUTRO

Next lesson closes out the course with a second case study, in financial data — Lesson thirty.
