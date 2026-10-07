# Running RLHF on the Database Assistant

With an SFT checkpoint from Lesson 16 and an execution-correctness reward from Lesson 17, this lesson runs the actual RLHF stage: reinforcement learning from a reward signal, using Hugging Face TRL's `PPOTrainer` to push SQL Pete toward queries that execute correctly.

## What you'll learn

- How TRL's `PPOTrainer` fits SQL Pete's SFT checkpoint and reward function together
- Why this is RLAIF-style, not RLHF in the strict human-feedback sense
- The shape of one PPO training step: generate, score, update
- Why this simplification is reasonable for a small lab, and where its limits are

## RLAIF, not literal human feedback

The chapter title says RLHF, and that's the right name for the family of technique — reinforcement learning applied to a language model using a reward signal shaped by some notion of "better." But it's worth being precise: the reward in Lesson 17 isn't produced by a human rater reading outputs and expressing a preference. It's produced programmatically, by executing SQL and checking result sets. That makes this specifically **RLAIF** — reinforcement learning from AI (or automated) feedback — standing in for a human rater. For a small research lab without the budget to pay human annotators to rate thousands of SQL outputs, a programmatic execution-correctness check is a deliberate, reasonable simplification. It is not a claim that execution match is equivalent to real human preference in general — a human might prefer a query that's more readable, or that handles an edge case the gold query misses, in ways a pure execution check can't see. Lesson 19 looks at what this simplification costs.

## Setting up PPOTrainer

TRL's `PPOTrainer` runs Proximal Policy Optimization: it samples completions from the current policy, scores them with a reward function, and updates the policy to make higher-reward completions more likely while staying close to the previous policy (the "proximal" part, which keeps training stable).

```python
from trl import PPOConfig, PPOTrainer, AutoModelForCausalLMWithValueHead

ppo_config = PPOConfig(
    model_name="sql-pete-sft",
    learning_rate=1e-5,
    batch_size=16,
    mini_batch_size=4,
)

policy = AutoModelForCausalLMWithValueHead.from_pretrained("sql-pete-sft")

ppo_trainer = PPOTrainer(
    config=ppo_config,
    model=policy,
    tokenizer=tokenizer,
)
```

The policy is initialized from `sql-pete-sft` — the LoRA-adapted checkpoint from Lesson 16, not the raw base model. RLHF refines an already-reasonable policy; it doesn't start the task from scratch.

## One PPO step: generate, score, update

```python
for batch in question_dataloader:
    prompts = [format_example(q) for q in batch]
    responses = ppo_trainer.generate(prompts)

    rewards = [
        execution_reward(resp, gold, sandbox_db)
        for resp, gold in zip(responses, batch["gold_sql"])
    ]

    stats = ppo_trainer.step(prompts, responses, rewards)
```

Each step: SQL Pete generates a SQL completion for a batch of natural-language questions, Lesson 17's `execution_reward` function scores each completion against the sandboxed database, and `ppo_trainer.step` uses those rewards to update the policy — nudging it toward generating more completions like the ones that scored +1.0, and away from ones that scored -1.0 or -0.3.

## Why PPO specifically

PPO is a standard choice for RLHF/RLAIF on language models because it bounds how far each update can move the policy, which keeps training from collapsing into degenerate outputs that technically maximize reward but lose general coherence — a real risk when the reward function is as narrow as "did the result set match."

## What's ahead

This loop runs for many steps over the ~2,000-question training set (or a reward-focused subset of it), producing a final RLHF checkpoint. Lesson 19 evaluates that checkpoint against the SFT-only checkpoint from Lesson 16, including a specific regression this kind of training can introduce.

## Key terms

- **RLAIF (reinforcement learning from AI feedback)** — RLHF where the reward signal is produced programmatically/automatically rather than by a human rater; used here as a deliberate, budget-driven simplification
- **`PPOTrainer`** — TRL's implementation of Proximal Policy Optimization for fine-tuning language model policies against a reward function
- **Policy** — the model being trained by RLHF; here, SQL Pete initialized from its Lesson 16 SFT checkpoint
- **Proximal Policy Optimization (PPO)** — an RL algorithm that bounds each policy update to stay close to the previous policy, for training stability

## Recap

RLHF for SQL Pete means TRL's PPOTrainer, policy initialized from the Lesson 16 SFT checkpoint, reward from Lesson 17's execution-correctness function — an RLAIF-style setup since the "feedback" is programmatic, not from a human rater, which is a reasonable simplification for a small lab but not a claim that execution match equals human preference. Next up, Lesson 19: evaluating what this training actually changed.
