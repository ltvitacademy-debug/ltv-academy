# Building a Small Safety Eval Suite

This chapter covered the pieces separately: the capability/safety distinction, threat-model-driven design, the pitfalls that quietly corrupt results, sandbagging, and the case for external review. This closing lesson puts them together into the actual sequence of decisions behind building a working eval suite of your own, even a small one.

## What you'll learn

- How to go from a vague safety concern to a concrete, testable eval suite
- Why diverse test cases matter more than a large number of similar ones
- How automated scoring and human spot-checking combine in a practical pipeline
- Why tracking results over time, across model versions, is part of the design, not an afterthought

## Step one: pin down the behavior, then write toward failure

Start the same way a dangerous-capability eval starts: name the specific behavior of concern in concrete terms, not a vague category. "The model should not help a user circumvent content moderation on another platform" is testable; "the model should be safe" is not. Then write test cases that actively try to produce a failure — adversarial phrasing, indirect framing, multi-turn setups that build context before the actual ask — rather than polite, direct requests a model would refuse without needing a real test.

## Step two: diversity beats volume

Twenty genuinely different approaches to the same underlying risk reveal far more than two hundred near-duplicates of one approach. A small suite with real variation — different phrasing registers, different levels of indirection, different surrounding context, different user personas — catches failure modes a narrow suite built on one template will never surface. This matters especially because models can learn to pattern-match a specific phrasing style during training without the underlying behavior actually generalizing to different phrasings of the same risk.

## Step three: hold data out, and rotate it

Keep the suite, or at least a meaningful portion of it, unpublished and out of any dataset likely to end up in future training runs. Periodically swap in fresh items and retire ones that have been public long enough to risk contamination, echoing the lesson on eval pitfalls earlier in this chapter. A suite that never changes is a suite slowly losing its ability to measure anything real.

## Step four: combine automated scoring with human spot-checks

A model-as-judge setup — a second model scoring the test subject's responses against a rubric — scales to hundreds of test cases cheaply, but it inherits its own blind spots and can be gamed in ways that mirror the gaming problems the test subject itself might exhibit. Pair it with human review of a meaningful random sample, not just the cases the automated judge flagged as borderline, since a systematic blind spot in the judge would otherwise never surface. Treat disagreement between the automated judge and the human spot-check as a signal to investigate, not noise to average away.

## Step five: track results across versions, not just once

A single eval run is a snapshot. The real value comes from running the same suite against each new model version and watching the trend — did the concerning behavior get better, stay flat, or move to a more disguised form after an update aimed at something else entirely. Treat the suite as a piece of ongoing infrastructure that evolves alongside the model it's testing, not a one-time checklist that gets filed away after the first run.

## Key terms

- **Test-case diversity** — deliberately varying phrasing, indirection, and framing across a suite's items so narrow pattern-matching can't substitute for genuine behavioral change
- **Model-as-judge** — using a second model to score a test subject's outputs against a rubric, which scales well but inherits its own failure modes
- **Human spot-check** — targeted human review of a random sample of outputs, used to catch systematic blind spots an automated judge might share or miss
- **Held-out data** — eval items deliberately kept unpublished to resist ending up in a future training set
- **Longitudinal tracking** — running the same eval suite against successive model versions to observe whether a concerning behavior is actually improving over time
