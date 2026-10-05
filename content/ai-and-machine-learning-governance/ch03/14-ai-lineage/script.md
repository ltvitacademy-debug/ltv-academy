# Lesson 14 — AI Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

If a model made a bad decision last Tuesday, could you trace it back to the exact data and code that produced it? That's what AI lineage answers.

## S2 · STEPS — Lineage, but longer

Data lineage traces a piece of data from source through every transformation. AI lineage extends that one layer further, because a model isn't just a consumer of data — it's a new artifact that produces its own downstream decisions. The chain runs: raw data, to features, to a training run, to a model version, to the decisions it made.

## S3 · STEPS — Why the chain matters

Miss a link in that chain and you can't answer the questions that actually come up: which models were trained on this now-bad table? Which decisions were affected by last week's buggy model version? What data led to this specific denial? Lineage is what makes those answerable without reconstructing everything from memory.

## S4 · SCREENSHOT — A real lineage view

Here's what that looks like in practice: a model version's own Lineage tab, showing the exact upstream table it was trained on, with a timestamp — one click to answer "what data trained this model," instead of a search through old notebooks.

## S5 · STEPS — The pattern that matters

The structural point is bigger than any one tool: this is the same lineage mechanism a governed catalog already uses for tables, just pointed at a model as another governed asset. AI lineage isn't a separate discipline — it's data lineage extended one hop further, through the model and out to its decisions.

## S6 · OUTRO

Next lesson: once a model exists and is traceable, how do you control what changes about it over time? That's model versioning and change control.
