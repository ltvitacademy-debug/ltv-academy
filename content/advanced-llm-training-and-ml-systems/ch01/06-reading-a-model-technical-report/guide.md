# Reading a Model Technical Report

You now have the vocabulary — pipeline stages, compute budgets, architecture components, real cost drivers — to actually read a model's technical report critically instead of skimming the headline benchmark table. This lesson closes out Chapter 1 by teaching you what sections to expect, what's usually missing, and the specific red flags that separate a trustworthy report from a marketing document.

## What you'll learn

- The sections that appear in nearly every serious model technical report
- What information is commonly withheld, and why that matters for your own evaluation
- How to spot likely benchmark contamination or cherry-picked comparisons
- How Hugging Face model card metadata maps onto the same information

## The sections to expect

1. **Architecture & hyperparameters** — parameter count, layer count, hidden size, attention variant (recall Lesson 4's RoPE/GQA/SwiGLU vocabulary), context length, vocabulary size.
2. **Training data description** — what categories of data were used (web, code, books, etc.) and in what rough proportions; rarely the literal list of sources, for competitive and legal reasons.
3. **Compute & infrastructure** — total training tokens, sometimes GPU-hours or hardware configuration (recall Lesson 5's cost discussion), and occasionally details about the distributed training setup.
4. **Post-training methodology** — what SFT and alignment process was used (Lesson 1's three-stage pipeline), sometimes including the preference-optimization method (RLHF, DPO, or a variant).
5. **Evaluation** — benchmark scores on standard suites (e.g., MMLU-style knowledge tests, coding benchmarks, math benchmarks), usually compared against competing models.
6. **Safety / limitations** — known failure modes, red-teaming methodology, bias evaluations, and a "known limitations" section.

## What's usually missing — and why it matters

Most technical reports are deliberately vague about the **exact composition of the training data** (specific source list and weighting), the **exact compute cost**, and sometimes the **exact architecture details** for a model that's served only through an API rather than released as open weights. This isn't necessarily dishonesty — it often reflects legitimate competitive and legal concerns — but it means you should treat any number *not* disclosed as unknown, not as implicitly favorable. If a report doesn't state the token count, don't assume it's large; if it doesn't describe contamination checks, don't assume the eval set was clean.

## Reading evaluation numbers critically

- **Benchmark contamination** — if a model's pretraining data wasn't carefully filtered against the exact text of a benchmark (recall deduplication from the data pipeline, covered in depth in Chapter 2), its score on that benchmark may be inflated by memorization rather than reasoning. Trustworthy reports usually include a decontamination methodology section describing how they checked for and removed overlap.
- **Cherry-picked comparisons** — watch for benchmark suites or competitor models chosen selectively; a report that only shows comparisons where its model wins, while omitting a widely-used benchmark competitors also report, is a signal to seek out independent third-party evaluations.
- **Benchmark-vs-capability gap** — a high score on a static multiple-choice benchmark doesn't guarantee the model is reliable on your actual use case; benchmarks are a proxy, not a guarantee.

## Where Hugging Face model cards fit in

For models hosted on the Hugging Face Hub, much of the same information is expected in structured YAML front-matter plus a Markdown body:

```yaml
---
license: apache-2.0
language: en
tags:
  - text-generation
datasets:
  - some-public-dataset-id
model-index:
  - name: example-model
    results:
      - task: {type: text-generation}
        dataset: {name: MMLU, type: mmlu}
        metrics: [{type: accuracy, value: 0.0}]
---
```

The structured `model-index` block is designed specifically to make benchmark claims machine-readable and comparable, but it's still only as trustworthy as the methodology section describing how those numbers were produced.

## Key terms

- **Benchmark contamination** — when evaluation data has leaked into (or closely overlaps with) training data, inflating scores
- **Decontamination methodology** — the documented process a lab uses to detect and remove benchmark overlap from training data
- **Model card** — a structured document (often YAML + Markdown on Hugging Face) describing a model's architecture, data, and evaluation
- **Cherry-picked comparison** — selectively showing only the benchmarks or competitors that make a model look favorable

## Recap

A trustworthy technical report covers architecture, data, compute, post-training methodology, evaluation, and limitations — and what it doesn't disclose should be treated as unknown, not favorable. Reading evaluation numbers critically means checking for decontamination methodology and watching for cherry-picked comparisons. That closes Chapter 1; Chapter 2 goes deep on the data pipeline itself, starting with training a BPE tokenizer.
