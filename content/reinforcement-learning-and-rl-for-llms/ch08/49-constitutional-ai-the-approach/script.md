# Script — Constitutional AI: the Approach

## Segment 1 (title)

Lesson 49. Last lesson introduced RLAIF generically. This lesson covers Anthropic's specific method for generating that feedback: Constitutional AI, with the judge's criteria written down explicitly as a set of principles.

## Segment 2 (steps)

Phase one is supervised. The model generates an initial response, critiques that response against a principle drawn from the constitution, then revises it based on its own critique. Those revised responses become a new fine-tuning dataset, producing what the paper calls SL-CAI.

## Segment 3 (steps)

Phase two is RL, built on phase one's output. An AI judge compares response pairs from the SL-CAI model, judging specifically against the constitution's principles rather than an unconstrained preference. Those labels train a reward model, and PPO fine-tunes the SL-CAI model against it — the same reward-model-then-PPO structure from Chapter 7, producing the final RL-CAI model.

## Segment 4 (code)

The constitution itself is the one genuinely new artifact here — a written, curated set of principles, drawing in part on sources like the UN Declaration of Human Rights, adapted into instructions the model applies. Writing it down explicitly makes the criteria inspectable and editable, instead of implicit in a one-off judge prompt that can shift meaning with different phrasing.

## Segment 5 (outro)

A written constitution drives both the supervised critique-and-revision phase and the RL phase's preference judging. Next lesson goes deep into exactly how a model critiques and revises its own output.
