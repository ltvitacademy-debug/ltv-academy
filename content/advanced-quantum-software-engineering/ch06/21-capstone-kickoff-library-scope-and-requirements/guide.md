# Capstone Kickoff: Library Scope & Requirements

This chapter builds one real deliverable across four lessons: a small, genuinely production-quality quantum software library, applying every practice from Chapters 1–5. This lesson scopes it and writes the requirements before any code gets written.

## What you'll learn

- How to scope a capstone library so it's achievable in a few lessons but still demonstrates every chapter's practices
- Writing a requirements document that references back to specific earlier lessons as acceptance criteria
- Choosing which algorithms to include based on what best exercises construction tests, statistical tests, and the backend-abstraction pattern
- Setting up the project skeleton (Lesson 2's structure) before any algorithm code exists
- What "done" means for this capstone, stated concretely before you start

## Choosing the scope

The capstone library, `quantumlib`, implements three well-understood, well-studied algorithms — deliberately not novel research, since the point of this capstone is demonstrating software-engineering discipline, not algorithmic originality:

1. **Bell pair / GHZ state preparation** — simplest possible entanglement circuits, good for exercising construction tests and the statevector-check debugging technique (Lesson 8) with minimal circuit complexity.
2. **Grover's search** (small, 3–4 qubit instances) — exercises statistical testing (Lesson 7) meaningfully, since its success probability is a real number worth testing precisely, and exercises resource estimation (Lesson 19) via its iteration-count formula.
3. **A small QAOA instance** — exercises the backend-abstraction pattern (Lesson 11) and the profiling/shot-budget estimation work (Lessons 18–19), since it's the one algorithm in this set that's genuinely iterative and hybrid.

This set is deliberately small — three algorithms, not ten — because the goal is depth of engineering practice per algorithm, not breadth of algorithm coverage.

## Writing requirements that cite earlier lessons as acceptance criteria

A requirements document for this capstone should state, for each algorithm, concrete acceptance criteria tied directly to specific chapter content, not vague goals like "well-tested":

```markdown
# quantumlib Requirements

## Bell pair / GHZ module
- Circuit construction separated from execution (Lesson 10)
- Construction tests covering gate sequence and qubit count, parametrized
  across n_qubits=2..6 (Lesson 6)
- A statevector test confirming exact |00...0> + |11...1> structure (Lesson 8)
- A statistical test with an explicit, documented confidence level (Lesson 7)

## Grover's search module
- Resource-estimation function computing iteration count via (pi/4)*sqrt(N),
  documented and unit-tested against known values (Lesson 19)
- Statistical test confirming the marked item is found with probability
  consistent with theory, at a stated confidence level (Lesson 7)

## QAOA module
- Backend injected via the shared QuantumBackend interface, never hardcoded (Lesson 11)
- Shot-budget estimation function for a full training run, unit-tested
  against the parameter-shift-rule formula (Lesson 19)
- Experiment record (git tag, lockfile, seeds) for any reported result (Lessons 14-16)
```

Each line is checkable — a reviewer can look at the code and confirm it either does or doesn't satisfy that specific, lesson-referenced requirement, rather than arguing about what "well-tested" means in the abstract.

## The project skeleton, before any algorithm code

Apply Lesson 2's structure immediately, before writing a single circuit:

```
quantumlib/
├── pyproject.toml          # pinned deps (Lesson 3), test extras
├── README.md               # scope, SDK versions targeted (Lesson 4)
├── src/quantumlib/
│   ├── circuits/            # bell_ghz.py, grover.py, qaoa.py
│   ├── backends/             # base.py (Lesson 11's interface), simulator.py
│   ├── analysis/              # statistics.py (Lesson 7's helpers)
│   └── estimation/            # resource.py (Lesson 19's formulas)
└── tests/
    ├── test_bell_ghz.py
    ├── test_grover.py
    ├── test_qaoa.py
    └── test_estimation.py
```

Lesson 22 fills in `circuits/`, `backends/`, and the matching tests. Lesson 23 fills in documentation. Lesson 24 is the final review.

## What "done" means for this capstone

Explicitly, before starting: done means every requirement in the document above is satisfied and verifiably checkable, the full test suite passes (construction + statevector + statistical, tiered per Lesson 9), dependencies are pinned with a committed lockfile (Lesson 15), and the README documents validated backends per Lesson 4's standard. It does not mean "the algorithms produce correct answers once in a demo" — that bar was explicitly rejected back in Lesson 1.

## Key terms

| Term | Meaning |
|---|---|
| Scope (capstone) | The deliberately limited set of algorithms/features chosen for the capstone, prioritizing depth of engineering practice over breadth |
| Lesson-referenced acceptance criteria | A requirement written so it cites the specific earlier lesson defining what "correct" looks like, making it checkable rather than vague |
| Project skeleton | The directory structure (Lesson 2) set up before any algorithm-specific code is written |

## Check yourself

The requirements document above doesn't mention documentation standards (Lesson 4) as an explicit acceptance criterion for any module. Is this an oversight, or is it reasonably deferred to Lesson 23? Justify your answer using this lesson's own stated chapter plan.
