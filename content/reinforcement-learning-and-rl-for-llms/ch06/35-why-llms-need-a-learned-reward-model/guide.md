# Why LLMs Need a Learned Reward Model

This is lesson 35 of the Reinforcement Learning & RL for LLMs course, opening Chapter 6, Reward Modeling. Chapter 5 ended on a specific, concrete problem: hand-written rewards are proxies, and proxies get exploited. Nowhere is that problem sharper than training a large language model to be "helpful, honest, and harmless." Nobody can write a Python function that scores a block of text on those qualities. This lesson explains why, and introduces the fix the field converged on: training a separate neural network to predict human preferences, and using its predictions as the reward signal.

## What you'll learn

- Why "write a reward function for helpfulness" is not a tractable engineering task
- What a reward model actually is: a learned function from (prompt, response) to a scalar score
- Why human preference comparisons are the input, not absolute quality ratings
- How the reward model fits into the larger RLHF pipeline you'll assemble in Chapter 7

## The problem: there is no formula for "good text"

In CartPole, the reward is trivial to write down: +1 per timestep the pole stays up. In the boat-racing game from lesson 33, a flawed proxy reward was still at least expressible in code. For a language model, the actual objective — produce a response that's helpful, accurate, follows instructions, and avoids harm — has no such expression. You cannot write `reward = is_helpful(response)` in any meaningful sense; "helpful" depends on the prompt, the user's intent, factual correctness, tone, and tradeoffs between all of those that no fixed rule captures.

Early attempts to approximate this with hand-written heuristics (length penalties, keyword matching, simple classifiers for toxicity) all suffered the same failure mode from lesson 33: the policy found ways to satisfy the heuristic while producing text nobody would call good — the language-model version of looping the boat around the lagoon.

## The fix: let humans provide the signal, let a network learn the function

The approach that worked, and the one both the InstructGPT paper and Anthropic's "Training a Helpful and Harmless Assistant" paper converged on independently, is to not hand-write the reward at all. Instead:

1. Collect comparisons where a human looks at two responses to the same prompt and picks the better one (covered in full in the next lesson).
2. Train a neural network — the **reward model** — to predict which response a human would prefer.
3. Use the trained reward model's score as the reward signal for reinforcement learning on the language model itself.

The reward model is, formally, a function r_θ(prompt, response) → scalar, usually built by taking a pretrained transformer and replacing its output head with a single scalar regression head. It has learned, from thousands of human comparisons, an approximation of "how good is this response" that is far closer to actual human judgment than any hand-written heuristic — while still being, importantly, only an approximation, which is why reward model overoptimization (lesson 39) remains a real risk even with this fix.

## Why comparisons, not absolute scores

A natural first instinct is to ask humans to rate a single response on a 1-10 scale. In practice this doesn't work well: different annotators anchor their scales completely differently, and the same annotator isn't consistent with themselves across sessions. Asking "which of these two responses is better" is a much easier, much more consistent judgment for a human to make — and it turns out to be sufficient to train a reward model that produces a usable scalar ranking, via the Bradley-Terry model you'll cover two lessons from now.

## Where this fits in the bigger picture

The reward model is not the final product — it's an infrastructure piece that makes the rest of RLHF (Reinforcement Learning from Human Feedback) possible. Once trained, it stands in for a human reviewer during reinforcement learning: the language model generates a response, the reward model scores it, and that score becomes the reward signal an RL algorithm (typically PPO) optimizes against. Chapter 7 assembles this into the full pipeline.

## Key terms

- **Reward model (RM)** — a learned function r_θ(prompt, response) → scalar score, trained to predict human preference
- **RLHF** — Reinforcement Learning from Human Feedback; the overall approach of using a learned reward model trained on human comparisons to supply the reward signal
- **Preference comparison** — a human judgment of which of two responses is better, rather than an absolute rating
- **Proxy reward** — any reward signal (hand-written or learned) that approximates, but isn't identical to, the true objective

## Recap

Hand-written rewards don't scale to "helpful, honest, and harmless" the way they scale to CartPole, because there's no formula for good text. The fix is to train a reward model on human preference comparisons and use its scalar output as the reward signal for RL. Next lesson: how that preference data actually gets collected.
