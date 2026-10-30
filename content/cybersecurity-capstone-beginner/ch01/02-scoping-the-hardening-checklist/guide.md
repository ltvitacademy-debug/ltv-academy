# Lesson 2 — Scoping a Baseline Hardening Checklist

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 2 of 10**

## What you'll learn

- Why Mara picks a published, vendor-independent standard instead of inventing her own checklist
- What the CIS Benchmarks are, and why Level 1 (not Level 2) is the right fit for Hartwell
- How to scope a baseline down to exactly the checks that apply to four specific servers, instead
  of applying every possible setting everywhere
- What belongs on the checklist for each of the four servers from Lesson 1, and what doesn't

## Starting from a published standard, not a guess

Lesson 1 settled that "hardened" needs to mean something checkable, not a personal judgment
call. The industry-standard way to get that is the **CIS Benchmarks**, published by the Center
for Internet Security: a consensus-built, vendor-independent set of hardening recommendations
covering Windows Server, major Linux distributions, and dozens of other platforms. Each
benchmark is organized into **Level 1** (basic hardening with minimal impact on normal business
function) and **Level 2** (stricter "defense in depth" hardening that can affect compatibility).

Hartwell is a utility running production billing and outage-reporting systems — breaking a
vendor integration or an internal workflow during a first security project would cost more
credibility than it buys. Mara scopes to **CIS Benchmarks Level 1** for both Windows Server and
the Linux distributions in use. Level 2 is a reasonable future step once Level 1 is proven out
and the business has appetite for more friction — not something to reach for on day one.

## Scoping the checklist to four real servers

A full CIS Benchmark document runs hundreds of settings. Applying all of them to four servers on
a first project isn't realistic, and most of them don't even apply — a setting about Active
Directory domain trust relationships is irrelevant to a Linux web server. Scoping means picking
the subset that actually matters for *these* four machines:

**HRU-FILE01 and HRU-APP01 (Windows Server):**
- Account lockout and password policy — a baseline threshold for failed login attempts before an
  account locks, closing the same gap a phished credential could otherwise be brute-forced
  through.
- Disabling unused services — anything listening that isn't actually needed for the file share
  or the work-order application is one more thing an attacker could reach.
- Local administrator password rotation (LAPS-style) instead of a shared local admin password
  across both machines.
- Windows Firewall rules scoped to the Domain profile only, since both servers only ever talk to
  the network as domain members.

**hru-web01 and hru-db01 (Linux):**
- SSH hardening — no direct root login, no password authentication, only named accounts allowed
  to connect.
- `fail2ban` watching SSH on both boxes, since `hru-web01` in particular is internet-facing.
- `unattended-upgrades` (or the distribution's equivalent) so security patches land automatically
  instead of waiting on a manual patch cycle someone forgets to run.
- `ufw` firewall rules — only the ports each server actually needs are open at all.

## What's explicitly left off this checklist

Just as important as what's included is what Mara leaves out, and says so in writing:

- **CIS Level 2 settings** — more aggressive hardening that risks breaking the work-order
  application or vendor integrations Dale hasn't signed off on touching yet.
- **Settings for systems not in scope** — Hartwell runs far more than four servers; this
  checklist is deliberately a template proven on a representative handful, not a platform-wide
  rollout yet.
- **Antivirus/EDR deployment, vulnerability scanning, and patch-management tooling rollouts** —
  real, valuable follow-on work, but each is its own project with its own scope, not something to
  fold into this one silently.

## A concrete example: why scoping down is a strength, not a shortcut

If Mara brought Dale a 200-item checklist covering every CIS Level 1 and Level 2 setting for
every platform Hartwell owns, two things would happen: most of it wouldn't get implemented
correctly under time pressure, and Dale would have no way to tell which parts actually mattered
for *this* ask. A dozen specific, verified checks against four named servers, each with a command
to prove it landed, is something Dale can actually sign off on and trust.

## Key terms

| Term | Meaning |
|---|---|
| CIS Benchmarks | Vendor-independent, consensus-developed hardening standards published by the Center for Internet Security |
| CIS Level 1 / Level 2 | Level 1 is minimal-impact baseline hardening; Level 2 is stricter hardening that can affect compatibility |
| Scoped checklist | The subset of a full baseline standard that actually applies to the specific systems in a project |
| LAPS-style rotation | Managing local administrator passwords per-machine instead of sharing one password across servers |

## Lab

Write the checklist header for one of the four servers (your choice) exactly as it would appear
in the document Lesson 7 formalizes: server name, OS, CIS level applied, and the specific checks
that apply to it from the lists above.

## Check yourself

You're ready for Lesson 3 when you can explain why Mara chose CIS Level 1 over Level 2 for this
project, and why a scoped, dozen-item checklist against four named servers is a stronger
deliverable than a 200-item checklist nobody has time to fully verify.
