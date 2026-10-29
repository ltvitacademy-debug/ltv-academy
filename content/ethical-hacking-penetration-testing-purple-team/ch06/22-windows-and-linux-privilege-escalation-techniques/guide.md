# Lesson 22 — Windows and Linux Privilege Escalation Techniques

**Chapter 6 · Post-Exploitation and Privilege Escalation · Lesson 2 of 4**

## What you'll learn

- Why privilege escalation findings are really misconfiguration
  findings, not clever tricks
- The real categories of Windows misconfigurations a hardening
  review looks for, and why each one is dangerous
- The real categories of Linux misconfigurations a hardening review
  looks for, and why each one is dangerous
- How these categories map onto the CIS Benchmarks that chapter 5 of
  the Security Engineering course already introduced

## It's a misconfiguration review, not a trick

Privilege escalation sounds like a clever exploit, but on a real
engagement it's almost always a misconfiguration review. Every
category below is a known, documented class of configuration mistake
that a hardening audit is specifically designed to catch — the same
categories a vulnerability management program tracks and remediates
on a schedule, independent of whether anyone is actively testing
them. Recognizing the category matters more than memorizing a
specific command, because the category is what a defender fixes.

## Windows misconfiguration categories

**Weak service permissions.** A Windows service that runs as
`LocalSystem` but whose binary path or registry key is writable by a
low-privilege user is a finding: whoever can replace that binary
controls what runs with `LocalSystem` privileges the next time the
service starts. Assessment tools flag this by checking service ACLs
against the account running the service.

**Unquoted service paths.** A service path like
`C:\Program Files\My App\service.exe` without quotes lets Windows
try `C:\Program.exe` first if a file with that name exists in a
writable location. It's a path-parsing ambiguity, not an exploit —
and it shows up in any serious hardening scan.

**AlwaysInstallElevated.** A registry policy that lets any user
install an `.msi` package with `SYSTEM` privileges. If it's set, any
local user can run an installer with elevated rights — a one-key
registry check during an audit.

**Stored and cached credentials.** Scheduled tasks, services, and
unattended-install files sometimes contain plaintext or weakly
protected credentials for a higher-privilege account. A review checks
for these the same way it checks for secrets committed to a
repository in course 10's DevSecOps content.

## Linux misconfiguration categories

**SUID/SGID binaries.** A binary with the SUID bit set runs with its
owner's privileges, not the caller's. Standard system binaries need
this; an unusual or custom binary with SUID set on an owner like
`root` is exactly what a hardening scan looks for.

**Sudoers misconfigurations.** A `sudoers` entry granting `NOPASSWD`
on a broad command, or on a command that itself can read/write
arbitrary files, effectively grants full root access without a
password prompt. Reviewing `/etc/sudoers` and `sudoers.d/` entries
against least privilege is standard audit practice.

**World-writable cron jobs and scripts.** A scheduled job that runs as
root but executes a script writable by any user is a finding the
moment a file-permission scan sees it — whoever can edit that script
controls what root runs next.

**Kernel and capability misconfigurations.** An outdated kernel with a
known local privilege-escalation CVE, or a process granted Linux
capabilities (like `CAP_SETUID`) beyond what it needs, are both
tracked the same way any other unpatched or over-privileged
component is tracked.

## Why this connects to chapter 5's courses

Every category above is something the Windows/Linux hardening course
(course 8) and the CIS Benchmarks it covers already tell you to check
for *before* anyone tests you on it. A penetration test's
privilege-escalation phase isn't discovering new risk categories —
it's proving that a specific, already-known risk category exists,
unremediated, on a specific host, which is exactly the evidence a
remediation team needs to prioritize the fix.

## Key terms

| Term | Meaning |
|---|---|
| Privilege escalation | Gaining higher-privilege access than an initial foothold started with, by exploiting a misconfiguration |
| SUID bit | A Linux file permission that runs a binary with its owner's privileges rather than the caller's |
| Sudoers | The Linux configuration file controlling which users can run which commands as another user, typically root |
| AlwaysInstallElevated | A Windows policy that lets any user install software with SYSTEM privileges |

## Check yourself

You're ready for Lesson 23 when you can name at least two Windows and
two Linux misconfiguration categories from this lesson, and explain
why each one is something a hardening *audit* — not just a live
attacker — is specifically built to catch.
