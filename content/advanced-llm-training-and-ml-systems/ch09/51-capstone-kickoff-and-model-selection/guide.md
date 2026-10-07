# Capstone Kickoff & Model Selection

This is the start of the capstone: one project that runs across the rest of this chapter and pulls together nearly everything the course has covered. You'll pick a real open-weight base model, build a real SFT dataset for it (Chapter 4's methods), run a real parameter-efficient fine-tune (LoRA/QLoRA), and evaluate the result against a baseline using Chapter 7's discipline. This lesson is just the first step — choosing the model and the task — but that choice shapes everything downstream, so it's worth doing deliberately rather than defaulting to whatever's most hyped this month.

## What you'll learn

- How to frame a capstone task narrow enough to finish and evaluate credibly
- The concrete factors that should drive base model selection, not just benchmark leaderboards
- Why fine-tuning from a base model vs. an already-instruction-tuned model is a real decision, not a default
- How to sanity-check a candidate model loads and runs before committing to it
- The shape of the five-lesson pipeline this capstone follows

## Pick a task before a model

It's tempting to pick an exciting model first and find a use for it after. Do the opposite: define a narrow, evaluable task — a style of writing, a structured-output format, a domain-specific Q&A behavior, a particular tool-use pattern — something you could describe to someone else in one sentence and judge success on with a concrete metric. A narrow, well-defined task is also what makes the Chapter 7 evaluation lessons actually usable here: you can't build a good eval set (Lesson 45) for a vague goal.

## What actually matters when choosing a base model

- **Size vs. available compute** — this capstone is meant to run on realistic hardware (a single consumer or cloud GPU with LoRA/QLoRA), so a 1B-8B parameter range is the practical sweet spot; a 70B model that never finishes a training run teaches you nothing.
- **License** — open-weight does not always mean unrestricted; check the license permits your intended use (research vs. commercial) before investing time.
- **Base vs. instruction-tuned starting point** — fine-tuning from a raw base model gives you full control over behavior but needs more data and careful chat-template setup from scratch; fine-tuning from an already instruction-tuned checkpoint (continuing SFT) converges faster and is usually the more realistic choice for a narrow behavior change, at the cost of inheriting that checkpoint's existing habits — including whatever biases or verbosity patterns it already has.
- **Tooling support** — does `transformers`, `trl`, and `peft` support the model's architecture out of the box? Checking the model card and recent GitHub issues for the architecture takes five minutes and avoids a frustrating debugging session later.

## Sanity-check before committing

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "meta-llama/Llama-3.1-8B-Instruct"  # example candidate
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")

n_params = sum(p.numel() for p in model.parameters())
print(f"{n_params / 1e9:.1f}B parameters")
print(tokenizer.apply_chat_template(
    [{"role": "user", "content": "Hello"}], tokenize=False, add_generation_prompt=True
))
```

Confirm the model loads, the parameter count matches expectations, and the chat template produces output that looks right — before writing a single line of dataset-building code.

## The pipeline this capstone follows

- **This lesson** — task framing and model selection
- **Lesson 52** — building the SFT dataset (Chapter 4's methods, applied)
- **Lesson 53** — running the fine-tune with LoRA/QLoRA (Chapter 4's PEFT lessons, applied)
- **Lesson 54** — evaluating against the pre-fine-tune baseline (Chapter 7's methods, applied)
- **Lesson 55** — writing up results and deciding what's next

## Key terms

- **Base model** — a pretrained but not instruction-tuned checkpoint
- **Instruction-tuned starting point** — fine-tuning that continues from an already-SFT'd checkpoint rather than a raw base model
- **Model license** — the legal terms governing use of an open-weight model's weights, separate from its training data license
- **Sanity check** — confirming a candidate model loads, runs, and produces expected chat-template output before committing engineering time to it
