# How to Honestly Benchmark a Quantum Algorithm

Every chapter in this course has quietly done the same thing: stated a speedup, then immediately qualified it. This lesson makes that habit explicit as a five-point checklist you can apply to any claim you hear about quantum advantage — including the ones in this very course.

## What you'll learn

- Why comparing against a weak classical algorithm invalidates a benchmark, even if every number in it is true
- The difference between query complexity, gate complexity, and wall-clock time, and why conflating them is the most common error in popular coverage
- Why "asymptotically faster" and "practically faster today" are different claims
- How to state assumptions and error models explicitly instead of leaving them implicit
- How this checklist applies retroactively to Chapters 1-6 of this course

## Rule 1: compare against the best known classical algorithm, not a convenient one

A benchmark that beats trial division is not a benchmark of Shor's algorithm — trial division is not how anyone factors large numbers today. The honest comparison, covered in Chapter 5, is against the General Number Field Sieve, the best known classical factoring algorithm, which runs in sub-exponential time roughly exp(O(n^(1/3)(log n)^(2/3))) for an n-bit modulus. Shor's polynomial-time result is impressive precisely because it beats the *best* classical competitor, not a strawman. Any benchmark that doesn't name its classical baseline, or that quietly picks a weak one, should be treated as unreliable until you check.

## Rule 2: be precise about what is being counted

"Grover's algorithm needs O(√N) steps" is true only if "step" means one oracle query. Chapter 4 derived the real iteration formula t* = ⌊(π/4)√N⌋ and the exact N=8 result (2 oracle calls reach 94.53% success). But each oracle call is itself a quantum circuit, potentially with many gates, and building that circuit for a real-world unstructured search problem is not free. A claim measured in oracle queries, a claim measured in total gate count, and a claim measured in wall-clock seconds on real hardware are three different numbers that can tell three different stories. State which one you mean, every time.

## Rule 3: account for the real hardware gap

Chapter 5 was explicit that Shor's algorithm is polynomial-time and mathematically sound, and still not a practical threat to RSA-2048 today, because the gap is in qubit count and error rate, not in the algorithm. A widely cited 2019 estimate (Gidney & Ekerå) put the resource requirement at roughly 20 million noisy physical qubits to factor a 2048-bit number in about 8 hours — current hardware is nowhere near that scale. An honest benchmark separates "this algorithm is asymptotically superior" from "this algorithm is deployable this year," and says which one it's claiming.

## Rule 4: asymptotic superiority is not the same as superiority at the sizes that matter

A quadratic speedup is real, but it has to overcome constant-factor overhead before it actually wins a race. Grover's algorithm needs quantum hardware, error correction, and a working oracle circuit before it beats a classical computer doing simple linear scan — at small N, the classical approach can simply be faster in practice even though it's asymptotically worse. "O(√N) beats O(N)" is a true statement about growth rates, not a guarantee that today's quantum hardware wins at today's problem sizes.

## Rule 5: state the assumptions and error model explicitly

Deutsch-Jozsa and Simon's algorithm (Chapter 6) both assume a *promise*: the function is guaranteed to be constant-or-balanced, or guaranteed to be exactly 2-to-1 with a hidden XOR structure. Real-world data essentially never comes with such a guarantee attached. A benchmark that doesn't mention the promise is leaving out the condition the entire speedup depends on. Likewise, every probability number computed in this course (Grover's 94.53%, phase estimation's exact-case 100%) assumes a noiseless, idealized circuit — real devices have decoherence and gate errors that degrade these numbers, and an honest benchmark says so.

## Applying the checklist to this course itself

Re-reading Chapters 1-6 with this checklist: Chapter 1 was careful to say BQP does not contain NP-complete problems in the believed sense, rather than claiming quantum computers solve "everything" fast. Chapter 4 showed the N=8 Grover table including the iterations where performance gets *worse*, not just the best case. Chapter 5 led with the RSA-2048 practicality gap rather than burying it. Chapter 6 flagged HHL's condition-number and state-preparation caveats rather than repeating the popular "exponential speedup for linear algebra" claim unchallenged. This lesson's checklist is simply naming what the course has been doing all along.

## Key terms

| Term | Meaning |
|---|---|
| Query complexity | The number of oracle calls an algorithm needs, independent of how expensive each call is to implement |
| Gate complexity | The total number of elementary quantum gates a circuit uses — can differ sharply from query complexity |
| Promise problem | A problem where the input is guaranteed to satisfy some structural property (e.g., "f is constant or balanced"), which real data may not satisfy |
| Asymptotic speedup | A growth-rate advantage (e.g., O(√N) vs O(N)) that holds for sufficiently large N, regardless of today's hardware constants |

## Check yourself

A news article claims "quantum computers will soon solve all optimization problems exponentially faster than classical computers, as proven by Grover's algorithm." Using the five-point checklist above, identify at least two specific errors in this claim.
