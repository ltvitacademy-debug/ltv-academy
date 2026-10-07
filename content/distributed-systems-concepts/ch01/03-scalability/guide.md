# Scalability

Lesson 1 established that one of the main reasons we build distributed systems is to scale beyond what a single machine can handle. This lesson goes deeper on exactly how that scaling happens — the two fundamentally different ways to add capacity, the mechanism that makes one of them work, and how that mechanism extends to data, not just compute.

## What you'll learn

- Vertical scaling (a bigger machine) vs. horizontal scaling (more machines)
- Why horizontal scaling is the distributed-systems answer to growth
- Load balancing as the mechanism that makes horizontal scaling work
- Partitioning and sharding as how you scale stateful systems

## Vertical scaling: a bigger machine

**Vertical scaling** (also called "scaling up") means adding more resources to the single machine you already have — more CPU cores, more RAM, a faster disk. It's simple: the application doesn't need to change at all, because it's still just one machine. But it has a hard ceiling. At some point you're renting the largest machine a cloud provider sells, and there's nowhere left to go. It also keeps your single point of failure exactly where it was — one bigger machine is still one machine.

## Horizontal scaling: more machines

**Horizontal scaling** (or "scaling out") means adding more machines, each handling a slice of the total load, instead of making one machine bigger. This is the distributed-systems answer to growth, because it doesn't have the same ceiling vertical scaling does — if ten machines aren't enough, add an eleventh. It also improves fault isolation as a side effect: losing one of a hundred machines is a minor dip in capacity, not an outage. The tradeoff is complexity — the application now has to coordinate across machines instead of just running on one.

## Load balancing: what makes horizontal scaling work

Adding more machines only helps if requests actually get spread across them, and that's the job of a **load balancer**. It sits in front of a pool of servers and routes each incoming request to one of them, typically using a strategy like round robin (take turns) or least-connections (send it to whichever server is least busy right now). Without a load balancer, horizontal scaling doesn't actually happen — you'd just have nine idle machines and one overloaded one. The load balancer is also exactly the kind of component that needs its own redundancy, since (as Lesson 2 covered) a single unreplicated load balancer becomes a single point of failure for the whole fleet behind it.

## Partitioning and sharding: scaling data, not just compute

Horizontal scaling handles compute — stateless web servers that don't hold onto anything between requests are easy to multiply, because any server can answer any request. Data is a different problem. A database holding all of a company's records on one machine eventually runs out of disk, memory, and query throughput, and you can't just put a load balancer in front of it, because each machine would need the full dataset to answer any query.

The answer is **partitioning**, also called **sharding**: splitting the dataset itself across multiple machines, so each one holds only a portion — commonly by a **shard key**, such as customer ID or region, so related rows land together and most queries only need to touch one shard. A query for "orders for customer 4471" goes to the shard holding that customer's data, not all of them. Sharding is what lets horizontal scaling apply to stateful systems, not just stateless ones, but it introduces its own problems: a query spanning multiple shards is slower and harder to make consistent, and choosing a bad shard key can leave one shard overloaded while others sit idle. It's a deep topic on its own, and one worth remembering as the main tool for scaling data as load grows.

## Key terms

| Term | Meaning |
|---|---|
| Vertical scaling | Adding more resources (CPU, RAM) to a single existing machine |
| Horizontal scaling | Adding more machines to share the load, instead of enlarging one |
| Load balancer | Routes incoming requests across a pool of servers |
| Partitioning / sharding | Splitting a dataset across multiple machines by a shard key |

## Recap

Vertical scaling buys time by making one machine bigger, but horizontal scaling — spreading load across many machines via a load balancer, and spreading data across many machines via sharding — is the distributed-systems answer that doesn't hit a ceiling. Next up, Lesson 4: reliability.
