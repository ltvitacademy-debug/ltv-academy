# Shor's Algorithm: Circuit Structure

Lesson 21 proved that factoring reduces to period-finding. This lesson opens up the actual quantum circuit that does the period-finding — and shows that it's not a new invention from scratch, but phase estimation (from earlier chapters) applied to a specific, carefully built unitary.

## What you'll learn

- The full seven-step pipeline from random a to recovered factors
- Why the counting register + inverse QFT step is literally phase estimation applied to modular exponentiation
- How continued fractions turns a noisy quantum measurement into the exact period r
- Why modular exponentiation, not the QFT, dominates the circuit's real resource cost

## The seven steps

**1. Classical preprocessing.** Pick a random a with 1 < a < N, and classically check gcd(a, N) = 1 using Euclid's algorithm. If gcd(a, N) > 1, you've already found a nontrivial factor by sheer luck — rare, but worth checking first since it's essentially free.

**2. Initialize two registers.** A **counting register** of n qubits (enough to resolve the period precisely) is put into an equal superposition over all 2ⁿ values using Hadamard gates. A separate **work register** is initialized to hold the value 1.

**3. Controlled modular exponentiation.** Apply the unitary U_a that implements |x⟩|y⟩ → |x⟩|y·aˣ mod N⟩. This is built from a sequence of controlled modular multiplication circuits — each bit of the counting register controls whether a particular power-of-two modular multiplication is applied to the work register. This single step is what entangles the counting register with the periodic structure of a^x mod N.

**4. Inverse Quantum Fourier Transform.** Apply the inverse QFT to the counting register. This is the same inverse QFT used in Chapters 2 and 3's phase estimation lessons — in fact, steps 2 through 4 together *are* phase estimation, applied specifically to the unitary U_a. Phase estimation's job is always the same: turn a hidden periodicity (here, hidden in how a^x mod N cycles with period r) into a measurable value concentrated near a useful fraction. In this case, the QFT concentrates the counting register's amplitude near values close to multiples of 2ⁿ/r.

**5. Measure the counting register.** The measurement yields an integer close to s·2ⁿ/r for some unknown integer s. This measured value approximates the fraction s/r, but not exactly — it needs one more classical step to pin down r precisely.

**6. Classical continued-fractions extraction.** Apply the continued-fractions algorithm to the measured value divided by 2ⁿ. This classical number-theory technique finds the best rational approximation s/r with a denominator below a bound, recovering the candidate period r exactly (or a divisor of it, in which case a quick check and possible retry handles it).

**7. Classical gcd computation.** With r in hand, apply exactly the proof from Lesson 21: check r is even and a^(r/2) ≢ −1 (mod N), then compute gcd(a^(r/2) − 1, N) and gcd(a^(r/2) + 1, N) to recover the factors.

## Connecting back: this is phase estimation

If Chapters 2 and 3's phase estimation felt abstract, Shor's algorithm is the concrete payoff: U_a has eigenvalues related to e^(2πik/r) for the unknown period r, and phase estimation's entire purpose is extracting a phase like k/r from a unitary's eigenstructure using exactly the Hadamard-superposition-then-inverse-QFT pattern in steps 2–4. Nothing new is invented here — period-finding *is* phase estimation, specialized to U_a.

## The honest resource bottleneck

Steps 2, 4, 5, 6, and 7 are comparatively cheap. Step 3 — controlled modular exponentiation — is where the real circuit cost lives. Implementing |x⟩|y⟩ → |x⟩|y·aˣ mod N⟩ for an n-bit N requires on the order of O(n³) basic quantum gates (the result of chaining O(n) controlled modular multiplications, each costing roughly O(n²) gates for schoolbook modular arithmetic). This gate count is what dominates total circuit size and runtime, and it's exactly why practical feasibility — covered next in Lesson 23 — comes down to how large n (the bit-length of N) can get before the gate count and qubit requirements exceed what real hardware can run reliably.

## Key terms

| Term | Meaning |
|---|---|
| Counting register | The qubit register holding the superposition that, after the inverse QFT, encodes the period |
| Controlled modular exponentiation (U_a) | The unitary |x⟩|y⟩ → |x⟩|y·aˣ mod N⟩; built from controlled modular multiplications |
| Inverse QFT | The same transform from Chapters 2–3's phase estimation lessons, reused here to extract the period |
| Continued fractions | The classical algorithm that converts a noisy measured value into the exact candidate period r |

## Check yourself

Explain, in your own words, why calling steps 2 through 4 of Shor's circuit "phase estimation applied to U_a" is accurate rather than just a loose analogy — what specifically is being estimated, and what plays the role of the eigenvalue's phase?
