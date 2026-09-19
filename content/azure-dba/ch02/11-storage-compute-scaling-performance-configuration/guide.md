# Lesson 11 — Storage, Compute Scaling & Performance Configuration

**Chapter 2 · Deploying Azure SQL · Lesson 11 of 95**

## What you'll learn

- How storage tiers and max size interact with the compute tier you chose in Lessons 9-10
- What "scaling without downtime" actually means, and where it isn't quite true
- Read scale-out: what it offloads, and which tiers support it
- How all of Chapter 2's decisions so far come together into one configuration

## Storage isn't a separate decision from compute — mostly

Under the vCore model, storage is priced independently of compute
(Lesson 9), but it isn't unlimited independently of it: each service
tier caps maximum database size, and Business Critical's storage
rides on local SSD attached to the compute node itself, while
General Purpose's storage is remote (Azure Premium Storage). That
difference is *why* Business Critical has lower latency — the
storage is physically closer — and it's also why Business Critical
costs more per GB than General Purpose at the same compute size.

```
General Purpose:   remote storage, higher latency, lower cost/GB
Business Critical: local SSD storage, lower latency, higher cost/GB
Hyperscale:        distributed storage, scales far past a single
                    node's local disk — designed for multi-TB+ databases
```

## Scaling compute: "without downtime," with an asterisk

Changing a database's service tier or compute size (`az sql db
update --edition ... --capacity ...`, or the Portal's **Pricing
tier** blade) is designed to be a near-zero-downtime operation —
Azure creates a new copy of the database at the target size and
cuts over the connection, typically completing in a few minutes for
Azure SQL Database. "Near-zero," not "zero": there's a brief
reconnect window during cutover, so applications need retry logic on
connection failures regardless — the same retry logic they should
already have for transient Azure connectivity blips. Scaling
Hyperscale is faster still for very large databases, since its
storage architecture doesn't require copying the whole database to
resize compute.

## Read scale-out: offloading reads, not writes

**Read scale-out** routes read-only connections to a secondary
replica that Business Critical and Hyperscale maintain automatically
as part of their built-in HA architecture — General Purpose doesn't
have this option because it doesn't maintain that kind of replica at
all. Enabling it (`ApplicationIntent=ReadOnly` in the connection
string) doesn't change what runs on the primary; it gives read-heavy
reporting or analytics connections somewhere else to go so they stop
competing with transactional writes for the same compute. It's a
free capability on the tiers that support it — no additional replica
to provision, because that replica already exists for HA reasons.

## Putting Chapter 2's decisions together

By this point in Chapter 2, one real Azure SQL Database
configuration decision looks like this, start to finish:

```
1. Purchasing model:   vCore (own a SQL Server license -> Hybrid Benefit)
2. Service tier:       Business Critical (need read scale-out + low latency)
3. Compute option:     Provisioned (steady production load)
4. Storage:             sized to the workload, local SSD included
5. Read scale-out:      enabled for the reporting connection string
```

## Key terms

| Term | Meaning |
|---|---|
| Read scale-out | Routes read-only connections to an HA secondary; Business Critical & Hyperscale only |
| Near-zero-downtime scaling | Compute/tier changes that cut over in minutes, with a brief reconnect window |
| Local vs. remote storage | Business Critical uses local SSD (lower latency); General Purpose uses remote storage |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking:
why does General Purpose not offer read scale-out, while Business
Critical and Hyperscale do?
