# The Golden Signals

If you could only watch four numbers for any service, which four would tell you the most? Google's Site Reliability Engineering book answers this with what it calls the **four golden signals**: latency, traffic, errors, and saturation. They're not the only things worth monitoring, but they're the highest-value starting point for almost any service — including Northbridge Retail's checkout service.

## What you'll learn

- The precise definition of each of the four golden signals
- Why latency needs to be split into successful vs. failed request latency
- A concrete example of each signal measured on Northbridge's checkout service
- Why these four, together, catch most real-world incidents

## Latency

**Latency** is the time it takes to service a request. The critical nuance: you must track successful request latency separately from failed request latency. A failed request that returns instantly (a fast "500 Internal Server Error") can drag your average latency down and hide a real problem — it looks fast, but it's fast because it's broken. For Northbridge's checkout, track "time to complete a successful checkout" and "time to return an error" as two separate numbers, not one blended average.

## Traffic

**Traffic** is a measure of how much demand is being placed on the system — requests per second for a web service, transactions per second for a database, concurrent connections for a streaming service. Traffic matters on its own (is this normal load or a flash-sale spike?) and as context for every other signal: a latency increase at 10x normal traffic means something very different than the same increase at normal traffic.

## Errors

**Errors** is the rate of requests that fail, whether explicitly (HTTP 500s) or implicitly (an HTTP 200 response with the wrong content, or a response that violates an agreed contract). Implicit errors are easy to miss if you only count status codes — Northbridge's checkout could return "200 OK" with an empty cart due to a bug, and a status-code-only error metric would never catch it.

## Saturation

**Saturation** measures how "full" a service is relative to its capacity — CPU utilization, memory usage, queue depth, or percentage of a connection pool in use. Saturation is often the earliest warning signal: a connection pool at 95% utilization is a leading indicator that latency and errors are about to spike, even though neither has happened yet. This is exactly the metric that would have given Northbridge advance warning before the flash-sale checkout incident this course keeps returning to.

## Why these four, together

Each signal alone misses things. High traffic alone isn't a problem. High saturation alone might be fine if traffic is also high and expected. But watched together, they tell a story: traffic spikes (flash sale starts) → saturation climbs (connection pool filling) → latency climbs (requests start queuing) → errors climb (pool exhausted, requests start failing). That sequence is almost exactly what happens during Northbridge's incident in Chapter 6, and the four golden signals are what let the on-call engineer see it coming, not just react after the fact.

## Key terms

- **Latency** — time to service a request; track success and failure latency separately
- **Traffic** — demand placed on the system, e.g. requests per second
- **Errors** — rate of failed requests, including implicit failures (wrong content) not just explicit status codes
- **Saturation** — how full a service is relative to capacity; often the earliest warning signal
