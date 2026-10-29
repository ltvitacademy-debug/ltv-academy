# Lesson 14 — Model Inversion and Membership Inference Attacks

**Chapter 4 · Model Extraction and Inversion Attacks · Lesson 2 of 4**

## What you'll learn

- What a model inversion attack reconstructs, and why that's
  possible from outputs alone
- What a membership inference attack determines, and why
  overfitting is the mechanism that makes it work
- Why both attacks are a real privacy risk — not just for "the
  model," but for the actual people whose records trained it
- Why models trained on sensitive data (health, financial, genomic)
  carry this risk even when nobody ever touches the training set
  directly

## Model inversion: reconstructing from outputs

A model extraction attack (Lesson 13) steals the *model itself*.
A **model inversion** attack goes after something different: it uses
a model's outputs — predictions, confidence scores, or in some
settings gradients — to reconstruct representative features of the
*inputs* that produced them, without ever having direct access to
the training data.

The research result that made this concrete is Fredrikson et al.'s
2015 paper "Model Inversion Attacks that Exploit Confidence
Information and Basic Countermeasures." Working against a facial
recognition API that returned a predicted identity along with a
confidence score, the researchers were able to reconstruct a
recognizable reconstruction of a person's face for a given name —
using only the model's own outputs, repeatedly queried, as the
signal to optimize against. The same paper demonstrated inversion
against a pharmacogenetic model, recovering a patient's genetic
markers from a model that was only ever supposed to output a drug
dosage recommendation.

Notice what's being exploited: the model learned a *generalizable*
association between inputs and outputs strong enough that the
association itself can be run in reverse. The more confidence
information an API exposes, the better gradient signal an inversion
attack has to climb.

## Membership inference: "was this record in the training set?"

**Membership inference** asks a narrower, and in some ways more
dangerous, question: given a specific record, was it part of this
model's training set — yes or no?

Shokri et al.'s 2017 paper "Membership Inference Attacks Against
Machine Learning Models" formalized the attack and the mechanism
behind it: **overfitting**. A model that has memorized its training
data even slightly tends to be more confident, and more "sure," on
data it has seen before than on data drawn from the same distribution
that it hasn't. Shokri et al. trained **shadow models** — their own
models trained to mimic the target's behavior — specifically to learn
the difference between "the target model's confidence pattern on
data it trained on" versus "the target model's confidence pattern on
data it didn't." That difference becomes a classifier in its own
right: feed it a record and a confidence score, and it predicts
membership.

## Why this is a serious, not academic, privacy risk

Membership inference sounds abstract until you plug in a realistic
training set. If a hospital trains a model on an HIV-status study, a
substance-abuse treatment program, or a clinical trial for a specific
cancer, and an attacker can determine with meaningful confidence that
a named individual's record was part of that training set, the
*model's mere existence and behavior* has disclosed that the person
participated in that study — independent of whatever the model's
actual prediction task was. This is exactly the kind of re-
identification risk that HIPAA de-identification requirements and
GDPR's Article 9 special-category-data protections exist to prevent,
and it is a documented, published attack category, not a hypothetical
edge case.

Model inversion carries the equivalent risk one level further: it
doesn't just confirm a record was present, it can reconstruct
identifying or sensitive features of that record — a face, a genetic
marker, a set of attributes — directly from the model's own willingness
to answer a query confidently.

## What both attacks have in common

Extraction, inversion, and membership inference are all variations on
the same underlying fact: **a trained model is a lossy but
exploitable compression of its training data**, and anything the
model is willing to tell you with confidence is a potential channel
for that compression to leak back out. That's the throughline into
Lesson 15 (limiting how much any one party can query a model) and
Lesson 16 (differential privacy, which mathematically bounds how much
any single training record can influence the model's behavior in the
first place).

## Key terms

| Term | Meaning |
|---|---|
| Model inversion | Reconstructing representative features of training inputs from a model's outputs or confidence scores |
| Membership inference | Determining whether a specific record was part of a model's training set, typically by exploiting overfitting |
| Overfitting (as an attack surface) | A model being measurably more confident on data it memorized than on unseen data from the same distribution — the signal membership inference exploits |
| Shadow model | An attacker-trained model used to learn the confidence-pattern difference between training and non-training data, enabling a membership-inference classifier |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
does membership inference work *because* of overfitting specifically,
and why can a hospital's model leak the fact that someone was in a
sensitive study even if the model's prediction task has nothing to do
with that study?
