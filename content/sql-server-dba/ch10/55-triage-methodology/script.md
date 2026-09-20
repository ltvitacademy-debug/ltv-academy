# Script — Triage Methodology

## Segment 1 (title)

This chapter moves from planned change to unplanned trouble. DBAs who handle incidents well follow a rough sequence first — skipping it turns a bad ten minutes into a bad two hours.

## Segment 2 (code: Confirm and assess)

First, confirm the problem is actually real and matches what's reported — chasing a phantom problem wastes the first few minutes, when the real cause is often still visible. Then assess blast radius and severity: how bad is this, and for whom, before asking why.

## Segment 3 (steps: Stabilize, then communicate)

Stabilize before you root-cause — killing a runaway query or freeing tempdb space fixes the symptom before you know the exact cause. And communicate status the whole time in parallel, not as a step that waits until the incident is resolved.

## Segment 4 (outro)

Those four steps apply to whatever actually goes wrong. Next up: common production issues — the recurring incidents every DBA eventually sees.
