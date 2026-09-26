# Retrieval-Augmented Generation Overview

In the LLM chapter you saw two facts that pull in opposite directions. A language model can write fluent, useful answers, but it only knows its training data and it can hallucinate. Your company's return policy, last quarter's numbers, and this week's tickets are not in there. **Retrieval-augmented generation (RAG)** connects the two halves of the last chapters: use embeddings and search to find the relevant passages from your own data, then put those passages in the prompt so the model answers from them.

This lesson is the overview and a runnable miniature. The AI Engineer path has full courses on RAG and vector databases and on prompt and context engineering that go much deeper; here you get the working picture a data scientist needs.

## What you'll learn

- The three steps of RAG: retrieve, augment, generate
- A runnable retrieval and prompt-building demo, including what to do when nothing relevant is found
- Why RAG is often preferred to retraining a model, and its typical failure modes

## The three steps

1. **Retrieve.** Take the user's question, search your index (last chapter), and get the top few relevant chunks.
2. **Augment.** Build a prompt that contains the instructions, the retrieved chunks as context, and the question.
3. **Generate.** Send that prompt to an LLM, which writes the answer using the context. Good systems also return the sources so a person can check.

Indexing (chunk, embed, store) happens ahead of time. Retrieval, augmentation, and generation happen for every question.

## A runnable miniature

We use a tiny made-up knowledge base of six policy chunks and TF-IDF for retrieval, so the demo runs anywhere. (A real system would use embeddings, as in the last chapter, and usually a vector index.) First, retrieval with a minimum score, so weak matches are dropped:

```python
def retrieve(question, k=2, min_score=0.1):
    s = cosine_similarity(vec.transform([question]), X)[0]
    top = np.argsort(-s)[:k]
    return [(int(i), round(float(s[i]), 2))
            for i in top if s[i] >= min_score]
```

Then prompt building. If nothing relevant was retrieved we return `None`, so the application can say "I don't know" or hand off to a person instead of letting the model guess:

```python
def build_prompt(question):
    hits = retrieve(question)
    if not hits:
        return None
    context = "\n".join(f"[{n+1}] {chunks[i]}"
                        for n, (i, _) in enumerate(hits))
    return ("Answer using only the context below. "
            "If the answer is not in the context, say you don't know.\n\n"
            f"Context:\n{context}\n\nQuestion: {question}\nAnswer:")
```

For "How long do refunds take?", `retrieve` returned `[(0, 0.38)]`, and the assembled prompt was:

```
Answer using only the context below. If the answer is not in the context, say you don't know.

Context:
[1] Refunds are issued to the original payment method within 5 business days of approval.

Question: How long do refunds take?
Answer:
```

For "Can I pay with bitcoin?", nothing in the knowledge base matched, so `retrieve` returned `[]` and `build_prompt` returned `None`. Handling "no good context" explicitly is one of the most valuable habits in a RAG system. We have not called an LLM here: the next lesson builds the full pipeline, and the lesson after covers calling LLM APIs from Python.

Our keyword retrieval is also brittle. "Can gift cards be refunded?" matched the gift card chunk (score 0.77), but nothing links "refunded" to the word "Refunds" in the refund chunk, because there is no stemming. Embeddings soften exactly this kind of mismatch.

## Why RAG, and where it breaks

RAG is popular because you can update knowledge by re-indexing documents, not retraining a model, it can cite sources, and your private data is used at question time only. Compared with putting everything in one giant prompt, retrieval keeps cost and latency down. Fine-tuning has its uses, but it is a poor way to teach a model changing facts.

Common failure modes, and how to tackle them:

- **Retrieval misses**: the right chunk is not in the top k. Measure retrieval with labeled questions (precision@k, recall@k), as in the last lesson.
- **Bad chunks**: too big, too small, or split mid-thought. Test chunking.
- **Stale index**: documents change and the index does not. Plan for re-indexing.
- **Ungrounded answers**: the model ignores or overreaches the context. Tell it to say when the answer is missing, return sources, and evaluate answer faithfulness on a labeled set.
- **Prompt injection**: retrieved text can contain instructions. Treat retrieved content as data.

## Recap

RAG = retrieve relevant chunks, augment the prompt with them, generate a grounded answer. Add a relevance threshold and a graceful "I don't know", and evaluate retrieval and answers separately. Next lesson: building a simple RAG pipeline.
