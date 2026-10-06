# Lesson 8 — Self-Consistency & Multiple Sampling

**Chapter 2 · Advanced Prompting Techniques · Lesson 8 of 24**

## What you'll learn

- Why a single chain-of-thought run can still land on a wrong answer
- What self-consistency is: sampling the same prompt multiple times and taking a majority vote
- A worked example showing three sampled reasoning paths and how they're reconciled
- The real cost of this technique, and when it's worth paying

## One chain-of-thought run isn't guaranteed to be right

Lesson 7 showed chain-of-thought catching mistakes a direct-answer prompt
missed. But a single CoT run can still go down a reasoning path that
arrives at a wrong answer — models aren't deterministic, and one sample is
still just one roll. The fix isn't a better prompt; it's asking the same
question more than once.

## Self-consistency: sample, then vote

**Self-consistency** means running the same chain-of-thought prompt
several times (typically 3-10), independently, and taking the answer that
shows up most often across the runs — rather than trusting whichever
single answer came first.

```
Prompt (run 3 times independently):
"A train travels 60 mph for 2.5 hours,
then 45 mph for 1 hour. Total distance?
Think step by step."

Run 1: 60x2.5=150, 45x1=45, total=195 miles
Run 2: 60x2.5=150, 45x1=45, total=195 miles
Run 3: 60x2.5=150, 45x1=45, total=185 miles
         (arithmetic slip on the last step)

Majority answer: 195 miles (2 of 3 agree)
```

Run 3's arithmetic slip gets outvoted. A single run of that same prompt,
if it happened to be run 3, would have silently returned the wrong answer
with no signal that anything was off.

## Why this works

Different sampled runs can take slightly different reasoning paths —
breaking a calculation into steps in a different order, double-checking a
different intermediate value. When most paths converge on the same final
answer, that agreement is itself useful evidence the answer is right;
when the runs disagree, that disagreement is a signal the question (or
the prompt) might need more work, not just noise to ignore.

## The real cost

```
1 sample:    1x the cost and latency, no
             consistency check
5 samples:   5x the cost and latency, strong
             majority signal
10 samples:  10x the cost and latency,
             diminishing extra confidence
             past ~5 for most tasks
```

Self-consistency multiplies cost and latency directly by the sample
count, so it's reserved for cases where a wrong answer is expensive — a
calculation feeding a financial decision, a classification gating an
automated action — not applied by default to every prompt in an
application.

## Key terms

| Term | Meaning |
|---|---|
| Self-consistency | Sampling the same prompt multiple times and taking the majority answer |
| Sampling | Running a prompt more than once, independently, to get multiple candidate answers |
| Majority vote | Selecting the answer that appears most often across sampled runs |

## Lab

Take the chain-of-thought prompt from Lesson 7's lab. Run it three times
independently (or simulate it by asking for three separate reasoning
attempts in one request). Check whether all three agree — and if they
don't, which answer the majority supports.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking, why
self-consistency's cost scales directly with the number of samples — and
why that makes it a tool for high-stakes answers, not every prompt in an
application.
