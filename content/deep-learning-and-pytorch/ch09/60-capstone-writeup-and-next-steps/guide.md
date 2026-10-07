# Capstone: Write-Up & Next Steps

You've chosen a dataset, built and trained a decoder-only transformer from scratch, and evaluated it honestly with perplexity, samples, and error analysis. The last step is the one most self-taught projects skip: writing it up. A short, honest write-up is what turns "I trained a thing once" into a project you can actually point to — in an interview, a portfolio, or just your own notes six months from now when you've forgotten the details. This lesson covers what belongs in that write-up, and closes the course by pointing you toward what comes next.

## What you'll learn

- The four sections every model write-up (a "model card") should contain
- How to describe what your model can and can't do without overselling it
- Where this capstone sits in the broader arc of learning deep learning and transformers
- Honest, non-overpromising next steps for continuing past this course

## Why write anything down at all

A trained checkpoint with no documentation is close to worthless to anyone but you, on the day you trained it. Three months from now you won't remember the exact hyperparameters, the exact dataset split, or why you picked the values you picked. A write-up is cheap insurance against that, and it's also the artifact that makes this project legible to someone else — a reviewer, a hiring manager, a future collaborator.

The industry convention for this is a **model card**: a short, structured document describing what was trained, on what data, with what configuration, and what the result can and cannot do. You don't need anything elaborate — a single README file is enough.

## The four sections of a model card

```markdown
# Tiny GPT — Model Card

## What this is
A 4-layer, 4-head, 128-dim decoder-only transformer trained from
scratch on character-level Tiny Shakespeare (~1.1M characters).
~800K parameters, 128-token context window.

## How it was trained
AdamW (lr=3e-4, weight_decay=0.1), cosine LR schedule, gradient
clipping at norm 1.0, dropout 0.1, batch size 64, 3,000 steps,
single GPU, ~15 minutes. 90/10 train/validation split.

## Results
Validation loss 1.42, perplexity 4.14. Generated samples produce
plausible character names, verse-like line breaks, and short
locally-coherent phrases; no long-range plot or logical consistency.

## Limitations
Cannot answer questions, hold a conversation, or generalize beyond
Shakespeare-style English text. Not evaluated for bias or safety —
it is far too small and narrow-domain for that to be meaningful here.
```

Keep each section to a few lines. The point isn't length, it's that someone who never saw you train the model could read this and know exactly what they're looking at.

- **What this is** — architecture, parameter count, dataset, and tokenization, in one or two sentences.
- **How it was trained** — optimizer, learning rate, schedule, regularization, batch size, number of steps, and how long it took on what hardware. This is the section future-you will actually reread.
- **Results** — the real numbers from Lesson 59: validation loss, perplexity, and an honest sentence or two about what the generated samples actually look like.
- **Limitations** — say plainly what the model cannot do. This is the section that's easiest to skip and most important to include — it's what separates a credible write-up from a sales pitch.

## Describing capability honestly

Resist two opposite temptations when writing the results and limitations sections. Don't undersell a working pipeline just because the model is small — a tiny transformer that visibly learns character-level structure from scratch is a real, demonstrable result. And don't oversell it either: a perplexity of 4 on a 1.1-million-character single-author corpus says nothing about how the model would perform on open-domain text, and claiming otherwise is the kind of overclaim that erodes trust the moment someone tries it themselves. State the dataset, state the scope, state the numbers, and let them speak for themselves.

## Where this capstone sits in the bigger picture

This course took you from tensors and autograd (Chapter 1) through building neural networks (Chapter 2), training them properly (Chapter 3), convolutional networks (Chapter 4), sequence models and attention (Chapter 5), building a transformer from scratch (Chapter 6), scaling it up (Chapter 7), and debugging training runs (Chapter 8) — and this capstone is where every one of those pieces had to work together at once. If you can read your own write-up back and understand every line of it, you've actually internalized the material, not just followed along with it.

## Honest next steps

This course is the first course in the AI/ML Research Engineer & Alignment Engineer destination. From here, the natural directions to continue in — without claiming specifics about courses this guide hasn't seen — are:

- **Fine-tuning and adaptation** — starting from a pretrained model instead of random initialization, and adapting it to a narrower task with far less data and compute than training from scratch required
- **Alignment and preference-based training techniques** — methods for shaping a model's behavior toward human preferences, beyond next-token prediction alone
- **Scaling laws and bigger models** — understanding how the architecture you just built behaves differently (and what new engineering problems show up) as parameter count, data, and context length grow by orders of magnitude

You now have hands-on proof that you can build, train, and evaluate a transformer language model from first principles — tensors up. That foundation is what makes everything in those directions learnable rather than mysterious.

## Key terms

| Term | Meaning |
|---|---|
| Model card | A short, structured write-up describing what a model is, how it was trained, its results, and its limitations |
| Limitations section | The part of a write-up that states plainly what a model cannot do — essential for honest documentation |
| Fine-tuning | Continuing training of an already-trained model on a narrower task or dataset, instead of training from random initialization |
| Alignment | Techniques for shaping a trained model's behavior toward human preferences or intended use, beyond raw next-token prediction |
