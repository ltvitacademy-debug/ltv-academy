# Lesson 7 — The Kappa Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

The kappa architecture — solving lambda's real cost by refusing to
have two codepaths in the first place.

## S2 · CODE CARD (one codepath, not two)

Lambda maintains speed layer code and batch layer code, two
implementations of the same aggregation. Kappa uses one streaming
pipeline for both live processing and historical reprocessing, by
replaying old events.

## S3 · CODE CARD (what Kappa requires)

That only works if the source can actually be replayed — enough
retention to go back far enough, or raw events durably stored
somewhere replayable. Without that, there's nothing to replay.

## S4 · OUTRO CARD

Kappa is usually preferred when available, since it avoids
lambda's drift risk entirely. Next up: data modeling at scale —
from processing model to data model.
