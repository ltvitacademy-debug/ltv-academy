# The Quantum Fourier Transform: Derivation

The Quantum Fourier Transform (QFT) is, mathematically, exactly the DFT matrix from the last lesson — the only new idea is that it now acts on the amplitudes of a quantum state instead of a list of classical numbers, and it has to be built out of a quantum circuit rather than read off a formula.

## What you'll learn

- The QFT's defining formula on a basis state |j⟩, and why it's literally the DFT matrix
- The full worked N=4 (2-qubit) example: QFT applied to |0⟩, |1⟩, and |2⟩, with exact numbers
- The product-form derivation using binary fraction notation
- Why the product form is exactly what makes the QFT buildable as single- and two-qubit gates

## The defining formula — same matrix, new object

For an n-qubit register (so N = 2^n basis states, |0⟩ through |N−1⟩), the Quantum Fourier Transform is defined by its action on each basis state |j⟩:

**QFT|j⟩ = (1/√N) · Σ_{k=0}^{N-1} e^(2πi·jk/N) |k⟩**

Compare this to Lesson 5's DFT formula, X_k = Σ_j x_j·e^(2πi·jk/N). It's the identical expression. The "quantum" part is not a different mathematical operation — it's that QFT|j⟩ is a quantum superposition, and the coefficients in front of each |k⟩ are *amplitudes* governed by the normal quantum rule (squared magnitudes sum to 1), which is exactly why the 1/√N normalization is mandatory here and only optional classically. The entire task of "building a quantum Fourier transform" is building a unitary circuit that reproduces this exact matrix using quantum gates — not inventing new math.

## Worked example: N = 4 (2 qubits), exact numbers

Using the verified 4x4 matrix from Lesson 5, here is what the QFT does to each of the three basis states |0⟩, |1⟩, |2⟩ of a 2-qubit register (N = 4):

**QFT|0⟩ = 0.5|0⟩ + 0.5|1⟩ + 0.5|2⟩ + 0.5|3⟩**

This is the uniform superposition — every amplitude is 0.5 (so every probability is 0.25). This matches intuition: |0⟩ is the "zero-frequency" input signal (a constant 1 at every position), and its Fourier transform concentrates entirely on the zero-frequency *output* component... except by the formula, |0⟩ as an *input* to the QFT produces equal weight on every output |k⟩, because e^(2πi·0·k/4) = 1 for every k. (Row/column 0 of the matrix, exactly as in Lesson 5.)

**QFT|1⟩ = 0.5|0⟩ + 0.5i|1⟩ − 0.5|2⟩ − 0.5i|3⟩**

Here the amplitudes cycle through the four 4th roots of unity: 1, i, −1, −i — precisely e^(2πi·k/4) for k = 0, 1, 2, 3. This is column/row 1 of the matrix from Lesson 5.

**QFT|2⟩ = 0.5|0⟩ − 0.5|1⟩ + 0.5|2⟩ − 0.5|3⟩**

Here the amplitudes alternate +0.5, −0.5, +0.5, −0.5 — the squared roots of unity, e^(2πi·2k/4) = e^(πik) = (−1)^k, the fastest possible alternation for a 4-element register.

These are exact values, directly computed from the matrix — nothing approximate.

## The product-form derivation

The formula QFT|j⟩ = (1/√N)Σ_k e^(2πi·jk/N)|k⟩ is correct but, written this way, gives no hint of how to build it from quantum gates acting on individual qubits. The key derivation step is to rewrite j in **binary fraction notation**. Write the n-bit integer j in binary as j = j_1 j_2 ... j_n (so j_1 is the most significant bit), and define the binary fraction 0.j_l j_{l+1} ... j_n = j_l/2 + j_{l+1}/4 + ... + j_n/2^(n−l+1).

With that notation, the QFT output factors into a **tensor product of single-qubit states**:

**QFT|j⟩ = (1/√N) ⊗_{l=1}^{n} ( |0⟩ + e^(2πi·0.j_l j_{l+1}...j_n) |1⟩ )**

Read this as: qubit l of the output is in the state |0⟩ + (a phase)|1⟩, where that phase depends only on the bits of j from position l onward. This is the single most important algebraic fact in this chapter, because a state that factors into a tensor product of single-qubit states is exactly the kind of state a quantum circuit can build directly — one qubit, and one controlled operation, at a time. If the QFT output *didn't* factor this way (if it were some inherently "entangled," non-separable combination), there would be no shortcut to an efficient circuit. The fact that it does factor is precisely why Lesson 7's circuit exists at all.

## Key terms

| Term | Meaning |
|---|---|
| Quantum Fourier Transform (QFT) | The unitary transform QFT\|j⟩ = (1/√N)Σ_k e^(2πi·jk/N)\|k⟩, mathematically identical to the classical DFT matrix applied to quantum amplitudes |
| Basis state | One of the N standard computational states \|0⟩, \|1⟩, ..., \|N−1⟩ of an n-qubit register (N = 2^n) |
| Binary fraction notation | Writing 0.j_l j_{l+1}...j_n = j_l/2 + j_{l+1}/4 + ... to express a phase that depends on a suffix of j's bits |
| Product form | The rewriting of QFT\|j⟩ as a tensor product of n single-qubit states, each carrying one phase, which makes an efficient circuit possible |

## Check yourself

QFT|0⟩ comes out as the uniform superposition 0.5|0⟩ + 0.5|1⟩ + 0.5|2⟩ + 0.5|3⟩, with no phases at all (every amplitude is the same positive real number). Using the defining formula QFT|j⟩ = (1/√N)Σ_k e^(2πi·jk/N)|k⟩, explain exactly why setting j = 0 forces every single exponential term e^(2πi·0·k/N) to equal 1, for every value of k and every N.
