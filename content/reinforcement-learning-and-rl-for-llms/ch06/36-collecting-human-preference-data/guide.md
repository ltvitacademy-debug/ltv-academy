# Collecting Human Preference Data

This is lesson 36 of the Reinforcement Learning & RL for LLMs course, continuing Chapter 6, Reward Modeling. Last lesson established that reward models are trained on human preference comparisons rather than hand-written scores. This lesson walks through the actual pipeline used to collect that data — the same basic process used in the InstructGPT paper and in Anthropic's helpful-and-harmless work — and the data structure it produces.

## What you'll learn

- The end-to-end pipeline: prompt → two completions → human picks the better one → pair stored
- Where the two completions being compared actually come from
- What a stored preference pair looks like as training data
- The practical challenges: annotator disagreement, instructions, and consistency

## The collection pipeline

The process has four steps, repeated at scale (InstructGPT used on the order of tens of thousands of comparisons; production systems use far more):

1. **A prompt is sampled** — from a pool of real user queries, held-out instructions, or task-specific prompts chosen to cover the behaviors being trained for.
2. **Two (or more) completions are generated** for that same prompt — usually sampled from the current or a recent version of the policy model itself, sometimes at different temperatures or checkpoints, so the comparisons are informative about choices the model actually tends to make.
3. **A human annotator sees both completions**, with the prompt, and is asked a single question: which response is better? Annotators typically follow a written rubric (helpfulness, accuracy, harmlessness, instruction-following) rather than their own unguided taste.
4. **The choice is recorded as a pair**: a "chosen" response and a "rejected" response for that prompt, stored for later training.

```python
# One stored preference example
example = {
    "prompt": "Explain what a reward model is in one paragraph.",
    "chosen": "A reward model is a neural network trained to predict ...",
    "rejected": "idk, it's just a model lol, probably something about rewards",
}
```

Thousands of examples like this, assembled into a preference dataset, are exactly the `pref_dataset` you'll see passed into TRL's `RewardTrainer` in lesson 38.

## Where the completions come from matters

A subtle but important point: comparing two completions sampled *from the model you're about to train* (or a close predecessor) produces preference data that's informative about that model's actual failure modes and tendencies. Comparing two completions from unrelated sources would teach the reward model less about the specific choices it will actually need to discriminate between later during RL. This is why preference data collection is typically an iterative loop alongside training, not a one-time dataset built in isolation.

## Annotator guidance and disagreement

Human annotators don't automatically agree with each other, even with a shared rubric — two reasonable people can prefer different responses to a nuanced prompt. Preference-collection pipelines address this with written annotator guidelines, calibration examples, and, in many pipelines, collecting multiple annotations per comparison and tracking agreement rates. Low agreement on a particular prompt category is itself useful information: it usually means the rubric needs to be clarified, or that category of prompt is being asked to resolve something genuinely ambiguous (and training a model to pick a single "right" answer may not be appropriate there).

## Key terms

- **Preference pair** — a (prompt, chosen response, rejected response) training example
- **Annotator rubric** — the written guidance annotators follow to make comparisons consistent across people and sessions
- **On-policy sampling** — generating the compared completions from the model currently being trained, so comparisons stay informative about its actual behavior
- **Preference dataset** — the collection of preference pairs used to train a reward model

## Recap

Preference data collection follows prompt → two completions → human picks the better one → pair stored, usually sampling completions from the model being trained so the comparisons stay relevant to its real tendencies. Next lesson: the Bradley-Terry model, which turns a dataset of these pairwise comparisons into a trainable loss function.
