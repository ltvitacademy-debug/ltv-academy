# Lesson 14 — Presenting to the IT Director and Compliance Officer

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 14 of 16**

## What you'll learn

- How to present completed scope and a real internal mistake in the same meeting, honestly
- Why leading with the fix builds more trust than a narrative that buries it would
- How to frame the same facts differently for an IT Director versus a Compliance Officer in the same room
- What not to do when presenting a misconfiguration your own team caught and fixed itself

## One meeting, both stakeholders

Owen Mercer and Renee Castellano asked for this buildout together back in Lesson 1, and Mara
presents the results to both of them together now, rather than running two separate
conversations. That matters: the firewall incident touches both of their concerns at once — it's
an operational detail Owen cares about and a control failure Renee cares about — and splitting the
story across two meetings would let each of them hear only half of it.

## The four-part structure

Mara structures the presentation in a fixed order, deliberately not saving the incident for the
end as an afterthought:

1. **What was delivered** — multi-source Sentinel ingestion across Windows, Linux, and firewall
   logs; the Conditional Access pilot; the first IR runbook.
2. **The real incident** — the 3 AM correlation alert, stated plainly, with the timeline.
3. **The root cause** — the firewall rule's scope, `198.51.0.0/16` instead of the vendor's real
   `198.51.100.16/28`, found and confirmed before anyone outside the SOC knew about it.
4. **The fix and the new control** — the rule corrected and validated, plus the two-part standing
   control from Lesson 12 that makes a repeat less likely.

## Leading with the fix, not burying it

The instinct under pressure is to minimize a mistake or soften it with qualifiers. Mara does
neither. She states what happened, in the order it happened, including the part where the gap had
existed since the original setup. The reason this works: **the SOC the team just built is what
caught this in the first place.** Presenting the incident candidly isn't admitting the buildout
failed — it's demonstrating that it worked exactly as intended.

## Framing the same facts for two different roles

Owen and Renee hear the same four-part story, but Mara adjusts emphasis for each without changing
any fact:

- For **Owen**, the technical shape matters most — which rule, which log source caught it, what
  changed operationally, and what it means for the vendor relationship going forward.
- For **Renee**, the control story matters most — what gap existed, what evidence confirms it's
  fixed, and what standing process now exists so this is checkable later, not just promised.

## What not to do

Don't present the incident as someone else's fault, don't over-apologize in a way that undercuts
confidence in the fix, and don't gloss past the root cause with vague language like "a config
issue was found and resolved." Specificity — the actual CIDR values, the actual timeline — is what
makes the presentation credible instead of merely reassuring.

## Key terms

| Term | Meaning |
|---|---|
| Joint stakeholder presentation | Presenting the same facts to multiple stakeholders together rather than separately |
| Leading with the fix | Structuring disclosure so the resolution is presented as part of the same story, not held back |
| Role-based framing | Adjusting which facts get emphasis per audience, without changing any fact itself |

## Lab

Draft the four-part structure (delivered / incident / root cause / fix and control) for this
presentation in your own words, and write one sentence each on how you'd adjust emphasis for an
operations-focused listener versus a compliance-focused listener.

## Check yourself

You're ready for Lesson 15 when you can explain why leading with "we caught and fixed this
ourselves" lands differently than a stakeholder discovering the same gap independently later.
