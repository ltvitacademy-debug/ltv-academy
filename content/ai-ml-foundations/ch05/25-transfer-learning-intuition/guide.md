# Lesson 25 — Transfer Learning, Intuition

**Chapter 5 · Using Pretrained Models · Lesson 25 of 30**

## What you'll learn

- The general principle underneath everything this chapter has done so far
- Why early layers of a trained network learn things that transfer, and later layers specialize
- Feature extraction, worked in code: freezing most of a model and training only a small head
- How feature extraction and lesson 24's fine-tuning are two points on one spectrum
- Why this idea, not any one architecture, is what makes pretrained models useful at all

## The idea underneath this whole chapter

Lessons 22-24 have all quietly assumed one thing: that knowledge a model learned on one
task can help it on a different task. That assumption has a name — **transfer learning**
— and it's worth making explicit, because it's the actual reason downloading a pretrained
model is useful instead of just a shortcut around typing more code. Chapter 4 showed a
network is layers, each building on the last; transfer learning is the claim that *some*
of those layers learn things general enough to be useful for a task the network never saw
during its original training.

## Why early layers generalize and later layers specialize

Lesson 20's convolution example is the clearest version of this. A CNN's first layer
learns simple things — edges, color gradients, basic textures — because those are useful
for recognizing *almost anything* in an image, whether the task is "is this a cat" or "is
this a tumor." Layers deeper in the network combine those into more specific patterns:
fur textures, then animal shapes, then eventually something as specific as "this exact
breed of dog." The first layer's weights would be almost identical whether the model was
trained to recognize pets or to recognize cars — but its last layer would look nothing
alike. Lesson 21's self-attention has the same shape: early attention layers in a language
model tend to capture general grammar and local word relationships, while later layers
build toward task-specific meaning. General knowledge sits early; task-specific knowledge
sits late.

## Feature extraction: freezing almost everything

Lesson 24 covered **fine-tuning** — updating every weight, with a small learning rate.
There's a lighter-weight option at the other end of the same spectrum: **freeze** the
pretrained layers entirely (stop them from updating at all) and train only a small new
layer attached on top. In code, this looks like turning off gradients for most of the
model:

```python
from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2)

for param in model.bert.parameters():
    param.requires_grad = False     # frozen: no gradient, no update, ever

for param in model.classifier.parameters():
    param.requires_grad = True      # only this small head actually trains
```

`requires_grad = False` tells backpropagation (lesson 19) to skip computing a gradient
for that parameter entirely — it's excluded from the chain rule, so gradient descent
never touches it. Only `model.classifier`, the small new layer added for this specific
task, updates at all.

## Just how small is "the small part"

`bert-base-uncased`'s classification head here is a single layer: it reads the model's
`768`-number hidden size (lesson 23) and maps it to `2` output classes:

```python
head_params = 768 * 2 + 2    # weights + bias
# = 1538

base_params ≈ 110_000_000    # bert-base-uncased, widely documented

head_params / base_params
# ≈ 0.0014%
```

Feature extraction trains roughly `0.0014%` of the model's total parameters and leaves the
other `99.9986%` — everything self-attention learned about general language during
pretraining — completely untouched. That's the entire appeal: a tiny amount of new
training, on top of knowledge that cost someone else enormous data and compute to produce.

## One spectrum, two points

Feature extraction and fine-tuning aren't different techniques; they're the same idea at
different settings:

| | Feature extraction | Full fine-tuning (lesson 24) |
|---|---|---|
| What updates | Only the new head | Every layer, pretrained included |
| Pretrained knowledge | Fully preserved | Nudged, risk of catastrophic forgetting |
| Data needed | Works with very little | Needs more to avoid overfitting |
| Compute needed | Low — most of the model is frozen | Higher — gradients flow through everything |
| Best when | Your task is close to what the model already does | Your domain is specialized enough to need deeper adaptation |

Nothing stops you from unfreezing a few of the later layers only, splitting the difference
— real projects do this constantly, starting frozen and unfreezing more if accuracy isn't
good enough.

## Recap

Transfer learning is the principle that some of what a network learns is general enough
to reuse on a new task — concretely, early layers (edges in a CNN, grammar in a
transformer) generalize, while later layers specialize. Feature extraction is transfer
learning at its lightest: freeze the pretrained model, train only a tiny new head, here
about `0.0014%` of the total parameters. Fine-tuning, from lesson 24, is the same spectrum
at its heaviest setting. Next, lesson 26 returns to the Hub itself: reading a model card
closely enough to choose the right starting point for either approach.
