# Script — Data Mixtures & Domain Weighting

## Segment 1 (title)

This closes out chapter two by returning to the sourcing question from lesson nine. Once you've collected web text, code, books, and reference text, in what proportions should they actually appear in training? Simply using every token in proportion to how much raw data exists is rarely the best choice.

## Segment 2 (steps)

Raw web crawl dwarfs high-quality sources like books or Wikipedia in sheer token count, even though per-token value for building strong reasoning isn't equal across domains. In practice, labs upsample smaller, higher-value domains and downsample the largest, lowest-value domain, web text, rather than training on the natural distribution.

## Segment 3 (code)

Hugging Face's datasets library implements this directly with interleave_datasets, which draws from multiple source datasets according to specified sampling probabilities. A comparatively small but high-value dataset like Wikipedia can be deliberately overrepresented relative to its true size in the raw collected data.

## Segment 4 (steps)

Hand-picking those weights through trial and error is expensive, since each candidate needs its own training run to evaluate. DoReMi, from Google DeepMind, proposes learning the weights instead, training a small proxy model with a minimax objective that up-weights domains where a reference model still performs poorly, then reusing those learned weights for the full expensive run.

## Segment 5 (outro)

Mixture weighting is often one of the highest-leverage decisions in the entire data pipeline, because it directly shapes what the model ends up knowing. That closes chapter two. Chapter three moves into pretraining large models directly.
