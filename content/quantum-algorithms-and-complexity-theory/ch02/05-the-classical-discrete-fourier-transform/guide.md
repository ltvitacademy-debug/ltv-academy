# The Classical Discrete Fourier Transform

Before you can understand what makes the *quantum* Fourier transform interesting, you need the ordinary, fully classical Discrete Fourier Transform (DFT) cold — it's the same linear algebra, just acting on quantum amplitudes instead of classical numbers starting next lesson.

## What you'll learn

- The DFT formula as a change of basis, and the exact sign convention this course uses
- Why the DFT is just a matrix-vector multiplication
- The concrete 4x4 DFT matrix, worked out exactly
- Why nobody actually multiplies by the matrix: naive O(N²) vs. the classical FFT's O(N log N)
- Why this "boring" classical algorithm matters at all for a quantum algorithms course

## The DFT as a change of basis

Given a sequence of N complex numbers x_0, x_1, ..., x_{N-1}, the Discrete Fourier Transform produces a new sequence X_0, X_1, ..., X_{N-1} defined by:

**X_k = Σ_{j=0}^{N-1} x_j · e^(2πi·jk/N)**

(This course uses the **positive-exponent convention**, e^(+2πi·jk/N), deliberately — it's the convention the Quantum Fourier Transform uses in the next lesson, and matching signs now means Lesson 6 connects to this one with zero translation step. Some textbooks define the classical DFT with a minus sign and a 1/N normalization out front; that's an equally valid convention, just not the one used here.)

Read that formula as: each output X_k is a weighted sum of *all* the input values, where the weights e^(2πi·jk/N) are points evenly spaced around the unit circle in the complex plane. X_k measures "how much of frequency k" is present in the input sequence. This is why the DFT is described as a **change of basis**: it takes a sequence described in the "time domain" (value at each position j) and re-describes the exact same information in the "frequency domain" (how much of each frequency k is present) — no information is lost, and you can always invert the transform to get back the original sequence.

## It's just a matrix multiplication

Because the formula is linear in the x_j's, the whole transform is a single N×N matrix F applied to the input vector: **X = F·x**, where the entry in row k, column j of F is F_{kj} = (1/√N)·e^(2πi·jk/N). (The 1/√N factor out front makes F a *unitary* matrix — length-preserving — which is the form this course will carry forward into the quantum version, where unitarity is mandatory.)

## Worked example: the 4x4 DFT matrix

For N = 4, computing F_{kj} = (1/√N)·e^(2πi·jk/4) for every row k and column j gives this exact matrix:

```
Row k=0: [ 0.5+0i,  0.5+0i,  0.5+0i,  0.5+0i ]
Row k=1: [ 0.5+0i,  0+0.5i, -0.5+0i,  0-0.5i ]
Row k=2: [ 0.5+0i, -0.5+0i,  0.5+0i, -0.5+0i ]
Row k=3: [ 0.5+0i,  0-0.5i, -0.5+0i,  0+0.5i ]
```

Notice the structure: row 0 is all 0.5's (frequency 0 is the "DC" or average component, so every input contributes equally). Row 2 alternates +0.5, −0.5 — the highest frequency a length-4 sequence can represent, flipping sign every step. Rows 1 and 3 cycle through the four 4th roots of unity (1, i, −1, −i) — exactly what you'd expect from "frequency 1" and "frequency 3" components of a length-4 signal. This is pure linear algebra on classical numbers; nothing here is quantum yet. In Lesson 6, this exact matrix reappears as the Quantum Fourier Transform for a 2-qubit register — same numbers, applied to quantum amplitudes instead of a classical list.

## Computing it: naive O(N²) vs. the Fast Fourier Transform

Reading the formula directly, computing all N outputs X_k from all N inputs x_j requires, for each of the N outputs, summing N terms — that's N×N = O(N²) multiplications for the full transform. For N = 4 that's trivial (16 multiplications), but for N = 1,000,000 that's a trillion operations — too slow for real use (audio processing, image compression, signal analysis all run DFTs constantly).

The **Fast Fourier Transform (FFT)**, discovered by Cooley and Tukey in 1965 (though the core idea traces back further), restructures the same computation by recursively splitting the sum into even- and odd-indexed terms, exploiting the repeating structure of the roots of unity to avoid redundant work. The result is the exact same output as the naive O(N²) method, computed in **O(N log N)** time — for N = 1,000,000, that's roughly 20 million operations instead of a trillion. The FFT is one of the most important algorithms in all of computing, and it's entirely classical — no quantum computer involved.

## Key terms

| Term | Meaning |
|---|---|
| Discrete Fourier Transform (DFT) | A linear change of basis that re-expresses a sequence of N numbers in terms of N frequency components |
| Frequency domain | The representation of a sequence as "how much of each frequency is present," as opposed to its original value-at-each-position form |
| Unitary matrix | A matrix that preserves vector length (here, the normalized DFT matrix F) |
| Roots of unity | The N complex numbers e^(2πi·k/N) for k = 0...N-1, evenly spaced around the unit circle, which are exactly the entries of the DFT matrix |
| Fast Fourier Transform (FFT) | The O(N log N) classical algorithm that computes the exact DFT result without the O(N²) naive matrix multiplication |

## Check yourself

The DFT matrix for N = 4 has 0.5 in every entry of row k = 0. Using the formula F_{kj} = (1/√N)·e^(2πi·jk/N), explain in your own words why row k = 0 is the one row that is always constant, for *any* N — not just N = 4.
