# Running an Architecture Review

Lesson 9 covered writing a design document well. This lesson covers the meeting that document is usually written for: the architecture review itself. Running one well is a distinct skill from writing a good design doc — a strong document can still produce a bad review if the meeting itself isn't structured to actually reach a decision.

## What you'll learn

- The real purpose of an architecture review (a decision, not a presentation)
- A simple structure for running one that reliably ends with a clear outcome
- How to handle the reviewer who raises an objection outside the document's scope
- Why "we'll take it offline" is sometimes the right call, and sometimes an avoidance tactic

## The real purpose: a decision, not a presentation

An architecture review that ends with "great, thanks everyone, lots to think about" has failed, even if everyone found it interesting — the point of the meeting was never to inform people, it was to reach one of three concrete outcomes: **approved**, **approved with specific changes**, or **rejected with specific reasons**. If the room disperses without landing on one of those three, the review didn't do its job, regardless of how substantive the discussion felt.

## A structure that reliably reaches a decision

1. **State the decision being asked for, explicitly, at the start.** "We're here to decide whether to adopt Weaviate for the support assistant's retrieval layer" — not "let's discuss our vector database options," which invites an open-ended conversation with no natural endpoint.
2. **Walk through the design doc's structure, not the whole document line by line.** Problem, proposed design, alternatives considered, risks — the structure from Lesson 9. Reviewers who read the doc beforehand need the highlights, not a re-read; reviewers who didn't need enough to participate honestly.
3. **Explicitly invite objections before asking for approval.** "Before we move to a decision — does anyone see a blocker here?" surfaces real concerns while there's still time to address them in the room, rather than after a decision has already been announced.
4. **Name the decision out loud at the end, with any conditions attached.** "Approved, with the condition that we get a second model-provider account set up before this ships" is a real, actionable outcome; "sounds good" is not.

## The objection outside the document's scope

A common disruption: a reviewer raises a real concern that's genuinely outside what this specific design doc was trying to decide — valid, but not the question in front of the room. The skill here is acknowledging it's real without letting it hijack the meeting: "that's a legitimate concern, and it's outside today's scope — let's capture it as a follow-up and keep moving on today's actual decision." This protects the room's time and the original decision's momentum, while making clear the concern wasn't dismissed, just correctly routed.

## "We'll take it offline" — sometimes right, sometimes an avoidance tactic

Deferring a specific, narrow sub-question to a smaller follow-up conversation is often the right call — not every detail needs the whole room's time. But "let's take it offline" can also be a way to avoid a real disagreement in front of the group, letting the meeting end without an actual decision while feeling like progress was made. The honest test: does the main decision still get made in this meeting, with only a narrow, specific sub-question deferred? If yes, deferring that piece was the right call. If the *entire* decision gets deferred under this phrase, the review didn't actually do its job — it just postponed the moment of having to do it.

## Key terms

| Term | Meaning |
|---|---|
| Architecture review | A meeting whose purpose is to reach an explicit approve/approve-with-changes/reject decision on a proposed design |
| Scope-correct deferral | Postponing a narrow, genuinely out-of-scope sub-question without deferring the main decision itself |

## Check yourself

An architecture review ends with "great discussion, lots to think about, let's reconvene." Why has this review failed, even if the conversation itself was substantive and useful?
