# Black-Box vs. Mechanistic Approaches

Lesson 24 argued that looking inside a model buys you something behavioral testing structurally cannot. This lesson draws the line precisely: what actually counts as a "black-box" method versus a "mechanistic" one, where the boundary gets blurry, and why the field treats mechanistic interpretability as a distinct research program rather than just a more detailed eval.

## What you'll learn

- The precise distinction between black-box and mechanistic interpretability methods
- Why probing classifiers sit in an interesting middle zone between the two
- The "circuits" research agenda and what it means to reverse-engineer a model
- Why each approach answers a different question, and neither replaces the other

## Black-box: the model as input-output function

A black-box method treats the model purely as a function from inputs to outputs, never opening it up to look at weights or activations. Everything from Chapters 2 through 4 is black-box in this sense: RLHF reward modeling, red-teaming, capability evals, and behavioral debate all work by varying the input (or the training signal derived from scored outputs) and observing what comes out. Even techniques that probe the model with carefully chosen prompts — asking it to explain its reasoning, testing it with adversarial phrasings, running it through a battery of behavioral scenarios — are black-box, because the investigative lever is always "change the input, observe the output." You never touch what's happening between them.

## Mechanistic: opening the model up

Mechanistic interpretability instead treats the model's internals as the object of study: the actual weights, the activations they produce on a given input, and the computational pathways — researchers call them **circuits** — that connect them. Where a black-box method asks "what does the model do," a mechanistic method asks "what computation produces what the model does." Chris Olah and colleagues framed this explicitly in the "Zoom In" research agenda: treat a trained network the way you'd treat a compiled program you don't have the source for, and try to reverse-engineer it into something a human can actually read — identifying meaningful "circuits" built from interpretable features, rather than leaving the computation as an opaque matrix of numbers.

## Why probing classifiers sit in between

Lesson 26 covers probing classifiers in depth, but it's worth flagging now: they're a genuinely hybrid case. A probe is trained on internal activations, which makes it mechanistic in the sense that it requires access to the model's internals rather than just its outputs. But a probe doesn't tell you how the model computes anything — it only tells you whether some concept is linearly decodable from an activation, using a classifier trained completely separately from the model's own computation. That's a much weaker claim than "the model's internal circuits represent and use this concept in this way," which is the kind of claim true mechanistic circuit analysis aims for. Keep this distinction in mind going forward: access to internals is necessary for mechanistic work, but it isn't sufficient on its own to call something a mechanistic explanation.

## Two different questions, both useful

Neither approach replaces the other, and the field uses both deliberately. Black-box methods scale easily — you can run a behavioral eval against a model you've never seen the weights of, including models accessed only through an API — and they directly answer the question most users and regulators actually care about: does the model behave well? Mechanistic methods require real access to weights and activations, are far more labor-intensive per model, and often only yield clean answers for small models or specific, well-isolated behaviors. But they answer a question black-box methods cannot: why does the model behave the way it does, and would that same internal process still produce good behavior on inputs you haven't tried yet? A mature safety case for a deployed model draws on both — behavioral evals to get broad coverage, and mechanistic understanding to get confidence that the behavior isn't a surface-level coincidence.

## Key terms

| Term | Meaning |
|---|---|
| Black-box method | An approach that treats a model purely as an input-output function, drawing conclusions only from observed behavior |
| Mechanistic interpretability | An approach that studies a model's actual internal computation — weights, activations, and circuits — to explain how it produces a given output |
| Circuit | A meaningful computational pathway inside a model, built from interpretable features, that mechanistic interpretability tries to identify and explain |
| Reverse-engineering framing | Olah et al.'s analogy of treating a trained network like a compiled program to be decompiled back into human-understandable logic |
| Probing classifier | A hybrid technique: it requires access to internal activations like mechanistic work, but it only tests decodability, not actual causal use, so it falls short of a full circuit-level explanation |

## Recap

Black-box methods observe only inputs and outputs, scale easily, and directly answer behavioral questions; mechanistic methods open the model up to study its actual internal computation and can explain why a behavior occurs, at the cost of far more effort per model. Probing classifiers sit in between — they touch internals but don't fully explain computation. Next up, Lesson 26: Probing Classifiers, where you'll train one yourself against a toy transformer's activations.
