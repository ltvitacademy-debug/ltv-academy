# Script — Collecting Human Preference Data

## Segment 1 (title)

Lesson 36, Chapter 6. Last lesson established that reward models train on human preference comparisons rather than hand-written scores. This lesson walks through how that data actually gets collected.

## Segment 2 (steps)

The pipeline has four steps. A prompt gets sampled, from real user queries or task-specific instructions. Two completions get generated for that same prompt, usually from the model currently being trained. A human annotator sees both, alongside a written rubric covering helpfulness, accuracy, and harmlessness, and picks the better one. That choice gets stored as a pair — a chosen response and a rejected response.

## Segment 3 (code)

Here's what one stored example looks like: a prompt, a chosen response, and a rejected response. Thousands of these assembled together become the preference dataset you'll see passed straight into TRL's RewardTrainer two lessons from now.

## Segment 4 (steps)

Two things make this work well in practice. Comparing completions sampled from the model you're actually about to train keeps the data informative about its real failure modes, which is why collection tends to be an iterative loop rather than a one-time dataset. And annotators don't automatically agree with each other — rubrics and calibration examples help, and when agreement is low on a prompt category, that's useful information in itself, often meaning the rubric needs clarifying or the prompt is genuinely ambiguous.

## Segment 5 (outro)

Prompt, two completions, a human pick, a stored pair — that's the whole pipeline. Next lesson: the Bradley-Terry model, which turns a dataset of these comparisons into an actual trainable loss function.
