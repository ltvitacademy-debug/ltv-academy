# Lesson 11 — Backdoor Attacks, and How They're Detected

**Chapter 3 · Data Poisoning and Training-Time Attacks · Lesson 3 of 4**

## What you'll learn

- How a backdoor (trojan) attack is conceptually structured, at the
  level needed to recognize and detect one — not build one
- Why backdoors are the hardest poisoning variant to catch with
  standard accuracy evaluation
- Four real, documented detection techniques from the academic
  security literature: activation clustering, Neural Cleanse, STRIP,
  and dataset-level anomaly checks
- Where backdoor detection fits into a broader model-validation
  pipeline

## What a backdoor attack is, conceptually

A backdoor (or "trojan") attack is the most structured version of the
targeted poisoning you saw in Lesson 9. The model is trained to behave
completely normally on ordinary inputs, but to produce a specific,
attacker-chosen output whenever a particular **trigger pattern** is
present — a specific pixel pattern in an image, a specific phrase in
text, or a specific combination of features. The trigger acts like a
hidden switch: invisible in normal evaluation, because the model's
behavior on everything else is unaffected, and only detectable once
you specifically know to look for it. This is why backdoors are
discussed separately from general poisoning — the research community
(starting with the widely cited "BadNets" study in 2017) has had to
develop dedicated detection methods just for this failure mode,
because ordinary accuracy testing simply doesn't surface it.

## Why normal evaluation misses it

A held-out test set, evaluated the normal way, will show a
backdoored model performing exactly as well as a clean one — because
the test set almost certainly doesn't happen to contain the attacker's
specific trigger. This is precisely why backdoor detection needs its
own dedicated techniques rather than relying on the evaluation metrics
a team already collects.

## Real detection technique 1: activation clustering

Security researchers found that poisoned examples tend to activate a
model's internal neurons in subtly different patterns than clean
examples of the same labeled class, even when the final output label
is identical. **Activation clustering** examines those internal
activation patterns across the training set and looks for a small,
unusual cluster within a class that behaves differently from the rest
— a statistical fingerprint that can expose poisoned examples without
ever needing to know what the trigger looked like in advance.

## Real detection technique 2: Neural Cleanse

**Neural Cleanse** works from the deployed model outward instead of
from the dataset. For each possible output class, it searches for the
smallest possible pixel or feature perturbation that would flip any
input into that class. A legitimate class requires a large,
semantically meaningful change to trigger misclassification. A
backdoored class stands out because an abnormally small, consistent
perturbation reliably triggers it — that gap is the detection signal.

## Real detection technique 3: STRIP

**STRIP** (STRong Intentional Perturbation) takes a behavioral
approach at inference time: it deliberately superimposes random,
unrelated patterns onto an input and checks whether the model's
prediction confidence stays suspiciously stable. A clean input's
prediction typically becomes less confident under heavy perturbation.
A backdoored input containing its trigger tends to stay confidently
classified regardless, because the trigger — not the rest of the
image or text — is driving the output.

## Real detection technique 4: dataset-level anomaly checks

Before training even starts, straightforward anomaly detection across
the raw dataset — looking for unusual clusters of near-duplicate
examples, label distributions that don't match expectations, or
outlier samples with unusual statistical properties — catches a
meaningful share of poisoning attempts long before they ever reach a
trained model, as a low-cost first line of defense.

## Key terms

| Term | Meaning |
|---|---|
| Backdoor / trojan attack | A model trained to behave normally except when a specific trigger pattern is present, which forces a chosen output |
| Trigger pattern | The specific input feature an attacker uses to activate backdoored behavior |
| Activation clustering | A detection technique comparing internal neuron activation patterns to spot statistically anomalous poisoned examples |
| Neural Cleanse / STRIP | Detection techniques that probe a trained model's behavior directly for backdoor signatures, rather than inspecting training data |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does a backdoored model pass a normal held-out accuracy test, and how
do STRIP and Neural Cleanse detect that same model from two different
directions?
