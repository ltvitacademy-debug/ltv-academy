# Lesson 18 — Load Testing That Actually Predicts Production Behavior

**Chapter 5 · Capacity Planning and Performance Engineering · Lesson 2 of 4**

## What you'll learn

- Why hammering a single endpoint with uniform synthetic requests is
  the single most common mistake that makes a load test misleading
- How to build a request mix, think time, and data variety that
  actually resembles real production traffic
- Why ramp-up shape and soak duration change what a load test can
  tell you, and what each one actually catches
- How to treat a load test's result as a real go/no-go signal instead
  of a vanity number

## The mistake that makes most load tests lie to you

The most common load-testing failure isn't a missing tool or a
misconfigured script — it's testing the wrong thing. A load test that
fires an identical request at a single endpoint as fast as possible,
with no variation and no think time, measures something real, but
that something is "how fast can this one code path serve an
unrealistic, perfectly-cacheable, perfectly-uniform stream of
identical requests" — not "how does this system behave under
production load." Production traffic is never that uniform, and a
test built around uniform traffic routinely passes while the real
system falls over in production under a traffic mix the test never
exercised.

## Build the request mix from real production data

A load test that predicts production behavior starts from the same
place a capacity forecast does: real data, this time from access logs
or APM traces rather than a monitoring dashboard. Pull the actual
distribution of endpoints hit, their relative frequency, and their
payload sizes over a representative recent window, and reproduce that
mix in the test — not every endpoint at equal weight, but the real
80/20 (or worse) skew most systems actually have. A checkout flow
that's 60% product-page views, 25% cart operations, and 5% actual
purchases exercises completely different caching, database, and
payment-gateway paths than a test that sends those three request
types in equal proportion.

## Realistic traffic has think time, sessions, and data variety

Three details separate a realistic load test from a synthetic
hammer:

- **Think time** — real users pause between actions; a test with zero
  think time concentrates load unnaturally and can make connection
  pools and rate limiters behave nothing like they do in production.
- **Session correlation** — a real user logs in once, then makes a
  sequence of related requests carrying that session's state. A test
  that treats every request as independent misses cache and session
  behavior entirely.
- **Data variety** — real requests hit a spread of cache-hit and
  cache-miss keys, and a spread of database rows, not the same single
  "hot" record over and over. Testing against one record flatters
  cache hit rate and database performance in a way production will
  never match.

## Ramp-up shape and soak duration test different failure modes

How load arrives matters as much as how much arrives. A test that
jumps instantly to peak load checks whether autoscaling and
connection pools can absorb a sudden spike — useful, but it's not the
only failure mode. A gradual ramp that mirrors how traffic actually
builds during a real event reveals different problems, like a slow
resource leak that only shows up after sustained load. That's what a
**soak test** — running at a steady realistic load for hours rather
than minutes — is specifically for: memory leaks, connection pool
exhaustion, log disk fill-up, and certificate or token expiry under
load are failure modes that only appear after sustained operation, not
in the first ninety seconds of any test.

## Treat the result as a go/no-go signal, not a vanity metric

A load test that reproduces realistic traffic produces a result worth
acting on: the latency percentiles, error rate, and resource
utilization it reports at the forecasted peak (plus headroom, from the
previous lesson) are a real signal about whether the system is ready.
If p99 latency blows past its SLO target, or error rate climbs, or a
downstream dependency saturates under the realistic mix — that's a
finding to fix before the real event, not an unfortunate afterthought
to discover live. A load test that only ever reports "requests per
second it could technically serve," with no realistic mix behind it,
tells you much less than it looks like it does.

## Key terms

| Term | Meaning |
|---|---|
| Request mix | The relative frequency and type distribution of requests that matches real production traffic, not a uniform synthetic stream |
| Think time | The pause between a simulated user's actions, modeling how real users actually behave rather than firing requests back-to-back |
| Session correlation | Modeling a sequence of related requests tied to one simulated user/session, instead of treating every request as independent |
| Soak test | A load test run at steady realistic load for an extended duration, built to surface failure modes that only appear under sustained operation |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
does a load test that hammers one endpoint with uniform, identical
requests routinely pass while the real system fails in production,
and what three characteristics of real traffic does a realistic load
test need to reproduce to actually predict that production behavior?
