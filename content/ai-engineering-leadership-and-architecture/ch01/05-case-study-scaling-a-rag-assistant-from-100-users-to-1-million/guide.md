# Case Study: Scaling a RAG Assistant From 100 Users to 1 Million

This lesson closes Chapter 1 by walking Northbeam's support assistant through four real growth stages, end to end — tying together load/cost/latency budgets (Lessons 1-2), capacity planning (Lesson 3), and high-availability design (Lesson 4) into one continuous story instead of four separate ideas. Treat this as a rehearsal for the kind of "how would you have handled this" conversation a Staff/Principal interview, or a real architecture review, actually puts in front of you.

## What you'll learn

- How Northbeam's architecture had to change at each of four real growth stages
- Which specific lesson from this chapter each stage's fix comes from
- Why the SAME architecture choice can be exactly right at one stage and wrong at the next
- How to walk through a scaling case study the way an interviewer or an architecture review actually expects

## Stage 1: Pilot — 100 users, single region, single provider

Northbeam's support assistant launches as an internal pilot: one customer support team, about 100 daily users, a single vector database instance, one LLM provider, one application server, all in one region. This is the right architecture for this stage — anything more elaborate would be solving problems that don't exist yet, at a cost that isn't justified by 100 users. The team ships fast, proves the RAG approach works, and gets real usage data.

## Stage 2: Department rollout — 5,000 users, cost and latency become real constraints

Word spreads; the rest of the customer support organization adopts the tool, pushing to roughly 5,000 daily users and a meaningfully higher request volume. At this stage, Lesson 2's cost and latency budgeting becomes necessary for the first time: the team runs the per-request cost math and discovers their system prompt has grown bloated over months of ad-hoc tweaks, and sets an explicit latency budget table because support agents are now complaining the tool "feels slow" with no specific number attached to that complaint. The fix at this stage is entirely about *discipline* — trimming the prompt, setting budgets — not about new infrastructure. Reaching for multi-region or multi-provider complexity here would be solving Stage 4's problem three stages too early.

## Stage 3: Company-wide — 50,000 users, capacity planning becomes necessary

Other departments start using the assistant for general company-knowledge questions, pushing to 50,000 daily users. This is the stage where Lesson 3's capacity planning becomes load-bearing: the team runs a growth forecast and discovers the current vector database tier will hit its ceiling in a projected 7 months, and — critically — that migrating to a higher tier takes 3 months of real engineering work. That lead-time math is what actually drives the roadmap decision, not the raw ceiling date. The team starts the migration at month 4 of the forecast window, with comfortable margin, instead of reacting to a capacity incident at month 7.

## Stage 4: Public-facing — 1,000,000 users, availability design becomes necessary

Northbeam's leadership decides to expose a public-facing version of the assistant to end customers directly — a different risk profile entirely, where an outage now means real customer-facing downtime with reputational and revenue consequences, not an internal team's inconvenience. This is the stage where Lesson 4's high-availability design actually earns its cost: a single region's 525-minutes-a-year downtime, tolerable for an internal tool, is no longer acceptable for a customer-facing product. The team moves to an active-active multi-region deployment, specifically auditing for shared dependencies (the same model API account, the same auth service) that would silently break the independence assumption behind the availability math — and adds a defined graceful-degradation mode (retrieval-only results) for the rare case when the LLM provider itself is unavailable in every region at once.

## Why the same choice is right at one stage and wrong at another

Notice the pattern across all four stages: multi-region deployment is the *correct, necessary* choice at Stage 4 and would have been *wasteful over-engineering* at Stage 1. Capacity forecasting is essential at Stage 3 and premature at Stage 1, where 100 users don't justify the analysis effort. This is the actual skill being tested in a real architecture review or a Staff/Principal interview: not "do you know what multi-region deployment is," but "do you know *when* it's the right call, and can you say why it would have been wrong earlier." An answer that reaches for the most sophisticated-sounding architecture at every stage, regardless of actual need, reads as inexperience, not expertise.

## How to walk through this kind of case study out loud

When asked a version of this question directly ("tell me how you'd scale a RAG system"), the strongest answers explicitly narrate the stages and the triggers for each change — "at this traffic level, cost becomes the bottleneck, so I'd do X; once we cross this volume, capacity planning becomes necessary, so I'd do Y" — rather than describing one final, maximally-robust architecture as if it should have existed from day one. That staged reasoning is exactly what this lesson, and this chapter, modeled.

## Key terms

| Term | Meaning |
|---|---|
| Staged architecture | Matching architectural complexity to the actual current scale, rather than building for a future scale prematurely |

## Check yourself

Why would building Stage 4's full multi-region, multi-provider architecture at Stage 1 (100 users) have been a mistake, even though it's clearly the right architecture at Stage 4?
