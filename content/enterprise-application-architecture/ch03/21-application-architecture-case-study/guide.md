# Lesson 21 — Application Architecture Case Study

**Chapter 3 · Application Architecture Practice · Lesson 21 of 25**

## What you'll learn

- A single, realistic scenario walked through this course's full solution design sequence end to end
- How individually-sound decisions at each step compound into a coherent overall design
- Where a plausible team would be tempted to cut corners, and what that would have cost
- How to read a finished design and reconstruct the reasoning behind each major choice

## The scenario

A mid-size equipment-rental company, "Harborline Rentals," wants an internal application to manage **equipment maintenance requests**: field technicians report equipment problems, a dispatcher assigns a technician to investigate, the technician logs findings and either resolves the issue or escalates it for a part order, and a manager needs visibility into open requests by equipment type and urgency. This is a realistic, mid-complexity request — big enough to exercise every step of Lesson 15's sequence, not so large that it's unworkable as a single worked example.

## Walking the sequence

**Requirements intake (Lesson 2).** Functional: technicians submit requests with equipment, problem description, and urgency; dispatchers assign technicians; technicians log resolution or escalate for parts; managers see an aggregate view. Non-functional: technicians will submit requests primarily from the Salesforce mobile app in the field, often with poor connectivity; the company expects roughly 50–80 requests a day across its fleet. Constraint: go-live is tied to the start of the company's busy season, eight weeks out, and there's no budget for a dedicated developer beyond a part-time admin.

**Domain modeling (Lesson 3).** Entities: Equipment, Maintenance Request, Technician, Part Order. A Maintenance Request belongs to one Equipment (one Equipment can have many Requests over its life); a Request is assigned to one Technician at a time; a Request can generate zero or one Part Order if escalated. Lifecycle: Submitted → Assigned → In Progress → Resolved or Escalated → (if Escalated) Awaiting Parts → Resolved.

**Cloud/feature fit and boundary (Lessons 7, 4).** No existing cloud models this well out of the box; Service Cloud's Case object is tempting but its lifecycle and audience (customer-facing support) don't match an internal equipment-maintenance workflow closely enough to force the fit. This becomes its own bounded application on the core Platform, owned by Operations, not bolted onto an existing Field Service app that has a different owner and audience.

**Data model (Lesson 16).** Equipment maps to a custom object (the standard Asset object was considered but didn't carry the rental-specific fields Harborline tracks); Maintenance Request is a new custom object with a master-detail relationship to Equipment (a Request has no independent meaning without its Equipment) and a lookup to Technician (a Technician's record shouldn't be affected by a Request being deleted). Part Order is a lookup from Maintenance Request, since a Part Order can plausibly need to exist and be tracked even if the originating Request record's details change.

**Automation and UI (Lessons 17, 18).** Given the eight-week timeline and part-time-admin maintenance constraint, automation stays declarative: record-triggered Flows handle status transitions, assignment notifications, and the escalation-to-Part-Order creation. No Apex is introduced — the complexity factors from Lesson 5 don't clear the bar here. UI is a Lightning record page built from standard components for the desktop dispatcher view, with mobile-first attention specifically on the technician's request-submission screen, since that's the one most used in the field with poor connectivity.

**Quality attribute and review pass (Lessons 8–14, 20).** At 50–80 requests a day, data volume is modest for years — scalability risk is low, explicitly noted as such rather than over-engineered for. The eight-week deadline is itself a documented, deliberate technical-debt decision: a manager-visibility dashboard was descoped to a simple list view for launch, with a note that a proper dashboard is planned for a follow-up phase — written down, not silently dropped.

## Where corners could have been cut, and what it would have cost

A less disciplined team might have skipped domain modeling and built directly on Case, discovering months later that Case's support-oriented lifecycle fields didn't match the maintenance workflow and required awkward workarounds. Or they might have built the full manager dashboard inside the eight-week window by cutting mobile-first design for the technician screen — exactly backwards, given that field submission from poor-connectivity mobile use was the non-functional requirement most likely to cause real daily friction if it was wrong.

## Key terms

| Term | Meaning |
|---|---|
| Case study | A single realistic scenario used to exercise the full solution design sequence end to end |
| Descoped feature | A requirement deliberately deferred to a later phase, documented as a known trade-off rather than silently dropped |

## Lab

Harborline's business now adds one more requirement after this design was already reviewed: Part Orders need to be visible to an external vendor who will fulfill them, not just internal staff. Using this lesson's case study as your baseline, walk through which earlier decision(s) this new requirement would force you to revisit (consider: application boundary, cloud/feature fit, and data model), and propose a specific adjustment for at least one of them.

## Check yourself

Can you walk through Harborline's case study from requirements intake to review, stating the single most important decision made at each step and why? Can you identify, in your own words, which part of this design was the deliberate technical-debt trade-off, and explain why it was documented rather than silently dropped?
