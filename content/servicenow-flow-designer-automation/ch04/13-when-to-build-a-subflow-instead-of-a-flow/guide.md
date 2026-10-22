# Lesson 13 — When to Build a Subflow Instead of a Flow

**Chapter 4 · Subflows & Reuse · Lesson 13 of 27**

## What you'll learn

- What a Subflow actually is on the platform, and how it's stored differently from a top-level Flow
- The one real test for deciding "subflow or flow": where does the logic get triggered from?
- Why duplicating the same logic across multiple flows creates a maintenance problem
- A concrete example of logic that belongs in a subflow, and why
- When a top-level Flow is still the right call, even in a mature instance

## A Subflow is a flow record, with one flag flipped

Under the hood, a Subflow lives in the exact same table as a regular Flow — `sys_hub_flow` — with a type flag marking it as a subflow instead of a flow. That matters because it tells you what a subflow is *not*: it is not a separate kind of object with its own canvas language, its own trigger types, or its own action palette. It's ordinary Flow Designer logic — triggers, actions, If/Else, For Each, all the things covered in Chapter 2 and Chapter 3 — built with one structural difference. A top-level Flow starts with a Trigger: a record being created or updated, or a schedule firing. A Subflow has no trigger of its own. It never runs on its own. It only runs when something else — a Flow, or another Subflow — calls it.

## The real decision test

Here's the question that actually decides it, every time: **does this logic need to run directly off a record event or schedule, or does it need to run from inside other automation you're already building?**

If the answer is "it reacts directly to something happening in the platform" — a record created, a field changing, a nightly schedule — build a top-level Flow. It needs a Trigger, and only a Flow has one.

If the answer is "this same sequence of steps needs to happen from more than one place" — called after different triggers, in different flows, maybe at different points in each one — build a Subflow. You write the logic once, and every flow that needs it calls it by name instead of re-building it.

## Why duplication is the problem subflows solve

Picture three flows already built in an instance: an employee onboarding flow, an offboarding flow, and an equipment-request flow. All three, at some point, need to do the same thing — notify a manager that a decision is needed, and log whatever that manager decides onto the record. If you build that notify-and-log logic natively, inline, inside each of the three flows, you now have the same five or six steps pasted in three places. The first time someone needs to change the notification wording, or add a reminder step, or fix a bug in how the decision gets logged, they have to find and update it in three separate flows — and it is extremely easy to update two of the three and forget the third. That's not a hypothetical risk; it's the normal failure mode of copy-pasted automation logic on any platform, ServiceNow included.

Extract that same logic into a single Subflow — call it "Notify and Log Manager Decision" — and all three flows call it instead of containing it. The logic now lives, and gets maintained, in exactly one place. Fix it once, in the subflow, and all three calling flows pick up the fix immediately, with zero changes to any of them.

## When a top-level Flow is still correct

Subflows are not automatically "more advanced" or "more correct" — plenty of real automation is legitimately a single top-level Flow with no subflow involved at all. If a piece of logic is triggered directly by one specific event, and nothing else in the instance needs that same sequence of steps, wrapping it in a subflow adds an extra layer of indirection for no real benefit. The test from above still applies: build a Flow when something needs to react directly to an event; reach for a Subflow only once you can point to the actual reuse, whether that reuse already exists across multiple flows or you can see it coming as you design the automation.

## Key terms

| Term | Meaning |
|---|---|
| Subflow | Reusable Flow Designer logic, stored in `sys_hub_flow` flagged as a subflow, with no trigger of its own — only callable from other flows |
| Top-level Flow | A `sys_hub_flow` record with a Trigger, started directly by a record event or schedule |
| Reuse | The same sequence of steps needed from more than one place, the primary justification for building a subflow |
| Single source of maintenance | The benefit of a subflow: fix the logic once, and every caller picks up the fix |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: if a flow needs to send a Slack-style notification and log a decision, and that exact sequence is only ever going to be used by one flow in the instance, should you build it as a subflow anyway "just in case"? Why or why not, based on the real decision test in this lesson?
