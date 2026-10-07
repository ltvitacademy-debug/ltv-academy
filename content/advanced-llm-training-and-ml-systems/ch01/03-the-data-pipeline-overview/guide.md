# The Data Pipeline, Overview

Every stage of the three-stage pipeline from Lesson 1 needs data, and the pretraining stage needs an enormous, carefully built supply of it. This lesson walks the full data pipeline end to end — from raw web crawl to the exact tensors a training loop consumes — so that Chapter 2's deep dives into tokenization, deduplication, filtering, packing, and mixture weighting all slot into a single mental picture.

## What you'll learn

- The full sequence of stages data passes through before it reaches a training loop
- Where raw text actually comes from (Common Crawl and curated derivatives)
- Why each stage exists and what would go wrong if it were skipped
- How Hugging Face `datasets` represents a pipeline like this in code

## The pipeline, stage by stage

1. **Acquisition** — raw sources: web crawls (Common Crawl snapshots), code repositories, books, encyclopedic text, licensed or proprietary data.
2. **Extraction & cleaning** — pulling readable text out of raw HTML/WARC files, stripping boilerplate (navigation, ads, headers/footers).
3. **Language identification & basic filtering** — keeping only text in the target language(s) and discarding obviously broken or near-empty documents.
4. **Deduplication** — removing exact and near-duplicate documents so the model doesn't over-memorize repeated content (Chapter 2, Lesson 10).
5. **Quality & toxicity filtering** — scoring documents for fluency/quality and filtering harmful or toxic content (Chapter 2, Lesson 11).
6. **Tokenization** — converting cleaned text into integer token IDs using a trained tokenizer (Chapter 2, Lesson 7).
7. **Packing** — concatenating tokenized documents into fixed-length training sequences with minimal wasted padding (Chapter 2, Lesson 12).
8. **Mixture weighting & sharding** — sampling from multiple domains at chosen rates and writing the result into training-ready shards (Chapter 2, Lesson 13).

Skipping any one of these has a concrete cost: no dedup means wasted compute re-memorizing the same text (and a real risk of test-set contamination); no quality filtering means the model spends capacity learning from spam and boilerplate; no packing means huge amounts of GPU time spent processing padding tokens that carry no signal.

## A minimal pipeline in code

Hugging Face's `datasets` library is the most common tool for assembling a pipeline like this, especially in streaming mode so you never have to materialize the full corpus on disk at once.

```python
from datasets import load_dataset

# Stream a large web-text dataset without downloading it all upfront
ds = load_dataset("HuggingFaceFW/fineweb", split="train", streaming=True)

def basic_filter(example):
    text = example["text"]
    return len(text) > 200 and len(text) < 100_000

filtered = ds.filter(basic_filter)

def tokenize_fn(example, tokenizer):
    return {"input_ids": tokenizer(example["text"])["input_ids"]}

# tokenized = filtered.map(tokenize_fn, fn_kwargs={"tokenizer": tok})
```

Streaming mode (`streaming=True`) is essential at this scale — pretraining corpora run into terabytes, far larger than most local disks, so the pipeline reads, transforms, and discards data on the fly rather than loading it all into memory.

## Where the pipeline ends

The output of this entire process is not raw text at all — it's sharded, tokenized, packed sequences, often stored in an efficient columnar or binary format (Arrow files, memory-mapped `.bin`/`.idx` pairs, or similar), ready to be read directly into GPU memory with no further text processing during training. By the time training actually starts, every expensive decision about what data to include and how to weight it has already been made upstream.

## Key terms

- **Common Crawl** — the largest public web-crawl dataset, and the raw source behind most curated web-text training corpora
- **Deduplication** — removing exact or near-duplicate documents from a corpus
- **Quality/toxicity filtering** — scoring and removing low-quality or harmful text
- **Packing** — concatenating documents into fixed-length sequences to minimize wasted padding
- **Streaming dataset** — a dataset read incrementally rather than fully materialized in memory or on disk

## Recap

Raw text travels through acquisition, cleaning, language filtering, deduplication, quality/toxicity filtering, tokenization, packing, and mixture weighting before it ever reaches a training loop. Hugging Face `datasets` in streaming mode is the standard way to assemble this at scale without needing to store the full corpus locally. Next up, Lesson 4: the model architecture choices that decide what happens to those tokens once training starts.
