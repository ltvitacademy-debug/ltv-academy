# Lesson 26 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 26 of 26**

## What you'll learn

- A full, honest recap of everything Mara Voss built across all three
  Hartwell Regional Utilities capstone tiers — Beginner through
  Advanced — not just this final one
- Why the audit/SIEM discrepancy was this Advanced tier's real test,
  not a detour from the zero-trust and identity work surrounding it
- What a real security-engineering career path looks like from here,
  grounded in the roles and credentials this catalog's own Zero Trust
  and GRC courses point toward
- What a genuinely senior version of this program would still push
  further on

## Everything built, across all three tiers

| Tier | What it built, for Hartwell Regional Utilities |
|---|---|
| Beginner | A baseline security hardening pass across Windows and Linux servers, and Mara's first working Microsoft Sentinel detection rule, for IT Manager Dale Granger |
| Intermediate | Multi-source Sentinel ingestion (Windows, Linux, firewall), a cross-source correlation rule, a Conditional Access pilot, and Hartwell's first real incident-response runbook — reconciling Owen Mercer's operational-visibility ask with Renee Castellano's compliance ask, and fixing a real overly-broad firewall rule found along the way |
| Advanced | A zero-trust pilot on the OT/SCADA segment, consolidated Azure/AWS dual-cloud identity, Mara's Python privileged-access automation, a GRC risk register, a genuine audit/SIEM discrepancy found and fixed, a second segment's rollout negotiated between speed and control, and a final validation pass across all of it |

Every layer across all three tiers is the same kind of real, specific
work: real Sentinel rules, real Conditional Access policy, real AD
group queries, real break-glass grants, real validation gates — none
of it simulated or softened to make the story land.

## Why the discrepancy was the real test, not a detour

It would be easy to describe Lessons 11 through 19 as an unplanned
problem that interrupted the "real" zero-trust and identity work on
either side of it. That's backwards, the same way it would be backwards
for the data-analyst or cloud-engineer capstones' own discrepancies.
The entire reason Mara built a dual-check automation — checking group
membership *and* direct grants *and* SIEM telemetry, instead of
trusting one method — was to make catching a gap like this possible.
The audit and the automation were never going to perfectly agree by
accident; they were built to independently check the same thing so
that if they ever disagreed, something real would surface. In Lesson
15, something real did. That's not Chapter 1 going sideways — that's
Chapter 1's whole architecture doing exactly its job, once, for real.

## Where this points next, for a real career

This Advanced tier closes out the capstone sequence for Hartwell
Regional Utilities, and it closes it at the scale a real security
engineer's role actually reaches: dual-cloud identity, cross-team
stakeholder conflict, board-level reporting, and a genuine finding
that had to be investigated, not assumed away. The natural next steps
from here track the path this catalog's own **Zero Trust Enterprise
Security** and **Enterprise Security Architecture & GRC Risk
Management** courses build toward — deeper architecture review work
(assume-breach design, blast-radius thinking, workload identity),
formal GRC program ownership (SOC 2, ISO 27001, vendor risk,
board-level metrics), and the broader move several real practitioners
make from security engineer toward security architect or a GRC
leadership track. Relevant real-world credentials that commonly mark
that progression include Security+, CySA+, and — further along —
CISSP, though no certification substitutes for having actually done
work like the fix in Lesson 16 or the board defense in Lesson 21.

## What a genuinely senior version of this would still push further

This capstone deliberately scoped some things out:

- **Automated cross-tool reconciliation on a schedule** — a job that
  checks every privileged-access source against every other one
  continuously, instead of catching a discrepancy only when an audit
  and the automation happen to run close enough together to compare
- **Extending the corrected dual-check methodology to every segment
  at Hartwell**, not just the two covered in this capstone
- **A formal, org-wide break-glass policy** with automatic expiry
  built into the provisioning process itself, so a stale grant like
  the one in Lesson 16 structurally can't happen again, anywhere

Naming these honestly — real gaps, not failures — is itself part of
what this whole capstone has been teaching.

## Key terms

| Term | Meaning |
|---|---|
| Dual-check validation | Checking the same control two independent ways on purpose, so a real gap has a chance to be caught by disagreement |
| Security engineer → architect track | The real-world progression from building and operating specific controls toward designing and governing a program across an organization |

## Lab

1. Write a two-paragraph summary of this entire capstone sequence — all
   three tiers — as if explaining it to someone who has only seen the
   Beginner tier.
2. Pick one of the three "what's next" items above and sketch, in a
   few sentences, how you'd start building it for a real organization.

## Check yourself

This capstone — and Hartwell Regional Utilities' three-tier story — is
complete when you can explain, without notes, why the audit/SIEM
discrepancy was proof this program's dual-check architecture was
working, not evidence that something had gone wrong.
