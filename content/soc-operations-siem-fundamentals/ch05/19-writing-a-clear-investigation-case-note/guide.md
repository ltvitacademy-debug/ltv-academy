# Lesson 19 — Writing a Clear Investigation Case Note

**Chapter 5 · Alert Triage & Investigation Workflow · Lesson 19 of 32**

## What you'll learn

- The five things a real investigation case note must include
- Why a vague case note actively harms the next person who reads it, not just annoys them
- A side-by-side comparison of a vague note and a clear one for the same alert
- Who actually reads case notes later, and why that audience shapes how you should write one

## The five things a real case note includes

A **case note** is the written record of what an analyst did with an alert, and it has one job:
let someone else — another analyst, an auditor, a future version of the same analyst six months
later — understand the case completely without redoing the work. A real case note covers five
things, every time: **what happened** (a plain-language summary of the alert and the activity
behind it), **what was checked** (the specific logs, systems, or accounts the analyst reviewed),
**what was found** (the actual results of that checking — not just "looks fine," but what
specifically was seen), **what action was taken** (closed, escalated, contained — and exactly what
that action involved), and **timestamps** (when the alert fired, when it was reviewed, when the
action was taken). Leave any one of these out and the note stops doing its job.

## Why a vague note actively hurts, not just annoys

"Looked into it, seems fine" is the single most common bad case note, and it's worse than writing
nothing at all. It creates the appearance that due diligence happened without recording any of the
actual due diligence — so the next person who looks at this account or host has no way to know
what was already ruled out, and has to start completely from zero, re-running checks the first
analyst may have already done. Worse, if that account or host turns out to be part of a real
incident discovered weeks later, an auditor or incident responder reading "looked into it, seems
fine" has no way to tell whether the original analyst actually checked anything meaningful, or just
closed the ticket to clear the queue. A vague note doesn't just fail to help — it actively erodes
trust in every other note that analyst has ever written.

## Vague vs. clear: the same alert, two notes

**Vague note:** "Checked the login alert. Looked fine. Closing."

**Clear note**, for the exact same alert:

```
2026-10-28 14:12 UTC — Alert: suspicious login, new geo location, account jsmith
2026-10-28 14:19 UTC — Checked raw auth log: login from 203.0.113.44 (Lisbon, PT),
  MFA passed on first prompt, no prior failed attempts on this account.
2026-10-28 14:24 UTC — Checked for related activity: no other accounts logged in
  from same IP range in past 24h; jsmith's subsequent activity (SharePoint, Outlook)
  matches normal daily pattern for this account.
2026-10-28 14:31 UTC — Confirmed with IT: jsmith has an approved travel ticket for
  a conference in Lisbon, dates match. Classified benign true positive. Closing,
  no escalation needed.
```

Both notes describe the same outcome — the alert was closed, no action needed. The clear note is
the one that actually proves it, and it's the one that tells the next reader exactly what was ruled
out and how.

## Who actually reads case notes later

Case notes get read far more often than new analysts expect, and almost never by the person who
wrote them, in the moment they were written. A Tier 2 analyst reads them when an escalation picks
up where Tier 1 left off. A different Tier 1 analyst reads them months later when the same account
triggers another alert and they need to know its history. An auditor or compliance reviewer reads
them during an incident review or a regulatory audit, looking for evidence that alerts were
actually investigated, not just dismissed. Writing a case note for that real, future audience —
not just to clear the ticket in front of you right now — is the entire difference between a note
that's useful later and one that's worthless the moment the queue moves on.

## Key terms

| Term | Meaning |
|---|---|
| Case note | The written record of what an analyst found and did with an alert |
| What was checked | The specific logs, systems, or accounts actually reviewed during triage |
| What was found | The actual results of that review, stated specifically, not just "looks fine" |
| Timestamp | The recorded time an alert fired, was reviewed, or was acted on |

## Check yourself

Why is "looked into it, seems fine" worse than writing no note at all — what specific harm does it
cause that an empty ticket wouldn't?
