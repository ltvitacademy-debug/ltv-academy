# Consistency Levels in Cosmos DB

SQL Server gives you a handful of transaction isolation levels — read committed, snapshot,
serializable — all operating within a single instance. Cosmos DB faces a harder problem: data
replicated across regions on different continents, where the speed of light itself imposes a real
floor on how fast "everyone agrees" can happen. Its answer is five **consistency levels**, a real
spectrum between strict correctness and low latency, and it's one of the most genuinely distinctive
things about the platform.

## What you'll learn

- The five consistency levels and where each sits on the correctness-vs-latency spectrum
- Why Session is the default, and why it's the right default for most applications
- How the account-level setting relates to what an individual request can override

## The five levels, in order

From strongest to weakest:

1. **Strong** — every read returns the most recent committed write, guaranteed. The highest
   correctness, but the highest latency and the biggest availability cost, since a read may need
   to wait on cross-region replication to confirm it.
2. **Bounded Staleness** — reads may lag behind writes, but only by a configurable bound: a
   maximum number of versions ("K") or a maximum time interval ("T"), whichever comes first. You
   get a guaranteed, tunable ceiling on staleness instead of an open-ended one.
3. **Session** (the default) — within a single client session, guarantees read-your-writes,
   monotonic reads, and monotonic writes: a client always sees its own writes and never sees data
   go "backwards." Other clients may briefly see slightly older data. This is the sweet spot for
   most real applications — a user reliably sees their own changes immediately, at low latency.
4. **Consistent Prefix** — reads never see writes out of order (no gaps, no reordering), but may
   be behind the most recent write. If writes happened A, then B, then C, a reader never sees
   B or C without also having seen A.
5. **Eventual** — no ordering guarantee at all. Replicas converge eventually, but a read might
   momentarily return data older than a previous read from the same client. Lowest latency,
   highest availability, weakest guarantee.

```bash
# Set the account's default consistency level
az cosmosdb update \
  --name my-cosmos-account \
  --resource-group my-rg \
  --default-consistency-level "Session"
```

## Session is the default — and usually the right call

Cosmos DB defaults new accounts to **Session** consistency because it matches how most
applications actually behave: a user who just saved a profile change expects to see that change
on their next page load, but doesn't need a guarantee that every other user sees it at the exact
same instant. Session consistency delivers that read-your-own-writes guarantee at close to
Eventual-level latency and availability — the practical sweet spot on the spectrum.

## Overriding per request

The default consistency level is set at the account level, but an individual read request can
request a **weaker** level than the account default (never stronger) — useful when a specific
query genuinely doesn't need the account's default guarantee and you want the latency benefit of
a weaker one for just that call.

## Key terms

| Term | Meaning |
|---|---|
| Strong consistency | Every read returns the latest committed write; highest correctness, highest latency |
| Bounded Staleness | Reads lag writes by a configurable, guaranteed bound (version count or time) |
| Session consistency | Default level; guarantees read-your-writes and monotonic reads within a client session |
| Consistent Prefix | Reads never see writes out of order, though they may be behind |
| Eventual consistency | No ordering guarantee; lowest latency, replicas converge eventually |

## Check yourself

Why is Session, rather than Strong, the default consistency level for new Cosmos DB accounts —
what does Session guarantee that makes it the practical sweet spot for most applications?
