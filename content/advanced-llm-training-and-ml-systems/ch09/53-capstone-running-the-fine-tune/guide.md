# Capstone: Running the Fine-Tune

Model chosen, dataset built and split — this is where it actually trains. This lesson wires together LoRA/QLoRA from Lessons 25-26, the forgetting-aware defaults from Lesson 27, and `SFTTrainer` into one runnable configuration, on realistic single-GPU hardware. Nothing here is new in concept; the point of a capstone is seeing it all connect in one place instead of in five separate lesson-sized examples.

## What you'll learn

- How to assemble a QLoRA config for a realistic single-GPU fine-tune
- Where each capstone decision so far (model, dataset) plugs into the training call
- How to apply the anti-forgetting defaults from Lesson 27 deliberately, not by accident
- What to watch during the run itself, beyond just the final loss number
- What gets saved, and why it's small

## Assembling the config

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig
from trl import SFTConfig, SFTTrainer

model_id = "meta-llama/Llama-3.1-8B-Instruct"  # from Lesson 51

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)
model = AutoModelForCausalLM.from_pretrained(model_id, quantization_config=bnb_config, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(model_id)

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    task_type="CAUSAL_LM",
)

sft_config = SFTConfig(
    output_dir="./capstone-sft-run",
    learning_rate=2e-4,       # typical LoRA range -- higher than full fine-tuning
    num_train_epochs=3,       # Lesson 27's forgetting-aware ceiling
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    max_seq_length=2048,
    logging_steps=10,
    save_strategy="epoch",
)

trainer = SFTTrainer(
    model=model,
    args=sft_config,
    train_dataset=train_dataset,   # from Lesson 52
    peft_config=lora_config,
)
trainer.train()
```

Each piece here is a decision this course already justified in isolation: 4-bit quantization (Lesson 26) makes an 8B model trainable on one GPU; the LoRA rank and target modules (Lesson 25) control adapter capacity; the conservative epoch count (Lesson 27) bounds forgetting risk given a small, narrow dataset.

## What to watch during the run

Loss going down is necessary but not sufficient. Watch for the signature of overfitting on a small dataset — training loss still falling while held-out loss (computed periodically against `held_out_dataset` from Lesson 52) flattens or rises — and stop early if you see it, rather than training to a fixed epoch count regardless of what the curves say. This is the practical version of the checkpointing and observability habits from Chapter 6, scaled down to a single-GPU run.

## What gets saved

```python
trainer.save_model("./capstone-sft-run/final-adapter")
```

Because this is a LoRA adapter, not a full fine-tune, what's saved is a few hundred megabytes of adapter weights, not a full copy of the base model — the base model stays frozen and unmodified throughout, exactly as Lesson 27 described as PEFT's structural anti-forgetting advantage.

## Key terms

- **QLoRA config** — a 4-bit quantized base model combined with a trainable LoRA adapter, assembled from `BitsAndBytesConfig` and `LoraConfig`
- **Adapter checkpoint** — the small set of trainable LoRA weights saved after training, distinct from the frozen base model
- **Held-out loss monitoring** — tracking loss on data not trained on, during the run, to catch overfitting early
- **Forgetting-aware defaults** — the conservative learning rate and epoch count chosen specifically to limit general-capability regression
