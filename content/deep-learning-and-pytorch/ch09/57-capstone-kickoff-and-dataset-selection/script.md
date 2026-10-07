# Script — Capstone Kickoff & Dataset Selection

## Segment 1 (title)

This is the capstone: you're going to train and evaluate a small decoder-only transformer from scratch, using nothing but what this course already gave you. Nothing new gets introduced here — you're putting Chapters 1 through 8 together on a real dataset.

## Segment 2 (steps)

The project has four phases, one per lesson. Choose a dataset and tokenizer, which is this lesson. Build and train the model, stitching together the transformer from Chapter 6 with the training habits from Chapters 1 through 3. Evaluate it with perplexity, generated samples, and the loss-curve reading from Chapter 8. And write it up.

## Segment 3 (steps)

Keep the scope honest. A context length of 128 to 256 tokens, a model of four to six transformer blocks, somewhere around one to five million parameters, and a few thousand training steps is enough to see a tiny model visibly learn on a small dataset like Tiny Shakespeare, in well under an hour on a single GPU, or more slowly but just as reliably on a CPU.

## Segment 4 (code)

Use character-level tokenization. Build the vocabulary from the distinct characters in your text, map each to an integer, and you have an encoder and decoder in about ten lines. A small vocabulary keeps the embedding table and output layer small too, which matters a lot for a model this size.

## Segment 5 (steps)

Decide what "done" means before you start. Training loss should fall and validation loss should stabilize instead of exploding. The model should generate locally coherent text. And you should be able to report a perplexity number and explain what it means.

## Segment 6 (outro)

That's the whole setup: a dataset, a tokenizer, a realistic scope, and a finish line. Up next, Lesson 58: actually building and training the model.
