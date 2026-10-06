# Script — Capstone: Building an Eval + Monitoring Pipeline

## Segment 1 (title)

Build in this order: eval dataset, then monitoring, then incident response plan, then model card. Eval comes first because everything after depends on knowing what "working correctly" actually means for your feature.

## Segment 2 (code: eval dataset)

Fifteen to twenty cases, each with a realistic input and what a correct output looks like. Include two or three deliberately hard cases — an ambiguous input, an edge case, something close to your identified failure mode. Fifteen easy cases that all pass tells you nothing.

## Segment 3 (steps: monitoring + incident response)

Monitoring doesn't need a production platform — log every call's input, output, timestamp, and one real chart of cost or latency. Then write the incident response plan for your actual failure mode: detect, contain, communicate, review, specific to what you built.

## Segment 4 (code: model card)

Fill in the real six sections for your actual feature — details, intended use, training data or context, your actual evaluation numbers, ethical considerations, and caveats. If a section feels hard to fill in honestly, that's useful information about your system.

## Segment 5 (outro)

Four deliverables, built in order, each depending on the one before it. Next up: wrapping up and presenting what you built.
