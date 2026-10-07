# Self-Critique & Revision

This is lesson 50 of Chapter 8. Last lesson named Constitutional AI's phase 1 as "critique and revision" without detailing the mechanics. This lesson opens that up: the actual prompt chain that turns one initial response into revised SFT data, and the design choices (how many principles, how many revision rounds) that determine how much the output actually improves.

## What you'll learn

- The three-step prompt chain: generate, critique, revise
- Why a single principle per critique step, not a bundle, is the typical approach
- How multiple critique-revision rounds compound, and when to stop
- What makes the resulting dataset different from ordinary human-written demonstrations

## The three-step chain

Each training example starts from a prompt likely to surface a problem the constitution addresses, and runs through three model calls in sequence:

```python
# Step 1 — generate an initial response
response = model.generate(prompt)

# Step 2 — critique against one constitutional principle
critique_prompt = f"""Prompt: {prompt}
Response: {response}

Identify ways this response could violate the principle: "{principle}".
"""
critique = model.generate(critique_prompt)

# Step 3 — revise based on the critique
revision_prompt = f"""Prompt: {prompt}
Response: {response}
Critique: {critique}

Rewrite the response to address the critique.
"""
revised_response = model.generate(revision_prompt)
```

The same model performs all three steps — generation, critique, and revision are just different prompts to the same underlying LLM, not three separate models.

## One principle at a time

Each critique step is given a single constitutional principle to check against, usually sampled or selected from the full list rather than handing the model the entire constitution at once. This keeps each critique focused and specific ("does this response do X") rather than vague ("is this response good"), and it lets different training examples exercise different principles, so the resulting dataset covers the constitution's full range rather than clustering around whichever principle happens to dominate a combined prompt.

## Multiple rounds, and when they stop paying off

The critique-revise step can repeat: critique the revision again (possibly against a different principle), revise again, and so on. Each round tends to fix narrower, more specific issues than the last — a first pass might catch an outright harmful suggestion, while a later pass refines tone or over-cautious hedging. In practice, returns diminish after a small number of rounds, and later rounds risk a revision that "fixes" a critique by becoming evasive or unhelpful rather than genuinely better, which is why the revised outputs still need to feed forward into phase 2's AI preference judging rather than being accepted purely on the critique step's word.

## What makes this dataset different

The resulting (prompt, revised-response) pairs look superficially like ordinary SFT demonstration data (lesson 42), but they were never written by a human — they were produced entirely by the model critiquing and correcting its own earlier output against written principles. This is what lets Constitutional AI reduce reliance on human-labeled data specifically for harm-avoidance behavior, while still producing a dataset in exactly the shape SFT training already expects.

## Key terms

- **Critique prompt** — a prompt asking the model to identify ways its own response violates a specific principle
- **Revision prompt** — a prompt asking the model to rewrite its response based on the critique it just produced
- **Principle sampling** — selecting one constitutional principle per critique step rather than applying the whole constitution at once
- **Diminishing returns (revision rounds)** — later critique-revise rounds fix narrower issues and risk producing evasive, over-hedged revisions

## Recap

Self-critique and revision is a three-step prompt chain — generate, critique against one principle, revise — run by the same model on itself, repeatable for a few rounds before returns diminish, producing SFT-shaped data without a human writing any of it. Next lesson steps back to ask when RLAIF (built this way or otherwise) actually outperforms human-labeled RLHF, and when it doesn't.
