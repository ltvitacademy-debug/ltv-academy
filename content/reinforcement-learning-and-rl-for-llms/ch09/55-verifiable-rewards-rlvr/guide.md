# Verifiable Rewards (RLVR)

This is lesson 55 of Chapter 9, RL for Reasoning. Lessons 53-54 built up to this point: human preference reward models are a weak fit for reasoning, and even outcome correctness still implied *some* model scoring the answer. This lesson removes the learned model from the loop entirely. Reinforcement learning with verifiable rewards (RLVR) replaces the reward model with a deterministic, rule-based checker — the approach behind DeepSeekMath and DeepSeek-R1-Zero.

## What you'll learn

- What makes a reward "verifiable," and why that's a stronger guarantee than "learned"
- How a math-answer verifier and a code verifier are actually implemented
- Why RLVR removes the reward-model-overoptimization risk from Chapter 6, but not reward hacking entirely
- GRPO, the memory-lighter PPO variant DeepSeek paired with RLVR, at a conceptual level

## What "verifiable" means

Every reward signal so far in this course — the Bradley-Terry reward model (Chapter 6), even an outcome or process reward model — is a trained neural network making a judgment call. RLVR instead scores a rollout with a fixed, programmatic rule that has no parameters to overoptimize against: a function, not a model.

```python
def math_verifier(trace, ground_truth):
    predicted = extract_boxed_answer(trace)
    return 1.0 if symbolic_equal(predicted, ground_truth) else 0.0

def code_verifier(trace, unit_tests):
    code = extract_code_block(trace)
    passed = run_tests(code, unit_tests, timeout=5)
    return passed / len(unit_tests)
```

`symbolic_equal` typically runs through a computer-algebra library (e.g. sympy) rather than a plain string match, so `1/2` and `0.5` and `2/4` all verify as the same answer. `code_verifier` executes the generated code in a sandbox against real unit tests and rewards the fraction passed. Neither function has weights; neither can be fooled the way a learned reward model can be fooled into assigning a high score to a response that merely *looks* good.

## Why this sidesteps reward model overoptimization

Chapter 6 covered reward model overoptimization: push a policy hard enough against a learned proxy reward, and it finds ways to score well on the proxy that don't track the true objective (fluent-sounding, overlong, sycophantic text that a flawed RM happens to score highly). A deterministic verifier has no such soft spots to discover through gradient pressure — a correct answer is correct, full stop, no matter how the policy phrases its way there. This is the central appeal of RLVR: the ceiling on reward hacking is set by how good the verifier's rules are, not by how well a neural network generalized from preference data.

It isn't a complete fix. A verifier can still be gamed if its *rules* have a loophole — a format check that a short string can satisfy without real work, a public test suite with gaps an edge case slips through. Lesson 57 covers exactly these verifier-gaming failure modes in depth.

## The DeepSeek-R1-Zero recipe

DeepSeek-R1-Zero trained directly from a base (pretrained, not instruction-tuned) model using only a rule-based reward: correctness of the final math/code answer, plus a formatting reward checking the response used the expected `<think>...</think>` reasoning-tag structure. No reward model, no human preference data, no SFT warm-start. That combination produced long, self-corrective chains of thought (the model learned to pause, re-check its own work, and backtrack) purely from RL pressure toward verifiable correctness — findings DeepSeekMath established the math-RL groundwork for, with DeepSeek-R1-Zero extending it to a full reasoning-RL recipe.

## GRPO: a lighter-weight partner to RLVR

DeepSeek's papers pair RLVR with GRPO (Group Relative Policy Optimization), a PPO variant that drops the separate value network entirely. Instead of a learned critic producing a baseline (Chapter 4's GAE), GRPO samples a *group* of outputs for the same prompt and uses the group's mean reward as the baseline — the advantage for each sample is just how far its reward sits above or below the group average. This halves the memory footprint (no value network to train alongside the policy) at the cost of needing multiple samples per prompt, which is cheap when the reward is a fast rule-based verifier rather than a learned model requiring its own forward pass.

## Key terms

- **RLVR (RL with verifiable rewards)** — training a policy against a deterministic, rule-based correctness checker instead of a learned reward model
- **Verifier** — the fixed function (symbolic math equality, unit test execution) that scores correctness
- **DeepSeek-R1-Zero** — a model trained with pure RLVR from a base model, no SFT warm-start or human preference data
- **GRPO (Group Relative Policy Optimization)** — a PPO variant that uses a sampled group's mean reward as the baseline instead of a learned value network

## Recap

RLVR trades the learned reward model for a deterministic verifier, closing off reward-model-overoptimization while opening a narrower risk — gaming the verifier's own rules. DeepSeek-R1-Zero showed this alone, paired with the value-network-free GRPO, is enough to produce long, self-correcting reasoning from a base model. Lesson 56 next applies this directly to math and code, the two domains where verifiers are easiest to build correctly.
