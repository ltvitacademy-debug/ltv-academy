# Lesson 28 — Turning a Successful Hunt into a Permanent Detection

**Chapter 7 · Threat Hunting Methodology · Lesson 28 of 32**

## What you'll learn

- Why a hunt that found something real should never stay a one-off, manual finding
- How the exact KQL from a successful hunting query becomes the logic of a real Sentinel
  Scheduled Analytics Rule
- What has to change about that query when it moves from an on-demand hunt to a scheduled rule
- Why this conversion is the step that closes the loop this chapter has been building toward

## A hunt that works once shouldn't have to work again

Every hunt in this chapter has pointed toward this moment. Lesson 25 formed a specific hypothesis.
Lesson 26 ran it through gather-data-and-analyze. Lesson 27 showed where a systematic hypothesis
can come from in the first place. Now say one of those hunts actually confirms something real —
the `rundll32.exe` hypothesis from Lesson 25 turns up a genuine malicious launch on a real host. A
hunting query only runs when an analyst manually decides to run it; if that pattern shows up again
next week, nothing catches it unless someone happens to hunt for the exact same thing again. A
real, confirmed finding that an analyst has to manually re-check for, forever, is exactly the kind
of gap that a mature hunting program closes.

## From hunting query to scheduled rule

The Sentinel course already covered the mechanics of a **Scheduled Analytics Rule**: one KQL
query plus four settings — the query itself, how often it runs, how far back it looks, and the
result-count threshold that generates an alert. A successful hunt has already done the hardest
part of that work: it has a KQL query, proven against real data, that actually matches the
malicious pattern. Turning the hunt into a permanent detection means taking that same query — or a
lightly refined version of it — into **Microsoft Sentinel → Configuration → Analytics → Create →
Scheduled query rule**, and setting it to run automatically instead of waiting for an analyst to
remember to run it again.

## What actually changes in the move

The query's core logic usually doesn't change much — it already proved it could find the pattern.
What does need deliberate attention is the **scheduling settings** around it: the run frequency
and lookback window need to be set so they actually catch the behavior on an ongoing basis (and,
per the Sentinel course's own guidance, the lookback window should run longer than the run
frequency, to avoid missing events caught in an ingestion-delay gap), and the alert threshold needs
to reflect how many matches genuinely warrant an alert versus how many were specific to the one
host investigated during the hunt. A hunting query answers one question once; a scheduled rule has
to keep answering it correctly, run after run, without an analyst reviewing the logic each time.

## Why this closes the loop

This is the real payoff of everything this chapter has built. A hypothesis-driven hunt, run
through the loop, sourced systematically from ATT&CK coverage gaps, that finds something real —
and then gets converted into an automated rule — means that specific gap in detection coverage is
now permanently closed. The next time that exact pattern happens, Sentinel catches it on its own
schedule, with no analyst having to remember to hunt for it again. That is the concrete difference
between a SOC that hunts occasionally and a SOC where hunting actually, measurably improves the
baseline over time.

## Key terms

| Term | Meaning |
|---|---|
| One-off finding | A hunt result that stays manual — only caught again if someone re-runs the exact same hunt |
| Scheduled Analytics Rule | The Sentinel rule type (query + run frequency + lookback + threshold) that automates detection |
| Rule conversion | Taking a proven hunting query's logic and turning it into a scheduled rule's query |
| Closing a coverage gap | Converting a confirmed hunt into a permanent rule so that technique is now automatically detected |

## Check yourself

A hunting query confirms a real malicious rundll32.exe launch on one host. Explain why simply
noting that finding and moving on leaves a gap, and what specific step closes that gap for good.
