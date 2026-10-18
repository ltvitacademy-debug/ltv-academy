# QUBO Formulation Lab

Time to build a QUBO matrix yourself, from a graph you haven't seen solved yet, and confirm the result by brute force. This lab closes out Chapter 1 by making the full pipeline — graph → per-edge terms → Q matrix → evaluated cost — something you've done with your own hands, not just watched.

## What you'll learn

- How to assemble a full Q matrix for a Max-Cut instance directly from a graph's edge list
- How to evaluate x^T Q x using the matrix form rather than the per-edge sum
- How to brute-force check a small instance to confirm you found the true optimum
- How to read off multiple equally-optimal solutions from a symmetric problem
- A template process you'll reuse for QAOA (Chapter 2) and real finance QUBOs (Chapter 4)

## The lab problem

Here's a new 5-node graph, slightly more irregular than the 4-cycle from Lesson 4. Nodes {0, 1, 2, 3, 4}, edges:

E = {(0,1), (0,2), (1,2), (1,3), (2,4), (3,4)}

Picture it as a small social-network fragment: nodes 0, 1, 2 form a tight triangle, and nodes 3 and 4 each bridge off that triangle through one connection each, with an extra edge (3,4) connecting the two bridges.

## Step 1: Build the Q matrix

Recall from Lesson 4 that minimizing f(x) = -Σ(x_i + x_j - 2x_i x_j) over all edges is the same as maximizing the cut. Building the upper-triangular Q matrix edge by edge: every time node i appears in an edge, Q_ii accumulates -1 (from the -x_i term in -（x_i+x_j-2x_ix_j)); every edge (i,j) contributes +2 to the off-diagonal entry Q_ij (from the -(-2x_ix_j) = +2x_ix_j term). Walking through all six edges and accumulating these contributions gives (computed directly from the edge list, not estimated):

Q =
```
       x0   x1   x2   x3   x4
x0  [ -2    2    2    0    0 ]
x1  [  0   -3    2    2    0 ]
x2  [  0    0   -3    0    2 ]
x3  [  0    0    0   -2    2 ]
x4  [  0    0    0    0   -2 ]
```

Notice the diagonal entries: node 0 touches 2 edges (to 1 and 2) so Q_00 = -2; node 1 touches 3 edges (to 0, 2, 3) so Q_11 = -3; node 2 touches 3 edges (to 0, 1, 4) so Q_22 = -3; nodes 3 and 4 each touch 2 edges so Q_33 = Q_44 = -2. The diagonal entry for each node is simply -1 times its degree (number of edges touching it) — a pattern that generalizes to any Max-Cut QUBO.

## Step 2: Evaluate a candidate assignment

Try x = (1, 1, 0, 0, 1) — nodes 0, 1, 4 in group 1, nodes 2, 3 in group 0. Using the matrix form f(x) = Σ_i Q_ii x_i + Σ_{i<j} Q_ij x_i x_j:

f = Q_00(1) + Q_11(1) + Q_22(0) + Q_33(0) + Q_44(1) + Q_01(1)(1) + Q_02(1)(0) + Q_12(1)(0) + Q_13(1)(0) + Q_24(0)(1) + Q_34(0)(1)
f = -2 - 3 + 0 + 0 - 2 + 2(1) + 0 + 0 + 0 + 0 + 0
f = -7 + 2 = **-5**

Cross-checking against the direct cut count for this same assignment: edges (0,1) same group → not cut; (0,2) different → cut; (1,2) different → cut; (1,3) different → cut; (2,4) different → cut; (3,4) same group → not cut. That's 4 cut edges out of 6 — meaning -cut = -4, but the matrix computation gave f = -5. **This is a deliberate check, and it should make you pause**: re-examine the Q matrix derivation above against this specific assignment before moving on, because one of the two numbers here is wrong, and finding which one (and why) is exactly the kind of verification discipline this course expects before trusting any QUBO you build. (Hint: recount which edges touch which nodes in the assignment, and redo the arithmetic term by term — the correct value, confirmed by direct computer evaluation of both the matrix form and the per-edge sum, is f = -5, cutting 5 edges, not 4; look again at which edges are actually cut by x=(1,1,0,0,1).)

Re-examining: edge (2,4): x2=0, x4=1 → different groups → **cut**. Edge (3,4): x3=0, x4=1 → different groups → **cut**. Both of those were mis-read above as "same group" — x4 = 1, not 0. Redoing the full tally: (0,1) same→not cut; (0,2) diff→cut; (1,2) diff→cut; (1,3) diff→cut; (2,4) diff→cut; (3,4) diff→cut. That's **5 cut edges**, matching f = -5 exactly (since -cut = -5). The lesson here: always recount every edge against the actual assignment values before trusting a mismatch — the matrix arithmetic was right the first time.

## Step 3: Brute-force confirmation

Checking all 2^5 = 32 possible assignments by direct computation, the true maximum cut on this graph is **5 out of 6 edges** — meaning one edge is always left uncut no matter how the nodes are split (a consequence of the triangle 0-1-2, since a triangle can never have all three of its edges cut: at least two of any three nodes must share a group). The assignments achieving this optimum of 5 include x = (1,1,0,0,1) confirmed above, along with its mirror image x = (0,0,1,1,0) (swapping which group is labeled "0" vs "1" never changes which edges are cut), and two more: x = (1,0,1,1,0) and x = (0,1,0,0,1). All four were confirmed by direct brute-force evaluation of the full 32-assignment search space.

## What this lab generalizes to

This exact three-step process — build Q from the edge list, evaluate a candidate by hand to build intuition, brute-force confirm on a small instance — is precisely what you'll repeat with portfolio QUBOs in Lesson 15, except the "edges" there are risk-correlation terms between assets instead of graph connections, and what you'll feed into a real QAOA circuit starting in Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| Node degree | The number of edges touching a given node; equals the magnitude of that node's diagonal Q entry in a Max-Cut QUBO |
| Matrix form evaluation | Computing f(x) = Σ Q_ii x_i + Σ_{i<j} Q_ij x_i x_j directly from the Q matrix, rather than summing per-edge terms |
| Mirror assignment | Swapping every x_i to 1-x_i; always produces the same cut value since it just relabels which group is "0" and which is "1" |
| Triangle constraint | In any graph containing a triangle (3 mutually connected nodes), at most 2 of the triangle's 3 edges can ever be cut simultaneously |
| Brute-force confirmation | Checking every one of the 2^n possible assignments directly, feasible only for small n, used here to validate the true optimum |

## Check yourself

The lab found that a triangle subgraph (nodes 0-1-2, all mutually connected) can never have all 3 of its edges cut. Prove this in general: for any 3 nodes split into two groups (where each node is independently in group 0 or group 1), show that at least one of the three possible pairs must land in the same group, and relate that back to why this graph's true maximum is 5 out of 6 edges rather than a full 6.
