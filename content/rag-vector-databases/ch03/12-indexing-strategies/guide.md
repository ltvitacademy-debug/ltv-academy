# Lesson 12 — Indexing Strategies: HNSW & IVF

**Chapter 3 · Vector Databases · Lesson 12 of 31**

## What you'll learn

- Why comparing a query vector to every stored vector doesn't scale
- How IVF narrows the search space by clustering vectors first
- How HNSW narrows the search space with a layered graph instead
- Why both are called *approximate* nearest-neighbor search, and what that trade-off buys you

## Why not just compare to everything?

The simplest possible search — a **brute-force / exact scan** — compares the query vector to
every single stored vector and returns the closest ones. It's exact, and for a few thousand
vectors it's even fast enough. But the cost grows directly with the collection size: 1 million
vectors means 1 million comparisons per query, every single query. At real RAG-pipeline scale
(the kind of corpus Lesson 16 onward builds toward), that's too slow. An **index** is a structure
built ahead of time that lets a query skip most of those comparisons — at the cost of occasionally
missing the true closest match. That's why this is called *approximate* nearest-neighbor (ANN)
search, the term introduced in Lesson 10: a small, tunable amount of accuracy traded for a very
large amount of speed.

## IVF: partition first, then only search nearby

**IVF (Inverted File Index)** clusters the vector space ahead of time. At build time, it runs a
clustering algorithm (like k-means) to produce `nlist` cluster centroids, and assigns every stored
vector to its nearest one — exactly like a book's index grouping related topics together instead
of listing every page. At query time, instead of scanning everything, IVF first finds the
`nprobe` centroids closest to the query vector, then only scans the vectors assigned to those
few clusters.

```
1,000,000 vectors in the collection
nlist = 1,000  → ~1,000 vectors per cluster
Query arrives → compare to 1,000 centroids
nprobe = 10    → probe the 10 closest clusters
Scan ~10,000 vectors, not 1,000,000
100x fewer comparisons than brute force
```

`nprobe` is the knob: probe more clusters and recall goes up (closer to exact) but so does query
time; probe fewer and it's faster but risks missing a true nearest neighbor that landed in a
cluster you didn't check.

## HNSW: a graph, navigated layer by layer

**HNSW (Hierarchical Navigable Small World)** takes a different approach: instead of clustering,
it builds a multi-layer graph where each vector is a node connected to its nearest neighbors. The
top layer is sparse, with a few nodes connected by long-range links; each layer down gets denser,
until the bottom layer contains every vector with short, local links — illustrated below with
round numbers, not an exact formula:

```
Layer 3:        ~4 nodes   (long jumps across the space)
Layer 2:       ~60 nodes
Layer 1:      ~900 nodes
Layer 0: 1,000,000 nodes   (every vector, locally linked)
Search starts at Layer 3, greedily moves toward the query
Each layer down refines the answer, ending at Layer 0
```

A search starts at the top layer and greedily moves to whichever connected node is closest to
the query, descending a layer each time it can't get any closer — the same way you'd find a city
on a world map before zooming into a street map, rather than scanning every street on earth. The
`ef` (or `efSearch`) parameter controls how many candidates stay in play at each step: higher `ef`
means better recall at the cost of speed, mirroring what `nprobe` does for IVF.

## Choosing between them

Most vector databases (Qdrant, Weaviate, Milvus, pgvector) default to HNSW because it generally
gives strong recall at speed without much tuning, at the cost of using more memory and taking
longer to build than IVF. IVF (often combined with compression as IVF-PQ) uses less memory and
builds faster, which matters more at truly massive scale or under tight memory budgets. You
rarely have to build either from scratch — the database builds the index; your job is tuning
`nprobe` or `ef` for your own recall-versus-speed target.

## Key terms

| Term | Meaning |
|---|---|
| Brute-force / exact scan | Comparing a query to every stored vector — exact but doesn't scale |
| IVF | Inverted File index — clusters vectors, then searches only the nearest clusters (`nprobe`) |
| HNSW | Hierarchical Navigable Small World — a layered graph, searched greedily top to bottom |
| Recall | How often the index's approximate answer matches what an exact brute-force scan would return |

## Lab

1. With `nlist = 2,000` and 4,000,000 vectors, roughly how many vectors land in each IVF cluster?
2. If `nprobe` is raised from 5 to 50 on the same collection, what happens to recall, and what
   happens to query speed? Explain the trade-off in your own words.
3. Describe, in one or two sentences, why HNSW's search is described as "greedy" — what is it
   actually doing at each step?

## Check yourself

You're ready for Lesson 13 when you can explain what `nprobe` and `ef`/`efSearch` each control,
and why both exist for the same underlying reason.
