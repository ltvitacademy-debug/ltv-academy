# Standard Benchmarks & Their Limits

Lesson 40 established that perplexity measures next-token prediction and nothing about downstream capability directly. Standard benchmarks are the field's answer to that gap: structured test sets with a right answer, designed to measure specific capabilities like broad knowledge, commonsense reasoning, or math. They're useful and nearly universal in model reports — but this lesson is as much about their limits as their value, because treating a benchmark score as the final word on model quality is a common and costly mistake.

## What you'll learn

- The major standard benchmarks and what each one is actually designed to measure
- How benchmarks are run in practice with `lm-evaluation-harness`
- Benchmark saturation: why top models now score similarly on older benchmarks
- Format sensitivity: how prompt wording and few-shot setup change scores
- Why a good benchmark score doesn't guarantee good real-world performance

## The major benchmarks and what they measure

- **MMLU (Massive Multitask Language Understanding)** — multiple-choice questions across 57 subjects (law, medicine, history, math, and more), measuring broad factual and reasoning knowledge.
- **HellaSwag** — commonsense sentence-completion, measuring whether a model picks the most plausible continuation of an everyday situation over plausible-sounding distractors.
- **GSM8K** — grade-school math word problems requiring multi-step arithmetic reasoning, measuring whether a model can chain reasoning steps correctly, not just recall a fact.
- **HumanEval** — Python programming problems with a function signature and docstring, where a generated solution is graded by actually executing it against unit tests, measuring functional code-generation ability rather than code that merely looks plausible.

Each benchmark targets a specific, narrow capability — a high MMLU score says nothing directly about code generation ability, and a high HumanEval score says nothing about commonsense reasoning. Reporting a single benchmark in isolation is almost always a red flag for an evaluation that's cherry-picking a result rather than characterizing the model honestly.

## Running benchmarks in practice

`lm-evaluation-harness` (EleutherAI) is the standard open-source tool for running these suites against a model reproducibly:

```bash
lm_eval --model hf \
  --model_args pretrained=meta-llama/Llama-3.1-8B-Instruct \
  --tasks mmlu,hellaswag,gsm8k \
  --device cuda:0 \
  --batch_size auto
```

For code benchmarks like HumanEval specifically, the companion `bigcode-evaluation-harness` handles the sandboxed execution step required to actually run generated code against test cases safely.

## Benchmark saturation

A benchmark saturates when most competitive models score close to the maximum, and the remaining differences are noise rather than meaningful capability gaps — HellaSwag is a frequently cited example, where current frontier models cluster near the top of the scale, making it far less useful for distinguishing a genuinely stronger model from a weaker one than it was when the benchmark was introduced. Saturation is a predictable lifecycle: a benchmark is introduced when it's hard, becomes a widely reported target, models improve on it specifically (sometimes through contamination, covered in Lesson 44), and eventually stops discriminating — which is why newer, harder benchmarks keep replacing older ones in model reports.

## Format sensitivity

Benchmark scores can shift meaningfully based on details that have nothing to do with the model's actual capability: the exact prompt template used to present the question, whether answer choices are labeled with letters or presented as full text, the number of few-shot examples provided before the test question, and even the order those few-shot examples appear in. This means a benchmark comparison across two papers or two labs using slightly different evaluation harnesses or prompt formats is not a clean apples-to-apples comparison, even when both report "the same" benchmark — a caveat worth remembering any time a vendor leads with a headline benchmark number.

## Key terms

- **MMLU / HellaSwag / GSM8K / HumanEval** — standard benchmarks for broad knowledge, commonsense reasoning, math reasoning, and functional code generation respectively
- **`lm-evaluation-harness`** — EleutherAI's standard open-source tool for running benchmark suites reproducibly against a model
- **Benchmark saturation** — the point at which most competitive models score near the maximum, reducing the benchmark's ability to discriminate between them
- **Format sensitivity** — the way prompt template, few-shot count, and answer presentation can shift scores independent of true capability
- **Few-shot evaluation** — presenting a small number of example question-answer pairs before the test question, to prime the model's response format
