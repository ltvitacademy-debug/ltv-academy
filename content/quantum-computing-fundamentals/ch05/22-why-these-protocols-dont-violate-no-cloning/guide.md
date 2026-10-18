# Why These Protocols Don't Violate No-Cloning

Teleportation sounds like it should let you copy a qubit across space, and superdense coding sounds like it should let you beat the speed of light. Neither is true, and the reasons are precise, not hand-wavy: one protocol never creates two copies of anything, and the other never sends information faster than a classical channel allows.

## What you'll learn

- The exact statement of the no-cloning theorem
- Why teleportation never produces two copies of |ψ⟩ at any point in time
- Why superdense coding was never at risk of violating no-cloning in the first place
- Why teleportation's reliance on a classical channel rules out faster-than-light signaling
- How to picture Bob's qubit as useless, not informative, before the classical bits arrive

## The no-cloning theorem, precisely

The no-cloning theorem states: **there is no unitary operation that takes an arbitrary unknown quantum state |ψ⟩ and produces two independent copies of it**, i.e. no U and no fixed ancilla state |a⟩ such that U(|ψ⟩⊗|a⟩) = |ψ⟩⊗|ψ⟩ for every possible |ψ⟩. This isn't an engineering limitation that better hardware might fix — it follows directly from the linearity of quantum mechanics. If such a U existed, it would have to behave inconsistently on superpositions versus the individual basis states that make them up, which is a mathematical contradiction, not merely a practical one.

It's worth being precise about what the theorem forbids: producing two copies of an *unknown* state. It says nothing about copying a state you already know classically (you can prepare as many |0⟩'s as you like), and nothing about destroying one copy while creating another elsewhere — which is exactly what teleportation does.

## Teleportation never creates two copies

Walk through the timeline from Lesson 20 and ask, at every point, how many copies of |ψ⟩ exist:

- **Before the protocol runs:** exactly one copy of |ψ⟩ exists, sitting on Alice's qubit q1.
- **During the protocol:** Alice applies CNOT and H, entangling q1 and q2 with q3. At no point in this process does a second, independent copy of |ψ⟩ appear anywhere — the three-qubit state is a single, specific entangled state, not "|ψ⟩ here and |ψ⟩ there."
- **The measurement:** Alice measures q1 and q2. This collapses q1 to a definite classical bit — the superposition a|0⟩+b|1⟩ is gone from q1 permanently. Her original qubit is destroyed as a carrier of |ψ⟩ in this same instant.
- **After the correction:** Bob applies the I/X/Z/XZ correction (per Lesson 20's table) and his qubit q3 now holds |ψ⟩.

There is no moment with two copies. Exactly one copy exists before (on q1), and exactly one copy exists after (on q3) — the copy didn't duplicate, it relocated, with the original destroyed in the same step that let the new one become usable. No-cloning forbids duplication; teleportation performs destruction-then-recreation, which the theorem never addressed at all.

## Superdense coding doesn't even attempt what no-cloning forbids

Superdense coding has a simpler answer: it never tries to copy an unknown quantum state in the first place. Alice isn't transmitting some mystery state she doesn't know the contents of — she is transmitting one of 4 *known, classical* choices (the 2-bit message), and she picks the encoding gate (I, X, Z, or ZX) herself, with full knowledge of what she's doing. There is no |ψ⟩ with unknown amplitudes anywhere in the superdense coding protocol. No-cloning is a theorem about *unknown* states; superdense coding only ever manipulates a shared entangled pair using gates Alice fully controls and knows. It's simply not the kind of operation the theorem restricts.

## Why teleportation still needs the classical channel

If entanglement alone could transmit |ψ⟩, that would be faster-than-light signaling, which would violate causality — so it's worth being concrete about why it doesn't. Recall from Lesson 20's trace (using a=0.8, b=0.6): immediately after Alice's CNOT and H, Bob's qubit q3 sits in one of 4 possible two-amplitude states, (0.8,0.6), (0.6,0.8), (0.8,-0.6), or (-0.6,0.8), depending on which outcome Alice got — each occurring with 25% probability.

Here's the key fact: **Bob cannot tell which of the four he has by measuring his own qubit.** Each of those four states, measured in the computational basis, gives |0⟩ with some probability and |1⟩ with some probability — and critically, averaged over Alice's unknown outcome, Bob's qubit looks *exactly* like a maximally mixed, informationless state. He cannot extract |ψ⟩, or even detect that anything happened on Alice's side, until Alice's two classical bits physically arrive and tell him which of the four corrections to apply. Those bits are an ordinary classical signal, bound by the same speed-of-light limit as a radio transmission. Nothing about the entangled pair lets that information skip ahead — the entanglement sets up *correlation*, but turning that correlation into a usable copy of |ψ⟩ always requires the classical message to catch up.

## Key terms

| Term | Meaning |
|---|---|
| No-cloning theorem | No unitary operation can produce two independent copies of an arbitrary unknown quantum state |
| Destruction-then-recreation | What teleportation actually does: the original is destroyed by measurement before/as the new copy becomes usable, so two copies never coexist |
| Known vs. unknown state | No-cloning restricts copying of states whose amplitudes are unknown; superdense coding only ever manipulates states Alice fully knows and chooses |
| Maximally mixed (to Bob) | How Bob's qubit looks, averaged over Alice's 4 possible outcomes, before the classical bits arrive — informationless until the classical message is received |

## Check yourself

A skeptic argues: "Since Alice's measurement instantly determines which state Bob's qubit is in, information must have traveled to Bob instantly, faster than light." Using the fact that Bob's qubit is indistinguishable from a maximally mixed state until the classical bits arrive, explain precisely where this argument goes wrong.
