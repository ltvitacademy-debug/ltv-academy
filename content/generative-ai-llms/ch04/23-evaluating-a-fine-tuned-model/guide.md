# Lesson 23 — Evaluating a Fine-Tuned Model

**Chapter 4 · Fine-Tuning & Customization · Lesson 23 of 31**

## What you'll learn

- Why "it feels better in a few manual tests" isn't evaluation
- How to build a held-out eval set that actually tells you something
- The metrics worth tracking, and when to use each
- The specific failure mode fine-tuning introduces that prompting doesn't: catastrophic
  forgetting
- What a fine-tuning job's own training metrics can and can't tell you

## "It feels better" is not evaluation

After a fine-tune finishes, it's tempting to run a handful of prompts, notice the replies
look reasonable, and ship it. That's not evaluation — it's a vibe check, and it misses the
two failure modes that actually matter: the model silently getting *worse* at things it
used to do fine, and the model simply **memorizing** your training examples rather than
learning the general behavior you wanted.

## Step 1 — a held-out evaluation set

Set aside a slice of your labeled data **before** training and never let the model train
on it. This held-out set should mirror the real distribution of inputs the model will see
in production — not just easy, clean examples. If your eval set is too similar to your
training set, you'll measure memorization, not generalization.

## Step 2 — compare, don't just inspect

Run the **same** held-out prompts through both the base model and the fine-tuned model,
side by side. "Better than nothing" is a low bar; "better than the base model, on the
task you actually fine-tuned it for" is the real question.

## Metrics worth tracking

| Metric | When to use it |
|---|---|
| Exact-match / accuracy | Classification, extraction, anything with one objectively correct answer |
| Format compliance rate | How often the output actually matches your required shape (JSON, a specific template) |
| Pairwise preference (human or LLM-as-judge) | Open-ended generation where there's no single correct answer, just better/worse |
| Regression suite on *unrelated* tasks | Catching whether fine-tuning degraded general capability outside the target task |

That last one is the step people skip, and it's the one that catches **catastrophic
forgetting** — a model that's great at your narrow task now, but has quietly gotten worse
at everything else, because training nudged its weights away from general competence.

## Warning signs of overfitting

- The model reproduces training examples **verbatim**, even for inputs that are only
  loosely similar.
- Performance on the held-out set is meaningfully worse than on the training set itself.
- A small rewording of a held-out prompt (same meaning, different phrasing) breaks the
  output, where the base model handled the rewording fine.

Any of these means the model has memorized specifics rather than learned the general
pattern — more training data, fewer epochs, or a lower-rank LoRA adapter (Lesson 22) are
the usual fixes.

## What the training job itself tells you

A fine-tuning job's own metrics are useful, but incomplete. OpenAI's fine-tuning jobs, for
example, return `result_files` with training and validation loss curves, and
`trained_tokens` showing exactly how much was consumed. A smoothly decreasing loss curve
is a good sign the training *ran* correctly — but it tells you nothing about whether the
*task* was actually learned well, or whether anything else quietly broke. Loss curves are
a training-health check, not a substitute for the held-out evaluation above.

## Key terms

| Term | Meaning |
|---|---|
| Held-out set | Labeled examples never used in training, reserved purely for evaluation |
| Catastrophic forgetting | A model losing general capability while specializing on a narrow task |
| LLM-as-judge | Using a separate (often stronger) model to score or compare outputs |
| Overfitting | Learning training-specific noise/memorization instead of the general pattern |
| Loss curve | A training-time metric showing how well the model is fitting its training data over time |

## Lab

1. Design a held-out eval set of 10 prompts for a fine-tuned support-ticket classifier,
   including at least two "rewording" variants of the same underlying request.
2. List two metrics you'd track for that classifier and explain why each matters.
3. Explain why a smoothly decreasing training loss curve alone isn't sufficient evidence
   that a fine-tune succeeded.

## Check yourself

You're ready for Lesson 24 when you can describe, from memory, the difference between a
training loss curve and a held-out evaluation, and name the specific failure mode
("catastrophic forgetting") that a regression suite is designed to catch.
