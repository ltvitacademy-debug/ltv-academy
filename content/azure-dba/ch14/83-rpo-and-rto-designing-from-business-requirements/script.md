# Script — RPO & RTO — Designing from Business Requirements

## Segment 1 (title)

RPO and RTO are the two numbers that drive every HA/DR decision in this chapter. RPO is how much data you're willing to lose. RTO is how long you can be down. Neither one is a technology — they're business statements about acceptable pain, made before anyone picks a tool.

## Segment 2 (steps: the real process)

The process runs business-first: ask what data loss and downtime the business can actually tolerate, write those answers down as real numbers in minutes or hours, and only then choose a mechanism capable of hitting them. Picking a technology first and backing into whatever RPO it delivers is backwards.

## Segment 3 (code: converting a requirement into numbers)

Take a real requirement — "can't lose more than a few minutes of orders, back within 30 minutes" — and it converts directly: RPO of 5 minutes, RTO of 30 minutes. That RPO rules out nightly-only backups and requires log backups or replication at least every 5 minutes.

## Segment 4 (outro)

Your RPO can never be tighter than your log backup frequency — Chapter 13's backup strategy feeds directly into this calculation. Next up: Always On Availability Groups, the first real mechanism built to hit an aggressive RPO and RTO at once.
