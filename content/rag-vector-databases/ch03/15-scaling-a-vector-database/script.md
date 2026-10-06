# Script — Scaling a Vector Database

## Segment 1 (title)

A RAG pipeline that works great in a demo can hit two completely different walls in production — way more data, and way more concurrent queries. Scaling a vector database means addressing both.

## Segment 2 (screenshot: real cluster creation)

Every cluster, on every vendor, starts the same way — provisioned through a console like this one. Cloud provider, region, a name, and a starting size. This is Qdrant Cloud's own "Create a cluster" screen.

## Segment 3 (code: a real RAM formula)

HNSW keeps its graph largely in memory for speed, so RAM is usually the first wall a growing collection hits. Here's Qdrant's own published formula. One million chunks at 1,536 dimensions — a realistic RAG corpus — already needs over 9 gigabytes of RAM just to hold the index.

## Segment 4 (screenshot: real vertical/horizontal scaling)

Once you need more capacity, a cluster scales in one of two directions, right here on the same screen. Vertical scaling gives each existing node more RAM, CPU, or disk — simple, but it has a ceiling, and it usually means a rolling restart. Horizontal scaling instead adds more nodes and shards the collection across them, with replicated copies for availability, and no hard ceiling — at the cost of being more structurally involved to set up.

## Segment 5 (screenshot: real metrics)

None of this should be guesswork. Every managed console ships real-time monitoring, so you can see resource pressure building — RAM, CPU, and disk, over whatever time window you need, from the last five minutes out to a full month — before it ever turns into an outage.

## Segment 6 (outro)

That's vertical scaling, horizontal scaling, and the formula that tells you which one you actually need. Next up, Chapter 4: building the full RAG pipeline, starting with document ingestion and chunking strategies.
