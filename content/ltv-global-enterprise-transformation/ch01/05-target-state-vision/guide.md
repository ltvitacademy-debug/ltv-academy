# Lesson 5 — Target-State Vision

**Chapter 1 · Scenario and Requirements · Lesson 5 of 33**

## What you'll learn

- How a target-state vision differs from a detailed design, and why you write the vision first
- LTV Global's target-state vision statement and the six capabilities it promises
- How the vision maps, one-to-one, onto the thirteen design areas this capstone builds out
- Why a vision has to be judged by whether it's achievable given Chapter 1's constraints, not just whether it sounds good

## A vision is a promise, not a blueprint

A **target-state vision** is a short, concrete statement of what the organization will be able to do once the transformation is complete — written before the detailed design, specifically so that every later design decision has something to be checked against. It is deliberately not a blueprint: it doesn't specify object names, sharing rules, or integration patterns. It specifies outcomes. If a vision statement is vague enough that almost any design could claim to satisfy it, it isn't doing its job. If it's so detailed that it's actually a solution design in disguise, it's being written too early, before the trade-off analysis in Chapters 2 through 4 has happened.

## LTV Global's target-state vision

> LTV Global will operate on a single, global Salesforce platform that gives every business unit a complete, real-time view of each customer and the equipment they own — regardless of which region or business unit originally touched that customer. Dealers and end customers will self-service the majority of routine requests through a modern portal. Internal users will sign in once, through the company's existing identity provider, to reach every tool they need. Data will flow automatically and reliably between Salesforce, the ERP, the financial system, and the data warehouse, with every integration's actual limitations (not an idealized version of them) accounted for in the design. The platform will scale cleanly to LTV Global's full user and customer population without the performance degradation the current landscape already shows signs of. And the whole solution will be governed, deployed, and maintained in a way that one engagement team member leaving doesn't put the system at risk.

## Six capabilities the vision commits to

Read closely, that vision statement commits the design to six specific, checkable capabilities: **unified customer view** across all four business units and three regions; **self-service** for dealers and end customers through a portal; **single sign-on** for the internal workforce; **reliable, automated integration** with the ERP, financial system, and data warehouse — explicitly *not* promising capabilities those systems don't actually have, per Lesson 4's constraints; **scale** to LTV Global's full population without degradation; and **sustainable governance** that survives staff turnover. Every one of these six becomes a thread this course pulls through specific later lessons — unified customer view through the data architecture in Lesson 8, self-service through the portal architecture in Lesson 16, single sign-on through identity architecture in Lesson 12, reliable integration through Lessons 13 through 15, scale through Lesson 10, and governance through Lesson 22.

## Why the vision has to respect the constraints, not ignore them

A weaker version of this vision might have promised "real-time integration with every system in the landscape" — and it would have been a worse vision for it, not a more ambitious one. Lesson 4 already established that LedgerPoint cannot do real time under any design. A vision statement that promises something a named current-state system structurally cannot deliver isn't aspirational, it's a design that's already set up to fail its own stated goal. That's why this vision explicitly says "every integration's actual limitations accounted for" rather than promising uniform real-time everywhere — it's committing to a solution that's honest about what it can deliver, which is exactly what survives an Architecture Review Board's questioning in Chapter 6 and what a vision that overpromises does not.

## Key terms

| Term | Meaning |
|---|---|
| Target-state vision | A short, outcome-level statement of what the organization will be able to do once the transformation is complete |
| Unified customer view | Seeing one complete picture of a customer and their equipment regardless of which business unit or region touched them |
| Self-service | Letting dealers and end customers complete routine requests themselves through a portal, without calling in |
| Sustainable governance | A governance model designed to survive individual staff turnover, not depend on one person's memory |

## Lab

Take the vision statement's sixth commitment — "governed, deployed, and maintained in a way that one engagement team member leaving doesn't put the system at risk" — and write two or three sentences describing what evidence an Architecture Review Board member would look for in Chapter 6 to decide whether this specific promise was actually kept, versus just stated. Be concrete: what would you expect to see in the governance model (Lesson 22) that would prove this commitment, rather than merely asserting it?

## Check yourself

Can you list the six capabilities LTV Global's target-state vision commits to, from memory? Can you explain why a vision that promised real-time integration with every current-state system would actually be a worse vision, not a more ambitious one, given what Lesson 4 established about LedgerPoint?
