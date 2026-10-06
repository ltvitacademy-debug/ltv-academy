# Lesson 7 — Chain-of-Thought Prompting

**Chapter 2 · Advanced Prompting Techniques · Lesson 7 of 24**

## What you'll learn

- What chain-of-thought (CoT) prompting is and why it improves multi-step reasoning
- How to trigger it with a simple instruction, versus showing a worked reasoning example
- A worked example where skipping straight to the answer gets a math problem wrong
- When chain-of-thought is worth the extra tokens, and when it's pure overhead

## The problem: skipping straight to the answer

Ask a model to jump directly to a final answer on a task with several
logical steps, and it sometimes pattern-matches to a plausible-looking
answer without actually working through the steps that would get there
correctly — the same way a person blurting out a guess skips the checking
a problem actually needs.

```
Prompt:  "A store has 23 crates of apples, 14
         apples each. 6 crates are returned.
         How many apples are left?"
Answer:  "266" (wrong — skipped a step)
```

## Chain-of-thought: show the work

**Chain-of-thought prompting** asks the model to reason step by step
before giving a final answer, which gives it room to catch its own
arithmetic or logical slips the way working out a problem on paper does.

```
Prompt:  "A store has 23 crates of apples, 14
         apples each. 6 crates are returned.
         How many apples are left? Think step
         by step before giving the final answer."
Response: "23 - 6 = 17 crates remain.
          17 x 14 = 238 apples.
          Final answer: 238"
```

The simplest way to trigger it is adding a phrase like "think step by
step" or "show your reasoning before answering." That alone measurably
improves accuracy on multi-step arithmetic, logic, and planning tasks.

## Few-shot chain-of-thought

Combining CoT with the few-shot technique from Lesson 2 — showing a worked
example that includes the reasoning, not just the final answer — pushes
reliability further, because the model copies the *pattern* of reasoning,
not just the instruction to reason.

```
Example:  "Q: A bakery sells 18 cupcakes per box,
          has 7 boxes, sells 2 boxes. How many
          cupcakes are left?
          A: 7 - 2 = 5 boxes remain.
          5 x 18 = 90 cupcakes.
          Final answer: 90"

Real Q:   "A store has 23 crates of apples..."
```

## When it's worth it — and when it isn't

CoT is worth the extra tokens for arithmetic, multi-step logic, planning,
and anything requiring the model to track several pieces of state at once.
It's mostly overhead for simple lookups, direct classification, or
single-fact retrieval, where there's no real chain of reasoning to walk
through — "think step by step" on "what's the capital of France?" just
adds tokens without adding accuracy.

## Key terms

| Term | Meaning |
|---|---|
| Chain-of-thought (CoT) prompting | Asking the model to reason step by step before giving a final answer |
| Zero-shot CoT | Triggering step-by-step reasoning with just an instruction, no worked example |
| Few-shot CoT | Combining worked reasoning examples with the step-by-step instruction |

## Lab

Take a task with at least two logical steps (a word problem, a multi-step
classification, a small planning task). Run it once asking for the answer
directly, then again with "think step by step before answering." Compare
whether the reasoning version catches a mistake the direct version made.

## Check yourself

You're ready for Lesson 8 when you can explain, without looking, why
"think step by step" helps on a multi-step math problem but adds nothing
useful to "what's the capital of France?"
