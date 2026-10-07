# SFT on Natural-Language-to-SQL

Before SQL Pete can be shaped by any reward signal, it needs a supervised foundation: a model that reliably attempts the right task — reading a question and writing SQL against the right schema — even if its answers aren't yet perfect. This lesson builds that foundation with a LoRA fine-tune on curated question/SQL pairs.

## What you'll learn

- Why SFT comes before RLHF in this pipeline
- The training data: roughly 2,000 (question, gold SQL) pairs scoped to Northwind and AdventureWorks2012
- How to configure a LoRA adapter with Hugging Face `peft`
- The shape of the supervised training loop with `transformers`

## Why SFT first

RLHF explores: it nudges a policy toward higher reward by sampling outputs and reinforcing the ones that score well. That only works if the policy's samples are already in the right neighborhood. A base model that has never seen the NL-to-SQL task formatted as a prompt-response pair will mostly produce off-task text, and a reward signal has nothing good to reinforce. Supervised fine-tuning (SFT) first teaches SQL Pete the task's shape — read a question, look at the schema, write one SQL query — so that by the time Lesson 18's RLHF stage starts, SQL Pete is already attempting reasonable queries that the reward signal can refine.

## The training data

The SFT dataset is roughly 2,000 curated pairs, each one a natural-language question paired with a gold (hand-verified correct) SQL query, scoped entirely to the Northwind and AdventureWorks2012 schemas — the same two schemas SQL Pete is scoped to for the rest of this project. A typical pair looks like:

```python
example = {
    "question": "Which customers are located in Germany?",
    "schema": "Northwind",
    "sql": "SELECT CompanyName FROM Customers "
           "WHERE Country = 'Germany';",
}
```

Every pair is formatted into a single instruction-style prompt before training, so the model learns the exact input shape it will see at inference time:

```python
def format_example(ex):
    prompt = (
        f"-- Schema: {ex['schema']}\n"
        f"-- Question: {ex['question']}\n"
        f"SELECT"
    )
    return prompt, ex["sql"]
```

## LoRA: fine-tuning without touching every weight

Full fine-tuning of even a 1.5B model updates every parameter, which costs memory and time the lab would rather spend iterating. LoRA (Low-Rank Adaptation) instead freezes the base model and trains small low-rank adapter matrices injected into a handful of layers — usually the attention projections. Here's the `peft` config used for SQL Pete's SFT stage:

```python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
```

`r=16` sets the rank of the adapter matrices — small enough to keep the adapter cheap, large enough to carry the task. `target_modules` picks the query and value projections inside each attention block, a standard, effective choice for LoRA on decoder-only models.

## The training loop, sketched

```python
from transformers import Trainer, TrainingArguments

args = TrainingArguments(
    output_dir="./sql-pete-sft",
    per_device_train_batch_size=8,
    num_train_epochs=3,
    learning_rate=2e-4,
    logging_steps=20,
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized_dataset,
)
trainer.train()
```

Each training example is the formatted prompt concatenated with the gold SQL as the target the model is trained to predict, token by token, with cross-entropy loss — ordinary causal language modeling, just restricted to this one NL-to-SQL task via LoRA.

## What comes out of this lesson

The output of SFT is a checkpoint: SQL Pete with its base weights frozen and a trained LoRA adapter on top, capable of producing plausible (though not yet reward-optimized) SQL for questions against Northwind and AdventureWorks2012. Lesson 17 builds the reward signal this checkpoint will be refined against, and Lesson 18 initializes the RLHF policy directly from this checkpoint.

## Key terms

- **SFT (supervised fine-tuning)** — training on labeled (input, correct output) pairs before any reward-based training
- **LoRA (Low-Rank Adaptation)** — a fine-tuning method that freezes the base model and trains small low-rank adapter matrices instead
- **`LoraConfig` / `get_peft_model`** — the Hugging Face `peft` API for attaching a LoRA adapter to a base model
- **Target modules** — the specific weight matrices (here, attention query/value projections) that receive LoRA adapters

## Recap

SFT gives SQL Pete a supervised starting point — roughly 2,000 question/SQL pairs scoped to Northwind and AdventureWorks2012, trained into a LoRA adapter on top of the frozen Qwen2.5-Coder-1.5B-Instruct base — so that RLHF has something reasonable to refine rather than starting from scratch. Next up, Lesson 17: building the execution-correctness reward signal.
