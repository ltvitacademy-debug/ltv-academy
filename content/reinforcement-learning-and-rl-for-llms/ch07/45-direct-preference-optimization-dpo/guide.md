# Direct Preference Optimization (DPO)

This is lesson 45 of Chapter 7. The last lesson covered RLHF's failure modes — several of which trace back to the complexity of the full pipeline: a separate reward model, PPO rollouts, a KL penalty, all tuned together. This lesson introduces Direct Preference Optimization, a way to get a comparable result from the same preference data (lesson 36) without training a separate reward model or running RL rollouts at all.

## What you'll learn

- The key insight that lets DPO skip the reward model and RL entirely
- The DPO loss function, derived from the same Bradley-Terry model as Chapter 6's reward model
- How the "implicit reward" in DPO relates to the reference model, exactly like PPO's KL term
- The TRL `DPOTrainer` API and what data it expects

## The key insight: reparameterize the reward

Chapter 6's Bradley-Terry model says the probability that response `y_w` ("winner") is preferred over `y_l` ("loser") is `σ(r(y_w) − r(y_l))`, where `r` is a reward function and σ is the logistic sigmoid. RLHF trains `r` as a separate reward model, then uses PPO to find the policy that maximizes it under a KL constraint. DPO's insight is that, under a KL-constrained reward-maximization objective, the *optimal* policy and the reward function are related by a closed form — so instead of learning the reward function and then solving for the optimal policy with RL, you can substitute that relationship back into the Bradley-Terry loss and optimize the policy directly:

```
r(x, y) = β · log( π_θ(y|x) / π_ref(y|x) )
```

This is the "implicit reward" — it's defined entirely in terms of the policy's own log-probabilities relative to the frozen reference model, with no separate reward network.

## The DPO loss

Substituting that implicit reward into the Bradley-Terry preference loss gives DPO's training objective directly on (prompt, chosen, rejected) triples — no reward model, no sampled rollouts, no PPO:

```
L_DPO = −log σ( β · [ log(π_θ(y_w|x)/π_ref(y_w|x)) − log(π_θ(y_l|x)/π_ref(y_l|x)) ] )
```

This is a supervised-style loss: for each preference pair, increase the policy's relative log-probability (compared to the reference model) of the chosen response, and decrease it for the rejected one, exactly as hard as the sigmoid term says is needed. `β` plays the same role as PPO's KL coefficient — it controls how far the policy is allowed to move from the reference model to satisfy the preference.

## DPO in TRL

```python
from trl import DPOTrainer, DPOConfig

dpo_trainer = DPOTrainer(
    model=sft_model,            # policy, initialized from the SFT checkpoint
    ref_model=None,             # TRL can derive the reference internally
    args=DPOConfig(beta=0.1, output_dir="dpo-checkpoint"),
    train_dataset=preference_dataset,  # needs "prompt", "chosen", "rejected" columns
)
dpo_trainer.train()
```

The dataset shape is identical to what trained the reward model in Chapter 6 — the same preference pairs, just consumed differently. There's no reward model checkpoint anywhere in this pipeline, and no PPO rollout loop generating new samples during training; DPO trains directly on the fixed, already-collected preference dataset.

## Key terms

- **Implicit reward** — the reward function DPO derives algebraically from the policy's log-probabilities relative to the reference model, with no separate network
- **DPO loss** — the supervised, closed-form loss that directly increases the policy's preference for chosen over rejected responses
- **Reparameterization** — substituting the closed-form optimal-policy relationship back into the Bradley-Terry loss to eliminate the need for RL
- **Offline training** — DPO trains entirely on a fixed, pre-collected preference dataset, with no new samples generated during training

## Recap

DPO reparameterizes the same Bradley-Terry preference objective that trained Chapter 6's reward model, substituting in a closed-form "implicit reward" defined by the policy's own log-probabilities relative to the reference model — which turns RLHF's three-stage, RL-based pipeline into a single supervised-style training run directly on preference pairs. Next lesson compares DPO and PPO-based RLHF directly, including where each one's simplicity or lack of exploration actually matters in practice.
