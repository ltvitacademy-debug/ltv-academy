# Lesson 21 — Patch Management Fundamentals and Patch Tuesday

**Chapter 6 · Patch Management & Baseline Configuration · Lesson 1 of 4**

## What you'll learn

- Why the overwhelming majority of real-world breaches exploit vulnerabilities that already
  have a patch available, not brand-new "zero-day" flaws
- What "Patch Tuesday" actually is and why Microsoft settled on a monthly cadence
- The real tension between patching fast (closing the exposure window) and patching carefully
  (not breaking production), and how organizations manage both at once
- The basic lifecycle a patch goes through from release to full deployment

## Most breaches don't need a zero-day

It's tempting to picture attackers as constantly discovering brand-new, never-seen-before
vulnerabilities. In practice, most breaches don't require that at all. A huge share of
successful intrusions exploit **known, already-patched vulnerabilities** — flaws the vendor
fixed months or even years earlier, on systems that simply never got the update. Once a
vendor publishes a patch, the vulnerability it fixes becomes public knowledge (often with a
CVE identifier, covered in Lesson 24), and attackers can study exactly what the patch
changed to figure out how to exploit any machine that hasn't installed it yet. That's why
patch management is one of the highest-leverage things a Windows or Linux administrator does:
every unpatched machine is attack surface that's already been handed to the attacker in
writing.

## Patch Tuesday: a predictable monthly cadence

**Patch Tuesday** is Microsoft's long-standing practice of releasing the bulk of its security
updates on the **second Tuesday of every month**. Microsoft adopted this cadence so that IT
departments could plan around a known, predictable release schedule instead of being surprised
by updates arriving at random times — "the second Tuesday" is easy to put on a calendar and
build a testing and deployment process around. Microsoft does occasionally break from the
cadence with an **out-of-band patch**, released immediately outside the normal cycle, when a
vulnerability is severe enough — actively being exploited in the wild, for example — that
waiting for the next scheduled Tuesday would leave too wide a gap.

## The core tension: speed vs. stability

Patch Tuesday creates a well-known follow-on problem in the security community, sometimes
called **"Exploit Wednesday"**: once a patch ships, attackers (and security researchers) can
compare the patched files against the unpatched version — a process called patch diffing — to
figure out exactly what vulnerability was fixed, often within days. That creates real pressure
to deploy the patch everywhere as fast as possible, to close the window before that reverse
engineering turns into a working exploit against anyone still unpatched.

But deploying every patch to every machine the moment it's released carries its own risk:
updates occasionally conflict with a specific application, driver, or configuration and break
something in production — and a patch that takes down a hospital's scheduling system or a
factory's control software is its own kind of incident. So real organizations don't choose one
side of this tension; they manage both with a **staged rollout**.

## A concrete example: testing before deploying

A typical staged rollout looks like this: Patch Tuesday updates land, and rather than pushing
them to all ten thousand machines in the company immediately, an administrator first deploys
them to a small **pilot ring** — a handful of non-critical test machines and volunteer early
adopters. That pilot group runs the patched systems for a few days while IT watches for
application crashes, driver conflicts, or help-desk tickets. If nothing breaks, the same
updates roll out to the broader fleet on a set schedule, often within one to two weeks of the
original release — fast enough to close most of the exposure window, but not so fast that an
untested patch takes down the whole organization at once.

## Key terms

| Term | Meaning |
|---|---|
| Patch | A vendor-released update that fixes a specific bug or vulnerability |
| Patch Tuesday | Microsoft's practice of releasing most security updates on the second Tuesday of each month |
| Out-of-band patch | A patch released outside the normal monthly cycle because a vulnerability is too severe to wait |
| Exploit Wednesday | The informal term for attackers reverse-engineering a patch within days of its release to build an exploit against unpatched systems |
| Pilot ring / staged rollout | Deploying a patch to a small test group first, then to the broader fleet, to balance speed against stability |

## Check yourself

Why would an attacker specifically target machines that haven't yet installed last month's
Patch Tuesday updates, rather than spending time hunting for a brand-new, unknown
vulnerability?
