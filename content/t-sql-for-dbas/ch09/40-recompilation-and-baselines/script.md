# Script — Recompilation & Performance Baselines

## Segment 1 (title)

Chapter 9 closes on the question underneath every it got slower complaint: slower compared to what? Without a recorded baseline, that claim is unprovable — this lesson builds the habit and the T-SQL that makes it provable.

## Segment 2 (code: detecting recompilation)

Sys.dm_exec_query_stats includes plan_generation_num, a counter that increments every time a specific plan recompiles. A high number for a query that should be stable is worth investigating — common triggers are frequent statistics updates, schema changes, or sp_recompile.

## Segment 3 (steps: recompiling vs. excessive recompiling)

Recompilation isn't automatically bad. A fresh plan based on current statistics is sometimes exactly what's needed — that's literally what option recompile deliberately forces to fix parameter sniffing. The real problem is excessive, unplanned recompilation burning CPU for no benefit.

## Segment 4 (code: capturing a real baseline)

It got slower is only provable with a recorded number from before. Capturing the same metrics on a schedule and keeping history — the same pattern as capacity monitoring — turns a feeling into an answerable question: pull last month's row and compare directly.

## Segment 5 (outro)

Without that recorded row, there's nothing to compare against. That closes Chapter 9. Next up: Chapter 10, Build Your DBA Toolkit, starting with the toolkit concept — reusable, reliable, documented scripts.
