# Script — Event-Driven Data Processing

## Segment 1 (title)

Lambda runs in response to a trigger instead of sitting idle. Event-driven processing is the pattern that makes that useful — reacting the instant something happens instead of repeatedly checking whether it happened yet.

## Segment 2 (code: polling vs. event-driven)

Polling means checking a source on a timer, over and over, even when nothing's changed — that costs something and adds latency equal to the check interval. Event-driven flips it: the source itself announces when something happens, and that announcement invokes the consumer directly, with no idle checking loop at all.

## Segment 3 (steps: four triggers worth knowing)

Four event sources come up constantly in data pipeline work. S3 PUT events fire the moment a new object lands. SQS messages let a fast producer hand work off to a slower consumer without either waiting on the other. And EventBridge scheduled rules and DynamoDB Streams cover timed jobs and reacting to changes in operational data.

## Segment 4 (outro)

Event-driven processing down. Next up: Lambda plus S3 triggers — the most common trigger pattern you'll actually build in a data pipeline.
