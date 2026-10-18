# Architecture Patterns Problem-Solving Lab

You've learned the hybrid loop pattern and the coprocessor-vs-whole-program distinction. This lab is where you apply both to three realistic problem statements, the way they'd actually arrive in a backlog ticket — underspecified and a little ambiguous.

## What you'll learn

- How to extract the architecturally-relevant facts from a vague problem statement
- How to decide, with evidence, whether a problem is Pattern A (coprocessor) or Pattern B (whole program)
- How to sketch the classical/quantum boundary for a Pattern A problem before writing any code
- How to estimate a rough QPU-call budget for a proposed architecture, the way Lesson 2 did
- How to flag a problem statement that is not buildable on current hardware, with a specific reason

## The method: four questions for any new quantum project ticket

1. **Is there an iterative feedback loop between a classical optimizer and a quantum circuit, or is the answer meant to come from one circuit execution?** (Pattern A vs. B)
2. **What is the QPU being asked to do, specifically?** (evaluate a cost function, sample a distribution, something else) — if you can't name one of the three things from Lesson 1, the ticket is underspecified or not actually a quantum problem.
3. **How many circuit evaluations would the proposed approach need**, at a rough parameter/iteration count? (Lesson 2's arithmetic)
4. **Does the required scale (qubits, circuit depth, error rate) exist on hardware available today?** If not, say so explicitly rather than quietly scoping around it.

## Ticket 1: "Classify loan applications as high/low risk using a quantum model"

Working through the four questions: a quantum classifier here would be a **variational quantum classifier** — parameters trained via a classical optimizer evaluating a cost function (classification loss) by executing the circuit on each data point, exactly the loop from Lesson 2. That's **Pattern A**. The QPU's job is "evaluate a cost function" (Lesson 1, item 2). For a modest 6-parameter circuit trained over 50 iterations on a batch of 200 samples per iteration: `50 iterations x 200 samples x (6 params x 2 + 1 evals) = 50 x 200 x 13 = 130,000` circuit evaluations — immediately a red flag for cost, which is why in practice you'd batch samples, subsample, or train on a classical simulator and only validate a final small batch on hardware. Required scale (a handful of qubits) is available today. **Verdict: buildable as Pattern A, but the naive per-sample training loop needs a redesign before it's affordable — flag this back to the proposer with the 130,000-evaluation number attached.**

## Ticket 2: "Search an unsorted database of 10 million records for a match, using Grover's algorithm, in production next quarter"

Four questions: no classical optimizer loop is implied — this is a single search algorithm, one circuit, one measurement. That's **Pattern B**. Required scale: Grover's algorithm needs roughly `log2(10,000,000) ≈ 24` qubits encoding the search space plus substantial additional qubits and circuit depth for the oracle and diffusion operators repeated `~sqrt(10,000,000) ≈ 3,162` times with low enough error that the signal survives that many repetitions — this exceeds what current NISQ (noisy intermediate-scale quantum) hardware can execute reliably. **Verdict: not buildable on current hardware in the proposed timeframe; the correct response is to say so explicitly, citing the qubit count and circuit-depth requirement, not to quietly attempt a scaled-down demo and call it done.**

## Ticket 3: "Estimate the ground-state energy of a 12-atom molecule for a drug discovery pipeline"

Four questions: ground-state energy estimation via VQE is the textbook Pattern A case — a classical optimizer drives an ansatz circuit, evaluating the Hamiltonian expectation value each iteration (QPU job: "evaluate a cost function"). For a 12-atom molecule, a reasonable ansatz might need on the order of 20-40 qubits and a parameter count in the dozens, depending on the ansatz chosen — large enough that development absolutely happens on a classical simulator first (per Lesson 2's cost argument), with real hardware reserved for final validation runs at reduced iteration count. **Verdict: buildable as Pattern A, with an explicit two-phase plan (simulator development, then a budgeted number of hardware-confirmation runs) rather than one undifferentiated "run it on the QPU" plan.**

## What separates a strong answer from a weak one here

A weak answer jumps straight to "yes, quantum can do that" or "no, quantum can't do that." A strong answer walks through the four questions, names which pattern applies and why, gives a rough evaluation-count estimate using Lesson 2's arithmetic, and — critically — is willing to say "not buildable at this scale on current hardware" when that's the honest answer, the way Ticket 2 required. That honesty is a core engineering skill in this field right now, where hype outpaces hardware capability by a wide margin.

## Key terms

| Term | Meaning |
|---|---|
| Four-question method | The lesson's structured approach: loop or one-shot? what's the QPU's job? how many evaluations? does the scale exist today? |
| NISQ | Noisy Intermediate-Scale Quantum — the current hardware era, with enough qubits for pilot projects but without full error correction |
| Variational quantum classifier | A Pattern A architecture using a trainable circuit as a classifier, with a classical optimizer minimizing a classification loss |
| Ansatz | The parameterized circuit template used in VQE/QAOA whose parameters the classical optimizer tunes |
| Scoping honesty | Explicitly stating when a proposed problem exceeds current hardware capability, rather than silently descoping to a toy demo |

## Check yourself

A new ticket reads: "Use quantum computing to speed up our nightly SQL batch ETL job." Apply the four-question method to this ticket and explain what your answer to the team would be.
