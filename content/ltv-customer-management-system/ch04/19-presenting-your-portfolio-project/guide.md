# Lesson 19 — Presenting Your Portfolio Project

**Chapter 4 · Analytics and Delivery · Lesson 19 of 20**

## What you'll learn

- How to structure a 5–10 minute walkthrough of this exact capstone for
  an interview or portfolio review
- Which parts of the build to lead with, and which to hold in reserve
  for follow-up questions
- How to answer the "why," not just the "what," for your biggest design
  decisions
- How to turn the Lesson 18 document into something you say out loud
  with confidence

A finished org is only half a portfolio piece. The other half is being
able to walk someone through it clearly, in their language, in the time
they actually give you.

## The five-part walkthrough structure

| Part | Time | What you cover |
|---|---|---|
| **1. The scenario** | ~1 min | Cascade in two sentences — B2B foodservice equipment, the sales process, why the data model needed two custom objects |
| **2. The data model** | ~2 min | Walk the Lesson 3 diagram: Lead to Account/Contact/Opportunity, Installation Project, Service Contract — and why each relationship is Lookup, not Master-Detail |
| **3. The security model** | ~2 min | The role hierarchy, why Key Accounts sits outside New Business, and the one sharing rule you're proudest of |
| **4. One automation story** | ~2 min | Pick ONE — the Lead Flow, a validation rule, or the approval process — and tell it as a before/after: what problem existed, what you built, what changed |
| **5. Reports and what you'd do next** | ~1–2 min | The Executive Dashboard, and one honest answer about what Phase 2 would add |

Five parts, roughly ten minutes — tight enough to fit inside a portfolio
review slot, structured enough that you're never searching for what to
say next.

## Why "one automation story," not three

An interviewer remembers one well-told story better than three rushed
summaries. Pick the piece you can explain best end to end — problem,
decision, build, result — and go deep on it. The other two stay ready
for a follow-up question, not crammed into your opening walkthrough.

## Questions to prepare for

| Likely question | Where your answer comes from |
|---|---|
| "Why Lookup instead of Master-Detail on Installation Project?" | Lesson 3 — sharing independence, explained in Lesson 4 |
| "Why is OWD Private instead of Public Read Only?" | Lesson 4 — deal values and installer data are sensitive by default |
| "Why does Priya Nair report directly to the VP instead of the Sales Manager?" | Lesson 4 — Key Accounts visibility is deliberately separated |
| "How did you test this before calling it done?" | Lesson 17 — walk through one security test and one validation rule test |
| "What would you build next if this were a real client?" | Lesson 18's Known Limitations section — this is where you answer honestly |

## Using the real artifacts, not just talking

Bring the Lesson 3 diagram and the Lesson 11 role hierarchy as visuals —
a reviewer following a picture retains more than a reviewer following
words alone. If this is a recorded portfolio piece rather than a live
interview, a short screen recording of the Executive Dashboard and one
Flow running end to end is worth more than any amount of describing it.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio review | A presentation of finished work judged on clarity and reasoning, not just completion |
| Before/after story | A narrative structure: the problem that existed, the decision made, and the measurable result |
| Held-in-reserve detail | Something true and ready to share, but not included in the opening walkthrough unless asked |

## Lab

Write and practice your own five-part walkthrough out loud, timed, using
the structure above. Pick your one automation story and rehearse telling
it as a before/after, not a feature list.

## Check yourself

- Why does the walkthrough structure recommend telling one automation
  story in depth instead of three briefly?
- Name one likely interview question from the table above and where in
  this capstone the answer comes from.
- What should you bring as a visual aid, beyond just talking through the
  build?
