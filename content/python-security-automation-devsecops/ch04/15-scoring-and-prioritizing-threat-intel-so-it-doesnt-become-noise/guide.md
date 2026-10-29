# Lesson 15 — Scoring and Prioritizing Threat Intel So It Doesn't Become Noise

**Chapter 4 · Threat Intelligence Automation · Lesson 3 of 4**

## What you'll learn

- Why piping every IOC from every feed straight into detection is how
  SOCs end up with alert fatigue, not better security
- The three signals worth combining into one score: **confidence**,
  **relevance**, and **recency**
- How to turn those three signals into a single weighted number in
  Python
- How to set score tiers that decide what gets auto-promoted, what
  waits for a human, and what gets quietly dropped

## Why "it's on a feed" isn't a reason to alert

A single commercial threat feed can easily publish tens of thousands
of IOCs a day. Most of them are low-confidence, stale, or completely
irrelevant to your environment — an IP flagged for hosting phishing
infrastructure in a region you have zero exposure to is real
intelligence, but it's not *your* intelligence. If every IOC that
crosses a feed gets written straight into a detection rule or a
high-priority watchlist, analysts learn within a week that alerts tied
to "threat intel" are usually noise, and they start ignoring them —
which is the exact failure mode this chapter exists to prevent.

## The three signals

**Confidence** is the feed's own stated score — how sure the source is
that this indicator is actually malicious, not just suspicious.
**Relevance** is whether the IOC has anything to do with *you* — does
it match your tech stack, your geography, your industry, and, most
importantly, did it show up in the "seen in environment" lookup from
Lesson 14. **Recency** is how long ago the indicator was last reported;
a C2 IP from a campaign that ended eighteen months ago is far less
actionable than one a feed updated yesterday.

## Turning three signals into one score

```python
from datetime import datetime, timezone

def recency_score(first_seen: datetime, max_days: int = 90) -> float:
    age_days = (datetime.now(timezone.utc) - first_seen).days
    if age_days <= 0:
        return 100.0
    return max(0.0, 100.0 * (1 - age_days / max_days))


def relevance_score(ioc: NormalizedIOC) -> float:
    score = 20.0  # baseline — it's on a feed at all
    if "seen_in_environment" in ioc.tags:
        score += 60.0
    if any(tag in RELEVANT_INDUSTRY_TAGS for tag in ioc.tags):
        score += 20.0
    return min(100.0, score)


def priority_score(ioc: NormalizedIOC) -> float:
    weights = {"confidence": 0.4, "relevance": 0.4, "recency": 0.2}
    return (
        weights["confidence"] * ioc.confidence
        + weights["relevance"] * relevance_score(ioc)
        + weights["recency"] * recency_score(ioc.first_seen)
    )
```

The weights matter, and they're a judgment call your team should own
explicitly rather than inherit by accident: this example leans harder
on confidence and relevance than on recency, because an IOC that's
already been seen touching your environment is worth acting on even if
the feed entry itself is a few weeks old.

## Setting tiers instead of one raw number

A bare float isn't actionable on its own — turn it into tiers that map
to a concrete action:

```python
def tier_for_score(score: float) -> str:
    if score >= 80:
        return "auto_promote"       # feed Lesson 16's detection push
    if score >= 50:
        return "analyst_review"     # surfaced in a queue, not auto-acted
    return "archive"                # logged, but not acted on


scored = [(ioc, priority_score(ioc)) for ioc in normalized_iocs]
scored.sort(key=lambda pair: pair[1], reverse=True)

for ioc, score in scored:
    ioc.tags.append(tier_for_score(score))
```

Sorting before tiering means you can also just cap it — "only the top
200 scored IOCs even get a tier today" — which is its own blunt but
effective noise control when a feed has a bad day and dumps an
unusually large batch.

## Tune the thresholds with real feedback, not guesses

The 80/50 cutoffs above are a starting point, not a law of nature. The
only way to know if they're right is to track what happened to
`analyst_review` IOCs after a human looked at them — if most get
dismissed as irrelevant, the relevance weighting or the review
threshold needs to move up; if `auto_promote` IOCs are routinely wrong,
that threshold needs to come down before Lesson 16 lets them anywhere
near a live detection rule.

## Key terms

| Term | Meaning |
|---|---|
| Confidence | The feed's own stated certainty that an indicator is actually malicious |
| Relevance | Whether an IOC has anything to do with your environment — tech stack, geography, or confirmed "seen in environment" activity |
| Recency | How recently an indicator was last reported; older indicators score lower by default |
| Tier | A named bucket (`auto_promote`, `analyst_review`, `archive`) a priority score maps to, deciding what happens to the IOC next |

## Check yourself

You're ready for Lesson 16 when you can explain why "it appeared on a
threat feed" is not, by itself, a reason to alert — and why this
lesson weights confidence and relevance higher than recency in the
example `priority_score()` function.
