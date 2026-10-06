# Lesson 24 — Fine-Tuning vs. Using As-Is

**Chapter 5 · Using Pretrained Models · Lesson 24 of 30**

## What you'll learn

- The real decision every project using a pretrained model has to make
- What "using as-is" actually means, and when it's genuinely enough
- What fine-tuning changes, in code, compared to lesson 23's loading pattern
- How the Hub tracks a fine-tuned model's lineage back to its base model
- How to tell, from real signals, whether a model needs fine-tuning for your case

## The question lesson 23 set up

Lesson 23 loaded `bert-base-uncased` and got back raw hidden states — numbers, not an
answer. Getting from there to something useful has exactly two paths: trust that a model
someone already fine-tuned for your task is close enough and **use it as-is**, or take a
pretrained model and **fine-tune** it further on your own labeled data. Neither is
automatically the right call; the rest of this lesson is how to tell which one is.

## Using as-is: when the Hub already did the work

"As-is" means calling a model that's already been fine-tuned for your exact task by
someone else, with no further training of your own — the `pipeline("sentiment-analysis")`
call from lesson 23 is exactly this. `distilbert-base-uncased-finetuned-sst-2-english`,
the model it defaults to, was already fine-tuned on a large labeled movie-review dataset
(SST-2) for general-purpose English sentiment. If your task is also general English
sentiment, that work is already done — fine-tuning it again on your own smaller dataset
would likely make it *worse*, not better, by overfitting to a tiny sample.

## Fine-tuning: continuing training on your own data

Fine-tuning takes a pretrained model's weights as a *starting point* rather than a random
one, then keeps training — using the exact same backpropagation and gradient descent from
Chapter 4 — on a labeled dataset specific to your task. In code, the shape is close to
lesson 23's loading pattern, with a training loop added:

```python
from transformers import (AutoModelForSequenceClassification,
                           TrainingArguments, Trainer)

model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2)   # starts from the pretrained weights

args = TrainingArguments(
    output_dir="out", num_train_epochs=3, learning_rate=2e-5)

trainer = Trainer(model=model, args=args,
                   train_dataset=train_ds, eval_dataset=eval_ds)
trainer.train()   # backprop + gradient descent, on YOUR labeled data
```

Two details matter here, compared to training from scratch (Chapter 4): the model starts
already knowing general language (grammar, word relationships — everything self-attention
learned during pretraining), and the learning rate is deliberately small (`2e-5` here,
versus the `0.5` lesson 19 used on a toy network) so training nudges those weights toward
your task without destroying what they already know — a failure mode called
**catastrophic forgetting**.

## Watching a real fine-tuning run

Training jobs hosted on the Hub expose live metrics the same way any training loop does —
loss and gradient norm, tracked over steps, so you can see whether training is actually
converging rather than just trusting it blindly:

![A real TensorBoard dashboard hosted on a Hugging Face model repository's "Training metrics" tab, showing actual scalar charts for batch-size and grad-norm over training steps from a real large-scale training run.](/courses/ai-ml-foundations/ch05/24-fine-tuning-vs-using-as-is/tensorboard.png)
*Grad-norm settling down (after early spikes) is what a stabilizing training run looks like — the same kind of signal lesson 19's loss curve showed on a far smaller scale.*
Source: [Hugging Face Hub docs — Uploading Models](https://huggingface.co/docs/hub/models-uploading)

## The Hub tracks where a fine-tune came from

Because fine-tuning starts from a specific base model's weights, the Hub lets a
fine-tuned model declare that lineage directly in its model card, and surfaces it as a
clickable link:

![A real Hugging Face model card's metadata, showing "Finetuned from mistralai/Mistral-7B-v0.1" with a dropdown offering to view the base model's page or list every other model finetuned from the same base.](/courses/ai-ml-foundations/ch05/24-fine-tuning-vs-using-as-is/base-model-ui.png)
*This is literally the relationship this lesson describes, rendered as a real, clickable Hub feature — a finetune is derived from, and traceable back to, its base model.*
Source: [Hugging Face Hub docs — Model Cards](https://huggingface.co/docs/hub/model-cards)

That "List models finetuned from..." link is worth knowing about on its own: it's a fast
way to discover whether someone has already fine-tuned your preferred base model for a
task close to yours — collapsing back into the "use as-is" path.

## Every change, fine-tune or not, is a trackable commit

A Hub repository is a Git repository underneath, so even a model card edit — never mind a
full fine-tune — is a diffable, attributable change:

![A real Hugging Face Hub commit view, showing a Git-style diff of a change to a model's README.md, with the author ("clem"), commit hash, and the exact lines added and removed.](/courses/ai-ml-foundations/ch05/24-fine-tuning-vs-using-as-is/vis_diff.png)
*Fine-tuning produces exactly this kind of auditable commit when you push the result — not an untracked, unexplained swap of files.*
Source: [Hugging Face Hub docs — Model Sharing](https://huggingface.co/docs/transformers/model_sharing)

## Deciding which path to take

| Signal | Use as-is | Fine-tune |
|---|---|---|
| A model already fine-tuned for your exact task exists and scores well | Yes | — |
| Your domain uses specialized language the base model wasn't trained on (legal, medical, internal jargon) | — | Yes |
| You have a solid labeled dataset specific to your task | Helpful either way | Required |
| You have very little labeled data | Prefer as-is, or lesson 25's transfer learning | Risky — overfits fast |

## Recap

Using a model as-is means trusting that someone's existing fine-tune is close enough to
your task, which lesson 23's `pipeline` example already demonstrated. Fine-tuning
continues training a pretrained model's own weights on your labeled data, using the same
backpropagation from Chapter 4 but with a small learning rate to avoid catastrophic
forgetting. The Hub tracks this lineage explicitly, and every fine-tune becomes a
trackable Git commit. Next, lesson 25 looks at the broader idea underneath all of this:
transfer learning, and why it works at all.
