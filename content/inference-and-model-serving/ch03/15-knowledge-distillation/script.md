# Script — Knowledge Distillation

## Segment 1 (title)

Quantization and pruning both start from a trained model and compress it in place. Knowledge distillation trains a brand-new, smaller model from scratch to imitate a larger one's behavior.

## Segment 2 (steps)

Distillation starts with a large teacher model and a smaller student. Instead of training the student only on ground-truth labels, it also trains the student to match the teacher's full probability distribution over the vocabulary — those are called soft targets, and they carry far more signal than a single correct answer, because they encode which wrong answers were almost right.

## Segment 3 (steps)

The teacher's raw output is usually extremely peaked, which hides most of that signal. A temperature parameter flattens the distribution before computing the loss, so the student can actually learn from the teacher's relative confidence between alternatives. The student trains on a combination of two losses: matching that softened teacher distribution, plus the ordinary loss against the real label.

## Segment 4 (steps)

This is a genuinely different lever than quantization or pruning — the student can have a shallower or narrower architecture entirely, not just a compressed version of the same one. It's also far more expensive: a real training run, not a calibration pass. And a distilled student is just a normal model afterward, so it can still be quantized and pruned on top.

## Segment 5 (code)

Here's the loss function itself: soften both the teacher and student logits with temperature, compute KL-divergence between them, add ordinary cross-entropy against the real label, and weight the two together with alpha.

## Segment 6 (outro)

That's three different compression levers now — quantization, pruning, distillation. Next up, lesson sixteen: a framework for deciding which one, or which combination, is actually worth it.
