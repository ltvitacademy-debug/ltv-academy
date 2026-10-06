# Lesson 7 — Building Eval Datasets · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Two shifts from defending against failures to measuring them. It starts here — with how to build an eval dataset that actually tests what matters.

## S2 · STEPS — Why vibes-based testing breaks

Every AI project starts the same way: try a prompt a few times, like what you see, ship it. That works until the model changes or someone sends an input nobody tried by hand, and something quietly regresses with no way to know. An eval dataset turns "I think this still works" into something you can actually show.

## S3 · CODE — What it looks like

At its simplest, an eval dataset is a list of structured test cases — a realistic input, paired with a way to judge whether the output was acceptable. An exact match, a rule, or a graded check. The dataset is the asset; the grading method is almost secondary.

## S4 · STEPS — Where cases come from

Real production inputs are the best source — real phrasing and ambiguity you'd never write by hand. Logged failures turn every complaint into a permanent test case. Domain experts spot tricky cases engineers miss. Deliberately adversarial cases probe edges a happy-path tester never would.

## S5 · STEPS — What makes it good

It covers the real input distribution, not just the easy demo cases. Every case has a clear pass/fail criterion a human reviewer can actually agree on. It's large enough to be representative but still gets reviewed — a curated 150 beats an unreviewed 5,000. And it's versioned, growing every time something breaks in production.

## S6 · OUTRO

Next lesson: automated eval metrics — how to actually grade those outputs at scale, for accuracy, relevance, and faithfulness.
