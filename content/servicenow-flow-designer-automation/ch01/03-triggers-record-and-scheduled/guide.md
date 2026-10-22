# Lesson 3 — Triggers: Record & Scheduled

**Chapter 1 · Flow Designer Fundamentals · Lesson 3 of 27**

## What you'll learn

- The two real trigger types Flow Designer offers, and what each one actually watches
- How a Record trigger's condition narrows down which records fire the flow
- How a Scheduled trigger compares to the Scheduled Jobs you've already seen on the platform
- The real decision rule for choosing between the two when you design a new flow
- Why getting the trigger wrong is the most common way a new flow misbehaves

## Every flow starts with exactly one trigger

Lesson 2 established that every flow is one Trigger followed by a sequence of Actions. The Trigger is the single most consequential choice you make when designing a flow, because it determines not just when the flow runs, but how often, and on what. Flow Designer gives you two real trigger types to choose from: the Record trigger and the Scheduled trigger. Get comfortable distinguishing these two before you ever open the flow canvas, because choosing the wrong one is the single most common reason a new flow either never fires or fires far more often than intended.

## The Record trigger: react to something happening

A Record trigger fires when a record on a chosen table changes in a specific way: Created, Updated, or Created or Updated, with an optional additional setting to also fire on Delete. You pick the table first — Incident, Change Request, any table in the instance — and then, critically, you narrow it with a condition, using the exact same condition-builder pattern you already used for Business Rules and ACLs in earlier courses in this path. Without a condition, a Record trigger set to "Created" on the Incident table fires on every single new Incident, which is rarely what you actually want. Add a condition — Priority is Critical, or Category is Hardware — and the trigger only fires when a record actually matches that condition at the moment it's created or updated. The record trigger is how you make a flow reactive: it exists to respond to something happening in the data, the same instinct you built configuring Business Rules, just expressed through Flow Designer's condition builder instead of a script.

## The Scheduled trigger: run on a timer, not a reaction

A Scheduled trigger doesn't watch for a record change at all — it fires on a time-based schedule you configure: daily at a set time, weekly on a chosen day, or on a repeating interval. This should feel familiar: it's the same underlying idea as the Scheduled Jobs you configured in an earlier course, just expressed natively inside Flow Designer instead of as a separate scheduled script. A Scheduled trigger is the right choice for automation that isn't reacting to anything in particular — a nightly cleanup flow that closes out stale Catalog tasks, a weekly digest flow that emails a manager a summary of their team's open Incidents, a batch flow that runs through every record matching a condition once a day rather than reacting to each one individually as it changes.

## The decision that actually matters

The real design question, every time you start a new flow, is: should this run because something just happened, or because a fixed amount of time has passed? If the business requirement sounds like "when a Change Request gets approved..." or "as soon as a new Incident comes in with Priority Critical...", that's a Record trigger — something happened, and the flow needs to react immediately. If the requirement sounds like "every morning at 7am..." or "once a week, send a summary of..." — that's a Scheduled trigger, because nothing specific triggered it; time simply passed. Mixing these up produces real, visible problems: using a Scheduled trigger for something that should react immediately means a real-time request sits unprocessed until the next scheduled run; using a Record trigger for something that should be periodic means you're trying to force a reaction out of data that didn't actually change.

## Key terms

| Term | Meaning |
|---|---|
| Record trigger | Fires when a record on a chosen table is Created, Updated, Created or Updated, or optionally Deleted |
| Trigger condition | The condition-builder filter that narrows a Record trigger to only the records that should actually fire it |
| Scheduled trigger | Fires on a time-based schedule (daily, weekly, interval) rather than reacting to a record change |
| Scheduled Job | The platform-level scheduled script concept from an earlier course; the Scheduled trigger is Flow Designer's native equivalent |

## Check yourself

You're ready for Lesson 4 when you can decide, for any new automation request, whether it needs a Record trigger or a Scheduled trigger — and explain why using the wrong one would cause a real, visible problem.
