Keyword search finds documents that contain your words. Semantic search finds documents that mean what you asked, even when the words differ. It's the payoff of the last three lessons, and the retrieval half of retrieval-augmented generation.

The pipeline has four moves. Chunk your documents into passages. Embed each chunk with one model, and store the vectors with metadata. Embed the query with that same model. Then retrieve the top k, optionally filtering by metadata.

Let's compare keyword and semantic search on our fifteen tickets. One function scores by TF-IDF, the other by our three-dimensional embedding. A search helper returns the top few results and drops anything with a score of zero.

For locked out of account, both methods find the ticket, account locked after login attempt. But look at reimbursement. That word isn't in our tiny vocabulary at all, so neither method returns anything. Our embedding only knows words it has seen. A pretrained sentence model handles new words and paraphrases far better, but no embedding is magic, so measure it.

Score each method with precision at three: of the top three results, how many are the right topic? Over nine queries, keyword search averaged point seven four, and semantic search point eight one.

The chart shows where. Semantic search won on two queries and tied on the rest. With nine queries, that's a tiny illustrative test, not proof.

To do better, try hybrid search, metadata filters, reranking, and careful chunking, which often matters more than the model. Next: retrieval-augmented generation.
