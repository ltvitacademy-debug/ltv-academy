# Script — Evaluating a Tiny Language Model

## Segment 1 (title)

Training loss only tells you the model is fitting data it's already seen — it says nothing about whether it actually learned something that generalizes. This lesson covers how language models get evaluated: perplexity, computed the right way on held-out data, paired with an honest look at what that number does and doesn't tell you.

## Segment 2 (steps)

Perplexity is exp of the average cross-entropy loss per token. A perplexity of one is the theoretical floor, perfect prediction. Lower is always better, and it has a nice intuitive reading as roughly how many tokens the model is effectively choosing between at each step. Crucially, it's always computed on a validation split the model never saw during a training update — otherwise you're just measuring memorization.

## Segment 3 (code)

Three details matter in the code. Model dot eval turns off dropout, so you're measuring the model's real learned behavior. Torch dot no underscore grad skips gradient tracking entirely, since evaluation needs none of that bookkeeping. And you sum the loss with reduction equals sum, plus count every target token, rather than averaging per batch.

## Segment 4 (code)

That's because summing first and dividing by the total token count at the end weights every single token equally, even when batches have different sizes. Average the per-batch averages instead, and batches with fewer tokens get silently over or under weighted. Then math dot exp of that one ratio gives you the perplexity.

## Segment 5 (steps)

But perplexity alone can mislead you. It's measured with teacher forcing — the real previous tokens are always fed in, one correct step at a time — which is different from actual generation, where the model feeds back its own output and small errors can compound into loops. So pair the number with actually reading generated samples: is it coherent, is it just repeating training data, is it stuck saying the same word over and over?

## Segment 6 (outro)

Perplexity on held-out data gives you a clean number to track across runs; reading real generations catches what that one number structurally can't. Up next, lesson forty-four: the knobs you can turn to make this tiny GPT bigger, and what each one actually costs you.
