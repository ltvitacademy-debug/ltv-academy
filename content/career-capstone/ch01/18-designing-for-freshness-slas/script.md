# Lesson 18 — Designing for Data Freshness SLAs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Designing for data freshness SLAs — turning "near real-time" into an
actual number a pipeline can be measured against.

## S2 · CODE CARD (a real SLA)

"Near real-time" is marketing language. A real freshness SLA is
checkable: data is never more than N minutes older than the event
that produced it. That's a non-functional requirement, and like any
non-functional requirement, it's worthless until it's a number.

## S3 · CODE CARD (the processing model sets the ceiling)

The batch, streaming, or hybrid choice from Lesson 5 caps what's even
achievable before any pipeline code exists. Nightly batch means hours
of staleness. True event streaming means seconds. You can't promise a
five-minute SLA on top of a nightly job.

## S4 · CODE CARD (freshness costs money)

Lower latency generally means compute running continuously instead of
spinning up once a night. The real question isn't how fresh you can
make something — it's how fresh this specific consumer needs it, and
whether anyone's willing to pay for that.

## S5 · OUTRO CARD

Freshness is measured as event time to available time, and watermarks
decide how long to wait for late data. Next up: the CAP theorem, for
data engineers.
