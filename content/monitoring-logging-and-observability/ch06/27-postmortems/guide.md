# Postmortems

The incident is resolved, the pool is resized, checkout is fast again. The work isn't actually done — a **postmortem** is what converts a resolved incident into something the whole organization gets to learn from, so the next flash sale doesn't hit the same wall. This lesson covers how to write one that's honest and useful, using Northbridge's checkout incident as the worked example.

## What you'll learn

- Why postmortems must be blameless to be useful at all
- The five sections every solid postmortem needs
- The difference between a root cause and a contributing factor
- How to write action items that actually get done, not just logged

## Blameless, or it doesn't work

A postmortem's entire value depends on people telling the truth about what happened, including their own mistakes. If a postmortem process punishes the engineer who made a bad call under pressure, people stop writing honest postmortems — they write defensive ones, or skip details that might implicate someone. **Blameless** doesn't mean consequence-free for systemic issues; it means the document assumes everyone acted reasonably given the information and incentives they had at the time, and focuses on fixing the system, not the person.

## The five sections

1. **Timeline** — what happened, in order, with timestamps. When the symptom started, when it was detected, when each diagnostic step happened, when the fix was applied, when it was confirmed resolved. Built from logs and alert history, not memory.
2. **Impact** — who and what was actually affected, quantified. Not "checkout was slow" but "checkout p99 latency exceeded 2s for 34 minutes, affecting an estimated 4,100 customer sessions, with 220 abandoned carts above baseline."
3. **Root cause(s)** — the specific technical reason the failure happened. There can be more than one; resist the urge to stop at the first plausible explanation.
4. **Contributing factors** — conditions that made the incident worse or harder to catch, even if they didn't directly cause it. A missing alert, a runbook that was out of date, a dashboard that didn't exist yet — these matter even though they aren't "the" cause.
5. **Action items** — specific, owned, tracked tasks that reduce the chance or impact of a recurrence. Each one needs an owner and a due date, or it's a wish, not an action item.

## Root cause vs. contributing factor — Northbridge's incident

- **Root cause:** the inventory service's database connection pool was sized for average traffic and had never been load-tested against flash-sale volumes, so it saturated under the spike and queued requests from checkout.
- **Contributing factor #1:** no alert existed on connection pool saturation specifically — only on the pool being fully exhausted, which fired too late to give early warning.
- **Contributing factor #2:** the runbook for checkout latency didn't yet include a diagnostic step pointing at inventory's pool, so the on-call engineer had to discover that connection by reading traces live, costing roughly 12 minutes.

## Action items that actually happen

Compare these two action items:

- Weak: "Improve monitoring for connection pools." No owner, no deadline, no way to know when it's done.
- Strong: "Add a saturation-based alert on inventory-db pool wait-queue depth, threshold tuned from this incident's data. Owner: Priya Shah. Due: before next scheduled flash sale (in 3 weeks)."

A postmortem with five great action items and zero owners is a postmortem nobody will remember wrote. Track action items the same way you'd track any other committed work, and review completion in the next team retro — a postmortem that doesn't change anything is just an obituary.

## Key terms

- **Postmortem** — a written analysis of an incident, written to prevent recurrence, not assign blame
- **Blameless** — assuming people acted reasonably given what they knew, and fixing the system instead of the person
- **Contributing factor** — a condition that worsened or prolonged an incident without being its root cause
- **Action item** — a specific, owned, dated task produced by a postmortem
