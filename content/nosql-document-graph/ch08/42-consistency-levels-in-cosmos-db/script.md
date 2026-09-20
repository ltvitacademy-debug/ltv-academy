# Script — Consistency Levels in Cosmos DB

## Segment 1 (title)

SQL Server gives you a handful of transaction isolation levels within a single instance. Cosmos DB faces a harder problem: data replicated across continents, where the speed of light imposes a real floor on how fast everyone can agree. Its answer is five consistency levels — a real spectrum between correctness and latency.

## Segment 2 (steps: the five levels)

Strong is the strictest — every read returns the latest write. Bounded Staleness caps the lag with a guaranteed bound. Session, the default, guarantees you always see your own writes. Consistent Prefix guarantees order without guaranteeing freshness. Eventual gives up ordering entirely for the lowest latency.

## Segment 3 (code: session is the default, and usually right)

Cosmos DB defaults new accounts to Session consistency because it matches how most applications behave — a user expects to see their own change immediately, without needing every other user to see it at the same instant. It delivers that at close to Eventual-level latency.

## Segment 4 (outro)

The account sets a default consistency level, but an individual request can ask for something weaker — never stronger — when a specific query doesn't need the account's guarantee. Next up: what happens when multi-region writes actually conflict.
