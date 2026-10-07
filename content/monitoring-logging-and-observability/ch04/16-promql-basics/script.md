# Script — PromQL Basics

## Segment 1 (title)

PromQL is how you turn raw counters, gauges, and histograms into actual answers — your error rate right now, your 95th-percentile checkout latency. It's the single skill behind every dashboard panel and alert rule in this entire chapter.

## Segment 2 (code)

Start simple: a bare metric name returns an instant vector, the latest value of every matching series with its full label set. Add label filters in curly braces to narrow it down to just what you care about. Add a time range in square brackets and you get a range vector instead — every sample over that window, raw material for a function.

## Segment 3 (screenshot)

Because a counter only climbs, its raw value is nearly meaningless on its own. Rate calculates its per-second average rate of increase over that range vector — this is what you actually graph or alert on, never the raw counter itself. Irate works similarly but reacts to just the last two points, more responsive but noisier.

## Segment 4 (screenshot)

Histogram quantile does the same job for latency: it estimates a percentile from a histogram's bucket counts. This exact pattern — the 95th percentile of checkout duration over five minutes — is the first query Northbridge's on-call engineer runs the moment a latency alert fires during a flash sale.

## Segment 5 (code)

One more piece: aggregation. A raw rate query returns one line per pod, per status — useful for debugging a single instance, noisy for a dashboard. Sum by status collapses that down to just success versus failed, without losing that split, no matter how many pods are running behind it.

## Segment 6 (outro)

Selectors, rate, histogram_quantile, and aggregation — that's the core of PromQL you'll reuse in every lesson ahead. Next up, lesson seventeen: exporters, and monitoring Kubernetes itself.
