# Lesson 13 — Change Advisory Board (CAB) Configuration

**Chapter 3 · Implementing Change Enablement · Lesson 13 of 32**

## What you'll learn

- What the CAB actually is: a real, recurring review body, not just an approval checkbox
- How the Change Calendar gives the CAB a visual view of what's scheduled
- How Conflict Detection flags scheduling risk before the CAB even meets
- Why a CAB approval stage with no supporting tooling is approval theater
- How these pieces fit together into one coherent CAB process

## The CAB is a body, not a button

Lesson 12 built a flow where Medium and High risk Normal changes route to a "CAB approval" stage. It's easy to read that as just another approval record, the same mechanism as manager approval. But the Change Advisory Board is a **real, recurring review body** — a standing meeting of stakeholders (change manager, representatives from affected teams, sometimes service owners) who actually look at upcoming changes together before they go live. The Flow Designer approval stage from Lesson 12 is how that body's decision gets recorded on the platform; it is not a substitute for the actual review happening. An instance where "CAB approval" is just one more rubber-stamp approval record, with no real meeting or review behind it, has configured the field but not the process.

## The Change Calendar: seeing what's coming

A real CAB needs to see what's scheduled, together, in one place — and that's exactly what the **Change Calendar** gives them. The Change Calendar is a visual, calendar-style view of scheduled changes across the instance, typically filterable by assignment group, CI, or risk. Instead of a CAB member reading through a list of individual change records one at a time, the Change Calendar lets the whole board see, at a glance, what's planned for a given week: which changes overlap in time, which fall inside or outside approved maintenance windows, and which cluster around the same systems. This is the real tooling that makes a CAB meeting productive instead of a slow read-through of tickets.

## Conflict Detection: risk surfaced before the meeting

The other real, built-in capability supporting CAB review is **Conflict Detection**. When a new change is scheduled, Conflict Detection checks whether its planned start and end time overlaps with another scheduled change that affects the **same Configuration Item** (or a CI with a defined relationship to it, depending on configuration). If it does, the platform flags a real scheduling conflict directly on the change record — surfacing exactly the kind of risk a CAB exists to catch, but doing it automatically, before the board even convenes. A well-implemented instance treats a flagged conflict as something the CAB must explicitly review and resolve (reschedule one of the two changes, or document why running them concurrently is actually acceptable) rather than something that gets silently approved anyway.

## Putting it together

A correctly implemented CAB process looks like this: a Medium or High risk Normal change reaches the CAB-approval stage from Lesson 12's flow. Before the board meets, Conflict Detection has already checked the change's schedule against every other change touching the same CI, and the Change Calendar gives the board a visual view of everything scheduled that week. The CAB reviews the change — informed by the risk value from Lesson 11, any flagged conflicts, and the calendar view — and only then does the Flow Designer approval record get resolved as approved or rejected. Every piece — risk, approval chaining, the calendar, conflict detection — is doing real work; none of it is decoration.

## Why this matters at implementation time

A common implementation gap is building the approval flow correctly but never configuring the Change Calendar or Conflict Detection, so the CAB meeting still happens as an unsupported read-through of tickets with no visual schedule and no automatic conflict flagging. The flow technically works, but the actual review the CAB is supposed to perform is left unsupported by the tools that would make it reliable. Implementing Change Enablement well means configuring all three pieces together, not just the approval chain.

## Key terms

| Term | Meaning |
|---|---|
| Change Advisory Board (CAB) | A real, recurring review body of stakeholders who review upcoming changes together before implementation |
| Change Calendar | A visual, calendar-style view of scheduled changes, letting the CAB see what's planned across the instance at a glance |
| Conflict Detection | A built-in capability that flags when a new change's schedule overlaps with another change affecting the same Configuration Item |
| Approval theater | An approval stage that exists on the platform but isn't backed by any real review process |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: what real risk does Conflict Detection surface before the CAB even meets, and why is a CAB-approval record with no Change Calendar or Conflict Detection behind it "approval theater"?
