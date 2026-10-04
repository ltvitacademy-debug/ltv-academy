# Lesson 23 — Root Cause Analysis · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter five moves from finding problems to fixing them for good. Lesson twenty-three is root cause analysis — the difference between cleaning up bad data and stopping it from happening again.

## S2 · STEPS — SYMPTOM VS ROOT CAUSE

A rule flags four thousand null emails. Cleaning those rows fixes the symptom. Next week there are four thousand more, because whatever produced them is still running. A root cause is the upstream reason the symptom exists at all.

## S3 · STEPS — FOUR CAUSE CATEGORIES

Root causes almost always sort into one of four buckets: people — missing training or unclear ownership; process — no validation step; technology — a form or job with no safeguard; or source data — the system of record itself was built poorly.

## S4 · STEPS — THE 5 WHYS

Five Whys just means asking "why" repeatedly until you hit something fundamental — usually around five times. Null emails: the form didn't require it. Why wasn't it required? Nobody updated the form when a new downstream requirement appeared. That's the real fix.

## S5 · CODE — GROUP BY TO FIND THE DRIVER

Profiling and rule-check data you already have is root-cause evidence. Group a rule's failures by source system, channel, or date, and the cause often jumps out — here, almost every null email traces back to one specific intake channel.

## S6 · STEPS — FROM CAUSE TO ACTION

A finished root cause analysis produces three things: the cause, stated specifically; a fix for the cause, usually owned by another team; and a decision on the existing backlog of bad rows — cleanse them, or document and exclude them.

## S7 · OUTRO

Next lesson takes that backlog decision and runs with it — Lesson twenty-four, data cleansing and standardization.
