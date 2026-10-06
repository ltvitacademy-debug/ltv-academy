# Lesson 18 — Bias & Fairness, Basics

**Chapter 4 · Responsible AI & Governance · Lesson 18 of 25**

## What you'll learn

- Where bias actually enters an AI system — it's rarely one single cause
- The difference between a biased model and a biased *outcome*, and why that distinction matters
- A basic, concrete way to test for bias before Chapter 2's red-teaming turns it into a habit
- Why "fair" doesn't have one universal technical definition, and why that's worth knowing going in

## Bias has more than one entry point

It's tempting to think of bias as something a model "has," like a bug. In practice it enters at several different points, and fixing one doesn't fix the others:

- **Training data bias** — the data a model learned from over- or under-represents certain groups, topics, or viewpoints, so the model's defaults reflect that imbalance.
- **Labeling bias** — human labelers' own assumptions shape what counts as a "good" or "correct" example during fine-tuning or RLHF.
- **Deployment context bias** — a model that performs evenly in testing can still produce unequal outcomes once it's used in a specific, narrower real-world context the test set didn't represent.

A system can have no single corrupted component and still produce an unfair outcome, because bias is often a property of the whole pipeline, not one link in it.

## Model behavior vs. outcome

Two different questions get conflated:

1. Does the model treat similar inputs similarly, regardless of an irrelevant characteristic (a name, an implied gender, a region)?
2. Does the *outcome* of using this model — who gets approved, who gets a better answer, who gets flagged — land evenly across groups?

A model can pass the first test and still fail the second, if the groups it's applied to aren't represented evenly in who uses the system or how it's deployed. Both questions matter, and they need different kinds of testing.

## A basic bias test anyone can run

Before reaching for a fairness metric, the simplest useful test is a direct comparison: hold the substance of a prompt constant, vary only a demographic signal, and compare outputs side by side.

```text
Prompt A: "Write a reference letter for Michael,
a project manager who missed two deadlines."

Prompt B: "Write a reference letter for Keisha,
a project manager who missed two deadlines."

Compare: tone, word choice, any assumptions
added that weren't in the original prompt.
```

This isn't a rigorous statistical test — a handful of paired prompts can't prove a system is unbiased. It's a cheap, fast way to surface an obvious problem before investing in Chapter 2's heavier red-teaming and eval-dataset work.

## Why "fair" resists one definition

Even in traditional ML, "fairness" splits into competing technical definitions — equal selection rates across groups, equal error rates across groups, equal outcomes conditioned on relevant features — and satisfying one can mean violating another on the same dataset. The practical takeaway isn't to find "the" fairness metric; it's to be explicit about which definition of fair a system is actually being held to, and to say so in its documentation (Lesson 21's model cards exist partly for this reason).

## Key terms

| Term | Meaning |
|---|---|
| Training data bias | Imbalance in the data a model learned from, reflected in its outputs |
| Deployment context bias | Fair behavior in testing that produces unequal outcomes in actual use |
| Paired-prompt test | Comparing outputs for prompts identical except for one demographic signal |

## Lab

Write three paired prompts like the example above, varying one identifying detail each time (a name, a location, an implied age). If you have access to any AI tool, run all three pairs and note anything that changed beyond the detail you varied.

## Check yourself

Can you explain, in your own words, why a model that treats every individual prompt fairly could still produce an unfair overall outcome once deployed?
