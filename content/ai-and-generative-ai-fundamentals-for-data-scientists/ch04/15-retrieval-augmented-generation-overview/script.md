A language model writes fluent answers, but it only knows its training data, and it can hallucinate. Your return policy, last quarter's numbers, and this week's tickets aren't in there. Retrieval-augmented generation, or RAG, fixes that by using search to find relevant passages from your own data, then putting them in the prompt so the model answers from them. The AI Engineer path goes much deeper; this is the working picture.

RAG has three steps. Retrieve: search your index for the top few chunks. Augment: build a prompt containing the instructions, those chunks, and the question. Generate: the LLM writes an answer using that context. Indexing happens ahead of time. The other three happen on every question.

Here's a runnable miniature with a six-chunk policy knowledge base. Retrieval uses a minimum score, so weak matches are dropped instead of passed to the model.

Prompt building follows. The instructions say answer only from the context, and say you don't know if the answer isn't there. And if retrieval found nothing relevant, the function returns None, so your application can respond or hand off to a person.

For how long do refunds take, retrieval found the refund chunk, and the prompt carries exactly that context. For can I pay with bitcoin, nothing matched, so no prompt is built. We haven't called an LLM here; that comes soon.

RAG can fail in predictable ways. Retrieval can miss the right chunk, so measure precision and recall at k. Chunks can be badly split. The index can go stale. And answers can drift from the context, so return sources and check faithfulness on a labeled set.

Next: building a simple RAG pipeline.
