# Capstone: the Quantum Algorithms Laboratory Project

This closes the course. The capstone asks you to do, once, end to end and on an algorithm of your choosing, everything this course has modeled lesson by lesson: derive it, verify it, and benchmark it honestly.

## What you'll learn

- The full capstone project brief and its four required deliverables
- A concrete grading rubric you can self-check against before submitting
- Why "verify before you claim" and "benchmark before you oversell" are the two skills this entire course has actually been teaching
- How to reuse the course's own Node.js matrix-simulation approach as a legitimate, lightweight verification method

## The project brief

Pick exactly one algorithm covered in this course: the Quantum Fourier Transform, Quantum Phase Estimation, Grover's Algorithm, Shor's Algorithm, the Deutsch-Jozsa Algorithm, or Simon's Algorithm. Produce four deliverables:

**1. A from-scratch derivation.** Write out the algorithm's core mathematics in your own words — not copied from this course's lessons, but re-derived, the way Chapter 2 derived the QFT matrix element formula or Chapter 4 derived the diffusion operator's reflect-about-the-mean action. Show the key steps, not just the final formula.

**2. A small-scale simulation you actually run.** Implement the algorithm (or its core mathematical operation) at a small, concrete size — 2 or 3 qubits is plenty — in any language you're comfortable with. Plain matrix code in JavaScript, Python with NumPy, or a framework like Qiskit are all legitimate choices. This course used nothing but plain Node.js matrix arithmetic throughout (the Grover amplitude tables in Chapter 4, the QFT matrix in Chapter 2, the phase-estimation probability formula in Chapter 3, and the modular-exponentiation sequences in Chapter 5 were all computed this way) — that approach is a fully legitimate model to follow, not a workaround.

**3. At least one independently verified numeric claim.** Pick one specific number your derivation implies (an amplitude, a probability, a period, an iteration count) and confirm it by actually running your simulation, the way every chapter of this course computed its numbers before writing them down rather than stating a plausible-looking guess. State clearly what you verified and what the result was.

**4. An honest benchmarking section.** Using Lesson 31's checklist and Lesson 33's six-section template, compare your chosen algorithm fairly to the best known classical alternative for the same problem: name the real classical baseline, state what's being counted (queries, gates, or wall-clock time), note the hardware/practicality gap if relevant, and end with a hedge-appropriate bottom-line verdict — not an oversold headline.

## Grading rubric

| Criterion | What it checks |
|---|---|
| Derivation correctness | Does the math follow logically and match the established result for the chosen algorithm? |
| Simulation correctness | Does the code actually run, and does its output match the derivation's predictions? |
| Verification rigor | Is the claimed numeric result something that was actually computed and shown, not just asserted? |
| Benchmarking honesty | Does the comparison name a real classical baseline, state its metric precisely, and avoid overselling the verdict? |
| Clarity | Could another student follow the write-up from problem statement to verdict without filling in gaps themselves? |

## The course's throughline, stated plainly

Every chapter in this course made a speedup claim and then immediately qualified it: BQP does not contain NP-complete problems in the believed sense (Chapter 1); the QFT's exponential gate-count advantage doesn't give you a free classical-style readout (Chapter 2); phase estimation is exactly correct only when the phase lands on the precision grid, and probabilistic otherwise (Chapter 3); Grover's algorithm gets *worse* past its optimal iteration count, not better (Chapter 4); Shor's algorithm is mathematically sound but practically blocked by hardware, not math (Chapter 5); Simon's algorithm's exponential separation depends on a promise real data doesn't guarantee (Chapter 6). None of these qualifications make the results less real — they make the claims correct. The skill this course has actually been teaching is not "know these six algorithms." It is: compute the real number before you state it, and say precisely what is and isn't true about the result once you have it. That skill transfers to every future claim about quantum advantage you'll encounter, including the ones made after this course ends.

## Key terms

| Term | Meaning |
|---|---|
| Capstone deliverable | One of the four required components: derivation, simulation, verified claim, honest benchmark |
| Self-derived | Worked out independently in your own words/steps, rather than copied from course material |
| Verified claim | A specific number confirmed by actually running a computation, not stated from memory or plausibility |

## Check yourself

Choose one algorithm from this course that you have not yet simulated yourself. Name the specific numeric claim about it you would verify first, and explain in one or two sentences how you would compute it (what matrix, operator, or sequence you would actually run).
