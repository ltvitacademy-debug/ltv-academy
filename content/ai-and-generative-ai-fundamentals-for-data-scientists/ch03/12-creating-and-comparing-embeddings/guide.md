# Creating & Comparing Embeddings

Last lesson introduced embeddings as dense vectors whose closeness reflects meaning. This lesson is the practical follow-up: how you actually create them, how you embed a brand-new piece of text, and how you compare vectors and rank results. Everything in the runnable examples uses scikit-learn, so you can try it on your own machine with nothing extra installed.

## What you'll learn

- The create, then compare, then rank workflow that every embedding application follows
- How to embed a new query with the same fitted model
- Cosine similarity, dot product, and Euclidean distance, and how they relate on unit vectors
- What the same workflow looks like with a pretrained sentence-embedding model (shown, not run here)

## Step 1: create embeddings with a fitted model

We reuse the 15 short billing, shipping, and login tickets from the last lesson. The key point: the embedding is produced by a fitted pipeline (TF-IDF vectorizer, then SVD), and to embed anything new you must push it through the same fitted objects, not refit on the new text.

```python
vec = TfidfVectorizer()
svd = TruncatedSVD(n_components=3, random_state=0)
E = svd.fit_transform(vec.fit_transform(docs))

def embed(texts):
    return svd.transform(vec.transform(texts))
```

`E` has shape (15, 3): one row per ticket. `embed` is the function you would call for any new text. This is the "same model for queries and documents" rule from the last lesson in code form: use `transform`, not `fit_transform`, at query time.

## Step 2: compare and rank

To find tickets similar to a new query, embed the query, compute its cosine similarity to every stored vector, and sort:

```python
q = embed(["my parcel is late"])
scores = cosine_similarity(q, E)[0]
for i in np.argsort(-scores)[:3]:
    print(i, round(scores[i], 2), docs[i])
```

Output:

```
7 0.94 shipment delivery delayed again
9 0.91 late package delivery again
5 0.91 package delivery is late
```

All three are shipping tickets, even though the query's words "parcel" and "my" barely overlap with them. The bar chart below is the output of the same code with a few matplotlib lines added: tickets 5 to 9 (shipping) score high, everything else is far lower. This "embed, score everything, sort" loop is the core of semantic search, and we will build on it in the next lessons.

## Three ways to compare vectors

- **Cosine similarity** compares direction (angle) only.
- **Dot product** multiplies matching components and sums; it rewards both direction and length.
- **Euclidean distance** measures straight-line distance.

When vectors are normalized to unit length, all three agree on ranking. We can check it on tickets 1 and 2:

```python
from sklearn.preprocessing import normalize
U = normalize(E)
a, b = U[1], U[2]
print("cosine", round(a @ b, 3), "dot", round(np.dot(a, b), 3))
print("euclid^2", round(np.sum((a-b)**2), 3), "2-2cos", round(2-2*(a @ b), 3))
```

This printed `cosine 0.999 dot 0.999` and `euclid^2 0.002 2-2cos 0.002`. For unit vectors, the dot product equals cosine, and squared Euclidean distance equals 2 minus 2 times cosine, so smaller distance means higher similarity. That is why many systems normalize vectors once and then use the fastest operation, the dot product.

## The same workflow with a pretrained model (not run here)

In practice you would usually use a pretrained sentence-embedding model instead of TF-IDF and SVD. The `sentence-transformers` library is one popular option. It is not installed in this course environment, so the code below was not run here; it follows the library's official quickstart:

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = model.encode(sentences)      # one row per sentence
print(embeddings.shape)                   # docs show [3, 384] for 3 sentences
similarities = model.similarity(embeddings, embeddings)
```

According to the documentation, `similarity` computes cosine similarity by default and returns a matrix of pairwise scores. Hosted embedding APIs from cloud providers work similarly: you send text and get back vectors. Check the current documentation for model names, output sizes, and limits, since those change often. The downloaded model needs internet access the first time it runs.

## Recap

Creating embeddings means fitting or loading a model and using the same model for every later `transform` or `encode`. Comparing means cosine (or dot product on normalized vectors), and ranking is a sort. Next: what happens when you have millions of vectors and a brute-force loop is too slow, which is the job of a vector database.
