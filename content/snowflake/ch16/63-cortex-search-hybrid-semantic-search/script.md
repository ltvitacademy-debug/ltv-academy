# Script — Cortex Search: Hybrid Semantic Search for RAG

## Segment 1 (title)

Before an LLM can answer a question grounded in your documents, something has to find the right few paragraphs out of thousands. Cortex Search is Snowflake's fully managed service for exactly that retrieval step, and it's the foundation under every RAG application built on Snowflake.

## Segment 2 (steps: why it's called hybrid)

Every query runs three passes: vector search matches meaning using Snowflake's own Arctic Embed model — or, as of March 2026, a customer-supplied embedding model if you want to bring your own — keyword search catches exact codes or acronyms that vector search can blur past, and a semantic reranking pass reorders the blended candidates by relevance. All three run together, automatically, without you tuning the weights between them yourself.

## Segment 3 (code: standing up a search service)

Creating a service is one SQL statement: name the text column to index, the attributes to keep as filters, a warehouse, and a target lag — Snowflake refreshes the index automatically, the same way a Dynamic Table manages its own schedule. Once created, you query it with SNOWFLAKE.CORTEX.SEARCH_PREVIEW from SQL, or through the REST API from an application.

## Segment 4 (steps: the shape of a RAG pipeline)

A typical retrieval-augmented pipeline looks like this: Cortex Search returns the top relevant chunks for a question, those chunks get stitched into a prompt alongside the question, and that combined prompt goes to AI_COMPLETE — so the answer is grounded in your actual documents instead of whatever the model memorized during training. This two-step shape — retrieve, then generate — is the whole idea behind RAG, and it's worth knowing by hand even once an agent is doing it for you.

## Segment 5 (outro)

Next lesson shows how Cortex Agents wrap this entire retrieve-then-generate pattern — plus Cortex Analyst — into a single orchestrated tool call, handling multi-step questions without you writing the pipeline by hand.
