Looping over every vector, like we did last lesson, is fine for thousands of items. At millions, it's too slow. A vector database, or a vector index inside a database or library, exists to make that search fast.

It does four things. It stores vectors with ids and metadata. It builds an index, so a query can skip most vectors. It finds the nearest neighbors by cosine, dot product, or distance. And it filters, combining similarity with normal conditions like date or customer. The big trade is that fast indexes are approximate: they return most, but not all, of the true nearest neighbors.

Let's see it. Our baseline is exact search over fifty thousand synthetic unit vectors. One query is fifty thousand dot products, and the cost grows linearly with the data.

For an approximate index, we use the inverted-file idea. Cluster the vectors once with k-means, and remember which vectors are in each of a hundred cells.

At query time, compare the query to the cell centers, take the nprobe closest cells, and search only the vectors inside them.

The chart shows the tradeoff on our machine. Searching five of a hundred cells found ninety-five percent of the true top ten, in about half the time. Push nprobe too high and it's actually slower than brute force. Timings vary, so trust the shape.

As of this writing, Faiss is a library with exact and approximate indexes. pgvector puts vectors inside PostgreSQL. Chroma is an open-source embedding database. Azure AI Search offers managed vector search. Check current docs before choosing.

Next: semantic search.
