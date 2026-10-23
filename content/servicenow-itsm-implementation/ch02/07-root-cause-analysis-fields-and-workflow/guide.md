# Lesson 7 — Root-Cause Analysis Fields & Workflow

**Chapter 2 · Implementing Problem Management · Lesson 7 of 32**

## What you'll learn

- The three real fields that drive root-cause investigation on a Problem record: `cause_notes`, `fix_notes`, and `root_cause`
- How those fields divide "what we found" from "what we're doing about it"
- The real Problem state model: New, Root Cause Analysis, Fix in Progress, Resolved, Closed
- Why Problem's state model is deliberately slower than Incident's, not a sign of a worse implementation
- How to configure these fields so investigation notes stay useful instead of becoming noise

## Three fields, three distinct jobs

A Problem record's value comes almost entirely from how well its investigation is documented, and three fields carry that weight.

`cause_notes` is a journal field for documenting investigation findings as they develop — what's been tested, what's been ruled out, what pattern is emerging. It's meant to be updated incrementally, the same way an Incident's work notes get updated, except here the audience is anyone picking up this investigation later, possibly weeks later, not just the current shift.

`fix_notes` is a separate field reserved for the permanent fix once one is actually found and deployed. Keeping it separate from `cause_notes` matters: a reader should never have to scroll through weeks of investigative dead ends to find out what the actual resolution was. `cause_notes` is the story of the investigation; `fix_notes` is the answer.

`root_cause`, in many implementations, is configured as a reference field pointing at a `cmdb_ci` record (the specific configuration item — a server, a network device, a piece of software — that was actually at fault) or at a category value indicating the type of root cause. This turns "what broke" from a sentence buried in a notes field into a structured, reportable data point — which matters the moment you want to run a report answering "which CI has caused the most Problems this year."

## The real Problem state model

Incident's state model, which you covered in Course 2, is built for speed: New → In Progress → Resolved → Closed, optimized to get a user back to work quickly. Problem's state model looks similar on the surface but is built for a different goal:

```
New -> Root Cause Analysis -> Fix in Progress -> Resolved -> Closed
```

"New" is an unconfirmed Problem candidate, not yet confirmed as worth a full investigation. "Root Cause Analysis" is the state a Problem sits in — often for a long time — while `cause_notes` gets built up and the actual cause is identified. "Fix in Progress" means the cause is known and a permanent fix is being built, tested, or scheduled (frequently via a linked Change Request, which you'll implement in Chapter 3). "Resolved" means the fix has actually been deployed. "Closed" follows a review period, the same pattern as Incident.

## Why Problem is deliberately slower

This difference in pace isn't an implementation shortcoming — it's the entire design intent of Problem Management. Incident Management exists to restore service fast, even with an imperfect or temporary fix. Problem Management exists to find out why the disruption happened at all, which is inherently investigative work: testing hypotheses, ruling out causes, sometimes waiting on a vendor patch or a hardware replacement. A Problem can legitimately sit in "Root Cause Analysis" for weeks while dozens of Incidents keep getting opened, triaged fast, and closed with a workaround — that's the two processes doing their separate jobs correctly, not a sign either one is broken.

## Key terms

| Term | Meaning |
|---|---|
| `cause_notes` | Field documenting root-cause investigation findings as they develop |
| `fix_notes` | Field documenting the permanent fix once identified and deployed |
| `root_cause` | Reference field (often to `cmdb_ci` or a category) identifying what was actually at fault |
| Root Cause Analysis (state) | The Problem state where the cause is being actively investigated, often the longest-lived state |
| Fix in Progress (state) | The Problem state where the cause is known and a permanent fix is being built or scheduled |

## Check yourself

Without looking anything up: what's the practical reason `cause_notes` and `fix_notes` are kept as two separate fields instead of one combined notes field, and why does it matter that `root_cause` is often a reference field rather than free text?
