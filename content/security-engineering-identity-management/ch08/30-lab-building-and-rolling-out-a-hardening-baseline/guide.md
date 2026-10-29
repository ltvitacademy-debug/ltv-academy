# Lesson 30 — Lab: Building and Rolling Out a Hardening Baseline

**Chapter 8 · Capstone: Engineering an Identity & Hardening Program · Lesson 30 of 32**

## What you'll learn

- How to build a real GPO-based Windows hardening baseline from a CIS Benchmark, instead of
  editing the Default Domain Policy by hand
- How to run the equivalent CIS-based hardening pass against Thornbury's previously unmanaged
  Linux fleet
- Why a hardening baseline gets tested in audit mode on a pilot group before it's ever enforced
  everywhere
- How a real exception process keeps a hardening rollout from either stalling or breaking the
  business

## The fleet: 2,700 Windows endpoints, 40 unmanaged Linux servers

With identity federated, the combined Castellan fleet now includes roughly 2,700 Windows
endpoints — Castellan's original 2,400 plus Thornbury's 380, after accounting for overlap — and
about forty Linux servers that Thornbury's actuarial team runs for risk modeling. Those Linux
servers were never under any formal hardening program; Thornbury had no equivalent of the CIS
Benchmark discipline Castellan's Windows fleet already followed. The hardening baseline has to
bring both halves of the fleet up to one standard, not just extend Castellan's existing policy
and hope Thornbury catches up on its own.

## Building the Windows baseline from a CIS Benchmark

The team scans the current state of both Windows populations against the **CIS Benchmark for
Windows 11 / Windows Server 2022**, Level 1, using a scanner rather than working line by line by
hand. The gaps are predictable and exactly the kind Chapter 4 covers: Thornbury's machines still
store LAN Manager password hashes, have LLMNR and SMBv1 enabled, and have never had **Attack
Surface Reduction (ASR)** rules configured at all. The fix is a **new GPO**, scoped through
security filtering and OU targeting — never an edit to the Default Domain Policy, which applies
everywhere at once with no way to roll back cleanly. The new baseline disables LLMNR and SMBv1,
blocks LAN Manager hash storage, enables **Credential Guard** to isolate LSA secrets from
malware that gets local admin, and turns on the specific ASR rules Chapter 4 recommends for
blocking Office-macro-based payloads and credential-stealing tools.

## The Linux pass: CIS Benchmark, kernel parameters, and automation

Thornbury's forty Linux servers get the same discipline, scaled to the platform. The team scans
against the **CIS Benchmark for Ubuntu Server**, hardens the **sysctl** kernel parameters Chapter
5 covers (disabling IP forwarding on hosts that don't route traffic, enabling ASLR, restricting
core dumps on setuid programs), and — critically — writes the entire remediation as an **Ansible
playbook** instead of applying it by hand server by server, so the baseline is repeatable, version
controlled, and reusable the next time a Linux server gets provisioned.

## Testing in audit mode before anyone gets locked out

Neither baseline goes straight to enforcement. The team runs both — the GPO's ASR rules in audit
mode, and the Ansible playbook's riskier settings behind a `--check` dry run — against a 150-
machine **pilot group**: Thornbury's full Windows fleet plus Castellan's own helpdesk team, for
two weeks. Audit mode surfaces exactly what would have broken: one of Thornbury's actuarial Linux
scripts depends on a cron job that the new sysctl restrictions would have disabled, and an ASR
rule would have blocked a finance team's legacy macro-enabled spreadsheet that a replacement
project isn't shipping until next quarter. Both get caught in the audit logs before enforcement,
not after someone's work stopped.

## Rolling out with a real exception process

Instead of either holding up the whole rollout for two problems or silently leaving a hole in the
baseline, the two findings become **documented, owned, time-limited exceptions**: the actuarial
cron job gets rewritten to work under the new restrictions within a week, and the finance
spreadsheet exception is logged with a named owner and an expiration tied to the replacement
project's ship date, reviewed quarterly rather than left open indefinitely. With the exceptions
tracked, enforcement rolls out in waves across the rest of the fleet — exactly the controlled,
accountable version of a hardening program this course has been building toward since Chapter 4.

## Key terms

| Term | Meaning |
|---|---|
| Audit mode | Running a hardening setting so it logs what it would block without blocking it yet, used to find false positives before enforcement |
| Credential Guard | A Windows feature that isolates LSA secrets in a protected memory space, so malware with local admin still can't read cached credentials |
| Exception process | A documented, owned, time-limited carve-out from a baseline, reviewed on a schedule instead of left open indefinitely |

## Check yourself

Why do both the GPO baseline and the Ansible playbook get tested in audit or dry-run mode against
a pilot group before enforcement, rather than being enforced across the whole fleet immediately —
and what would the finance team's macro-enabled spreadsheet exception have looked like if it had
been discovered after enforcement instead of before?
