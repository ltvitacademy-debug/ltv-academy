# Lesson 41 — A Real-Time NYC Taxi Dashboard, Start to Finish · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

A real-time NYC taxi dashboard, start to finish — assembling every
piece from this chapter into one working system.

## S2 · STEPS CARD (the complete pipeline)

Eight stages, each one a lesson you've already built toward.
Source, eventstream ingestion, filtering and windowing, landing in
a KQL database, querying it, a dashboard, and an alert watching
over all of it.

## S3 · CODE CARD (the dashboard's core tile query)

The dashboard's core tile query combines the tile mechanism,
tumbling bin, and the where operator into one rolling
fifteen-minute view, refreshing every minute.

## S4 · CODE CARD (the Activator rule)

The activator rule watching it uses a change rule, not a
threshold — firing once per trip that crosses two hundred dollars,
not repeatedly while a high fare is still technically current.

## S5 · OUTRO CARD

Done means every layer working together — filtered, windowed,
dashboarded, and alerted correctly. Miss one, and something goes
quietly wrong downstream. Next up: the full chapter recap.
