# Lesson 15 — Temperature & Sampling Parameters

**Chapter 3 · Working With LLM APIs · Lesson 15 of 31**

## What you'll learn

- What "sampling" even means — why a model doesn't just pick the single most likely token
- Temperature, top_p, and top_k, conceptually
- A current, verified fact that will surprise anyone learning from an older tutorial:
  Anthropic has **deprecated `temperature`** on its newest Claude models
- What that leaves you to tune instead, and how OpenAI's knobs still differ
- Practical guidance: which knob to reach for, and why not to turn two at once

## Why sampling exists at all

At each step, the model doesn't output one token — it outputs a **probability
distribution** over every possible next token. Something has to decide which token
actually gets picked. "Always take the single most likely token" (called greedy decoding)
produces flat, repetitive text. Sampling parameters control how much randomness gets
introduced into that choice.

## The three classic knobs

| Parameter | What it does |
|---|---|
| `temperature` | Reshapes the whole probability distribution — low values sharpen it toward the most likely tokens, high values flatten it toward more randomness |
| `top_p` (nucleus sampling) | Only samples from the smallest set of tokens whose combined probability reaches `p` |
| `top_k` | Only samples from the `k` most likely tokens, full stop |

These three concepts are shared vocabulary across virtually every provider — but **which
ones you can actually tune, and to what range, is provider- and model-specific**, and it
changes over time. That's not a hypothetical warning: it's happened.

## A current fact worth knowing: Anthropic deprecated temperature

As of the current Messages API reference, `temperature` is marked **deprecated**:

> Models released after Claude Opus 4.6 do not support setting temperature. A value of
> 1.0 will be accepted for backwards compatibility, all other values will be rejected.

In other words, on Anthropic's newest models, you can no longer dial `temperature` up or
down — the field is still in the request schema for compatibility, but only `1.0` is
accepted; any other value gets rejected outright. `top_p` and `top_k` remain in the
request schema as the live sampling controls on current models. This is exactly the kind
of detail that drifts fast enough that it's worth checking the live docs before you build
anything real, rather than trusting what an older course (or an older model's memory)
told you.

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 1024,
  "top_p": 0.9,
  "top_k": 40,
  "messages": [
    { "role": "user", "content": "Write one creative tagline." }
  ]
}
```

## OpenAI's knobs, for comparison

OpenAI's Chat Completions API still exposes a tunable `temperature` (documented range
0–2, default 1) and `top_p`, plus two parameters Anthropic doesn't have at all:
`frequency_penalty` and `presence_penalty`, which discourage the model from repeating
tokens it's already used. OpenAI has no `top_k` parameter.

```json
{
  "model": "gpt-4.1",
  "temperature": 0.7,
  "top_p": 1,
  "messages": [
    { "role": "user", "content": "Write one creative tagline." }
  ]
}
```

## Practical guidance

- **Turn one knob, not two.** Both providers' documentation has historically recommended
  altering `temperature` *or* `top_p`, not both at once — changing both makes the effect
  of either one hard to reason about.
- **Low randomness for tasks with one right answer**: code generation, data extraction,
  classification, anything you'll validate programmatically.
- **Higher randomness for open-ended generation**: brainstorming, creative copy, varied
  sample outputs.
- **On current Claude models, reach for `top_p`/`top_k`, not `temperature`** — it's the
  one knob that's no longer yours to turn.

## Key terms

| Term | Meaning |
|---|---|
| Greedy decoding | Always picking the single most probable next token |
| Temperature | Reshapes the probability distribution before sampling |
| Nucleus sampling (`top_p`) | Samples only from the smallest set of tokens covering probability `p` |
| `top_k` | Samples only from the `k` most likely tokens |
| Deprecated parameter | Still accepted in the request schema, but no longer functional/tunable |

## Lab

1. Write a request body for a code-generation task where you'd want low randomness, using
   whichever provider's knobs apply.
2. Explain, in your own words, why a model that always picks the single most likely token
   tends to produce repetitive output.
3. State, from memory, what value Anthropic's newest models require for `temperature` and
   what happens if you send anything else.

## Check yourself

You're ready for Lesson 16 when you can explain what each of `temperature`, `top_p`, and
`top_k` does conceptually, and state the one Anthropic-specific fact about `temperature`
that a course written even a year earlier might have gotten wrong.
