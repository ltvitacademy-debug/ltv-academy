# Reducing Alert Fatigue

An on-call engineer who gets paged 40 times a week, most of which turn out to be nothing, stops trusting pages. Eventually they stop responding quickly to all of them — including the one that matters. **Alert fatigue** is one of the most common and most preventable causes of a slow incident response, and it's a direct result of how alerts were designed, not a personal failing of whoever's on call. This lesson covers why it happens and the real fixes.

## What you'll learn

- The real causes of alert fatigue, not just "too many alerts"
- Symptom-based vs. cause-based alerting, and why symptom-based wins
- What makes an alert actionable instead of merely informative
- How SLO-based alerting (from Lesson 3) cuts noise at the source

## Why alert fatigue happens

- **Alerting on causes instead of symptoms.** An alert fires for "CPU above 80%" even when nothing customer-facing is actually affected. High CPU isn't inherently bad — slow checkouts are. Cause-based alerts fire constantly because the underlying condition fluctuates even when nothing is wrong.
- **Non-actionable alerts.** An alert that fires but has no clear response ("disk usage trending up slowly") trains people to dismiss alerts on reflex, because this one never requires anything.
- **Wrong severity or urgency.** Paging someone awake for something that could wait until business hours (and vice versa — a quiet Slack message for something that's actively losing money) miscalibrates what a page is supposed to mean.
- **No grouping or deduplication.** One root cause that triggers twelve alerts across twelve affected services looks like twelve problems, not one — the responder spends the first ten minutes just realizing they're the same incident.

## The fix: symptom-based, actionable, SLO-driven

- **Alert on symptoms, not causes.** Page on "checkout latency p99 exceeds 2s for 5 minutes" (a symptom users feel), not "CPU exceeds 80%" (a cause that might not matter). The golden signals from Lesson 4 are symptom-level by design — that's exactly why they make good alert targets.
- **Make every alert actionable.** If an alert fires and there's nothing a human needs to do right now, it shouldn't page anyone — route it to a dashboard or a daily digest instead. The test: "if I'm woken up for this, is there something I can and should do immediately?"
- **Match urgency to real impact.** Use the severity levels from Lesson 25 consistently, so a page always means roughly the same thing: something is happening now that needs a human now.
- **Group and deduplicate.** Alert on the user-facing symptom (checkout latency) rather than on every downstream service it touches, and configure your alerting tool to collapse related alerts into one incident instead of one page per symptom.
- **Alert on SLO burn rate, not raw thresholds** (Lesson 3's error budgets, applied). Instead of "error rate > 1%" firing on every brief blip, alert when the error budget is burning fast enough to exhaust the whole month's budget early — this naturally filters out noise that doesn't threaten the SLO while still catching real, sustained problems fast.

## An SLO-based alert, for comparison

```
# Noisy: fires on every short blip
alert: HighErrorRate
expr: error_rate > 0.01
for: 1m

# Better: fires only when burning the error
# budget fast enough to matter
alert: CheckoutErrorBudgetBurnFast
expr: error_budget_burn_rate > 14.4
for: 5m
labels:
  severity: page
```

The second version only interrupts someone when the error rate is high enough, for long enough, to actually threaten the monthly SLO — a brief one-minute blip that recovers on its own never pages anyone.

## Key terms

- **Alert fatigue** — the gradual loss of trust in alerts caused by too many low-value pages, leading to slower response to real ones
- **Symptom-based alerting** — alerting on what users actually experience (latency, errors) rather than internal causes (CPU, memory)
- **Actionable alert** — an alert where a human has something specific to do immediately upon receiving it
- **Error budget burn rate** — how fast an SLO's error budget is being consumed; a better alerting signal than a raw threshold
