# Script — Centralized Logging With ELK & Loki

## Segment 1 (title)

Structured logs only help if you can search them, and at Northbridge Retail's scale — dozens of autoscaled pods whose log files vanish the moment they're rescheduled — you can't SSH into every box and grep. Centralized logging ships every line into one searchable system instead, so finding every error in the last ten minutes is a query, not an expedition.

## Segment 2 (steps)

The ELK stack is three pieces working together. Logstash or Filebeat collects and ships logs off each host, parsing and enriching them along the way. Elasticsearch indexes the full content of every line, so nearly every field is searchable. And Kibana is the web UI on top — its Discover screen is where most day-to-day log investigation actually happens.

## Segment 3 (screenshot)

Here's that Discover view: a query bar using Kibana's query language, a histogram of document volume over time, and a scrolling table of matching log entries below it. That histogram is often your first visual clue something broke — a sudden spike in volume before you've even read a single log line.

## Segment 4 (code)

Grafana Loki takes a different approach, often described as Prometheus for logs. It only indexes a small set of labels — service, environment — and keeps the raw text in cheap compressed chunks. LogQL queries narrow by those labels first, then text-search within that already-small set, which keeps storage costs far lower than indexing every word of every line.

## Segment 5 (outro)

Teams already living in Grafana and Prometheus reach for Loki because it's the same UI as their metrics, and it's cheaper to run at scale. Teams with heavier text-search needs, or who need Elasticsearch anyway, lean ELK. Next, lesson twenty-two: OpenTelemetry and distributed tracing — following one request across every service it touches.
