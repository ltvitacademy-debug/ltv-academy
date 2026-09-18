# Lesson 30 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 7 · Capstone · Lesson 30 of 30**

## What you'll learn

- The arc of this entire 30-lesson Kafka course, one chapter group at a
  time
- Where this course closes out the Azure/Fabric Data Engineer path's
  Advanced stage
- Why finishing this course completes the *entire* Azure/Fabric Data
  Engineer path — both stages, all ten courses
- How to talk about the Lesson 29 capstone in a portfolio or an interview

## This course, start to finish

```
Ch1  Event Streaming Fundamentals   a durable log, not a queue; topics, producers, consumers
Ch2  Producing & Consuming          producer/consumer basics, consumer groups, delivery semantics
Ch3  Architecture Deep Dive         replication, partitioning strategy, retention, schema registry
Ch4  Connect & Stream Processing    Kafka Connect, Kafka Streams, ksqlDB, vs. Fabric Eventstreams
Ch5  Kafka in the Cloud             Confluent Cloud, Event Hubs' Kafka compatibility, monitoring
Ch6  Practical Patterns             a real pipeline, Snowflake & Databricks, error handling, security
Ch7  Capstone                       all of it, together, on one real event pipeline
```

This course assumed the windowing, watermark, and streaming concepts
Microsoft Fabric & Real-Time Analytics already taught, and used that
foundation to teach Kafka's own architecture on its own terms — the
vendor-neutral version of the same real-time ingestion idea, not a
re-teaching of streaming concepts from scratch.

## What the capstone actually proved

Lesson 29's project wasn't new material — it was proof that this whole
course's decisions actually compose into a real pipeline: a producer
built the way Lesson 25 established, a topic sized the way Lessons 12 and
13 taught, and error handling built the way Lesson 27 taught, all working
together on one real event stream. It's also the same shape as Career &
Capstone's Project 3 streaming fraud detector — proof this course's ideas
generalize past a single example.

## Where this leaves the Azure/Fabric Data Engineer path

This course was the last of four courses in the path's Advanced stage —
Git/GitHub/CI-CD, Terraform & Bicep, and Airflow were already built and
available in this catalog before this course started. Finishing Kafka
closes that stage out completely.

That, in turn, closes out the *entire* Azure/Fabric Data Engineer path:

| Stage | Courses |
|---|---|
| Job Ready | T-SQL Development, Data Engineering Foundations, Data Factory, Azure Databricks & Delta Lake, Microsoft Fabric & Real-Time Analytics, Data Engineering Career & Capstone |
| Advanced | Git/GitHub/CI-CD, Terraform & Bicep, Airflow, Kafka & Event Streaming (this course) |

Ten courses, both stages, all complete. This is the first course in this
catalog to close out an entire career path from both ends — the
foundational, job-ready skill set and the senior-level Advanced layer on
top of it.

## Presenting this in an interview

Career & Capstone's Lesson 80 already covered structuring a project story
— situation, design decisions, trade-offs, what you'd change. The same
structure applies to Lesson 29's capstone, with Kafka-specific decisions
worth naming out loud: why `clickstream` got 8 partitions and its DLQ got
1, why the producer chose `acks=all` plus idempotence over a faster but
less safe setting, and why a dead-letter topic instead of an infinite
retry loop.

## You're done

There's no "Check yourself" question this time — there isn't a next
lesson in this course, or a next course in this path's core sequence.
You're ready when you can open the capstone's producer and consumer code
and explain every configuration choice in it to someone else, including
why it's shaped the way it is.

Congratulations on finishing Kafka & Event Streaming — and with it, the
entire Azure/Fabric Data Engineer career path.
