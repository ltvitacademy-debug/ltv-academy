# Script — Multi-Head Attention

## Segment 1 (title)

A single attention computation over the full embedding width gives a model exactly one way to decide what's relevant. Multi-head attention gives it several, by splitting the embedding dimension into smaller subspaces and running a separate attention computation in each one, in parallel.

## Segment 2 (steps)

If the model dimension is 64 and you use 4 heads, each head works in a 16-dimensional subspace, with its own learned query, key, and value projections. Attention runs independently in each subspace, and the outputs get concatenated back to the full width, then passed through one shared output projection.

## Segment 3 (steps)

Why not just run full-width attention four times instead? Because that's identical computation repeated at four times the cost. Splitting into subspaces gives each head its own projections, so different heads are free to specialize during training — one might track nearby words, another longer-range dependencies. Repeating the same computation gives you no such diversity.

## Segment 4 (code)

In PyTorch, nn.MultiheadAttention takes embed_dim and num_heads, and embed_dim has to divide evenly by num_heads. Calling it looks just like the self and cross-attention you already know — query, key, value in, same-shaped output out.

## Segment 5 (code)

Internally, it reshapes your projections into one extra dimension for heads, runs attention per head, concatenates them back, and applies one final linear layer. You never manage that reshape yourself — the module handles it.

## Segment 6 (outro)

Next up: positional encoding — because none of this attention math has any idea what order the tokens came in, and that has to be fixed separately.
