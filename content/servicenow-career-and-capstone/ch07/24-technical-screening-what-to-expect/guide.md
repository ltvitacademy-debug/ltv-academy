# Lesson 24 — Technical Screening: What to Expect

**Chapter 7 · Interview & Job Search Preparation · Lesson 24 of 26**

## What you'll learn

- The three things a real ServiceNow technical screening tends to probe for, beyond trivia
- Realistic example question types for scripting fluency, architecture judgment, and tradeoff defense
- Why "explain a past decision's tradeoffs clearly" is tested directly, and how your capstone prepared you for it
- Why this lesson can't hand you "the real exam," and why that's actually fine

## This isn't a leaked exam — it's a preparation framework

No two ServiceNow technical screens ask the identical questions, and anyone selling you a list of
"the exact questions they'll ask" is overselling. What's genuinely useful instead is knowing the
three things a competent interviewer is actually trying to assess, because those three things stay
stable even as the specific questions change from company to company.

## One: practical scripting and GlideRecord fluency

This is the most literal, checkable skill, and it's usually tested with a small, concrete scenario
rather than an abstract definition question. Expect something like: "write a Business Rule that
prevents an incident from being closed if a required field is empty," or "here's a GlideRecord
query — what's wrong with it, and why would it behave unexpectedly at scale." The second kind —
spot the problem in existing code — comes up often because it tests real fluency rather than
memorized syntax. If you can read a GlideRecord query and immediately notice a missing
`.query()` call, an unindexed field driving a slow lookup, or a loop structure that will silently
skip records, you're demonstrating exactly the kind of fluency this question type is built to
surface.

## Two: real architecture judgment, not trivia

The second thing being probed is judgment, usually through a scenario rather than a fact check.
"A business unit wants a new approval step added to an existing workflow used by twelve other
departments — how would you approach that change?" isn't looking for one correct answer; it's
looking for whether you instinctively think about blast radius, testing, and rollback before you
think about the mechanics of adding an approval step. This is architecture judgment in the sense
Course 13 built it: weighing a decision's real tradeoffs against a specific context, not reciting
a best-practices list from memory.

## Three: explaining a past decision's tradeoffs clearly

This is the one candidates most often underestimate, and it's tested directly: "tell me about a
technical decision you made on a project and why you made it that way instead of some other way."
This is not a casual warm-up question — it's assessing the same skill the Meridian Health Network
capstone's Architecture Decision Record exercise and Chapter 6's presentation-and-defense practice
were built to train: can you state the context, name the alternative you didn't choose, and give a
specific, defensible reason you didn't choose it. A candidate who can only say "I used a Business
Rule because that's what we usually do" reads very differently from one who can say "I considered
a Flow Designer flow instead, but chose a Business Rule because the logic needed to run
synchronously before the record saved, and the flow's async execution would have broken that."

## Honestly preparing without a script to memorize

Since there's no fixed exam to cram for, the most useful preparation is reviewing your own six
portfolio artifacts from Lesson 9 and, for each one, being able to state out loud: what it does,
one real alternative you considered, and why you chose what you chose. That's the same exercise
Chapter 6 already put you through for the capstone — do it again here for your other artifacts,
and you'll walk into a technical screen already rehearsed in the exact skill it's testing.

## Key terms

| Term | Meaning |
|---|---|
| GlideRecord fluency | The ability to read, write, and spot problems in ServiceNow's core server-side query API |
| Blast radius | How many other processes, users, or records a given change could affect beyond its immediate target |
| Tradeoff defense | Clearly stating why one technical option was chosen over a specific named alternative |
| Architecture judgment | Weighing a decision's real tradeoffs against a specific context, rather than reciting a generic best practice |

## Check yourself

Pick one artifact from your Lesson 9 portfolio list. Out loud, in under thirty seconds, state what
it does, one real alternative approach you considered, and the specific reason you chose what you
built instead.
