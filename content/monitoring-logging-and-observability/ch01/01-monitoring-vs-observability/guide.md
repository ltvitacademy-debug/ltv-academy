# Monitoring vs. Observability

Welcome to Monitoring, Logging & Observability — the course where you learn to answer the question every on-call engineer eventually dreads: "why is it slow, and what do I do about it?" Before you touch a single dashboard, you need to understand two words that get used almost interchangeably in job postings and almost never correctly: **monitoring** and **observability**. They are not the same thing, and the difference matters every time something breaks in a way nobody predicted.

Throughout this course you'll follow **Northbridge Retail**, a mid-size e-commerce company modernizing its infrastructure. Northbridge's checkout service is the running example — by Chapter 6 you'll use it to work a real incident: a latency spike during a flash sale.

## What you'll learn

- The real difference between monitoring and observability, not the marketing version
- Why "known unknowns" vs. "unknown unknowns" is the cleanest way to tell them apart
- Why modern distributed systems (microservices, containers, serverless) made observability necessary, not just nice to have
- Where this course is headed, chapter by chapter

## Monitoring: watching for what you already expect

Monitoring is the practice of collecting predefined signals — CPU usage, request count, error rate, disk space — and comparing them against thresholds you set in advance. A monitoring system answers questions you already knew to ask: "Is CPU over 90%?" "Did the health check fail?" "Is the queue backing up?"

This works well when your failure modes are known. If Northbridge's checkout service has crashed before because the database connection pool ran out, you add a dashboard panel and an alert for connection pool usage. The next time it happens, you get paged before customers notice. That's monitoring doing its job.

The catch: monitoring can only watch for the questions you thought to ask ahead of time. It is built around **known unknowns** — things you know you need to watch, even though you don't know when they'll go wrong.

## Observability: being able to ask new questions

Observability is a property of a system, not a tool you install. A system is observable when you can understand its internal state — any part of it — just from the data it produces externally, without shipping new code to add a new metric. The payoff is that you can answer questions you never anticipated.

Say Northbridge's checkout latency spikes during a flash sale, and it turns out the cause is one specific product's image CDN timing out, which only affects users in one region, on mobile, during peak cart-abandonment retries. Nobody wrote a dashboard panel for that in advance — it's an **unknown unknown**. An observable system lets you discover it by slicing and correlating the data you already have (metrics, logs, and traces — the subject of the next lesson), rather than redeploying with new instrumentation and waiting for it to happen again.

## Why this distinction matters now

A decade ago, most applications ran as a handful of large services on known servers, so most failure modes really were knowable in advance — monitoring alone got you far. Modern systems at a company like Northbridge are different: dozens of microservices, containers that get rescheduled, autoscaling that changes which instance handled a request, and third-party dependencies you don't control. The number of possible failure combinations explodes, and you can't pre-build a dashboard for every one of them.

That's why "observability" stopped being a buzzword and became a job requirement: teams need systems that are instrumented richly enough, and tools flexible enough, to investigate problems nobody predicted. Monitoring still matters — you still want alerts for known failure modes — but it's no longer sufficient by itself.

## Where this course goes

- **Chapter 1** (this chapter) builds the vocabulary: the three pillars, SLIs/SLOs, golden signals, and alerting philosophy.
- **Chapters 2–3** cover cloud-native tooling: Azure Monitor and AWS CloudWatch.
- **Chapter 4** covers the open-source stack most teams actually run day to day: Prometheus and Grafana.
- **Chapter 5** goes deep on logging and tracing, and on correlating all three pillars together.
- **Chapter 6** puts it all to work on a real incident at Northbridge Retail.
- **Chapter 7** is your capstone: you instrument and monitor a service of your own.

## Key terms

- **Monitoring** — collecting predefined signals and alerting on known thresholds; answers known unknowns
- **Observability** — a system property that lets you investigate novel problems from the data it already emits; answers unknown unknowns
- **Known unknown** — a failure mode you anticipated and built a check for
- **Unknown unknown** — a failure mode nobody anticipated until it happened
