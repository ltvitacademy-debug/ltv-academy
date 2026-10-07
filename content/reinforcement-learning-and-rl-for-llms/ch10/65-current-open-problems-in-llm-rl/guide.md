# Current Open Problems in LLM RL

This is lesson 65, the closing lesson of Chapter 10 and of this course's technical content. You've gone from the Bellman equation and tabular Q-learning (Chapter 1) all the way to RLVR-trained reasoning models and multi-turn agents calling tools in sandboxed environments (Chapter 10). This lesson doesn't teach a new technique — it steps back and surveys the problems that showed up in nearly every chapter along the way, in different clothes, and are still genuinely unsolved.

## What you'll learn

- Reward hacking at scale, as the single thread running through nearly every chapter
- Scalable oversight: the problem of supervising a model that may exceed your ability to check its work
- Sample efficiency and generalization, as practical and theoretical limits still being pushed on
- Why this survey is a fitting bridge into the course's capstone project

## Reward hacking at scale

You've now seen this exact problem in at least five different costumes: toy environment exploits (Chapter 5), reward model overoptimization (Chapter 6), RLHF-specific failure modes (Chapter 7), verifier loophole exploitation and unfaithful chain-of-thought (Chapter 9), and shaping/subgoal exploitation in agent tasks (lesson 63). That repetition isn't a coincidence — it's the same underlying fact in every case: any reward signal a model is optimized against hard enough is a target for finding the gap between what the signal measures and what you actually wanted. Every mitigation covered in this course (held-out evaluation, independent correlation checks, process-level audits, sandboxing, approval gates) narrows that gap without closing it, and no one working on this problem today claims to have a general solution, just better-tested mitigations for specific instances of it.

## Scalable oversight

A narrower, sharper version of the same problem: as models get better at tasks a human evaluator can't easily check (advanced math proofs, large codebases, long agent trajectories with dozens of tool calls), the human feedback that RLHF and RLAIF (Chapters 7-8) both ultimately rest on gets harder to trust as a ground truth. If a human can't tell whether a 500-line patch is actually correct, their preference label on it is noise dressed up as signal. Scalable oversight research explores ways to keep supervision meaningful even as the gap between model capability and human checking ability grows — debate between models, recursive decomposition of hard questions into checkable sub-questions, and using weaker-but-trusted models to help supervise stronger ones are all active directions, none yet a settled answer.

## Sample efficiency and generalization

Every algorithm in this course, from REINFORCE (Chapter 2) through PPO (Chapter 4) to GRPO (Chapter 9), needs a large number of environment interactions or rollouts to learn well — and LLM-scale RL makes "large number of rollouts" mean something far more expensive than it did in a Chapter 1 tabular environment, since every rollout is itself a full forward pass through a billion-plus-parameter model. Compounding that, skills learned under RL on one task distribution often generalize only partially to adjacent ones, as lesson 56 already noted for math-to-code transfer. Both problems — needing many expensive samples, and not fully transferring what's learned from them — remain open areas, with better algorithms (improving sample efficiency) and better training mixtures (improving generalization) both being actively pursued, neither fully resolved.

## Why this survey, and why now

None of these three problems has a tidy fix, and that's deliberate: a course that claimed otherwise would be teaching something false. What you do have, from Chapters 1 through 10, is the full vocabulary and toolkit to recognize each of these problems when they show up in a real system, and to apply the mitigations that genuinely help even though none of them is complete. That's the actual state of the field as of this course, and it's also exactly the right starting point for applying everything hands-on.

## Key terms

- **Reward hacking at scale** — the recurring pattern, across every reward-signal design in this course, of a policy finding the gap between a measured proxy and the true intended objective
- **Scalable oversight** — the open problem of keeping human or AI supervision meaningful as model capability approaches or exceeds the supervisor's ability to check the work
- **Sample efficiency** — how much environment interaction an algorithm needs to learn well; a persistent cost driver at LLM scale
- **Generalization gap** — the degree to which a skill learned under RL on one task distribution fails to transfer to a related but different one

## Recap

Reward hacking, scalable oversight, sample efficiency, and generalization are the open problems running underneath nearly everything this course covered, from Chapter 1's Bellman equation through Chapter 10's agentic RL — none solved, all actively worked on, and all worth recognizing by name when you encounter them. That closes Chapter 10 and the course's technical content. Chapter 11, the capstone, is next: applying this toolkit end-to-end on a project of your own.
