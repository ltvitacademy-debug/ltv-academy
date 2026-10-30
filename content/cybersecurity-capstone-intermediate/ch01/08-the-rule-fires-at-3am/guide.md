# Lesson 8 — The Rule Fires at 3 AM: A Real Alert to Triage

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 8 of 16**

## What you'll learn

- What the correlation rule from Lesson 5 actually surfaced, for the first time, on a real night
- How Mara applies the runbook's Triage phase to this specific alert, step by step
- Why every individual fact about this alert points toward "real concern," not noise
- Why triage alone can confirm *something is wrong* without yet explaining *why it was possible*

## The alert

At 3:09 a.m., the **External RDP Allow + Entra Sign-In Correlation** rule's scheduled run finds
a match it's never surfaced before. `CommonSecurityLog` shows the perimeter firewall allowing a
connection from `203.0.114.77` to `UTIL-ADM-02` (10.20.4.15) on port 3389 — an RDP allow, through
the `TEMP-MERIDIAN-RDP` rule. Five minutes later, at 3:14 a.m., `SigninLogs` shows a successful
Entra ID sign-in from that same address, `203.0.114.77`, for the account
`n.pettit@hartwellru.com`. The rule's join finds both halves, inside its 15-minute window, and a
new Sentinel incident lands in the queue.

## Running it through Triage

Mara opens the runbook from Lesson 7 and starts at the top: Triage. Is this real, or noise?

- **Is the account's activity expected right now?** `n.pettit` is a help-desk account that has
  never shown activity at 3 a.m. in any prior log Mara can pull. Nothing on Hartwell's change
  calendar or vendor schedule explains an overnight sign-in for this account.
- **Is the source address expected?** `203.0.114.77` doesn't match Meridian Controls' known
  support range the way Mara understands it — and it doesn't match any location `n.pettit` has
  signed in from before.
- **Is this account in the Conditional Access pilot group yet?** No — `CA-Pilot-SOC-IT` covers
  only Mara, Dale, and a handful of others; `n.pettit`'s account isn't in scope for the pilot
  yet, so this sign-in needed only a valid password, nothing more.
- **Did the sign-in succeed?** Yes — `ResultType` shows success, not a failed attempt that could
  be dismissed as a harmless guess.

Every one of those checks points the same direction: this doesn't look like routine activity,
and it doesn't look like noise. Mara escalates it past Triage, logs it as a real concern in
progress, and moves to Scope — checking whether this account or this address shows up touching
anything else — while the investigation continues.

## What triage has — and hasn't — answered yet

Triage has done its job: it turned a raw alert into a confirmed, real concern, with concrete
reasons why, documented exactly the way the runbook asks for. What triage *hasn't* answered yet
is the question underneath all of this: how did `203.0.114.77` — an address that isn't
Meridian's, isn't recognized, and has no business reaching an internal admin port — manage to get
an RDP connection allowed through the firewall in the first place? The correlation rule caught
the symptom. It didn't explain the cause. That question is where the investigation goes next.

## Key terms

| Term | Meaning |
|---|---|
| Incident queue | Sentinel's list of alerts and incidents awaiting investigation |
| Triage (applied) | Checking an alert's entities against expected patterns to decide real concern vs. noise |
| `ResultType` | The `SigninLogs` field indicating whether a sign-in succeeded or failed, and how |
| Confirmed concern | An alert that has passed triage and is now a real, in-progress investigation |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what four facts did Mara check
during Triage, why did each one point toward "real concern," and what specific question does
triage leave unanswered going into the next lesson?
