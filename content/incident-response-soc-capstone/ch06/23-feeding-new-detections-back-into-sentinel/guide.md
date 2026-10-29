# Lesson 3 — Feeding New Detections Back into Sentinel

**Chapter 6 · Post-Incident Activity · Lesson 3 of 4**

## What you'll learn

- Why a root cause from an after-action report is only half-useful until it becomes a detection
- How to reuse the real KQL rule-writing process from Microsoft Sentinel & Defender XDR's Chapter 3 against a brand-new, incident-specific pattern
- A full worked example: turning an undetected persistence technique into a scheduled analytics rule
- How this one rule closes the exact loop Lesson 1 described — Post-Incident Activity feeding back into Preparation

## A root cause isn't finished until it's a detection

The Microsoft Sentinel & Defender XDR course's Chapter 3 taught the real mechanics of a scheduled
analytics rule: write a KQL query, set `Run query every` and `Lookup data from the last` to control
timing, set a threshold, and map entities so an alert carries trackable accounts and hosts into an
incident. Lesson 22's after-action report produces a root cause — but a root cause that only lives
in a document gets found the same way again next time, by a human noticing it, if anyone notices at
all. The real, concrete link between IR and detection engineering is turning that root cause directly
into a new analytics rule, using the exact process Chapter 3 already taught, so the same pattern gets
flagged automatically the moment it happens again.

## The incident: a root cause nobody was watching for

Say an after-action report's root cause reads: "the attacker established persistence by creating a
scheduled task via `schtasks.exe` that re-launched a payload from the user's AppData folder after
every reboot — this technique wasn't covered by any existing analytics rule." That's a specific,
checkable gap, and it has an obvious fix: write a rule that watches for exactly that pattern.

## Step one: the base query

The data for this lives in `DeviceProcessEvents`, the Microsoft Defender for Endpoint process table
available inside a Sentinel workspace through the Defender XDR connector — the same kind of table
Chapter 3 used `SigninLogs` from. A first-pass query looks for `schtasks.exe` being used to create a
task:

```
DeviceProcessEvents
| where FileName =~ "schtasks.exe"
| where ProcessCommandLine has "/create"
```

This is a real, runnable starting point, but on its own it's too broad — IT admins and legitimate
software create scheduled tasks constantly. Flagging every one of them would bury the SOC in noise,
the same problem Chapter 3's plain failure-count query had before it got sequence-aware.

## Step two: narrow it to the actual attacker behavior

What made this incident's technique suspicious wasn't the scheduled task itself — it was *where* the
task pointed. Legitimate software rarely launches from a user's AppData or Temp folder. Narrowing the
query to that specific detail turns a noisy query into a precise one:

```
DeviceProcessEvents
| where FileName =~ "schtasks.exe"
| where ProcessCommandLine has "/create"
| where ProcessCommandLine has_any ("\\AppData\\", "\\Temp\\", "\\Users\\Public\\")
| project TimeGenerated, DeviceName, AccountName, ProcessCommandLine
```

This is the exact root cause from the AAR, expressed as a condition a machine can check continuously
— the same translation step that turned the SOC Operations course's brute-force pseudocode into
Chapter 3's real `join`-based query.

## Step three: it's a rule, not just a query

Pasted into a Scheduled Analytics Rule's "Set rule logic" tab, this query becomes a real detection the
same way Chapter 3's did: a run frequency and lookback window decide how often it scans, the
threshold fires on any returned row, and entity mapping maps `DeviceName` to a Host entity and
`AccountName` to an Account entity, so the resulting alert carries trackable entities straight into
an incident. That's the loop from Lesson 1 closed in the most concrete way possible — a lessons
learned finding, written down in an AAR, now running in Sentinel every few minutes.

## Key terms

| Term | Meaning |
|---|---|
| `DeviceProcessEvents` | The Defender for Endpoint process-execution table, available in Sentinel via the Defender XDR connector |
| `has_any` | A KQL operator that matches a field against any value in a list — used here to catch several suspicious paths at once |
| Persistence technique | A method an attacker uses to survive a reboot or logoff, such as a malicious scheduled task |
| Detection gap | A real attacker behavior from a confirmed incident that no existing analytics rule would have caught |

## Check yourself

Without looking back: why was the first-pass `schtasks.exe` query too broad on its own, and what
specific detail from the incident's root cause narrowed it into a precise, low-noise rule?
