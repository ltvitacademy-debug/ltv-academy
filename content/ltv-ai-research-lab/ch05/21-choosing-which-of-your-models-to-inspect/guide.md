# Choosing Which of Your Models to Inspect

Chapter 4 built and evaluated SQL Pete. Chapter 3 built a separate reward model for Project 2. Both are sitting on disk, both are open-weight, and both are fair game for this chapter's interpretability case study. The hard part isn't access — it's scope. This lesson picks one model and one question, and explains why the choice matters more than the technique.

## What you'll learn

- Why "fully understand the model" is not a researchable question, and what a scoped one looks like instead
- The two candidate models available in this lab — SQL Pete and the Project 2 reward model — and what each is actually built from
- Why a documented behavior difference beats going fishing for one
- The specific question this chapter commits to, and why it's the right size for the time available

## A broad question isn't a research plan

"Understand how SQL Pete generates SQL" sounds like a reasonable goal for an interpretability case study, but it isn't a question — it's a mission statement. It has no stopping condition: there's no experiment you could run that would let you say "done." Interpretability work on even a 1.5B-parameter model routinely takes a research team weeks to make a dent in one specific behavior, let alone all of its behavior. A case study with four lessons needs a question with a yes/no answer at the end of it.

A scoped, falsifiable question looks like this instead: *"Why does SQL Pete sometimes generate a column name that doesn't exist in the Northwind or AdventureWorks2012 schema?"* That question already has three things going for it: a known rate (Lesson 19 measured a hallucination rate for both checkpoints), a specific mechanism to go looking for (is the model copying names it should be copying, or drifting onto plausible-but-wrong ones), and a concrete pass/fail bar for whatever you find — either the evidence points at a specific component, or it doesn't.

## Two candidate models

This lab has two open-weight, inspectable models sitting on disk by the time Chapter 5 starts:

- **SQL Pete** (Chapter 4) — `Qwen2.5-Coder-1.5B-Instruct`, decoder-only, LoRA fine-tuned then RLHF'd. It generates a SQL query token by token from a natural-language question. The known behavior to chase is schema hallucination on held-out failures (Lesson 19).
- **The Project 2 reward model** (Chapter 3) — `distilbert-base-uncased`, encoder-only, plus a scalar scoring head. It scores one serialized (original, candidate) pair with a single number. The known behavior to chase is the surface-polish bias on the adversarial subset (Lesson 13).

Both are legitimate targets. The reward model's surface-polish bias is a real, measured finding too, and a circuit-level account of why a DistilBERT classifier conflates "tidy" with "correct" would be a fine case study in a different course. But it's a worse fit for *this* chapter, for a structural reason: the interpretability technique Lesson 22 teaches — activation patching between a "good" run and a "bad" run — needs two runs of the same model that differ in one output token, so you can trace which component's activation caused the difference. SQL Pete gives you that cleanly: hold the question and schema fixed, look at a generation that names the right column against one that hallucinates a wrong one, and patch between them. The reward model's output is a single scalar on a single forward pass — there's no second token to compare against, which makes the same patching technique much harder to apply without first inventing a different experimental setup.

## Why a known behavior difference beats fishing

Lesson 19 already did part of this chapter's work by accident: it measured a hallucination rate on held-out failures and confirmed the regression is real, not noise. That's the difference between this case study and one that starts from zero. Going in with "let's see what SQL Pete's attention heads are doing" and hoping something interesting turns up is a much weaker starting position than going in with "here's a behavior we already know happens at a measured rate, and here's a mechanistic hypothesis for why." The second approach gives you a falsifier before you've run a single hook — if patching the component you suspect doesn't change whether the model hallucinates, the hypothesis is wrong, and you know that cleanly rather than wondering if you just didn't look hard enough.

## The question this chapter commits to

SQL Pete, specifically its schema-hallucination behavior from Lesson 19, is the target for the rest of this chapter. The working hypothesis going into Lesson 22: SQL Pete has some component — a layer, maybe a specific attention head — responsible for "copying" a column name that's actually present in the schema text earlier in the prompt, and when that component fails to engage, the model falls back on a plausible-sounding but nonexistent name instead. That's a real mechanistic claim with a real way to be wrong, which is exactly the shape a four-lesson case study needs.

## Key terms

- **Scoped question** — a research question narrow enough to have a concrete pass/fail answer within the time available, as opposed to an open-ended goal like "understand the model"
- **Falsifiable hypothesis** — a specific causal claim about a model's internals that a single experiment could disprove
- **Activation patching** — swapping an internal activation between two forward passes to test whether a component causally drives an output difference (Lesson 22 builds this)
- **Schema hallucination** — SQL Pete's named behavior from Lesson 19: referencing a table or column name that doesn't exist in the target schema

## Recap

A case study needs a question with a stopping condition, not a mission statement — and this lab already has one sitting in Lesson 19's results. Of the two candidate models, SQL Pete fits the activation-patching method better than the Project 2 reward model does, and schema hallucination gives this chapter a measured, falsifiable target instead of an open-ended fishing expedition. Next up, Lesson 22: the actual activation-patching workflow against SQL Pete's weights.
