# Capstone: Running & Monitoring PPO Training

This is lesson 68, continuing Chapter 11, the Capstone. The reward function from lesson 67 is ready; this lesson wires it into Hugging Face TRL's `PPOTrainer` and runs the actual training loop. The mechanics — the clipped objective, GAE, the KL term — are the same PPO from Chapter 4. What's new here is doing it for real, against a verifiable reward instead of a toy environment's reward, and knowing what to watch while it runs.

## What you'll learn

- How to set up TRL's `PPOTrainer` with your base model, reference model, and reward function
- The generate → score → step training loop, end to end
- The four signals worth watching live: reward, KL from the reference policy, response length, and policy loss
- How this connects to lesson 27's PPO debugging checklist, now applied to a real RLVR run

## Setting up the trainer

```python
from trl import PPOTrainer, PPOConfig, AutoModelForCausalLMWithValueHead

config = PPOConfig(
    model_name="Qwen/Qwen2.5-0.5B-Instruct",
    learning_rate=1e-5,
    batch_size=64,
    mini_batch_size=8,
)
model = AutoModelForCausalLMWithValueHead.from_pretrained(config.model_name)
ref_model = AutoModelForCausalLMWithValueHead.from_pretrained(config.model_name)

ppo_trainer = PPOTrainer(config, model, ref_model, tokenizer, dataset=train_set)
```

The reference model is a frozen copy of the starting checkpoint — it's what the KL penalty in the PPO objective measures distance from, exactly as Chapter 7's RLHF pipeline uses it, just with a verifiable reward standing in for the reward model's score.

## The training loop

```python
for batch in ppo_trainer.dataloader:
    query_tensors = batch["input_ids"]
    response_tensors = ppo_trainer.generate(query_tensors, max_new_tokens=256)
    responses = tokenizer.batch_decode(response_tensors, skip_special_tokens=True)

    rewards = [
        torch.tensor(verify_reward(r, gt))
        for r, gt in zip(responses, batch["ground_truth"])
    ]

    stats = ppo_trainer.step(query_tensors, response_tensors, rewards)
    ppo_trainer.log_stats(stats, batch, rewards)
```

Every batch: generate, score with lesson 67's verifier, then `step()` runs the PPO update — computing advantages, the clipped objective, and the KL penalty against the reference model in one call.

## What to watch while it runs

Four signals, watched together: the **mean reward** should trend up, not just spike once; **KL from the reference policy** should rise gradually, not explode — a sudden jump means the policy is moving too far per update, the same `approx_kl` problem lesson 27 diagnosed in a generic PPO run; **response length** can drift sharply if the reward function's length penalty is miscalibrated, a telltale reward-hacking symptom; and **policy loss** should stay bounded rather than diverging. If the reward curve rises while responses get visibly degenerate, that's lesson 67's reward-hacking warning showing up in training, not just in theory.

## Key terms

- **Reference model** — a frozen copy of the starting checkpoint the KL penalty measures distance from
- **PPOTrainer.step()** — the TRL call that computes advantages, the clipped objective, and applies one PPO update
- **KL drift** — how far the trained policy has moved from the reference policy at a given point in training
- **Response length drift** — a reward-hacking symptom where generations change length rather than quality

## Recap

PPOTrainer wraps the model, a frozen reference copy, and the verifier into one loop; watching reward, KL, length, and policy loss together catches the same failure modes lesson 27 taught you to diagnose, now on a real run. Next lesson, you'll evaluate whether this training run actually improved the model, against the held-out set from lesson 66.
