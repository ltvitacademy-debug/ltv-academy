# Lesson 20 — Queueing & Async Processing

**Chapter 4 · Scaling & Reliability · Lesson 20 of 25**

## What you'll learn

- Why a slow AI request breaks the normal "just scale more instances" plan
- What a queue actually buys you that autoscaling (Lesson 17) alone doesn't
- The synchronous vs. asynchronous request pattern, concretely
- How a dead-letter queue keeps one bad request from blocking everything
  behind it

## Why slow requests need a different answer

A typical web request is fast — milliseconds to low seconds — so scaling
by adding instances (Lesson 17) smooths out load reasonably well. An AI
inference request can take seconds to tens of seconds. Holding an HTTP
connection open that whole time, for every concurrent request, doesn't
scale the same way — you can run out of connections, timeouts, or GPU
capacity long before autoscaling catches up.

## Sync vs. async, concretely

```
Synchronous (the default, works for fast requests):
  Client -> request -> [wait...] -> response
  Client's connection is held open the ENTIRE time

Asynchronous, with a queue:
  Client -> request -> job ID returned IMMEDIATELY
  Job sits in a queue -> a worker picks it up when free
  Client polls (or gets a webhook) for the result later
```

The queue decouples "a request arrived" from "a worker is free to handle
it right now." Instead of every request needing an instance available
*immediately*, requests can wait briefly in a queue while instances work
through a backlog — which is a much cheaper way to absorb a burst than
autoscaling alone, since you're not paying for instant capacity for every
possible spike.

## What a queue buys you that autoscaling alone doesn't

```
Autoscaling alone:
  burst arrives -> need MORE instances RIGHT NOW
  (and GPU instances start in minutes, Lesson 18)

Queue in front of autoscaling:
  burst arrives -> requests wait briefly in the queue
  -> autoscaling has time to catch up
  -> no request is REJECTED, just delayed
```

A queue turns "the system needs to react instantly" into "the system
needs to catch up eventually" — which matters enormously given how slow
GPU-backed cold starts actually are.

## The dead-letter queue

```
Normal flow:    job -> queue -> worker picks it up -> succeeds
Failing job:     job -> queue -> worker picks it up -> FAILS
                 -> retried a few times -> still fails
                 -> moved to a DEAD-LETTER QUEUE, set aside

Without a DLQ: a poison-pill job can block or endlessly
  retry, consuming worker capacity that healthy jobs need
```

One malformed or genuinely impossible request (corrupted input, a prompt
that reliably crashes the model) shouldn't be allowed to consume retry
attempts and worker time forever. A dead-letter queue sets it aside after
a few failed attempts, so the rest of the queue keeps moving and someone
can investigate the failure separately.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous request | Client's connection stays open until the response is ready |
| Asynchronous request | Client gets a job ID immediately; result is fetched later |
| Queue | Holds requests briefly so instances don't need to be instantly available |
| Dead-letter queue (DLQ) | Where jobs land after repeated failures, so they stop blocking the rest |

## Check yourself

You're ready for Lesson 21 when you can explain: why does a queue help
more for an AI workload specifically, given how slow a GPU-backed cold
start is compared to autoscaling a typical web service?
