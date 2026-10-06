# Lesson 17 — Gathering Process Requirements

**Chapter 4 · Working With Stakeholders · Lesson 17 of 18**

## What you'll learn

- Why "the stakeholder's first sentence" is rarely the actual requirement
- A repeatable set of discovery questions that surfaces what a complaint leaves out
- How to tell the difference between a symptom and a root cause
- How this connects back to step 1 of the Chapter 3 method: translate the complaint

## The gap between a complaint and a requirement

Every case study in Chapter 3 started from a single sentence: "requests just get approved by whoever sees the email first." That sentence is a real complaint, but it's not yet a requirement. It doesn't say how many days should trigger review, who the right approver actually is, what should happen to a request already in flight, or whether there are exceptions leadership expects (an emergency request, for instance). A requirement-gathering conversation is what turns one sentence into the kind of entry-criteria, approver, and final-action details Lesson 11-12's designs actually needed.

## Discovery questions that surface the gaps

A stakeholder rarely volunteers all of this unprompted — asking surfaces it:

- **What exactly triggers the problem?** ("Over five days" vs. "any request" — get the actual number, not a vague description.)
- **Who should be involved, specifically?** (A named role — "the requester's direct manager" — not "someone in management.")
- **What happens today, step by step, when this goes wrong?** (Walking the current, broken process in detail often reveals the real failure point.)
- **Are there exceptions?** (Emergency cases, different rules for different departments — these change the design and are easy to miss if nobody asks.)
- **How will we know this is fixed?** (A measurable outcome — faster turnaround, zero scheduling conflicts — not just "it feels better.")

## A symptom vs. a root cause

```
Symptom (what's said):
  "People are confused about time-off approval."

Root cause (what discovery finds):
  No entry criteria exists at all -- EVERY
  request, regardless of length, currently
  gets the same informal review.
```

Designing straight from the symptom risks building something that fixes the wrong thing — an automated reminder to "clarify the process," say, instead of an actual approval process with real entry criteria. The discovery questions above are what separates the two.

## Applying it to Mill Creek

Lesson 14's Mill Creek brief already stated the entry criteria (over five days) and the stated cost (two scheduling conflicts). A real discovery conversation is where those specific numbers would have come from — HR wouldn't necessarily say "five days" unprompted; a well-asked "what exactly triggers the problem" question is what gets a vague complaint to that precision.

## Key terms

| Term | Meaning |
|---|---|
| Discovery question | A question designed to surface detail a stakeholder's first complaint leaves out |
| Symptom | The visible, often vague, version of a problem a stakeholder first describes |
| Root cause | The underlying, specific condition that discovery questions are meant to uncover |

## Check yourself

You're ready for Lesson 18 when you can write three discovery questions you'd ask before designing automation for a brand-new, never-before-seen stakeholder complaint.
