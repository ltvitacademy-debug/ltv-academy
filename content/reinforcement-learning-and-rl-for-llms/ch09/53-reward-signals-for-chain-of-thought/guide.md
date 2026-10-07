# Reward Signals for Chain-of-Thought

This is lesson 53, opening Chapter 9, RL for Reasoning. You've now seen the full RL-for-LLMs toolkit: PPO's mechanics (Chapter 4), the RLHF pipeline and its failure modes (Chapter 7), and RLAIF as an alternative feedback source (Chapter 8). This chapter turns that toolkit toward a different target — not "make the response more preferred," but "make the model reason correctly." The first question is the most basic one: where does the reward signal even attach to a chain-of-thought (CoT) trace?

## What you'll learn

- Treating a full CoT trace plus final answer as a single RL rollout, with tokens as actions
- Where a reward can attach to that rollout, and why that choice matters
- Why a Chapter 6-style learned preference reward model is a weak fit for reasoning traces
- The shift toward objective correctness as the reward signal, previewing RLVR (lesson 55)

## A CoT trace as a rollout

Nothing about the underlying RL machinery changes from Chapter 4. The policy π_θ is still the LLM, actions are still tokens, and a trajectory is still scored and fed through the same clipped PPO objective. What changes is the *content* of the trajectory: instead of one short response, a rollout is now a full reasoning trace — a sequence of intermediate steps — followed by a final answer.

```python
prompt = "What is the sum of the first 50 positive integers?"
trace = policy.generate(prompt, max_new_tokens=512)
# trace = "Let's use the formula n(n+1)/2... = 50*51/2 = 1275. Answer: 1275"
reward = score(prompt, trace)          # where does this number come from?
advantage = compute_advantage(reward, value_estimate)
ppo_update(trace, advantage)
```

Everything downstream of `score()` — advantage estimation, the clipped surrogate, the value and entropy terms — is identical to Chapter 4. The open design question for this entire chapter is what `score()` actually computes.

## Where can a reward attach?

A reasoning trace gives you more than one place to attach a reward:

- **A single scalar on the whole trace** — the simplest option, and the one RLHF (Chapter 7) already uses: one reward model call per full rollout, reward attaches only at the final token, everything else gets zero and relies on the advantage estimator (GAE, lesson 25) to propagate credit backward through the trace.
- **A scalar tied to the final answer's correctness** — instead of a learned reward model's preference score, check the answer against ground truth. This is an *outcome* reward, and it's the seed of lesson 54's outcome-vs-process distinction.
- **A score at each intermediate reasoning step** — a *process* reward, judging whether each step is valid on its own, not just whether the trace ends correctly. Also covered in lesson 54.

## Why a Chapter 6 preference reward model struggles here

The Bradley-Terry reward model from Chapter 6 was trained on human preference labels — which response do people like better. That works reasonably well for style, helpfulness, and safety, where human judgment is a decent proxy for quality. It works poorly for reasoning: humans are slow and unreliable at checking a dense page of algebra or a multi-step proof, so preference labels on reasoning traces are noisy, expensive to collect at scale, and prone to picking up superficial cues — fluent-sounding, confident-looking reasoning — rather than tracking actual correctness. A reward model trained on that signal will reward confident wrongness as readily as confident correctness, which is a direct setup for the reward hacking failure modes lesson 57 covers in depth.

## The shift toward objective correctness

Math and code have something most RLHF targets don't: an objective, mechanically checkable notion of correct. A final numeric answer can be checked against a known solution; code can be run against unit tests. That observation is the entire premise behind replacing a learned, subjective reward model with a rule-based *verifier* — reinforcement learning with verifiable rewards, or RLVR, which lesson 55 covers as the mechanism behind models like DeepSeek-R1-Zero. This lesson's job was just to establish the vocabulary: rollout, reward attachment point, and the gap between human preference and verifiable correctness that motivates everything else in this chapter.

## Key terms

- **CoT rollout** — a full reasoning trace plus final answer, treated as one RL trajectory of token-level actions
- **Reward attachment point** — where in a trace a reward signal is computed: whole-trace scalar, final-answer correctness, or per-step
- **Outcome reward** — a reward based only on whether the final answer is correct
- **Process reward** — a reward based on the validity of individual intermediate steps
- **Verifier** — a rule-based or programmatic checker (not a learned reward model) that scores correctness objectively

## Recap

A CoT trace is just a longer RL rollout, and the real design choice in this chapter is where and how its reward attaches — as one learned preference score, as checkable answer correctness, or as a per-step judgment. A Chapter 6-style reward model is a weak fit for reasoning because human preference doesn't track correctness well at this density. Next, lesson 54 draws out the outcome-reward-versus-process-reward distinction in full, before lesson 55 shows how verifiable rewards remove the learned reward model from the loop entirely.
