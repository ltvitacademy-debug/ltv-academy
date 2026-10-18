# Neutral-Atom Platforms & Scalability Claims

Neutral-atom companies regularly announce the largest raw qubit counts in the industry, and that's genuinely true — but "most atoms in an array" and "most usable, error-corrected logical qubits" are two very different numbers, and this lesson is about keeping them straight.

## What you'll learn

- How QuEra's and Pasqal's platforms build on the optical-tweezer and Rydberg-blockade physics from the previous lesson
- The difference between analog and digital modes of operation on neutral-atom hardware
- Why large raw atom counts are genuinely achievable, and why that's a real advantage of this platform
- Why atom loss, gate fidelity, and connectivity during 2D rearrangement are real open engineering challenges
- Why "biggest qubit count" headlines need to be read carefully rather than taken as a scalability verdict

## QuEra and Pasqal: two companies, one core physics

**QuEra** and **Pasqal** are the two companies most associated with bringing neutral-atom quantum computing to real users, and both build on the same underlying physics covered in the previous lesson: atoms held in optical tweezer arrays, entangled via Rydberg blockade. Both companies offer access through cloud platforms and have pursued partnerships with major cloud providers to make their hardware reachable without requiring customers to operate the physical apparatus themselves. Each has also pursued **analog** modes of operation — where the system evolves continuously under a programmed Hamiltonian to solve a specific class of problem, such as certain optimization or simulation tasks — alongside **digital** modes that apply discrete gate sequences more analogous to how superconducting or trapped-ion processors are typically programmed. The existence of both modes matters: it means neutral-atom hardware isn't only being positioned as a future universal gate-based computer, it's also being pitched for near-term analog simulation tasks where today's noisier, smaller-scale hardware may already be useful.

## Why large raw atom counts are genuinely achievable

Loading and trapping neutral atoms scales differently than some of the fabrication-intensive processes other platforms rely on: because tweezers are generated optically rather than fabricated individually as physical structures, it is comparatively straightforward to project many tweezer sites and load atoms into a large fraction of them. This is a real, structural reason that neutral-atom systems have been able to report very large numbers of trapped atoms — it isn't a marketing trick, it reflects something genuinely easier about how this platform scales the *raw count* of trapped particles compared to, say, fabricating and wiring up an equivalent number of superconducting circuits.

## Why raw atom count isn't the whole story

Having a few hundred (or more) atoms sitting in a tweezer array is not the same claim as having that many high-fidelity, well-connected, error-corrected logical qubits available for a real computation, and conflating the two is the single most important scalability trap in this part of the field. Several real engineering challenges sit between "atoms loaded" and "atoms usefully computing": **gate fidelities** for neutral-atom entangling operations have historically lagged behind the best superconducting and trapped-ion results, meaning more errors accumulate per operation; **atom loss** is an ongoing issue, since atoms can be knocked out of their tweezer or lost during the excitation and de-excitation needed for Rydberg gates, requiring active reloading schemes to keep an array full during a longer computation; and **connectivity during 2D (or 3D) rearrangement** — physically moving atoms to bring the right pairs together for a gate — takes real time and carries its own risk of losing or misplacing atoms mid-move, which becomes a harder problem as arrays get larger and movement patterns get more complex. None of this erases the platform's real advantages; it just means a headline qubit count, on its own, tells you little about how close a system is to running a large, reliable, fault-tolerant computation. Treat any specific atom-count or fidelity figure from a vendor as a claim to verify, not a settled fact, and look for what's said (or not said) about loss rates and gate fidelity alongside it.

## Key terms

| Term | Meaning |
|---|---|
| Analog mode | Operating neutral-atom hardware by continuously evolving under a programmed Hamiltonian for tasks like optimization or simulation |
| Digital mode | Operating neutral-atom hardware with discrete gate sequences, more directly analogous to other gate-based platforms |
| Atom loss | Atoms being knocked out of or lost from their optical tweezer, requiring active reloading to keep an array full |
| Logical qubit | An error-corrected, reliably usable qubit built from many physical qubits — distinct from a raw trapped-atom count |
| 2D rearrangement | Physically moving atoms via tweezers to bring specific pairs together for a gate, a process with real time and loss costs |

## Check yourself

A news article claims "Company X's neutral-atom computer now has the most qubits of any quantum computer in the world." What question should you ask before treating that as evidence the system is close to outperforming other platforms on real computations?
