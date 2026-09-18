# Script — The Photon Engine

## Segment 1 (title)

Photon isn't one more Spark setting you flip. It's a native execution engine, written in C++, that replaces standard JVM execution for the operators it supports. This lesson is about which operators, and how to tell it's actually running.

## Segment 2 (code: native engine vs JVM)

Standard Spark processes rows one at a time on the JVM. Photon is vectorized native C++ — it processes a batch of rows per operator call, using CPU instructions the JVM can't reach directly. That's a different engine doing the work, not a tuning knob on the same one.

## Segment 3 (code: what benefits, what doesn't)

Scans, aggregations, and joins benefit the most — exactly the operators that touch the most rows. Python UDFs don't benefit at all, because Photon can't vectorize arbitrary Python — that step falls back to the JVM, even inside an otherwise Photon-accelerated query.

## Segment 4 (code: confirming it's running)

The real check isn't the Photon checkbox on the cluster config screen — it's the query profile. Individual operator nodes there show a lightning-bolt Photon indicator when that specific operator actually ran on Photon. An operator without it ran on plain JVM Spark, in the very same query.

## Segment 5 (outro)

Photon is operator-by-operator, not query-by-query — know which operators it actually accelerates. Next up: Adaptive Query Execution, which changes the plan itself at runtime.
