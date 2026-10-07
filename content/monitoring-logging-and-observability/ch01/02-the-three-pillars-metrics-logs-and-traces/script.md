# Script — The Three Pillars: Metrics, Logs & Traces

## Segment 1 (title)

If observability means understanding a system from the data it produces, this lesson answers: what data? The industry has settled on three types — metrics, logs, and traces — the three pillars of observability.

## Segment 2 (steps)

Metrics are numbers sampled over time — requests per second, latency, queue depth. They're cheap and fast, great for dashboards and alerts, but they can't tell you why. Logs are timestamped records of single events, carrying rich detail like exact error messages — but a busy service produces millions of them, so finding the right one takes the right tooling. Traces follow one request across every service it touches, broken into timed segments called spans, showing exactly where time was spent.

## Segment 3 (code)

Here's what a trace actually looks like for one checkout request at Northbridge: twelve milliseconds in the API gateway, eight in the cart service, then eight hundred sixty milliseconds in the pricing service — that's clearly the problem — and forty-five more in the payment gateway.

## Segment 4 (steps)

Put the three together on Northbridge's flash-sale incident. A metric dashboard shows checkout latency spiking at 2:14 — something's wrong, and roughly when. A trace for a slow request shows the delay is concentrated in one span, the call to the pricing service. A log line from that exact service, at that exact timestamp, shows a connection pool exhaustion error. Metrics told you when and how bad. The trace told you where. The log told you exactly why.

## Segment 5 (outro)

No single pillar gets you there alone — it's the correlation between them that does. Next up, lesson three: SLIs, SLOs, and error budgets.
