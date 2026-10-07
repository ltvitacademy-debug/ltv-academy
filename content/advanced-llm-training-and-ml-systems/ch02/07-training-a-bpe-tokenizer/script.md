# Script — Training a BPE Tokenizer

## Segment 1 (title)

Chapter two goes deep on the data pipeline, starting at the very first transformation raw text goes through: tokenization. This lesson trains a real byte-pair encoding tokenizer from scratch, the same approach used by GPT-2 and Llama-family tokenizers.

## Segment 2 (steps)

BPE starts from the smallest possible units, individual bytes, and greedily merges the most frequent adjacent pair into a new symbol, repeating until the vocabulary hits a target size. Common whole words end up merged all the way into single tokens, while rare words fall back to smaller pieces, so the tokenizer can represent any input text without ever hitting a true unknown-token wall.

## Segment 3 (code)

Hugging Face's tokenizers library automates this with a BPE model, a byte-level pre-tokenizer, and a BpeTrainer that takes a target vocabulary size, a minimum merge frequency, and a list of special tokens to reserve. You can train directly from an iterator over raw text, which works well with a streaming dataset.

## Segment 4 (code)

Once trained, you wrap the raw tokenizer in a PreTrainedTokenizerFast, which gives you the same encode and decode interface used by every tokenizer on the Hugging Face Hub, so it drops straight into a transformers training pipeline.

## Segment 5 (outro)

That vocab_size number you pass to the trainer isn't a free choice -- it has real consequences. Next up, lesson eight: the trade-offs behind vocabulary size.
