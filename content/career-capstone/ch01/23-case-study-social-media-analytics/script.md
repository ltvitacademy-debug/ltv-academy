# Lesson 23 — Case Study: A Social Media Analytics Pipeline · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Case study: a social media analytics pipeline — where volume, not
complexity, is the entire design problem.

## S2 · CODE CARD (estimate the scale)

A hundred million daily users at fifty engagement events each is
around five billion events a day, roughly fifty-eight thousand a
second on average — and a viral moment can spike that a hundredfold
on a handful of posts.

## S3 · CODE CARD (sharding by content_id)

A naive design shards by time bucket, and every write for today's
one viral post piles onto one bucket. Sharding by hashed content_id
spreads even a viral post's writes across every shard instead of one.

## S4 · CODE CARD (caching the leaderboard)

A trending leaderboard is read far more often than it's written.
Compute it from the streaming aggregation every ten to fifteen
seconds, and serve every read from that cache instead of recomputing
it per request.

## S5 · OUTRO CARD

A like count that's a few seconds stale is invisible; a pipeline that
goes down during a spike is not — this platform leans AP exactly as
Lesson 19 predicts. Next up: presenting a system design in an
interview.
