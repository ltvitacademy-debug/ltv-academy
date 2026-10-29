# Lesson 17 — What an Adversarial Example Actually Is

**Chapter 5 · Adversarial Examples and Evasion Attacks · Lesson 1 of 4**

## What you'll learn

- The precise definition of an **adversarial example**: a deliberately,
  minimally perturbed input that causes a model to misclassify it
- Why this is possible at all — what it reveals about how classifiers
  actually carve up their decision space
- The classic, published research result that put this risk on the
  map, and why it still matters to defenders a decade later
- The vocabulary you need before the next three lessons: perturbation
  budget, white-box vs. black-box access, and transferability

## The definition

An **adversarial example** is an input — an image, a piece of text, a
network flow, a file — that has been changed just enough to flip a
model's prediction, while the change itself is small enough that a
human reviewing the same input either doesn't notice it or doesn't
think it's meaningful. The attacker isn't exploiting a bug in the
traditional sense. They're exploiting the geometry of the decision
boundary the model learned during training.

That distinction matters for how you think about this as a security
engineer. There's no stack overflow, no injected command, no malformed
packet. The input is well-formed. It passes every schema check you
could write. The "vulnerability" is a property of the model itself —
specifically, that the boundary separating "class A" from "class B" in
a high-dimensional input space is often far closer to a given real
input than it looks, along directions a human would never think to
move in.

## The example that made this concrete

The result most people point to is from Goodfellow, Shlens, and
Szegedy's 2014 paper *Explaining and Harnessing Adversarial Examples*,
building on an observation Szegedy's team had published the year
before in *Intriguing Properties of Neural Networks*. The demonstration
is simple to describe: start with a photo of a panda that a trained
image classifier correctly labels "panda" with high confidence. Add a
layer of noise to every pixel — a perturbation so small that the
resulting image is visually indistinguishable from the original to a
human observer. Feed the perturbed image back to the same classifier.
It now labels the image "gibbon," again with high confidence.

Nothing about the image changed in any way a person would call
meaningful. What changed was a carefully computed nudge, applied in
the direction the model's own loss function told the attacker to move
in. That's the core mechanism behind the simplest version of this
attack, the Fast Gradient Sign Method: compute the gradient of the
model's loss with respect to the input, then nudge every input
dimension a small, fixed amount in the direction that increases loss.
Do that once, and a correctly classified input can cross the decision
boundary into the wrong class.

## Why high-dimensional models are vulnerable to this

It's tempting to assume this is a quirk of one 2014 image model, since
fixed since. It isn't. The underlying cause — models operating in
very high-dimensional input spaces, with decision boundaries that can
be locally close to a huge number of correctly classified points —
has been reproduced across architectures, modalities, and years of
follow-up research. A boundary doesn't need to be close to a point in
every direction to be exploitable; it only needs to be close in *some*
direction, and in a space with thousands or millions of dimensions,
there are a lot of directions to search. That's also why gradient
access matters so much to an attacker: the gradient tells you, among
all those directions, which one moves you toward the boundary fastest.

## Perturbation budgets, and who the attacker is assumed to be

Research and real evaluations describe how large a perturbation is
allowed using a **budget**, usually written as epsilon (ε), measured
under a specific norm (commonly L∞, which caps the maximum change to
any single input dimension, or L2, which caps the perturbation's
overall magnitude). The budget exists precisely to keep the comparison
honest — a perturbation large enough to be visible isn't an
adversarial example, it's just a different, visibly different input.

Attacks are also classified by what the attacker is assumed to know.
A **white-box** attacker has full access to the model's architecture
and weights, so they can compute exact gradients, as in FGSM above. A
**black-box** attacker only gets to submit inputs and observe outputs
— no gradient access at all. The reason black-box attacks work almost
as well in practice is **transferability**: an adversarial example
crafted against one model frequently fools a second, independently
trained model solving the same task, even one with different
architecture or training data. That single property is why "the
attacker can't see our model" is not, by itself, a defense — a point
the rest of this chapter builds on directly.

## Key terms

| Term | Meaning |
|---|---|
| Adversarial example | An input deliberately perturbed by a small, often human-imperceptible amount so a model misclassifies it |
| Perturbation budget (ε) | The maximum allowed size of a perturbation, measured under a norm such as L∞ or L2, that keeps a comparison between "adversarial" and "just a different input" honest |
| FGSM (Fast Gradient Sign Method) | The baseline attack: nudge every input dimension slightly in the direction the model's loss gradient says will increase loss fastest |
| White-box / black-box attack | Whether the attacker has full access to model internals and gradients (white-box) or only query access to inputs and outputs (black-box) |
| Transferability | The empirical finding that an adversarial example crafted against one model often fools a different model trained on a similar task |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
is an adversarial example not a traditional software bug, and why
does transferability mean a defender can't rely on keeping a model's
internals secret?
