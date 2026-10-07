# Outcome Reward vs. Process Reward

This is lesson 54 of Chapter 9, RL for Reasoning. Lesson 53 named three places a reward can attach to a chain-of-thought trace — whole-trace scalar, outcome correctness, or per-step judgment. This lesson works through the second and third of those in depth: outcome reward models (ORMs) and process reward models (PRMs), the two dominant strategies for scoring reasoning traces, and the real trade-off between them.

## What you'll learn

- How an outcome reward model (ORM) scores a trace, and what it ignores
- How a process reward model (PRM) scores a trace, and why that's a denser signal
- Why OpenAI's "Let's Verify Step by Step" found PRMs out-performing ORMs on math reasoning
- How step-level labels get produced at scale without a human reading every step

## Outcome reward: score the destination

An ORM looks only at the final answer. It doesn't care whether the reasoning in between was sound, circular, or even relevant — if the final answer matches, the trace gets full reward.

```python
def orm_reward(trace, ground_truth_answer):
    final_answer = extract_answer(trace)       # parse out the boxed/final answer
    return 1.0 if final_answer == ground_truth_answer else 0.0
```

This is simple, cheap, and exactly the kind of signal verifiable rewards (lesson 55) are built on. Its weakness is also exactly what you'd expect from only checking the destination: a trace that stumbles into the right number through flawed logic, or two cancelling errors, gets the same reward as a trace that reasoned correctly throughout. The reward carries no information about *why* the answer is right.

## Process reward: score every step

A PRM instead assigns a score to each intermediate step in the trace, judging whether that step is a logically valid move given what came before — independent of whether the trace ultimately lands on the right final answer.

```python
def prm_reward(steps, step_scorer):
    return [step_scorer(steps[:i+1]) for i in range(len(steps))]
    # one score per step, not one score for the whole trace
```

This matters for credit assignment, a problem you've already met in Chapter 4's advantage estimation: with only a terminal reward, the advantage estimator (GAE) has to propagate a single number backward through every token in a long trace, which is a noisy, high-variance job the longer the trace gets. Per-step rewards hand the credit-assignment problem useful intermediate signal directly, rather than asking the value function to reconstruct it from a single endpoint.

## The empirical case, and the cost

OpenAI's "Let's Verify Step by Step" (2023) trained both an ORM and a PRM on the same math problems and found the PRM a meaningfully better reward signal — it both solved more problems when used to rank candidate solutions and generalized better, because it rewards sound reasoning rather than merely matching an answer string. The cost is supervision: their PRM800K dataset required human annotators to label roughly 800,000 individual steps as correct, incorrect, or neutral — orders of magnitude more labeling effort than preference pairs over whole responses.

That cost has pushed later work toward *automating* step labels instead of hand-annotating them. The Math-Shepherd approach, for instance, labels a step by sampling many continuations from it and checking what fraction of completions reach the correct final answer — a step is "good" if continuations from it still tend to succeed, without any human reading the step itself. This turns a PRM's training data into something closer to Monte Carlo value estimation (the same family of idea as the returns you've used since Chapter 1) than hand-graded supervision.

## Choosing between them in practice

Most real systems don't pick one exclusively. Outcome reward is cheap and dominates large-scale RL training, where millions of rollouts make per-step human or even automated labeling costly to run at that volume. Process reward earns its cost where it's reused many times over — most prominently to *guide* search rather than to train the policy directly, which is exactly the role it plays in the test-time compute methods lesson 58 covers.

## Key terms

- **Outcome reward model (ORM)** — scores a trace by whether the final answer matches ground truth, ignoring the reasoning in between
- **Process reward model (PRM)** — scores each intermediate reasoning step on its own logical validity
- **PRM800K** — OpenAI's roughly 800K human-labeled step dataset from "Let's Verify Step by Step"
- **Monte Carlo step labeling** — labeling a step by the fraction of sampled continuations from it that reach the correct answer, without human review of the step
- **Credit assignment** — the problem of attributing a trajectory's reward back to the individual actions that earned it

## Recap

Outcome reward is cheap and checks only the destination; process reward is denser and checks the path, at a real labeling cost that automated methods like Monte Carlo step labeling are starting to shrink. Both are still reward *signals* that something has to supply — lesson 55 covers RLVR, where that something is a rule-based verifier rather than any learned model at all, outcome or process.
