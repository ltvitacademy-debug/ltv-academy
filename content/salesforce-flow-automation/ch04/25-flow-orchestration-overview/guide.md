# Lesson 25 — Flow Orchestration Overview

**Chapter 4 · Reliable and Scalable Flows · Lesson 25 of 31**

## What you'll learn

- What Flow Orchestration adds on top of the flow types you already know
- The three building blocks: orchestrations, stages, and steps
- The difference between an interactive step and a background step
- Why Flow Orchestration became a standard part of every org's toolkit in 2026, not a paid add-on
- A real, hands-on build: the two-stage hiring orchestration shown in the screenshots above, built element by element

## Everything so far has been one flow. Orchestration coordinates several

Every flow type covered in this course — record-triggered, screen, scheduled, autolaunched, subflow — runs as a single, self-contained unit of automation. **Flow Orchestration** is a different kind of flow type built on top of those: it coordinates a **multi-step, often multi-day, multi-person business process** by sequencing other flows, grouping them into stages, and tracking where any given record currently sits in that process. Think of a process too long and too people-dependent to live inside one flow interview — a hiring pipeline, a case escalation path, a multi-department approval chain.

## Three building blocks: orchestration, stage, step

An **orchestration** is the overall structure. It must contain at least one **stage** — a named, logical grouping of related work, and only one stage can be actively in progress for a given record at a time. Each stage contains one or more **steps**, and every step runs a flow underneath it:

![Flow Orchestration's Add Element menu on the canvas, with Stage and Decision as the two options.](/courses/salesforce-flow-automation/ch04/25-flow-orchestration-overview/add-stage-decision-menu.png)

## Interactive steps vs. background steps

A step is one of two kinds, and the difference is simple but important: an **interactive step** runs a **screen flow** and requires a person to act — it shows up as a work item someone has to open and complete. A **background step** runs an **autolaunched flow** and needs no human interaction at all — it just executes. Steps within a stage can run sequentially or concurrently, and a completed stage, built out, looks like this:

![A completed "Recruiter Screening" stage with 3 Steps: an Interactive Step "Create a job application," a Background Step "Notify candidate," and another Interactive Step "Recruiter phone screen."](/courses/salesforce-flow-automation/ch04/25-flow-orchestration-overview/completed-stage-three-steps.png)

## A full orchestration, stitched together

Stack several stages, with Decision elements branching between them, and the canvas shows the shape of the entire process at once — not just one flow's logic, but the whole multi-stage journey a record moves through:

![A multi-stage orchestration canvas: a Hiring Manager Interview stage with 2 steps, feeding into a "Make offer" Decision that branches to either an End or a "Candidate Rejected" stage with its own background step.](/courses/salesforce-flow-automation/ch04/25-flow-orchestration-overview/full-orchestration-canvas.png)

## No longer a paid add-on

For a long time, Flow Orchestration required a separate licensed add-on beyond a limited number of free runs. As of February 2026, Salesforce made **Flow Orchestration a standard Flow type**, included for all customers at no additional cost, subject to the same per-edition limits as any other Flow type. That removes what used to be the real barrier to using it — it's now just another flow type in the toolbox, for the specific job none of the others are built for: coordinating a process across multiple flows and multiple people over time.

## Building it: the hiring orchestration from the screenshots above

Everything shown in this lesson's screenshots is buildable with elements and patterns already
covered in this course — a screen flow is just the flow type from Chapter 2, an autolaunched flow
is the background-step equivalent of what Lesson 29's lab already built. Here's the same
"Recruiter Screening" stage, built step by step.

### Step 1 — Create the two flows the orchestration will coordinate

Before building the orchestration itself, build the two flows its first stage needs, following
Lesson 27's naming convention:

```
Flow: "Candidate - Screen - Recruiter Phone Screen"
  Type: Screen Flow
  Screens: one screen with fields for interview notes and a
           Pass/Reject decision, matching the screen flow patterns
           from Chapter 2.

Flow: "Candidate - Autolaunched - Notify Candidate"
  Type: Autolaunched Flow (no trigger, called by the orchestration)
  Elements: one Action element (Send Email), using the candidate's
            email from the input record.
```

### Step 2 — Create the orchestration and the first stage

```
New Flow -> Flow Orchestration
Canvas -> Add Element -> Stage
  Stage Label: "Recruiter Screening"
```

### Step 3 — Add the three steps from the screenshot, in order

```
Step 1 (Interactive): "Create a job application"
  Runs: a screen flow collecting the candidate's initial application data
  Assigned to: the recruiter's queue

Step 2 (Background): "Notify candidate"
  Runs: the "Candidate - Autolaunched - Notify Candidate" flow from Step 1
  Runs automatically once Step 1 completes -- no assignment needed

Step 3 (Interactive): "Recruiter phone screen"
  Runs: the "Candidate - Screen - Recruiter Phone Screen" flow from Step 1
  Assigned to: the recruiter
```

Notice Step 2 doesn't need a person assigned — it's a background step, so it simply runs the
moment Step 1 finishes, the same way an autolaunched flow runs without anyone clicking anything.

### Step 4 — Add a Decision and the second stage

```
Canvas -> Add Element -> Decision, after the "Recruiter Screening" stage
  Outcome "Advance": recruiter marked Pass on the phone screen
  Default: "Candidate Rejected"

Stage: "Hiring Manager Interview" (on the Advance path)
  2 steps, following the same Interactive/Background pattern as
  Stage 1 -- an interactive step for the hiring manager's interview,
  a background step notifying the candidate of the outcome.

Stage: "Candidate Rejected" (on the Default path)
  1 background step: send a rejection notification, then End.
```

### Step 5 — Activate and test, the same discipline as any other flow

Per Lesson 21, debug the orchestration before activating it: run it against a test candidate
record, confirm each interactive step actually appears as a work item in the assigned queue, and
confirm the background steps fire automatically without anyone needing to act on them.

## Key terms

| Term | Meaning |
|---|---|
| Orchestration | The overall structure coordinating a multi-stage, multi-person business process |
| Stage | A named grouping of related steps; only one stage in progress per record at a time |
| Interactive step | A step that runs a screen flow and requires a person to act |
| Background step | A step that runs an autolaunched flow with no human interaction required |

## Check yourself

A hiring process needs a recruiter to manually review each application, followed by an automatic email notification with no human action. Which step type fits each part, and why would this process be awkward to build as a single ordinary flow?
