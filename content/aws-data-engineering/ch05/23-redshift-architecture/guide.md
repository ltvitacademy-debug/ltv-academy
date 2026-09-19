# Redshift Architecture

Everything so far in this course — Glue, Athena — has been about querying data where it
already sits in S3, without moving it anywhere. Redshift is a different tool for a different
job: a managed, columnar, massively parallel data warehouse you load data *into*, so that
repeated, heavy analytical queries run fast against data that's already organized for them.
Before writing a single COPY command, you need to understand what's actually running under a
Redshift cluster.

## What you'll learn

- The leader node / compute node split, and what each one actually does
- Columnar storage, and why it's the right layout for analytical queries
- MPP (massively parallel processing) — how one query becomes many parallel pieces
- Node slices, the unit Redshift actually distributes work across

## Leader node vs. compute nodes

A Redshift cluster has one **leader node** and one or more **compute nodes**. The leader node
never stores table data. Its job is to receive your SQL, parse and optimize it, break it into
a set of steps compute nodes can execute in parallel, and assemble the final result to send
back to you. The **compute nodes** are where the data actually lives and where the real work
happens — each one stores a portion of every table and executes its slice of the query plan
against local data.

This split matters practically: when you connect to a Redshift cluster's endpoint, you're
always talking to the leader node. You never connect directly to a compute node, and a
single-node cluster still has this leader/compute split internally, just co-located.

## Columnar storage

Traditional row-oriented databases store a full row together on disk — every column of one
order, then every column of the next order. Redshift stores data **column by column**
instead: every value from one column stored contiguously, then the next column, and so on.
For analytical queries — `SELECT AVG(total) FROM orders WHERE region = 'west'` touching two
of a table's twenty columns — columnar storage means Redshift reads only the `total` and
`region` columns off disk, not all twenty. Columnar layout also compresses far better than
row storage, because values within one column tend to be far more similar to each other than
values across a whole row.

## MPP: massively parallel processing

MPP is what makes a Redshift query fast on billions of rows: the leader node splits a query
into pieces and assigns each piece to run **in parallel** across every compute node
simultaneously, each node working only on its own local slice of the data. Each compute node
is further divided into **node slices** — the actual unit of parallelism. A node with four
slices runs four pieces of a query's workload concurrently, each slice using its own dedicated
share of the node's memory and disk. More nodes and more slices mean more parallelism, which
is the core reason cluster sizing (Lesson 24) is a real performance lever in Redshift in a way
it never is in Athena.

## Key terms

| Term | Meaning |
|---|---|
| Leader node | Coordinates query planning and result assembly; stores no table data |
| Compute node | Stores table data and executes its portion of a query |
| Node slice | A subdivision of a compute node's memory/disk; the real unit of parallel execution |
| Columnar storage | Data stored column-by-column on disk instead of row-by-row |
| MPP | Massively parallel processing — one query split into pieces run concurrently across nodes |

## Check yourself

If you run `SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id` against a
20-column `orders` table, which node does the actual scanning and aggregating work, and why
does columnar storage make this particular query cheaper to run than it would be on a
row-oriented database?
