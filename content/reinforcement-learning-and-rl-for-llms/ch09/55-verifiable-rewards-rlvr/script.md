# Script — Verifiable Rewards (RLVR)

## Segment 1 (title)

Lesson 55, Chapter 9. Human preference reward models are a weak fit for reasoning, and even outcome correctness still implied some model scoring the answer. This lesson removes the learned model entirely — reinforcement learning with verifiable rewards, the approach behind DeepSeekMath and DeepSeek-R1-Zero.

## Segment 2 (code)

Every reward signal so far has been a trained network making a judgment call. RLVR scores a rollout with a fixed, programmatic rule instead — a math verifier running the answer through a computer-algebra check for true equality, a code verifier running generated code against real unit tests in a sandbox. Neither has weights, and neither can be fooled the way a learned reward model can be fooled by something that merely looks good.

## Segment 3 (steps)

This sidesteps reward model overoptimization from Chapter 6. Push a policy against a learned proxy hard enough and it finds soft spots the proxy didn't mean to reward. A deterministic verifier has no such soft spots — correct is correct, however the policy phrases it. The ceiling on reward hacking is set by how good the verifier's rules are, not by how a network generalized. It's not a complete fix though — a loophole in the rules themselves can still be gamed, which lesson 57 covers.

## Segment 4 (steps)

DeepSeek-R1-Zero trained straight from a base model using only a rule-based reward — correctness plus a formatting check — no reward model, no human preference data, no SFT warm-start. That alone produced long, self-corrective reasoning: the model learned to pause, re-check, and backtrack purely from RL pressure. It was paired with GRPO, which drops the value network entirely and uses a sampled group's mean reward as the baseline instead.

## Segment 5 (outro)

A deterministic verifier instead of a learned reward model, paired with a lighter-weight PPO variant — that's the whole RLVR recipe. Next, lesson 56 applies it directly to math and code, the two domains where verifiers are easiest to build correctly.
