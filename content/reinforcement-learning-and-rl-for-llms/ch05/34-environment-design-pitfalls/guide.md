# Environment Design Pitfalls

This is lesson 34 of the Reinforcement Learning & RL for LLMs course, the closing lesson of Chapter 5, RL Environments & Infrastructure. You've now seen the Gymnasium API, built a custom environment, vectorized it, shaped its reward, and watched a reward go wrong in the boat-racing example. This lesson pulls those threads together into a practical checklist: the handful of pitfalls that account for most "my agent won't learn" and "my agent learned something weird" problems in practice.

## What you'll learn

- Sparse rewards, revisited as a design choice you make, not just something that happens to you
- Non-stationarity: when the environment itself changes underneath a fixed policy
- Partial observability: when the observation doesn't contain enough to act optimally
- A pre-training checklist for catching these before you burn compute

## Pitfall 1: sparse rewards (by choice, not by accident)

Lesson 32 covered sparse rewards as a problem to shape around. The pitfall version of this is designing a new environment and defaulting to "reward only at the very end" without considering the cost. Every environment you build is a choice about how much signal to expose, and that choice has a direct, large effect on how much compute it takes to learn anything at all. Ask explicitly: can any part of this task be rewarded along the way, safely, without creating a reward-hacking opportunity like the ones from lesson 33?

## Pitfall 2: non-stationarity

An environment is **non-stationary** if its dynamics or reward function change over time independent of the agent's own actions — for example, a multi-agent setting where other agents are simultaneously learning and changing their behavior, or a simulated market that drifts regardless of what the agent does. Standard RL theory assumes a fixed Markov Decision Process; algorithms built on that assumption can become unstable or converge to policies that were only good for a version of the environment that no longer exists. If your environment is secretly non-stationary, diagnose it before blaming the algorithm — logging reward trends alongside any external parameters that change over time is the first thing to check.

## Pitfall 3: partial observability

A Markov Decision Process assumes the current observation is enough to act optimally. Many realistic environments violate this: the agent needs information from several steps ago that isn't in the current observation (a POMDP — Partially Observable MDP). A classic symptom is a policy that plateaus well below the apparent difficulty of the task, because no amount of training can make a policy that only sees one frame infer velocity, or recall which rooms it has already searched. The fix is architectural (stacking recent observations, adding recurrence) rather than something more training or reward tuning can solve — recognizing *which* kind of problem you have saves significant wasted effort.

## A pre-training checklist

Before spending compute training against a new environment, it's worth walking through:

- **Reward density** — is there any safe way to give partial credit before the terminal reward?
- **Reward-hacking surface** — is there any sequence of actions that scores high without accomplishing the task? (Try to find one yourself before training finds it for you.)
- **Stationarity** — does anything about the environment's dynamics or reward change for reasons unrelated to the agent's own actions?
- **Observability** — does the current observation actually contain everything needed to pick the best action, or does the task implicitly require memory?

Catching one of these in review is far cheaper than discovering it after a multi-hour training run converges to a confusing policy.

## Key terms

- **Non-stationary environment** — dynamics or reward that change over time for reasons outside the agent's control
- **Partial observability (POMDP)** — the current observation alone isn't sufficient to act optimally; some state is hidden or requires memory
- **Reward density** — how often, and how informatively, reward is given across an episode

## Recap

Most practical RL training problems trace back to one of a few environment design choices: reward too sparse, dynamics secretly non-stationary, or observations that hide state the policy actually needs. Walking through a short checklist before training catches most of them cheaply. That closes Chapter 5. Chapter 6 turns to Reward Modeling — starting with why LLMs need a learned reward model in the first place, since you can't hand-write one the way you could for CartPole.
