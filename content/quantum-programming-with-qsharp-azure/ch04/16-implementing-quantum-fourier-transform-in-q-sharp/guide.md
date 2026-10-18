# Implementing Quantum Fourier Transform in Q#

The Quantum Fourier Transform doesn't do anything useful on its own — it's the engine inside phase estimation, and phase estimation is the engine inside Shor's algorithm and quantum chemistry simulation. Knowing how it looks as a Q# building block matters because you'll be calling it, not reinventing it, almost every time.

## What you'll learn

- What the QFT actually computes, and why it's a change of basis, not an "answer"
- How to apply it to a qubit register using the Canon library's built-in operation
- The real Hadamard + controlled-phase structure underneath, if you had to write it by hand
- A verified, exact set of output amplitudes for a small concrete input

## What the QFT computes

The QFT maps a computational basis state `|j⟩` to a superposition over every basis state `|k⟩`, with a phase on each term that depends on `j` and `k`:

```
QFT|j⟩ = (1/√N) Σ_k exp(2πi·j·k/N) |k⟩
```

This is the quantum analogue of the discrete Fourier transform — it's a *change of basis*, from the computational basis to a basis where phase information becomes amplitude information you can extract by measurement. That's precisely what phase estimation needs: a way to turn "a phase we can't directly measure" into "a bitstring we can."

## Using the built-in operation

Q#'s standard libraries ship a QFT implementation so you essentially never hand-roll it for real work:

```qsharp
open Microsoft.Quantum.Canon;

operation RunQFT(qs : Qubit[]) : Unit is Adj + Ctl {
    ApplyQFT(qs);
}
```

`ApplyQFT` (and its little-endian/big-endian register-ordering variants in the Canon library) takes care of exactly how the Hadamards and controlled-phase rotations are ordered across the register, which is easy to get backwards by hand and hard to debug if you do.

## What it looks like built by hand

If you did write it yourself, the QFT on an `n`-qubit register is a Hadamard on the first qubit, followed by controlled-phase rotations between it and every other qubit, then recursively the same pattern on the remaining qubits, finished with a reversal of qubit order:

```qsharp
operation QFTByHand(qs : Qubit[]) : Unit is Adj + Ctl {
    let n = Length(qs);
    for i in 0 .. n - 1 {
        H(qs[i]);
        for j in i + 1 .. n - 1 {
            let angle = PI() / IntAsDouble(2 ^ (j - i));
            Controlled R1([qs[j]], (angle, qs[i]));
        }
    }
    // followed by a SWAP-based reversal of qs to correct qubit ordering
}
```

The point of walking through this isn't that you should write it this way in practice — it's that the controlled-phase angles are exactly where the Fourier phases in the formula above come from, gate by gate.

## A verified exact result

For a 2-qubit register in the input state `|01⟩` (index `j = 1`, out of `N = 4` basis states), the QFT formula was evaluated exactly via its defining sum (computed with explicit complex-number arithmetic, not approximated): every one of the 4 output amplitudes has magnitude exactly `0.5` (so each basis state is measured with probability exactly `0.25`), and the phases step by 90° per output index — `k=0` has phase 0 (amplitude `0.5 + 0i`), `k=1` has phase 90° (amplitude `0 + 0.5i`), `k=2` has phase 180° (amplitude `-0.5 + 0i`), and `k=3` has phase 270° (amplitude `0 - 0.5i`). In other words:

```
QFT|01⟩ = 0.5|00⟩ + 0.5i|01⟩ − 0.5|10⟩ − 0.5i|11⟩
```

Every output is equally likely to be measured — the information isn't in *which* basis state you get, it's in the relative phases between them, which is exactly why QFT output is almost never measured directly on its own; it's measured as part of a larger phase-estimation circuit that's engineered to make the phase information show up in the measurement statistics instead.

## Key terms

| Term | Meaning |
|---|---|
| Quantum Fourier Transform (QFT) | A change-of-basis operation converting phase information into amplitude/measurement-extractable information |
| `ApplyQFT` | The Canon library's built-in QFT operation for a qubit register |
| Controlled-phase rotation | The gate (e.g. `Controlled R1`) that encodes the Fourier phase angles between qubit pairs |
| Phase estimation | The algorithm that uses the (inverse) QFT to extract an eigenvalue's phase as a measurable bitstring |

## Check yourself

Why does measuring the QFT's output directly, on its own, typically give you no useful information -- and what does that imply about how QFT is actually used inside phase estimation?
