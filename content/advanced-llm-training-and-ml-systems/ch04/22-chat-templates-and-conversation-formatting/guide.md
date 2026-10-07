# Chat Templates & Conversation Formatting

The last lesson described instruction tuning as training on (instruction, response) pairs, but a real model only ever sees a flat sequence of tokens — there's no native concept of "this part is the user's turn, this part is the assistant's turn." Something has to turn a structured conversation into that flat token sequence, consistently, every time, both during training and at inference. That's a chat template, and getting it wrong is one of the most common, and most silent, sources of broken fine-tunes.

## What you'll learn

- Why a conversation needs an explicit serialization format at all
- The role of special tokens and turn markers in that format
- ChatML, one widely used template style, concretely
- Hugging Face `tokenizer.apply_chat_template` and why you should use it instead of hand-rolling strings
- What goes wrong when training-time and inference-time formatting don't match

## Why conversations need a serialization format

A multi-turn conversation is naturally a list of structured turns: a system message, a user message, an assistant message, maybe another user message. A language model's input is just a sequence of token IDs. Converting the structured list into the flat sequence — and doing it identically every single time — is the job of a chat template. Without a consistent format, the model has no reliable way to tell where one turn ends and the next begins, which breaks both training (the loss-masking logic in Lesson 23 depends on knowing exactly which tokens are "assistant response") and inference (the model needs to know when it's supposed to stop generating and hand control back).

## Special tokens and turn markers

Chat templates rely on special tokens — tokens reserved specifically for structural markup rather than natural-language content — to mark where each turn starts and ends and who is speaking. A widely used style is **ChatML**, which wraps every turn in explicit role markers:

```text
<|im_start|>system
You are a concise, accurate coding assistant.<|im_end|>
<|im_start|>user
What does the Python `zip()` function do?<|im_end|>
<|im_start|>assistant
It pairs up elements from multiple iterables into
tuples, stopping at the shortest input.<|im_end|>
```

`<|im_start|>` and `<|im_end|>` are special tokens added to the tokenizer's vocabulary specifically for this purpose — they are never produced as regular text, which is what lets downstream code reliably detect "the assistant's turn just ended" instead of searching for a substring that might legitimately appear inside the actual response text. Other model families use different concrete token spellings, but the structural idea — role markers wrapping each turn — is the same.

## Using `apply_chat_template` instead of hand-rolling

Hugging Face tokenizers expose the model's exact chat template (stored as a Jinja2 template string in the tokenizer config) through `apply_chat_template`, which is the correct way to build this sequence rather than string-concatenating role tags by hand:

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")

messages = [
    {"role": "system", "content": "You are a concise, accurate coding assistant."},
    {"role": "user", "content": "What does the Python zip() function do?"},
]

prompt = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True,  # appends the assistant turn-start marker
)
print(prompt)
```

`add_generation_prompt=True` appends whatever marker signals "now it's the assistant's turn to generate," which is exactly what you want when building a prompt for inference, but *not* what you want for an already-complete training example where the assistant turn is already filled in.

## Why this matters: training/inference mismatch

The single most damaging, hard-to-diagnose mistake in SFT is training the model on one serialization format and then serving it at inference time with a different one (different special tokens, different whitespace around role markers, a missing or extra newline). Because the model learned to associate specific token patterns with "a turn just started here," even small formatting mismatches can produce a model that ignores its system prompt, runs on past where it should stop, or degrades in quality — without throwing any error, since the input is still valid, just off-distribution relative to what the model was actually trained on. The fix is procedural, not clever: always build both training data and inference prompts through the same `apply_chat_template` call, from the same tokenizer, never from a hand-written string template maintained separately.

## Key terms

- **Chat template** — the format (often a Jinja2 template bundled with the tokenizer) that serializes structured conversation turns into a flat token sequence
- **Special tokens** — tokens reserved for structural markup (e.g., `<|im_start|>`, `<|im_end|>`) that never appear as ordinary text
- **ChatML** — a widely used chat template style with explicit `<|im_start|>role` / `<|im_end|>` turn markers
- **`apply_chat_template`** — the Hugging Face tokenizer method that correctly applies a model's chat template to a list of message dicts
- **`add_generation_prompt`** — the flag that appends the assistant turn-start marker, used for inference prompts but not completed training examples
