# SFT, Then Reward Model, Then PPO

This is lesson 42 of Chapter 7. The previous lesson named the three stages of the RLHF pipeline and why their order is fixed. This lesson goes one level deeper: the concrete checkpoints, datasets, and model classes that actually move between stages when you build this in Hugging Face's TRL library.

## What you'll learn

- What a supervised fine-tuning (SFT) stage actually trains on, and what artifact it produces
- How the reward model stage (Chapter 6) consumes that artifact
- How the PPO stage (Chapter 4) consumes both prior artifacts simultaneously
- The specific TRL classes used at each stage and how checkpoints pass between them

## Stage 1: supervised fine-tuning

SFT is ordinary supervised learning: a dataset of (prompt, ideal response) pairs, cross-entropy loss on the response tokens, fine-tuning a pretrained causal language model. There's no reward signal and no RL yet — the goal is purely to shift the base model's distribution toward instruction-following text.

```python
from trl import SFTTrainer, SFTConfig

sft_trainer = SFTTrainer(
    model="meta-llama/Llama-3.1-8B",
    train_dataset=demonstration_dataset,   # (prompt, response) pairs
    args=SFTConfig(output_dir="sft-checkpoint", max_seq_length=1024),
)
sft_trainer.train()
sft_trainer.save_model("sft-checkpoint")
```

The output artifact is a checkpoint — just model weights. Nothing about this stage is RLHF-specific; it's the same SFT you'd do for any instruction-tuning task.

## Stage 2: reward model, built on the SFT checkpoint

Chapter 6 covered reward model training in depth (Bradley-Terry loss, lesson 37; training loop, lesson 38). The one detail that matters for the pipeline: the reward model is initialized from the *same* SFT checkpoint (swapping the language-modeling head for a scalar-reward head), and trained on preference pairs sampled from that SFT model's own outputs.

```python
from trl import RewardTrainer, RewardConfig
from transformers import AutoModelForSequenceClassification

reward_model = AutoModelForSequenceClassification.from_pretrained(
    "sft-checkpoint", num_labels=1
)
reward_trainer = RewardTrainer(
    model=reward_model,
    train_dataset=preference_dataset,   # chosen/rejected pairs, Ch. 6
    args=RewardConfig(output_dir="reward-model-checkpoint"),
)
reward_trainer.train()
```

## Stage 3: PPO, consuming both checkpoints at once

PPO needs the SFT checkpoint twice — once as the trainable policy, once frozen as the reference model for the KL penalty (next lesson) — and the reward model checkpoint once, used only for scoring, never updated.

```python
from trl import PPOTrainer, PPOConfig
from transformers import AutoModelForCausalLMWithValueHead

policy = AutoModelForCausalLMWithValueHead.from_pretrained("sft-checkpoint")
ref_model = AutoModelForCausalLMWithValueHead.from_pretrained("sft-checkpoint")

ppo_trainer = PPOTrainer(
    config=PPOConfig(model_name="sft-checkpoint"),
    model=policy,
    ref_model=ref_model,
    reward_model=reward_model,   # frozen; used only to score generations
)
```

`AutoModelForCausalLMWithValueHead` adds the value-function head PPO's advantage estimation (GAE, lesson 25) needs on top of the same SFT weights — this is the one new piece of infrastructure this stage introduces beyond what Chapter 4 already covered.

## Key terms

- **Demonstration dataset** — the (prompt, response) pairs used for SFT, distinct from the preference pairs used for reward modeling
- **Value head** — an added output layer that estimates state value, required by PPO's advantage estimation, attached to the SFT weights
- **Checkpoint reuse** — the same SFT weights initialize the reward model, the trainable policy, and the frozen reference model
- **Frozen reward model** — the reward model's weights are never updated during PPO; it only scores

## Recap

Concretely, one SFT checkpoint seeds three things: the reward model's base weights, the PPO policy, and the PPO reference model — while the reward model checkpoint itself plugs into PPO as a frozen scorer. Next lesson covers the KL penalty that ties the policy back to that frozen reference model, and why RLHF needs it at all.
