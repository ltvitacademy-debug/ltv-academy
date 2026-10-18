# Why QFT Is Exponentially Faster — and What That Doesn't Mean

The QFT circuit from the last lesson uses O(n²) gates to perform the same transform the classical FFT does in O(N log N) operations, where N = 2^n. That sounds like a straightforward exponential win. It is real — and it is also not the free lunch it sounds like. This lesson is the honesty check that makes the rest of this chapter's algorithms (phase estimation, Shor's algorithm) make sense.

## What you'll learn

- The precise, apples-to-apples version of the speedup claim
- Why you cannot just "read off" the QFT's output the way you can with a classical FFT
- Why a single measurement destroys almost all of the information in the transformed state
- Why the QFT is only useful embedded inside a larger algorithm that extracts one specific piece of information
- How this sets up phase estimation and Shor's algorithm, covered later in this course

## The speedup claim, stated precisely

The classical FFT transforms N numbers using O(N log N) = O(n·2^n) arithmetic operations, where N = 2^n. The QFT circuit transforms the amplitude vector of an n-qubit quantum state — also of dimension N = 2^n — using O(n²) quantum gates. Both are computing the *same mathematical transform* (the DFT matrix from Lesson 5). Comparing gate counts for the same-size transform: O(n²) versus O(n·2^n) is an exponential improvement in n. That part of the claim is correct and not in dispute — building the transform itself is exponentially cheaper, gate-for-gate, on a quantum computer.

## The catch: you can't read out the answer

Here is what that speedup does *not* give you: a classical FFT, once computed, hands you the explicit list of all N output values X_0 through X_{N−1} — you can print every one of them, store them, feed them into the next stage of a signal-processing pipeline, whatever you want. A **quantum state is not like that.** After running the QFT circuit, the register holds a superposition over all N basis states, each with some amplitude computed by the transform — but you cannot read out all N amplitudes. A single measurement of the register collapses it to **exactly one** basis state, sampled according to the probabilities (squared magnitudes of the amplitudes), and every other amplitude's information is gone. To reconstruct the full output vector the way a classical FFT would hand it to you, you would need to re-run the entire circuit from scratch and re-measure many times, building up a probability distribution by repeated sampling — and that process, done honestly, costs resources that erode or eliminate the exponential gate-count advantage.

## Why this isn't a flaw — it's a scoping condition

This is the single most important honesty point in this chapter: **the QFT's exponential speedup is only useful when you don't need the full output vector** — when the algorithm around the QFT is structured to need just one specific, extractable piece of frequency information, not an explicit printout of every amplitude. If your goal genuinely requires the entire output vector in classical, readable form, the QFT does not help you — you're back to needing a classical FFT (or worse, you've paid the overhead of a quantum computer for nothing).

## Where the QFT actually earns its keep: phase estimation and Shor's algorithm

This is exactly why the major algorithms built on the QFT — **quantum phase estimation** and **Shor's factoring algorithm** (both covered later in this course) — are deliberately structured around a narrow extraction target. Phase estimation uses the QFT to concentrate the register's amplitude onto (or very near) a *single* basis state that encodes an unknown phase as a binary fraction — the algorithm is specifically designed so that one, or a few, measurements reveal that one number with high precision, without ever needing the other N−1 amplitudes. Shor's algorithm uses the QFT inside period-finding for exactly the same reason: it needs one number (the period of a modular exponentiation function), and the circuit is engineered so that the QFT step reliably peaks the measurement probability on basis states that reveal that period — not on recovering a full explicit transform of anything. In both cases, the "exponential speedup" is real and is exactly what makes the surrounding algorithm fast — but it is only accessible because the algorithm was designed in advance to need a single extractable answer, not a full readout.

## Key terms

| Term | Meaning |
|---|---|
| Measurement collapse | The fact that measuring a quantum register yields exactly one basis state, sampled by probability, destroying the other amplitudes' information |
| Readout problem | The general obstacle that a quantum state's full amplitude vector cannot be cheaply extracted, unlike a classical array |
| Phase estimation | A quantum algorithm that uses the QFT to extract one specific phase value as a binary fraction from a small number of measurements |
| Shor's algorithm | A quantum factoring algorithm that uses the QFT inside a period-finding subroutine, needing only the period value, not a full transform readout |

## Check yourself

A classmate says: "The QFT circuit only needs O(n²) gates while the classical FFT needs O(n·2^n) operations, so any time you need to Fourier-transform data, you should always use a quantum computer instead of a classical one." Explain specifically what is wrong with this claim, using the readout problem.
