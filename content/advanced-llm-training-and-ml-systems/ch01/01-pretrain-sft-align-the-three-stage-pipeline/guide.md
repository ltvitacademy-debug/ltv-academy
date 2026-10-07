# Pretrain, SFT, Align: the Three-Stage Pipeline

Every modern production LLM — whether it's an open-weights model you can download or a closed API model — is built through the same three-stage pipeline: pretraining, supervised fine-tuning (SFT), and alignment. This lesson gives you the map of that pipeline before the rest of the course spends entire chapters inside each stage. Understanding what changes — the data, the objective, and the resulting behavior — at each handoff is the single most useful mental model for this whole course.

## What you'll learn

- What happens at each of the three stages: pretraining, SFT, and alignment
- Why the stages use different data and different loss functions
- Why a "base model" and a "chat model" are the same architecture with different training histories
- Where compute, data, and human effort are spent across the pipeline

## Stage 1: Pretraining

Pretraining is self-supervised next-token prediction over a massive, mostly unlabeled text corpus — commonly hundreds of billions to tens of trillions of tokens scraped from the web, books, code, and other sources. The model sees a sequence of tokens and is trained to predict the next one, using cross-entropy loss against the actual next token. There is no notion of "instruction" or "answer" yet — the model is simply learning the statistical structure of language, facts, and reasoning patterns embedded in its training data.

This is by far the most expensive stage: it consumes the overwhelming majority of the total compute budget (often 95%+) and produces what's called a **base model** — a model that completes text plausibly but has no particular tendency to follow instructions or converse helpfully.

```python
# Pretraining objective, conceptually (causal language modeling)
# logits: (batch, seq_len, vocab_size) predictions for every position
loss = torch.nn.functional.cross_entropy(
    logits[:, :-1, :].reshape(-1, vocab_size),
    input_ids[:, 1:].reshape(-1),
)
```

## Stage 2: Supervised Fine-Tuning (SFT)

SFT takes the base model and continues training it, but now on a much smaller, curated dataset of (prompt, response) pairs — typically tens of thousands to a few million examples, versus the trillions of tokens used in pretraining. The loss function is still next-token prediction, but it's usually masked so the model is only penalized for getting the **response** tokens wrong, not the prompt tokens it was given.

This is where a base model becomes an **instruct model**: it learns the *format* of following an instruction and producing a helpful, well-structured answer. The underlying knowledge mostly comes from pretraining — SFT reshapes how that knowledge is expressed, not how much of it exists.

```python
from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B")
chat = [
    {"role": "user", "content": "Explain what a p-value is."},
    {"role": "assistant", "content": "A p-value is..."},
]
text = tok.apply_chat_template(chat, tokenize=False)
```

## Stage 3: Alignment

Alignment takes the SFT model and optimizes it further against **human or AI preferences** — not "is this the correct next token" but "which of these two responses do people prefer." Common methods include RLHF (Reinforcement Learning from Human Feedback, using PPO against a learned reward model) and more recent, simpler preference-optimization methods like DPO (Direct Preference Optimization), which skip the separate reward model and RL loop entirely.

Alignment is what pushes a model toward being helpful, harmless, and honest in the specific sense its creators intend — reducing refusals on benign requests, reducing harmful or unsafe completions, and improving tone and calibration. It is typically the cheapest stage in raw compute terms but has an outsized effect on how a model "feels" to use.

## Why the pipeline is staged, not a single training run

Each stage optimizes something different, and combining them into one objective is both technically hard and wasteful. Pretraining data is abundant but has no notion of "good response." Preference data is informative about human taste but far too scarce and expensive to pretrain a model from scratch. Staging lets each phase use the data that's actually available for that purpose, and lets teams swap out or re-run a later stage (say, a new alignment pass) without redoing the enormously expensive pretraining run.

## Key terms

- **Base model** — the direct output of pretraining; completes text but doesn't reliably follow instructions
- **SFT (Supervised Fine-Tuning)** — continued training on curated (prompt, response) pairs to teach instruction-following format
- **Alignment / RLHF / DPO** — optimizing a model against human or AI preference judgments rather than token-level correctness
- **Instruct / chat model** — a base model after SFT (and usually alignment) has been applied

## Recap

Pretraining teaches a model language and knowledge from massive unlabeled text and dominates the compute budget. SFT reshapes that knowledge into the instruction-following format using a small curated dataset. Alignment (RLHF or DPO) further tunes the model against preference judgments to make it more helpful and safer to use. Next up, Lesson 2: why compute budgets — and the trade-offs they force — matter so much at every one of these stages.
