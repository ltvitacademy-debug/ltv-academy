# Lesson 16 — Measuring Hardening Effectiveness

**Chapter 4 · Windows System Hardening Engineering · Lesson 4 of 4**

## What you'll learn

- Why linking a baseline GPO is not the same thing as proving it actually applied
- How to confirm a setting actually landed on a specific machine, using real tools instead of assumptions
- What Secure Score-style metrics are good for, and what they don't actually prove
- Why real validation means a tabletop exercise or a red team, not just a passing compliance scan

## Deployed is not the same as applied

Chapter 4 has covered importing a baseline, customizing it, reducing attack surface with ASR
rules, and isolating credentials with Credential Guard and LSA Protection. None of that is proof
any of it is actually in effect on a given machine. **Concrete example:** a baseline GPO is linked
to an OU as planned, but a more specific GPO, linked to a child OU weeks later by a different
admin for an unrelated reason, happens to set one overlapping setting — and because of normal GPO
**precedence** rules, the newer, more specific GPO quietly wins on that setting for every machine
in the child OU. Nobody changed the baseline. Nobody got an error. The setting simply never
applied where it was supposed to, and the only way to know is to check the machine, not the GPO.

## Confirming what actually landed

The real check runs on the endpoint, not in GPMC. `gpresult /h report.html /f` generates an HTML
**Resultant Set of Policy (RSoP)** report on that specific machine, showing exactly which GPO won
each individual setting — the same "winning GPO" column that exposes the precedence problem above.
Microsoft's **Policy Analyzer** (part of the Security Compliance Toolkit) goes a step further,
diffing a GPO backup against the live local policy on a machine side-by-side, so a gap between
"what the baseline says" and "what's actually configured" shows up as a visible row, not a guess.

## Secure Score: useful trend, not proof

**Microsoft Secure Score** rolls hardening posture up into a single point total that improves as
recommended controls get enabled, and it's genuinely useful for tracking posture over time and
reporting progress to leadership in a number they can follow quarter over quarter. What it isn't:
proof that a specific control actually stops a specific attack technique on a specific machine. A
rising Secure Score can climb for months while one forgotten workstation, imaged before the
baseline existed, sits completely unprotected the entire time — the score has no way to see that.

## Real validation: tabletop exercises and red teams

A **tabletop exercise** walks stakeholders through a scenario step by step — "an attacker phishes
a helpdesk credential, then what?" — checking conceptually whether a control would hold, without
anyone actually touching a keyboard against a live system. A **red team** engagement goes further:
it actually attempts the technique against real, hardened systems. **Concrete example:** a red
team runs a Mimikatz credential-dumping attempt against 20 hardened workstations. On 18, Credential
Guard blocks it exactly as designed. On 2, the attempt succeeds — those two machines were imaged
before the baseline existed and never received the GPO, a gap neither the Secure Score nor a quick
glance at GPMC ever surfaced. That's what measuring hardening effectiveness actually means: a
compliance scan confirms the setting, and a red team or tabletop confirms the setting actually
stops something, and only the combination of both catches a gap like that for real.

## Key terms

| Term | Meaning |
|---|---|
| RSoP / gpresult | A report showing exactly which GPO won each setting on one specific machine |
| Policy Analyzer | An SCT tool that diffs a GPO backup against a machine's live local policy |
| Secure Score | A point-based metric tracking hardening posture over time — useful for trends, not proof of effectiveness |
| Red team / tabletop exercise | Live attack-emulation (red team) or scenario walkthrough (tabletop) validation that a control holds under real conditions |

## Check yourself

You're ready to move into Chapter 5 when you can explain, without looking: why did the red team's
credential-dumping test catch a real gap that neither the Secure Score nor confirming the GPO was
linked would have caught on its own?
