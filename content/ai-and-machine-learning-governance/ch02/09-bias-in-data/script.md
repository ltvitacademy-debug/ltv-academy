# Lesson 9 — Bias in Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson three named bias as a major AI risk. This lesson goes one level deeper: where it actually enters, through the data itself.

## S2 · STEPS — Bias starts in the data

A learning algorithm doesn't invent bias out of nothing — it finds and reinforces patterns already present in what it's shown. Overwhelmingly, bias originates in the training data, before any algorithm is involved.

## S3 · STEPS — Four ways it enters

Historical bias — the data accurately reflects past decisions that were themselves unequal. Sampling bias — the training population doesn't match who the model will actually serve, a direct completeness failure. Measurement bias — a proxy variable that doesn't mean the same thing for everyone. Label bias — human judgment baked into the ground truth.

## S4 · STEPS — Accurate overall, biased for a subgroup

A model can score well on overall accuracy while performing meaningfully worse for a specific subgroup, because the overall number averages across everyone. That's exactly why bias testing has to look at subgroup performance specifically, not just the aggregate score.

## S5 · STEPS — What a governance response looks like

Does the training population resemble who the model will serve? Are known historical inequities baked into this data's outcomes? Is any variable standing in for something it shouldn't? None of this requires advanced statistics — it requires someone assigned to ask, and document the answer, before training is approved.

## S6 · OUTRO

Next lesson: data labeling and governance — how the humans assigning ground-truth labels become part of this picture.
