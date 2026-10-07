# Script — Implementing the Training Loop for a Tiny GPT

## Segment 1 (title)

Your TinyGPT exists, but an untrained model is just randomly initialized numbers wired together correctly. This lesson writes the training loop that actually teaches it to predict language — the same next-token objective underneath every GPT-style model, scaled down to something you can run yourself.

## Segment 2 (code)

Language modeling needs no separate label file. Take one chunk of token ids of length T plus one, slice off the last token for your inputs, and slice off the first token for your targets. At every position, the model has to predict the token that actually came next — and the causal mask inside your attention blocks makes sure it can only look backward to do it.

## Segment 3 (code)

The model produces logits of shape batch, sequence length, vocab size — a full distribution over the vocabulary at every position. Cross entropy expects flattened logits against flattened target ids, so you reshape batch and sequence together before comparing. That gives you one scalar loss averaged over every position in the batch, ready for backward.

## Segment 4 (steps)

The training step itself is five moves: forward pass, compute the loss, zero out old gradients, call backward, then clip the gradient norm before the optimizer steps. AdamW is the standard choice for transformers — Adam's adaptive learning rates plus decoupled weight decay — and gradient clipping is cheap insurance against an unlucky batch spiking the gradients and derailing training.

## Segment 5 (code)

Remember to call model dot train before training, since dropout needs to be active — the same switch from chapter three's regularization material. And checkpoint periodically: save both the model weights and the optimizer state, so if training gets interrupted, you can resume with Adam's momentum intact instead of starting from zero.

## Segment 6 (outro)

Forward, loss, backward, clip, step — that loop trains every transformer you'll ever build, tiny or otherwise. Up next, lesson forty-two: turning a trained model's raw logits into actual generated text.
