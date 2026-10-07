# Script — Pretrain, SFT, Align: the Three-Stage Pipeline

## Segment 1 (title)

Every production LLM you've used, open-weights or closed API, is built through the same three-stage pipeline: pretraining, supervised fine-tuning, and alignment. This lesson is the map of that pipeline before we spend whole chapters inside each stage.

## Segment 2 (steps)

Pretraining is self-supervised next-token prediction over a massive unlabeled corpus, often trillions of tokens, and it produces what's called a base model. SFT then continues training on a much smaller, curated set of prompt and response pairs, teaching the model to follow instructions. Alignment tunes the SFT model further against human or AI preference judgments, using methods like RLHF or DPO, to make it more helpful and safer. Each stage hands off to the next using a genuinely different kind of data and loss function, which is exactly why staging the pipeline works better than trying to optimize all three goals in a single pass.

## Segment 3 (code)

The objective changes at every handoff. Pretraining predicts every next token with no masking. SFT uses the same cross-entropy loss but only scores the response tokens, not the prompt. And a preference method like DPO throws out token-level correctness entirely, optimizing instead for the model to prefer a chosen response over a rejected one.

## Segment 4 (steps)

Pretraining dominates the compute budget, often ninety-five percent or more, and produces the base model. SFT uses orders of magnitude less data to reshape how that knowledge is expressed. Alignment is typically the cheapest stage of the three but has the largest effect on how a model actually feels to use. That asymmetry matters in practice: teams can run many cheap, fast iterations on SFT and alignment, while a pretraining run is usually attempted only once, after a huge number of smaller decisions have already been locked in.

## Segment 5 (outro)

Staging lets each phase use the kind of data that's actually available for that purpose, without redoing the expensive pretraining run every time. Next up, lesson two: compute budgets, and why they matter.
