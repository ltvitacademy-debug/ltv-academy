# Storage Classes

Not all data in a lake gets read at the same rate. Yesterday's raw ingest might get queried
hourly; a compliance export from three years ago might never get touched again but still has
to exist somewhere. S3 offers multiple **storage classes** so you pay for that difference —
same durability guarantee across almost all of them, wildly different cost and retrieval
time depending on how "cold" the data is.

## What you'll learn

- The full storage class ladder, from S3 Standard down to Deep Archive
- The real tradeoff each class makes: storage cost vs. retrieval cost and latency
- What Intelligent-Tiering does differently
- How lifecycle policies automate moving objects between classes

## The storage class ladder

| Class | Retrieval time | Typical use |
|---|---|---|
| S3 Standard | Milliseconds | Frequently accessed, active data |
| S3 Standard-IA | Milliseconds | Infrequent access, but needs millisecond reads when accessed |
| S3 One Zone-IA | Milliseconds | Infrequent access, recreatable data (single AZ — cheaper, less durable against AZ loss) |
| S3 Intelligent-Tiering | Milliseconds | Unpredictable or unknown access patterns |
| S3 Glacier Instant Retrieval | Milliseconds | Archive data still needing instant access, rarely |
| S3 Glacier Flexible Retrieval | Minutes to hours | Archive data, occasional access, retrieval time acceptable |
| S3 Glacier Deep Archive | Up to 12 hours | Long-term archive, retrieved rarely if ever (compliance retention) |

Every class in this list carries the same 11-nines durability — you're not trading away
safety, only speed and cost. Standard-IA and One Zone-IA charge a **retrieval fee per GB**
on top of a lower storage price, which is the general pattern moving down the ladder: storage
gets cheaper, but pulling the data back out gets more expensive and slower.

## Intelligent-Tiering: letting S3 decide

**S3 Intelligent-Tiering** doesn't require you to predict access patterns up front. It
monitors access and automatically moves objects between a frequent-access tier and an
infrequent-access tier (and optionally the archive tiers) based on actual usage, with no
retrieval fees for the standard tiers. It costs a small monthly monitoring fee per object,
which makes it a poor fit for huge numbers of tiny objects but a strong default for data
lakes where access patterns genuinely vary and aren't worth hand-tuning per object.

## Lifecycle policies

A **lifecycle policy** is a rule set on a bucket (or prefix) that automatically transitions
objects between storage classes — or expires them — based on age. A typical pattern for a
data lake's raw zone:

```
Day 0:   land in S3 Standard
Day 30:  transition to Standard-IA
Day 90:  transition to Glacier Flexible Retrieval
Day 2555 (7 years): expire (delete)
```

This turns "how cold should this data be by now" from a manual cleanup task into a
declarative rule that runs itself — you write the transition schedule once, and it applies
to every object matching the prefix going forward.

## Key terms

| Term | Meaning |
|---|---|
| S3 Standard | Default class, millisecond access, highest storage cost |
| Standard-IA / One Zone-IA | Cheaper storage, per-GB retrieval fee, millisecond access |
| Intelligent-Tiering | Automatically moves objects between tiers based on observed access |
| Glacier (Instant / Flexible / Deep Archive) | Archive tiers trading retrieval speed for the lowest storage cost |
| Lifecycle policy | Bucket rule that automatically transitions or expires objects by age |

## Check yourself

A dataset is queried daily for its first month, then almost never again after that — but
compliance rules require keeping it for seven years. Which storage class transitions would
you write into a lifecycle policy, and why not just leave everything in S3 Standard?
