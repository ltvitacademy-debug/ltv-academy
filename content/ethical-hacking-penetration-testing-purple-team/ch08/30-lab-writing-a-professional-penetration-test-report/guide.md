# Lesson 30 — Lab: Writing a Professional Penetration Test Report

**Chapter 8 · Capstone: A Full Penetration Test Engagement · Lesson 30 of 32**

## What you'll learn

- Why a penetration test that isn't written up well is, for the client's purposes, barely
  different from a test that was never run at all
- How to write an executive summary a non-technical stakeholder can actually act on
- How to turn a raw finding like Lesson 29's validated SMB exploitation into a technical finding
  with a CVSS score, a reproduction path, and a remediation that's specific enough to assign
- How a report's structure protects both the client and the tester, long after the engagement ends

## Why the report is the deliverable

Nobody at Meridian Outfitters was in the room for Lesson 29's lab. What they get is a document,
and that document is what gets read by a CISO deciding where next quarter's budget goes, by an
engineer who has to actually patch something, and possibly by a regulator or a cyber-insurance
underwriter months later. A brilliant finding that's reported sloppily — vague reproduction steps,
no severity rationale, no clear owner for the fix — gets argued with, deprioritized, or ignored.
The report is not paperwork bolted onto the real work. It *is* the real work, delivered.

## Structure, section by section

### Executive summary — written for someone who will never read the technical section

```
EXECUTIVE SUMMARY

Meridian Outfitters engaged [firm] to assess the order-processing network
segment from [date] to [date]. Testing identified 1 Critical, 2 High, and
3 Medium severity findings. The Critical finding allows an attacker with
network access to the order-processing segment to gain administrative
control of a file server without valid credentials. We recommend this
finding be remediated within 7 days; the remaining findings follow the
prioritized schedule in Section 4.
```

No CVE IDs, no tool names, no command syntax — a non-technical stakeholder needs to know what's
wrong, how bad it is, and how fast it needs to be fixed. Everything else lives further down.

### Technical findings — one finding, fully self-contained

```
FINDING 1 — Unpatched SMB Service Allows Remote Code Execution
Severity: Critical  |  CVSS 3.1: 9.8 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)
Affected host: 10.50.12.23 (file/application server)

Description:
The host's SMB service exposes a long-documented vulnerability that
permits unauthenticated remote code execution. Lab validation confirmed
this by obtaining a session with SYSTEM-level access using a matching
Metasploit module (details in Appendix B).

Evidence:
- Nmap service scan output, 2026-10-28 (Appendix A, Exhibit 1)
- sysinfo / getuid output confirming SYSTEM context (Appendix A, Exhibit 2)
- Timestamped screenshot taken immediately after access was gained

Business risk:
This server holds order-processing data. An attacker with this access
could read or alter order and customer records, or pivot further into
the network.

Remediation:
Apply the vendor security update that addresses this vulnerability, or
decommission the service if it is no longer required. Verify the fix
with a follow-up scan before closing this finding.
```

Every piece has a job. The CVSS vector isn't decoration — `AV:N` (network), `AC:L` (low
complexity), `PR:N` (no privileges required) is exactly why this scored Critical instead of High.
The evidence list points at exhibits instead of pasting raw terminal output into the middle of the
narrative, which keeps the finding readable. The remediation names an action, not a vague "harden
this system."

### Remediation recommendations — prioritized, not just listed

```
PRIORITIZED REMEDIATION SCHEDULE
1. Finding 1 (Critical) — patch or decommission — 7 days
2. Finding 2 (High)     — rotate exposed credentials — 14 days
3. Finding 3 (High)     — enforce MFA on admin portal — 14 days
4. Findings 4-6 (Medium) — see Section 5 — 30 days
```

A list of findings without a schedule leaves the client guessing what to fix first. Ordering by
severity and giving a realistic timeframe turns the report into a project plan a client can
actually execute against.

### Appendices — where the raw evidence lives

Scope document, methodology summary, full tool output, and every piece of evidence referenced
above get their own appendix, numbered and cross-referenced. This is also where the signed ROE
from Lesson 1 gets attached — proof, permanently on file, that the testing described in this
report was authorized.

## Before this report goes out

A short, non-negotiable checklist: every finding is independently reproducible from the evidence
given, no live credentials or unredacted sensitive data appear anywhere in the document, every
CVSS score has its vector string shown (not just the number), and the client's named technical
contact gets a review pass before the executive summary is final. A report that can't survive
that checklist isn't ready, no matter how good the underlying work was.

## Key terms

| Term | Meaning |
|---|---|
| Executive summary | The non-technical, business-risk framing of the engagement's results, written for a reader who won't open the technical section |
| CVSS vector string | The specific metric values (e.g. `AV:N/AC:L/PR:N`) that justify a severity score, shown alongside the number itself |
| Reproduction evidence | Timestamped, host-specific output and screenshots that let the client's own team confirm a finding independently |
| Remediation schedule | Findings ordered by severity with a realistic timeframe, turning the report into an executable plan |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does Finding 1's technical
write-up show the CVSS vector string instead of just the number 9.8, and what belongs in the
executive summary that never belongs in a technical finding section?
