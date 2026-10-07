# Sequence Packing

Once documents are tokenized, they have to be assembled into fixed-length sequences the model actually trains on — but real documents vary wildly in length, and naively padding every short document up to the model's full context length wastes an enormous amount of GPU compute on tokens that carry no signal. Sequence packing solves this by concatenating multiple documents into each training sequence.

## What you'll learn

- Why padding short sequences to a fixed length wastes significant compute
- How packing concatenates multiple documents into one training sequence
- Why document boundaries need an attention mask (or at least an EOS token) to avoid semantic leakage
- How to implement a simple packing function, and where this logic lives in Hugging Face `trl`

## The padding-waste problem

If your model's context length is 4,096 tokens and a given document only tokenizes to 300 tokens, padding that document up to 4,096 means roughly 93% of the sequence is padding tokens — tokens that produce no useful gradient and still cost full attention compute (since attention cost scales with sequence length, whether or not the content is meaningful). At pretraining scale, where document lengths vary enormously, this waste compounds into a huge amount of wasted GPU-hours.

```python
def naive_pad(token_ids: list[int], seq_len: int, pad_id: int) -> list[int]:
    if len(token_ids) >= seq_len:
        return token_ids[:seq_len]
    return token_ids + [pad_id] * (seq_len - len(token_ids))

# A 300-token document padded to a 4096-token sequence: ~93% padding
padded = naive_pad(list(range(300)), seq_len=4096, pad_id=0)
```

## Packing: concatenate instead of pad

Packing solves this by concatenating many documents end-to-end (separated by an end-of-sequence token) into a long stream of tokens, then chunking that stream into fixed-length blocks — so nearly every position in every training sequence carries real content.

```python
def pack_sequences(tokenized_docs: list[list[int]], seq_len: int, eos_id: int):
    buffer: list[int] = []
    for doc in tokenized_docs:
        buffer.extend(doc + [eos_id])
        while len(buffer) >= seq_len:
            yield buffer[:seq_len]
            buffer = buffer[seq_len:]
    # a short leftover remainder can be dropped or padded, your call

packed_sequences = list(pack_sequences(tokenized_docs, seq_len=4096, eos_id=2))
```

This is exactly the approach behind Hugging Face `trl`'s `ConstantLengthDataset` and the `packing=True` option on `SFTTrainer`, which implement the same concatenate-and-chunk pattern for fine-tuning data.

## The cross-document attention problem

Packing introduces a subtlety: a single packed sequence can contain the tail end of one document and the start of an unrelated one, separated only by an EOS token. With standard causal attention and no special handling, a token near the start of document B can still attend across the boundary to document A's content — which is semantically meaningless and can introduce a mild training-signal problem (the model learning spurious cross-document continuations).

Two common mitigations:

1. **Accept the small amount of cross-document attention noise** — the EOS token signals a clear break, and in practice this is a mild effect many pretraining pipelines simply accept at scale.
2. **Document-aware attention masking** — construct a block-diagonal attention mask so each token can only attend to other tokens from the *same* original document within the packed sequence, fully preventing cross-document leakage at the cost of a more complex attention mask (rather than the default fully-causal one).

```python
# Conceptual block-diagonal mask: token i can attend to token j only if
# they came from the same source document within this packed sequence
mask[i, j] = (doc_id[i] == doc_id[j]) and (j <= i)
```

## Key terms

- **Padding** — filling a short sequence up to a fixed length with placeholder tokens that carry no training signal
- **Packing** — concatenating multiple documents into one training sequence to minimize wasted padding
- **EOS token** — the end-of-sequence marker separating documents within a packed sequence
- **Document-aware attention mask** — a block-diagonal mask preventing attention across document boundaries in a packed sequence

## Recap

Naive padding wastes enormous compute on tokens with no training signal; packing fixes this by concatenating documents end-to-end and chunking the result into fixed-length sequences, at the cost of needing to either accept or explicitly mask mild cross-document attention leakage. Next up, Lesson 13: data mixtures and domain weighting, deciding how much of each data source actually ends up in those packed sequences.
