# Where Quantum Optimization Currently Stands

Every chapter in this course has deferred some version of the question "but does this actually work better than classical methods?" This lesson answers it directly, using the fair-benchmark standard from Lesson 21 to separate what's proven from what's promising from what's marketing.

## What you'll learn

- The current, honest state of QAOA's performance versus classical heuristics on real problem instances
- The current, honest state of VQE's performance versus classical quantum chemistry methods
- What "quantum advantage" means precisely, and why it hasn't been claimed for optimization or finance
- Why problem structure, not just problem size, determines whether quantum methods have a chance
- A clear-eyed forecast: what would need to change for this picture to shift

## QAOA versus classical heuristics: the honest state

Applying the Lesson 21 fair-benchmark standard to the published literature on QAOA: on small, carefully studied instances (tens of qubits), QAOA has been shown to find good approximate solutions, consistent with this course's own directly-simulated results (Lesson 9: approximation ratio ≈0.75 at depth 1, ≈1.0 at depth 2, on a 4-node graph). What has **not** been shown, as of today, is QAOA outperforming the best classical heuristics — simulated annealing, tabu search, specialized Max-Cut and QUBO solvers — on problem sizes large enough to be industrially relevant (hundreds to thousands of variables), when both sides are benchmarked fairly (strong baseline, full pipeline timing, matched success criteria). Several published comparisons that initially looked favorable to QAOA were later found, on closer examination, to have compared against under-tuned classical baselines — exactly Lesson 21's first failure mode in practice, not a hypothetical.

## VQE versus classical quantum chemistry: the honest state

VQE has reliably reproduced known ground-state energies for small molecules (H2, LiH, and similar — Lesson 13) on both simulators and real hardware, which is a genuine, repeated, positive result. It has **not** outperformed classical quantum chemistry methods — coupled-cluster theory (CCSD(T)) in particular is the dominant classical gold standard — on any molecule of practical chemical interest. Classical methods currently handle molecules with dozens to hundreds of atoms at chemical accuracy; VQE on real hardware today is still validated primarily on molecules small enough that classical methods solve them instantly and more accurately.

## What "quantum advantage" actually means

"Quantum advantage" (sometimes called "quantum supremacy" for a narrower, specific class of results) has a precise meaning in the research literature: a demonstrated case where a quantum computer solves *some* problem faster than *any* known classical method can, on real hardware, for a real (not necessarily useful) task. This has been claimed and defended for a small number of highly specific, deliberately non-practical sampling problems (random circuit sampling being the most famous). **No such claim has been made or defended for combinatorial optimization or quantum finance** — not because researchers haven't tried, but because the comparisons, when run fairly, have not yet shown it. Precision matters here: "quantum advantage hasn't been shown for optimization" is a narrower, more defensible claim than "quantum computers don't work" or "quantum optimization is useless" — neither of which this course is claiming.

## Problem structure matters more than raw size

An underappreciated point: whether a quantum method has any chance of competing isn't purely a function of problem size (qubit/variable count) — it also depends heavily on problem *structure*. Highly structured problems (ones with exploitable symmetry, sparsity, or special algebraic form) are often solved extremely efficiently by specialized classical algorithms built specifically to exploit that structure — these are exactly the cases where classical methods are hardest to beat. Unstructured or "generic" hard instances, with no special exploitable structure, are where general-purpose heuristics (classical or quantum) are on more equal footing — and are the more promising place to look for an eventual quantum edge, though even there, none has been demonstrated yet at relevant scale.

## What would need to change

For this picture to shift, several things plausibly need to happen together: substantially larger and less noisy quantum hardware (moving well past today's noisy intermediate-scale devices toward fault tolerance), better classical-optimizer techniques for QAOA/VQE's parameter landscapes that avoid barren plateaus at scale (Lesson 8), and — perhaps most importantly — identification of a specific problem structure where quantum methods have a provable or strongly empirical edge over the best classical alternative, rather than a general hope that "bigger quantum computers will eventually win." None of this is guaranteed to happen on any particular timeline, and honest reporting in this field treats that uncertainty as a feature of the current state of knowledge, not something to paper over.

## Key terms

| Term | Meaning |
|---|---|
| Quantum advantage | A demonstrated case of a quantum computer solving some problem faster than any known classical method, on real hardware, for a real task |
| CCSD(T) | Coupled-cluster theory with singles, doubles, and perturbative triples; the dominant classical gold-standard method in quantum chemistry |
| Under-tuned baseline | A classical comparison method that wasn't properly optimized before being benchmarked, inflating the apparent quantum advantage |
| Problem structure | Exploitable features (symmetry, sparsity, algebraic form) of a problem instance that can make it much easier for specialized classical methods, independent of raw problem size |
| Noisy intermediate-scale quantum (NISQ) | The current era of quantum hardware: tens to low hundreds of qubits, without full error correction |

## Check yourself

Explain, in your own words, the difference between the claim "quantum advantage has been demonstrated for random circuit sampling" and the claim "quantum advantage has been demonstrated for combinatorial optimization." Why does this course insist on treating these as two separate, independently-evaluated claims rather than assuming the first implies anything about the second?
