# Script — Capstone: Document the Runbook

## Segment 1 (title)

The last two lessons proved AG_Bellhaven works, but that knowledge currently lives in whoever ran
the test. This lesson writes the actual runbook the on-call team would use at 3 AM, without that
person on the phone.

## Segment 2 (steps: decision tree and escalation)

The first job is routing the incident correctly, before any command runs: is the primary
unreachable, is the local secondary still healthy and synchronized, or is only the remote DR
replica left standing. That last branch requires IT Director escalation before running anything,
because the forced-failover command accepts possible data loss.

## Segment 3 (code: the two procedures)

Procedure A is Lesson 45's plain failover, for a local failure. Procedure B is Lesson 46's forced
failover, only after that escalation confirms a real declared disaster. Both get verified the same
way afterward, checking replica role and synchronization state.

## Segment 4 (outro)

A runbook with a decision tree, two named procedures, a verification checklist, and a
communication plan is what actually makes this reusable by someone who wasn't in the room. Up
next: the capstone wrap-up.
