# Semantic Search

Ordinary keyword search finds documents that contain your words. **Semantic search** finds documents that mean what you asked, even when the words differ: a search for "money taken from my card twice" should surface a ticket about a duplicate charge. It is the payoff of the last three lessons: embeddings give the meaning-aware vectors, similarity gives the ranking, and a vector index makes it fast. It is also the retrieval half of the retrieval-augmented generation pattern you will meet next.

## What you'll learn

- The pipeline behind a semantic search system
- A runnable comparison of keyword and semantic search on the support tickets
- How to evaluate search quality with precision@k, and how to read a small result honestly
- Where hybrid search, filters, and reranking fit in

## The pipeline

1. **Chunk** your documents into passages of a sensible size. Very long passages blur meaning; very short ones lose context.
2. **Embed** each chunk with one model and store the vectors with metadata (an index or vector database for large collections).
3. **Embed the query** with the same model.
4. **Retrieve** the top k chunks by similarity, optionally applying metadata filters.
5. **Present or reuse** the results: show them to a user, or pass them to an LLM (next chapter).

## Keyword versus semantic search, side by side

We reuse the 15 billing, shipping, and login tickets and both representations from earlier lessons: TF-IDF (keyword matching) and the 3-dimensional SVD embedding (semantic). `topic` records the true topic of each ticket: 0 billing, 1 shipping, 2 login. Each function returns a score for every ticket, and `search` returns the top k, dropping any score of zero (no match at all):

```python
def kw(q):
    return cosine_similarity(vec.transform([q]), X)[0]

def sem(q):
    v = svd.transform(vec.transform([q]))
    return cosine_similarity(v, E)[0]

def search(scores, k=3):
    top = np.argsort(-scores)[:k]
    return [i for i in top if scores[i] > 0]
```

Trying two queries printed:

```
locked out of account | keyword  -> ['account locked after login attempt']
locked out of account | semantic -> ['account locked after login attempt']
reimbursement | keyword  -> []
reimbursement | semantic -> []
```

The first query is easy for both, since it shares words with the right ticket. The second is a warning: "reimbursement" is not in our 15-ticket vocabulary at all, so neither method can do anything with it. Our SVD embedding only knows words it saw while fitting. A pretrained sentence-embedding model, trained on huge amounts of text, handles unseen words and paraphrases far better, which is why real systems use one. But no embedding is magic, so you must test.

## Measuring quality: precision@k

Write a small labeled set of queries with the topic each should retrieve, and score each method with **precision@3**: of the top 3 results, what fraction are in the correct topic? A method that returns nothing scores 0 for that query.

```python
def prec(f, q, t):
    hits = search(f(q), 3)
    return sum(topic[i] == t for i in hits) / 3
```

Across nine queries (such as "money taken from my card twice", "delivery not here yet", "update my password"), the mean precision@3 was 0.74 for keyword search and 0.81 for the semantic version. The chart below is the output of this same code with a short plotting loop. Semantic search was better on two queries ("delivery not here yet" and "locked out of account"), tied on the rest, and both failed on the out-of-vocabulary query and did poorly on "cannot sign in" (the word "sign" was also unseen). With only nine queries, this is a tiny illustrative test, not proof; a real evaluation needs many more queries, judged by people who know the domain.

## Beyond the basics

- **Hybrid search** combines keyword and vector scores, so exact terms (product codes, names, error numbers) still match precisely while paraphrases also work. Many search services support this; check the documentation of your tool.
- **Metadata filtering** restricts results by date, customer, or category before or during similarity search.
- **Reranking** takes the top 20 or 50 candidates and reorders them with a more expensive model. It is a common quality boost, and a topic for the AI Engineer path.
- **Chunking choices** often matter more than the choice of embedding model. Test them.

## Recap

Semantic search = chunk, embed, index, embed the query, retrieve. It helps most when users paraphrase, but only as good as the embedding model, so measure it with labeled queries and metrics like precision@k. Next up: feeding retrieved passages to an LLM, which is retrieval-augmented generation.
