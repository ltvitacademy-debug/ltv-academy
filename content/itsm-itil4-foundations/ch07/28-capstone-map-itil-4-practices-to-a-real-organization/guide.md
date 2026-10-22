# Lesson 28 — Capstone: Map ITIL 4 Practices to a Real Organization

**Chapter 7 · Applying ITIL 4 on a Real Platform · Lesson 28 of 28**

## What you'll learn

- How to recognize which ITIL 4 practice applies to a specific, messy, real-world IT situation
- Why a single organization's day-to-day operations typically touch most of the practices from Chapters 4-6 at once, not one at a time
- How to distinguish a true problem-management situation from a string of unrelated incidents
- How continual improvement closes the loop on everything else in this scenario
- Where your own reasoning may differ from the mapping given here, and why that's fine

## The organization

Meridian Health Partners is a mid-size healthcare administration company — about 2,000 employees across a headquarters and six regional offices, running a mix of claims-processing software, a patient-scheduling system, and standard office IT (email, VPN, laptops). IT has a 12-person service desk, a small infrastructure team, and a change manager who also chairs a monthly Change Advisory Board. It's late in the year, and finance has just declared the organization's annual **change freeze** from December 15 through January 2, to keep year-end close stable. Here's what's actually landing on IT's desk during an ordinary week in that stretch — map each situation to the ITIL 4 practice (or practices) that own it before reading the mapping below.

## The situations

**Situation 1.** A regional office calls in: three employees in one building can't log in to the claims system. The VPN gateway for that region is timing out. This is the fourth time this specific gateway has done this in two months.

**Situation 2.** An employee submits a form asking for a new laptop, since theirs is being handed down to a new hire starting Monday.

**Situation 3.** A vendor patch needs to go onto the patient-scheduling system to fix a security flaw — but it's December 18, inside the change freeze.

**Situation 4.** A new support technician keeps escalating simple password resets to second line instead of resolving them at first contact, because nobody told her where the step-by-step article lives.

**Situation 5.** After the freeze ends, the change manager pulls three months of incident data and notices the VPN gateway failures account for a disproportionate share of all logged tickets in that period.

## Mapping it out

**Situation 1** starts as an **incident** — restore access for those three employees now, by whatever means works (a gateway restart, a failover). But "the fourth time in two months" is also a flag for **problem management**: a pattern of recurring incidents against the same configuration item is exactly what problem management exists to investigate, so a problem record should open alongside the incident, aimed at root cause rather than just restoration. The CMDB's dependency mapping (Lesson 23, applied via the platform in Lesson 26) is what lets whoever investigates see every service riding on that one gateway.

**Situation 2** is a **service request**, not an incident — nothing is broken. It belongs in the Service Catalog as a standard, pre-approved fulfillment workflow (provision a laptop, image it, ship it), separate entirely from the incident queue.

**Situation 3** is a **change enablement** question, and specifically a hard one: a normal change would ordinarily route through the CAB, but a freeze and a security patch are in direct tension. This is exactly the scenario ITIL 4's change enablement practice anticipates with an **emergency change** path — a faster-moving, still-authorized route for changes that can't wait, even during a freeze, precisely because an unpatched known vulnerability is itself a risk the freeze was never meant to protect.

**Situation 4** points to **knowledge management**, not a training failure to shrug off. If a step-by-step article for password resets exists but a new technician doesn't know it's there, the gap is in how knowledge is surfaced and onboarded into, not in the technician. It's also a **service desk** practice question: is first-contact resolution actually measured and reinforced here, or is escalating the path of least resistance?

**Situation 5** is **continual improvement** closing the loop: use data already being captured (incident records, tagged by configuration item) to find a pattern, then decide whether the fix is a capacity upgrade, a hardware replacement, or a different network path for that region — turning a recurring pain point into a planned improvement rather than letting it resurface next quarter.

## What ties it together

Notice that service level management and asset management were quietly present throughout, even without their own numbered situation: every one of these tickets runs against SLA timers that determine escalation urgency, and the laptop in Situation 2 is tracked through its lifecycle by IT asset management from the moment it's ordered to the moment it's retired. A real week at a real organization doesn't hand you practices one at a time, labeled — it hands you a pile of tickets, and recognizing which practice (often more than one) actually owns each one is the whole skill this course has been building toward.

## Check yourself

Pick one situation above where you'd have made a different call than the mapping given here — which practice would you have applied instead, and what about the scenario's details changes your answer? There's no single correct alternative; the goal is being able to defend your reasoning the same way the mapping above defends its own.
