# Weighing Trade-offs: Cost, Latency, Quality & Maintainability

Lesson 7 compared two options (build vs. buy) on one axis at a time. Most real architecture decisions involve more than two options and more than one axis at once — three vector databases, each better on a different dimension, with no option winning on all of them simultaneously. This lesson covers a simple, honest technique for making that kind of multi-criteria decision explicit: a weighted scoring matrix, and — just as important — its real limits.

## What you'll learn

- Why "which option is best" is often the wrong question when no option wins on every axis
- The weighted scoring matrix: a simple technique for making multi-criteria trade-offs explicit
- A worked example comparing three options across cost, latency, quality, and maintainability
- Why the weights themselves are the real decision, and deserve as much scrutiny as the scores

## When no option wins on every axis

Suppose three vector database candidates each look strong on a different dimension: Option A is the cheapest but has middling latency and quality; Option B has excellent latency and quality but costs more; Option C is balanced across every dimension without excelling at any one. "Which is best" has no single honest answer stated that way — the real question is "best for what we actually care about, weighted the way we actually care about it."

## The weighted scoring matrix

Score each option 1-10 on each relevant criterion, assign a weight to each criterion reflecting its relative importance (weights summing to 1.0), and compute each option's weighted total:

```python
weights = {"cost": 0.35, "latency": 0.25, "quality": 0.25, "maintainability": 0.15}

options = {
    "A": {"cost": 9, "latency": 5, "quality": 6, "maintainability": 8},
    "B": {"cost": 5, "latency": 9, "quality": 8, "maintainability": 6},
    "C": {"cost": 7, "latency": 7, "quality": 7, "maintainability": 7},
}

for name, scores in options.items():
    total = sum(scores[k] * weights[k] for k in weights)
    print(f"Option {name}: weighted score = {total:.2f}")
```

```
Option A: weighted score = 7.10
Option B: weighted score = 6.90
Option C: weighted score = 7.00
```

With cost weighted most heavily (0.35) because Northbeam is cost-sensitive at its current scale, Option A edges out the other two — but notice how close all three scores are (7.10, 6.90, 7.00). This closeness is itself an important, honest result: it tells you the decision is genuinely sensitive to the weights chosen, not an obvious landslide that any reasonable weighting would reach.

## The real decision is the weights, not the scores

The scoring step (how good is each option at cost, at latency) is usually the easy, relatively objective part — it can often be measured directly. The weights (how much do we care about cost relative to latency relative to maintainability) are where the actual judgment call lives, and they deserve at least as much explicit discussion and written justification as the final answer. Two engineers can agree completely on every individual score and still land on a different recommended option, purely because they weighted cost vs. latency differently — and that disagreement is worth surfacing explicitly, in the open, rather than hiding inside a single number that looks more objective than it actually is.

## Run a sensitivity check before trusting a close result

When the top two options are close (as A and C are here, 7.10 vs. 7.00), it's worth asking: how much would the weights have to change before the ranking flips? If shifting the cost weight from 0.35 to 0.30 and quality from 0.25 to 0.30 would flip the recommendation from A to B, that's valuable information — it means the decision is genuinely close and worth a real conversation about priorities, not a number to rubber-stamp. If the ranking is robust to small weight changes, that's useful information too — it means the decision is more solid than it might feel.

## Key terms

| Term | Meaning |
|---|---|
| Weighted scoring matrix | A technique scoring options against multiple criteria, each weighted by relative importance, to produce a comparable total |
| Sensitivity check | Testing how much the weights would need to change before the recommended option flips |

## Check yourself

Two engineers score every option identically on cost, latency, quality, and maintainability, but recommend different vector databases. How is that possible, and what does it reveal about where the real disagreement actually is?
