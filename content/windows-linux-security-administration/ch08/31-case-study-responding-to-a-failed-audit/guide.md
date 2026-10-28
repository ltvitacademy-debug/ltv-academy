# Lesson 31 — Case Study: Responding to a Failed Security Audit

**Chapter 8 · Capstone: Hardening a Mixed Environment · Lesson 31 of 32**

## What you'll learn

- What a real third-party audit finding looks like, not the sanitized version
- How to triage and remediate unpatched systems against a defined SLA
- How to find and tighten an overly permissive GPO using the tools from Chapter 2
- How to treat a Linux server with root SSH login enabled as a potential incident, not just
  a misconfiguration to quietly fix

## The finding

Meridian Fabrication just failed its annual third-party security audit. The report lands
with three findings, and none of them are theoretical — they're the three ways real
companies actually fail audits:

1. **Several servers, Windows and Linux, are more than 90 days behind on patches.**
2. **A GPO applied domain-wide grants local Administrator rights to a group far broader than
   it should.**
3. **`lnx-db-01`, a Linux database server, still has `PermitRootLogin yes` and password
   authentication enabled over SSH.**

Each one maps directly to a chapter this course already covered — the fix isn't new
knowledge, it's applying what's already here under a deadline.

## Finding 1: Unpatched servers

Lesson 21's Patch Tuesday cadence and Lesson 23's `apt`/`dnf` equivalent on Linux should have
caught this months ago. The remediation starts with triage, not blanket patching:

```
# Windows — WSUS console or:
Get-WindowsUpdate -Install -AcceptAll

# Linux — check first, then apply:
apt list --upgradable
dnf check-update
```

Patches get prioritized by CVSS score from Lesson 24 first — a critical remote-code-execution
CVE on an internet-facing box jumps the queue ahead of a low-severity local fix on an isolated
one. Every server gets a documented re-scan afterward, because "we patched it" without proof
is the same audit finding again next year.

## Finding 2: The overly permissive GPO

Someone widened a GPO's local Administrators membership during a past project and never
narrowed it back. Finding it means reading the report, not guessing:

```
Get-GPOReport -Name "Domain-Wide-LocalAdmin" -ReportType Html -Path C:\Reports\gpo-audit.html
```

The fix follows Lesson 6's CIS baseline directly: local Administrators membership gets
restricted back to the specific groups that actually need it, and the GPO is re-linked and
re-verified with `gpresult /r` on a sample of affected machines before the ticket closes.

## Finding 3: Root SSH login on a database server

This is the finding that doesn't get a quiet fix. A database server with root login and
password auth both enabled over SSH, exposed for an unknown length of time, has to be treated
as a possible compromise, not just a misconfiguration — Lesson 19's SSH hardening and
Lesson 20's fail2ban cover the fix itself:

```
PermitRootLogin no
PasswordAuthentication no
```

But before that config change goes in, the auth log and `auditd` history get searched for
root logins during the exposure window. If anything suspicious turns up, this becomes an
incident that gets scoped with the endpoint protection tools from Chapter 7, not just a config
line that gets flipped.

## Closing the loop

Patch, GPO, and SSH fixes all get re-verified, re-scanned, and documented, because Lesson 24's
vulnerability management and Chapter 7's compliance frameworks both require proof, not just a
fix. The re-audit is what turns this from "we think it's fixed" into "it's fixed."

## Key terms

| Term | Meaning |
|---|---|
| SLA (patch) | The defined time window a severity level has to be remediated in |
| Audit finding | A documented gap between policy and actual configuration found during a security audit |
| Overly permissive GPO | A Group Policy setting that grants broader access than the role actually requires |
| Exposure window | The time between when a misconfiguration existed and when it was fixed |

## Check yourself

Why does finding 3 — root SSH login on a database server — get treated differently from
finding 1, even though both are technically "just a misconfiguration" on paper?
