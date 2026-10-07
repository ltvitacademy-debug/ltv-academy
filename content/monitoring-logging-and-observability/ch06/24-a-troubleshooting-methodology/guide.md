# A Troubleshooting Methodology

Chapters 1 through 5 gave you the raw material: metrics, logs, traces, the golden signals, PromQL, KQL, structured logging, OpenTelemetry. None of it troubleshoots anything by itself. This lesson gives you the method that turns a pile of telemetry into a diagnosis under pressure — and we'll run it against the incident this course has been building toward: a checkout-latency spike at **Northbridge Retail** during a flash-sale event.

## What you'll learn

- A repeatable narrowing method you can run during any incident, not just this one
- The USE method (Utilization, Saturation, Errors) for drilling into a single resource
- How to walk the Northbridge checkout-latency incident from page to root cause
- Why "check recent changes" belongs near the top of every investigation, not the bottom

## The method: narrow from symptom to cause

Troubleshooting under pressure fails most often not from lack of data, but from lack of order — people jump straight to their favorite dashboard instead of working outward from the symptom. Use this sequence every time:

1. **Confirm the symptom.** What is actually wrong, measured, not reported secondhand? "Checkout is slow" is not a symptom. "p99 checkout latency rose from 400ms to 6.2s at 9:02am" is.
2. **Check the golden signals for the affected service.** Latency, traffic, errors, saturation (Lesson 4). This tells you *which* of the four is driving the symptom before you guess at a cause.
3. **Check recent changes.** Deploys, config changes, feature flags, scaling events, and anything upstream (a dependency's deploy counts too). A huge share of production incidents trace back to something that changed in the prior few hours.
4. **Narrow by service, then by resource.** Use traces (Lesson 22) to find which service in the request path is actually slow, then apply the USE method to that service's resources.
5. **Form a hypothesis, then check it against the data** — don't act on a hunch until a metric, log, or trace supports it. Acting on an unverified hypothesis is how a 10-minute incident becomes a 90-minute one.

## The USE method: a fast way to drill into one resource

Once you've narrowed to a suspect service, Brendan Gregg's USE method gives you three questions to ask of every resource (CPU, memory, disk, network, a connection pool, a thread pool):

- **Utilization** — how busy is it? (CPU %, pool checkouts in use)
- **Saturation** — how much work is queued waiting for it? (run queue length, pool wait queue)
- **Errors** — is it failing outright? (connection timeouts, rejected connections)

A resource can be under-utilized and still be your bottleneck if saturation is high — a connection pool at 60% utilization with a long wait queue is saturated, not fine.

## Walking the Northbridge incident

Northbridge Retail's checkout service starts throwing elevated latency ten minutes into a flash sale. Here's the method in action:

- **Symptom:** p99 checkout latency 400ms → 6.2s; error rate unchanged. Confirmed from the dashboard, not a Slack message.
- **Golden signals:** latency is up, traffic is up (flash sale, expected), errors are flat, saturation on the checkout service's pods is elevated.
- **Recent changes:** no deploy in the last 24 hours to checkout itself — ruled out quickly, which redirects attention downstream instead of wasting time re-reviewing a deploy that isn't the cause.
- **Narrow by trace:** distributed traces show checkout's slow spans are almost entirely time spent waiting on a call to the inventory service.
- **USE on inventory's database connection pool:** utilization 95%, saturation high (requests queued waiting for a connection), errors low. The pool is undersized for flash-sale traffic — that's the bottleneck.
- **Hypothesis confirmed, fix applied:** the on-call engineer raises the pool size and adds a circuit breaker so checkout degrades gracefully next time instead of queuing indefinitely. The next two lessons cover how that response gets coordinated and documented.

## Key terms

- **USE method** — Utilization, Saturation, Errors; three questions to ask of any single resource
- **Golden signals** — latency, traffic, errors, saturation at the service level (Lesson 4)
- **Saturation** — how much work is queued waiting for a resource, distinct from how busy it is
- **Hypothesis-driven troubleshooting** — forming a theory and checking it against data before acting on it
