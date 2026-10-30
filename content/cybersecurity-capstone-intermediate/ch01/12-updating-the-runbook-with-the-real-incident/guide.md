# Lesson 12 — Updating the Runbook with the Real Incident

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 12 of 16**

## What you'll learn

- Why a runbook is incomplete until it has at least one real worked incident inside it
- How to write up an incident as a worked example a future responder can actually follow
- What a specific standing control looks like, versus a vague "be more careful" note
- Why a control tied to a recurring process step outlasts a one-time fix

## A runbook with no real incidents in it is still theoretical

The IR runbook Mara wrote in Lesson 7 covers detection, triage, containment, and communication in
the abstract — useful, but untested against anything real. The firewall-rule incident just lived,
end to end: a correlation alert, a trace to a misconfigured rule, a root cause, a fix, and
validation. That's exactly the kind of worked example that turns a runbook from a document into a
reference people trust.

## Writing the worked example

Mara adds a new section to the runbook, structured the same way the runbook's own phases are, so a
future responder can match a similar alert to this pattern quickly:

- **Detection**: the Lesson 5 correlation rule fired on a sign-in from an unrecognized IP matching
  an RDP-allow event.
- **Triage**: `CommonSecurityLog` confirmed the connection was `Allow`, not a bypassed block;
  the rule-hit history identified `ALLOW-VENDOR-RDP-SUPPORT` as the match.
- **Root cause**: the rule was scoped to `198.51.0.0/16` instead of the vendor's documented
  `198.51.100.16/28` — a gap present since the rule's creation.
- **Remediation**: the rule was narrowed to the correct `/28` under a change ticket.
- **Validation**: a positive test from the vendor's real IP and a negative test from an address in
  the old range confirmed the fix.

## The standing control: more than "be more careful"

A worked example alone only helps the next time something looks like *this specific* incident.
What actually prevents the next version of this mistake is a new standing control, and Mara writes
one with two concrete parts rather than a general reminder:

1. **Per-change gate**: every firewall rule creation or scope change must include a documented
   source justification — a vendor's contracted range, a ticket reference — and a second
   person's review of the exact CIDR before the change goes live.
2. **Periodic review**: a recurring (not one-time) audit of existing rule scopes against their
   original justification, so a gap that predates the new gate still eventually surfaces.

## Why both parts, not just one

The per-change gate alone wouldn't have caught this rule — it was written before the gate existed.
The periodic review alone is slower and wouldn't stop a *new* mistake from going live in the
meantime. Together, one prevents new instances and the other catches anything already out there.
Lesson 15 leans on exactly this two-part control when Renee asks a harder question about it.

## Key terms

| Term | Meaning |
|---|---|
| Worked example | A real past incident written into a runbook in the runbook's own structure |
| Standing control | A specific, ongoing process change meant to prevent a recurrence |
| Per-change gate | A control applied at the moment of every relevant change |
| Periodic review | A recurring audit that catches existing gaps a gate wouldn't |

## Lab

Write the five-part worked-example entry (detection, triage, root cause, remediation, validation)
for this incident in your own words, short enough that a future on-call responder could read it in
under a minute.

## Check yourself

You're ready for Lesson 13 when you can name the two parts of the new standing control and explain
why neither one alone would have been enough.
