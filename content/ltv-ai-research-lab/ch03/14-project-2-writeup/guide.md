# Project 2 Write-Up

Four lessons of work — a framing, a dataset, a trained model, and an evaluation that includes a real adversarial finding — need to become something a stranger can read in five minutes and trust. This lesson writes that up, using the same four-part structure every project in this lab uses: claim, method, result, limitation.

## What you'll learn

- How to write each part of the four-part structure for Project 2 specifically
- Why the surface-polish-bias finding belongs in the limitation section, not a footnote
- How Project 2's write-up compares to Project 1's and Project 3's
- How this write-up feeds into Chapter 6's portfolio assembly

## Claim

> A DistilBERT-based reward model, trained on roughly 260 human pairwise preferences over cleaned-vs-messy Northwind customer records, reached 83% held-out preference accuracy — but a deliberately adversarial check found the model favors surface formatting polish over genuine information preservation close to half the time, a bias not visible in the regular held-out number alone.

Notice what the claim does *not* say: it doesn't say "the reward model reliably identifies good data cleanup" (the adversarial result contradicts that), and it doesn't say "this model is unusable" (83% on ordinary pairs is a real, generalizable signal — the claim states both numbers because both are true).

## Method

Summarize the pipeline in the order it was actually built, each step traceable to a lesson:

- **Framing** (Lesson 10): data quality judged as pairwise preference rather than absolute score, over Northwind `Customers` messiness — phone formatting, country-name variants, company-name noise, malformed postal codes.
- **Dataset** (Lesson 11): ~300 real rows synthetically corrupted, two rule-based cleaners (light-touch Cleaner A, aggressive Cleaner B) generating candidates, a human rater choosing between them per a no-information-loss-first rubric, ties discarded, producing ~260 `{chosen, rejected}` pairs.
- **Reward model** (Lesson 12): each (original, candidate) pair serialized to one text string, encoded with `distilbert-base-uncased`, scored by a scalar linear head, trained with the pairwise Bradley-Terry loss (`-log(sigmoid(r_chosen - r_rejected))`) via AdamW.
- **Evaluation** (Lesson 13): 83% preference accuracy on 42 regular held-out pairs; 48% on a 40-pair adversarial subset built so polish and information preservation deliberately disagree.

```python
# A write-up's method section should let someone
# reconstruct this call chain without guessing:
pairs = build_preference_dataset(corrupted_rows, clean_a, clean_b, rater)  # L11
reward_model = train_reward_model(pairs, base="distilbert-base-uncased")   # L12
accuracy = preference_accuracy(reward_model, held_out_pairs)               # L13
adversarial_accuracy = preference_accuracy(reward_model, adversarial_pairs) # L13
```

## Result

Report both numbers from Lesson 13, not just the flattering one: 83% held-out preference accuracy on ordinary pairs, and 48% — close to chance — on the adversarial subset specifically built to separate surface polish from genuine information preservation. A result section with only the 83% number isn't a result section, it's marketing.

## Limitation

- **Surface-polish bias.** The model sometimes scores a tidy-looking but information-losing candidate higher than a messier but complete one. This isn't a labeling error in the training data — the pairs were labeled correctly per the rubric — it's a genuine generalization failure: the model partly learned to associate tidiness with quality, rather than the information-preservation signal the rubric actually ranks first.
- **A small, single-rater dataset.** ~260 pairs from one human rater's judgments is enough to learn a real signal, but it's also narrow — a different rater, or a larger and more diverse rater pool, might surface different edge cases or disagree on close calls, and this result doesn't speak to how the model would perform against a broader human-preference distribution.
- **The two cleaners set the ceiling.** The model can only learn to prefer between the kinds of cleanups Cleaner A and Cleaner B actually produce; it says nothing about how it would score a cleanup strategy structurally different from either of them.

## Comparing the three projects' reward signals

Project 1's reward is computed directly from execution cost (no learning involved in the reward itself). Project 2's reward is a genuinely separate learned model trained on human preferences — the only one of the three with a human rater in the loop. Project 3's reward is programmatic execution-correctness, with no learned component and no human rater either. Naming this plainly in the write-up is useful context for anyone comparing the three projects' portfolios side by side in Chapter 6.

## Feeding into Chapter 6

This write-up — claim, method, result, limitation — is the unit Chapter 6's portfolio-assembly lesson slots in alongside Project 1's and Project 3's write-ups. Keep the surface-polish-bias finding in the limitation section exactly as measured; a three-project portfolio where every limitation section reads "none found" reads as unreviewed, not successful.

## Key terms

- **Claim** — the one-sentence summary of what was built and what result followed
- **Method** — the reproducible description of dataset, model, and training procedure
- **Result** — the actual measured numbers, reported even when one of them is unflattering
- **Surface-polish bias** — this project's named limitation: the reward model sometimes favors tidy formatting over genuine information preservation

## Recap

Project 2's write-up states the claim precisely (83% held-out accuracy, but a real surface-polish bias revealed by an adversarial check), traces the method lesson by lesson, reports both accuracy numbers from Lesson 13, and names the limitations plainly — including the single-rater dataset and the ceiling set by the two cleaners. This closes Project 2; Chapter 4 picks up Project 3, RLHF for SQL Pete, which already exists on disk.
