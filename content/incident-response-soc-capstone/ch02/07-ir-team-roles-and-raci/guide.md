# Lesson 7 — IR Team Roles and RACI

**Chapter 2 · Preparation: Building an IR Plan · Lesson 7 of 32**

## What you'll learn

- The real, standard RACI model — Responsible, Accountable, Consulted, Informed — and why it
  exists to remove ambiguity, not add bureaucracy
- The core IR team roles: Incident Commander, technical lead, communications lead, and
  legal/compliance liaison
- The critical difference between Responsible (who does the work) and Accountable (who owns
  the decision), and why collapsing the two causes real problems
- Why ambiguity about who decides what, during a live incident, is actively dangerous

## RACI: a standard way to kill ambiguity

**RACI** is a model used across many fields, not just security, to map every major decision or
activity to specific people: **Responsible** (does the work), **Accountable** (owns the decision
and answers for the outcome — there should be exactly one Accountable person per item, not
several), **Consulted** (gives input before the decision is made), and **Informed** (told after
the fact, no input expected). Applied to an incident response team, RACI answers a question that
sounds simple but causes real damage when it's left unanswered: during a live incident, who
actually gets to decide?

## The core IR team roles

- **Incident Commander (IC)** — holds overall decision authority for the incident. Coordinates
  the team, makes the final call on major decisions (contain now vs. wait, escalate vs. don't),
  and is usually the single Accountable party for the incident as a whole.
- **Technical lead** — leads the hands-on investigation, containment, and eradication work.
  Usually Responsible for the technical steps the IC is Accountable for.
- **Communications lead** — manages both internal updates (exec briefings, status reports) and,
  when needed, external communication (customers, press), so technical staff aren't improvising
  public statements mid-incident.
- **Legal/compliance liaison** — advises on notification obligations, attorney-client privilege,
  and evidence handling, and is Consulted before decisions with legal exposure.

## Why collapsing Responsible and Accountable is dangerous

It's tempting to treat "who's doing the work" and "who's deciding" as the same question. They
aren't, and a live incident is exactly where that distinction matters most. If it's unclear who's
Accountable, multiple people may independently believe *they* have the authority to make a
major call — like paying a ransom, taking a production system offline, or talking to a reporter —
and take conflicting action at the same time. A RACI matrix prevents that by assigning exactly one
Accountable name to each major decision type, decided and written down before any incident, not
negotiated live.

**Concrete example:** the decision "take a production system offline for containment." The
technical lead is **Responsible** — they execute the isolation. The Incident Commander is
**Accountable** — they weigh the business impact and give the go-ahead. Legal is **Consulted**
first, since taking a system offline might affect evidence preservation or a contractual uptime
obligation. The CEO is **Informed** afterward — told what happened, not asked to approve it in
real time. Without that matrix, the technical lead might isolate the system on their own
authority, while the CEO is simultaneously telling someone else to keep it running — a direct
conflict that a RACI matrix exists specifically to prevent.

## Key terms

| Term | Meaning |
|---|---|
| RACI | A model mapping each decision or activity to who is Responsible, Accountable, Consulted, and Informed |
| Incident Commander (IC) | The role holding overall decision authority during an incident; usually Accountable for the incident as a whole |
| Responsible | Who actually performs the work for a given decision or task |
| Accountable | Who owns the decision and answers for the outcome — exactly one person per item |
| Communications lead | The role managing internal and external messaging during an incident |

## Check yourself

Using the "take a production system offline" example: what specifically goes wrong if the
Incident Commander and the technical lead both believe they are Accountable for that decision?
