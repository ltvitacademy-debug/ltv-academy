# "Attention Is All You Need," Reading the Paper

Everything in this chapter — attention, multi-head attention, positional encoding, the case against recurrence — comes from one 2017 paper: Vaswani et al.'s "Attention Is All You Need" (arXiv:1706.03762). This lesson closes the chapter by walking through what the paper actually proposed, in plain terms, so you can read it yourself with real footing. We describe the architecture in our own words and our own diagrams here — we don't reproduce the paper's figures.

## What you'll learn

- The paper's core claim, and why it was a bigger deal than it might sound
- The encoder-decoder architecture it introduced, piece by piece
- How multi-head attention and positional encoding fit into that whole
- Why this specific paper became the ancestor of essentially every modern LLM

## The core claim

The paper's title is also its thesis: you can build a strong sequence-to-sequence model (the kind used for machine translation, which is what the paper benchmarks on) using **attention alone** — no recurrence, no convolution. Up to that point, the strongest sequence models were RNN- or LSTM-based, processing tokens one at a time. The paper's architecture, which it names the **Transformer**, replaces every bit of that recurrence with the self-attention and cross-attention mechanisms you built earlier in this chapter.

## The architecture, in our own words

The Transformer is an encoder-decoder model, each side built from a stack of identical layers (6 layers each, in the paper's base configuration):

- **Encoder stack** — each layer: self-attention over the input sequence, then a feed-forward sublayer, with a residual connection and layer normalization around each (you'll build this exact pattern of sublayer in Chapter 6). The encoder reads the full source sentence and produces a contextualized representation of it.
- **Decoder stack** — each layer: *masked* self-attention (a token can only attend to earlier tokens — causal masking, which you'll implement in Chapter 6), then cross-attention over the encoder's output (exactly the mechanism from Lesson 32), then a feed-forward sublayer — again with residuals and layer norm around each piece.
- **Input processing** — token embeddings plus positional encoding (Lesson 34), since none of the attention math has any built-in sense of order.
- **Output** — the decoder's final representation is projected to vocabulary-sized logits and turned into a probability distribution with softmax.

As an original LTV diagram (not the paper's figure), the dataflow looks like this:

```python
# input embeddings + positional encoding
#   -> N x encoder layer (self-attention + FFN, residual + norm)
#   -> encoder output
#
# target embeddings + positional encoding
#   -> N x decoder layer (masked self-attn + cross-attn + FFN, residual + norm)
#   -> linear projection to vocab size -> softmax
```

## Why multi-head attention and positional encoding were both necessary

Multi-head attention (8 heads, in the paper) is what gives a pure-attention model the representational variety that recurrence used to provide implicitly — different heads learning different relationships, rather than one single attention computation doing all the work. Positional encoding is what restores the sense of order that recurrence used to provide for free. Together, they're the two additions that make a recurrence-free, convolution-free architecture actually competitive.

## Why this paper mattered

The Transformer didn't just do well on translation — its parallelizable, attention-only design (Lesson 35's case, made concrete) turned out to scale remarkably well with more data and more compute. That scalability is the direct ancestor of the encoder-only (BERT-style), decoder-only (GPT-style — what you'll build in Chapter 6), and encoder-decoder models that make up essentially the entire modern large language model landscape.

## Key terms

| Term | Meaning |
|---|---|
| Transformer | The architecture introduced in this paper, built entirely from attention and feed-forward sublayers |
| Encoder-decoder | Two stacks of layers: one reads the source, one generates the target |
| Masked self-attention | Self-attention restricted so a position can't attend to future positions |
| 1706.03762 | The arXiv identifier for "Attention Is All You Need" |
