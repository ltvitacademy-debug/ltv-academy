# Lesson 23 — Evaluating a Fine-Tuned Model · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Your fine-tune finished. You ran a few prompts, the replies look reasonable, so you ship
it. That's not evaluation — it's a vibe check, and it misses the two failure modes that
actually matter: the model quietly getting worse at things it used to handle fine, and
the model simply memorizing your training examples instead of learning the behavior you
wanted.

## S2 · STEPS CARD: the real process

Three real steps. Hold out a slice of your labeled data before training even starts, and
never let the model see it. Compare the base model and the fine-tuned model on those
exact same held-out prompts, side by side. And actually measure the result with real
metrics — not just your impression after reading a few outputs.

## S3 · STEPS CARD: metrics

Which metrics depend on the task. Exact-match or accuracy for classification and
extraction, anything with one objectively correct answer. Format compliance rate for how
often the output actually matches your required shape. Pairwise preference — human or
LLM-as-judge — for open-ended generation where there's no single right answer. And a
regression suite on tasks outside your fine-tuning target, which is the step people skip,
and the one that catches catastrophic forgetting.

## S4 · STEPS CARD: overfitting signs

Watch for three warning signs specifically. The model reproducing training examples
verbatim, even for loosely related inputs. A real gap between held-out performance and
training performance. And brittleness to rewording — the same request, phrased
differently, breaking output the base model would have handled fine. Any of these means
memorization, not learning.

## S5 · CODE CARD: what training metrics tell you

And here's something worth knowing about the training job's own numbers. A fine-tuning
job tracks real metrics — training and validation loss curves, total tokens consumed. A
smoothly decreasing loss curve is a good sign training ran correctly. But it tells you
nothing about whether the task was actually learned well, or whether something else
quietly broke. It's a training-health check, not a substitute for the held-out evaluation
you just saw.

## S6 · OUTRO CARD

Hold out data, compare against the base model, measure with real metrics, and watch
specifically for catastrophic forgetting. Next lesson tallies up what all of this
actually costs — training compute, data collection, inference surcharges, and the
expenses nobody budgets for ahead of time. See you there.
