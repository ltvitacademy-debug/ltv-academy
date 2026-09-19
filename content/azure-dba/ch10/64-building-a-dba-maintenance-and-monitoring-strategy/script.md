# Script — Building a DBA Maintenance & Monitoring Strategy

## Segment 1 (title)

Chapters 7 through 10 aren't four separate topics — they're four parts of one ongoing job: know what's happening, keep it healthy, fix what's slow, and don't have to watch it by hand.

## Segment 2 (code: scheduled vs always-on)

Index maintenance and integrity checks belong on a schedule. CPU alerts, error-severity alerts, and regression detection belong always-on, firing the moment a condition is true. Putting an always-on concern on a schedule means a real problem can sit unnoticed.

## Segment 3 (code: a real strategy)

A nightly window for integrity checks and index maintenance, a weekly pass for backup verification and unused-index review, continuous alerts for resource thresholds and errors, and a human reviewing trends weekly — nobody's staring at a dashboard 24/7.

## Segment 4 (outro)

Chapter 10 is complete. Chapter 11 moves from Agent-based automation to Azure-native automation — CLI, PowerShell, and infrastructure as code.
