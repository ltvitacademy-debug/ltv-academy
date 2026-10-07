# Script — Constitutional AI, Revisited

## Segment 1 (title)

Last lesson introduced Constitutional AI as our example of RLAIF. This time we go deeper: what the constitution actually is, how the two training stages work, and what the method genuinely buys versus what it leaves unresolved.

## Segment 2 (steps)

A constitution here is a written set of principles — things like avoiding harmful advice or preferring honesty over flattery — stated explicitly in natural language instead of living only as an implicit pattern inside a reward model. That makes the standard legible: anyone can actually read what the model is being trained to follow.

## Segment 3 (steps)

Training happens in two stages. First, a supervised stage: the model produces a response, critiques it against the constitution, and revises it, sometimes more than once — and those self-corrections become fine-tuning data. Second, a reinforcement learning stage: an AI model, prompted with the same constitution, judges pairs of responses, and those judgments train a reward model the policy is optimized against. Mechanically that's the same RL loop as RLHF — only the source of the preference labels has changed.

## Segment 4 (steps)

This buys two real things. Scalability, because generating preference judgments no longer needs a constant supply of human labelers. And transparency, because the standard being optimized toward is a document you can read, not a pattern buried inside a reward model trained on scattered comparisons.

## Segment 5 (outro)

But it doesn't buy everything. Someone still decided what principles to include and how to weigh them against each other when they conflict — that value judgment doesn't disappear, it just becomes visible. And the reward model in the RL stage is still an imperfect proxy, so Constitutional AI doesn't eliminate reward hacking either. Next lesson: red-teaming, testing what training alone didn't catch.
