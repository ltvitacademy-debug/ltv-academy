# Lesson 11 — Presenting an Integration Design

**Chapter 3 · Presenting · Lesson 11 of 14**

## What you'll learn

- How a review-board presentation differs from the ADR document from Lesson 9
- A reliable structure for presenting an integration design out loud, in order
- Why leading with the decision, not the backstory, respects a reviewer's time
- How to use Chapter 1's case studies and Chapter 2's tools as rehearsal material

## A document and a presentation are not the same artifact

Lesson 9's ADR is written to be read at your own pace, re-read, and referenced later. A review-board presentation is a different artifact entirely: it's live, time-boxed, and the reviewer is actively deciding whether to interrupt you with a question at any moment. A design that reads perfectly well on paper can still fail as a presentation if it's structured the way a document is structured — because a live audience doesn't have the patience to wait through five minutes of background before learning what you actually decided.

## A structure that respects the reviewer's time

**Lead with the decision, not the journey.** Open with the one-sentence version of what you built and why — "We're using a real-time callout for inventory and credit hold and a nightly batch sync for catalog and price, because those two groups of fields have very different volatility" — before walking through how you got there. This is the opposite instinct from writing, where context usually comes first; in a live review, stating the destination first means every detail you give afterward lands as support for something the reviewer already understands, not as suspense.

**Name the alternative you rejected, briefly, before anyone asks.** Reviewers who've sat through enough of these presentations will ask "did you consider just doing X" if you don't address it yourself. Naming Design A from Lesson 6 and why it lost, in two sentences, before being asked, signals the decision was actually tested against something — and takes the most predictable question off the table before it costs you time.

**Show the failure modes you handled, not just the happy path.** A thirty-second walk through Lesson 7's checklist — "here's what happens on a timeout, here's how we handle a duplicate event" — does more to earn a reviewer's confidence than a longer explanation of how the integration works when nothing goes wrong, because a working happy path was never actually in question.

**State what you're not sure about, if anything is genuinely still open.** This feels counterintuitive, but naming your own open question (say, from Lesson 10's self-review) before a reviewer finds it independently reads as self-awareness, not weakness. A presentation that claims total confidence about an area that's actually still thin is a bigger risk than one that's honest about where the remaining risk sits.

## Pacing against a real clock

A design review is time-boxed, and the most common presentation failure isn't a wrong decision — it's running out of time still explaining the scenario when the clock runs out before the actual decision and its defense get airtime. A useful discipline from Lesson 9's ADR structure: if you can only cover half of what you prepared, the decision, the rejected alternative, and the failure-mode summary should survive that cut before the detailed context does. Context explains why the problem mattered; a reviewer who's short on time can usually infer enough context from the decision itself, but can't infer the decision from the context.

## Rehearsing with what you already have

Chapter 1's five case studies and Chapter 2's four-step self-review pass aren't just teaching material at this point — they're rehearsal material. Any one of the five case studies, run through Lesson 9's ADR and then compressed into this lesson's four-part structure, is a complete practice presentation with a known right answer to check yourself against.

## Key terms

| Term | Meaning |
|---|---|
| Lead with the decision | Opening a presentation with the conclusion before the supporting reasoning |
| Preempting an objection | Naming a likely question or concern before the reviewer raises it |
| Time-boxed review | A presentation format where the available time, not the presenter, decides how much gets covered |

## Lab

Take the Cascade Outfitters data-warehouse case study from Lesson 3. Write out a presentation script using this lesson's four-part structure: one sentence leading with the decision, two sentences naming and dismissing the rejected alternative (a tight polling schedule, from Lesson 6's lab), a thirty-second failure-mode summary drawing from Lesson 7, and one honest open question if a real one exists. Time yourself reading it aloud and note whether it fits in roughly ninety seconds.

## Check yourself

Can you explain why a presentation structured like a written document tends to fail in front of a live reviewer? Can you list this lesson's four-part presentation structure from memory and explain what would survive if you only had half the time you planned for?
