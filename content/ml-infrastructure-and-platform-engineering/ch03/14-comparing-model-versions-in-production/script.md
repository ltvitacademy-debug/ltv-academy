# Script — Comparing Model Versions in Production

## Segment 1 (title)

A new model version that beats the old one offline is a candidate, not a verdict. This lesson covers how teams actually decide whether a challenger replaces a champion — comparing runs with real tooling, and rolling a challenger out carefully enough that a bad decision doesn't take down production.

## Segment 2 (code)

Before anything touches real traffic, a challenger has to beat the champion on the exact same fixed holdout set. Search_runs turns that into a query — a DataFrame you can sort by validation AUC — instead of ten browser tabs open side by side.

## Segment 3 (screenshot)

The tracking UI gives you the same comparison visually. Every column in the run list is sortable, so ranking candidates by a metric is a click, not a spreadsheet export.

## Segment 4 (screenshot)

Switching to chart view and selecting several runs plots their metrics together, so a trend across candidates is something you can actually see, not just read off as isolated numbers.

## Segment 5 (steps)

Beating a holdout set isn't enough on its own — offline sets go stale. Shadow deployment lets a challenger see real production traffic and make real predictions that get logged but never served, so you find out how it behaves live with zero user-facing risk. Canary rollout is the next step after that: a small, gradually growing slice of real traffic where its predictions actually count.

## Segment 6 (code)

Only after clearing all three stages does a challenger actually get promoted — and that promotion is deliberately a single line, reassigning the champion alias to the new version. All the real risk lives in the comparisons before this moment, not in the moment itself.

## Segment 7 (outro)

That closes out chapter three — tracking, registries, versioning, lineage, and now promotion, all tied together. Next, lesson fifteen opens chapter four by looking at the frameworks that automate training itself.
