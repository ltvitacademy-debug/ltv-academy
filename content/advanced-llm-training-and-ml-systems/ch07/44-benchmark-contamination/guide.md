# Benchmark Contamination

Every evaluation method covered so far in this chapter assumes the test data is actually unseen by the model. Benchmark contamination is what happens when that assumption is false: benchmark questions, or text close enough to them, end up in the pretraining corpus, so a high score reflects memorization of the test rather than the capability the test was designed to measure. Given how this course's Chapter 2 covered pretraining data at web scale, contamination isn't a hypothetical risk — it's close to inevitable without a deliberate decontamination step.

## What you'll learn

- Why contamination is a near-inevitable consequence of training on web-scale data
- How contamination is detected: n-gram overlap and embedding-based near-duplicate search
- Canary strings as a benchmark-design-side defense
- Decontamination as a pretraining data pipeline step, connecting back to Chapter 2
- Why a suspiciously high benchmark score should raise contamination as a hypothesis, not just be celebrated

## Why contamination happens

Popular benchmarks like MMLU or GSM8K are public — their questions and often their answers are posted on the open web (academic papers citing examples, blog posts discussing benchmark questions, forum threads, and sometimes outright copies of the benchmark files themselves on GitHub or in the data dumps used to build pretraining corpora). A pretraining pipeline built to scrape and filter a large fraction of the public web, as covered in Chapter 2's data curation lessons, will very likely ingest at least some of this material unless something in the pipeline specifically looks for and removes it. The result is a model that has, in effect, seen some benchmark questions (or extremely similar ones) during pretraining — and "performing well" on those specific questions afterward isn't evidence of the general capability the benchmark was designed to test.

## Detecting contamination

The standard approach is n-gram overlap detection: checking whether sequences of consecutive tokens (commonly 8-to-13-gram windows, following the methodology popularized by the GPT-3 and Llama technical reports) from a benchmark's test examples appear verbatim in the pretraining corpus. A benchmark example with a long exact n-gram match in the training data is flagged as likely contaminated. This catches verbatim or near-verbatim copies but misses paraphrased contamination — a benchmark question rewritten in different words that still leaks the same information. Embedding-based near-duplicate search (comparing dense vector representations of text rather than exact token sequences) catches some paraphrased cases that n-gram matching misses, at higher computational cost, since it requires embedding and comparing a much larger space of candidate matches rather than a direct string search.

```python
# A simplified n-gram contamination check
def ngram_overlap(benchmark_text, corpus_index, n=13):
    tokens = tokenize(benchmark_text)
    ngrams = {tuple(tokens[i:i+n]) for i in range(len(tokens) - n)}
    matches = [ng for ng in ngrams if ng in corpus_index]
    return len(matches) / max(len(ngrams), 1)  # contamination ratio
```

## Canary strings

Some benchmark creators embed a canary string — a unique, random identifier (often a GUID) included in a comment near the benchmark data, with an explicit request that anyone scraping data for pretraining exclude any document containing it. BIG-bench is a well-known example of this convention. It only works if pretraining pipelines actually implement the corresponding filter, which makes it a voluntary, honor-system defense rather than a technical guarantee — useful as one layer, but not sufficient on its own.

## Decontamination as a pipeline step

The more reliable defense happens on the pretraining side: running the n-gram or embedding-based overlap check against every known benchmark's test set *before* finalizing the pretraining corpus, and removing documents that match above a threshold. This is a direct extension of the deduplication and quality-filtering pipeline from Chapter 2 — contamination is, structurally, a specific case of unwanted overlap between two datasets, the same category of problem deduplication solves within a single dataset. Major model releases increasingly report a decontamination step and its measured impact on benchmark scores as part of responsible reporting, precisely because an unreported, uncontrolled-for contamination risk undermines the credibility of every benchmark number in the report.

## Key terms

- **Benchmark contamination** — benchmark test data (or close paraphrases) present in a model's training data, inflating scores without reflecting real capability
- **N-gram overlap detection** — checking for exact matching sequences of consecutive tokens between benchmark data and the training corpus
- **Canary string** — a unique identifier embedded in benchmark data requesting exclusion from pretraining corpora, honor-system rather than enforced
- **Decontamination** — a pretraining data pipeline step that removes documents overlapping with known benchmark test sets
- **Embedding-based near-duplicate search** — comparing dense vector representations of text to catch paraphrased contamination that exact n-gram matching misses
