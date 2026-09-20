# PostgreSQL Streaming Replication Fundamentals

Chapter 15 tuned a single PostgreSQL instance. Chapter 16 asks a different question: how do
you keep a second copy of that instance up to date in near-real-time, so you have a failover
target and somewhere to point read-only traffic? The answer PostgreSQL has used since version
9.0 is streaming replication, and understanding it starts with the same WAL you already used
for point-in-time recovery in Chapter 13.

## What you'll learn

- What streaming replication actually streams, and why WAL is the mechanism
- The difference between physical and logical replication, and why this lesson covers physical
- The primary/standby relationship and what "near-real-time" really means

## WAL is the thing being streamed

Every change PostgreSQL makes to data is first written to the Write-Ahead Log — the same WAL
records that Chapter 13's `pg_basebackup` and archive-based PITR relied on. Streaming
replication takes those WAL records and ships them over a network connection to one or more
standby servers as they're generated, instead of waiting for them to be archived to a file.
A background process on the primary called a WAL sender streams the records; a corresponding
WAL receiver process on the standby writes them to its own WAL and replays them, continuously
applying the same changes the primary made. Because replay happens as records arrive rather
than in a nightly batch, a healthy standby typically lags the primary by well under a second —
this is what "near-real-time" means in practice, not "instant." The exact lag is not zero and
is worth monitoring, not assuming away.

## Physical replication vs. logical replication

Streaming replication as described above is physical replication: it ships WAL records, which
describe changes at the level of physical disk pages, and the standby is a byte-for-byte copy
of the primary's entire cluster — same databases, same tables, same indexes, nothing selective
about it. A physical standby can't have extra tables or a newer major version than its primary;
it is the primary, continuously replayed elsewhere. That's the subject of this lesson and the
next.

PostgreSQL also supports logical replication, covered in Lesson 82, which replicates at the
row and table level using a publish/subscribe model. Logical replication lets you replicate
select tables only, combine data from multiple sources, and even replicate between different
major PostgreSQL versions — none of which physical replication can do, because physical
replication has no concept of "some of the data." The tradeoff is that logical replication has
more moving parts and doesn't give you as simple a byte-identical failover target. Reach for
physical streaming replication for high availability and full-cluster failover; reach for
logical replication for selective or cross-version data movement.

## The primary/standby relationship

The server generating WAL is the primary. A server receiving and replaying that WAL is a
standby (older PostgreSQL documentation and community usage also says "replica" — the terms
are interchangeable). A standby is normally read-only: it continuously applies changes from
the primary and, with hot standby enabled (Lesson 81), can also serve read-only queries at
the same time it's replaying. If the primary fails, a standby can be promoted to become a new
primary — but streaming replication by itself doesn't automate that promotion or client
redirection; it just keeps a current copy of the data ready. Failover automation is a separate
concern, typically handled by external tooling.

## Key terms

| Term | Meaning |
|---|---|
| Streaming replication | Continuously shipping WAL records from a primary to a standby over a network connection |
| WAL sender | Background process on the primary that streams WAL records to a standby |
| WAL receiver | Background process on the standby that receives and writes streamed WAL records |
| Physical replication | Replication of the entire cluster via WAL, producing a byte-for-byte copy of the primary |
| Logical replication | Row/table-level replication using publish/subscribe, covered in Lesson 82 |
| Primary | The server generating WAL that other servers replicate from |
| Standby (replica) | A server continuously replaying WAL streamed from a primary |

## Check yourself

A colleague asks for a standby that holds only three specific tables from a 200-table
database. Is physical streaming replication the right tool for that? Why or why not, and
what would you suggest instead?
