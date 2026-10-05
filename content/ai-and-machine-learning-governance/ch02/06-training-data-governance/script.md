# Lesson 6 — Training Data Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Chapter Two: Data for AI. This lesson sets the frame for governing the data that trains a model.

## S2 · STEPS — Why training data is special

Every dataset should already be governed in general. Training data needs more, because of what happens after: its patterns get absorbed into a model's parameters and applied to every future prediction. A bad report gets corrected when caught. A bad model keeps producing the consequences until someone retrains it.

## S3 · STEPS — What a policy has to answer

Where is this data allowed to come from? Who approved repurposing it for this use? What's the quality bar before training starts? Does it reflect the population the model will actually be used on? How was it labeled, and by whom? A real policy answers all five before training begins.

## S4 · STEPS — "Baked in" changes the math

Once training finishes, specific data points aren't sitting in a queryable table — they're compressed into the model's parameters. That means removing one bad data point's influence often means retraining from scratch, not deleting a row, and proving exactly what a model did or didn't learn from a source is genuinely hard.

## S5 · STEPS — Where this chapter goes

Lesson seven covers provenance and consent. Lesson eight covers data quality for machine learning specifically. Lesson nine covers how bias enters through the data itself. Lesson ten covers labeling. Lesson eleven covers synthetic data.

## S6 · OUTRO

Next lesson: provenance and consent — where training data actually came from, and whether using it was allowed in the first place.
