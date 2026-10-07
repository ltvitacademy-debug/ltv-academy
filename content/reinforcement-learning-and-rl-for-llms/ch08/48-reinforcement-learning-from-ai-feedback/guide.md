# Reinforcement Learning From AI Feedback

This is lesson 48, the opening lesson of Chapter 8, RLAIF & Constitutional AI. Chapter 7 built the full RLHF pipeline on human preference labels — collected by annotators (lesson 36), used to train a reward model (lesson 38), and optimized against with PPO or DPO. This lesson introduces RLAIF: the same pipeline, with an AI model generating the preference labels instead of human annotators.

## What you'll learn

- What specifically changes, and what stays identical, when AI feedback replaces human feedback
- How an AI judge model produces a preference label for a pair of responses
- Why RLAIF exists at all — the scale and cost problems it's solving
- The evidence for RLAIF reaching comparable quality to RLHF on certain tasks

## What changes, and what doesn't

RLAIF changes exactly one thing in the RLHF pipeline from Chapter 7: where the preference label in each (prompt, response A, response B) comparison comes from. Everything downstream is unchanged — the labels still train a reward model via the Bradley-Terry objective (lesson 37), that reward model is still evaluated before use (lesson 40), and PPO or DPO still optimizes against it exactly as covered in Chapter 7. The only new component is the AI judge that produces the label in the first place, standing in for the human annotator from lesson 36.

## How an AI judge labels a comparison

A capable LLM (often, though not necessarily, a stronger model than the one being trained) is prompted with the original prompt, both candidate responses, and a rubric describing what to prefer — then asked to pick a winner, sometimes with reasoning first.

```python
judge_prompt = """You are comparing two responses to the same prompt.
Prefer the response that is more helpful, accurate, and harmless.

Prompt: {prompt}
Response A: {response_a}
Response B: {response_b}

Which response is better? Answer with just "A" or "B"."""

label = judge_model.generate(judge_prompt.format(
    prompt=prompt, response_a=response_a, response_b=response_b
))
preference_pair = {"prompt": prompt, "chosen": response_a if label.strip() == "A" else response_b,
                    "rejected": response_b if label.strip() == "A" else response_a}
```

This produces exactly the same `(prompt, chosen, rejected)` shape that trained the reward model in Chapter 6 and fed DPO in lesson 45 — the rest of the pipeline cannot tell the difference between this and a human-labeled pair.

## Why RLAIF exists

Human preference labeling is expensive and slow at the scale frontier models need — millions of comparisons, each requiring a trained annotator's attention, with meaningful per-label cost and turnaround time. It's also inconsistent across annotators and hard to scale up quickly when a new capability or risk area needs labeled data. An AI judge can label comparisons continuously, cheaply, and with more consistent criteria application (the same rubric, applied the same way, every time) — at the cost of inheriting whatever blind spots that judge model itself has.

## The evidence

Anthropic's original RLAIF work (part of the Constitutional AI paper, lesson 49) showed AI-generated preference labels, grounded in a written set of principles, could train a usable reward model for harmlessness without human labels for that specific comparison task. Google's later RLAIF paper reported that AI-labeled preferences reached roughly comparable human-rater-judged quality to human-labeled RLHF on a summarization task, specifically. Neither result claims RLAIF is strictly better than RLHF in general — lesson 51 covers where the comparison favors one or the other.

## Key terms

- **AI judge (judge model)** — the LLM that generates a preference label between two candidate responses, replacing the human annotator
- **Preference label** — the chosen/rejected designation for a comparison, now AI-generated instead of human-generated
- **Rubric** — the criteria given to the judge model for what to prefer, standing in for an annotator's guidelines
- **RLAIF (Reinforcement Learning from AI Feedback)** — the RLHF pipeline with AI-generated rather than human-generated preference labels

## Recap

RLAIF swaps out exactly one component of Chapter 7's pipeline — the source of the preference label — while every downstream step (reward model training, evaluation, PPO or DPO) stays identical, and it exists primarily to solve the cost and scale limits of human labeling. Next lesson covers Constitutional AI, Anthropic's specific approach to generating that AI feedback from a written set of principles rather than an unconstrained judge prompt.
