Most of the data you care about is text, but models work on numbers. An embedding is a list of numbers, a vector, that represents a piece of text so that similar things end up close together. Embeddings are the foundation of semantic search and of connecting a language model to your own data.

Why not just one-hot encode words? Because every word is then equally different from every other. Car and automobile have a cosine similarity of zero, exactly the same as car and banana. Bag-of-words and TF-IDF vectors for whole texts have the same problem: two tickets that mean the same thing but share no words look completely unrelated.

A dense embedding fixes that. It's a short vector, tens to thousands of numbers, learned so that texts used in similar contexts get similar vectors. Closeness is measured with cosine similarity, which compares direction, not length.

You can see it with a classic technique: TF-IDF followed by a truncated SVD. Take two support tickets, charge on my card was wrong, and please refund the payment. They share no words, so their TF-IDF cosine is zero. After compressing to three dimensions, their cosine is about one.

On the heatmap, the sparse version on the left is mostly near zero. The dense version on the right shows clean blocks: billing, shipping, and login tickets mostly group together.

Real embeddings come from models trained on far more data. Word embeddings like word2vec give one vector per word. Sentence encoders, built on transformers, give one vector per text. One rule matters: always embed your queries and your documents with the same model. Next, we'll create and compare embeddings in practice.
