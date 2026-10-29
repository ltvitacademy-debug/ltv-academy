# Lesson 23 — Documenting for the Next Engineer, Not for Yourself

**Chapter 6 · Documentation & Handoff · Lesson 23 of 32**

## What you'll learn

- Why documentation written for your own memory fails the moment someone else has to read it
- The real difference between recording WHAT was configured and explaining WHY it was configured
  that way
- A concrete example: a subnet sizing decision, documented two different ways
- The new-hire test — a practical way to check whether your documentation actually works

## Writing for the person who isn't you

When you document something you just built, it's tempting to write the version that makes sense
*to you*, right now, with every decision still fresh in your head. That version is fast to write
and feels complete. The problem is that it's only complete for a reader who already has your
context — and the whole point of documentation is to reach a reader who doesn't.

Six months from now, you will have forgotten details you're certain you'll remember today. A new
hire reading your notes has none of your context at all. Both of them need the same thing from your
documentation: not just a record of what you did, but an explanation of why you did it that way,
written as if the reader is starting from zero.

## WHAT vs. WHY

The gap between adequate documentation and genuinely useful documentation almost always comes down
to one missing ingredient: the reasoning behind a decision, not just the decision itself. Take a
subnet sizing choice:

```
# WHAT only
Subnet: 10.0.1.0/24

# WHAT + WHY
Subnet: 10.0.1.0/24
Chose a /24 (254 addresses) instead of a /28 (14) to leave
room for growth -- the team expects roughly 3x the current
VM count within a year, and resizing a live subnet later
is disruptive.
```

Both lines are technically accurate. The first tells a reader *what* exists. The second tells them
*why* it exists in that form, which is the only version that lets a future engineer make a good
decision later — say, when they're deciding whether that subnet still has room, or why nobody just
used the smaller, "simpler" block. Without the reasoning, that engineer either has to guess or
track down the original author and ask.

## The new-hire test

A practical way to check your own documentation before calling it finished: imagine a new hire,
with no access to you, reading only what you wrote. Could they understand the decision and operate
around it without sending you a message? If yes, the documentation did its job. If you can picture
the exact question they'd have to ask — "wait, why is this a /24 and not something smaller?" — that
question is the sentence missing from your notes, and it belongs there, not in a Slack thread six
months from now.

This test applies just as well to a VM sizing choice, a backup retention window, or a monitoring
threshold: in each case, the WHY (expected growth, a compliance requirement, a past incident that
set the threshold) is what turns a plain fact into something the next engineer can actually reason
about.

## Key terms

| Term | Meaning |
|---|---|
| Rationale | The reasoning behind a decision — why it was made, not just what was configured |
| Context | The background knowledge a reader needs to understand a decision; documentation exists to supply it when the reader doesn't have it |
| Self-documenting | Documentation detailed enough that a reader doesn't need to ask the author follow-up questions |
| New-hire test | Checking a document by imagining a new hire, with no access to you, trying to use it alone |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why does writing "Subnet:
10.0.1.0/24" with no explanation leave a future engineer worse off than writing the same fact along
with the reason a /24 was chosen?
