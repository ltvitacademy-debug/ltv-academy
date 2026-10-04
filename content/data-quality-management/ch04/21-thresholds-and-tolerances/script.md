# Lesson 21 — Thresholds and Tolerances · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Every check so far returns every violation, every time. This lesson is
about the question that comes right after: did enough fail to actually
matter?

## S2 · STEPS — Why zero is the wrong target

In a two-million-row table, a handful of violations is often expected
— a few late records, a known upstream gap already being fixed.
Treating every single one as equally urgent either trains people to
ignore the alerts, or burns the team out chasing noise.

## S3 · STEPS — Two shapes of threshold

A hard threshold is a single line — cross it, the check fails. Good
for "too much is always bad," like missing data. A tolerance band is a
range around an expected value — alert outside it, in either
direction. Good for volume checks, where a spike can mean a duplicate
load, same as a drop can mean a missed one.

## S4 · CODE — A hard threshold with HAVING

Take a completeness check and add the threshold right into the query,
with HAVING on the aggregated result. This returns a row only when the
threshold is actually crossed — zero rows back means no alert needed.

## S5 · CODE — A tolerance band check

Same shape, but now a row comes back only when today's count falls
outside the expected band — too high, or too low.

## S6 · STEPS — Where the numbers come from

Three defensible sources for a threshold: a historical baseline, built
from ninety days of real observed behavior. A business SLA, a number
someone already promised. Or a regulatory requirement, a number that
simply isn't negotiable.

## S7 · OUTRO

A threshold with no documented justification is as fragile as a rule
with no owner. Next up: automating quality checks — turning everything
in this chapter into something that runs itself.
