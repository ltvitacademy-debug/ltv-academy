# Observability Basics

Lesson 14 covered how a system protects itself from overload. This lesson covers how you actually find out what's happening inside that system at all — especially once a request can span many separate services, none of which any one person can watch directly.

## What you'll learn

- The three pillars of observability: logs, metrics, and traces
- Distributed tracing, and why a single request needs it in a distributed system
- Correlation IDs as the thread that ties a request together across services
- The difference between monitoring and observability

## The three pillars

- **Logs** — discrete, timestamped records of individual events ("user 4821 logged in at 14:02:03," "payment service returned error code 503"). Detailed, but can be overwhelming at scale and hard to correlate across services on their own.
- **Metrics** — aggregated numeric measurements over time (requests per second, average latency, error rate, queue depth). Cheap to store and great for dashboards and alerting, but they summarize — they tell you *that* something is wrong, not necessarily *why*.
- **Traces** — the record of a single request's path as it travels through multiple services, showing how long it spent in each one. Traces are what let you answer "where, specifically, did this one slow request lose its time?"

Each pillar answers a different question, and real systems need all three together — logs for detail, metrics for trends and alerting, traces for understanding one request's actual path.

## Distributed tracing

In a single-machine application, you can often just read through one log file or attach a debugger to see what happened. In a distributed system, a single user action — say, placing an order — might touch a web server, an authentication service, an inventory service, a payment service, and a message queue, each running as a separate process, possibly on separate machines. **Distributed tracing** reconstructs that entire journey as one connected timeline, showing which service called which, how long each step took, and where the time actually went. Without it, diagnosing "why was this one request slow" would mean manually cross-referencing logs from five different services and hoping the timestamps line up.

## Correlation IDs: the thread that ties it together

The mechanism that makes distributed tracing possible is the **correlation ID** (also called a trace ID): a unique identifier generated when a request first enters the system, and passed along with every subsequent call that request triggers, across every service it touches. Each service logs that same ID alongside its own work. Afterward, you can pull every log line and trace span that shares one correlation ID and reconstruct the complete path of that single request — exactly the mechanism that turns a pile of disconnected per-service logs into one coherent story.

## Monitoring vs. observability

**Monitoring** means watching a predefined set of metrics and alerting when they cross a known threshold — it answers questions you thought to ask in advance ("is error rate above 5%?"). **Observability** is the broader property of being able to ask *new* questions about your system's behavior that you didn't anticipate when you built it, using the logs, metrics, and traces you've already collected ("why are only requests from this specific customer, on this specific code path, slow — a pattern nobody wrote an alert for"). Good monitoring tells you something is wrong. Good observability helps you figure out why, even for a problem you never saw coming.

## Key terms

- **Logs** — discrete, timestamped records of individual events
- **Metrics** — aggregated numeric measurements over time
- **Traces** — the recorded path and timing of a single request across multiple services
- **Correlation ID (trace ID)** — a unique identifier passed through every service a single request touches, used to reconstruct its path
- **Monitoring** — watching known metrics against known thresholds; **observability** — the ability to investigate unanticipated questions using collected data

## Recap

Logs, metrics, and traces each answer a different question about a distributed system, and correlation IDs are what connect them into one coherent story spanning every service a single request touches. Next, in Lesson 16, you'll see a full case study that brings together observability and nearly every other concept from this course in one realistic scenario.
