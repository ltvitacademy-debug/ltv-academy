# Lambda Fundamentals

Every service so far in this course — Glue, Athena, Redshift — runs on infrastructure AWS
manages, but you still think in terms of jobs, clusters, or clusters-of-one. **Lambda** is a
step further: you write a function, AWS runs it in response to something happening, and it
disappears again the moment it's done. No server, no cluster, not even a "job" that sits
around between runs.

## What you'll learn

- What a Lambda function actually is, and the trigger model
- The 15-minute timeout, and why it exists
- How memory and CPU scale together
- Cold starts, and what causes them

## What Lambda actually is

A **Lambda function** is a small, self-contained piece of code — a **handler** — that AWS
invokes in response to a **trigger**: an API call, a file landing in S3, a message arriving on
a queue, a scheduled time. Between invocations, nothing is running and nothing is being billed.
You're not managing a server that's idling, waiting for work — you're paying only for the
milliseconds your code actually executes, once per invocation.

## The 15-minute timeout

Every Lambda function has a **maximum execution time of 15 minutes (900 seconds)**, configured
per function up to that ceiling. This isn't an arbitrary limit — it's a signal about what
Lambda is *for*. It's built for short, fast, triggered work: validate a file, transform a
single record, kick off a downstream process. A job that genuinely needs an hour of processing
is a sign you want Glue or EMR (Lesson 33 covers this tradeoff directly), not a Lambda function
straining against its ceiling.

## Memory and CPU scale together

When you configure a Lambda function, you set one number: **memory**, from 128 MB up to 10,240
MB. What's easy to miss is that **CPU allocation scales proportionally with memory** — you
can't set CPU independently. A CPU-bound function that runs slowly at 256 MB will often run
meaningfully faster at 1,769 MB (the point at which Lambda allocates the equivalent of one full
vCPU) simply because it now has more compute behind it, even though you only touched the
memory slider. This makes memory tuning a genuine performance lever, not just a cost setting.

## Cold starts

The **first** invocation of a function after a period of no traffic requires AWS to
initialize a fresh execution environment — download your code, start the runtime, run any
initialization code outside your handler — before your handler even starts. This is a **cold
start**, and it adds latency (often tens to a few hundred milliseconds, more for larger
runtimes or heavier initialization) that a **warm** invocation, reusing an already-initialized
environment, doesn't pay. For latency-sensitive, user-facing Lambda functions, cold starts are
a real design consideration; for event-driven data pipeline work, they're usually a minor
concern compared to the actual processing time.

## Key terms

| Term | Meaning |
|---|---|
| Lambda function | A piece of code AWS runs in response to a trigger, with no server to manage |
| Handler | The entry-point function AWS invokes for each event |
| Trigger | The event source that invokes a Lambda function |
| Timeout | Maximum execution time per invocation; hard ceiling of 15 minutes |
| Cold start | Added latency when AWS must initialize a fresh execution environment |

## Check yourself

A Lambda function processes a small JSON file and finishes in under a second when a request
lands seconds after the last one, but takes noticeably longer the first time it runs after
being idle for an hour. What's happening on that first, slower invocation?
