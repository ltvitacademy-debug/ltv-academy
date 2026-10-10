# Lesson 13 — Reviewer Feedback and Iteration

**Chapter 2 · Working the Cases · Lesson 13 of 16**

## What you'll learn

- How to tell a legitimate design gap apart from a reviewer's personal preference, without being dismissive of either
- Why defending a design and defending your ego about a design are two different postures with very different outcomes
- A simple triage for incoming feedback: must-fix, worth discussing, or acknowledged-and-declined
- Why "the reviewer didn't understand my design" is almost always a presentation problem, not a reviewer problem

## Feedback is data, not a verdict

A review board exists to find gaps in a design before those gaps become expensive in production — which means feedback, including feedback that turns out to be wrong, is useful data about what wasn't communicated clearly or wasn't considered. Treating every piece of feedback as either a devastating verdict on the design's quality or an annoyance to be managed past both miss what a review is actually for. The right posture is closer to a hypothesis test: a reviewer raised a specific concern, and the architect's job is to check whether the concern is valid, not to defend the design against the concern regardless of whether it holds up.

## Triage: must-fix, worth discussing, acknowledged-and-declined

Not every piece of feedback deserves the same response, and sorting incoming comments into three categories keeps a review productive instead of circular:

- **Must-fix** — the reviewer found a genuine gap. Renwick's design review, in an earlier draft of Lesson 3's case, missed that repair technicians weren't accounted for in either license tier — a reviewer catching that before launch is exactly what the review process exists to do, and the honest response is to fix the gap, not defend the draft that had it.
- **Worth discussing** — the feedback identifies a real tradeoff, but reasonable architects could land on either side. A reviewer might prefer Ferro stay multi-org longer before committing to full consolidation; that's a legitimate position, not a factual error, and the right response is a substantive discussion of the tradeoff (per Lesson 10's dimensions), not a unilateral override in either direction.
- **Acknowledged-and-declined** — the reviewer raised something real, the architect considered it, and the design stands as presented, with the reasoning for declining stated explicitly rather than just ignored. This is not the same as dismissing feedback — it's finishing the hypothesis test with an answer, on the record, that the reviewer and anyone reading the decision log later can see and evaluate.

## Defending the design vs. defending your ego

The hardest part of this skill isn't intellectual, it's emotional: when a reviewer challenges a design an architect has spent real time on, the instinct to defend it as a referendum on competence rather than evaluate the specific concern on its merits is strong and almost universal. The tell that separates the two postures is simple to check after the fact: did the response to the feedback change based on whether the concern turned out to be valid, or did it stay the same regardless of what the concern actually was? An architect defending the design evaluates each concern and updates accordingly, landing in different triage buckets for different feedback. An architect defending their ego ends up in "acknowledged-and-declined" for everything, regardless of merit — which a review board notices quickly, and which costs more credibility over time than admitting a real gap ever would.

## When the reviewer "didn't understand," check the presentation first

A common, usually wrong explanation for pushback is "the reviewer just didn't understand the design." Before accepting that explanation, Lesson 12's presentation structure is worth re-checking: did the problem get stated clearly before the solution, were the alternatives shown, was the altitude matched to this specific reviewer's role. In most cases where a reviewer's concern seems to be based on a misunderstanding, the actual gap is in how the design was presented, not in the reviewer's ability to follow it — and the fix is a clearer presentation next time, not a private judgment that the reviewer wasn't paying attention.

## Key terms

| Term | Meaning |
|---|---|
| Must-fix feedback | Feedback identifying a genuine, previously-missed gap in the design |
| Worth-discussing feedback | Feedback identifying a legitimate tradeoff where reasonable architects could differ |
| Acknowledged-and-declined | Feedback considered on its merits and explicitly declined, with the reasoning recorded |
| Defending the design vs. defending your ego | The distinction between evaluating feedback on its merits versus resisting it regardless of validity |

## Lab

Write three pieces of reviewer feedback a technical review board might realistically raise against Castellan's Field Service design from Lesson 5 (at least one that should land in each of the three triage categories). For each one, state which category it belongs in and why, and for the "worth discussing" item specifically, write out the tradeoff using Lesson 10's dimensions rather than just asserting an answer.

## Check yourself

Can you name the three feedback triage categories and give a one-sentence test for sorting a new piece of feedback into the right one? Can you describe the specific tell that distinguishes defending a design on its merits from defending it out of ego, even when both postures might sound similar in the room?
