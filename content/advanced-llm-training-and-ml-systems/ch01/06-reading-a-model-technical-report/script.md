# Script — Reading a Model Technical Report

## Segment 1 (title)

You now have the vocabulary to read a model's technical report critically instead of skimming the headline benchmark table. This lesson closes out chapter one by covering what to expect, what's usually missing, and the red flags that separate a trustworthy report from a marketing document.

## Segment 2 (steps)

A serious report covers architecture and hyperparameters, a description of the training data, compute and infrastructure, the post-training methodology -- the SFT and alignment process from lesson one -- evaluation results, and known safety limitations. If a report is missing one of these sections entirely, that absence is itself worth noting before you trust anything else in the document.

## Segment 3 (steps)

Most reports are deliberately vague about the exact data composition, the exact compute cost, and sometimes the architecture itself for API-only models. Treat anything not disclosed as unknown, not as implicitly favorable. And watch specifically for whether a report describes a decontamination methodology, checking that benchmark data didn't leak into training. Also watch for cherry-picked comparisons, where only the benchmarks and competitor models that favor the new release get shown, while widely-used benchmarks competitors report get quietly left out.

## Segment 4 (code)

On the Hugging Face Hub, this same information is expected in structured YAML front matter, including a model-index block designed to make benchmark claims machine readable. But that block is still only as trustworthy as the methodology section describing how the numbers were actually produced, so a clean model card is a starting point for your own reading, not a substitute for it.

## Segment 5 (outro)

Reading evaluation numbers critically means checking for contamination safeguards and watching for cherry-picked comparisons. That closes chapter one. Chapter two goes deep on the data pipeline itself, starting with training your own BPE tokenizer.
