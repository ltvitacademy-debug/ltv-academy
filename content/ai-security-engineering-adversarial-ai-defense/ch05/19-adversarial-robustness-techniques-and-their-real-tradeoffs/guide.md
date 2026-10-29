# Lesson 19 — Adversarial Robustness Techniques and Their Real Tradeoffs

**Chapter 5 · Adversarial Examples and Evasion Attacks · Lesson 3 of 4**

## What you'll learn

- The main published approaches to making a model more robust to
  adversarial inputs, and what each one actually does
- The real, documented tradeoff adversarial training makes — robust
  accuracy versus clean accuracy, not a free upgrade
- Why one well-known early defense was shown to be broken, and the
  broader lesson that episode teaches about trusting a defense claim
- Why "obfuscated gradients" give a false sense of security, and what
  an adaptive evaluation is supposed to catch

## There is no defense that eliminates this risk

Before the specific techniques: the honest framing a security engineer
needs here is that no published defense removes adversarial
vulnerability. Every real technique trades one thing for another —
accuracy, compute, latency, or the scope of attacks it actually
covers. Your job isn't to find "the fix." It's to understand what each
option actually buys, so you can make a risk decision instead of a
marketing decision.

## Adversarial training: the real workhorse, with a real cost

The most studied and most trusted defense is **adversarial training**:
during training, generate adversarial examples against the model as it
currently stands, and include them in the training batches alongside
clean data, so the model learns to classify them correctly too. Madry
et al.'s 2018 paper, *Towards Deep Learning Models Resistant to
Adversarial Attacks*, formalized this using a strong iterative attack
called Projected Gradient Descent (PGD) to generate the adversarial
examples used during training, and it remains the baseline every later
robustness claim gets compared against.

It works — robust accuracy against the attacks it was trained against
goes up, often substantially. But it is not free, and the cost is
documented, not theoretical. Tsipras et al.'s 2019 paper, *Robustness
May Be at Odds with Accuracy*, showed that adversarially robust models
frequently have measurably lower accuracy on ordinary, unperturbed
inputs than a standard model trained the normal way. This is a real
tradeoff a security team has to own explicitly: a more robust model
may also be a model that makes more mistakes on completely normal,
benign traffic. On top of that, adversarial training is computationally
expensive — generating adversarial examples during every training step
can multiply total training cost several times over.

## A defense that looked good, then didn't: defensive distillation

Papernot et al. proposed **defensive distillation** in 2016 — training
a second model to mimic a first model's softened output probabilities,
which was observed to make simple gradient-based attacks much less
effective. For a while, it looked like a cheap, elegant win. Then
Carlini and Wagner's 2016 paper demonstrated that defensive
distillation does not actually make the model robust — it mainly made
the *existing, simple attacks* fail, by distorting the gradients those
attacks depended on. A slightly different attack, designed with the
defense in mind, went straight through.

That episode is the single most important lesson in this whole area:
a defense that defeats the attacks you tested it with is not the same
thing as a defense that works. Defenses must be re-evaluated against
attacks built with knowledge of the defense itself, not retired once
they survive a first round of testing.

## Obfuscated gradients: the pattern behind most broken defenses

Athalye, Carlini, and Wagner's 2018 paper, *Obfuscated Gradients Give a
False Sense of Security*, examined a whole set of defenses proposed
around that time — including several input-transformation approaches
like JPEG compression and feature squeezing — and found a common
pattern: many of them worked not by making the model genuinely robust,
but by making gradients hard to compute or misleading, which broke
the *specific* gradient-based attacks used to test them without
closing the underlying vulnerability. Once the researchers built
attacks that accounted for the obfuscation, most of those defenses'
reported robustness collapsed.

The practical takeaway for later lessons: any robustness number that
wasn't produced under an **adaptive attack** — one built with full
knowledge of the defense in place — should be treated as unverified.

## Certified robustness: a different kind of guarantee, with its own cost

**Randomized smoothing**, formalized by Cohen, Rosenfeld, and Kolter in
2019, takes a different approach: rather than trying to empirically
survive known attacks, it provides a mathematical guarantee that a
prediction cannot change for any perturbation within a certified
radius, by averaging predictions over many noisy copies of the input.
The tradeoff here is different in kind from adversarial training — the
guarantee is real and provable, but it costs significant extra compute
at inference time (many forward passes per prediction) and the
guarantee only covers perturbations within that certified radius, not
attacks that exceed it.

## Key terms

| Term | Meaning |
|---|---|
| Adversarial training | Training a model on adversarial examples (often PGD-generated) alongside clean data, so it learns to classify them correctly too |
| Robustness-accuracy tradeoff | The documented finding that adversarially robust models often have lower accuracy on ordinary, clean inputs |
| Obfuscated gradients | A failure pattern where a defense appears robust only because it breaks the specific attack used to test it, not because the underlying vulnerability is closed |
| Adaptive attack | An attack built with full knowledge of a specific defense, used to verify that defense's robustness claim honestly |
| Certified robustness / randomized smoothing | A defense that provides a mathematical guarantee a prediction can't change within a bounded perturbation radius, at extra inference-time compute cost |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
did defensive distillation's early robustness claims not hold up, and
why does that same lesson mean a reported robustness number is only
as trustworthy as the attack used to produce it?
