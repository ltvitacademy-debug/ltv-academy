# Script — Cost Optimization

## Segment 1 (title)

Three real, practical levers close out this chapter: spot instances, auto-termination, and right-sizing. None of them require giving anything up — they're savings available to a workload that's already been sized and understood.

## Segment 2 (code: spot instances)

Spot instances run at a steep discount in exchange for the cloud provider being able to reclaim them. For a fault-tolerant job cluster, Databricks retries lost tasks automatically — a real discount with an acceptable risk. For an all-purpose cluster someone's actively working in, that same reclamation interrupts a live session — same discount, a much worse trade.

## Segment 3 (code: auto-termination)

This is the single most commonly missed cost control on Databricks. A developer opens a notebook, steps away, and never comes back — without auto-termination, that cluster bills for the rest of the day running nothing. Every all-purpose cluster should have this window configured by default.

## Segment 4 (code: right-sizing)

Over-provisioning "just in case" is the same mistake Lesson 25 already argued against from a performance angle. A cluster running three times the size a job needs doesn't run three times faster — it just costs three times more for the same result.

## Segment 5 (outro)

Chapter 5 is complete: Photon, AQE, caching, sizing, and now real cost control. Next up, Chapter 6, Advanced Security and Governance — row and column security at scale, Delta Sharing, secrets, and compliance.
