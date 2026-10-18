# Why Quantum Code Needs the Same Discipline as Any Production Code

A circuit that runs in a notebook and "looks right" is not the same thing as software you can hand to a teammate, rerun six months later, or trust on real hardware. This course treats quantum programs as production code first, physics second.

## What you'll learn

- Why "it ran once in a notebook" is not evidence a quantum program is correct
- The three failure modes unique to quantum code: probabilistic output, hardware noise, and SDK churn
- How classical software-engineering practices map onto a quantum codebase, and where the mapping breaks
- What "done" means for a quantum function: tested, documented, pinned, and reproducible
- The shape of the rest of this course, chapter by chapter

## The notebook trap

Quantum development tutorials almost universally follow the same pattern: build a circuit, call `.run()`, print counts, done. That workflow is fine for learning a gate or an algorithm. It is a bad habit for anything you intend to keep. A cell that printed `{'00': 512, '11': 488}` once, three weeks ago, proves nothing about whether the circuit is still correct after you refactored the oracle, upgraded Qiskit, or changed which backend it targets. Without a test suite, a pinned environment, and version control, that notebook result is an anecdote, not evidence.

Treat a quantum function the same way you'd treat a function that calls a flaky third-party API: you don't trust a single manual run, you write tests that account for variability and you re-run them on every change.

## Three things that make quantum code different

Classical software engineering practices — testing, code review, CI, dependency pinning — all still apply to quantum code. But three properties of quantum programs mean you can't apply them unmodified:

1. **Measurement is inherently probabilistic.** Running the same circuit twice on an ideal simulator with different random seeds gives different raw counts, even when the circuit is correct. A test that does `assert counts == {'00': 500, '11': 500}` will fail most of the time even on perfect code. Chapter 2 builds the statistical-testing approach this requires.
2. **Real hardware is noisy, and the noise profile changes.** A circuit that passes cleanly on a simulator can give visibly skewed results on real IBM or IonQ hardware because of gate errors, decoherence, and readout error — and that noise profile drifts between calibration cycles. Your tests and your resource estimates both need to account for "what does success look like under noise," not just "what does the ideal math say."
3. **The SDK ecosystem is unusually unstable.** Qiskit alone has gone through multiple breaking major-version transitions (the 0.x → 1.0 transition removed and renamed core APIs); Cirq, PennyLane, and Q# all ship frequent breaking changes too. Code that isn't pinned to specific SDK versions can silently stop working, or worse, silently start producing different numerical results, when a dependency updates.

## Mapping classical practices onto quantum code

| Classical practice | Quantum adaptation |
|---|---|
| Unit tests with exact assertions | Unit tests for circuit *construction* (gate counts, qubit counts, parameter wiring) stay exact; tests of *measurement results* become statistical tests (Chapter 2) |
| Pin dependency versions | Pin the SDK version **and** record the backend/simulator version, since numerical behavior can depend on both (Chapter 4) |
| Code review and clean architecture | Same patterns apply, plus a specific pattern — separating circuit logic from the backend it runs on — that doesn't exist in most classical codebases (Chapter 3) |
| Performance profiling | Profiling a hybrid program means separately profiling the classical control loop and the quantum execution time, which are usually dominated by completely different costs (Chapter 5) |
| "Will this fit in memory/time budget?" | Resource estimation for a quantum circuit means asking whether it fits in qubit count, circuit depth, and shot budget *before* you submit it to hardware or a cloud queue (Chapter 5) |

## What "done" looks like for a quantum function

By the end of this course, "done" for a piece of quantum code means all of the following are true, not just "it printed a plausible histogram once":

- It has unit tests covering circuit construction (gate sequence, qubit count, parameter binding) that don't depend on measurement randomness at all.
- It has statistical tests covering measurement outcomes, with an explicit, justified tolerance — not an exact-match assertion.
- Its backend is injected, not hardcoded, so the same circuit logic can run against a simulator in CI and real hardware in production.
- Its dependencies (SDK version, backend version) are pinned and recorded alongside any numeric result you report.
- Its random seed and shot count are recorded for any result you intend to reproduce or cite.

## Key terms

| Term | Meaning |
|---|---|
| Shots | The number of times a circuit is executed to collect a sample of measurement outcomes; more shots reduce statistical noise in the result |
| Backend | The simulator or real quantum processor a circuit is executed against |
| Noise profile | The pattern and magnitude of hardware errors (gate error, decoherence, readout error) affecting results on a specific real device at a specific time |
| Breaking change | An SDK update that removes or changes an API in a way that makes existing code stop working or change behavior |
| Statistical test | A test that checks whether measurement counts are consistent with an expected distribution, within a calculated tolerance, rather than demanding an exact match |

## Check yourself

A colleague says their Grover's-search notebook "works" because it printed the right answer with highest probability once this morning. List two specific reasons that single run is not sufficient evidence the code is correct and will keep working.
