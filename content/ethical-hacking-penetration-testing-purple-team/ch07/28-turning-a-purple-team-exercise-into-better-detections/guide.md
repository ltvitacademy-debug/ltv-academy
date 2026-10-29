# Lesson 28 — Turning a Purple Team Exercise into Better Detections

**Chapter 7 · Purple Team Operations · Lesson 4 of 4**

## What you'll learn

- Why the real output of a purple team exercise is shipped, tuned
  detection logic in the SIEM — not a report
- How a detection gap turns into real KQL, tying straight back to the
  Microsoft Sentinel content earlier in this path
- The detection engineering lifecycle a rule goes through before it's
  trusted in production: build, test, tune, deploy, document
- Why a one-time exercise isn't enough, and how a recurring cadence
  prevents detection coverage from quietly regressing

## The deliverable is a rule, not a document

It's tempting to think a purple team exercise "produces findings" the
same way a penetration test produces a report. It doesn't — or at
least, that's not the point of running one. The real, durable output
of a purple team exercise is new or tuned detection logic actually
running in the SIEM. A finding that stays a bullet point in a slide
deck has changed nothing about the organization's ability to detect
that technique tomorrow. A finding that becomes a deployed analytics
rule has.

## From gap to real KQL

Say the exercise surfaces a gap: `T1003.001`, credential dumping from
LSASS memory, isn't detected. The fix is real detection engineering,
built in Microsoft Sentinel using Kusto Query Language — the same
Sentinel/KQL foundation this path covered earlier:

```kql
DeviceProcessEvents
| where FileName in~ ("procdump.exe", "procdump64.exe", "rundll32.exe", "taskmgr.exe")
| where ProcessCommandLine has "lsass"
   or (InitiatingProcessFileName =~ "rundll32.exe"
       and ProcessCommandLine has "comsvcs.dll" and ProcessCommandLine has "MiniDump")
| where InitiatingProcessAccountName !in (KnownEdrServiceAccounts)
| project Timestamp, DeviceName, InitiatingProcessAccountName,
          FileName, ProcessCommandLine
```

This watches Defender/Sysmon-derived process telemetry for the known
patterns of LSASS memory access — `procdump` targeting `lsass.exe`, or
the classic `rundll32`-plus-`comsvcs.dll` MiniDump trick — excluding
the organization's own known EDR service accounts to cut obvious false
positives before the rule ever ships as a Sentinel analytics rule.

## The detection engineering lifecycle

A rule doesn't go straight from "written during the exercise" to
"trusted in production." It goes through a real lifecycle: start from
the hypothesis the gap exposed, build the query, **test it against the
actual technique** — ideally using the same atomic execution the
exercise used, the same way Atomic Red Team-style tests reproduce a
single technique on demand — tune it against real production traffic
to control the false-positive rate, deploy it as a live analytics
rule, and document it in a detection catalog mapped to its ATT&CK ID
so the next engineer or the next exercise can find it instantly. The
exercise doesn't actually close the loop until that re-run from Lesson
26 confirms the new rule fires on the real technique, live.

## Beyond detection rules: the other real outputs

A gap uncovered in a purple team exercise doesn't always end at a new
SIEM rule. Sometimes the fix is a missing telemetry source — a Sysmon
event that was never being collected, so no rule could ever have
caught the behavior. Sometimes it's an EDR prevention policy, turning
a detect-only alert into something that's blocked automatically next
time. Sometimes it's a SOAR playbook update, so that when the new rule
does fire, the response is already automated rather than landing as
one more alert for a tired analyst at 2 a.m.

## Why one exercise isn't enough

Detection coverage decays. Environments change, EDR agents get
reconfigured, log sources get retired or renamed, and a rule that
worked perfectly six months ago can silently stop firing. Mature
programs run purple team exercises on a recurring cadence — often
quarterly, or tied to new threat intelligence — and track real metrics
over time: detection coverage percentage against the ATT&CK matrix,
mean time to detect, and whether previously-closed gaps have quietly
reopened. The exercise isn't a one-time event; it's how the detection
program stays honest.

## Key terms

| Term | Meaning |
|---|---|
| Analytics rule | A deployed detection query (e.g. in Microsoft Sentinel, written in KQL) that generates an alert when its pattern matches |
| Detection engineering lifecycle | Hypothesis → build → test against the real technique → tune for false positives → deploy → document |
| Detection catalog | A documented record of deployed detection rules, mapped to the ATT&CK technique IDs they cover |
| Coverage drift | The gradual, silent loss of detection effectiveness over time as environments and telemetry change |

## Check yourself

You're ready to move on when you can explain, without looking: why
does a purple team finding only count as "closed" once a technique
re-run confirms the new rule fires, and what real-world change can
cause a previously working detection to silently stop firing months
later?
