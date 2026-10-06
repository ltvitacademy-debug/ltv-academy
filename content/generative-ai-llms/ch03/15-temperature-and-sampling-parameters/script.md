# Lesson 15 — Temperature & Sampling Parameters · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

At every step, a model doesn't just output one token — it outputs a probability
distribution over every possible next token, and something has to decide which one
actually gets picked. That's what sampling parameters control. And this lesson includes a
fact that'll genuinely surprise you if you learned this from an older tutorial.

## S2 · STEPS CARD: three knobs

Three classic knobs show up across almost every provider. Temperature reshapes the whole
probability distribution — low values sharpen it toward the likeliest tokens, high values
flatten it toward more randomness. Top_p, nucleus sampling, only samples from the smallest
set of tokens whose combined probability crosses a threshold p. Top_k is the simplest:
only sample from the k most likely tokens, full stop.

## S3 · CODE CARD: the deprecation

Here's the surprising, current fact, pulled directly from the live Messages API
documentation, not from memory: on Claude models released after Opus 4.6, temperature is
deprecated. You can no longer dial it up or down. The field still exists in the request
for backwards compatibility, but it will only accept the value 1.0 — anything else gets
rejected outright.

## S4 · CODE CARD: what's left

So what do you actually tune on current Claude models? Top_p and top_k. They remain live
in the request schema — temperature is the one knob that's been taken away. This is
exactly why you verify live docs before building something real, instead of trusting what
an older course, or an older model's training data, told you.

## S5 · CODE CARD: OpenAI contrast

OpenAI hasn't made the same move — temperature, on a documented range of 0 to 2, and
top_p are both still fully tunable on their Chat Completions API. OpenAI also exposes two
parameters Anthropic doesn't have at all: frequency penalty and presence penalty, which
discourage the model from repeating tokens it's already used. No top_k on OpenAI's side,
though.

## S6 · OUTRO CARD

Temperature, top_p, top_k — and one genuinely current wrinkle: temperature's been
deprecated on the newest Claude models. Next lesson moves from how random a reply is to
how you actually receive it: streaming, token by token, instead of waiting for the whole
thing at once. See you there.
