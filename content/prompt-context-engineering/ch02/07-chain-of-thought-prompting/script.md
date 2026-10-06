# Lesson 7 — Chain-of-Thought Prompting · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

Welcome to Chapter 2, Advanced Prompting Techniques. We start with one of
the most reliable accuracy boosts in prompt engineering: chain-of-thought
prompting. Let's see what it fixes.

## S2 · CODE CARD (wrong answer, no reasoning)

Ask a model to jump straight to a final answer on a multi-step problem,
and it can pattern-match to something plausible without actually working
through the steps. Here, 23 crates of apples, 14 each, 6 returned — jump
straight to an answer and you get 266. That's wrong.

## S3 · CODE CARD (CoT fixes it)

Add one phrase — think step by step before giving the final answer — and
the model works it out properly: 23 minus 6 is 17 crates, 17 times 14 is
238 apples. Same question, same model, but now it has room to catch its
own slip.

## S4 · CODE CARD (few-shot CoT)

You can push this further by combining it with few-shot: show a worked
example where the reasoning itself is spelled out, not just the final
answer. The model copies the pattern of reasoning, not just the
instruction to reason.

## S5 · STEPS CARD (when it's worth it)

So when does chain-of-thought earn its keep? Worth it for arithmetic,
multi-step logic, and planning — anything tracking several pieces of
state. Not worth it for simple lookups or direct classification, where
there's no real chain of reasoning to walk through in the first place.

## S6 · OUTRO CARD

One instruction, measurably better accuracy on multi-step tasks. Next
lesson, we take this further: running a chain-of-thought prompt multiple
times and comparing the answers — a technique called self-consistency.
