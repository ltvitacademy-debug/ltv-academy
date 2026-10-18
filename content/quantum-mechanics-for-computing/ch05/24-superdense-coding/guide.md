# Superdense Coding

Teleportation sends 1 qubit of quantum information using 2 classical bits and 1 shared entangled qubit. Superdense coding runs the same resource trade in reverse: it sends 2 classical bits using only 1 transmitted qubit, by spending 1 shared entangled qubit to make it possible. This lesson works the protocol through with fully verified numbers.

## What you'll learn

- The superdense coding protocol's goal and setup
- A fully verified worked example of all four possible encodings
- Why Bob can perfectly distinguish all four cases with a single Bell measurement
- Why superdense coding and teleportation are "dual" protocols
- Why entanglement is the shared resource that makes both work

## The setup

Alice and Bob pre-share a Bell pair |Φ+⟩=(|00⟩+|11⟩)/√2, one qubit each. Alice wants to send Bob a 2-bit classical message (00, 01, 10, or 11) but is only allowed to physically transmit **one qubit**. Without entanglement, sending 2 classical bits through 1 qubit transmission would be impossible (a single qubit transmitted alone carries at most 1 classical bit when measured, by a well-established general result called the Holevo bound, stated here as an accepted fact). Pre-shared entanglement is what changes the arithmetic.

## The protocol, with verified numbers

Depending on which 2-bit message she wants to send, Alice applies one of four operations to **her qubit only** (she never touches Bob's qubit directly — it's light-years away, metaphorically or literally). This was verified by direct computation, tracking amplitudes through each operation:

| Message | Alice applies | Resulting shared state |
|---|---|---|
| 00 | I (nothing) | |Φ+⟩ = (|00⟩+|11⟩)/√2 (unchanged) |
| 01 | X | |Ψ+⟩ = (|01⟩+|10⟩)/√2 |
| 10 | Z | |Φ−⟩ = (|00⟩−|11⟩)/√2 |
| 11 | Z then X | (|01⟩−|10⟩)/√2 |

These four results are exactly the four Bell states, and — this is the crucial property — they are **mutually orthogonal**: each one is perfectly distinguishable from the other three. Alice then physically sends her one qubit to Bob. Bob now holds both qubits (his original half plus the one Alice just sent) and performs a single Bell-basis measurement on the pair. Because the four possible results are mutually orthogonal, this measurement identifies **with certainty** which of the four operations Alice applied — and therefore which 2-bit message she intended — recovering the full 2 bits from the single qubit Alice transmitted.

## Why this works: orthogonality, not magic

The reason Bob can tell all four cases apart perfectly is specifically that the four resulting states are mutually orthogonal (zero overlap between any two distinct ones). If Alice's four possible operations had produced four states that overlapped with each other, Bob's measurement would sometimes be ambiguous — exactly the situation Chapter 3 describes when measuring a definite state in a mismatched basis. Here, by construction, the four Bell states form a perfect orthonormal basis for the 2-qubit space, so there is no ambiguity at all.

## Superdense coding and teleportation are dual protocols

Lay the two protocols side by side:

- **Teleportation**: 1 qubit of *quantum* information sent, using 2 classical bits + 1 shared entangled pair.
- **Superdense coding**: 2 *classical* bits sent, using 1 transmitted qubit + 1 shared entangled pair.

Both protocols consume exactly one pre-shared entangled pair as their fuel, and both trade one type of communication resource for the other. Neither protocol works at all without the entanglement — remove it, and teleportation has no mechanism to transfer the state, and superdense coding is capped at sending only 1 classical bit per qubit (the ordinary classical limit).

## What this means for computing

Superdense coding is a clean, concrete demonstration that entanglement is a genuine, quantifiable communication *resource* — not just a curiosity. It shows up conceptually in the design of quantum networking protocols where entanglement is treated as a pre-distributed asset (like pre-shared cryptographic key material) that specific protocols later "spend" to do something a purely classical channel could not.

## Key terms

| Term | Meaning |
|---|---|
| Superdense coding | A protocol sending 2 classical bits via 1 transmitted qubit, by consuming 1 pre-shared entangled pair |
| Mutual orthogonality | The property that lets a measurement perfectly distinguish between several possible states with zero ambiguity |
| Holevo bound | The general information-theoretic fact that a single unentangled qubit transmission can carry at most 1 classical bit when measured |

## Check yourself

If Alice wants to send Bob the message "10," she applies Z to her qubit, producing |Φ−⟩=(|00⟩−|11⟩)/√2. Explain why Bob's single Bell measurement on both qubits can distinguish this result from the "00" case (|Φ+⟩, unchanged) with certainty, and why this certainty depends specifically on the four possible results being mutually orthogonal.
