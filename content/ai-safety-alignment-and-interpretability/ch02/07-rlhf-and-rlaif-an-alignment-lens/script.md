# Script — RLHF & RLAIF, an Alignment Lens

## Segment 1 (title)

Your reinforcement learning course already walked you through how RLHF and RLAIF work under the hood — reward models, policy optimization, preference comparisons. We're not redoing that here. This lesson asks a narrower question: as an alignment technique, what does RLHF actually buy you, and where does it fall short?

## Segment 2 (steps)

RLHF aligns a model to human preference labels, not to some independent, ground-truth notion of good behavior. A reward model is trained to predict which of two outputs a human rater preferred, and the policy is optimized to score well against that learned model. Whatever those labels capture becomes the target, and whatever they miss never enters the signal at all.

## Segment 3 (steps)

That creates three structural limits worth naming. Human raters often disagree with each other on hard or value-laden questions, so the preference being learned is really an average over noisy, sometimes contradictory judgments. Raters also can't reliably evaluate tasks that exceed their own expertise, which caps how far RLHF can scale toward genuinely superhuman outputs. And the whole method shapes observed behavior without guaranteeing it reflects any deeper change in the model's underlying values.

## Segment 4 (steps)

RLAIF keeps the same RL mechanics but substitutes an AI model's judgments for some or all of the human preference labels. Anthropic's Constitutional AI is the best-known example, using AI-generated comparisons grounded in a written set of principles instead of relying on a human rater for every judgment. That makes generating preference data far more scalable.

## Segment 5 (outro)

But scaling the labeling process isn't the same as solving the underlying limits — an AI judge can still be noisy, can still struggle on tasks beyond what it can evaluate, and still only shapes surface behavior. Next lesson, we go deeper on the constitution that RLAIF in Constitutional AI is actually graded against.
