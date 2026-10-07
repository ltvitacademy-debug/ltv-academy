# Script — Deduplication at Scale

## Segment 1 (title)

Web-scale corpora are full of duplicate and near-duplicate content, from syndicated press releases to mirrored documentation. This lesson explains why deduplication matters so much and how it's actually done at a scale where comparing every document to every other one directly is impossible.

## Segment 2 (steps)

Duplication isn't just wasted compute. A well-known study found that duplicate content measurably increases a model's tendency to memorize that text verbatim and can degrade overall quality. It's also tied to benchmark contamination -- if content resembling a benchmark's test examples appears many times in training data, scores on that benchmark become less trustworthy.

## Segment 3 (code)

Exact deduplication hashes the normalized text of each document and drops anything whose hash has already been seen. It's cheap, but it only catches byte-for-byte duplicates -- it misses the same article with a different ad banner or one changed sentence.

## Segment 4 (code)

Near-duplicate detection needs MinHash and locality-sensitive hashing. MinHash compresses each document into a compact fingerprint that approximates its true similarity to other documents, and LSH buckets documents so only likely-similar pairs ever get compared directly, instead of every document against every other one.

## Segment 5 (outro)

Exact hashing handles the easy cases; MinHash and LSH handle the hard ones at web scale. Next up, lesson eleven: quality and toxicity filtering, the next cleaning pass after dedup.
