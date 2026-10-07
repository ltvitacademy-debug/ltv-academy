# Training a BPE Tokenizer

Chapter 2 goes deep on the data pipeline sketched in Lesson 3, starting at the very first transformation raw text goes through: tokenization. This lesson trains a real Byte-Pair Encoding (BPE) tokenizer from scratch using Hugging Face's `tokenizers` library, the same approach used by GPT-2, GPT-3/4-style, and Llama-family tokenizers.

## What you'll learn

- How the BPE algorithm builds a vocabulary by iteratively merging the most frequent symbol pairs
- How to train a byte-level BPE tokenizer with Hugging Face's `tokenizers` library
- What special tokens are and why they're reserved during training
- How to load and use your trained tokenizer with `transformers`

## The BPE algorithm, conceptually

BPE starts from the smallest possible units — individual bytes or characters — and greedily merges the most frequent adjacent pair into a new symbol, repeating this process until the vocabulary reaches a target size.

1. Start with every input split into its base units (bytes, in byte-level BPE).
2. Count every adjacent pair of symbols across the training corpus.
3. Merge the single most frequent pair into one new symbol; add it to the vocabulary.
4. Repeat steps 2–3 until the vocabulary reaches the target size.

The result is a vocabulary that represents common whole words as single tokens (because their characters got merged all the way up), while rare or unseen words fall back to smaller sub-word or byte-level pieces — so the tokenizer can represent *any* input text, never hitting a true "unknown token" wall, which is the main advantage byte-level BPE has over purely word-level tokenization.

## Training a tokenizer with the `tokenizers` library

```python
from tokenizers import Tokenizer, models, pre_tokenizers, trainers, decoders

# 1. A BPE model with an explicit unknown-token fallback
tokenizer = Tokenizer(models.BPE(unk_token="<unk>"))

# 2. Byte-level pre-tokenization (GPT-2 style): splits on whitespace boundaries
#    while treating every byte as representable, so no input text is ever
#    "unrepresentable"
tokenizer.pre_tokenizer = pre_tokenizers.ByteLevel(add_prefix_space=False)
tokenizer.decoder = decoders.ByteLevel()

# 3. The trainer: target vocab size, minimum pair frequency, reserved tokens
trainer = trainers.BpeTrainer(
    vocab_size=32_000,
    min_frequency=2,
    special_tokens=["<unk>", "<s>", "</s>", "<pad>"],
)

# 4. Train directly from an iterator over raw text (works well with
#    datasets in streaming mode from Lesson 3)
def corpus_iterator(dataset):
    for example in dataset:
        yield example["text"]

tokenizer.train_from_iterator(corpus_iterator(my_dataset), trainer=trainer)

tokenizer.save("my-bpe-tokenizer.json")
```

## Special tokens

Special tokens are reserved vocabulary entries that never get merged out of existence and carry structural meaning rather than linguistic meaning: `<s>`/`</s>` typically mark sequence start/end, `<pad>` fills sequences to a uniform length in a batch, and `<unk>` is the fallback for anything genuinely unrepresentable (rare with byte-level BPE, since any byte sequence can always be encoded, but still required by the model class). Passing them to `special_tokens` in the trainer guarantees they get a fixed, known token ID and are never merged into a different symbol.

## Using the trained tokenizer

```python
from tokenizers import Tokenizer
from transformers import PreTrainedTokenizerFast

raw_tokenizer = Tokenizer.from_file("my-bpe-tokenizer.json")
fast_tokenizer = PreTrainedTokenizerFast(
    tokenizer_object=raw_tokenizer,
    unk_token="<unk>", pad_token="<pad>",
    bos_token="<s>", eos_token="</s>",
)

ids = fast_tokenizer("Transformers merge frequent subwords.")["input_ids"]
print(ids)
```

Wrapping the raw `tokenizers.Tokenizer` in a `PreTrainedTokenizerFast` gives you the same `.encode()`/`.decode()`/`.save_pretrained()` interface used by every tokenizer on the Hugging Face Hub, so it drops directly into a `transformers` training pipeline.

## Key terms

- **BPE (Byte-Pair Encoding)** — a tokenization algorithm that iteratively merges the most frequent adjacent symbol pair into a new vocabulary entry
- **Byte-level BPE** — BPE applied over raw bytes rather than characters, guaranteeing any input text is representable
- **Special tokens** — reserved vocabulary entries (`<s>`, `</s>`, `<pad>`, `<unk>`) that carry structural rather than linguistic meaning
- **`BpeTrainer`** — the Hugging Face `tokenizers` class that drives the merge-learning process to a target vocabulary size

## Recap

BPE builds a vocabulary bottom-up by repeatedly merging the most frequent adjacent symbol pair, and the Hugging Face `tokenizers` library's `BpeTrainer` automates that process over a real corpus, with special tokens reserved up front. Next up, Lesson 8: how the vocabulary size you choose trades off against sequence length and model size.
