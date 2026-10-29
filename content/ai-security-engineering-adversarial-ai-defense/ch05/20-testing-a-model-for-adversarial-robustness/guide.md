# Lesson 20 — Testing a Model for Adversarial Robustness

**Chapter 5 · Adversarial Examples and Evasion Attacks · Lesson 4 of 4**

## What you'll learn

- How a security team structures an adversarial robustness evaluation
  before a model goes into production, instead of testing ad hoc
- Why a threat model has to come before any attack is run, and what
  it needs to specify
- Why evaluating with a single weak attack produces a false sense of
  security, and what an adaptive evaluation actually requires
- The real, standard open-source tooling teams use for this, and the
  metrics that belong in the resulting report

## Start with a threat model, not an attack

The single biggest mistake in robustness testing is running an attack
before deciding what you're actually defending against. A real
evaluation starts by writing down a **threat model**, which has to
specify, at minimum:

- **Goal** — is the attacker trying to cause any misclassification
  (untargeted), or force a specific wrong label (targeted, which
  matters a lot more for something like a malware-vs-benign decision)?
- **Knowledge** — white-box (full access to the model and its
  gradients) or black-box (query access only)?
- **Capability** — what perturbation budget and norm is realistic for
  this input type, and is the attacker constrained to a problem-space
  perturbation that has to stay functional, as covered in Lesson 18?
- **Access** — can the attacker query the deployed model directly, how
  often, and is there rate limiting or monitoring in the way?

Everything that follows depends on getting this right. A robustness
number produced against the wrong threat model tells you almost
nothing about the risk you actually face.

## Don't evaluate with one weak attack

Lesson 19 ended on the obfuscated-gradients problem for a reason: if
you test a candidate defense with a single, simple attack — FGSM, say
— and it holds up, that result is not trustworthy on its own. The
defense might be genuinely robust, or it might just be breaking that
one attack's assumptions without closing the real vulnerability, the
exact failure mode Athalye, Carlini, and Wagner documented across
multiple published defenses in 2018.

A credible evaluation uses a stronger baseline attack — Projected
Gradient Descent (PGD) is the standard choice precisely because it's
iterative and harder to fool by accident — and, critically, uses an
**adaptive attack**: one built with full knowledge of whatever defense
mechanism is in place, specifically to try to defeat it. If a defense
only survives attacks that don't know it exists, that's not evidence
of robustness. It's evidence the evaluation wasn't finished.

## The tooling teams actually use

This isn't something security and ML teams reinvent from scratch for
every model. Structured robustness evaluation is supported by
established, published open-source libraries built for exactly this —
IBM's **Adversarial Robustness Toolbox (ART)**, **CleverHans**, and
**Foolbox** are the names that come up repeatedly in both industry
practice and the academic literature, each implementing standard
attacks like FGSM and PGD against a model in a consistent,
reproducible way. Using an established library instead of a one-off
script also means your evaluation can be reproduced, reviewed, and
compared against how other teams tested similar models — the same
reason a SOC doesn't hand-roll its own detection-rule syntax.

## What the report needs to contain

A robustness evaluation that's going to actually inform a deployment
decision reports more than "the model passed." At minimum, it should
state:

- **Clean accuracy** — the baseline, measured with no attack at all
- **Robust accuracy at a specified ε** — accuracy under a named attack
  (e.g., PGD), at a stated perturbation budget and norm — never report
  "robust accuracy" without naming the attack and budget behind it
- **Attack success rate** — the fraction of inputs the attack
  successfully flipped, often reported as the inverse view of robust
  accuracy
- **Certified radius**, if a certified defense like randomized
  smoothing is in use, since that number means something different
  from an empirical robust-accuracy figure

## Treat this as a recurring gate, not a one-time check

A robustness evaluation isn't something you run once and file away.
It has to be re-run whenever the model, its training data, or its
preprocessing pipeline changes, because any of those changes can shift
the decision boundary the evaluation was measuring. The result belongs
in the model's risk documentation alongside its accuracy metrics, and
it feeds directly into the broader practices this course covers later
— the AI-specific threat modeling and AI red-teaming work in Chapter
7, and the NIST AI Risk Management Framework's Measure and Manage
functions from Chapter 1. A robustness number that was produced once,
under one attack, and never revisited is not a robustness guarantee —
it's a snapshot that may already be stale.

## Key terms

| Term | Meaning |
|---|---|
| Threat model | A written statement of the attacker's goal, knowledge, capability, and access, decided before any attack is run |
| PGD (Projected Gradient Descent) | An iterative, strong first-order attack used as the standard baseline for robustness evaluation |
| Adaptive attack | An attack built with full knowledge of a specific defense, required to verify a robustness claim honestly |
| ART / CleverHans / Foolbox | Established open-source libraries implementing standard adversarial attacks for reproducible robustness evaluation |
| Robust accuracy | A model's accuracy under a named attack at a stated perturbation budget — meaningless without naming both |

## Check yourself

You're ready to move to Chapter 6 when you can explain, without
looking: why does a threat model have to be written before any attack
is run, and why is a robustness number that doesn't name its attack
and perturbation budget not really a number at all?
