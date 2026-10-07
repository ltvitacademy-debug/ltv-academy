# Capstone: Building the SFT Dataset

With a task and a candidate model picked in Lesson 51, this lesson is where the capstone gets its hands dirty: building the actual SFT dataset. This is Lesson 23's "Building an SFT Dataset" and Lesson 22's chat-template formatting, applied to your specific task instead of discussed in the abstract — and it's worth doing carefully, because every later lesson in this capstone inherits whatever quality problems go unnoticed here.

## What you'll learn

- How to go from a task definition to a concrete set of prompt-response examples
- How to format examples with your chosen model's actual chat template
- Why prompt masking matters at this step, not just conceptually
- The filtering and deduplication pass that catches the most common dataset problems
- How to split the set so Lesson 54's evaluation is actually trustworthy

## From task to examples

However you source examples — writing them by hand, adapting an existing dataset, using a stronger model to generate drafts you review and correct — the goal is a list of `(prompt, response)` pairs that are representative of what you want the fine-tuned model to do well. For a capstone, a few hundred to a couple thousand well-chosen examples is a realistic and sufficient target; quality and consistency of style matter far more here than raw volume.

## Formatting with the real chat template

```python
from datasets import Dataset

raw_examples = [
    {"prompt": "Summarize this ticket: ...", "response": "**Issue:** ...\n**Fix:** ..."},
    # ... your collected examples
]

def to_chat_format(example):
    messages = [
        {"role": "user", "content": example["prompt"]},
        {"role": "assistant", "content": example["response"]},
    ]
    text = tokenizer.apply_chat_template(messages, tokenize=False)
    return {"text": text}

dataset = Dataset.from_list(raw_examples).map(to_chat_format)
```

Using `apply_chat_template` here, with the tokenizer loaded from the exact model chosen in Lesson 51, matters more than it looks like it should: a hand-rolled template that's close-but-not-quite what the model expects is a common, hard-to-spot source of poor fine-tuning results.

## Masking, filtering, deduplication

- **Prompt masking** — as covered in Lesson 22, loss should only be computed on the response tokens, not the prompt. `SFTTrainer` handles this automatically for conversational datasets in the standard chat format, but it's worth confirming rather than assuming, especially with a custom formatting function.
- **Length filtering** — drop or truncate examples far longer than your intended serving context (tying back to Chapter 8's context-length-sets-KV-cache-cost lesson); a handful of outlier-long examples can dominate a small dataset's effective epoch.
- **Deduplication** — near-duplicate examples (common when generating drafts with a model) inflate the effective weight of a handful of patterns; a simple exact-text or embedding-similarity dedup pass before training is cheap insurance.

## Splitting for an honest evaluation later

```python
split = dataset.train_test_split(test_size=0.15, seed=42)
train_dataset, held_out_dataset = split["train"], split["test"]
```

Hold out a slice now, before any training happens, and don't look at it again until Lesson 54. This held-out split — distinct from the general-capability benchmark you'll also run for the forgetting check — is what lets you measure genuine task performance on examples the model never trained on, rather than quietly evaluating on data it's already seen.

## Key terms

- **Prompt masking** — computing loss only on response tokens, not the prompt, during SFT
- **Deduplication pass** — removing near-identical examples that would otherwise dominate a small dataset
- **Held-out split** — data set aside before training and not used again until final evaluation
- **Chat template fidelity** — using the exact model's `apply_chat_template` rather than a hand-rolled approximation
