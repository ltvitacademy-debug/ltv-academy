# Lesson 20 — Auditing and Logging in the Cloud · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

Auditing and Logging in the Cloud — the one log every governance program in this
chapter has quietly depended on.

## S2 · SCREENSHOT (Azure Activity log)

Collected automatically, no configuration needed. And the initiator isn't always a
person — Azure Policy Insights shows up here whenever a policy's effect actually fires.

## S3 · SCREENSHOT (Change history)

For a subset of operations, Change history goes further — the actual before and
after values, like a VM's power state moving from stopped to running.

## S4 · SCREENSHOT (CloudTrail Event history)

CloudTrail's Event history is the AWS equivalent — same 90-day default window,
filtered here to writes and state changes only.

## S5 · SCREENSHOT (CloudTrail filtered to ConsoleLogin)

Filtering to ConsoleLogin is one of the first things an incident investigation
does — confirming exactly who signed in, and when.

## S6 · OUTRO CARD

That closes Chapter Four. Next: multi-cloud governance — running both of these
models at once.
