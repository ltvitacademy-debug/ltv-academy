# Script — Chunk Size Trade-offs

## Segment 1 (title)

Lesson 16 covered how to split text. This lesson covers the question that always comes next: how big should each chunk be? There's no universal answer — only a trade-off that shows up in every RAG pipeline.

## Segment 2 (steps: too small)

A small chunk retrieves with high precision — if it matches, it's very likely genuinely relevant, because there's no room for much else. But it pays for that in context: a sentence explaining "the fee is waived in this case" is useless if the chunk defining "this case" didn't get retrieved too. More chunks per document also means more embedding calls and more stored vectors.

## Segment 3 (steps: too large)

A large chunk carries plenty of surrounding context, so it's less likely to be missing an explanation it needs. But it pays for that in precision — several unrelated topics can share one chunk, so one relevant sentence drags the whole thing in. Stuffing several large chunks into a prompt also risks the "lost in the middle" problem, where relevant content buried in the middle of a long prompt gets used less reliably than content near the edges.

## Segment 4 (code: starting ranges)

As a starting point before you tune on your own data: 150 to 300 tokens for FAQs and support tickets, where answers are usually self-contained. 300 to 500 for technical documentation, which needs room for a full explanation. 500 to 800 for contracts and long-form reports, where clauses depend on nearby context. An overlap of 10 to 20 percent of the chunk size is a reasonable default across all three.

## Segment 5 (steps: chunk size and top_k move together)

Chunk size isn't tuned alone — it interacts directly with top_k, the number of chunks retrieval returns. Smaller chunks usually need a higher top_k, since any one of them carries less context on its own. Larger chunks usually need a lower top_k, both for cost and to avoid that lost-in-the-middle problem. Changing one without reconsidering the other is a common, avoidable mistake.

## Segment 6 (outro)

Next lesson: the retrieval step itself — what actually happens when a query vector goes looking for its top_k closest matches.
