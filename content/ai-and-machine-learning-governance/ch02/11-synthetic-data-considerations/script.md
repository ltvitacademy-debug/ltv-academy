# Lesson 11 — Synthetic Data Considerations · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This chapter closes with synthetic data — artificially generated data standing in for the real thing. It raises its own, specific governance questions.

## S2 · STEPS — What synthetic data is

Synthetic data is artificially generated, often by another model, to stand in for real data. Organizations use it to fill gaps where rare cases are scarce, to augment a small dataset, or specifically because it contains no single real person's actual information.

## S3 · STEPS — It doesn't solve the earlier problems

It still encodes the patterns of whatever real data it was modeled on — bias in the source can reproduce in the synthetic output. It doesn't automatically protect privacy — a synthetic record can still leak identifiable details of real people it was modeled on. And the quality dimensions from Lesson 8 still apply in full.

## S4 · STEPS — What's genuinely new

The one new governance question is documentation honesty. A model trained partly on synthetic data needs that fact recorded clearly, not blended invisibly into "the training data." Anyone evaluating the model later needs to know which experience was real-world observation and which was generated.

## S5 · STEPS — The honest framing

Synthetic data is a legitimate tool, not a shortcut around governance. It still needs provenance, a bias check against its source, and the same quality bar as real data — plus one disclosure real data doesn't require: a clear statement that it's synthetic.

## S6 · OUTRO

That closes Chapter Two. Chapter Three moves into model governance — documentation, model cards, inventories, lineage, versioning, and approval.
