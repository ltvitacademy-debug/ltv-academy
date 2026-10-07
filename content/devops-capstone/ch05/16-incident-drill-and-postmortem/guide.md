# Incident Drill & Postmortem

Monitoring and alerting are only worth what they do during an actual incident. This lesson runs a game-day drill that reproduces a real flash-sale outage against the infrastructure you built in Phases 1 through 3, diagnoses it using the exact Grafana dashboards and SLO from Lesson 14, and closes with a blameless postmortem that turns the incident into concrete, owned action items.

## What you'll learn

- How to replay flash-sale load against `checkout` and watch its p99 latency degrade in real time
- How to use the golden signals and the USE method to find the actual bottleneck instead of guessing
- Why the alerting gap — not just the latency spike — was part of the incident
- How to write a blameless postmortem with a timeline, impact numbers, and owned action items

## Setting up the drill

The game day replays a real incident that already happened once at Northbridge: during a flash sale, `checkout`'s traffic spiked well beyond normal load, and it called out to the existing legacy inventory service (running elsewhere, outside this capstone) on every stock check. A load-testing job ramps synthetic checkout traffic against `northbridge-staging` to the same order of magnitude:

```
# drill: ramp checkout traffic to flash-sale volume
k6 run --vus 400 --duration 10m load/checkout-flash-sale.js
```

## Diagnosing with the golden signals

The first signal is the one Lesson 14 built an alert for — but in the original incident, the only existing alert was a full-exhaustion alert on the inventory connection pool, which fired too late. Dashboards show the real story first:

```
# checkout p99, during the drill
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket{service="checkout"}[5m])) by (le)
)
# -> climbs from ~400ms baseline to 6.2s
```

p99 climbing while request rate stays flat points at saturation somewhere downstream, not at checkout's own code. That's where the **USE method** (Utilization, Saturation, Errors) comes in — applied specifically to the inventory service's database connection pool, the actual bottleneck:

```
# inventory DB connection pool: in-use connections vs. pool max
inventory_db_pool_in_use / inventory_db_pool_max

# inventory DB connection pool: wait-queue depth (the saturation signal)
inventory_db_pool_wait_queue_depth
```

The pool was undersized and had never been load-tested for flash-sale volume. Once it saturated, every `checkout` request waiting on an inventory stock check queued behind it, and `checkout`'s own latency — not inventory's — is what paged on-call, because that's where the user-facing symptom showed up.

## The timeline

```
14:02  Flash sale traffic begins; checkout p99 starts climbing
14:04  checkout p99 crosses 2s (SLO burn threshold) — no alert fires yet,
       because only a full pool-exhaustion alert exists
14:09  inventory DB pool fully exhausted; full-exhaustion alert finally fires
14:21  On-call finishes live trace discovery, identifies inventory pool
       as root cause (12 minutes spent tracing, no runbook pointed there)
14:36  Pool size increased, inventory calls shed via circuit breaker;
       checkout p99 returns to baseline
```

**Impact**: checkout p99 latency exceeded 2s for 34 minutes, affecting an estimated 4,100 customer sessions, with 220 abandoned carts above baseline.

## Writing the blameless postmortem

A blameless postmortem asks "what in the system allowed this?" — never "who caused this?" The fix has two parts: raise the inventory pool size, and add a circuit breaker so `checkout` degrades gracefully instead of hanging on a saturated dependency.

```markdown
# docs/postmortems/2026-flash-sale-checkout-latency.md

## Summary
checkout p99 latency exceeded 2s for 34 minutes during a flash sale,
driven by inventory service DB connection pool saturation.

## Impact
~4,100 customer sessions affected; 220 abandoned carts above baseline.

## Root cause
inventory's DB connection pool was undersized and never load-tested
for flash-sale volume. Saturation queued every checkout request
waiting on a stock check.

## Contributing factor
No saturation-based alert existed on the inventory pool — only a
full-exhaustion alert, which fired after the damage was already done.
The on-call runbook didn't point at inventory's pool, costing ~12
minutes of live trace discovery.

## Action items
- [ ] Add a saturation-based alert on inventory-db pool wait-queue
      depth. Owner: Priya Anand. Due: before next scheduled flash sale.
- [ ] Add a circuit breaker to checkout's inventory client so it
      degrades gracefully instead of hanging. Owner: Marcus Webb.
      Due: before next scheduled flash sale.
- [ ] Raise inventory's DB connection pool size and load-test it
      at flash-sale volume. Owner: Priya Anand. Due: 2 weeks.
- [ ] Update the on-call runbook to point at inventory's pool as a
      known checkout-latency root cause. Owner: Marcus Webb. Due: 1 week.
```

Every action item has an owner and a date — a postmortem without both is a list of good intentions, not a fix.

## Key terms

- **Game day / incident drill** — a deliberate, scheduled rehearsal of a real incident against real infrastructure, used to test monitoring and response, not just the code
- **Golden signals** — the RED-method signals (rate, errors, duration) read together to spot an anomaly
- **USE method** — Utilization, Saturation, Errors — a framework for diagnosing a resource bottleneck like a connection pool
- **Saturation-based alert** — an alert that fires as a resource approaches its limit, instead of only after it's fully exhausted
- **Blameless postmortem** — an incident write-up focused on systemic causes and owned action items, never individual blame
