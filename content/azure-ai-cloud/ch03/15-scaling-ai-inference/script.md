# Script — Scaling AI Inference

## Segment 1 (title)

A model endpoint that handles ten requests a minute fine can fall over at ten thousand — scaling inference is about staying ahead of that, not reacting after it happens.

## Segment 2 (screenshot: scale out entry)

Azure Autoscale settings live on the resource's Scale out page — the same blade behind an App Service plan hosting a self-hosted inference API, reached through Configure, scoped to that specific resource rather than the whole subscription.

## Segment 3 (screenshot: custom autoscale)

From there it's a choice: manual scale holds a fixed instance count no matter what's happening, while custom autoscale reacts to a schedule or to metrics instead. That second option is what actually lets an inference service grow and shrink with real demand instead of guessing at one fixed number up front.

## Segment 4 (screenshot: scale rule)

A rule is where that reaction gets defined — threshold, duration, and action, all in one form. This one decreases the instance count by one when average CPU stays under 20 percent for 10 minutes, so idle capacity doesn't just sit there costing money overnight.

## Segment 5 (code: what to actually scale on)

A web app usually scales on CPU or request count, and those are the metrics Autoscale offers by default. An AI inference endpoint's bottleneck is rarely the CPU at all — it's GPU utilization, queue depth, or token throughput — so the rule has to target whatever's actually saturated, not whatever's easiest to measure out of the box.

## Segment 6 (outro)

Scale on what's actually the bottleneck, not just what Autoscale measures by default. Next up: letting an AI app authenticate to these services without a password sitting in the code at all.
