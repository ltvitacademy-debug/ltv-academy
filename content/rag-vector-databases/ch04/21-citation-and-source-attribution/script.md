# Script — Citation & Source Attribution

## Segment 1 (title)

A plain LLM answer asks you to just trust it. A RAG answer doesn't have to — every claim is supposed to trace back to a specific retrieved chunk, and a specific source document. Citations make that traceability visible, not just true in theory.

## Segment 2 (code: manual numbered references)

The straightforward approach: instruct the model to use the bracket numbers assigned at prompt assembly, then map them back to stored metadata afterward with simple string parsing. It works with any model and any vector database — its weakness is that it depends on the model reliably including the right number next to the right claim.

## Segment 3 (code: the built-in Citations feature)

The Messages API has a citations feature built for this. Each retrieved chunk is sent as its own document content block with citations enabled. The response comes back split into text blocks, and any grounded claim carries a citations array with the exact cited text and which document it came from — the model isn't asked to remember to cite; the API structurally ties the claim to its source.

## Segment 4 (steps: choosing between them)

The manual approach is simpler to retrofit onto an existing pipeline. The built-in feature is more reliable, since it doesn't depend on prompt-following, but it means restructuring prompt assembly around one document block per chunk. Either way, a chunk is only citable if it was stored with enough metadata to point back to in the first place.

## Segment 5 (outro)

Next lesson: handling retrieval failures — what a well-built RAG system does when nothing relevant comes back at all.
