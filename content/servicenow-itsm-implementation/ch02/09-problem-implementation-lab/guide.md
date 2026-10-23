# Lesson 9 — Problem Implementation Lab

**Chapter 2 · Implementing Problem Management · Lesson 9 of 32**

## What you'll learn

- How to walk a real multi-Incident scenario through the full Problem Management lifecycle
- Where exactly to create the Problem record, and how to link multiple existing Incidents to it
- How `cause_notes` gets built up over the course of an investigation, in practice
- The decision point where the Problem moves to Known Error, and what that changes for new Incidents
- Why the three original Incidents stay untouched by the Problem's own state, even as the Problem itself keeps moving

## The scenario

Over the course of one week, three separate Incidents are logged by three different users, each reporting the same symptom: an intermittent VPN disconnect, happening roughly every 45–60 minutes, affecting remote staff only. Each Incident is triaged and worked individually at first — a different agent picks up each one, and in each case the user reconnects and gets back to work within a few minutes. None of the three Incidents, on their own, looks like a major outage. But by the third report in four days, the pattern is obvious to anyone paying attention.

## Step 1 — Recognizing the pattern and creating the Problem

The agent working the third Incident checks for an existing Problem matching "VPN disconnect" and finds none. This is the trigger point: rather than close this Incident as a one-off, the agent (or, in many implementations, the assignment group lead reviewing repeat symptoms) opens a new Problem record — short description something like "Intermittent VPN disconnects affecting remote users, ~45–60 min interval" — and sets its state to New.

## Step 2 — Linking all three Incidents

Next, each of the three Incidents gets its `problem_id` field set to point at this new Problem record. This is the step that actually realizes the value from Lesson 6: once all three are linked, the Problem's related list immediately shows all three Incidents together — three different users, three different timestamps, one shared pattern. That related list is what tells the Problem manager this is affecting more than one person, without anyone having to go ask around.

## Step 3 — Root-cause analysis moves forward

The Problem moves to "Root Cause Analysis." Over the following days, `cause_notes` gets updated incrementally: first, a note that the pattern correlates with VPN concentrator load during peak login windows; then a note ruling out individual user devices (all three affected users have different laptop models and ISPs); then a note narrowing the cause to a specific concentrator's session-timeout configuration, which is dropping idle-looking sessions more aggressively than intended. This is exactly the "journal of findings" behavior from Lesson 7 — each note stays, in order, so anyone reviewing the Problem later sees the reasoning, not just the final answer.

## Step 4 — Known Error, before the permanent fix exists

The concentrator's configuration is the confirmed root cause, but changing that setting requires a scheduled Change (the subject of Chapter 3) — it can't just be flipped immediately in production. So, with the cause confirmed but no permanent fix deployed yet, the Problem is flagged as a Known Error. A workaround — manually reconnecting, or adjusting a local VPN client's keep-alive interval — gets documented clearly, separate from the investigative `cause_notes`.

## Step 5 — What happens to new, similar Incidents in the meantime

A fourth user reports the same symptom two days later. Because the Known Error is now documented and, per Lesson 8, surfaced through search, the agent working this new Incident finds it quickly, applies the documented workaround, links this fourth Incident's `problem_id` to the same Problem record, and resolves the Incident fast — without re-investigating anything. The Problem itself stays in Known Error, not Resolved; the underlying concentrator setting still hasn't actually changed.

## Step 6 — Resolution, once the Change lands

Once the scheduled Change adjusts the concentrator's session-timeout setting and the fix is verified, `fix_notes` gets the permanent-fix description, and the Problem moves to Resolved, then Closed after a review period. All four linked Incidents remain exactly as they were — each individually resolved at its own time — but anyone opening any of them can still see, via `problem_id`, that they were all symptoms of the one cause that's now actually fixed.

## Key terms

| Term | Meaning |
|---|---|
| Problem record | The single investigation created once a recurring pattern across Incidents is recognized |
| Linked Incident | Any Incident with `problem_id` pointing at the Problem driving its symptom |
| Known Error (in practice) | The state where a workaround exists and is searchable, but the Problem itself is still open |
| Scheduled Change | The mechanism (Chapter 3) that actually deploys a permanent fix into production |

## Check yourself

In this scenario, why does the fourth Incident get resolved quickly even though the underlying concentrator setting hasn't been fixed yet — and why does the Problem record itself still show "Known Error," not "Resolved," at that same moment?
