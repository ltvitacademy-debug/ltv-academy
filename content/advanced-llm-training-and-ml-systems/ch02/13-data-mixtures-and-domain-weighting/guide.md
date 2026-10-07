# Data Mixtures & Domain Weighting

This closes out Chapter 2 by returning to the sourcing question from Lesson 9: once you've collected web text, code, books, and reference text, in what proportions should they actually appear in training? Simply using every available token in proportion to how much raw data exists for each domain is rarely the best choice — this lesson covers why, and the methods used to set better mixture weights.

## What you'll learn

- Why naive proportional sampling of data sources is usually suboptimal
- How upsampling and downsampling specific domains changes what a model learns
- What DoReMi's domain-reweighting approach does differently
- How to implement weighted sampling with Hugging Face `datasets`

## Why raw proportions aren't the right weights

Raw web crawl absolutely dwarfs high-quality sources like curated books, academic papers, or Wikipedia in sheer token count. Training strictly in proportion to availability would mean the model sees web text (highly variable in quality) vastly more often than dense, well-written reference material — even though per-token "value" for building strong reasoning and knowledge is not at all equal across domains. In practice, labs **upsample** smaller, higher-value domains (repeating them relative to their natural frequency) and **downsample** the largest, lowest-value-per-token domain (web text), rather than training on the natural distribution.

Meta's publicly described Llama training data composition is a well-known example of this idea in practice: their reported mixture explicitly blends web text, code, Wikipedia, books, and academic papers/papers-with-code-style sources at hand-chosen (not purely proportional) rates, rather than simply using whatever fraction of tokens each source happens to represent in the raw collected data.

## Weighted sampling with `datasets`

Hugging Face `datasets` provides `interleave_datasets`, which draws from multiple source datasets according to specified sampling probabilities — directly implementing a chosen mixture weighting.

```python
from datasets import load_dataset, interleave_datasets

web = load_dataset("HuggingFaceFW/fineweb", split="train", streaming=True)
code = load_dataset("bigcode/the-stack", split="train", streaming=True)
wiki = load_dataset("wikimedia/wikipedia", "20231101.en", split="train", streaming=True)

mixed = interleave_datasets(
    [web, code, wiki],
    probabilities=[0.70, 0.20, 0.10],  # chosen mixture weights, not raw proportions
    seed=42,
)
```

Each training batch drawn from `mixed` samples from `web`, `code`, and `wiki` according to those probabilities, regardless of how large each underlying dataset actually is — so a comparatively small but high-value dataset like Wikipedia can be deliberately overrepresented relative to its true size in the raw collected data.

## DoReMi: learning the weights instead of hand-picking them

Hand-picking mixture weights through trial and error is expensive — each candidate weighting requires an expensive training run (or at least a partial one) to evaluate. **DoReMi** (Domain Reweighting with Minimax Optimization, from Google DeepMind) proposes an alternative: train a small proxy model using a minimax objective that up-weights domains where a reference model still performs poorly, producing a set of domain weights that can then be reused for a much larger, more expensive training run — getting much of the benefit of careful weight-tuning without paying full training cost for every candidate mixture.

## Why this closes the chapter

Every earlier lesson in this chapter — tokenization, vocabulary size, sourcing, deduplication, filtering, packing — determines what's *available* and how it's *represented*. Mixture weighting is the final lever that determines what the model actually *sees how often*, and it's often one of the highest-leverage decisions in the entire data pipeline, because it directly shapes the balance of knowledge and skills the resulting model ends up with.

## Key terms

- **Mixture weighting / domain weighting** — choosing the sampling rate for each data source, rather than using its raw proportion
- **Upsampling / downsampling** — increasing or decreasing a domain's effective frequency relative to its natural size in the raw corpus
- **`interleave_datasets`** — the Hugging Face `datasets` function that samples from multiple datasets according to given probabilities
- **DoReMi** — a method that learns domain weights via a minimax objective on a small proxy model, rather than hand-picking them

## Recap

Data mixture weighting deliberately departs from raw source proportions, upsampling smaller high-value domains like books and reference text and downsampling the largest lower-value-per-token domain, web text; `interleave_datasets` implements chosen weights directly, and methods like DoReMi can learn better weights automatically using a small proxy model. That closes Chapter 2 — tokenization and data pipelines at scale — and Chapter 3 moves into pretraining large models directly.
