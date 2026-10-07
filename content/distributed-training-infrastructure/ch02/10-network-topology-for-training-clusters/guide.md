# Network Topology for Training Clusters

Lesson 4 introduced rail-optimized topology at a glance. This lesson goes deeper into how a fabric like solara-train's InfiniBand network is actually built out of switches — the fat-tree structure, bisection bandwidth, and oversubscription — so you can evaluate any training cluster's network design, not just recognize the term "rail-optimized."

## What you'll learn

- The fat-tree (leaf-spine) topology that InfiniBand training fabrics are built from
- What bisection bandwidth means and why it's the number that actually matters
- What an oversubscription ratio is and why "non-blocking" is the target for training fabrics
- How solara-train's 64 nodes map onto this structure

## Fat-tree / leaf-spine, the basic shape

A fat-tree network has two layers of switches: **leaf switches**, each directly connected to a group of compute nodes, and **spine switches**, which connect the leaf switches to each other. No two nodes talk directly — traffic between nodes on different leaf switches always goes leaf → spine → leaf.

```text
        [Spine 1]   [Spine 2]   [Spine 3]   [Spine 4]
           |  \  ______/ |  \______/ |  \______/ |
        [Leaf 1]      [Leaf 2]     ...        [Leaf N]
         /  |  \         /  |  \
       N0  N1  N2      N3  N4  N5   ... (compute nodes)
```

## Bisection bandwidth: the number that matters

**Bisection bandwidth** is the total bandwidth available if you split the cluster into two equal halves (in the worst possible way) and ask how much data can move between those halves simultaneously. For a collective operation like ring AllReduce, where data genuinely has to cross between every pair of nodes, bisection bandwidth — not any single link's bandwidth — is the real ceiling on how fast the whole cluster can communicate at once.

## Oversubscription: where fabrics cut corners (and why training fabrics shouldn't)

A leaf switch has some number of downlink ports (to nodes) and uplink ports (to spine switches). If a leaf switch has more downlink capacity than uplink capacity — say, 16 nodes at 400 Gb/s each feeding into only 8×400 Gb/s of uplink — it's **oversubscribed**, with an oversubscription ratio of 2:1 in that example. Oversubscription is a reasonable cost-saving move for traffic that rarely needs full cross-leaf bandwidth simultaneously. Collective-heavy LLM training is the opposite case: many nodes often do need to move data across leaves at the same time, so training fabrics are typically built **non-blocking** (1:1, no oversubscription) specifically to avoid this becoming the bottleneck.

## solara-train's shape

solara-train's 64 nodes and their rail-optimized wiring (Lesson 4) sit on top of this same leaf-spine structure: each of the 8 GPU "rails" has its own set of leaf switches dedicated to just that rail's traffic across all 64 nodes, connected non-blocking to spine switches. That combination — fat-tree for the overall shape, non-blocking for bisection bandwidth, rail-optimized for how GPU-indexed traffic is distributed across it — is what a well-designed training fabric looks like.

## Key terms

- **Leaf switch** — connects directly to a group of compute nodes
- **Spine switch** — connects leaf switches to each other; all cross-leaf traffic transits here
- **Bisection bandwidth** — total bandwidth available between the two halves of a cluster, worst-case split
- **Oversubscription ratio** — ratio of downlink (node-facing) to uplink (spine-facing) capacity on a leaf switch; 1:1 is "non-blocking"

## Recap

A training fabric's topology is a fat-tree of leaf and spine switches, and the number that actually determines collective performance is bisection bandwidth — which is why training clusters like solara-train are built non-blocking instead of oversubscribed, with rail-optimization layered on top to match how GPU-indexed traffic actually moves. Next, Lesson 11 closes out the chapter with how to diagnose a real bottleneck when all of this doesn't behave the way the topology promises.
