In this lesson you build a complete retrieval-augmented generation pipeline small enough to read in one sitting. The retrieval half runs locally on your laptop. The generation half is shown as code we do not run, because it needs an API key.

A minimal pipeline has four steps. Index the documents once. Retrieve the closest ones for each question. Assemble a prompt that pastes them in. Then generate an answer from that prompt.

Our document set is five short, made-up help-center snippets for an imaginary retailer. We index them with scikit-learn's TF-IDF vectorizer, then score a question against every document with cosine similarity. A minimum score keeps only real matches.

Here is what running it produced. Asking how many days you have to return an item finds the returns policy first. Asking about weekend points finds the loyalty document with a score of about point six. The swallow question returns nothing, and that is correct, because the threshold refuses to answer from irrelevant text.

Now the honest failure. Ask how long you have to send an item back, and retrieval returns nothing. TF-IDF only matches shared words, and send back shares none with return. This is exactly the gap embeddings close, because they compare meaning instead of spelling.

The prompt then tells the model to answer using only the context, and to say it doesn't know otherwise. Numbered snippets let it cite what it used. The final call is a function named call-LLM, marked clearly as not run here. Keeping it a narrow text-in, text-out function means you can swap providers or fake it in tests. The AI Engineer path goes much deeper on chunking and re-ranking. Next lesson: writing that function.
