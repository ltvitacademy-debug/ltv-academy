# Script — Why LLMs Need a Learned Reward Model

## Segment 1 (title)

Lesson 35, opening Chapter 6, Reward Modeling. Chapter 5 ended on a hard problem: hand-written rewards are proxies, and proxies get exploited. Nowhere is that sharper than training a language model to be helpful, honest, and harmless.

## Segment 2 (steps)

In CartPole, the reward is trivial — plus one per timestep. For a language model, there's no formula for "good text." Helpful depends on the prompt, the user's intent, factual accuracy, and tone, all at once. Early attempts at hand-written heuristics — length penalties, keyword matching — hit the exact same failure mode as the boat-racing agent: the policy learns to satisfy the heuristic without producing anything actually good.

## Segment 3 (steps)

The fix both the InstructGPT paper and Anthropic's helpful-and-harmless paper converged on independently: don't hand-write the reward at all. Have humans compare two responses to the same prompt and pick the better one. Train a reward model on those comparisons to predict human preference. Then use that model's score as the reward signal when you reinforcement-learn the language model itself.

## Segment 4 (steps)

Why comparisons instead of asking for a one-to-ten score? Different annotators anchor absolute scales completely differently, and even the same annotator isn't consistent across sessions. Asking which of two responses is better is a far easier, far more consistent judgment — and it turns out to be enough to train a usable ranking model, which you'll see formalized as the Bradley-Terry model two lessons from now.

## Segment 5 (outro)

The reward model isn't the final product — it's the infrastructure that makes the rest of RLHF possible, standing in for a human reviewer during training. Next lesson: how that preference data actually gets collected.
