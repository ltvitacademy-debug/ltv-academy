# Vocabulary Size Trade-offs

The `vocab_size` parameter you passed to `BpeTrainer` in Lesson 7 is not a free choice — it's a genuine engineering trade-off that touches sequence length, model parameter count, embedding-table memory, and how well the model handles rare words and multiple languages. This lesson works through that trade-off directly.

## What you'll learn

- How vocabulary size trades off against average sequence length for the same text
- How vocabulary size affects total parameter count through the embedding and output layers
- Why multilingual models tend to need larger vocabularies
- Real vocabulary sizes used by well-known tokenizers, for calibration

## Bigger vocabulary → shorter sequences

A larger vocabulary means more whole words (and common multi-word chunks) get their own single token, so the same piece of text tokenizes into fewer tokens on average. Fewer tokens per document means less attention compute per document (attention cost scales roughly quadratically with sequence length) and more text fits inside a fixed context window.

```python
from transformers import AutoTokenizer

text = "Tokenization determines how efficiently a model uses its context window."

gpt2_tok = AutoTokenizer.from_pretrained("gpt2")                 # vocab_size ~50,257
llama3_tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B")  # vocab_size ~128,256

print(len(gpt2_tok(text)["input_ids"]))   # more tokens, smaller vocab
print(len(llama3_tok(text)["input_ids"])) # fewer tokens, larger vocab
```

## Bigger vocabulary → bigger embedding and output layers

Every vocabulary entry needs a row in the token embedding matrix and a corresponding row in the final output (unembedding) projection. Both scale linearly with `vocab_size × hidden_size`:

```python
def embedding_params(vocab_size: int, hidden_size: int) -> int:
    # input embedding + output (unembedding) projection
    return 2 * vocab_size * hidden_size

# A 128k vocabulary vs. a 32k vocabulary, same hidden size
print(embedding_params(128_256, 4096))  # much larger
print(embedding_params(32_000, 4096))   # much smaller
```

For smaller models, this embedding/output cost can be a surprisingly large fraction of total parameters — a bigger vocabulary "spends" more of a small model's total parameter budget on token representations rather than on the transformer layers that do the actual reasoning.

## Rare tokens and undertraining

A larger vocabulary also means more individual tokens appear rarely in the training corpus. Rare tokens get fewer gradient updates, so their learned embeddings can be undertrained relative to common tokens — a subtle quality cost that doesn't show up directly in the parameter-count math but does show up in model behavior on uncommon words or entities.

## Why multilingual models need bigger vocabularies

A tokenizer trained primarily on English text will represent other languages inefficiently — falling back to much shorter, more frequent sub-word or byte-level pieces for languages it saw little of during training, which inflates the token count (and therefore the effective cost) for those languages. Multilingual model families generally compensate with a larger vocabulary size, explicitly built from a training corpus balanced across the target languages, so that non-English text also gets reasonably efficient whole-word or common-subword tokens rather than falling back to byte-level fragments constantly.

## Calibration: real vocabulary sizes in the wild

- GPT-2: 50,257 tokens
- Llama 2: 32,000 tokens
- Llama 3: 128,256 tokens (a deliberate large jump from Llama 2, improving multilingual and general tokenization efficiency)
- GPT-4-family tokenizers (`cl100k_base`/`o200k_base` encodings used via `tiktoken`): roughly 100k–200k tokens

These numbers are a useful sanity check: if you're training a small, English-only research model, following a GPT-2-era vocabulary size is reasonable; if you're targeting multiple languages or a much larger model, the Llama 3-era range is a better anchor.

## Key terms

- **Vocabulary size (`vocab_size`)** — the number of distinct tokens a tokenizer can produce
- **Embedding/unembedding matrix** — the parameter matrices mapping token IDs to vectors and back; both scale with vocab_size
- **Token efficiency** — how few tokens a tokenizer needs to represent a given piece of text
- **Undertraining (rare tokens)** — the quality cost of tokens that appear too infrequently to receive enough gradient signal

## Recap

Vocabulary size trades sequence length and embedding-table size against each other: bigger vocabularies mean shorter sequences and cheaper attention, but larger embedding/output layers and a greater risk of undertrained rare tokens, while multilingual coverage pushes vocabulary size up further still. Next up, Lesson 9: where the raw training data actually comes from, and how it's curated before it ever reaches the tokenizer.
