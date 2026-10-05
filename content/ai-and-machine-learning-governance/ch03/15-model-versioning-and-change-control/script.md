# Lesson 15 — Model Versioning and Change Control · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

"The fraud model" isn't one stable thing — it's retrained, tweaked, and adjusted constantly. This lesson is about tracking exactly what changed, and when.

## S2 · STEPS — A moving target

Say "the fraud model" and you've named something that doesn't stay still. It gets retrained monthly, someone tweaks a threshold, someone adds a feature. Without disciplined versioning, that drift is invisible — nobody can answer which version flagged a given transaction, or whether behavior changed because of last Tuesday's retrain.

## S3 · STEPS — Not every change is equal

Borrowing from software's semantic versioning convention: a breaking change alters the input schema or training data materially, and downstream consumers may need to adjust. A meaningful non-breaking change shifts behavior without breaking anything. A patch is a low-risk bug fix that still needs a record.

## S4 · CODE — A versioning and changelog scheme

Here's that convention applied to a real-shaped model: major-dot-minor-dot-patch, with a changelog recording exactly what happened at each version and when — the same discipline a software release already has.

## S5 · STEPS — What a change record needs

Every version, however small, needs four things on record: what changed, why it changed, who approved it, and what evaluation results justified releasing it. That last point ties directly into the next lesson: approval workflows.

## S6 · OUTRO

Next lesson: who actually signs off before a new model version goes live? That's model approval workflows.
