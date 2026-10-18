# Project Kickoff: Choosing a Real Dataset

Chapter 6 is this course's capstone project: build, train, and honestly benchmark a small quantum classifier end to end. Every choice you make in this first lesson — dataset, feature count, label balance — determines whether the rest of the project is even feasible on the techniques this course actually covers.

## What you'll learn

- Concrete criteria for choosing a dataset that fits within this course's qubit and barren-plateau constraints
- Why a classic, small, well-understood benchmark dataset is the right choice for this project, not a liability
- How to check a candidate dataset's feature count against a realistic angle-encoding qubit budget
- What "real dataset" means here, and why it matters for the benchmarking in Lesson 25

## Criteria for this project's dataset

Given everything from Chapters 2-5 — barren plateaus getting worse with qubit count (Lesson 8), parameter-shift cost scaling with parameter count (Lesson 7), and classical simulation cost scaling as 2ⁿ (Lesson 21) — a dataset for this hands-on project needs to satisfy:

1. **Few features** (roughly 2-4), so angle encoding (Lesson 10) needs only 2-4 qubits — comfortably simulable and far from any barren-plateau-risk regime.
2. **Binary or small number of classes**, matching the single-qubit ⟨Z⟩-measurement classifier structure from Lesson 12.
3. **Real, publicly available, and well-documented** — not synthetic data invented for this course, so a classical baseline comparison (Lesson 25) is comparing against something meaningful.
4. **Already known to be at least partially separable** by simple classical methods — this project is about learning the QML pipeline correctly, not about finding a maximally hard research dataset.

## Why a classic benchmark dataset is the right choice, not a cop-out

It might feel like reaching for a famous, decades-old dataset (rather than something novel) undersells the project. The opposite is true here: using a well-characterized dataset means the classical baseline in Lesson 25 is comparing against results the field already understands well, which is exactly the "fair, well-documented comparison" standard from Lesson 4. The scikit-learn **Iris** dataset (4 features: sepal length/width, petal length/width; 3 classes, commonly reduced to a 2-class subproblem like Setosa vs. non-Setosa) or the **Wine** dataset (13 features, typically reduced to a 2-4 feature subset for this kind of small-circuit project) are standard choices in the QML tutorial literature for exactly this reason — PennyLane's and Qiskit ML's own official tutorials use these same datasets for their introductory classifier examples, which is itself useful: it means your results can be sanity-checked against publicly documented tutorial outputs.

## Checking the qubit budget

**Worked check**: Iris, reduced to 2 features (e.g., just petal length and petal width) and 2 classes (Setosa vs. not-Setosa): under angle encoding, this needs exactly **2 qubits** — one rotation per feature, well within any simulator's easy range and far from barren-plateau territory (which, per Lesson 8, only bites meaningfully at many more qubits than this). This is the project's actual working dataset for this chapter: Iris, 2 features (petal length, petal width), 2-class (Setosa vs. not-Setosa) reduction.

## What "real dataset" means here, concretely

"Real" means: collected from actual physical measurements (Iris's measurements are real flowers measured by Edgar Anderson in 1935, a genuinely real-world botanical dataset, not a synthetic toy generator), publicly documented with known characteristics, and used elsewhere in the field so results are comparable — not invented numbers chosen to make a quantum circuit look good. This matters directly for Lesson 25's benchmark: a fabricated dataset tuned to flatter one method or the other would make any comparison meaningless, exactly the "cherry-picked" overclaiming pattern flagged back in Lesson 4.

## Key terms

| Term | Meaning |
|---|---|
| Feature reduction | Selecting a small subset of a dataset's original features to fit a small-qubit-budget project |
| Qubit budget | The maximum number of qubits a project can comfortably use given simulation cost and barren-plateau risk |
| Benchmark dataset | A well-documented, publicly used dataset chosen so results are comparable to existing published work |

## Check yourself

Why would choosing a brand-new, never-before-studied dataset actually make it harder, not easier, to satisfy Lesson 25's "fair comparison" standard for this specific project?
