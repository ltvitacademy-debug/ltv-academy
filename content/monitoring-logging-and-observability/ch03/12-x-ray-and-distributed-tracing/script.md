# Script — X-Ray & Distributed Tracing

## Segment 1 (title)

Logs Insights can tell you a checkout request took four seconds. It's much weaker at telling you where those four seconds actually went — was it the database, the payment gateway, or the service's own code? That's the gap AWS X-Ray fills, tracing a request across every service boundary it crosses.

## Segment 2 (screenshot)

X-Ray builds a service map automatically from the traces it collects — no separate architecture diagram required. Each node's color reflects its health: green for successful calls, red for faults, yellow for client errors. It's conceptually the same idea as Azure's Application Map from Chapter 2, just AWS's version of the same concept.

## Segment 3 (screenshot)

Clicking into one specific trace shows a timeline of every segment and subsegment that request touched, stacked to show how they overlapped or waited on each other. If checkout took four seconds and the payment gateway subsegment alone took three point eight of them, you've found your answer without touching a single log line.

## Segment 4 (steps)

Each service a request passes through records a segment for the work it did; a segment can break down further into subsegments, like one call to the inventory database and a separate one to the payment gateway. Tracing every single request would be expensive to store and mostly redundant, so sampling rules trace a representative subset — by default, the first request each second plus five percent of the rest — while still letting you always trace error responses regardless of the sampling rate.

## Segment 5 (outro)

Segments, subsegments, a service map built from real traffic, and configurable sampling — that's how X-Ray turns "it was slow" into "here's exactly which hop was slow." Next up, lesson thirteen: CloudTrail and audit logging, for who did what in your AWS account.
