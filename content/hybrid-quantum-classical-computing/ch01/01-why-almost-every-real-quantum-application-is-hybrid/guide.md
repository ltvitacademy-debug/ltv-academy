# Why Almost Every Real Quantum Application Is Hybrid

There is no such thing as a quantum program that runs start-to-finish on a QPU alone. Every real quantum application you will ever ship is a classical program that calls out to quantum hardware for a few specific operations and does everything else — control flow, data prep, optimization, I/O — on ordinary CPUs.

## What you'll learn

- Why QPUs are coprocessors, not general-purpose computers, and what that means for your architecture
- The three things a QPU is actually good at today, and the much longer list of things it is not
- What "hybrid" means precisely in this course: a classical control loop driving quantum circuit execution
- How to read a hybrid system diagram and identify which half of it is doing the real engineering work
- Why this distinction changes how you budget engineering time, cost, and latency

## What this looks like in a real console

![Amazon Braket Service Dashboard](/courses/hybrid-quantum-classical-computing/ch01/01-why-almost-every-real-quantum-application-is-hybrid/aws-dashboard.webp)
*Notebooks, hybrid jobs, announcements — most of a real quantum cloud console is classical tooling wrapped around a thin quantum slice.*

![Amazon Braket Devices list](/courses/hybrid-quantum-classical-computing/ch01/01-why-almost-every-real-quantum-application-is-hybrid/aws-devices-list.webp)
*The QPUs themselves show up as a short list of remote devices — IonQ, IQM, QuEra, Rigetti — that you call into.*

![A real two-qubit Bell-state circuit from IBM Quantum](/courses/hybrid-quantum-classical-computing/ch01/01-why-almost-every-real-quantum-application-is-hybrid/ibm-bell-circuit.svg)
*The entire scope of what a QPU executes: a fixed gate sequence, run some number of shots, measured once.*

## A QPU cannot load data, branch on a condition, or print a result

A classical CPU can read a file, run an `if` statement based on what it reads, and write a result to disk. A QPU, as exposed by every current cloud quantum provider (IBM Quantum, AWS Braket, Azure Quantum), can do none of that on its own. It accepts a fixed circuit — a sequence of gates — executes it some number of times ("shots"), and returns measurement counts. It cannot inspect those counts and decide to run a different circuit; a classical program has to make that decision and submit the next circuit itself.

This is not a temporary limitation waiting on better hardware — it is the architecture. A QPU's job is to prepare a quantum state, evolve it under a sequence of gates, and measure it. Everything upstream (deciding what circuit to run) and downstream (deciding what the measurement meant) is classical computation, full stop.

## The three things quantum hardware is actually good at, today

1. **Preparing and evolving superposition/entangled states** that would take exponential classical memory to simulate exactly, for a narrow set of problems (quantum chemistry ground-state estimation, certain combinatorial optimization formulations, specific sampling tasks).
2. **Evaluating a cost function encoded in a quantum observable** — e.g., the expectation value of a Hamiltonian — faster or more accurately than a classical simulator can for large enough systems.
3. **Generating samples from distributions** that are classically hard to sample from directly (used in some generative and optimization approaches).

Everything else — reading training data, encoding it into a circuit, deciding the next set of gate parameters, aggregating results across shots, handling a provider outage, tracking spend — is ordinary software engineering on a classical machine. In a typical hybrid application, **over 95% of the code you write never touches a QPU.**

## The architecture diagram you will draw constantly

```
┌─────────────────────────┐        submit circuit         ┌───────────────────┐
│   Classical control      │ ─────────────────────────────▶│  Quantum cloud API │
│   loop (your service)    │                                │  (IBM/AWS/Azure)   │
│                           │        measurement counts     │                    │
│  - data prep              │◀───────────────────────────── │  QPU / simulator   │
│  - optimizer step          │                                └───────────────────┘
│  - convergence check       │
│  - cost/latency tracking   │
└─────────────────────────┘
        │
        ▼
   result / decision
   (classical output)
```

The box on the left is where a hybrid-quantum-classical engineer spends almost all their time. The box on the right is a black box you call over a network connection — you don't control its internals, only how you drive it: what circuits you submit, how often, with how many shots, and how you react to what comes back.

## Why this framing changes how you plan a project

If you treat the QPU as "the computer" and the classical code as "glue," you will under-invest in the part of the system that actually determines whether the application works, costs a reasonable amount, and finishes in a reasonable time. If instead you treat the classical control loop as the application — with the QPU as one expensive, slow, occasionally-unreliable remote dependency it calls — your engineering priorities fall into the right order: correctness of the classical orchestration first, cost and latency budgeting second, and quantum circuit design as one (important, but bounded) component within that system.

This course is built entirely around that second framing. Chapters 2–5 are about the classical half of hybrid systems: pre/post-processing, orchestration, cost/latency management, and a capstone project — because that classical half is where almost all of the production engineering risk lives.

## Key terms

| Term | Meaning |
|---|---|
| QPU | Quantum Processing Unit — the quantum hardware a cloud provider exposes as a remote, gate-based or annealing device |
| Coprocessor | A specialized processor that a host program calls for specific operations it cannot or should not do itself (the QPU's role here) |
| Shot | One full execution of a circuit followed by one measurement; results are aggregated across many shots |
| Hybrid quantum-classical application | A classical program whose control flow drives quantum circuit submission and consumes the measurement results it gets back |
| Classical control loop | The classical code responsible for deciding what circuit to run next, based on prior results |

## Check yourself

A colleague proposes an architecture where "the quantum part decides when the job is done, and only hands control back to the classical code at the very end." Explain, using what a QPU can and cannot do, why that architecture is not possible to build on current quantum cloud hardware — and what has to live in the classical layer instead.
