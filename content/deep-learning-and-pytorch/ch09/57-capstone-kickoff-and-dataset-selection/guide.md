# Capstone Kickoff & Dataset Selection

This is the capstone for Deep Learning & PyTorch: you're going to train and evaluate a small decoder-only transformer language model from scratch, using nothing but the tools this course already gave you. Chapter 6 built the transformer architecture; Chapters 1-3 built the training loop, regularization, and optimizer habits; Chapter 7 covered mixed precision and gradient accumulation for when compute is tight; Chapter 8 taught you how to read a training run and catch silent bugs. This capstone doesn't introduce anything new — it asks you to put all of it together on a real dataset and ship something you can show. This lesson is entirely about the decisions you make before you write a single line of training code: what data, what tokenizer, what scope, and what "done" actually means.

## What you'll learn

- The four phases of the capstone project, in order
- How to pick a dataset and a tokenization scheme sized to a tiny model and modest compute
- Why character-level tokenization is the right default for this project, and when word/BPE-level is worth the extra complexity
- What a realistic compute budget looks like on a single GPU or even a CPU
- The concrete finish line for this capstone — what "done" looks like

## The four phases of this capstone

Every lesson in this chapter covers one phase of the same project, in order:

1. **Choose a dataset and tokenizer** (this lesson)
2. **Build and train the model** (Lesson 58) — the decoder-only transformer from Chapter 6, trained with the loop and regularization habits from Chapters 1-3, optionally sped up with the mixed-precision and gradient-accumulation techniques from Chapter 7
3. **Evaluate it** (Lesson 59) — held-out loss, perplexity, qualitative generation, and error analysis using the loss-curve literacy from Chapter 8
4. **Write it up** (Lesson 60) — document what you built so someone else (including future-you) can understand it

Treat this as one project spread across four lessons, not four separate exercises. The dataset you pick here determines the tokenizer, which determines your vocabulary size, which determines your embedding table size, which shows up again when you're reading loss curves in Lesson 59. Every decision in this lesson has a downstream consequence.

## Picking a dataset sized to the model you can actually train

A small decoder-only transformer trained from scratch on a laptop GPU — or even a CPU, just more slowly — cannot learn broad world knowledge, hold a long conversation, or write working code. That's not the goal. The goal is to prove the full pipeline works end to end: real data in, a transformer trained on it, coherent-sounding text out, honestly evaluated. Pick a dataset that matches that ambition:

- **Tiny Shakespeare** — roughly 1.1 million characters of Shakespeare's plays, popularized by Andrej Karpathy's char-rnn project. It's small enough to tokenize and load into memory in seconds, has enough internal structure (character names, verse, repeated phrases) that a tiny model visibly learns something, and is the standard "hello world" dataset for from-scratch language model training.
- **A small slice of WikiText-2** — a few hundred thousand tokens of verified Wikipedia text. Slightly more realistic prose than Shakespeare, still small enough to train on quickly.

Either is a reasonable choice. This guide uses Tiny Shakespeare in its examples because its small, clean, single-file format makes the tokenization and `Dataset` code in Lesson 58 almost trivial — which keeps the lesson's focus on the model and training loop, not data plumbing.

## Character-level vs. word/BPE-level tokenization

You met tokenization only indirectly earlier in this course, since Chapter 6 focused on the transformer architecture itself and assumed token IDs already existed. For this capstone, you choose the tokenizer:

- **Character-level**: the vocabulary is just the distinct characters in your text (for Tiny Shakespeare, about 65 of them — letters, punctuation, whitespace). Trivial to build, trivial to decode, and a small model can learn basic spelling and structure from it quickly. The tradeoff: sequences are long, since every character is its own token, so the model has to look further back to connect related ideas.
- **Word-level or a simple BPE tokenizer**: the vocabulary grows into the thousands or tens of thousands, which means a bigger embedding table and a bigger final projection layer — real cost for a small model. The payoff is shorter sequences and tokens that already carry whole-word meaning.

For a model this size, character-level is the right default. It keeps the vocabulary small (which matters a lot when your embedding table and output layer are among the largest parameter counts in a tiny model), keeps the code simple, and still produces visibly-improving, visibly-Shakespearean output after a few thousand training steps. Here's the entire tokenizer you need:

```python
# Build a character-level vocabulary and codec from raw text.
text = open("input.txt", "r", encoding="utf-8").read()
chars = sorted(set(text))
vocab_size = len(chars)

stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for i, ch in enumerate(chars)}

def encode(s: str) -> list[int]:
    return [stoi[c] for c in s]

def decode(ids: list[int]) -> str:
    return "".join(itos[i] for i in ids)
```

Run `encode` over the whole file once, hold out the last ~10% as a validation split, and you have everything Lesson 58 needs to start training.

## Sizing the project to realistic compute

Be explicit with yourself about scope before you write the model. A sensible target for this capstone, trainable in well under an hour on a single modern GPU (and in a few hours on CPU, just with a smaller model and fewer steps):

- **Context length (block size)**: 128-256 tokens
- **Model size**: 4-6 transformer blocks, 4-8 attention heads, 128-256 embedding dimensions — roughly 1-5 million parameters
- **Batch size**: as large as fits in memory, 32-64 is typical on a laptop GPU
- **Training steps**: a few thousand is enough to see the loss curve flatten on a dataset this small

If you only have a CPU, halve the model size and context length again and lower your expectations for training speed, not for whether the pipeline works — a CPU will train this fine, just slowly.

## What "done" looks like

Before you start building, write down your finish line. For this capstone, "done" means all of the following are true:

- The training loss decreases steadily and the validation loss stabilizes without exploding (Lesson 59 teaches you how to read that curve)
- The model generates locally coherent text — real words, plausible short phrases, character-name-like structure — even though it won't make long-range sense
- You can report a validation perplexity number and explain what it means
- You have a short written artifact (Lesson 60) describing what you trained, on what, and with what results

That's the whole bar. Nothing here requires state-of-the-art results — it requires a complete, honestly-evaluated, well-documented pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Character-level tokenization | A tokenizer whose vocabulary is the distinct characters in the training text |
| Vocabulary size | The number of distinct tokens the model's embedding table and output layer must represent |
| Block size / context length | The number of tokens the model attends over in a single training example |
| Tiny Shakespeare | A ~1.1M-character plain-text corpus of Shakespeare's plays, a common from-scratch LM benchmark |
| Held-out / validation split | Data set aside and never trained on, used to check whether the model generalizes |
