# Induction Heads

Lesson 33 gave you the method -- visualize, then ablate, then name the function. This lesson applies that method to the field's single most famous result: a two-head circuit that implements in-context pattern completion, discovered and verified through exactly this kind of causal analysis.

## What you'll learn

- The induction-head algorithm: what `[A][B] ... [A] -> predict [B]` means mechanically
- The two-head circuit that implements it -- a previous token head feeding an induction head
- Why this result is considered a landmark finding, not just one more interesting head
- How to measure induction behavior empirically with a repeated-sequence test

## The pattern-completion algorithm

An **induction head** implements a simple but powerful algorithm: given the current token, search backward through the sequence for an earlier occurrence of that same token, find whatever token immediately followed it that previous time, and predict that it will follow again now. Formally: `[A][B] ... [A] -> predict [B]`. If the sequence contains "...the Eiffel Tower is in Paris... the Eiffel" the model predicts "Tower" next, having seen the pattern complete once already in-context -- without any weight updates, purely from attending to its own earlier context.

## A two-head circuit, not one head

Anthropic's "In-context Learning and Induction Heads" (Olsson, Elhage et al., 2022) found that this algorithm isn't implemented by a single head -- it takes two heads working together, in different layers:

1. A **previous token head**, in an earlier layer, attends from each position to the position right before it, and writes information about "what token came right before me" into the residual stream.
2. The **induction head itself**, in a later layer, reads that information. Its query at the current position effectively asks "where else in this sequence did the token that's currently here appear before?" -- it uses the previous-token head's earlier output to find the position right *after* an earlier occurrence of the current token, attends there, and copies that token's value forward into its prediction.

This is a direct, concrete illustration of Lesson 30's residual-stream framing: the previous token head writes a specific piece of information into the stream, purely so the induction head in a later layer can read it back out and use it. Neither head's behavior alone looks like "pattern completion" -- the behavior only emerges from the two-head circuit together.

## Why this result is a landmark

The paper argues, with suggestive evidence, that induction heads are the primary driver of in-context learning in small attention-only models, and that the same mechanism likely extends into larger models. It also reports a striking training-dynamics finding: a sudden "phase transition" early in training, where in-context learning ability jumps sharply at almost exactly the same point induction heads first form -- strong evidence that this specific circuit, not some other diffuse mechanism, is actually responsible for the behavior. The paper's own framing is explicitly safety-motivated: if mechanistic interpretability can find one real, verified circuit for a core capability like in-context learning, it's evidence the broader reverse-engineering project behind this whole chapter is achievable.

## Measuring induction behavior directly

You can test for the behavior empirically, before even looking at any individual head, by feeding the model a repeated random sequence and checking whether its predictions during the repeat match the pattern from the first occurrence.

```python
import torch

# repeated random sequence: A B C D ... A B C D ...
seq = torch.randint(0, vocab_size, (1, 25))
repeated = torch.cat([seq, seq], dim=1)  # (1, 50) -- second half echoes the first

with torch.no_grad():
    logits = model(repeated)

# score how well the model predicts each token's repeat using the correct next token
preds = logits[0, 24:-1].argmax(dim=-1)   # predictions made partway through the repeat
targets = repeated[0, 25:]
induction_score = (preds == targets).float().mean()
```

A high `induction_score` tells you the model is doing *something* consistent with induction; confirming it's specifically the two-head circuit above requires the attention-pattern and ablation techniques from Lesson 33, applied to the candidate previous-token and induction heads.

## Key terms

| Term | Meaning |
|---|---|
| Induction head | A head implementing `[A][B] ... [A] -> predict [B]`: finding an earlier occurrence of the current token and copying what followed it |
| Previous token head | The earlier-layer head that writes "what token came right before this position" into the residual stream, feeding the induction head |
| In-context learning | A model adapting its predictions based on patterns within its current input, with no weight updates |
| Phase transition | A sudden jump in a specific capability during training, here coinciding with induction heads first forming |

## Recap

Induction heads implement in-context pattern completion through a two-head circuit -- a previous token head feeding an induction head -- and the training-time phase transition tying their formation to a jump in in-context learning ability is strong evidence the circuit is really responsible for the behavior. You now have one real, verified circuit; the next lesson generalizes the workflow used to find and verify it. Up next, Lesson 35: Finding & Patching a Circuit.
