# Capstone Kickoff: Choose a Real Optimization Problem

This chapter is your capstone: pick a real combinatorial optimization problem, formulate it as a QUBO, build a hybrid quantum-classical workflow around it, benchmark it fairly against a classical baseline, and document the result honestly. This lesson walks through a fully worked model problem — workload balancing, framed as the classic Number Partitioning problem — that you'll use as your template for choosing and scoping your own.

## What you'll learn

- The criteria for picking a capstone problem that's genuinely QUBO-shaped and small enough to benchmark
- A fully worked model problem: balancing work hours across two people, solved and verified
- How Number Partitioning connects to the QUBO/Ising machinery from every earlier chapter
- A scoping checklist to apply to whatever problem you choose
- What "done" looks like for this chapter's four-lesson arc

## Picking a problem: the criteria

A good capstone problem needs three properties: (1) it's naturally expressible as binary decision variables with a quadratic (or linear) cost — if you find yourself needing cubic or higher terms, you likely need to reformulate or add auxiliary variables; (2) it's small enough (roughly 4-10 binary variables) that you can brute-force verify the true optimum yourself, exactly as every lesson in this course has done, rather than trusting an unverified claim; (3) it has a real-world interpretation you can explain in one or two sentences to someone outside this course — "which assets to hold," "which edges to cut," "how to split work evenly" are all one-sentence problems. If your instinct is toward something bigger or more exotic, scope it down first — a small, fully-verified result is more valuable here than a large, unverified one.

## The model problem: Number Partitioning

Here's a fully worked example to use as your template. **Problem**: four tasks need to be split between two workers, and you want each worker's total hours as close to equal as possible. The tasks take **d = [3, 5, 2, 4] hours**. This is a direct instance of the classic **Number Partitioning problem** — split a set of numbers into two groups with sums as close as possible — which is itself a well-known special case of the QUBO family (it reduces to a QUBO with purely quadratic structure, no linear terms needed beyond what the squaring introduces).

**Objective**: for binary assignment x = (x_1,x_2,x_3,x_4), where x_i = 1 means "task i goes to worker B" (and 0 means worker A), minimize the squared imbalance:

**F(x) = (Σ_{i: x_i=0} d_i − Σ_{i: x_i=1} d_i)²**

Checking all 16 possible assignments directly (brute force, since n=4 is small enough), here are a few representative results (computed directly, term by term):

| x = (x1,x2,x3,x4) | Worker A hours | Worker B hours | F(x) = imbalance² |
|---|---|---|---|
| (0,0,0,0) | 14 | 0 | 196 |
| (1,1,0,0) | 6 | 8 | 4 |
| (0,1,1,0) | 7 | 7 | **0** |
| (1,0,0,1) | 7 | 7 | **0** |

For x=(0,1,1,0), worker B gets tasks 2 and 3 (durations 5+2=7), worker A gets tasks 1 and 4 (3+4=7) — perfectly balanced, F=0. For x=(1,0,0,1), worker B gets tasks 1 and 4 (3+4=7), worker A gets tasks 2 and 3 (5+2=7) — the mirror solution, also F=0. These are the **two true optimal assignments** (confirmed by checking all 16 combinations directly), each splitting the total 14 hours into 7-and-7 exactly — while x=(0,0,0,0) (dumping everything on worker A) and even the partially-balanced x=(1,1,0,0) (a 6-8 split) both fall well short.

## Why this connects to everything else in the course

Number Partitioning's objective, expanded algebraically, is a pure QUBO in x — the squared-difference structure produces exactly the quadratic x_i x_j interaction terms from Lesson 2, and it converts cleanly into Ising form (Lesson 3) and a Pauli-Z cost Hamiltonian (Lesson 7) using the exact same machinery you've used on every other problem in this course. It's also a legitimately hard problem in general: for large random sets of numbers, Number Partitioning is NP-hard, and it shows up in real scheduling, load-balancing, and even cryptographic contexts — this isn't a toy invented for teaching, it's a genuine, widely studied combinatorial problem that happens to scale down nicely for a verifiable capstone.

## Scoping checklist for your own problem

Before moving to Lesson 25, confirm: you can state your problem's decision variables, objective, and any constraints in writing; you can brute-force verify the true optimum (or near-optimum, for anything above about 20 variables) independently of any algorithm you plan to test; and you have a specific classical baseline method in mind (greedy, LPT-style heuristic, or simulated annealing) to compare against, matching Lesson 20's playbook. If you can't yet state all three clearly, that's a sign to keep scoping down rather than move forward.

## Key terms

| Term | Meaning |
|---|---|
| Number Partitioning | The classic problem of splitting a set of numbers into groups with sums as close as possible; a well-studied special case of QUBO |
| Scoping checklist | The three-part readiness check (stated objective, verifiable optimum, chosen baseline) before starting the capstone build |
| Auxiliary variable | An extra binary variable sometimes added to reduce a higher-than-quadratic term down to QUBO's required quadratic form |
| Mirror solution | Two distinct assignments (like (0,1,1,0) and (1,0,0,1)) that achieve identical objective values by symmetry |

## Check yourself

Using d = [3, 5, 2, 4] from this lesson's worked example, suppose a fifth task of duration 6 hours is added (d = [3, 5, 2, 4, 6], total = 20). Can the tasks still be split into two perfectly equal groups of 10 hours each? Find such a split if one exists, or explain why none does, and relate your answer to why Number Partitioning's difficulty depends on the specific numbers involved, not just how many there are.
