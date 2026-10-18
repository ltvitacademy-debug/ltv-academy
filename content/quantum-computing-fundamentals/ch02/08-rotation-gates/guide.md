# Rotation Gates

Every gate you've met so far in this chapter is fixed — X, Y, Z, H, S, and T each have one specific matrix and nothing adjustable about them. Rotation gates break that pattern: Rx, Ry, and Rz are entire continuous families of gates, parameterized by an angle θ, and the fixed gates you already know turn out to be special cases hiding inside them.

## What you'll learn

- The explicit matrices for Ry(θ), Rx(θ), and Rz(θ)
- Direct computation showing Ry(π/2)|0⟩ matches H|0⟩ numerically
- Why Ry(π/2)|1⟩ does NOT match H|1⟩, and what that reveals about comparing gates
- How X and Z reappear as Rx(π) and Rz(π), up to an overall global phase
- Why a continuous parameter θ makes these gates fundamentally different from the fixed gates earlier in the chapter

## Three rotation families

Each rotation gate rotates the qubit's state around one axis of the Bloch sphere by an angle θ. Ry is the easiest to work with because its matrix is entirely real-valued:

```
Ry(θ) = [ cos(θ/2)   -sin(θ/2) ]
        [ sin(θ/2)    cos(θ/2) ]

Rx(θ) = [   cos(θ/2)     -i·sin(θ/2) ]
        [ -i·sin(θ/2)     cos(θ/2)   ]

Rz(θ) = [ e^(-iθ/2)        0      ]
        [    0         e^(iθ/2)   ]
```

Notice the θ/2, not θ, inside every entry — a full 2π rotation of the angle parameter corresponds to only a half-turn in the underlying matrix sense (a quirk tied to qubits being spin-1/2 systems), but you don't need the physics behind that to use these matrices correctly; just don't forget the factor of 2.

## Ry(π/2) looks like H on |0⟩ — but not on |1⟩

Computing Ry(π/2)|0⟩ directly in `node -e` — plugging θ = π/2 into the real-valued Ry matrix and multiplying by [1,0]ᵀ — gives [cos(π/4), sin(π/4)] = [0.707107, 0.707107]. That's numerically identical to H|0⟩ from the previous lesson. It's tempting to conclude Ry(π/2) and H are the same gate.

They are not, and computing the second basis vector proves it. Ry(π/2)|1⟩, computed the same way, gives [−sin(π/4), cos(π/4)] = [−0.707107, 0.707107]. Compare that to H|1⟩ = [0.707107, −0.707107] from the Hadamard lesson: the signs are flipped on *both* entries — Ry(π/2)|1⟩ is the negative of H|1⟩, not the same vector. Squaring the magnitudes gives identical measurement probabilities (0.5/0.5) either way, since an overall minus sign disappears under squaring, but as state vectors, the two results are genuinely different.

This is a precise and important lesson in its own right, independent of rotation gates specifically: **two gates agreeing on one basis vector's output does not mean they are the same gate.** You have to check the full matrix — or at minimum both basis vectors for a single-qubit gate — before concluding two operations are identical. Ry(π/2) and H happen to agree on |0⟩ and disagree (by a sign) on |1⟩, which makes them related but distinct single-qubit gates.

## The Pauli gates hiding inside Rx and Rz

Set θ = π in Rx and compare to X. Computing Rx(π) directly in `node -e` gives the matrix [[0, −i], [−i, 0]], which is exactly −i times the X matrix [[0,1],[1,0]]. In other words, **Rx(π) = X up to the global phase factor −i.** The same check on Rz(π) against Z gives [[−i, 0], [0, i]], which is exactly −i times the Z matrix [[1,0],[0,−1]], so **Rz(π) = Z up to the same global phase factor −i.**

A global phase — a single complex scalar multiplying the entire state vector, uniformly, with no relative effect between amplitudes — never changes any measurement probability, because squaring |−i|² = 1 for every amplitude at once. This is different from the relative phase you saw with Z and with Ry(π/2) above: a *relative* phase changes one amplitude's angle relative to another and can become observable through interference; a *global* phase multiplies the whole vector by the same constant and can never be detected by any measurement, no matter what circuit comes after it. So while Rx(π) and X are not identical matrices, they are physically indistinguishable gates — any circuit that uses one in place of the other produces identical measurement statistics, always.

## Why continuous parameters matter

The fixed gates (X, Y, Z, H, S, T) give you a small, specific toolkit. Rotation gates give you access to literally any single-qubit unitary, since every one of the fixed gates can be reproduced by some choice of θ in Rx, Ry, or Rz (up to the kind of global phase just discussed), and intermediate angles reach everything in between. This is exactly the knob real quantum hardware exposes at the physical level — a superconducting qubit or trapped ion is driven by a pulse whose duration and detuning set θ directly — which is why Rx, Ry, Rz show up constantly once you get to variational algorithms and hardware-level circuit design later in the course.

## Key terms

| Term | Meaning |
|---|---|
| Rotation gate | A continuous one-parameter family of single-qubit unitaries (Rx(θ), Ry(θ), Rz(θ)), as opposed to a fixed gate with no adjustable angle |
| Ry(θ) | Real-valued rotation matrix [[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]] |
| Global phase | A single complex scalar multiplying an entire state vector uniformly; never affects any measurement probability |
| Relative phase | A phase difference between two amplitudes of the same state; invisible to a lone measurement but observable through interference |
| "Up to global phase" | Two gates/states that differ only by an overall scalar multiplier of magnitude 1, and are therefore physically indistinguishable despite having different matrix/vector entries |

## Check yourself

Using the matrices in this lesson, what single-qubit state do you get by computing Ry(π)|0⟩, and how does that result compare — entry by entry — to X|0⟩ from the Pauli-gates lesson? Is Ry(π) equal to X outright, equal only up to a global phase, or neither? Work through the comparison the same way the lesson compared Rx(π) to X.
