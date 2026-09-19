# Script — Step Functions Fundamentals

## Segment 1 (title)

Real pipelines are rarely one step — crawl, then transform, then load, then notify. Step Functions turns that sequence into a single, observable, declarative workflow instead of a pile of Lambda functions calling each other.

## Segment 2 (code: a state machine, in ASL)

A state machine is written in Amazon States Language, a JSON format. Every state points to the next state with "Next," or terminates the machine with "End: true." Step Functions tracks exactly which state is running and retries failures according to rules you define.

## Segment 3 (steps: what a state machine gives you)

The value isn't running the steps — a Lambda could technically call another Lambda. It's that the console shows you exactly which state is running live, retry and catch rules live declaratively in the definition instead of scattered try-catch code, and every execution leaves a durable, auditable history.

## Segment 4 (steps: Standard vs. Express)

Step Functions offers two workflow types. Standard runs up to a year, uses exactly-once semantics, keeps full execution history, and prices per state transition — the default for data pipeline orchestration. Express runs at most five minutes, is at-least-once, and is built for high-volume, short-duration event processing instead.

## Segment 5 (outro)

Step Functions fundamentals down. Next up: building a real state machine — an ASL definition that chains a Glue job into a Lambda function.
