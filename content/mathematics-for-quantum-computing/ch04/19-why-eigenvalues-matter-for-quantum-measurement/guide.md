# Why Eigenvalues Matter for Quantum Measurement

This is the payoff for the whole chapter. Everything about eigenvalues and eigenvectors you've built up — $Av=\lambda v$, solving the characteristic equation, Pauli-Z's eigenvectors turning out to be $|0\rangle$ and $|1\rangle$ — comes together in one of the strangest and most important facts in quantum computing: when you measure a qubit, the only possible outcomes are the eigenvalues of the thing you're measuring, and the qubit's state jumps to the matching eigenvector.

## What you'll learn

- What a quantum observable is (previewed here; Chapter 5 covers Hermitian operators in depth)
- The measurement postulate: outcomes are eigenvalues, and the state collapses to the matching eigenvector
- A full concrete walkthrough of measuring Pauli-Z on a qubit in superposition
- How to compute the probability of each measurement outcome from the state's amplitudes
- Why this is a direct, literal application of Lesson 17's computation — not an analogy

## Observables and the measurement postulate

In quantum computing, a measurable physical quantity (like "which basis state is this qubit in") is represented by a matrix called an **observable** — specifically a **Hermitian operator**, a type of matrix Chapter 5 defines carefully. For now, the only property that matters is this: a Hermitian operator's eigenvalues are always real numbers, which is required, since a measurement has to produce a real, readable number, not a complex one.

The **measurement postulate** states two things about measuring an observable $M$ on a qubit state $|\psi\rangle$:

1. The result of the measurement is always *one of $M$'s eigenvalues* — never any other number.
2. Immediately after the measurement, the qubit's state **collapses** to the eigenvector of $M$ that matches whichever eigenvalue was observed.

This is exactly the eigenvalue/eigenvector machinery from Lessons 16–18, just applied to a physical act instead of an abstract computation. Nothing new to learn mathematically — only a new meaning attached to a calculation you already know how to do.

## Concrete example: measuring Pauli-Z

Lesson 17 found that the Pauli-Z matrix $Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ has eigenvalues $+1$ and $-1$, with eigenvectors $|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $|1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ respectively. $Z$ is the observable for "measure this qubit in the computational basis."

By the measurement postulate: measuring $Z$ can only ever return $+1$ or $-1$ — never $0.3$, never $5$, never any value that isn't one of those two eigenvalues. If the result is $+1$, the qubit's state collapses to $|0\rangle$. If the result is $-1$, it collapses to $|1\rangle$. This is the mathematical reason a qubit measurement is binary and why the two outcomes are labeled "0" and "1" at all — they're reading off which eigenvector the state collapsed into.

## Computing the probability of each outcome

Suppose the qubit starts in superposition:

$$|\psi\rangle = \frac{3}{5}|0\rangle + \frac{4}{5}|1\rangle = \begin{pmatrix} 3/5 \\ 4/5 \end{pmatrix}$$

(Check this is a valid state first: the amplitudes must satisfy $|a|^2+|b|^2=1$. Here $\left(\frac{3}{5}\right)^2 + \left(\frac{4}{5}\right)^2 = \frac{9}{25}+\frac{16}{25} = \frac{25}{25} = 1$ ✓ — a valid normalized state.)

Measuring $Z$ on this state can only return $+1$ or $-1$. The probability of each outcome is the squared magnitude of the amplitude on the matching eigenvector:

- $P(+1) = |3/5|^2 = 9/25 = 0.36$ — the probability the state collapses to $|0\rangle$
- $P(-1) = |4/5|^2 = 16/25 = 0.64$ — the probability the state collapses to $|1\rangle$

Check these sum to 1, as any valid set of outcome probabilities must: $9/25 + 16/25 = 25/25 = 1$ ✓. After the measurement returns, say, $-1$, the qubit is no longer in superposition — it is now exactly $|1\rangle$, with certainty, until something acts on it again. That irreversible jump from "superposition of amplitudes" to "exactly one eigenvector" is what "collapse" means.

## Why this is the reason quantum measurement feels strange

Classically, "measuring" something just reveals a pre-existing value. Quantum measurement is different: before the measurement, the qubit genuinely does not have a definite value of $Z$ — it's in a combination of both eigenvectors. The act of measuring forces one specific eigenvalue to come out, with a probability set by the amplitudes, and changes the state itself in the process. None of that strangeness is extra quantum mysticism bolted onto linear algebra — it is linear algebra, specifically the fact that an operator's eigenvectors form the only "definite-value" directions it has, applied to a physical act. Chapter 5 builds the general theory (Hermitian operators, why their eigenvalues are always real, expectation values); this lesson is the concrete anchor to hold onto when that gets abstract.

## Common mistakes

- **Thinking a measurement can return any number.** It can only return one of the observable's eigenvalues — full stop. For Pauli-Z, that means only $+1$ or $-1$, never anything else.
- **Forgetting to square the amplitude for probability.** The probability is $|{\rm amplitude}|^2$, not the amplitude itself — $3/5$ is not the probability of measuring $+1$; $(3/5)^2 = 9/25$ is.
- **Treating collapse as reversible.** Once the measurement returns an outcome, the pre-measurement superposition is gone; the state is now exactly the corresponding eigenvector.

## Key terms

| Term | Meaning |
|---|---|
| Observable | A Hermitian matrix representing a measurable physical quantity |
| Measurement postulate | Measuring observable $M$ always returns one of $M$'s eigenvalues, and the state collapses to the matching eigenvector |
| Collapse | The irreversible change of a quantum state to exactly one eigenvector immediately after measurement |
| Outcome probability | For eigenvector-aligned amplitude $a$, the probability of measuring that eigenvector's eigenvalue is $|a|^2$ |

## Check yourself

A qubit is in the state $|\psi\rangle = \frac{1}{\sqrt{2}}|0\rangle - \frac{1}{\sqrt{2}}|1\rangle$. If you measure Pauli-Z on this qubit, what are the two possible outcomes, what is the probability of each, and what does the state become immediately after each possible outcome?
