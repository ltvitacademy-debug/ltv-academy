# Script — Building a Monitoring Baseline

## Segment 1 (title)

Lesson 3 had you gather one performance baseline — a single recorded snapshot of normal. That's not enough for real production monitoring. This lesson turns it into a repeating practice: an automated capture that builds a real historical record.

## Segment 2 (code: one snapshot isn't a baseline)

A monitoring baseline snapshots key metrics on a schedule — wait stats, Page Life Expectancy, batch requests per second — and stores every reading in a permanent table. Cumulative counters like wait stats have to be diffed between snapshots; the raw total by itself means nothing.

## Segment 3 (steps: capture, store, compare)

The pattern is three steps: capture those metrics on a fixed schedule, store each snapshot in a permanent history table instead of just eyeballing a DMV, and compare new readings against that real historical range instead of a single point-in-time number.

## Segment 4 (outro)

Weeks of stored snapshots turn into an actual answer for what's normal at 2 AM versus 2 PM on a Monday. Next up: turning that history into a warning system that tells you when something has actually degraded.
