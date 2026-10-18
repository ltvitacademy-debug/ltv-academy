# Implementing Teleportation in Q#

Quantum teleportation moves a qubit's exact state to another qubit using entanglement and two classical bits — no physical qubit travels, and no information travels faster than light. Writing it in Q# makes the protocol's actual information flow (quantum entangle, classical measure, classical send, quantum correct) unusually explicit, because operations and classical `Result` values are distinct types the compiler tracks separately.

## What you'll learn

- The full 3-qubit protocol: entangle, apply a Bell-basis change, measure, correct
- Why the correction step depends on classical measurement outcomes, expressed in Q# as ordinary conditional logic on `Result` values
- A verified, exact set of Bell-measurement outcome probabilities and post-correction results
- Why this protocol proves no faster-than-light signaling is happening, not the opposite

## The protocol, as a Q# operation

```qsharp
operation Teleport(msg : Qubit, here : Qubit, there : Qubit) : Unit {
    // here/there start as an entangled Bell pair: (|00> + |11>)/sqrt(2)
    H(here);
    CNOT(here, there);

    // Bell-basis change on the qubit to send (msg) and the sender's half of the pair (here)
    CNOT(msg, here);
    H(msg);

    // measure both of the sender's qubits -- these are the 2 classical bits
    let m1 = M(msg);
    let m2 = M(here);

    // classically-controlled correction on the receiver's qubit
    if m2 == One {
        X(there);
    }
    if m1 == One {
        Z(there);
    }
}
```

After this runs, `there` holds exactly the state `msg` started in — but `msg` itself has been measured and destroyed in the process (teleportation necessarily consumes the original, consistent with the no-cloning theorem). The two `if` blocks are the entire "classical channel" in this protocol: `m1` and `m2` are ordinary `Result` values, and applying `X`/`Z` conditionally on them is ordinary Q# control flow, not anything quantum-mechanically special.

## A verified exact result

Taking the qubit to teleport in the state `|+⟩ = (|0⟩+|1⟩)/√2` and an ideal Bell pair for `here`/`there`, the full 3-qubit state was built explicitly and the circuit (`CNOT` then `H` on the sender's two qubits) was applied via matrix computation. The result: each of the 4 possible `(m1, m2)` measurement outcomes occurs with probability exactly **0.25** — confirmed directly from the computed amplitudes, not assumed from the general theorem. For each outcome, the receiver's qubit (`there`) collapses to a state related to the original `|+⟩` by at most a Pauli correction: for example, one outcome left `there` already equal to `|+⟩` with no visible correction needed (because `|+⟩` happens to be unaffected by `X`), while a different outcome left `there` in the state `|−⟩ = (|0⟩−|1⟩)/√2`, which the `Z` correction maps exactly back to `|+⟩`. In every case, applying the correction indicated by that outcome's `(m1, m2)` bits reproduces the original state with fidelity exactly **1.0** — the receiver ends up with precisely what the sender started with, not an approximation.

## Why this doesn't send information faster than light

It's tempting to read "the receiver's qubit changes based on what happens far away" as faster-than-light signaling, but the protocol itself rules that out: the receiver's qubit is in one of 4 possible post-measurement states, each equally likely (probability 0.25), and **without the 2 classical bits** `m1`/`m2`, the receiver cannot tell which of those 4 states they have — their qubit, examined alone, looks identical regardless of what the sender measured. The actual information transfer — telling the receiver which correction to apply — happens over the classical bits `m1` and `m2`, which can only travel at or below the speed of light, same as a phone call. Entanglement makes the correlation possible; it's the classical bits that make the correction (and therefore the useful outcome) possible.

## Key terms

| Term | Meaning |
|---|---|
| Bell pair | A maximally entangled 2-qubit state, `(|00⟩+|11⟩)/√2`, shared between sender and receiver before teleportation begins |
| Bell-basis change | The `CNOT` + `H` pair applied to the sender's two qubits before measurement |
| Classically-controlled correction | The `X`/`Z` gates applied to the receiver's qubit, conditioned on the sender's classical measurement results |
| No-cloning theorem | The reason the original qubit (`msg`) is destroyed by measurement rather than copied |

## Check yourself

If the receiver's qubit, examined alone with no access to `m1`/`m2`, looks identical no matter what the sender measured, what does that tell you about why this protocol cannot be used to send a message instantaneously?
