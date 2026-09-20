# Script — Alerting on Performance Degradation

## Segment 1 (title)

The last lesson built a monitoring baseline — a growing history table of key metrics. A history table nobody looks at isn't useful by itself. This lesson turns that stored history into an actual warning system that tells you when something's degraded.

## Segment 2 (code: two real alerting mechanisms)

SQL Server gives you two real mechanisms. Agent performance condition alerts fire on a fixed threshold, like Page Life Expectancy falling below 300 — simple, but the same number for every server. A baseline-comparison job instead checks your own history table and alerts on a real deviation, notifying an operator through Database Mail.

## Segment 3 (steps: trigger, notify, act)

The pattern is three steps: define the trigger — a fixed threshold or a deviation from your baseline history — notify an actual operator so a person sees it, and tune the sensitivity so the alert doesn't fire so often it gets ignored.

## Segment 4 (outro)

An alert that never fires is as useless as one that fires constantly — sensitivity built from real history beats a guessed round number. Next up: what the commercial monitoring tools out there actually add on top of all this.
