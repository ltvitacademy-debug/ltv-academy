# Lesson 15 — Subflow Reuse Lab

**Chapter 4 · Subflows & Reuse · Lesson 15 of 27**

## What you'll learn

- How to recognize duplicated logic across multiple existing flows, in a real scenario
- How to design a subflow's Inputs and Outputs from that duplicated logic
- How to build the subflow itself, step by step, in plain Flow Designer terms
- How to update each of the three original flows to call the subflow instead of repeating the logic
- How to verify the refactor didn't change any flow's actual behavior

## The scenario

You're the Flow Designer administrator on an instance with three flows already in production: an Employee Onboarding flow, an Employee Offboarding flow, and an Equipment Request flow. While reviewing them for an unrelated change, you notice all three contain an identical block of steps, built inline, three separate times: notify the employee's manager that a decision is needed, wait for that manager to respond, and log whatever they decided — approved or rejected, and when — onto the record that triggered it. The wording is nearly identical in all three. This is exactly the duplication Lesson 13 described, and it's your job to fix it before a fourth flow comes along and gets a fourth copy.

## Step 1 — Confirm it's really the same logic

Before extracting anything, open all three flows and compare the duplicated block line by line. In this scenario, each one does the same three things in the same order: send a notification to a manager, wait for a decision, write the decision and a timestamp back onto the record. The only differences between the three copies are which record each flow is working with and the exact wording of the notification message — both of which are just data, not logic. That's the signal this is safe to extract: the steps are identical, and the only variation is the kind of thing a parameter can carry.

## Step 2 — Design the subflow's Inputs and Outputs

Before touching Flow Designer, decide what the new subflow needs coming in and what it needs to hand back. Based on the three flows, it needs three Inputs: **Manager** (a reference to the `sys_user` who should be notified), **Request Record** (a reference to whichever record the decision applies to — the onboarding task, the offboarding task, or the equipment request), and **Message** (a string, since the notification wording differs slightly across the three callers). It needs two Outputs: **Decision** (a string, "Approved" or "Rejected") and **Decision Date** (a date/time, when that decision was made).

## Step 3 — Build the subflow

Create a new flow record, flagged as a Subflow, named "Notify and Log Manager Decision." Define the three Inputs and two Outputs from Step 2 on the subflow itself. Then build the body exactly once: a notify-manager action using the Message input, a wait-for-response step, and a final action that writes the manager's decision and the current date/time into the subflow's Decision and Decision Date outputs. This is the only place this logic will exist going forward.

## Step 4 — Update all three calling flows

In each of the three flows — Onboarding, Offboarding, Equipment Request — delete the duplicated inline block and replace it with a single Call Subflow action pointing at "Notify and Log Manager Decision." For each flow, map its own data pills into the subflow's inputs: the flow's own trigger record's manager into the Manager input, the flow's own record into the Request Record input, and that flow's specific notification wording into the Message input. Then, in whatever step came after the old inline block in each flow — logging to the record, branching on approved versus rejected — swap the old local values for the subflow's new Decision and Decision Date outputs, now available as data pills right after the Call Subflow action.

## Step 5 — Verify nothing changed in behavior

Run each of the three flows against a test record the way you would after any change. The expected outcome is that all three behave exactly as they did before the refactor — same notification sent, same decision logged, same date recorded — because the logic itself didn't change at all; only where it lives did. If a future fourth flow needs this same notify-and-log behavior, it now just adds a Call Subflow action, maps three inputs, and reads two outputs — no copying, no re-building.

## Key terms

| Term | Meaning |
|---|---|
| Duplicated logic | The same sequence of steps built inline, more than once, across multiple flows |
| Extraction | Moving duplicated logic out of each flow and into a single subflow the flows call instead |
| Refactor | Changing where logic lives without changing what it does — verified by confirming behavior is unchanged |
| Call Subflow action | The single action that replaces an entire duplicated block once the subflow exists |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: in Step 1 of this lab, what exact test decided the duplicated block was safe to extract into a subflow, and what would have made it unsafe to extract?
