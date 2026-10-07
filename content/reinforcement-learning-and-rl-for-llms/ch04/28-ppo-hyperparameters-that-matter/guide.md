# PPO Hyperparameters That Matter

This is lesson 28 of the Reinforcement Learning & RL for LLMs course, closing out Chapter 4, Policy Optimization Methods. Lesson 27 showed how PPO's logged metrics point to a *symptom*; this lesson covers the specific hyperparameters most likely to be the actual *cause* when something is off — and sensible starting values for each, the same defaults that show up across Stable-Baselines3, the original PPO paper, and most RLHF implementations.

## What you'll learn

- The handful of PPO hyperparameters worth tuning first, and reasonable starting values for each
- How clip_range (ε), the learning rate, and n_steps interact rather than acting independently
- Why GAE's λ and the entropy coefficient are usually the last things worth touching, not the first
- A practical starting configuration for a new PPO problem

## The core hyperparameters, in rough priority order

**Learning rate** — typically 3e-4 as a starting point (the same default used in the Stable-Baselines3 example from Lesson 23), sometimes with a linear decay schedule toward 0 over training. This is usually the single highest-leverage knob: too high, and updates overshoot and destabilize training even with clipping in place (clipping limits *how far* a single update can push, but a too-high learning rate still means each update is poorly aimed); too low, and training is needlessly slow to converge.

**clip_range (ε)** — the standard default is 0.2, directly from the original PPO paper. This rarely needs much tuning; if clip_fraction (Lesson 27) is persistently pinned near 0 or 1, that's usually a signal to fix the learning rate first, not to immediately widen or narrow ε.

**n_steps (rollout length)** — how many environment steps get collected before each update, commonly 2048 per parallel environment. Too short, and GAE's advantage estimates have little data to average over, increasing variance; too long, and the policy used to collect data late in the rollout has drifted further from the one used early in the rollout, slightly violating the on-policy assumption the whole method rests on.

**Number of epochs per rollout** — commonly 3-10. More epochs extract more gradient updates from the same expensive rollout, improving sample efficiency, but too many risks overfitting to one specific batch of experience, especially in combination with a clip_range that's too wide to really stop it.

**Minibatch size** — commonly 32-256, splitting each rollout into several SGD minibatches per epoch rather than one giant batch gradient step; this is standard deep learning practice carried over largely unchanged.

## Usually fine at the defaults

**γ (gamma)**, the discount factor — 0.99 is a near-universal default across RL generally, reflecting a preference for valuing future reward highly, appropriate for most episodic tasks with moderately long horizons.

**λ (lambda)**, GAE's bias-variance dial from Lesson 25 — 0.95 is standard and rarely needs adjusting unless advantage estimates look unusually noisy (consider raising toward 1 if explained_variance is healthy but training is still jumpy) or the critic is clearly struggling (consider lowering toward 0 to lean on faster-converging, more biased estimates while it catches up).

**Entropy coefficient, c2** — often small (0.0 to 0.01). Raise it if Lesson 27's entropy-collapse symptom shows up; otherwise it rarely needs attention.

## A sensible starting configuration

```python
model = PPO(
    "MlpPolicy", env,
    learning_rate=3e-4,
    n_steps=2048,
    batch_size=64,
    n_epochs=10,
    gamma=0.99,
    gae_lambda=0.95,
    clip_range=0.2,
    ent_coef=0.0,
    vf_coef=0.5,
)
```

This is, deliberately, almost exactly Stable-Baselines3's own PPO defaults — for good reason. These values were tuned across a wide range of benchmark tasks, and deviating from them should usually be a response to a specific symptom observed via Lesson 27's metrics, not a guess made in advance. Start here, watch approx_kl / clip_fraction / explained_variance / entropy, and adjust the one hyperparameter the symptom actually points to.

## Key terms

| Term | Meaning |
|---|---|
| Learning rate | How large each gradient step is; usually the highest-leverage, first-to-tune hyperparameter |
| n_steps | How many environment steps are collected into each rollout before an update |
| n_epochs | How many passes of minibatch updates are run over one rollout before discarding it |
| GAE λ | The bias-variance dial for advantage estimation; 0.95 is standard and rarely needs changing |

## Recap

Learning rate, clip_range, rollout length, and epoch count are the hyperparameters most likely to actually matter when a PPO run misbehaves; γ, λ, and the entropy coefficient are usually fine at their standard defaults. That closes Chapter 4 and the classic policy-optimization core of this course. From here, Chapter 5 turns to the environments and infrastructure RL training runs actually need — starting with the Gymnasium API in Lesson 29 — before the course moves into reward modeling and RLHF, where everything built across Chapters 3 and 4 gets applied directly to training language models.
