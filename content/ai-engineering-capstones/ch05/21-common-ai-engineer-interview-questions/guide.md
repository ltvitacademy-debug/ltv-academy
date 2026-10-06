# Lesson 21 — Common AI Engineer Interview Questions

**Chapter 5 · Career Preparation · Lesson 21 of 23**

## What you'll learn

- The method for answering an AI engineering interview question, not a script to memorize
- RAG architecture questions: chunking, retrieval, and why weak context shouldn't produce a confident answer
- Prompt engineering questions: how to defend a prompting decision with a reason, not a preference
- Agent-safety and cost/latency questions that separate production thinking from demo thinking

## Answer with a method, not a memorized script

AI engineering interview questions rarely have one "correct" answer — they're testing whether you can reason through a real tradeoff out loud. The reliable method, for almost any question in this lesson: **name the tradeoff, state your default, then name the condition that would change your answer.** An interviewer who hears "it depends, and here's specifically what it depends on" is hearing a stronger signal than either a confident one-liner or an unfocused list of options. This lesson teaches that method across four common question categories — it does not hand you fake "war stories" to recite, because a made-up incident falls apart under one follow-up question.

## RAG architecture tradeoffs

**"How would you choose a chunk size for a RAG pipeline, and what goes wrong if you get it wrong?"**

Apply the method: the tradeoff is recall versus precision — smaller chunks retrieve more precisely but can lose surrounding context; larger chunks preserve context but dilute relevance and cost more per retrieved token. Your default: start near a few hundred tokens with overlap, then tune against an actual eval set rather than guessing. The condition that changes it: document structure — dense technical text often wants smaller chunks than narrative text.

**"What should a RAG system do when the retrieved context is only weakly related to the question?"**

The tradeoff is helpfulness versus honesty. Forcing an answer from weak context is a primary source of hallucination (Chapter 2, Retrieval & Generation). The stronger default is a system that recognizes low relevance and says so, or asks a clarifying question, rather than generating a confident-sounding guess.

## Prompt engineering decisions

**"Why did you structure your system prompt this way?"**

Never answer "it felt right." Defend it with a reason tied to the model's actual behavior you observed: "I moved the output-format instruction to the end because the model was following earlier instructions more reliably than instructions buried in the middle," or "I added explicit few-shot examples because zero-shot responses were inconsistent in format." A defensible prompting decision is one you changed *because* of an observed failure, and can describe the before/after.

**"How do you handle a prompt that works for most inputs but fails on edge cases?"**

Name the tradeoff: a longer, more defensive prompt handles more edge cases but costs more tokens and can make the model more rigid on the common case. The default: fix the specific failure you found with a targeted instruction or example, re-run your eval set to confirm you didn't regress the common case, rather than guessing at a general fix.

## Agent safety considerations

**"What stops your agent from doing something destructive?"**

This is a layered-defense question, not a one-answer question: narrow, well-scoped tools (Chapter 3 of AI Agents); a human-approval checkpoint before any irreversible action; action-count and cost limits; and an audit log that lets you detect and investigate anything that slips through. Naming more than one layer is what signals real production thinking — any single layer failing shouldn't mean total failure.

**"How do you decide which actions need human approval and which don't?"**

The tradeoff is safety versus friction — approving everything makes the agent useless; approving nothing is reckless. The default: gate on reversibility and blast radius — an action you can't undo, or one that affects data/money/other people, gets a checkpoint; a read-only or easily-undone action doesn't.

## Cost and latency tradeoffs

**"Your RAG system is too slow. What do you look at first?"**

Name where time actually goes: embedding the query, the vector search itself, any re-ranking step, and the generation call — then say you'd measure each stage before guessing which one to optimize. A common real lever: cutting the number of retrieved chunks or using a smaller/faster model for a first-pass filter before a larger model generates the final answer.

**"How would you reduce the cost of a production LLM application without hurting quality?"**

Name concrete levers: caching repeated or similar queries, routing simpler queries to a cheaper model and only escalating harder ones, shortening prompts and retrieved context to what's actually needed, and batching where latency allows it. Tie any lever back to your eval pipeline — a cost cut you haven't measured against quality isn't a safe cut, it's a guess.

## Key terms

| Term | Meaning |
|---|---|
| Tradeoff-first answer | The method of naming the real tradeoff and your default before giving a final answer |
| Blast radius | How much damage an action could do if it goes wrong — a key input to whether it needs approval |
| Model routing | Sending easier queries to a cheaper/faster model and harder ones to a stronger model |

## Lab

Pick three questions from this lesson — one from each of three different categories — and answer each one out loud, in under ninety seconds, using the name-the-tradeoff method. Record yourself if you can, and check whether you actually named a condition that would change your answer.

## Check yourself

Can you explain, in your own words, why "name the tradeoff, state your default, name what would change it" is a stronger interview method than memorizing a single confident answer to each question?
