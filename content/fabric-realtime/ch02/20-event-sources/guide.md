# Lesson 20 — Event Sources: Azure Event Hubs and IoT Hub

**Chapter 2 · Real-Time Data Engineering · Lesson 20 of 70**

## What you'll learn

- Azure Event Hubs: a real message broker, purpose-built for high-throughput ingestion
- IoT Hub: Event Hubs' close cousin, purpose-built for connected devices
- Connecting either as an Eventstream source
- Simulated NYC Taxi trip events, as this course's own stand-in for a live fleet

## Azure Event Hubs — a real message broker

**Azure Event Hubs** is a managed service built specifically to
ingest massive volumes of events — millions per second, at real
production scale — from many producers at once. This is genuinely
different infrastructure from anything Databricks & Delta Lake's
material touched: that course's Autoloader (Lesson 32) watched
files already sitting in storage; Event Hubs receives events being
actively produced, right now, by some external system.

## IoT Hub — Event Hubs' close cousin

**IoT Hub** does a similar ingestion job, purpose-built specifically
for connected devices: it adds device identity management,
bi-directional communication (sending commands back to a device,
not just receiving from it), and device-specific security that
Event Hubs alone doesn't provide. For this course's own purposes —
simulated taxi trip events, not real physical devices with
commands to send — Event Hubs is the simpler, sufficient choice.

## Connecting one as an Eventstream source

1. In an Eventstream's canvas (Lesson 19), select **Add source**.
2. Choose **Azure Event Hubs**, and provide a connection string
   (from an existing Event Hub, or a new one created for this
   course).
3. The source node now streams every event arriving at that Event
   Hub directly into the Eventstream canvas, ready for
   transformations and destinations.

## Simulating NYC Taxi trip events

This course's own NYC Taxi data, used as static files throughout
Chapters 1–2 of the Databricks & Delta Lake course, becomes a
genuine **event stream** here: a small script (or Fabric's own
sample-data source, for testing) publishes one event per simulated
trip — a pickup, in real time — to an Event Hub, standing in for
what a real taxi fleet's dispatch system would actually produce
continuously. The rest of this chapter builds against this exact
simulated stream.

## Key terms

| Term | Meaning |
|---|---|
| Azure Event Hubs | A managed broker for high-throughput event ingestion from many producers |
| IoT Hub | Event Hubs' cousin, adding device identity and bi-directional communication |
| Simulated stream | This course's NYC Taxi data, replayed as one event per trip |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why
is IoT Hub the wrong choice for this course's simulated taxi trip
events, even though it could technically work?
