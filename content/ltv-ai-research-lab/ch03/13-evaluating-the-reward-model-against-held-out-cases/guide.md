# Evaluating the Reward Model Against Held-Out Cases

A trained reward model needs the same kind of scrutiny Project 1's PPO agent got in Lesson 8: a held-out check, and then a harder, deliberately adversarial check that goes looking for a specific way the model might be fooled. This lesson runs both, and the second one finds something real.

## What you'll learn

- How held-out preference accuracy is measured
- This project's actual held-out accuracy number
- How the adversarial check is constructed: polish vs. preserved information
- The surface-polish-bias finding, and what it means for using this model downstream

## Held-out preference accuracy

The straightforward evaluation holds out a slice of the labeled pairs from training and checks, for each one, whether the model scores the chosen candidate higher than the rejected one:

```python
def preference_accuracy(model, held_out_pairs):
    correct = 0
    for pair in held_out_pairs:
        r_chosen = model(*tokenize(pair["chosen_text"]))
        r_rejected = model(*tokenize(pair["rejected_text"]))
        if r_chosen > r_rejected:
            correct += 1
    return correct / len(held_out_pairs)
```

Out of the roughly 260 labeled pairs, 42 were held out from training entirely. On those 42, the reward model scored the chosen candidate higher than the rejected candidate 83% of the time — a real, meaningfully-above-chance signal that the model learned something generalizable about the rater's preferences, not just the specific 218 training pairs.

## The adversarial check: polish vs. preserved information

An 83% accuracy number on ordinary held-out pairs doesn't tell you *how* the model is making its decisions — it could be picking up on exactly the right signal (information preservation), or it could be picking up on a correlated but wrong signal (surface polish), and an ordinary held-out set might not have enough examples where those two signals actually point in different directions to tell the difference.

So this lesson builds a second, adversarial held-out set specifically designed to pull those two signals apart: 40 pairs where the "rejected" candidate has superficial formatting polish — consistent capitalization, tidy whitespace, a clean-looking phone format — but has silently dropped real information the "chosen" candidate preserved, like a suite/apartment number or a phone extension.

```python
# An adversarial pair: polish vs. preserved information
{
  "chosen": {"Phone": "171-555-2282 x12", "CompanyName": "b's beverages"},
  "rejected": {"Phone": "171-555-2282", "CompanyName": "B's Beverages"},
  # rejected LOOKS cleaner — tidy casing, tidy phone — but dropped the extension
}
```

Every pair in this adversarial set is constructed so that polish and information preservation disagree on purpose: the "chosen" label always goes to whichever candidate preserved the real information, even when it's the less tidy-looking one. That's not how the original rater's rubric worked by accident — it's literally rubric criterion 1, no information loss, intentionally made to conflict with criterion 3, consistent formatting, so the check isolates exactly this failure mode.

## The result: surface-polish bias is real

On the regular held-out set, the model scores 83%. On this adversarial subset, it drops to 48% — close to a coin flip, and a sharp, specific regression relative to the regular held-out number. The model is, close to half the time, scoring the polished-but-information-losing candidate *higher* than the one that actually preserved the real data.

Name this plainly: **surface-polish bias**. The reward model has learned to associate tidy formatting with "good cleanup" more strongly than it's learned to associate information preservation with "good cleanup," even though the rubric it was trained on ranks information preservation first. That's not a dataset-labeling error — the training pairs were labeled correctly, per the rubric. It's a generalization failure: the model picked up a correlated, easier-to-detect surface signal instead of the deeper signal the rubric actually prioritizes, and an adversarial set was needed to reveal the gap because ordinary held-out pairs don't reliably separate the two signals.

## What this means downstream

Any system that used this reward model to automatically select or reward cleanup candidates would have a real blind spot: it would systematically favor tidy-looking but information-losing cleanups over messier-looking but complete ones, in exactly the cases where that distinction matters most. Reporting this plainly — rather than only reporting the 83% headline number — is what makes this evaluation a real finding instead of a cherry-picked one.

## Key terms

- **Held-out preference accuracy** — the fraction of held-out pairs where the model scores the chosen candidate higher than the rejected candidate
- **Adversarial subset** — a deliberately constructed set of pairs where two correlated signals (here, polish and information preservation) are made to disagree, to isolate which one the model actually learned
- **Surface-polish bias** — this project's named failure mode: the reward model sometimes scores a tidy-looking but information-losing candidate higher than a messier but complete one
- **Generalization failure** — when a model learns a correlated but incorrect signal from correctly labeled training data, rather than the intended underlying signal

## Recap

The reward model reaches 83% held-out preference accuracy on ordinary pairs, but drops to 48% — near chance — on a deliberately adversarial subset where a polished-looking candidate has silently dropped real information a chosen candidate preserved, revealing a genuine surface-polish bias the model picked up during training. Next up, Lesson 14: writing Project 2 up as a claim, method, result, and limitation.
