# Script — Practice Questions: Eventstreams and KQL

## Segment 1 (title)

This chapter's streaming material spans more source lessons than any other topic. This lesson drills Eventstreams, Eventhouse and KQL databases, and core KQL syntax at exam difficulty.

## Segment 2 (code: ingestion path scenario)

Continuous IoT readings need an Eventstream, fed by an Event Hub or IoT Hub source, routing into an Eventhouse KQL database. A pipeline or Dataflow would be wrong here — both are batch-oriented, and the scenario says continuous.

## Segment 3 (steps: where/project and summarize/bin)

Where filters rows, project selects columns — that's the direct KQL expression of a plain-English filter-and-select scenario. Summarize with bin does time-bucketed aggregation — the same tumbling-window idea, expressed in KQL syntax instead of Eventstream windowing.

## Segment 4 (outro)

DP-700 tests the same underlying concept from multiple tool angles — recognize the operator behind the plain-English description. Next up: practice questions on notebooks and Spark.
