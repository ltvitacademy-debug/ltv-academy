Last lesson introduced embeddings. This one is the practical follow-up: how you create them, embed new text, and compare vectors to rank results.

Every embedding application follows the same four steps. Create the embeddings with one model. Embed the query with that same model. Compare it to every stored vector. Then rank by score and keep the top few.

Here's step one in scikit-learn, reusing our fifteen support tickets. We fit a TF-IDF vectorizer and a truncated SVD once, and wrap them in an embed function. The important detail is that at query time you call transform, never fit_transform. The query has to pass through the exact same fitted model as the documents.

Now the search. Embed the query, my parcel is late. Compute its cosine similarity to every ticket, sort, and print the top three. We got shipment delivery delayed again at point nine four, then late package delivery again, and package delivery is late, both at point nine one. All shipping tickets.

The chart shows every score. Tickets five through nine, the shipping ones, stand well above the rest. This embed, score, sort loop is the core of semantic search.

You have three ways to compare vectors. Cosine looks at angle only. The dot product also depends on length, but on unit-length vectors it equals cosine. And squared Euclidean distance on unit vectors equals two minus two times the cosine, so smaller distance means higher similarity. That's why many systems normalize once, then use the fast dot product.

In practice you'd use a pretrained model, such as one from the sentence-transformers library. That code is shown here but was not run in this course environment, so check the current docs for model names and sizes.

Next: what to do when you have millions of vectors, in vector databases.
