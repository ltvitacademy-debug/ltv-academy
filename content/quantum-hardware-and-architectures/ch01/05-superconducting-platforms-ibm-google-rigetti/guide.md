# Superconducting Platforms: IBM, Google, Rigetti

IBM, Google, and Rigetti are the three names that come up most often in superconducting quantum computing, and it's tempting to rank them by qubit count alone. That number tells you much less than it seems to — this lesson is about what each company is actually prioritizing, and what limitations all three still share.

## What you'll learn

- IBM's roadmap emphasis on modularity and scaling qubit counts
- Google's emphasis on quantum supremacy-style demonstrations and surface-code error correction research
- Rigetti's smaller commercial footprint and multi-chip approach
- Why raw qubit-count comparisons between vendors are easy to misread
- The shared limitations (connectivity, noise) that all three platforms still face, regardless of marketing

## IBM: modularity and roadmap-driven scaling

IBM has been publicly explicit about a multi-year roadmap toward larger and more capable superconducting processors, with a particular emphasis on **modularity** — connecting multiple smaller quantum chips together (rather than relying solely on ever-larger single monolithic chips) as a path to higher total qubit counts without every qubit having to live on one piece of silicon. IBM has, over recent device generations, produced processors with qubit counts that have grown substantially — on the order of hundreds of qubits in recent years, roughly, with the exact number depending on which specific chip generation you're looking at and changing as new generations ship. IBM also makes some of its hardware accessible to external users and researchers through cloud access, which has made its processors a common reference point in published research, even though cloud access alone doesn't tell you much about a chip's actual error rates or practical usability for a given problem.

## Google: supremacy-style experiments and error-correction research

Google's superconducting quantum computing effort has been more associated with headline-grabbing demonstrations — experiments specifically designed to show a quantum processor performing some well-defined computational task believed to be intractable for classical supercomputers in a reasonable amount of time (so-called "quantum supremacy" or "quantum advantage" demonstrations). Separately, and arguably more important for the field's long-term trajectory, Google has invested heavily in **surface-code quantum error correction** research — experimentally demonstrating that encoding one "logical" qubit's worth of reliable quantum information across many physical qubits, using surface-code techniques, can suppress the effective error rate below what any single physical qubit achieves on its own. This error-correction research matters more than any single supremacy headline, because useful, large-scale quantum computation almost certainly requires error correction — physical qubits alone, even very good ones, are not expected to be reliable enough on their own for most practically valuable problems.

## Rigetti: a smaller footprint and a different scaling bet

Rigetti Computing has a meaningfully smaller commercial footprint than IBM or Google — a smaller company, with less overall funding and a narrower public research profile. Rigetti's technical bet has leaned toward a **multi-chip approach**, fabricating and connecting smaller chips together (conceptually related to IBM's modularity emphasis, though pursued independently and with its own specific engineering choices) rather than focusing primarily on single giant monolithic chips. Rigetti has also positioned itself somewhat more directly as a commercial cloud-accessible quantum computing vendor, competing on availability and pricing for users who want to run real jobs on real superconducting hardware today, rather than competing primarily on raw qubit-count headlines.

## Why qubit-count comparisons are easy to misread

It's tempting to treat "how many qubits does company X have" as the scoreboard, but that number alone is a poor measure of real capability. A chip with more qubits but worse coherence times, worse gate fidelities, or more restrictive connectivity between qubits can be less useful for a real computation than a chip with fewer, better-connected, lower-error qubits. Qubit count, coherence time, gate fidelity, and connectivity all trade off against each other in real hardware, and different companies have made different choices about which of these to prioritize at any given stage of their roadmap. Any specific qubit-count figure you see cited for any of these companies should be treated as a snapshot as of recent years, roughly — the numbers continue to change with each new chip generation, and comparing figures from different points in time, or from different companies' differently-defined "qubit count" claims, can be misleading.

## What all three still share

Despite real differences in strategy, IBM, Google, and Rigetti's superconducting processors all face the same fundamental physical limitations covered earlier in this chapter: finite coherence times that cap circuit depth, limited and fixed physical connectivity between neighboring qubits on the chip (most superconducting architectures only directly connect each qubit to a handful of physical neighbors, not to every other qubit), and the cryostat wiring bottleneck that constrains how many qubits can practically be controlled at once. None of the three has solved these problems outright — they've each made different engineering and strategic choices about how to manage them, and how to talk about their progress publicly. Reading hardware announcements from any of these companies with that context in mind is a more useful habit than ranking them by a single number.

## Key terms

| Term | Meaning |
|---|---|
| Modularity | Connecting multiple smaller quantum chips together as a scaling strategy, as opposed to relying solely on ever-larger single chips |
| Quantum supremacy / quantum advantage | A demonstration that a quantum processor performed a well-defined task believed intractable for classical supercomputers in a reasonable time |
| Surface-code error correction | A quantum error correction scheme that encodes one reliable logical qubit across many physical qubits to suppress the effective error rate |
| Qubit connectivity | Which pairs of qubits on a chip can directly interact; most superconducting chips connect each qubit only to a handful of physical neighbors |

## Check yourself

A news article claims "Company A's new chip has more qubits than Company B's, so it is strictly the more capable quantum computer." Using what this lesson covered about coherence time, gate fidelity, and connectivity, explain why that conclusion does not necessarily follow.
