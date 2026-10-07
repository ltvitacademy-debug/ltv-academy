# Training a Reward Model

This is lesson 38 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 6, Reward Modeling. You've seen why a learned reward model is necessary, how preference data gets collected, and the Bradley-Terry loss that data trains against. This lesson puts all three pieces together into actual training code, using Hugging Face's TRL library — the standard tool for this in the current open-source ecosystem.

## What you'll learn

- How a reward model is built from a pretrained transformer: swap the output head for a scalar regression head
- The shape of data `RewardTrainer` expects
- The minimal training script, end to end
- What the reward model actually outputs once trained, and how it gets used afterward

## From language model to reward model: the architecture change

A reward model almost always starts from a pretrained transformer — frequently the same base model being aligned, or a same-size sibling. The only structural change is the output head: instead of a vocabulary-sized softmax over next tokens, the final layer is replaced with a single linear unit producing one scalar per input sequence. In Hugging Face Transformers, this is exactly what `AutoModelForSequenceClassification` with `num_labels=1` gives you — a classification head repurposed as a scalar regression head.

```python
from transformers import AutoModelForSequenceClassification, AutoTokenizer

base_model = "your-base-model-name"
model = AutoModelForSequenceClassification.from_pretrained(base_model, num_labels=1)
tokenizer = AutoTokenizer.from_pretrained(base_model)
```

## The training data shape

`RewardTrainer` expects a dataset where each example has a chosen and a rejected text — exactly the preference pairs from lesson 36:

```python
pref_dataset = [
    {
        "chosen": "Full prompt + chosen response, formatted as one sequence",
        "rejected": "Full prompt + rejected response, formatted as one sequence",
    },
    # ... thousands more
]
```

Internally, `RewardTrainer` tokenizes both the chosen and rejected sequence for each example, runs both through the model to get two scalar scores, and computes the Bradley-Terry loss from lesson 37 on the pair — `−log σ(r(chosen) − r(rejected))` — averaged over the batch.

## The training script

```python
from trl import RewardTrainer, RewardConfig
from transformers import AutoModelForSequenceClassification, AutoTokenizer

model = AutoModelForSequenceClassification.from_pretrained(base_model, num_labels=1)
tokenizer = AutoTokenizer.from_pretrained(base_model)

config = RewardConfig(output_dir="reward_model", per_device_train_batch_size=8)
trainer = RewardTrainer(model=model, args=config, tokenizer=tokenizer, train_dataset=pref_dataset)
trainer.train()
```

This is deliberately close to any other Hugging Face `Trainer` workflow — `RewardConfig` extends the standard training arguments (learning rate, batch size, epochs, logging) with reward-model-specific options, and `RewardTrainer` handles the chosen/rejected pairing and loss computation under the hood.

## What comes out, and what it's used for

After training, calling the model on a single (prompt, response) sequence returns one scalar — the model's learned estimate of how much a human would prefer that response. That scalar is what gets used as the reward signal during the RL stage of RLHF in Chapter 7: the policy generates a response, the frozen reward model scores it, and that score (often with a small KL penalty against a reference policy) becomes what PPO optimizes.

## Key terms

- **`AutoModelForSequenceClassification(num_labels=1)`** — a transformer with its output head replaced by a single scalar regression unit
- **`RewardTrainer` / `RewardConfig`** — TRL's training loop and configuration for reward models
- **Chosen / rejected** — the two fields `RewardTrainer` expects per training example
- **Frozen reward model** — once trained, used read-only to score responses during RL; it is not updated further during that stage

## Recap

Training a reward model means taking a pretrained transformer, swapping in a scalar output head, and minimizing the Bradley-Terry loss over chosen/rejected pairs with TRL's `RewardTrainer`. The output is a single learned scorer that stands in for a human during RL. Next lesson: what goes wrong when a policy is optimized against that scorer for too long — reward model overoptimization.
