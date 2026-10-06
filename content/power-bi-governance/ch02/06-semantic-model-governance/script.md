# Lesson 6 — Semantic Model Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Semantic model governance opens chapter two — the settings that keep the asset underneath every report trustworthy.

## S2 · STEPS — Why the semantic model matters most

A single semantic model can feed dozens of downstream reports. That's exactly why governance concentrates here: row-level security, object-level security, sensitivity labels, and refresh all live on the model, not on any individual report built from it. And it cuts both ways — a broken or stale model breaks every report built on top of it at once. One owner, a very wide blast radius.

## S3 · SCREENSHOT — The settings entry point

From a semantic model's own page, the Refresh menu is where scheduling, refresh history, and on-demand refresh all live.

## S4 · SCREENSHOT — Scheduling, time zone, and failure alerts

The full settings pane covers refresh frequency, time slots, and exactly who gets notified when a refresh fails. A manual refresh and the refresh history link both sit near the top, outside the schedule itself — useful any time you need an answer right now instead of waiting for the next scheduled run.

## S5 · STEPS — What else lives in Settings

The same settings pane holds more than refresh. Sensitivity label — classification, covered in depth in Lesson 10. Endorsement — Promoted and Certified status, covered later in this course. And sharing, access, and data access — permissions and RLS roles, covered in Lessons 7 and 9.

## S6 · SCREENSHOT — Gateway connection

On-premises and cloud-only sources behave differently here. A gateway is optional for a model whose data sources are entirely in the cloud, but required the moment any source lives on-premises.

## S7 · SCREENSHOT — Data source credentials

Credentials get entered once and retained with the model. The catch: if a password changes upstream, refresh starts failing silently until someone notices and updates the credentials here.

## S8 · STEPS — A governance checklist

Before calling a semantic model production-ready, check three things. Refresh schedule set — and refresh history actually checked, not just configured once and forgotten. Credentials current, with someone who owns updating them when a password rotates. And owner and sensitivity label set, before anyone downstream builds a report on it.

## S9 · OUTRO

Next lesson: row-level security — filtering which rows a role can actually see.
