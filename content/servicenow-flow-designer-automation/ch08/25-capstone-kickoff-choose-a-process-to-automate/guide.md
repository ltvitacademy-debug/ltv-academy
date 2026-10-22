# Lesson 25 — Capstone Kickoff: Choose a Process to Automate

**Chapter 8 · Capstone: Automating a Real Business Process · Lesson 25 of 27**

## What you'll learn

- How to frame a real, specific business process as a flow — not a generic example
- The capstone scenario you'll build across these three lessons: Contractor Offboarding
- How to choose between a Record trigger and a Scheduled trigger for a process with a *deadline*, not just an *event*
- How to sketch a flow's high-level structure on paper before opening Flow Designer

## The scenario: Contractor Offboarding

Every chapter so far has taught one mechanism at a time — a trigger here, an
If/Else there, an approval in its own lab. A real admin never gets a request
that clean. Someone in HR or IT Operations says: "We need contractors'
access shut off automatically when their contract ends, and right now
someone has to remember to do it by hand." That's your capstone.

The company is mid-size. Contractors are tracked on a `contractor` table
(or a custom table that extends `sys_user` — either is realistic) with
fields including `end_date`, `contractor_type` (IT contractor vs. non-IT
contractor), `manager`, and `active`. When a contractor's end date arrives,
three things need to happen: their system access gets revoked, their
manager needs to confirm their equipment was returned, and IT needs a task
to actually disable the account. Right now, all three happen only if
someone remembers — which is exactly the kind of manual, inconsistent
process Flow Designer exists to replace.

## Choosing the trigger: Record vs. Scheduled

Lesson 3 covered both trigger types in isolation. This is where the choice
actually matters. A **Record trigger** fires the instant a record is
inserted or updated — it's built for *events*: a ticket gets created, a
field changes right now. But "a contractor's end date arrives" isn't an
event that updates a record at that moment — the `end_date` field was set
weeks ago when the contractor was onboarded. Nothing changes on the record
the day it actually matters.

That's a **Scheduled trigger** problem. The flow runs on a recurring
schedule — once daily, early morning, before business hours — and asks a
question: "which contractor records have an `end_date` of today (or
tomorrow, if you want a day's lead time) and are still `active`?" The
scheduled trigger's query does the finding; the flow does the acting. This
is the same pattern Lesson 3's scheduled-trigger example used for anything
that depends on *time passing* rather than *someone clicking save* —
expiring approvals, overdue tasks, and now, offboarding dates.

## Sketching the flow before building it

Before opening Flow Designer, write the shape of the flow in plain steps —
this is the design work that makes Lesson 26's build go fast instead of
becoming trial and error inside the canvas:

1. **Trigger**: Scheduled, daily, querying the contractor table for
   `end_date` = today and `active` = true.
2. **Branch**: If/Else on `contractor_type`, because IT contractors and
   non-IT contractors have different systems to revoke access from.
3. **Revoke access**: a reusable step that works no matter which branch
   got there — a strong signal this belongs in a subflow, not inline logic
   (Lesson 13's exact test for "should this be a subflow").
4. **Manager confirmation**: an approval step so equipment return doesn't
   get missed just because the system access was handled.
5. **IT task**: a concrete, assigned record so someone is accountable for
   actually disabling the account, not just a notification that could be
   ignored.

Notice this sketch doesn't yet specify *how* each step works inside Flow
Designer — that's deliberate. Chapter 1 through Chapter 7 already taught
you every mechanism this flow needs. The capstone's real skill is
sequencing them correctly for a scenario nobody handed you pre-solved.

## Why this process, specifically

A weaker capstone choice would be something trivial — auto-closing a
ticket, say — that doesn't need branching, a subflow, or an approval to
prove it works. Contractor Offboarding earns its place as a capstone
because it genuinely needs four of this course's core mechanisms working
together: a time-based trigger, conditional branching, a reusable subflow,
and an approval gate. If you're following along on your own PDI, you can
build this with a simple custom table with just the fields named above —
the mechanics transfer to any real offboarding process you'll meet on the
job.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled trigger | Runs a flow on a recurring schedule, querying for records that match a condition — built for time-based processes, not record-change events |
| Trigger condition | The filter a scheduled trigger's query uses to find the right records (e.g., `end_date` = today) |
| Contractor type branch | The If/Else decision point that routes IT vs. non-IT contractors to different access-revocation logic |
| High-level flow sketch | The plain-language list of steps written before opening Flow Designer, so the build follows a plan instead of trial and error |

## Check yourself

Before moving to Lesson 26: why wouldn't a Record trigger on the
contractor table work for this process, even though the `end_date` field
lives on that exact record? What has to be true about a process for a
Scheduled trigger to be the right call instead?
