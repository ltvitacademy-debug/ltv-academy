Last lesson you saw attention as a weighted average over every position. The Transformer, from the 2017 paper Attention Is All You Need, stacks that idea into a repeatable block. Almost every large language model you'll use is a variant of it. Let's build one block in numpy.

A block has two sublayers: multi-head attention, then a feed-forward network, a small MLP applied to each position. Each is wrapped in a residual connection, which adds the input back to the output, and layer normalization, which keeps values in a stable range. That's what makes deep stacks trainable.

Inside attention, learned matrices turn each token into a query, a key, and a value. Scores are the query times the key, divided by the square root of the head size so the softmax doesn't saturate. Multi-head runs several of these in parallel on slices of the vector. For text generation, a causal mask blocks each token from seeing later ones. Our block returns the same shape it received, five by sixteen, so blocks stack. And the weights are lower-triangular, with every row summing to one.

Now a puzzle. Attention alone treats its input as a set. We proved it: shuffle the tokens, and the output is just shuffled the same way, with a difference of about ten to the minus fifteen. Word order is invisible. So we add positional encodings, patterns of sines and cosines, one unique pattern per position. With them, the same test gives a difference of two point zero three. Order now matters.

The chart shows both: the positional encoding, and the causal attention weights, with random untrained weights.

Finally, size. A block has roughly twelve times the model dimension squared in parameters. Adding up every weight for a GPT-2-small-shaped model gives one hundred twenty-four million, matching its reported size.

Next lesson: how a model like this is actually trained.
