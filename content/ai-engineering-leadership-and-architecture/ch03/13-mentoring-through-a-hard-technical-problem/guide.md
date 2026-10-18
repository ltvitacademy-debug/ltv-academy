# Mentoring Through a Hard Technical Problem

Lesson 11 named the core shift: from generating answers to shaping how others reach them. Mentoring is where that shift gets tested most directly, one on one, usually when a less experienced engineer is genuinely stuck on something hard — and the easy, fast, tempting move is almost always the wrong one.

## What you'll learn

- Why immediately solving a mentee's problem for them is usually the worst available option, even though it's the fastest
- A simple structure for a mentoring conversation that builds real capability instead of dependency
- How to tell the difference between a mentee who needs a nudge and one who's genuinely blocked and needs more
- Why mentoring an engineer through a wrong turn is sometimes more valuable than preventing it

## The tempting, usually-wrong move

An engineer brings you a hard bug — Northbeam's RAG pipeline is occasionally returning answers that cite documents that were never actually retrieved. You can see the likely cause almost immediately: a race condition between the retrieval step and the prompt-assembly step under concurrent load. The fast move is to just say so and watch them fix it. The problem with the fast move: the engineer learns that this specific bug is fixed, but they don't necessarily learn *how to find* the next bug like it — the actual skill (systematically narrowing down a hard-to-reproduce concurrency issue) never gets practiced, because you practiced it for them.

## A structure for a mentoring conversation that actually builds capability

1. **Ask what they've already tried**, and actually listen — this both avoids suggesting something they've already ruled out and gives you real information about their current approach.
2. **Ask a question that narrows the search space, instead of naming the answer.** "Does this happen under concurrent load, or does it reproduce with a single request?" points toward the real cause without stating it, and — crucially — models the *kind* of question a skilled debugger asks, which is the transferable skill.
3. **Let them sit with a wrong hypothesis for a bit, if it's not costly to do so.** Testing and ruling out an incorrect theory themselves teaches more than being told it's wrong upfront — as long as the cost of that detour (in time, in risk) is genuinely low.
4. **Only give the direct answer if they're genuinely stuck, time-pressured, or the detour has become too costly** — and when you do, explain the reasoning that would have gotten them there, not just the conclusion, so the next similar bug is a little more findable on their own.

## Telling a nudge-worthy moment from a genuinely blocked one

Not every stuck moment calls for the same response. An engineer who's been investigating for twenty minutes and hasn't yet considered an obvious angle usually benefits from a nudge — a well-aimed question. An engineer who's been stuck for two days, is now behind on a deadline that affects other people, and has already tried every angle they can think of is in a different situation — at that point, continuing to withhold the answer in the name of "building capability" stops being mentorship and starts being an unnecessary cost imposed on them and the team. Reading which situation you're actually in, rather than defaulting to one approach regardless of context, is itself part of the skill.

## Letting someone take a wrong turn, deliberately

Sometimes the most valuable thing a mentor does is *not* prevent a mistake that's genuinely low-cost to make and recover from. An engineer convinced their fix for the race condition should go in one specific place, when you can see a cleaner spot three function calls away, might learn more from implementing their version, discovering it's awkward, and figuring out why — than from being redirected before they ever see the awkwardness for themselves. This only works when the cost of the detour is genuinely bounded — a few hours, not a shipped bug in production — which is part of why judging the real cost of a wrong turn, before deciding whether to let it happen, is itself a skill this lesson is asking you to build.

## Key terms

| Term | Meaning |
|---|---|
| Narrowing question | A question that points toward a likely cause without stating the answer directly |
| Bounded wrong turn | A mistake cheap enough in time/risk to let someone discover and correct themselves, for the learning value |

## Check yourself

Why does immediately solving a mentee's hard bug for them — even though it's the fastest fix — often leave them LESS prepared for the next similar bug, compared to a slower, question-driven conversation?
