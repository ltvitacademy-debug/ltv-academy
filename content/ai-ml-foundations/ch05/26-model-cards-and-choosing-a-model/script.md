# Script — Model Cards & Choosing a Model

## Segment 1 (title)

Every model page this chapter has shown is rendered from one file — a README, with a block of structured metadata on top. That metadata is what makes the Hub searchable instead of just readable. This lesson looks at what's actually in it, and closes out the checklist for choosing a model on purpose.

## Segment 2 (screenshot)

This is that metadata, edited through the Hub's own UI: license, language tags, datasets, and pipeline_tag. pipeline_tag matters most — it's the exact string the transformers library reads to know what kind of model it's loading, and it's what makes a model show up when you filter the Hub by task.

## Segment 3 (screenshot)

A model card can also declare model-index: structured benchmark results, which the Hub renders as this evaluation widget right on the page. Notice the "self-reported" tag next to every score — these numbers come from whoever published the model, not an independent referee. Useful, but not unconditional proof.

## Segment 4 (screenshot)

Many serious models link straight to the paper describing how they were trained. Clicking through confirms the model is what it claims — a real, documented method. And "list models citing this paper" is a fast way to find every other model built on the same approach.

## Segment 5 (code)

Pull every signal from this chapter together and that's the real checklist: does it do the task, can you legally use it, is it actually downloaded and trusted, how does it score on named benchmarks, is the method traceable to a paper, and what base model is it built on.

## Segment 6 (outro)

No single row on that list is enough by itself — read a model card the way you'd read any technical documentation before depending on it. Chapter 5 closes here. Chapter 6 is the capstone: one real, small project that puts this entire course together, starting next lesson.
