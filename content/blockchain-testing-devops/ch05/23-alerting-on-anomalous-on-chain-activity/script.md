# Script — Alerting on Anomalous On-Chain Activity

## Segment 1 (title)

A dashboard only helps if someone's looking at it. Alerting flips that around: instead of a human checking the numbers, a condition fires automatically and comes to the human, the moment it's true.

## Segment 2 (screenshot: alert trigger types)

Before you can alert on "anomalous," you have to define it precisely. A real alerting platform offers a specific menu of trigger types -- a failed transaction, a specific function being called, an address that's not on an allowlist calling a contract it shouldn't.

## Segment 3 (screenshot: alerting rules dashboard)

Every rule currently watching a protocol lives in one place, readable at a glance -- not scattered across scripts nobody re-reads after the person who wrote them leaves. That visibility is as important as the rules themselves.

## Segment 4 (screenshot: alert email notification)

When a rule fires, what actually lands in front of a human matters. A transaction hash, which network, a link straight back to the dashboard -- enough to act on immediately, not a cryptic ping that sends someone digging.

## Segment 5 (steps: calibrating an alert)

A good alert is a specific, falsifiable claim. Too broad -- "something happened" -- gets muted within a week. Too narrow -- one exact transaction hash -- never fires again. The useful middle is a named condition tied to Lesson 22's numbers: utilization over 90 percent, a single transfer over a dollar threshold.

## Segment 6 (outro)

An alert firing is the start of a process, not the end of one. Lesson 24 covers what actually happens next -- incident response, and the pause mechanisms that can limit damage while a team figures out what's going on.
