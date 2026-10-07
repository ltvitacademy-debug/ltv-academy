# The Full RLHF Pipeline

This is lesson 41, the opening lesson of Chapter 7, RLHF. Chapter 6 built the individual piece that makes RLHF possible — a reward model trained on human preference pairs with the Bradley-Terry objective, evaluated for accuracy and calibration before trusting it. Chapter 4 built the other piece — PPO, trust regions, GAE. This lesson assembles everything so far into the pipeline that actually produced InstructGPT and the chat models that followed it.

## What you'll learn

- The three named stages of the RLHF pipeline, in order, and why the order is fixed
- What flows between stages: checkpoints, datasets, and a frozen reference model
- Where the reward model and PPO from earlier chapters plug into the full system
- Why this pipeline — not just a reward model, and not just PPO alone — is what "RLHF" means

## Three stages, one pipeline

"RLHF" names a three-stage pipeline, not a single algorithm. Each stage produces an artifact the next stage consumes:

1. **Supervised fine-tuning (SFT)** — start from a pretrained base model and fine-tune it on a smaller set of high-quality human-written demonstrations (prompt → ideal response pairs). The output is a policy that already follows instructions reasonably well, before any reward signal is involved.
2. **Reward model training** — this is all of Chapter 6. Human annotators rank or compare responses sampled from the SFT model, those comparisons train a reward model via the Bradley-Terry objective (lesson 37), and the reward model is evaluated (lesson 40) before anyone trusts it to guide RL.
3. **RL fine-tuning** — the SFT model becomes the initial policy for PPO (Chapter 4), which is optimized against the reward model's scores, with a KL penalty (next lesson) holding it close to the SFT model it started from.

## Why the order can't be rearranged

Each stage depends on an artifact only the previous one can produce. The reward model is trained on comparisons between responses sampled from the SFT model — if you trained the reward model on responses from a weaker (pretrained-only) policy, its preference judgments would be calibrated to a different response distribution than the one PPO will actually be sampling from during RL. And PPO needs both a reward signal (stage 2's output) and a reasonable starting policy (stage 1's output) — starting PPO directly from the pretrained base model, without SFT first, means spending RL steps just teaching the model to follow instructions at all, on a noisy, indirect reward signal, instead of refining behavior it can already approximate.

## What carries over from earlier chapters, unchanged

Nothing about Chapter 4's PPO or Chapter 6's reward model training changes inside this pipeline. The reward model is trained exactly as in lesson 38. PPO's clipped objective, advantage estimates via GAE, and value function all work exactly as in lessons 23–26. What's new in this stage is the *reward function* PPO optimizes: instead of a hand-written environment reward, PPO calls the trained reward model on the policy's generated text, and the "environment" is the prompt-and-generate loop itself — the policy's rollout is a single episode of generating tokens until an end-of-sequence token.

```python
# Pipeline skeleton — each stage's output feeds the next
sft_model = sft_trainer.train()                          # stage 1
reward_model = reward_trainer.train(sft_model)            # stage 2 (Ch. 6)
ppo_trainer = PPOTrainer(
    model=sft_model,            # policy starts from the SFT checkpoint
    ref_model=sft_model_copy,   # frozen reference for the KL penalty
    reward_model=reward_model,  # stage 2's output scores generations
)
ppo_trainer.train()                                        # stage 3 (Ch. 4's PPO)
```

## Key terms

- **SFT (supervised fine-tuning)** — fine-tuning a pretrained base model on human-written demonstration data, producing the starting policy for the rest of the pipeline
- **Reference model** — a frozen copy of the SFT model, kept unchanged throughout RL, used only to measure how far the policy has drifted
- **Pipeline stage** — one of the three fixed steps (SFT, reward model, RL fine-tuning), each consuming the previous stage's output artifact
- **Policy initialization** — starting PPO from the SFT checkpoint rather than the pretrained base model

## Recap

RLHF is a fixed three-stage pipeline — SFT, then reward model training, then PPO against that reward model — and the order exists because each stage needs the previous stage's exact output, not just any similar artifact. Chapter 6's reward model and Chapter 4's PPO plug in unchanged; this chapter is about assembling them correctly and handling what's new at the seams. Next lesson goes deeper into exactly how the SFT checkpoint and reward model get wired into PPO in practice.
