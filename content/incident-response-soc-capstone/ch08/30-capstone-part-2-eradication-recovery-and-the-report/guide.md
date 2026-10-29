# Lesson 30 — Capstone Part 2: Eradication, Recovery, and the Report

**Chapter 8 · Job-Ready Capstone: Full Incident Response Exercise · Lesson 30 of 32**

## What you'll learn

- How to find an attacker's actual persistence mechanism in forensic data, instead of assuming a
  disabled account and an isolated host already removed the root cause
- Why a host with SYSTEM-level persistence on it gets rebuilt from a verified-clean backup rather
  than cleaned live
- What "validation before returning to production" has to check, specifically, before a device
  goes back to a user
- How to write an after-action report with concrete, assignable follow-up items — not just a
  narrative of what happened

## Monday, 9:00 AM — what the evidence capture shows

Lesson 29 left WKSTN-FIN-14 isolated and Teresa Marsh's account disabled, with a memory and disk
triage capture already collected. Reviewing that capture, the analyst finds the actual root cause:
a scheduled task named `MicrosoftEdgeUpdateTaskMachineUA` — a name chosen to blend into Windows'
real update tasks — created at 2:49 PM Friday, two minutes after the foreign sign-in, set to
relaunch the same remote-access tool every time the machine starts. A disabled account and an
isolated laptop never touched this. It would have been sitting there, live, the moment anyone
re-enabled the account or reconnected the host without checking first.

```
DeviceProcessEvents
| where DeviceName == "WKSTN-FIN-14"
| where FileName == "schtasks.exe"
| where ProcessCommandLine has "MicrosoftEdgeUpdateTaskMachineUA"
```

## Eradication — and why this host gets rebuilt, not cleaned

Removing the scheduled task and its binary is trivial. Trusting the host afterward is not. Any
persistence created with this kind of disguised, SYSTEM-level scheduled task means the attacker
had enough access to plant something else the triage capture didn't catch — a second task, a
registry Run key, a modified service. Chapter 5's guidance applies directly here: when root cause
includes attacker-level persistence on the host itself, the safer eradication is restoring from a
**verified-clean backup** taken before the compromise window, not live remediation that leaves
open the question of what else might still be there.

## Recovery — restore, then validate before production

The team restores WKSTN-FIN-14 from Thursday night's backup — one full day before the Friday
compromise — and verifies its file hashes against the known-good gold image before trusting it.
Validation runs three checks before the device goes back to Teresa: a full Defender for Endpoint
scan comes back clean, the scheduled task list matches the organization's baseline with nothing
extra, and the same forensic query that found `MicrosoftEdgeUpdateTaskMachineUA` on this host gets
re-run tenant-wide to confirm the exact task name and tool hash don't exist anywhere else. Teresa's
account is re-enabled only after a forced password reset and MFA re-registration, and the device
returns to production under elevated logging for the following week.

## The after-action report

A lessons-learned meeting (Chapter 6 territory) turns into a short, specific written report with
owners and dates attached — not a retelling of the incident:

- **MFA push fatigue let the second sign-in through.** Follow-up: enforce number-matching MFA
  tenant-wide, not simple approve/deny, owned by Identity team, due in two weeks.
- **An impossible-travel rule only alerted — it didn't block.** Follow-up: add a Conditional
  Access policy that blocks (not just flags) sign-ins matching that geography/time pattern.
- **Scheduled-task creation wasn't logged for alerting.** Follow-up: enable Sysmon Event ID 1 /
  Windows Event 4698 auditing across all endpoints, feeding back into Sentinel.
- **Relationship managers hadn't had phishing/MFA-fatigue training in over a year.** Follow-up:
  mandatory refresher for all client-facing staff, owned by Security Awareness, due next month.

## Key terms

| Term | Meaning |
|---|---|
| Root cause | The actual mechanism that let an attacker persist, as opposed to the symptom an analytics rule caught |
| Verified-clean backup | A backup confirmed, by hash or baseline comparison, to predate the compromise window |
| Validation | The specific checks run on a restored asset before it returns to production use |
| After-action report | A written record of an incident with concrete, owned, dated follow-up items |

## Check yourself

Why was restoring WKSTN-FIN-14 from a verified-clean backup the safer eradication choice here,
instead of simply deleting the scheduled task and its binary from the live, running machine?
