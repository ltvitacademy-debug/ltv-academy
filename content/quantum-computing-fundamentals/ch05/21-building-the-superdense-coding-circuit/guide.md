# Building the Superdense Coding Circuit

Teleportation used entanglement plus two classical bits to send one qubit's worth of quantum information. Superdense coding runs the idea in the opposite direction: using entanglement plus one physically transmitted qubit, Alice sends Bob two classical bits — double what a single qubit could carry on its own.

## What you'll learn

- The full superdense coding circuit: encode, transmit, decode
- The four encoding gates {I, X, Z, ZX} and what each one does to a shared Bell pair
- How to verify Bob's decode step — CNOT then H then measure — recovers the exact bits sent
- Why this doubles the classical capacity of a single transmitted qubit without breaking any physical law
- The "hidden cost" that makes the doubling possible

## The setup: a pre-shared Bell pair

Exactly as in teleportation, Alice and Bob start by sharing a Bell pair (|00⟩+|11⟩)/√2, with Alice holding q1 and Bob holding q2, prepared and distributed before Alice decides what message to send. Using basis order |q1 q2⟩, index = 2·q1+q2, the Bell pair is the 4-amplitude vector (1/√2, 0, 0, 1/√2) ≈ (0.7071, 0, 0, 0.7071).

Alice wants to send one of four 2-bit messages: 00, 01, 10, or 11. She picks a single-qubit gate to apply to *only her own qubit* q1, based on which message she wants to send, then physically sends q1 to Bob (q2 never moves). Bob then applies CNOT(q1→q2), then H on q1, then measures both qubits — and reads off exactly the two bits Alice chose.

## The circuit

```
q1 (Alice): |0⟩──[H]──●──[Gate: I/X/Z/ZX]── ──────●───[H]───[M]── bit1
                       │       (encode)    (send q1)│
q2 (Bob):   |0⟩────────┴────────────────────────────┴─[CNOT target]──[M]── bit2
```

Read left to right: the H+CNOT on the left is Bell-pair preparation (shared in advance, same as teleportation). Alice's encoding gate sits in the middle, applied only to her half. Then her qubit physically travels to Bob, who runs CNOT(control=q1, target=q2) followed by H on q1, then measures both qubits.

## The encode table

| Message | Alice's gate on q1 | Resulting state (q1,q2) |
|---|---|---|
| 00 | I (do nothing) | (0.7071, 0, 0, 0.7071) |
| 01 | X | (0, 0.7071, 0.7071, 0) |
| 10 | Z | (0.7071, 0, 0, -0.7071) |
| 11 | X then Z (applied in that order) | (0, 0.7071, -0.7071, 0) |

I verified the "11" row myself in `node`, applying X to q1 of the Bell pair and then Z to q1 of the result:

```
state = [0.7071, 0, 0, 0.7071]
applyX1(state)          // -> [0, 0.7071, 0.7071, 0]
applyZ1(applyX1(state)) // -> [0, 0.7071, -0.7071, 0]
```

This matches the table exactly: X swaps the |00⟩ and |11⟩ amplitudes to |01⟩ and |10⟩, and the subsequent Z flips the sign on whichever amplitude now has q1=1 — here that's the |10⟩ term, which comes out negative.

## Decoding: CNOT then H then measure

Bob runs the exact mirror of the encoding steps: CNOT(q1→q2) to un-spread the entanglement, then H on q1 to collapse the superposition back to a single basis state. I ran this decode step on the "11"-encoded state to confirm it:

```
after CNOT(1→2) on [0, 0.7071, -0.7071, 0]: [0, 0.7071, 0, -0.7071]
after H(1):                                  [0, 0, 0, ~1.0]
```

The result lands entirely on index 3 (|11⟩), so Bob measures 1,1 with probability 1 — exactly the message Alice encoded. The same decode procedure applied to each of the other three encoded states returns exactly 00, 01, or 10 respectively, every time, with no ambiguity: each of the 4 messages decodes deterministically to itself.

## The headline fact, and its hidden cost

One physically transmitted qubit, combined with one pre-shared entangled pair, carries 2 classical bits — exactly double the 1-bit-per-qubit limit that would otherwise hold. This looks like it beats a fundamental limit, but it doesn't: the Bell pair had to be created and distributed to both parties *before* Alice knew what message she'd send. That earlier step already cost a physical qubit transmission (someone had to carry half the pair to Bob). Superdense coding doesn't get something for nothing — it front-loads one unit of entanglement so that the *later*, time-critical transmission can carry twice the usual information. No channel-capacity law is violated because the full accounting includes that earlier, pre-shared qubit.

## Key terms

| Term | Meaning |
|---|---|
| Encoding gate | The single gate (I, X, Z, or ZX) Alice applies to her own qubit to select which 2-bit message to send |
| Decode step | Bob's CNOT(q1→q2) followed by H on q1, applied after receiving Alice's qubit, which collapses the state to the exact message sent |
| Classical capacity | The maximum classical information one physically transmitted qubit can carry; normally 1 bit, doubled to 2 bits here |
| Hidden cost | The earlier physical transmission required to distribute the Bell pair, which is what makes the later doubling possible |

## Check yourself

Work through what happens if Alice encodes "10" with Z but Bob's qubit q2 was accidentally measured (destroying the entanglement) before Alice's qubit arrives. Using the fact that a measured, disentangled q2 can no longer be acted on by Bob's CNOT in any meaningful way, explain why the decode procedure can no longer reliably recover Alice's 2 bits.
