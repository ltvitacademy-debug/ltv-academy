# Script — Scalability

## Segment 1 (title)

Lesson one mentioned scaling beyond one machine as a reason we go distributed. This lesson covers exactly how that happens: scalability, the two different ways to add capacity, and the mechanisms behind each.

## Segment 2 (steps)

Vertical scaling means adding more resources to the one machine you already have — more CPU, more RAM. It's simple, since the application doesn't change, but it has a hard ceiling: eventually you're renting the biggest machine available, with nowhere left to go, and it's still a single point of failure. Horizontal scaling means adding more machines instead of enlarging one. It has no real ceiling — if ten machines aren't enough, add an eleventh — and as a side effect, it improves fault isolation too.

## Segment 3 (steps)

Horizontal scaling only works if requests actually get spread across those machines, and that's the load balancer's job. It sits in front of the server pool and routes each request, often by round robin, taking turns, or by least connections, sending it to whichever server is least busy. Without it, you'd just have idle machines and one overloaded one. And the load balancer itself needs redundancy, because one unreplicated load balancer becomes a single point of failure for the entire fleet behind it.

## Segment 4 (code)

Compute is easy to multiply because any server can answer any request. Data isn't, so the answer is sharding: splitting a dataset across machines by a shard key, like customer ID, so a query for one customer's orders always lands on the same shard instead of searching all of them. It's what lets horizontal scaling apply to stateful systems too.

## Segment 5 (outro)

Vertical scaling buys time; horizontal scaling, backed by load balancing and sharding, is the answer without a ceiling. Up next, lesson four: reliability.
