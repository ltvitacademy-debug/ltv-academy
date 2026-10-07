# Script — The Golden Signals

## Segment 1 (title)

If you could only watch four numbers for any service, which four would tell you the most? The Google SRE book calls these the four golden signals: latency, traffic, errors, and saturation.

## Segment 2 (steps)

Latency is time to service a request — and you have to track successful and failed latency separately, or a fast failure can hide inside a healthy-looking average. Traffic is demand on the system, like requests per second. Errors is the rate of failed requests, including implicit failures like a 200 response with the wrong content, not just status codes. Saturation is how full the service is relative to capacity — and it's often your earliest warning.

## Segment 3 (code)

Here's why splitting latency matters. A blended average of 180 milliseconds looks fine, but that's hiding successful requests taking 650 milliseconds and failed ones returning in just 8 — the fast failures are dragging the average down and masking a real problem.

## Segment 4 (steps)

Watch how this plays out during Northbridge's flash sale. Traffic spikes as the sale starts. Saturation climbs as the connection pool fills. Only then do latency and errors climb, once the pool is actually exhausted. Saturation gave the earliest warning, before anything looked broken yet.

## Segment 5 (outro)

Four signals, watched together, catch most real incidents before they fully land. Next up, lesson five: alerting philosophy.
