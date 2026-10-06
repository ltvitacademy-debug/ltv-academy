# Lesson 18 — Mapping Processes Before You Build

**Chapter 4 · Working With Stakeholders · Lesson 18 of 18**

## What you'll learn

- Why a simple process map catches design gaps a requirements list alone can miss
- A lightweight, text-based notation you can sketch with a stakeholder in a meeting, no diagramming software required
- How to map the Mill Creek time-off process from Lesson 14's requirements, before touching Setup
- How every skill in this course — Chapters 1 through 4 — comes together in one last worked example

## Why map it before building it

Lesson 17's discovery questions produce a list of requirements: the trigger, the approver, the exceptions. A process map does something a list can't — it shows the *order* things happen in, and the branches. Two requirements can both be individually correct and still describe a process that doesn't actually flow, and a list won't catch that. Laying the steps out in sequence, with decision points as visible branches, is often where a stakeholder says "wait, that's not quite right" — in a planning conversation, not after something's built.

## A lightweight mapping notation

No diagramming software needed — this notation works on a whiteboard or in a shared doc during the requirements conversation itself:

```
[ Step ]       a single action
< Decision? >  a branch point, with labeled paths
--> label      an arrow to the next step, labeled
  with the outcome that leads there
```

## Mapping Mill Creek's time-off process

Using Lesson 14's requirements and Lesson 17's discovery habit, here's the process on paper before any automation exists:

```
[ Employee submits request ]
        -->
< Days requested > 5? >
  --No--> [ Auto-approved, no review needed ]
  --Yes-> [ Routed to direct manager ]
                -->
          < Manager approves? >
            --Yes--> [ Status: Approved, unlock ]
            --No---> [ Status: Rejected, unlock, email ]
```

Every box on this map becomes a final action or an approval step. Every diamond becomes entry criteria or an approval decision. That's not a coincidence — the map and the approval-process design from Lesson 11 describe the same thing at two different levels of detail, and mapping it first is what makes sure nothing in the design is missing a branch the stakeholder actually expects.

## What mapping catches that a list doesn't

Looking at the map above, one branch stands out: what happens to a 3-day request? The map forces an explicit answer — "auto-approved, no review" — where a requirements list that only said "requests over 5 days need approval" might have left it ambiguous whether shorter requests need *any* record of approval at all. That's the kind of gap a map surfaces by making every path visible, including the ones nobody explicitly asked about.

## Bringing the whole course together

This course started with declarative tools in Chapter 1, moved to choosing the right tool and understanding execution order in Chapter 2, applied all of it to real designs with documentation and testing in Chapter 3, and closes here with the stakeholder-facing skills — asking the right questions and mapping the answers — that make sure what gets built actually matches what was needed in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Process map | A visual or text-based representation of a process's steps and decision points, in order |
| Branch | A decision point in a process map where the path diverges based on a condition |

## Check yourself

You've completed this course when you can map a new process — trigger through every branch to its final outcome — before opening Setup, the way this lesson mapped Mill Creek's time-off request.

## What's next

The next course in the Salesforce Administrator path is **LTV Customer Management System** — a portfolio capstone that pulls together everything from this entire path, including the automation design, documentation, and stakeholder-gathering skills built across this course.
