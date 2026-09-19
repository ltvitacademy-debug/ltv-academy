# Event-Driven Data Processing

Lesson 30 established that Lambda runs in response to a trigger instead of sitting idle. This
lesson is about the pattern that makes that useful: **event-driven processing** — reacting the
instant something happens, instead of repeatedly checking whether it happened yet.

## What you'll learn

- Event-driven vs. polling, and why the difference matters for cost and latency
- The event sources data engineers actually wire Lambda to
- Why this is a genuinely different architecture, not just a syntax choice

## Event-driven vs. polling

**Polling** means something — a script, a scheduled job — repeatedly checks a source on a
timer: "is there a new file yet? is there a new file yet?" Even when nothing has changed, that
polling still runs, still costs something, and still adds latency equal to however long until
the next check. **Event-driven** processing flips this: the source itself announces when
something happens, and that announcement directly invokes the consumer. There's no idle
checking loop and no polling interval to wait out — processing starts within moments of the
actual event, and nothing runs at all when nothing is happening.

## Event sources data engineers actually use

Four event sources come up constantly in data pipeline work:

- **S3 PUT events** — a new object landing in a bucket invokes a function immediately
  (Lesson 32 goes deep on this one).
- **SQS messages** — a message arriving on a queue invokes a function to process it, a common
  pattern for decoupling a fast producer from a slower consumer.
- **EventBridge scheduled rules** — a cron-like rule invokes a function on a schedule (e.g.
  "every night at 2 AM"); this is the one case where "event-driven" is really a timer, but it's
  still push-based rather than a polling loop the function itself runs.
- **DynamoDB Streams** — a change to a DynamoDB table (insert, update, delete) invokes a
  function with the changed record, useful for reacting to operational data changes in near
  real time.

## Why this is a different architecture

Beyond convenience, event-driven design changes the shape of a pipeline. There's no idle
compute cost for a checking loop that finds nothing most of the time. Latency is close to the
event itself, not bounded by a polling interval. And the components are genuinely
**decoupled** — the S3 bucket doesn't know or care that a Lambda function exists; it just
publishes an event, and anything subscribed reacts. Add a second consumer later and the
producer doesn't change at all.

## Key terms

| Term | Meaning |
|---|---|
| Polling | Repeatedly checking a source on a timer for new data |
| Event-driven | A source announces an event that directly invokes the consumer |
| SQS | Simple Queue Service — a message queue that can trigger Lambda per message |
| EventBridge | AWS's event bus/scheduler service, used for both cron-like rules and event routing |
| DynamoDB Streams | A feed of change events from a DynamoDB table that can trigger Lambda |

## Check yourself

A script currently checks an S3 bucket every five minutes for new files and processes any it
finds. Redesigned as event-driven, what would trigger the processing instead, and what two
concrete benefits would that change bring?
