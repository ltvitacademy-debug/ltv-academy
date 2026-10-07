# Constitutional AI, Revisited

Last lesson introduced RLAIF with Anthropic's Constitutional AI as the headline example — a method that substitutes AI-generated feedback for human preference labels. This lesson goes deeper on that specific method: what the "constitution" actually is, how the two-stage training process works, and what it genuinely buys versus what it doesn't resolve.

## What you'll learn

- What a "constitution" is in this context, and why writing it down matters
- The two-stage process: a supervised stage where the model critiques and revises its own outputs, followed by a reinforcement learning stage using AI-generated preference judgments
- What Constitutional AI buys as a technique: scalable feedback and transparent, inspectable principles
- Two open critiques: the constitution's authors still make value judgments, and the method doesn't eliminate reward hacking

## What a constitution is

A constitution, in this sense, is a written set of principles the model is trained to follow — things like avoiding harmful advice, respecting a user's autonomy, or preferring a response that is helpful without being deceptive. Instead of harmlessness and helpfulness living only as implicit patterns inside a reward model trained on scattered human comparisons, the standard is stated explicitly, in natural language, as a document anyone can read. That's the core idea Constitutional AI is built around: make the standard legible, then train the model against it.

## Stage one: supervised learning via self-critique and revision

The first stage is supervised, not reinforcement learning. The model is prompted to produce an initial response, then shown one or more principles from the constitution and asked to critique its own response against them, and finally asked to revise the response based on that critique. This critique-then-revise loop can run more than once. The resulting set of revised responses — produced by the model itself, checked against explicit written principles — becomes supervised fine-tuning data. At the end of this stage, the model has been directly trained on its own constitution-guided self-corrections.

## Stage two: reinforcement learning from AI feedback

The second stage is where RLAIF proper comes in. The model (or a close variant of it) generates pairs of candidate responses, and an AI model — again prompted with the constitution — judges which response better satisfies the stated principles. Those AI-generated preference judgments train a reward model, and the policy is optimized against that reward model with reinforcement learning, structurally identical to the RL stage of ordinary RLHF. The difference is entirely in where the preference labels come from: a human rater's judgment call, swapped for an AI model's judgment call against a written standard.

## What this buys: scalability and transparency

Two real advantages come out of this design. **Scalability** — once the constitution is written, generating preference judgments no longer requires a continuous supply of human labelers, which is the single biggest bottleneck in ordinary RLHF. **Transparency of principles** — because the standard being optimized toward is a written document rather than an implicit pattern buried in a reward model trained on scattered comparisons, outside observers can actually read what the model is supposed to be doing, and can check whether a given behavior traces back to a specific stated principle. That's a meaningfully different kind of inspectability than "the reward model learned something from thousands of comparisons we can't fully summarize."

## Open critiques

Two critiques are worth holding onto, genuinely and without softening them. First, writing the constitution is itself an act of judgment — someone decided which principles to include, how to phrase them, and how to weigh them against each other when they conflict. Constitutional AI makes that judgment visible and discussable, but it does not remove it; the authors of the constitution are still making value choices on behalf of everyone the model will serve. Second, Constitutional AI does not eliminate reward hacking. The reward model in the RL stage is still a learned, imperfect proxy — now standing in for "how well a response satisfies the constitution" instead of "how well a response satisfies a human rater" — and a policy optimized against an imperfect proxy can still find and exploit whatever gaps exist between the proxy and the real standard it's meant to represent.

## Key terms

- **Constitution** — a written, explicit set of principles a model is trained to follow, rather than an implicit standard inferred only from preference comparisons
- **Supervised stage (critique and revision)** — the first training stage, where the model critiques and revises its own outputs against the constitution to produce supervised fine-tuning data
- **RL stage (RLAIF)** — the second training stage, where an AI model judges response pairs against the constitution to train a reward model, and the policy is optimized against it
- **Transparency of principles** — the advantage of training against a written, readable standard rather than only an implicit pattern inside a reward model
