# Recursive Reward Modeling

Debate pits two models against each other in a single round of argument. This lesson covers a different strategy for the same underlying problem: instead of a one-shot contest, build oversight capacity up gradually, using each generation of aligned model as an assistant for supervising the next, more capable one.

## What you'll learn

- The core idea behind recursive reward modeling
- How it builds on ordinary RLHF rather than replacing it
- Why the approach is "recursive" and what bootstrapping means here
- The main risk the technique has to manage at every iteration
- How it relates to debate as a complementary, not competing, proposal

## From reward modeling to recursive reward modeling

Standard reward modeling, as covered in Chapter 2's RLHF lesson, learns a reward function from human preference judgments and then trains a policy to optimize it. Jan Leike and colleagues at DeepMind formalized recursive reward modeling (RRM) in their 2018 paper "Scalable Agent Alignment via Reward Modeling: A Research Direction" as a way to extend this same mechanism to tasks where a human alone can't generate good preference judgments. The core move: instead of asking a human to judge the target task directly, first train an assistant model — using ordinary reward modeling on a task the human CAN judge — and then give the human that assistant's help when judging the harder, target task.

## The recursive step: using aligned models to align the next one

The "recursive" part is the mechanism repeating itself at increasing levels of capability. Suppose a human can reliably judge task difficulty level 1 and trains an aligned assistant for it. That assistant, now reasonably trustworthy at level 1, can help the human evaluate outputs at level 2 — summarizing relevant evidence, flagging likely errors, answering the human's follow-up questions about the work being judged — effectively extending what the human-plus-assistant team can reliably assess. A new reward model trained with that assistance produces a level-2-aligned policy, which can in turn assist oversight of a level-3 task, and so on. Each step is ordinary RLHF; what changes is that the "human feedback" at each level is really "human feedback augmented by the previous level's aligned model," which is the bootstrapping mechanism the whole proposal depends on.

## Why this is attractive

Recursive reward modeling doesn't require inventing a wholly new training algorithm — it reuses the RLHF machinery already in production, which makes it comparatively easy to adopt incrementally. It also degrades gracefully in principle: at any given level, if the assistant turns out not to be helpful, you're no worse off than doing reward modeling without it, since the human is still nominally in the loop. And it directly targets the lesson 19 problem: rather than asking a human to somehow get better at judging a task beyond their expertise, it gives them tools built by the previous round of alignment work.

## The risk that compounds at every level

The entire scheme has one load-bearing assumption: that the assistant model at each level is actually aligned and actually helpful, not subtly wrong in ways the human can't detect — which is exactly the problem the scheme is trying to solve, one level down. If an assistant at level N has a flaw invisible to the human overseeing it, that flaw doesn't stay contained — it can get baked into the judgments used to train the level N+1 reward model, compounding across iterations rather than averaging out. This is why recursive reward modeling is usually framed as a research direction to be validated step-by-step with careful measurement at each level, rather than a scheme to run blindly on faith that bootstrapping works.

## How it relates to debate

Recursive reward modeling and debate are not competitors for the same slot — they attack the oversight problem from different angles and are often discussed as complementary. Debate tries to extract a trustworthy signal from a single adversarial exchange without requiring any prior aligned model. Recursive reward modeling instead leans on an existing chain of partially-aligned assistants built up over time. In practice, techniques like debate can themselves be used as the "assistance" an aligned model provides within a recursive reward modeling pipeline, rather than the two approaches being mutually exclusive.

## Key terms

| Term | Meaning |
|---|---|
| Recursive reward modeling (RRM) | A scalable oversight proposal that uses a previously-trained aligned model to assist a human in judging a harder task, then repeats the process at increasing capability levels |
| Bootstrapping | Using the output of one iteration (an aligned assistant) as an input to the next iteration's training process |
| Assistant model | The model from a prior alignment iteration that helps the human evaluate the current, harder task |
| Compounding error | A flaw in an assistant model that goes undetected and gets baked into the next level's reward model instead of being caught and corrected |

## Recap

Recursive reward modeling extends ordinary RLHF by having each generation of aligned assistant help supervise the next, more capable one — a bootstrapping strategy that reuses existing training machinery but has to carefully guard against undetected flaws compounding across levels. The next lesson, 22, "Weak-to-Strong Generalization," looks at an empirical testbed for a closely related question: what actually happens when a genuinely weaker supervisor trains a genuinely stronger model.
