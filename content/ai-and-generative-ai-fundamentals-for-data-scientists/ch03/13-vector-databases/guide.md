# Vector Databases

In the last lesson you ranked 15 tickets by looping over every vector. That "compare against everything" approach is called brute-force or exact search, and it is perfectly fine for thousands of vectors. At millions or billions of vectors, and with many users querying at once, it becomes too slow and too expensive. A **vector database** (or a vector index inside a database or library) exists to make this search fast, using approximate methods, and to manage the vectors alongside their metadata.

## What you'll learn

- What a vector database actually does
- The idea behind approximate nearest neighbor (ANN) search and the speed versus recall tradeoff
- A runnable brute-force versus IVF-style demo in numpy and scikit-learn
- How to think about the main tool options, without picking a winner

## What a vector database does

Most vector stores provide four things:

1. **Storage** of vectors together with an id and metadata (source document, date, customer, category).
2. **An index** that organizes vectors so a search does not have to touch all of them.
3. **Nearest-neighbor search**: given a query vector, return the top k closest vectors, with a distance metric such as cosine, dot product, or Euclidean.
4. **Filtering**: combine similarity with ordinary conditions, such as "only documents from 2025" or "only this customer".

The big trade is that fast indexes are usually **approximate** (ANN): they return most, but not necessarily all, of the true nearest neighbors. The quality is measured by **recall@k**: of the true top k, what fraction did the index return?

## The baseline: exact search

We generate 50,000 synthetic 64-dimensional unit vectors in 100 loose clusters (a stand-in for real embeddings; illustrative only). Exact search is one matrix-vector product:

```python
def exact_top(q, m=10):
    s = X @ q
    idx = np.argpartition(-s, m)[:m]
    return idx[np.argsort(-s[idx])]
```

Because the vectors are normalized, the dot product equals cosine similarity. Each query costs 50,000 dot products, and the cost grows linearly with the number of vectors.

## An approximate index: cluster, then search only nearby clusters

A widely used idea is the inverted file, or IVF index: cluster the vectors once with k-means, remember which vectors belong to which cluster, and at query time compare the query only to the cluster centers, then search only the vectors in the closest few clusters.

```python
km = KMeans(n_clusters=100, n_init=1, random_state=0).fit(X)
lists = [np.where(km.labels_ == c)[0] for c in range(100)]

def approx_top(q, m=10, nprobe=5):
    sims = km.cluster_centers_ @ q
    near = np.argsort(-sims)[:nprobe]
    cand = np.concatenate([lists[c] for c in near])
    s = X[cand] @ q
    top = np.argsort(-s)[:m]
    return cand[top]
```

`nprobe` is how many clusters to search. A larger value means more work and better recall. (The name and idea match the `nprobe` parameter of IVF indexes in the Faiss library.) We ran 200 noisy queries and compared results to the exact top 10:

```
nprobe   ms/query   recall@10
1        0.15       0.71
2        0.23       0.86
3        0.32       0.90
5        0.83       0.95
10       1.55       0.98
20       3.00       1.00
exact    1.69       1.00
```

The chart below plots these numbers, and comes from the same code plus a short plotting loop. Timings depend on your machine and vary between runs, so trust the shape more than the exact milliseconds. Three lessons stand out. First, searching just 5 of 100 clusters found 95 percent of the true top 10 at roughly half the exact-search time. Second, pushing `nprobe` too high made the approximate search slower than brute force here, because our exact search is a single fast matrix multiply on a modest 50,000 vectors. Third, the advantage of an index grows with dataset size; on a few thousand vectors, just use exact search.

Real systems use more sophisticated indexes (graph-based HNSW, compressed product quantization) but the tradeoff is the same: tune the index parameters, measure recall against exact search on your own data, and choose the speed you need.

## The tool landscape (as of this writing)

Check current documentation before choosing; this space changes quickly.

- **Faiss** is a library from Meta for similarity search. It offers exact indexes such as `IndexFlatL2` and approximate ones such as `IndexIVFFlat` and `IndexHNSWFlat`. You manage storage and metadata yourself.
- **pgvector** adds vector columns and search to PostgreSQL. Its documentation says it performs exact search by default and supports approximate HNSW and IVFFlat indexes, so you keep vectors next to your relational data.
- **Chroma** is an open-source embedding database aimed at getting started quickly with LLM applications.
- **Cloud services** such as Azure AI Search offer managed vector search, often combined with keyword search and filters.

A sensible data-science rule: begin with exact search or a library while you validate that your embeddings work, and adopt a database when you need scale, filtering, persistence, or many concurrent users.

## Recap

A vector database stores embeddings with metadata and finds nearest neighbors quickly, usually by approximate search that trades a little recall for a lot of speed. Measure recall against exact search on your own data. Next lesson: putting embeddings and search together as semantic search.
