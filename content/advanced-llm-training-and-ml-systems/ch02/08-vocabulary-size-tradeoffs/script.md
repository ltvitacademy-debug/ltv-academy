# Script — Vocabulary Size Trade-offs

## Segment 1 (title)

The vocab_size you pass a tokenizer trainer is not a free choice. It's a real trade-off touching sequence length, parameter count, and how well the model handles rare words and other languages. This lesson works through that trade-off directly.

## Segment 2 (code)

A larger vocabulary means more whole words get their own single token, so the same text tokenizes into fewer tokens on average. Llama 3's roughly 128,000-token vocabulary represents the same sentence in fewer tokens than GPT-2's roughly 50,000-token vocabulary, and fewer tokens means cheaper attention and more text fitting in a fixed context window.

## Segment 3 (code)

That efficiency isn't free. Every vocabulary entry needs a row in the embedding matrix and a matching row in the output projection, and both scale linearly with vocabulary size times hidden size. For smaller models especially, a bigger vocabulary can eat a surprisingly large share of the total parameter budget, parameters that would otherwise go toward the transformer layers doing the actual reasoning work.

## Segment 4 (steps)

There's a subtler cost too: a larger vocabulary means more individual tokens appear rarely in training, so their embeddings get fewer gradient updates and can end up undertrained, which shows up as weaker handling of uncommon words or entities. And multilingual models need larger vocabularies specifically so languages other than English don't constantly fall back to inefficient byte-level fragments.

## Segment 5 (outro)

Real tokenizers span a wide range, from GPT-2's fifty thousand to Llama 3's hundred twenty eight thousand, and that jump reflects a deliberate push for better multilingual and general tokenization efficiency. That range is a useful anchor for your own choices. Next up, lesson nine: where the raw training data actually comes from before it ever reaches the tokenizer.
