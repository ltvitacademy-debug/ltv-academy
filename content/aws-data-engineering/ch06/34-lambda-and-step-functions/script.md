# Script — Lambda + Step Functions

## Segment 1 (title)

Real pipelines are rarely a single step. Step Functions is AWS's way of orchestrating a sequence of steps across multiple Lambda invocations, instead of cramming everything into one monolithic function.

## Segment 2 (code: a state machine, in ASL)

A Step Functions state machine is defined in JSON, using the Amazon States Language — a sequence of states, each one typically invoking its own focused Lambda function, with Step Functions coordinating what runs next.

## Segment 3 (steps: one giant function vs. orchestrated steps)

Split the pipeline into states and a failure in one step can be retried on its own, without redoing work that already succeeded. A Catch rule can route a failed step to a dedicated failure-handling state. And you get a visual execution history showing exactly which state failed and why, instead of digging through one function's combined logs.

## Segment 4 (outro)

Lambda plus Step Functions down — that closes out the Lambda chapter. Next up, Chapter Seven: Step Functions fundamentals, a closer look at orchestration in AWS.
