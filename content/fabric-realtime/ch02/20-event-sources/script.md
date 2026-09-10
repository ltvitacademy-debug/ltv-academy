# Lesson 20 — Event Sources: Azure Event Hubs and IoT Hub · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Where do real events actually come from? Azure Event Hubs and
IoT Hub.

## S2 · CODE CARD (Event Hubs)

Azure Event Hubs is a managed service built specifically to
ingest massive volumes of events, from many producers at once, in
real time. This is genuinely different from Autoloader, which
watched files already sitting in storage — Event Hubs receives
events being produced right now.

## S3 · CODE CARD (IoT Hub)

IoT Hub does a similar job, but adds device identity management
and the ability to send commands back to a device — real
infrastructure for connected devices. For this course's simulated
taxi events, with no real physical devices, Event Hubs alone is
the simpler, sufficient choice.

## S4 · CODE CARD (simulating the stream)

And this course simulates that stream directly — a script
publishes one event per simulated trip, standing in for what a
real taxi fleet's dispatch system would actually produce
continuously.

## S5 · OUTRO CARD

A real broker, receiving real events, right now. Next lesson:
Eventhouse and KQL database, where these events actually land.
