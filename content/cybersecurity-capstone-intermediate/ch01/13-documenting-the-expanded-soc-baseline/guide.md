# Lesson 13 — Documenting the Expanded SOC Baseline

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 13 of 16**

## What you'll learn

- Why a single baseline reference doc matters once a SOC has more than one moving piece
- What belongs in a baseline doc versus what belongs in a runbook
- How to describe a security control concisely for someone reading it cold
- Why documenting the incident here is a different job from documenting it in the runbook

## Why one more document, on top of the runbook

By this point, Hartwell's SOC has grown past what any one person holds in their head: three log
sources feeding Sentinel, a correlation rule, a Conditional Access pilot, a firewall rule that just
got corrected, and a runbook with a new worked example and control inside it. The runbook answers
"what do we do when something happens." Nothing yet answers the simpler, more constant question:
**"what does our environment actually look like right now?"** That's a baseline doc's job, and
Mara writes one.

## What the baseline doc covers

Mara keeps it to four sections, each describing current state rather than a procedure:

- **Ingestion**: which sources feed Sentinel today — Windows Security events, Linux auditd/syslog,
  and firewall `CommonSecurityLog` — and the correlation rule from Lesson 5 that spans them.
- **Identity**: the Conditional Access pilot policy from Lesson 6, what it currently enforces and
  for which pilot group.
- **Network**: the corrected `ALLOW-VENDOR-RDP-SUPPORT` rule, its real scope (`198.51.100.16/28`),
  and a pointer to the change ticket that fixed it.
- **Response**: a pointer to the IR runbook, now including the worked example and the new
  per-change-gate-plus-periodic-review control from Lesson 12.

## Baseline doc versus runbook: a real distinction

These two documents answer different questions, and conflating them makes both worse. The
baseline doc is a **snapshot** — it describes what's true right now, and it goes stale the moment
something changes, which is fine, because updating it is routine maintenance. The runbook is a
**procedure** — it describes what to do when something happens, and it stays useful across many
different incidents without needing to change every time the environment does. The incident itself
lives in the runbook's worked-example section, not here; the baseline doc only notes that the
firewall rule is now correctly scoped, not the story of how it got that way.

## Writing for someone reading cold

The test Mara uses while writing: could a new hire who's never seen this environment read this
doc and understand, in five minutes, what exists and roughly why — without needing to ask her
directly? That standard is what keeps the doc short and current-state-only, rather than turning
into a second runbook or a second incident report.

## Key terms

| Term | Meaning |
|---|---|
| Baseline documentation | A reference doc describing an environment's current security posture |
| Snapshot vs. procedure | A baseline doc describes current state; a runbook describes what to do when something happens |
| Current-state-only | Writing style that avoids re-telling incident history already covered elsewhere |

## Lab

Outline the four sections of a baseline doc (ingestion, identity, network, response) for your own
lab environment, one or two sentences per section, written so a reader who's never seen your setup
could follow it.

## Check yourself

You're ready for Lesson 14 when you can state the functional difference between this baseline doc
and the runbook from Lessons 7 and 12 in one sentence.
