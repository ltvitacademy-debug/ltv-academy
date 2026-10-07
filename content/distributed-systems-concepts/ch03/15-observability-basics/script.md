# Script — Observability Basics

## Segment 1 (title)

Lesson fourteen covered how a system protects itself from overload. This lesson covers how you actually find out what's happening inside that system at all — especially once a single request spans many services, none of which any one person can watch directly.

## Segment 2 (steps)

Logs are discrete, timestamped records of individual events — detailed, but overwhelming at scale and hard to correlate on their own. Metrics are aggregated numbers over time, like requests per second or error rate — cheap to store, great for dashboards, but they tell you that something's wrong, not why. Traces record one request's actual path through multiple services. Real systems need all three together.

## Segment 3 (steps)

On one machine, you can read a log file and see what happened. In a distributed system, placing one order might touch a web server, an auth service, inventory, payment, and a queue, each a separate process. Distributed tracing reconstructs that whole journey as one connected timeline. Without it, finding out why one request was slow means manually cross-referencing five different services' logs and hoping the timestamps line up.

## Segment 4 (code)

What makes tracing possible is the correlation ID — a unique identifier generated when a request first arrives, and passed along with every call it triggers across every service. Each service logs that same ID next to its own work. Afterward, you filter every log line and trace span by that one ID and get the complete path of a single request, out of what would otherwise be a pile of disconnected logs.

## Segment 5 (steps)

Monitoring means watching a known set of metrics and alerting when they cross a known threshold — it answers questions you thought to ask in advance. Observability is broader: the ability to ask new questions you never anticipated, using the logs, metrics, and traces you already collected. Monitoring tells you something is wrong. Observability helps you figure out why, even for a problem nobody wrote an alert for.

## Segment 6 (outro)

Logs, metrics, and traces each answer a different question, and correlation IDs tie them into one story across every service a request touches. Next, lesson sixteen: a full case study that brings observability and nearly everything else from this course together in one scenario.
