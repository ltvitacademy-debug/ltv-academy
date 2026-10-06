# Script — Capstone Kickoff

## Segment 1 (title)

Three lessons, one project: a RAG assistant that answers questions over a real set of policy or support documents. Small enough to finish, real enough that every pipeline stage from this course has an actual job to do.

## Segment 2 (code: what done looks like)

Here's the full checklist across all three build lessons. Documents ingested and chunked with real metadata. Chunks embedded and stored. Retrieval returning scored results. A re-ranking pass reordering them. A grounded prompt with numbered context. Citations mapping claims back to sources. An abstention path for weak matches. A small evaluation set that includes an honest "I don't know" case.

## Segment 3 (steps: why one knowledge base beats three)

Resist the urge to point this at several document sets to look more capable. The point is proving every stage is real and wired up — a re-ranker that actually reorders, a citation that actually points at a real chunk, an abstention path that actually fires. A three-source assistant with none of that fully working teaches less than a one-source assistant where it all does.

## Segment 4 (code: mapping chapters to build steps)

Nothing here is new. Chapter 1's architecture becomes the shape of this build. Chapter 2's embedding model choice and Chapter 3's vector database become where chunks live. Chapter 4 becomes the build itself — ingestion through citations and failure handling. Chapter 5's evaluation metrics become Lesson 30's tuning pass.

## Segment 5 (outro)

The work now is building it, not learning it. Next up: ingestion, retrieval, re-ranking, and citations, wired up for real.
