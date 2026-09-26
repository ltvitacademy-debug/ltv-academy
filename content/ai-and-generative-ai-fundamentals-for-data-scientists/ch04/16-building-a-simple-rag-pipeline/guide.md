# Building a Simple RAG Pipeline

In the last lesson you saw why retrieval-augmented generation exists: a language model does not know your documents, so you fetch the relevant passages and put them in the prompt. Now you will build the whole loop yourself, small enough to read in one sitting. The retrieval half runs entirely on your laptop using scikit-learn. The generation half is shown as clearly labeled code that is **not run here**, because calling a hosted model needs an API key and a network connection. The next lesson covers that call in detail.

This course is deliberately lighter than the AI Engineer path, which goes much deeper on chunking, vector databases, and re-ranking. Here the goal is that you understand every moving part.

## What you'll learn

- The four steps of a minimal RAG pipeline
- How to index documents and retrieve the best matches with TF-IDF and cosine similarity
- How to assemble a grounded prompt from retrieved context
- Why a similarity threshold matters, and where lexical retrieval breaks

## The four steps

1. **Index.** Turn each document into a vector, once, ahead of time.
2. **Retrieve.** Turn the question into a vector the same way and find the closest documents.
3. **Assemble.** Paste the top documents into a prompt with clear instructions.
4. **Generate.** Send that prompt to a language model and return its answer.

## A tiny document set

We use five short, made-up help-center snippets for an imaginary retailer. They are illustrative, not real policies. In a real project each item would be a chunk of a longer document.

```python
docs = [
    "Returns: items can be returned within 30 days of delivery for a full refund.",
    "Shipping: standard shipping takes 3 to 5 business days; express takes 1 to 2.",
    "Loyalty: members earn 1 point per dollar spent and 2 points on weekends.",
    "Warranty: electronics carry a one year warranty against manufacturing defects.",
    "Gift cards: gift cards never expire and cannot be exchanged for cash.",
]
```

## Index and retrieve

TF-IDF gives each word a weight that is high when the word is frequent in one document but rare across the set. Cosine similarity then compares the question's vector to each document's vector. This is the same similarity measure you met with embeddings, just applied to word counts instead of learned vectors.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

vec = TfidfVectorizer(stop_words="english")
doc_matrix = vec.fit_transform(docs)

def retrieve(question, k=2, min_score=0.1):
    q = vec.transform([question])
    scores = cosine_similarity(q, doc_matrix).ravel()
    top = scores.argsort()[::-1][:k]
    return [(int(i), round(float(scores[i]), 3))
            for i in top if scores[i] >= min_score]
```

Running it on four questions gave this output:

```
How many days do I have to return an item? -> [(0, 0.313), (1, 0.236)]
How many points do I earn on weekends? -> [(2, 0.612)]
How long do I have to send an item back? -> []
What is the airspeed of a swallow? -> []
```

The first two work. The shipping document sneaks into the first result only because it also contains the word "days", a small reminder that retrieval returns candidates, not truths. The swallow question correctly returns nothing: the `min_score` threshold is your first defense against answering from irrelevant text.

The third question is the interesting failure. "Send an item back" means the same as "return an item", but TF-IDF only sees shared words, and none are shared. This is exactly the gap that embeddings close, because they compare meaning rather than spelling. In a real pipeline you would swap the vectorizer for an embedding model and keep everything else the same.

## Assemble the prompt

```python
def build_prompt(question, hits):
    context = "\n".join(f"[{i}] {docs[i]}" for i, _ in hits)
    return (
        "Answer using ONLY the context. "
        "If it is not there, say you don't know.\n\n"
        f"Context:\n{context}\n\nQuestion: {question}"
    )
```

The numbered brackets let the model cite which snippet it used, and the "only the context" instruction is what keeps the answer grounded.

## Generate (not run here)

```python
# NOT RUN HERE: needs an API key and network access.
prompt = build_prompt(question, hits)
answer = call_llm(prompt)   # defined in the next lesson
```

Notice that `call_llm` is just a function that takes text and returns text. Keeping it that narrow means you can swap providers, or replace it with a fake during testing, without touching the retrieval code.

## Recap

A RAG pipeline is index, retrieve, assemble, generate. Retrieval can be plain TF-IDF and cosine similarity, and it runs locally. Add a score threshold so unrelated questions get "I don't know" instead of a guess, and expect lexical retrieval to miss paraphrases, which is when you reach for embeddings. Next: the `call_llm` function itself.
