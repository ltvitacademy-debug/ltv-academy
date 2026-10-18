# Surface Code Lab

Two hands-on exercises: computing qubit counts at distances not already tabulated, and reasoning through which stabilizers detect a specific error on the smallest practical lattice.

## What you'll learn

- How to compute total physical-qubit counts for new code distances using the verified formula
- How to reason through which stabilizers would detect a specific single-qubit error on a d=3 lattice
- Why this kind of direct reasoning is what a real decoder automates at scale

## Exercise 1: qubit counts at d=13 and d=17

Using the verified formulas (data = d², ancilla = d² − 1, total = 2d² − 1), computed directly for two distances not in the earlier tables:

| d | Data qubits | Ancilla qubits | Total qubits |
|---|---|---|---|
| 13 | 169 | 168 | 337 |
| 17 | 289 | 288 | 577 |

Notice the jump from d=13 to d=17 (337 → 577, a difference of 240 qubits) is much larger than the jump from d=3 to d=7 earlier (17 → 97, a difference of 80 qubits) — consistent with lesson 20's observation that total qubit count grows quadratically, so each fixed step up in distance costs *more* additional qubits the larger the starting distance already is.

## Exercise 2: tracing a specific error on the d=3 lattice

Take the smallest practical surface code, d=3: 9 data qubits, 8 ancillas (lesson 20). Suppose a single data qubit sitting at a position touched by exactly 2 of the 8 stabilizers (a boundary qubit, since boundary positions on this small lattice touch fewer stabilizers than bulk positions) suffers an **X error**.

Following the exact same anticommutation logic used throughout this course (chapter 4, lesson 15): an X error anticommutes with Z-type stabilizers and commutes with X-type stabilizers. So only the **Z-type stabilizers that include this qubit in their 4-qubit (or, at the boundary, 2- or 3-qubit) support** will flip. If this particular boundary qubit happens to be touched by exactly one Z-type stabilizer (a common situation at the lattice edge, where fewer stabilizers reach each qubit), the result is that **exactly one defect appears** — a single flipped Z-type stabilizer outcome, with every other stabilizer on the lattice reading normally.

This matches the general pattern from lesson 18's Steane-code column-lookup exercise: identifying which stabilizers "see" a given qubit is a purely structural question (which stabilizers include that qubit in their support), answerable without simulating the full quantum state — exactly the kind of lookup a real decoder (lesson 22) automates across the entire lattice, for every possible error, every round.

## Why single-defect cases are the easy case

A single, isolated defect (as in Exercise 2) is the easiest case for a decoder: it pairs that one defect with the nearest lattice boundary and applies the corresponding correction, done. The harder cases — multiple defects appearing across several rounds, requiring MWPM's full graph-matching machinery (lesson 22) — are what real decoding hardware has to handle continuously once a computation is running long enough for several errors to accumulate between corrections.

## Key terms

| Term | Meaning |
|---|---|
| Boundary qubit | A data qubit near the lattice edge, touched by fewer stabilizers than an interior ("bulk") qubit |
| Single-defect case | An error producing exactly one flipped stabilizer outcome, correctable by pairing with the nearest boundary |
| Structural lookup | Determining which stabilizers detect a given qubit's error purely from the lattice's fixed geometry, without quantum simulation |

## Check yourself

If the same X error in Exercise 2 had instead occurred on an interior (bulk) data qubit, touched by 2 different Z-type stabilizers instead of just 1, how many defects would you expect to see, and why would that change the decoder's job compared to the single-defect boundary case?
