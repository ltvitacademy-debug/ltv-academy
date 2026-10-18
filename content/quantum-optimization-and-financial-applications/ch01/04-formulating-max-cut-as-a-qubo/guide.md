# Formulating Max-Cut as a QUBO

Max-Cut is the "hello world" of quantum optimization — nearly every QAOA paper and tutorial benchmarks against it first. Here you'll derive its QUBO formulation from scratch and hand-verify it on a graph small enough to check by eye.

## What you'll learn

- The Max-Cut problem statement: partition a graph's nodes into two groups to maximize cut edges
- How to derive the QUBO expression x_i + x_j - 2x_i x_j for a single edge, and why it works
- How to build the full QUBO for a small graph and evaluate it by hand
- How to convert the same problem into its Ising cost-Hamiltonian form
- Why Max-Cut, despite looking like a toy, is NP-hard and directly relevant to real clustering and network-design problems

## The Max-Cut problem

Given a graph with nodes and edges, Max-Cut asks: split the nodes into two groups (call them group 0 and group 1) so that the number of edges with one endpoint in each group is as large as possible. Each node i gets a binary variable x_i: x_i = 0 means "node i is in group 0," x_i = 1 means "node i is in group 1." An edge (i, j) is "cut" exactly when x_i ≠ x_j.

## Deriving the per-edge QUBO term

For a single edge (i, j), you want a quadratic expression in x_i and x_j that equals 1 when the edge is cut (x_i ≠ x_j) and 0 when it isn't (x_i = x_j). The standard expression is:

**x_i + x_j - 2·x_i·x_j**

Check all four cases by direct substitution:
- x_i=0, x_j=0: 0 + 0 - 0 = **0** (not cut — correct, same group)
- x_i=0, x_j=1: 0 + 1 - 0 = **1** (cut — correct, different groups)
- x_i=1, x_j=0: 1 + 0 - 0 = **1** (cut — correct, different groups)
- x_i=1, x_j=1: 1 + 1 - 2 = **0** (not cut — correct, same group)

Summing this expression over every edge in the graph gives a QUBO whose maximum equals the maximum number of cut edges — and since standard QUBO solvers minimize, you minimize the *negative* of this sum: **f(x) = -Σ_{(i,j)∈E} (x_i + x_j - 2x_i x_j)**.

## A fully worked 4-node example

Take a 4-cycle graph: nodes {0, 1, 2, 3}, edges E = {(0,1), (1,2), (2,3), (3,0)} — picture it as a square, each node connected to its two neighbors around the ring. Evaluate the (to-be-maximized) QUBO sum Σ(x_i + x_j - 2x_i x_j) for two candidate assignments (computed directly, term by edge):

**Assignment x = (1, 0, 1, 0)** — alternating around the ring:
- Edge (0,1): x0=1,x1=0 → 1+0-0 = 1
- Edge (1,2): x1=0,x2=1 → 0+1-0 = 1
- Edge (2,3): x2=1,x3=0 → 1+0-0 = 1
- Edge (3,0): x3=0,x0=1 → 0+1-0 = 1
- **Total cut = 4** — every edge is cut.

**Assignment x = (1, 1, 0, 0)** — two neighbors grouped together:
- Edge (0,1): x0=1,x1=1 → 1+1-2 = 0
- Edge (1,2): x1=1,x2=0 → 1+0-0 = 1
- Edge (2,3): x2=0,x3=0 → 0+0-0 = 0
- Edge (3,0): x3=0,x0=1 → 0+1-0 = 1
- **Total cut = 2** — only half the edges are cut.

Both totals were confirmed by direct per-edge evaluation. Since a 4-cycle is bipartite (its nodes split cleanly into two sets with no edges inside either set), the alternating assignment (1,0,1,0) achieves the maximum possible cut of 4 — every single edge crosses the partition. This is in fact the global optimum: no assignment on this graph can cut more than all 4 edges, and brute-force checking all 16 possible assignments (done in the lab, Lesson 5) confirms it.

## The Ising / cost-Hamiltonian form

Applying the s_i = 1 - 2x_i substitution from Lesson 3 to the per-edge term x_i + x_j - 2x_i x_j produces the standard Max-Cut cost Hamiltonian used throughout the QAOA literature:

**C(x) = Σ_{(i,j)∈E} ½(1 - s_i s_j)**

Check this gives identical results on the same two assignments (computed directly): for x=(1,0,1,0), the spins are s=(-1,1,-1,1), and summing ½(1 - s_i s_j) over the 4 edges gives 4 — matching the QUBO total above exactly. For x=(1,1,0,0), spins s=(-1,-1,1,1), and the same sum gives 2 — again matching. This ½(1 - s_i s_j) form is exactly the cost Hamiltonian QAOA's circuit is built to extremize, which is the direct link forward to Lesson 7.

## Why a "toy" problem matters

Max-Cut looks abstract, but it's a stand-in for real problems: community detection in social or transaction networks (split accounts into two clusters that interact minimally — useful in fraud-ring detection), circuit layout (minimize the number of wires crossing a partition boundary on a chip), and statistical physics itself. It's also provably NP-hard in general, so it serves as an honest, well-studied benchmark for comparing quantum and classical optimization methods — which is exactly the role it plays in Chapter 5's benchmarking work.

## Key terms

| Term | Meaning |
|---|---|
| Max-Cut | The problem of partitioning a graph's nodes into two groups to maximize the number of edges crossing between groups |
| Cut edge | An edge whose two endpoints are in different groups (x_i ≠ x_j) |
| Per-edge QUBO term | The expression x_i + x_j - 2x_i x_j, equal to 1 if the edge is cut and 0 otherwise |
| Bipartite graph | A graph whose nodes can be split into two sets with no edges inside either set, allowing a 100%-cut solution |
| Cost Hamiltonian (Max-Cut) | The Ising form C(x) = Σ ½(1 - s_i s_j), the version of the QUBO that QAOA's circuit directly extremizes |

## Check yourself

Add a diagonal edge (0, 2) to the 4-cycle graph from this lesson (so E now also includes (0,2)), making it no longer bipartite in the same simple way. Recompute the cut value for x = (1, 0, 1, 0) with this new edge included, and explain why this assignment can no longer cut every edge.
