# Script — Benchmark Contamination

## Segment 1 (title)

Every evaluation method in this chapter assumes the test data is actually unseen by the model. Benchmark contamination is what happens when that's false -- benchmark questions end up in the pretraining corpus, and a high score reflects memorization rather than the capability being tested.

## Segment 2 (steps)

Popular benchmarks are public -- their questions show up in papers, blog posts, and sometimes direct copies on GitHub. A pretraining pipeline built to scrape a large fraction of the public web will very likely ingest some of this unless something specifically filters it out. A model that's seen those exact questions before isn't demonstrating the general capability the benchmark was designed to measure when it answers them correctly afterward.

## Segment 3 (steps)

Some benchmark creators embed a canary string -- a unique random identifier with an explicit request to exclude any document containing it from pretraining data. BIG-bench does this. But it's an honor-system defense -- it only works if pipelines actually implement the filter. The more reliable fix happens on the pretraining side: checking the corpus against known benchmark test sets and removing overlapping documents before finalizing it, which is really the same category of problem as deduplication, just across datasets instead of within one.

## Segment 4 (code)

In practice, detection usually starts with n-gram overlap -- checking whether long sequences of consecutive tokens, commonly 8 to 13 grams, from a benchmark question appear verbatim in the training corpus. That catches exact or near-exact copies. Embedding-based near-duplicate search catches some paraphrased contamination that exact token matching misses, at a higher computational cost.

## Segment 5 (outro)

A suspiciously high benchmark score should raise contamination as a hypothesis worth checking, not just get celebrated. Which leads into the last lesson of this chapter: since public benchmarks carry this risk by design, sometimes the right move is building your own eval set that nobody else could have trained on.
