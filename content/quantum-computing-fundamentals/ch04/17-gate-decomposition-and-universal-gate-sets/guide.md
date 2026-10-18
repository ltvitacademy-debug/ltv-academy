# Gate Decomposition & Universal Gate Sets

No real quantum processor can directly execute every gate you've learned. Hardware implements a small, fixed set of native gates, and everything else gets rewritten in terms of them. This lesson explains why a small gate set is enough for everything, and verifies one concrete rewrite by hand.

## What you'll learn

- Why real hardware only natively implements a small, fixed set of gates
- The standard universal gate set fact: {H, T, CNOT} can approximate any circuit to arbitrary precision
- A verified, concrete decomposition: S built from two applications of T
- Why "universal" means "arbitrarily close," not "exact," for continuous single-qubit rotations
- Why the same logical circuit can have very different real depth and cost on different hardware

## Why hardware needs a fixed, small gate set

Building a physical device that reliably implements *one* precise, stable quantum operation is already a hard engineering problem — control the right laser pulse, microwave frequency, or magnetic field for exactly the right duration, with exactly the right amplitude, with error small enough to be usable. Building a device that natively implements dozens of different gates, each needing its own precisely tuned control sequence, multiplies that difficulty many times over. Real quantum processors instead implement a small handful of native gates well, and rely on the mathematical fact that this small set is enough to reach everything else through composition — the same way a handful of classical logic gates (like NAND alone) is enough to build any classical circuit.

## The universal gate set fact

A set of gates is called **universal** if any quantum circuit, built from any gates at all, can be approximated to arbitrary precision using only gates drawn from that set. The standard result — sometimes stated via the Solovay-Kitaev theorem, which this course treats as an established fact rather than something to re-derive — is that the set **{H, T, CNOT}** is universal. H and T are both single-qubit gates (T applies a phase of e^(iπ/4) to the |1⟩ component, leaving |0⟩ untouched), and CNOT is the entangling two-qubit gate you already know. Some sources state the equivalent set as {H, S, T, CNOT}, since S turns out to be reachable from T alone anyway, as the next section verifies directly. The deeper reason this works is that CNOT provides all the entangling power any circuit needs, while H and T together can be combined, in long enough sequences, to approximate *any* single-qubit rotation — and single-qubit rotations plus CNOT is everything a circuit is built from.

## Verified decomposition: S from two T gates

The S gate's matrix is [[1, 0], [0, i]] — it leaves |0⟩ unchanged and multiplies |1⟩'s amplitude by i. The T gate's matrix is [[1, 0], [0, e^(iπ/4)]]. Applying T twice in sequence means squaring its bottom-right entry: (e^(iπ/4))² = e^(iπ/2) = i. Carrying out this matrix multiplication directly (representing each entry as a [real, imaginary] pair and multiplying 2×2 complex matrices by hand) confirms it exactly:

```
T  = [[1, 0], [0, cos(π/4)+i·sin(π/4)]]
T·T = [[1, 0], [0, i]]
```

The computed product's bottom-right entry comes out to exactly [0, 1] in [real, imaginary] form — that is, exactly i, with the real part landing at 0 (not merely close to 0) because cos(π/4)² − sin(π/4)² = 0 and the cross terms combine to give the imaginary part exactly 1. So T·T = [[1,0],[0,i]], which is precisely the S matrix. This is a case where decomposition is *exact*, not approximate: S = T², no error term at all. It's a useful concrete anchor for the broader universality claim — not every gate decomposes this cleanly in so few steps, but this one does, and it's worth being able to verify by hand rather than taking on faith.

## Why this matters practically

When you write a circuit using convenient, high-level gates — Z, S, an arbitrary rotation, a multi-controlled gate — you are writing at a *logical* level. Before that circuit actually runs, a **compiler** or **transpiler** (terms you'll meet directly when later courses in this catalog cover Qiskit and Q#) rewrites every gate in your circuit into the target hardware's specific native gate set, inserting the necessary sequences of native gates to reproduce each logical gate's effect. This is also exactly why the *same* logical circuit, submitted to two different real quantum processors with different native gate sets, can come back with very different real depth and real gate count: one hardware platform's native set might reach your Z gate in one native operation, while another's might need three. Understanding decomposition is what makes a gate-count or depth number quoted for "running on hardware X" meaningful, rather than mysterious.

## Key terms

| Term | Meaning |
|---|---|
| Native gate set | The small, fixed set of gates a specific piece of quantum hardware can directly execute |
| Universal gate set | A set of gates from which any quantum circuit can be approximated to arbitrary precision; {H, T, CNOT} is the standard example |
| Decomposition | Rewriting a gate (or circuit) as a sequence of gates from a different, typically smaller, gate set |
| Compiler / transpiler | Software that rewrites a logical circuit into a specific hardware's native gate set before execution |

## Check yourself

Given that S = T·T is exact, and that S² = Z (you can check this from S's matrix [[1,0],[0,i]]: squaring i gives −1, matching Z's matrix [[1,0],[0,−1]]), how many T gates, applied in sequence, would exactly reproduce the Z gate? Explain your reasoning from the two facts given, without computing a fresh matrix product.
