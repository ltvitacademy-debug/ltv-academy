# Lesson 28 — Integration Documentation

**Chapter 4 · Applying Integration Architecture · Lesson 28 of 28**

## What you'll learn

- Why integration documentation is the durable artifact that makes every other lesson in this course actually usable two years from now
- The specific sections a real integration design document should contain
- Why documentation that's written once and never updated is a governance failure, directly connected to Lesson 17
- How this closing lesson ties every chapter of this course back together into one practical deliverable

## Documentation is where institutional knowledge survives people leaving

Every pattern, trade-off, and decision this course has covered lives, at the moment it's made, in the heads of the people who made it. **Integration documentation** is the deliberate act of moving that knowledge out of people's heads and into a durable, findable artifact — so that when the person who built an integration leaves, gets reassigned, or simply forgets the details eighteen months later, the reasoning behind the design isn't lost along with them. This is the direct, concrete fix for the "nobody knows what this integration does anymore" governance failure described in Lesson 17 — governance sets the expectation that documentation exists and stays current; this lesson is about what actually goes into it.

## What a real integration design document contains

A genuinely useful integration document — not a one-line README, but something a new team member could actually use to understand and safely modify the integration — covers:

- **Purpose and business context.** What business process does this integration support, and what would break if it stopped working? This is the answer to the question Lesson 17's lab scenario couldn't answer for its 40 undocumented integrations.
- **Pattern and justification.** Which pattern was chosen (synchronous, async, batch, event-driven) and why, referencing the specific facts (Lesson 11's four questions) that drove the choice — not just "what" but "why," so a future reader can tell whether the original reasoning still holds if circumstances change.
- **Interface contract.** The actual field mappings, required fields, data types, and error response shapes agreed on by both sides (Lesson 2's missing-error-contract failure mode, solved by writing it down).
- **Failure handling.** Whether the operation is idempotent, what the retry strategy is (attempts, backoff, jitter), and where failed messages end up (the dead-letter destination from Lesson 16).
- **Credentials and security.** Which Named Credential is used, who owns rotating it, and what access it's scoped to — not the actual secret values, but where they live and who's accountable for them.
- **Monitoring and alerting.** Where this integration's health signals (Lesson 18) are actually visible, and who gets alerted when something looks wrong.
- **Owner.** The specific role or team accountable for this integration (Lesson 17), kept current as team structures change.

## Documentation that's stale is worse than documentation that's absent

Echoing Lesson 23's point about landscape diagrams directly: a document written once at launch and never touched again becomes actively dangerous once the integration changes and the document doesn't. A future engineer trusting a stale document's description of the retry strategy, or its claim about which system owns a given field, can make a confidently wrong decision based on information that used to be true. The fix isn't more documentation — it's treating documentation as a living artifact with the same update discipline as the code or configuration it describes: a documentation update is part of the definition of "done" for any change to an integration, not an optional afterthought squeezed in if time allows.

## How this closes the course

This lesson is a deliberately practical ending, not a new concept. Every lesson since Lesson 1 has built toward a specific, usable skill: understanding the landscape (Chapter 1), choosing and designing a pattern (Chapter 2), making it reliable and operable (Chapter 3), and applying all of it to real review, real trade-off decisions, and real defensible reasoning (Chapter 4). Documentation is the last mile — the thing that makes sure the next person, the next review, and the next incident all have something real to work from, instead of having to reconstruct this course's entire reasoning process from scratch every single time.

## Key terms

| Term | Meaning |
|---|---|
| Integration documentation | A durable, findable artifact capturing an integration's purpose, pattern, contract, and failure handling |
| Living document | Documentation maintained with the same update discipline as the system it describes, rather than written once and left to go stale |

## Lab

Write a documentation outline (using this lesson's seven sections) for Lesson 24's Flow 1 (order creation sent asynchronously from Salesforce to the WMS, with an idempotency key based on the order ID). For each of the seven sections, write one or two sentences of actual content based on what Lesson 24 described, so the result is a usable first draft, not just an empty template.

## Check yourself

Can you name all seven sections this lesson says a real integration design document should contain? Can you explain, in your own words, why stale documentation can be more dangerous than no documentation at all, and what practice prevents a document from going stale in the first place?
