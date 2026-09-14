# Script — Monitoring and Optimizing a Solution: Exam Focus

## Segment 1 (title)

Domain 3 covers what happens after a solution is built and running — the Monitoring Hub, Direct Lake Mode's fallback behavior, capacity sizing, and scoped-down production practices from Course 3.

## Segment 2 (code: Direct Lake fallback)

Direct Lake Mode lets a semantic model read Delta files straight from OneLake without importing. The exam-tested detail is the fallback: if a table gets too large, Fabric silently reverts to DirectQuery instead of failing outright.

## Segment 3 (code: Monitoring Hub)

The Monitoring Hub shows run history and duration for every pipeline, notebook, and Dataflow in a workspace — it's where you'd actually go to diagnose that kind of slowdown.

## Segment 4 (steps: capacity and root cause)

Capacity throttling shows up as jobs queuing during peak hours — check capacity utilization first, not the query logic. Root-cause questions ask for the single correct next diagnostic step, not a full incident-response playbook.

## Segment 5 (outro)

Direct Lake's fallback to DirectQuery is the single highest-yield performance fact in this domain. Next up: practice questions on OneLake and Lakehouses.
