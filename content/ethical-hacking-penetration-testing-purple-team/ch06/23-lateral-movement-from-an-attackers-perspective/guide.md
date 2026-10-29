# Lesson 23 — Detecting Lateral Movement: What a SOC Watches For

**Chapter 6 · Post-Exploitation and Privilege Escalation · Lesson 3 of 4**

## What you'll learn

- What "lateral movement" means as a concept, without the
  operational tooling detail
- The detection signatures a SOC analyst actually watches for when it
  happens
- Why credential reuse, not a single clever step, is usually what
  makes lateral movement possible
- How this ties directly back to the KQL/Sentinel detection content
  from earlier in this path

## Lateral movement, defined

Lateral movement is simply: using the access and credentials gained
from one compromised host to reach additional hosts in the same
environment. It's rarely a single dramatic technique — it's usually
the same valid credential or trust relationship being reused
somewhere else it's also valid. That's exactly why it's detectable:
legitimate authentication infrastructure (Windows event logs, SIEM
correlation, EDR telemetry) already records every one of those
authentication events, whether they're a real IT admin logging into
three servers in a row or something else.

An authorized assessment demonstrates that a given credential's reach
extends further than it should (tying back to Lesson 21's "mapping
the scope of compromise") — but the operational value for this course
is in recognizing the signatures a defender uses to catch it, because
that defender role is exactly what Chapter 7's purple-team exercises
put you on the other side of.

## The detection signatures a SOC watches for

**The same account, many hosts, short window.** A single user account
authenticating to five different servers within a few minutes is
unusual for almost any real job function. Sentinel's sign-in and
authentication tables (covered in course 6) are built to surface
exactly this pattern.

**Authentication from an unexpected source.** A service account that
normally only authenticates from one application server suddenly
authenticating from a workstation is a strong signal — the kind of
baseline deviation a correlation rule is written to catch.

**Privileged account used somewhere it's never used.** A domain admin
account logging into a line-of-business laptop, rather than only
management infrastructure, breaks an expected pattern that a SIEM
watchlist or analytics rule can be built around.

**A spike in failed-then-successful authentication.** Repeated failed
logons immediately followed by a success, across multiple hosts, is a
classic signature — whether from credential guessing or a replayed
credential.

## Why credential hygiene is the real defense

Nearly every lateral-movement detection signature exists because an
identical, reusable credential crossed a boundary it shouldn't have.
This is why course 8's identity engineering content (unique local
administrator passwords, credential tiering, Privileged Access
Workstations) and this course's own Chapter 3 microsegmentation
content matter as much as detection does — the best lateral-movement
finding is one where there's nothing reusable left to move with.

## Key terms

| Term | Meaning |
|---|---|
| Lateral movement | Using credentials or access from one compromised host to reach additional hosts |
| Baseline deviation | An authentication pattern that breaks from a user or service account's normal, expected behavior |
| Credential tiering | Separating credentials by privilege level so a low-tier compromise can't reach high-tier systems |
| Correlation rule | A SIEM rule that fires when multiple related events match a known risky pattern |

## Check yourself

You're ready for Lesson 24 when you can describe, in your own words,
why lateral movement is usually a credential-reuse problem rather
than a single clever technique — and name at least two SIEM detection
signatures a SOC analyst would use to catch it.
