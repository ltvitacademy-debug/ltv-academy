# Quantum as a Coprocessor vs. Quantum as the Whole Program

Two architectures get called "quantum applications," and conflating them leads teams to budget, staff, and schedule projects completely wrong. Knowing which one you're building — before you write a line of code — determines almost everything downstream.

## What you'll learn

- The structural difference between "quantum as coprocessor" and "quantum as the whole program"
- Why nearly all production quantum applications today are the coprocessor pattern
- How to classify a given problem statement into one pattern or the other
- What changes in your engineering plan (team skills, cost model, testing strategy) between the two
- A worked comparison of both patterns applied to the same business problem

## Pattern A: quantum as a coprocessor

This is the pattern from Lessons 1 and 2. A classical application owns the control flow, data, and business logic end to end. It calls out to a QPU for one bounded sub-task — evaluating a cost function, sampling from a distribution, estimating a quantity that's hard to compute classically — gets a number or a set of samples back, and continues. The QPU is architecturally identical to a GPU in a classical ML pipeline: a specialized accelerator invoked for specific calls, never the thing that "runs the program."

Examples: a portfolio-risk service that calls a QAOA solver for the combinatorial sub-problem inside a larger risk pipeline; a drug-discovery pipeline that calls VQE to estimate a molecule's ground-state energy as one feature among many fed into a classical scoring model; a logistics optimizer that uses quantum annealing for the routing sub-problem inside a system that also handles inventory, pricing, and scheduling classically.

## Pattern B: quantum as the whole program

Here, a complete algorithm — input to output — is expressed as a single circuit (or a short, fixed sequence of circuits with no iterative feedback from a classical optimizer). Grover's search and Shor's factoring algorithm, run as textbook algorithms with no variational loop, are the classic examples: you build the circuit once, run it, and the measurement result is the answer. There's still classical code (encoding the input, decoding the output), but there's no iterative classical-quantum feedback loop — it's closer to "call a function once" than "drive a loop."

This pattern is rare in production today because the problems where it applies at useful scale (true Grover-speedup search over huge unstructured spaces, Shor's-algorithm-scale factoring) require far more qubits and far lower error rates than current hardware provides. Pattern B shows up constantly in textbooks and papers; Pattern A is what you will build in a job.

## Why the distinction matters for how you plan the work

| Dimension | Pattern A (coprocessor) | Pattern B (whole program) |
|---|---|---|
| Where most engineering effort goes | Classical orchestration, optimizer tuning, cost/latency management | Circuit design and correctness |
| Team skill mix | Mostly software engineers; 1-2 quantum specialists for circuit design | Mostly quantum algorithm specialists |
| Cost model | Many small circuit evaluations across an iterative loop (Lesson 2's math) | A handful of large, one-shot circuit executions |
| Testing strategy | Classical simulator for the loop logic; small hardware runs for calibration | Simulator feasible only for small qubit counts; real hardware needed to validate at scale |
| Production readiness today | Deployed in finance, chemistry, logistics pilots now | Mostly research-stage; rarely production |

## Worked example: the same business problem, two architectures

**Problem**: "Find the best allocation of 20 delivery trucks to routes to minimize total distance."

- **Pattern A approach**: Formulate the routing problem as a QUBO (quadratic unconstrained binary optimization), feed it to a QAOA loop running on a QPU as the cost-function evaluator, with a classical optimizer (as in Lesson 2) driving parameter updates, while all route-feasibility constraints, data ingestion, and the final decision logic stay classical. This is buildable today, at the cost of the variational loop's iteration-count economics from Lesson 2.
- **Pattern B approach**: Attempt to encode the entire combinatorial search as a single quantum search algorithm whose one measurement yields the optimal route directly. This requires a scale of fault-tolerant qubits that does not exist yet for a 20-truck problem of realistic size — it is not a buildable option today, regardless of engineering skill.

The business problem didn't determine the architecture — the state of the hardware did. Recognizing that Pattern A is the only buildable option for the vast majority of near-term problems is the single most consequential architectural judgment call you'll make at the start of a hybrid project.

## Key terms

| Term | Meaning |
|---|---|
| Quantum as a coprocessor (Pattern A) | QPU invoked for a bounded sub-task inside a classical-controlled application; the dominant production pattern today |
| Quantum as the whole program (Pattern B) | A complete algorithm expressed as one circuit (or a short fixed sequence) with no iterative classical feedback loop |
| QUBO | Quadratic Unconstrained Binary Optimization — a standard formulation for mapping combinatorial problems onto quantum annealers or QAOA |
| Fault-tolerant qubits | Qubits with error-correction overhead low enough to run long, large circuits reliably; required at scale for most Pattern B algorithms, not yet broadly available |
| Architectural judgment call | The decision, made before implementation starts, about which pattern a given problem and hardware generation can actually support |

## Check yourself

A manager asks you to scope a project that factors 2048-bit RSA keys using Shor's algorithm "as the whole quantum program, no classical loop needed, since it's a textbook algorithm." Using this lesson's distinction between Pattern A and Pattern B, explain what's wrong with scoping this as a near-term buildable project, and what you'd tell the manager instead.
