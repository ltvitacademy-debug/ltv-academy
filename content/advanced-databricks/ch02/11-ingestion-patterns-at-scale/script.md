# Script — Ingestion Patterns at Scale

## Segment 1 (title)

A real production landing zone rarely has just one source. This lesson is Chapter Two's honest close: fanning in multiple streams, real checkpoint discipline, and the trade-off between one big stream and many small ones.

## Segment 2 (code: fanning in)

One Auto Loader stream per source table, each with its own schema location and checkpoint, running independently — Lesson 10's continuous single-stream example scaled out to a whole bronze layer instead of one table.

## Segment 3 (code: checkpoint discipline)

Lesson 4 already covered putting a checkpoint inside a governed volume. At a dozen streams, the real discipline is naming them predictably — losing track of which checkpoint belongs to which stream can double-process data or silently stop ingesting a table.

## Segment 4 (steps: the real trade-off)

One multiplexed stream means fewer jobs to manage, but one bad file can stall every table at once. Many small streams mean real fault isolation, at the real cost of more jobs running and monitoring.

## Segment 5 (outro)

There's no universally right ingestion topology — only trade-offs, sized to how many sources exist and how independently they fail. Chapter Two's done. Chapter Three: Lakeflow and declarative pipelines.
