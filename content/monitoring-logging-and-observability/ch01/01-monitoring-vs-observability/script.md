# Script — Monitoring vs. Observability

## Segment 1 (title)

Welcome to Monitoring, Logging and Observability. Before you touch a single dashboard, you need two words straight: monitoring and observability. They get used interchangeably in job postings, and they are not the same thing.

## Segment 2 (steps)

Monitoring collects predefined signals and alerts when they cross a threshold you set in advance — it answers questions you already knew to ask. Observability is different: it's a property of the system itself, letting you understand what's happening inside it from the data it already emits, even for a problem nobody predicted. One handles known unknowns. The other handles unknown unknowns.

## Segment 3 (steps)

This distinction didn't matter as much a decade ago, when most apps ran as a few large services on known servers. Northbridge Retail, our running example company, runs dozens of microservices with autoscaling and third-party dependencies — the number of possible failure combinations explodes, and you simply can't pre-build a dashboard for every one of them. That's why observability became a requirement, not a buzzword.

## Segment 4 (steps)

Here's where this course is headed. Chapters one through four build your vocabulary and cover the tools — Azure Monitor, CloudWatch, Prometheus and Grafana. Chapters five and six go deep on logging, tracing, and correlating all three signals during a real incident at Northbridge. Chapter seven is your capstone, where you instrument and monitor a service of your own.

## Segment 5 (outro)

Keep that distinction in your head: monitoring watches for what you expect, observability lets you ask questions you didn't. Next up, lesson two: the three pillars — metrics, logs, and traces.
