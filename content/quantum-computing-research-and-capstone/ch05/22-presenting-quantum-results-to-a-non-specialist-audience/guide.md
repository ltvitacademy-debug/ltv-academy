# Presenting Quantum Results to a Non-Specialist Audience

The same result, told to a hiring manager, a product team, or a general audience, needs a genuinely different telling — not a dumbed-down version of the technical talk, but a different structure built around what a non-specialist actually needs to follow and trust.

## What you'll learn

- Why "simplify the technical talk" is the wrong mental model for this audience
- How to translate quantum-specific jargon into accurate, non-misleading plain language
- A structure for a non-specialist talk that still represents the result and its limitations honestly
- A worked plain-language version of the running GHZ/ZNE capstone
- How to avoid the specific trap of overselling quantum computing to an audience that can't independently check your claims

## Why this isn't just "the technical talk, simplified"

A non-specialist audience doesn't lack intelligence — they lack the specific background to evaluate jargon and technical detail on their own, which means the burden of honest framing shifts more heavily onto you. Removing detail isn't the goal; replacing precise-but-opaque technical language with precise-but-accessible plain language is. "We measured a 0.155 reduction in error rate" can become "the correction technique cut the number of wrong measurements by about two-thirds" (0.155 ÷ 0.240 ≈ 0.646, verified directly) — more accessible, not less accurate.

## Translating jargon without losing accuracy

- "Zero-noise extrapolation" → "a correction technique that deliberately adds controlled extra noise, measures how the result degrades, and uses that pattern to estimate what the result would have been with no noise at all" — longer, but accurate and visualizable.
- "GHZ state" → "a specific multi-qubit configuration used as a standard test case because its correct answer is known in advance, which makes it useful for measuring how much noise is affecting a device" — explains *why* it was used, not just what it's called.
- "Shots" → "repeated measurements — like flipping a coin many times instead of once, so you can trust the measured probability instead of one lucky or unlucky result."
- Resist translating in a way that overstates certainty — "the computer made a mistake" undersells the real statistical/probabilistic nature of the phenomenon; "the hardware's physical imperfections caused some measurements to come out wrong, in a way that's partly predictable and partly correctable" is longer but not misleading.

## A structure for a non-specialist talk

1. **The real-world stakes in one sentence** — why anyone outside the field should care that quantum computers are noisy and that correction techniques are being developed.
2. **A concrete, visualizable analogy** for the core concept (the coin-flip analogy for shots; a blurry photo and a sharpening filter for error mitigation, if it fits your specific technique).
3. **What you did, in plain language**, without circuit diagrams or equations.
4. **What you found, with the actual numbers, translated** — don't drop the numbers; translate their framing (percentages, "cut by two-thirds," not raw technical units the audience has no reference point for).
5. **Honest caveats, in plain language** — "this was tested on one device and only two circuit sizes, so we can't yet say this pattern holds everywhere" is a complete, honest, understandable limitations statement for this audience.
6. **Why it matters going forward** — one sentence connecting back to the stakes from step 1.

## Avoiding the specific trap of overselling to a non-specialist audience

Because this audience often can't independently check a quantum computing claim the way a technical peer could, there's a real, specific temptation to let claims drift broader than they are — this is exactly where popular "breakthrough" framing (Lesson 1's warning) does its damage in the real world. State the same scope limits you'd state to a technical audience, just in accessible language — "on this specific test, with this specific device" doesn't need jargon to say honestly.

## A worked plain-language version

"Quantum computers today are noisy — they make mistakes. We tested a correction technique on a standard test circuit, run on real quantum hardware, at two different sizes. The technique cut the number of wrong measurements by about two-thirds at the smaller size, and by a bit less at the larger size — consistent with the idea that correction gets harder as circuits grow. We only tested two sizes on one device, so we can't yet say how this pattern holds as quantum computers get bigger, but it's a concrete, measured data point toward understanding that question."

## Key terms

| Term | Meaning |
|---|---|
| Plain-language translation | Replacing technical jargon with accurate, non-misleading accessible language, without reducing precision |
| Overselling | Letting a claim drift broader than the evidence supports, especially risky with audiences who can't independently verify it |

## Check yourself

Translate this technical sentence into plain, non-misleading language for a general audience: "Richardson extrapolation across five noise-scaling factors estimated the zero-noise limit of the measured GHZ fidelity." Keep the actual meaning intact — don't just delete the technical terms.
