# Deduplication at Scale

Web-scale corpora are full of duplicate and near-duplicate content — the same press release syndicated across dozens of news sites, boilerplate licensing text repeated across millions of pages, mirrored documentation. Lesson 3's pipeline flagged deduplication as a required stage; this lesson explains why it matters so much and how it's actually done at a scale where comparing every document to every other document directly is computationally impossible.

## What you'll learn

- Why duplicate training data hurts model quality, not just wastes compute
- The difference between exact and near-duplicate deduplication
- How MinHash and Locality-Sensitive Hashing (LSH) make near-dedup tractable at scale
- How to compute document similarity with the `datasketch` library

## Why duplication is a real quality problem, not just an efficiency one

Lee et al.'s widely-cited study "Deduplicating Training Data Makes Language Models Better" found that duplicate content in training corpora doesn't just waste compute re-processing the same text — it measurably increases a model's tendency to **memorize** that specific duplicated content verbatim, and can degrade overall model quality relative to a deduplicated corpus of the same token count. Deduplication is also directly connected to **benchmark contamination** (Lesson 6): if a document resembling a benchmark's test examples appears many times in training data, a model's score on that benchmark becomes less trustworthy as a measure of real capability.

## Exact deduplication

The simplest form: hash the normalized text of each document (e.g., with SHA-256) and drop any document whose hash has already been seen.

```python
import hashlib

seen_hashes = set()

def is_exact_duplicate(text: str) -> bool:
    normalized = " ".join(text.split()).lower()
    h = hashlib.sha256(normalized.encode("utf-8")).hexdigest()
    if h in seen_hashes:
        return True
    seen_hashes.add(h)
    return False
```

This catches byte-for-byte (or whitespace/case-normalized) duplicates cheaply, but misses **near-duplicates** — the same article with a different ad banner, a slightly reformatted press release, or boilerplate text with one sentence changed.

## Near-duplicate detection: MinHash and LSH

Comparing every document to every other document for similarity is an O(n²) problem — computationally impossible at hundreds of millions or billions of documents. **MinHash** solves this by computing a compact fingerprint (a set of hash-based minimum values) for each document such that the similarity between two documents' MinHash signatures approximates their true Jaccard similarity (overlap of shingles/n-grams). **Locality-Sensitive Hashing (LSH)** then buckets documents so that only likely-similar pairs ever get compared directly, avoiding the full pairwise comparison entirely.

```python
from datasketch import MinHash, MinHashLSH

def to_shingles(text: str, k: int = 5):
    words = text.split()
    return {" ".join(words[i:i + k]) for i in range(len(words) - k + 1)}

def minhash_for(text: str, num_perm: int = 128) -> MinHash:
    mh = MinHash(num_perm=num_perm)
    for shingle in to_shingles(text):
        mh.update(shingle.encode("utf-8"))
    return mh

lsh = MinHashLSH(threshold=0.8, num_perm=128)

for doc_id, text in enumerate(corpus):
    mh = minhash_for(text)
    duplicates = lsh.query(mh)   # candidate near-duplicates, found cheaply
    if not duplicates:
        lsh.insert(str(doc_id), mh)
```

The `threshold` parameter controls how similar two documents must be (by estimated Jaccard similarity) to be treated as near-duplicates — a common choice in large-scale pipelines is around 0.8, though the right value depends on how aggressively you want to deduplicate versus how much content diversity you're willing to risk losing.

## Key terms

- **Exact deduplication** — removing documents that are byte-for-byte (or lightly normalized) identical, typically via hashing
- **Near-duplicate** — documents that are highly similar but not identical (e.g., syndicated articles, reformatted boilerplate)
- **MinHash** — a compact fingerprint technique that approximates Jaccard similarity between documents
- **Locality-Sensitive Hashing (LSH)** — a bucketing technique that avoids full pairwise comparison by only comparing likely-similar documents

## Recap

Deduplication isn't just an efficiency optimization — duplicate content measurably hurts model quality and inflates memorization and contamination risk. Exact deduplication via hashing is cheap but misses near-duplicates, which require MinHash fingerprints and LSH bucketing to detect tractably at web scale. Next up, Lesson 11: quality and toxicity filtering, the next cleaning pass after dedup.
