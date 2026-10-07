# Script — Building a Decoder-Only Transformer

## Segment 1 (title)

Every piece is on the table now: attention, multi-head attention, positional encoding, the transformer block, and pre-norm residuals. This lesson wires all of it into one working model — a tiny decoder-only GPT, the same architecture real language models use, just with smaller numbers.

## Segment 2 (steps)

On top of a stack of transformer blocks, a decoder-only model adds four pieces. Token embedding and positional embedding turn integer IDs into vectors and tell the model where each token sits. The stack of blocks runs under a causal mask, so no position can peek at the future. And a final norm plus a linear head turn each position's vector into a score for every word in the vocabulary.

## Segment 3 (code)

The causal mask comes from torch dot triu, which keeps the upper triangle of a matrix and zeroes the rest. With diagonal equals one, mask at i, j is true exactly when j is greater than i — a future position. Passed into multi-head attention, true means do not attend there.

## Segment 4 (code)

Tiny GPT's constructor builds a token embedding, a positional embedding, a module list of transformer blocks, a final layer norm, and a linear head projecting back out to vocabulary size. It's an nn dot module list specifically, so every block's parameters register correctly for training.

## Segment 5 (code)

In the forward pass, token and positional embeddings are added together, the causal mask is rebuilt for the current sequence length, and x flows through every block in the stack, unchanged in shape the whole way. One final norm, one linear head, and the output is batch by sequence length by vocabulary size — a full distribution over next-token predictions, everywhere at once.

## Segment 6 (outro)

Up next, Lesson 41: implementing the training loop for a tiny GPT.
