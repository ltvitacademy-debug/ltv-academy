# Running a Small RLHF Pipeline

This is lesson 47, the closing lesson of Chapter 7. Every piece has been covered separately — SFT, the reward model (Chapter 6), PPO with a KL penalty, and DPO as an alternative. This lesson runs a small, concrete version of the whole thing end-to-end with Hugging Face's TRL library, on a small model where a full run is actually feasible to reason about.

## What you'll learn

- A complete, runnable TRL pipeline: SFT → reward model → PPO, on a small model
- The equivalent, shorter DPO-only path on the same preference data
- What to actually watch during the run — reward trend and KL, not just loss
- How to sanity-check the result against the SFT baseline before trusting it

## Setup: small model, small data

For a small pipeline that's actually feasible to run and inspect, use a small base model (`gpt2` or similar) and a modest instruction/preference dataset — something like a few thousand examples is enough to see the pipeline work end-to-end, not to produce a production-quality model.

```python
from datasets import load_dataset
from transformers import AutoTokenizer

base_model = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(base_model)
demo_data = load_dataset("trl-lib/tldr", split="train[:2000]")       # SFT
pref_data = load_dataset("trl-lib/tldr-preference", split="train[:2000]")  # RM + DPO
```

## The PPO-based path, end-to-end

```python
from trl import SFTTrainer, SFTConfig, RewardTrainer, RewardConfig, PPOTrainer, PPOConfig
from transformers import AutoModelForSequenceClassification, AutoModelForCausalLMWithValueHead

# Stage 1 — SFT
sft = SFTTrainer(model=base_model, train_dataset=demo_data,
                  args=SFTConfig(output_dir="sft-small", num_train_epochs=1))
sft.train()
sft.save_model("sft-small")

# Stage 2 — reward model (Ch. 6)
rm = AutoModelForSequenceClassification.from_pretrained("sft-small", num_labels=1)
reward_trainer = RewardTrainer(model=rm, train_dataset=pref_data,
                                args=RewardConfig(output_dir="rm-small"))
reward_trainer.train()

# Stage 3 — PPO against the reward model, KL penalty included
policy = AutoModelForCausalLMWithValueHead.from_pretrained("sft-small")
ppo_trainer = PPOTrainer(
    config=PPOConfig(model_name="sft-small", batch_size=16, init_kl_coef=0.2),
    model=policy, ref_model=None, reward_model=rm,
)
ppo_trainer.train()
```

## The DPO path, for comparison

The same preference dataset, trained with far fewer moving parts (lesson 45):

```python
from trl import DPOTrainer, DPOConfig

dpo_trainer = DPOTrainer(
    model="sft-small",
    args=DPOConfig(beta=0.1, output_dir="dpo-small"),
    train_dataset=pref_data,
)
dpo_trainer.train()
```

## What to watch during the run

PPO's training logs report both the mean reward and the mean KL divergence from the reference model per batch — watch both together, not reward alone. A rising reward with a flat or slowly rising KL is the healthy case; a reward that spikes while KL explodes is the early sign of the reward hacking covered in lesson 44, and it's worth stopping and lowering the learning rate or raising the KL coefficient before continuing. For DPO, watch the implicit reward margin (chosen minus rejected) — it should climb steadily rather than jump erratically.

## Sanity-checking the result

Before trusting either trained policy, compare its generations against the SFT baseline on a handful of held-out prompts, and run the reward model (or DPO's implicit reward) over both sets — the trained policy should score noticeably higher than the SFT baseline on genuinely improved responses, not just longer or more confidently-worded ones (watch for the verbosity bias from lesson 44).

## Key terms

- **init_kl_coef** — PPO's starting KL penalty coefficient, adjusted adaptively during training (lesson 43)
- **Reward trend** — the mean reward model score per training batch, the primary PPO training-health signal
- **Implicit reward margin** — DPO's chosen-minus-rejected log-probability gap, the DPO analog of reward trend
- **Held-out sanity check** — comparing trained-policy generations against the SFT baseline before trusting the result

## Recap

A small end-to-end run — SFT, then a reward model, then PPO with a KL penalty, or the shorter DPO path on the same data — surfaces the same dynamics covered across this whole chapter at a scale that's actually easy to watch and debug. That closes Chapter 7, RLHF. Chapter 8 begins next lesson with RLAIF — replacing the human preference labels this chapter relied on with AI-generated feedback.
