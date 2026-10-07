# Building an SFT Dataset

The last two lessons covered why instruction tuning works and how conversations get serialized into tokens. This lesson is the practical bridge between them: how an actual SFT dataset gets assembled, cleaned, loss-masked, and handed to a trainer. This is where the data-curation instincts from Chapter 2 (quality filtering, deduplication) meet the instruction-tuning-specific details that only show up at this stage.

## What you'll learn

- Where SFT data actually comes from: human-written, model-generated (distillation), and mixed sources
- Why prompt-token masking matters and exactly how it's implemented
- Multi-turn conversations: masking every assistant turn, not just the last one
- Packing and truncation trade-offs specific to instruction data (different from pretraining's sequence packing)
- Using TRL's `SFTTrainer` end to end on a formatted dataset

## Where SFT data comes from

Three broad sources, often blended:

- **Human-written demonstrations** — a human writes both the instruction and an ideal response, or rates/edits a model-generated draft. This is the most expensive but highest-quality source, and was the backbone of InstructGPT's original dataset.
- **Model-generated (distillation)** — using a strong existing model to generate responses to a large set of instructions, optionally filtered for quality. This is far cheaper to scale than pure human authorship, and is extremely common for assembling large open SFT datasets, provided it's done within the generating model's usage terms.
- **Converted existing data** — reformatting existing NLP datasets, documentation, or Q&A pairs (from forums, support tickets, textbooks) into the instruction/response shape.

Whatever the source, quality filtering still applies, just as in Chapter 2: removing near-duplicate examples, filtering out responses that are off-topic, truncated, or simply low quality, and checking for diversity of instruction types so the model doesn't overfit to one narrow style of task.

## Prompt masking: only the response counts

As mentioned in Lesson 21, loss is computed only over the assistant's response tokens, not the instruction/prompt tokens. The usual implementation: tokenize prompt and response separately (or tokenize the full formatted conversation and track where the response begins), then build a `labels` tensor that's identical to the input tokens except prompt-token positions are set to a sentinel value — conventionally `-100`, which PyTorch's `CrossEntropyLoss` (and Hugging Face's trainer internals) treats as "ignore this position."

```python
IGNORE_INDEX = -100

def mask_prompt_tokens(input_ids, prompt_len):
    labels = input_ids.copy()
    labels[:prompt_len] = [IGNORE_INDEX] * prompt_len
    return labels

# input_ids:  [sys..., user...,    assistant response tokens...]
# labels:     [-100,    -100, ...,  <same tokens as input_ids>]
```

Without this masking, the model would also be trained to predict the instruction text itself, which wastes capacity on a distribution (the prompts) you don't actually want the model generating, and can subtly degrade response quality.

## Multi-turn conversations: mask every assistant turn

Real conversational data often has multiple back-and-forth turns. The masking principle extends directly: every assistant turn contributes to the loss, every user/system turn is masked out, for the whole sequence — not just the final assistant turn. Getting this wrong (for example, only unmasking the last turn) silently throws away most of a multi-turn example's training signal.

## Packing and truncation for instruction data

Chapter 2 covered sequence packing for pretraining, where document boundaries mostly don't matter. For SFT, packing is more delicate: concatenating multiple unrelated conversations into one training sequence risks the model learning to treat one conversation's end as a cue to start a new, unrelated one — unless packing is combined with attention masking (or position-id resets) that prevents cross-conversation attention. Many SFT setups instead truncate or pad each conversation to a fixed max length individually rather than packing, trading some compute efficiency for simplicity and to avoid that cross-contamination risk; TRL's `SFTTrainer` supports both modes.

## End-to-end with TRL's `SFTTrainer`

```python
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTTrainer, SFTConfig

model_id = "meta-llama/Llama-3.1-8B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

dataset = load_dataset("json", data_files="sft_data.jsonl")

config = SFTConfig(
    output_dir="./sft-run",
    max_seq_length=2048,
    packing=False,          # one conversation per sequence
    per_device_train_batch_size=4,
    num_train_epochs=3,
    learning_rate=2e-5,
)

trainer = SFTTrainer(
    model=model,
    args=config,
    train_dataset=dataset["train"],
    tokenizer=tokenizer,
)
trainer.train()
```

`SFTTrainer` handles chat-template application and prompt masking internally when the dataset is in the standard `messages` conversational format, which is why reaching for it (rather than hand-rolling the masking logic above) is the practical default for most SFT work.

## Key terms

- **Distillation (for SFT data)** — generating training responses using a stronger existing model rather than human authorship
- **Prompt masking** — setting label positions for non-response tokens to `-100` so they're excluded from the loss
- **Multi-turn masking** — unmasking every assistant turn across a multi-turn conversation, not only the last one
- **Packing (SFT context)** — concatenating multiple examples per sequence; riskier than pretraining packing unless cross-conversation attention is blocked
- **`SFTTrainer` / `SFTConfig`** — TRL's high-level trainer and configuration class for supervised fine-tuning
