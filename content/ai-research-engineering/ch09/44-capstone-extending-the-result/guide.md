# Capstone: Extending the Result

A reproduction on its own answers "can I trust this number." An extension answers something the original paper didn't. This lesson is about designing that extension well: small enough to finish in the time you have left, scoped enough that it isolates one real question, and honest enough that a null result is still a usable result. It leans directly on Chapter 4's ablation-design and hyperparameter-sweep skills, now applied to your own reproduced baseline instead of a toy example.

## What you'll learn

- Why an extension should only start after the reproduction itself is solid
- The three shapes of extension that fit a capstone timeline: ablation, new setting, component swap
- How to scope a sweep so it answers your question without burning your remaining compute budget
- Why a negative or flat result from a well-designed extension is still a successful capstone outcome

## Don't extend until the baseline is solid

Everything in this lesson assumes the reproduction from Lesson 43 is done and you trust the number it produced. If you start changing things before the baseline is solid, you lose the one thing a reproduction gives you: a trustworthy reference point to measure the extension against. If your reproduction is still shaky, go back — an extension built on an unreliable baseline answers nothing.

## Three extension shapes that fit a capstone timeline

Pick one. All three are deliberately narrow, because a capstone has weeks, not the months a full research agenda would take.

1. **An ablation on one component.** Remove or disable a single piece of the method — a specific regularizer, a particular architectural choice, a specific piece of the training recipe — and measure how much of the headline result survives without it. This directly reuses the ablation-design skill from Chapter 4: one factor changed at a time, baseline held fixed everywhere else.
2. **The same method on a new dataset or setting.** Keep the method and hyperparameters as close to fixed as the new setting allows, and see whether the result holds. This is the most interpretable extension, because any gap is attributable to the setting change, not to a method you also modified.
3. **A small, well-motivated tweak to one component.** Swap one piece — a different optimizer, a different normalization choice, a different data augmentation — for a specific reason you can state in one sentence, and measure the effect in isolation.

Avoid combining more than one of these at once. A capstone that ablates a component *and* changes the dataset *and* swaps the optimizer in the same run can't tell you which change caused what.

## Scoping the sweep to your remaining budget

Reuse the config system from Lesson 12 and the sweep-design thinking from Chapter 4 to keep the extension small on purpose:

```yaml
# configs/experiment/extension_ablation.yaml
defaults:
  - experiment: reproduction   # inherit the reproduced baseline's exact settings
  - _self_

ablation:
  disable_component: "cutout_augmentation"   # the one thing being removed
```

```bash
# A deliberately small sweep: one factor, a handful of seeds, nothing else
python train.py -m +experiment=extension_ablation seed=0,1,2
```

Three seeds is often enough to tell a real effect from noise on a small benchmark; it is not enough to publish a confident claim, and your write-up in Lesson 45 should say so plainly.

## A flat or negative result is still a good capstone outcome

If the ablation shows the component barely matters, or the method doesn't transfer to the new setting, that is a real, useful finding — not a failed capstone. Chapter 7's lesson on presenting negative results exists precisely because a well-designed experiment that disproves something is more valuable than a vague one that confirms what everyone already assumed. Design the extension so that either outcome — effect or no effect — teaches you something concrete.

## Key terms

- **Extension** — a small, well-scoped experiment built on top of a reproduced baseline, answering a question the original paper didn't
- **Single-factor ablation** — changing exactly one component while holding everything else fixed, so the effect is attributable
- **Sweep scope** — deliberately limiting a sweep's size to what remaining compute and time actually allow
- **Negative result** — an extension outcome showing no effect or no transfer, which is still informative when the experiment was well designed
