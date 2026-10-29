# Lesson 17 — CIS Benchmarks for Linux in Practice

**Chapter 5 · Linux System Hardening Engineering · Lesson 1 of 4**

## What you'll learn

- What a CIS Benchmark actually is, and why it's a consensus document rather than one vendor's opinion
- The real difference between a Level 1 and a Level 2 profile, and how to choose between them
- How a single benchmark recommendation is structured — description, rationale, audit, remediation
- How an engineer actually works through a benchmark with a scanner, instead of applying it line by line by hand

## A consensus document, not one vendor's opinion

The **Center for Internet Security (CIS)** publishes **CIS Benchmarks**: free, versioned,
consensus-built hardening guides, each one worked out collaboratively by a community of
practitioners rather than written unilaterally by the OS vendor. A Benchmark exists for most
mainstream platforms — Ubuntu, RHEL/CentOS/Rocky, Debian, Amazon Linux, Windows, Docker,
Kubernetes, and the major cloud providers all have one. Each Benchmark is organized into numbered
sections that read like a table of contents for "everything that can go wrong on a default
install": initial setup (filesystem configuration, software updates, mandatory access control),
services, network configuration, logging and auditing, access/authentication/authorization, and
system maintenance (file permissions, user and group settings).

## Level 1 vs. Level 2: how strict is strict enough

Every recommendation in a CIS Benchmark is tagged with a **profile**: **Level 1** or **Level 2**.
Level 1 recommendations are broadly applicable — they have little to no impact on normal
functionality or performance, and CIS expects essentially every server and workstation to meet
them. Level 2 recommendations are "defense in depth": stricter, and more likely to reduce
functionality, break a legacy app, or add operational overhead, which is why they're reserved for
higher-security environments — systems handling regulated data, or subject to a framework like
PCI DSS. Choosing a profile is a real engineering decision, not a default to accept blindly: a
general-purpose app server usually targets Level 1 Server; a system holding cardholder data might
need Level 2.

## Anatomy of one recommendation

A single recommendation, e.g. **1.1.1.1 — "Ensure mounting of cramfs filesystems is disabled,"**
isn't just a sentence. It carries: a **Profile Applicability** tag (Level 1, Server and/or
Workstation), a **Description** and **Rationale** (cramfs support is legacy and rarely used, so
leaving it loadable is attack surface with no benefit), an **Audit** procedure (a command that
reports the current state, such as `modprobe -n -v cramfs`), a **Remediation** procedure (the
exact change to make — a line in `/etc/modprobe.d/`), references, and a mapping to the broader
**CIS Controls** framework. That structure — check first, then fix, then re-check — is what makes
the Benchmark something you can automate against, not just read.

## Working through a benchmark with a scanner

Nobody hand-applies a few hundred numbered recommendations one at a time. The real workflow runs
through a **scanner**: **CIS-CAT Pro** (CIS's own licensed tool) or **OpenSCAP** (open source,
using SCAP content such as the `scap-security-guide` project, which ships ready-made SCAP/XCCDF
profiles for many CIS Benchmarks). An engineer picks the profile (Level 1 Server, say), runs a
baseline scan, reviews the resulting pass/fail report, **triages** the failures (some findings
are genuine gaps; others are intentional exceptions — disabling IPv6 might break a required app),
remediates the real gaps, and re-scans to confirm the compliance score improved. Anything left
failing on purpose gets documented with a justification, because an auditor will ask for it.

## A concrete example

```
oscap xccdf eval \
  --profile xccdf_org.ssgproject.content_profile_cis_level1_server \
  --results results.xml --report report.html \
  /usr/share/xml/scap/ssg/content/ssg-ubuntu2204-xccdf.xml
```

On a fresh Ubuntu install this might score around 60% passing out of the box — cramfs still
loadable, SSH still permitting root login, auditd not yet configured. After working through the
report and remediating the real gaps, a re-scan might land at 95%, with the remaining 5%
documented as accepted risk because one legacy internal tool still needs a module the Benchmark
wants disabled. That score, and the paper trail behind it, is what a security engineer actually
delivers — not "we hardened the server," but a number and a documented reason for every point
still missing from 100.

## Key terms

| Term | Meaning |
|---|---|
| CIS Benchmark | A free, consensus-built hardening guide published by the Center for Internet Security for a specific OS or platform |
| Level 1 / Level 2 | Benchmark profile tiers — Level 1 is a broad, low-impact baseline; Level 2 is stricter defense-in-depth for higher-security environments |
| Recommendation | One numbered item in a Benchmark, with its own description, rationale, audit, and remediation steps |
| OpenSCAP / SCAP | An open-source scanner implementing the SCAP standard, used to automate Benchmark checks against XCCDF content |
| Compliance score | The percentage of a Benchmark's recommendations a scanned host currently passes |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why would an engineer
deliberately scan a general-purpose application server against a Level 1 profile instead of
Level 2, even though Level 2 is "more secure" by definition?
