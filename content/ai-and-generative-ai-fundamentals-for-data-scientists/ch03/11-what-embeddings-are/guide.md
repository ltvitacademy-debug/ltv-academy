# What Embeddings Are

Machine learning models work on numbers, but a lot of the data you care about is text: support tickets, product descriptions, reviews, documents. An **embedding** is a list of numbers, a vector, that represents a piece of text (or an image, or a product) so that similar things end up close together. Embeddings are the foundation of semantic search and retrieval, which is where this chapter is heading, and they are how modern LLM applications connect a model to your own data.

## What you'll learn

- Why one-hot or bag-of-words vectors cannot express meaning
- What a dense embedding is, and what "close" means (cosine similarity)
- A small runnable example: turning tickets into embeddings with TF-IDF and SVD
- Where real-world embeddings come from

## The problem with one-hot vectors

The simplest way to turn words into vectors is one-hot encoding: one column per vocabulary word, a 1 in the column for the word. You already used this idea in feature engineering. Its weakness is that every word is equally different from every other word:

```python
import numpy as np

onehot = np.eye(3)   # car, automobile, banana
def cos(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

print(cos(onehot[0], onehot[1]))   # car vs automobile
print(cos(onehot[0], onehot[2]))   # car vs banana
```

Both lines print `0.0`. To a one-hot representation, "car" and "automobile" are exactly as unrelated as "car" and "banana". The same problem affects TF-IDF or bag-of-words vectors for whole texts: two tickets that mean the same thing but share no words look completely different. These vectors are also huge (one dimension per vocabulary word) and mostly zeros.

## Dense embeddings

An embedding replaces that with a short, dense vector, often tens to thousands of dimensions, learned so that texts used in similar contexts get similar vectors. Similarity is usually measured with **cosine similarity**: the cosine of the angle between two vectors, which is 1 for the same direction, near 0 for unrelated, and negative for opposite. Because it ignores vector length, it compares direction, which is what carries meaning here.

You can see the effect with a classic technique, latent semantic analysis: TF-IDF followed by a truncated SVD, which compresses the sparse matrix into a few dense dimensions based on which words co-occur. We use 15 short, made-up tickets in three topics (billing, shipping, login):

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity

# docs: 15 short tickets (see the full list below)
X = TfidfVectorizer().fit_transform(docs)      # sparse
E = TruncatedSVD(n_components=3, random_state=0).fit_transform(X)
print(X.shape, E.shape)                        # (15, 35) (15, 3)

S_sparse = cosine_similarity(X)
S_dense = cosine_similarity(E)
print(round(S_sparse[1, 2], 2))   # 0.0
print(round(S_dense[1, 2], 2))    # 1.0
```

Tickets 1 ("charge on my card was wrong") and 2 ("please refund the payment") share no words, so their TF-IDF cosine is 0.0. In the 3-dimensional embedding their cosine is 1.0 (rounded), because the compression grouped words that appear in the same kinds of tickets. The full list used: refund my card charge; charge on my card was wrong; please refund the payment; payment failed on my card; refund the wrong card payment; package delivery is late; my parcel shipment has not arrived; shipment delivery delayed again; parcel arrived damaged in shipment; late package delivery again; cannot login to my account; password reset link not working; account locked after login attempt; reset my password please; login password not working.

The heatmap below plots every pairwise cosine similarity. It is the output of that same code, with a small plotting loop added. The dense version shows clear blocks: the billing tickets group tightly, and the shipping and login tickets mostly form their own groups (a couple of shipping tickets, such as 6 and 8, still look partly like login tickets, since 3 dimensions is very few). Real embeddings are learned from far more data, so this effect is much stronger and works on nuance, not just topics.

## Where real embeddings come from

- **Word embeddings** such as word2vec and GloVe learn a vector per word from co-occurrence in large text corpora. A famous, approximate example is that vector("king") minus vector("man") plus vector("woman") lands near vector("queen").
- **Sentence and document embeddings** come from transformer encoder models trained specifically so that similar texts have similar vectors. You call them through a Python library or a hosted API and get back one vector per text. The next lesson shows the code.
- **Other data** (images, audio, products, users) can be embedded too.

One rule matters a great deal: only compare vectors produced by the **same model**, and embed your queries with the same model as your documents.

## Recap

An embedding is a dense vector whose geometry reflects meaning: close vectors mean similar items, measured with cosine similarity. One-hot and TF-IDF vectors cannot see synonyms, while even a tiny SVD embedding can. Next: creating and comparing embeddings in practice.
