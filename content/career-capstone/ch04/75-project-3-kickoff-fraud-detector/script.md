# Script — Project 3 Kickoff: An End-to-End Streaming Fraud Detector

## Segment 1 (title)

Project 3 is a payments platform's fraud detector: every transaction needs a fraud score back before it's approved — a latency budget measured in hundreds of milliseconds, not minutes. There's no overnight batch job that can help; by the time it would run, the fraud is already approved.

## Segment 2 (code: scoping the numbers)

Assume a mid-size processor: roughly two thousand transactions a second at peak, a 300 millisecond scoring budget, and ninety days of retained raw events. Those three numbers alone rule out entire design classes before any tool gets picked — 300 milliseconds rules out a batch stage in the critical path, and ninety days of history is exactly the replayable source Kappa architecture depends on.

## Segment 3 (steps: why Kappa fits)

A fraud detector has no batch layer to begin with — there's no slower, exact version of a fraud score that replaces the real-time one later. Every transaction gets scored once, live, by one pipeline. If the scoring logic changes, that's Kappa's reprocessing case: replay historical transactions through the updated pipeline to backtest it.

## Segment 4 (steps: what the serving layer must guarantee)

The system returning approve or flag has to answer inside that budget, every time, under peak load. A slow serving layer here isn't a performance nitpick — it's a fraud detector that approves what it should have flagged. That constraint is what the next two lessons build against.

## Segment 5 (outro)

The scenario, the numbers, and the architecture fit are set. Next up: building the streaming ingestion and the real-time feature computation the scoring model actually runs on.
