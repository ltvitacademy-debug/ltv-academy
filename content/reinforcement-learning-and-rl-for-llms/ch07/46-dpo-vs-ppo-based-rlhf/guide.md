# DPO vs. PPO-Based RLHF

This is lesson 46 of Chapter 7. The last lesson derived DPO as a reparameterization of the same Bradley-Terry objective behind Chapter 6's reward model, trained without PPO or rollouts. This lesson compares the two approaches directly — not as "DPO replaces PPO" but as two tools with real, documented tradeoffs that determine which one fits a given project.

## What you'll learn

- The infrastructure and stability differences between the two pipelines
- Why "offline" vs. "online" is the central tradeoff, not just implementation complexity
- Where each approach is more vulnerable to the RLHF failure modes from lesson 44
- What the published empirical comparisons actually report, not just the theory

## Infrastructure and stability

DPO's practical appeal is mostly about what it removes: no reward model to train and host, no rollout/generation loop during training, no value head, no advantage estimation, and fewer hyperparameters to tune (no clip range, no GAE lambda, no separate critic learning rate). It trains like ordinary supervised fine-tuning, which makes it meaningfully easier to get stable, reproducible runs. PPO-based RLHF has more moving parts — reward model quality, KL coefficient tuning, rollout batch size, value function fit — and any one of them being miscalibrated can derail the whole run, which is part of why lesson 27 dedicated an entire lesson to debugging PPO training specifically.

## Offline vs. online: the central tradeoff

DPO trains entirely on a fixed, already-collected preference dataset — it never generates new samples during training. PPO-based RLHF is online: the policy generates fresh completions during training, those get scored by the reward model, and the policy updates based on its *own* current outputs, not just the original annotators' responses. This matters because the reward model, once trained, can score any text — including text the policy generates that looks nothing like anything in the original preference dataset. DPO has no such mechanism; it can only ever push the policy toward or away from the fixed set of responses that were already in its training data.

## Where each is more exposed to RLHF's failure modes

The reward model exposure is not symmetric between the two approaches. PPO-based RLHF's online generation means it can find and exploit reward model blind spots anywhere in the generation space — which is exactly the reward hacking risk from lesson 44, but it's also what gives PPO room to actually discover improvements beyond what's in the static preference set. DPO's implicit reward is never evaluated as a standalone scoring function the way an explicit reward model is, so there's no separate reward model to evaluate (lesson 40's diagnostics don't directly apply) and no online rollout loop to hack — but DPO can also overfit to the specific phrasing of the fixed preference pairs it saw, a different kind of narrowness.

## What the evidence actually shows

The original DPO paper reported it matching or exceeding PPO-based RLHF on summarization and dialogue tasks while being substantially simpler to train. Later work complicates that picture somewhat — some PPO implementations, tuned carefully with lessons like reward model ensembling and careful KL control, have been shown to outperform DPO on certain benchmarks, and the comparison is sensitive to implementation details on both sides. In practice, teams often reach for DPO first for its simplicity and move to PPO-based RLHF when they specifically need the online exploration it provides, or vice versa depending on what's already failing.

## Key terms

- **Offline training** — training on a fixed dataset with no new samples generated during training (DPO)
- **Online training** — training where the policy generates new samples during training that get scored and used immediately (PPO-based RLHF)
- **Implicit reward** — DPO's reward signal, derived from policy log-probabilities, never evaluated as a standalone network
- **Exploration** — a policy's ability to discover and get credit for responses not present in the original training data, available to PPO, not to DPO

## Recap

DPO trades PPO-based RLHF's infrastructure, tuning burden, and online-exploration exposure to reward hacking for a simpler, offline, supervised-style run that can't explore beyond its fixed preference data — neither one is strictly better, and published comparisons depend heavily on implementation quality on both sides. Next lesson puts both into practice end-to-end with a small, runnable RLHF pipeline using Hugging Face TRL.
