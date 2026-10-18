# Choosing Hardware for a Given Workload

Everything so far in this course has taught you how individual platforms work and how to read their real specifications honestly. This lesson is where that knowledge turns into a decision: given an actual workload, which platform would you actually pick, and why?

## What you'll learn

- A repeatable way to characterize a workload's real hardware requirements before looking at any vendor
- How four realistic workload shapes map onto the platform tradeoffs from Chapters 1–3
- Why connectivity requirements (all-to-all vs. nearest-neighbor) often decide the match on their own
- The non-technical factors — cloud access, queue time, SDK maturity, cost — that are just as real as the physics
- How to defend a hardware choice instead of just stating one

## Start from the workload, not from the vendor list

The wrong way to choose quantum hardware is to start with "which vendor has the biggest number" and work backward. The right way is to characterize the workload first, along exactly the axes this chapter has been building: how many qubits does it need, how deep is the circuit (how many sequential gate layers before you need a result), what does its connectivity pattern actually look like, and how error-tolerant is the result allowed to be. Only once those four answers exist does it make sense to go look at platforms, because at that point you're matching requirements to tradeoffs instead of being talked into a number.

## Four realistic workload shapes

**Shallow, many-qubit, noise-tolerant.** A variational algorithm (like a variational quantum eigensolver used for a chemistry or optimization problem) typically needs a comparatively large number of qubits to represent the problem, but each individual circuit run is shallow — few layers — and the algorithm's classical optimization loop can often tolerate a fair amount of per-run noise, since it's iterating anyway. This shape favors whichever platform can offer the most usable qubits at acceptable (not necessarily top-tier) fidelity, which has historically favored superconducting platforms (Chapter 1), since they scale qubit count relatively well even though individual gate fidelity trails trapped-ion systems.

**Deep, few-qubit, high-fidelity-required.** Some algorithms (deep error-correction experiments, certain deep simulation circuits) need very few logical qubits but a long sequential chain of operations that all have to survive without the result collapsing into noise. This shape rewards whichever platform has the best gate fidelity and longest coherence time per qubit, even at the cost of qubit count — which has historically favored trapped-ion platforms (Chapter 2), where gate fidelities and coherence times tend to lead superconducting devices, even though ion systems generally field far fewer total qubits.

**All-to-all connectivity required.** Some problems — certain optimization formulations, some chemistry Hamiltonians — naturally require every qubit to potentially interact with every other qubit. On a sparsely connected device this means heavy SWAP overhead (Lesson 24), which can dominate the circuit's real depth. This shape favors platforms with native high connectivity — trapped-ion systems, where ions in a shared trap can often be coupled without physical adjacency constraints, or photonic approaches, which can route optical modes with considerable flexibility (Chapter 3) — over a fixed nearest-neighbor grid.

**Naturally local, nearest-neighbor structure.** Some workloads — certain lattice simulations of physical systems, some error-correction codes themselves — are naturally structured as local, nearest-neighbor interactions and don't need long-range connectivity at all. This shape is a good match for whatever platform offers the most qubits per dollar/qubits most reliably manufacturable in a fixed 2D layout, which plays to superconducting chips' fabrication strengths and to neutral-atom arrays, whose reconfigurable optical tweezers (Chapter 3) can be arranged to match a specific local topology before the circuit even runs.

## The non-technical factors are just as real

A technically ideal platform you can't actually use yet is not a useful recommendation. Four practical factors belong in the same decision alongside the physics:

- **Cloud access and cost.** Is the platform available through a cloud provider you already have billing and compliance set up with, and what does a realistic run actually cost at the shot count your algorithm needs?
- **Queue time.** Shared quantum hardware has real queues; a platform that's technically superior but has a multi-day queue may be the wrong choice for an iterative research workflow that needs fast turnaround.
- **SDK/toolchain maturity.** How mature is the vendor's software stack, documentation, and compiler for actually getting your circuit onto the device efficiently — an elegant piece of hardware with an immature SDK can cost you more engineering time than it saves you in fidelity.
- **Vendor roadmap and support.** Is this platform likely to still be supported, calibrated, and improved a year from now, which matters for any project with a timeline longer than a single demo.

## Making the call, and defending it

A real hardware recommendation names the workload's requirements, names the platform chosen, and names what was given up to get there — because every real choice in this chapter trades something away. "We chose trapped-ion over superconducting for this deep-circuit workload because gate fidelity mattered more than qubit count here, accepting a longer queue time and a smaller qubit budget as the cost" is a defensible decision. "We chose the platform with the most qubits" is not a decision at all — it's the exact "biggest number wins" thinking this chapter has been teaching you to retire. The next lesson, the course's capstone, asks you to write exactly this kind of decision down formally, as a brief a real stakeholder could act on.

## Key terms

| Term | Meaning |
|---|---|
| Workload characterization | Describing a problem's qubit count, circuit depth, connectivity pattern, and error tolerance before comparing hardware |
| Variational algorithm | An algorithm (e.g., VQE) using shallow quantum circuits inside a classical optimization loop, generally more noise-tolerant per run |
| Queue time | The real-world wait between submitting a circuit to shared cloud quantum hardware and getting results back |
| SDK/toolchain maturity | How complete and reliable a vendor's software stack is for compiling and running real circuits on their hardware |
| All-to-all connectivity | A connectivity pattern where any qubit can interact directly with any other qubit, without routing through intermediate qubits |

## Check yourself

A research team needs to run a chemistry simulation that requires only 12 qubits, but the circuit is quite deep and the Hamiltonian being simulated needs several non-adjacent qubit pairs to interact directly. Using the four workload shapes and the non-technical factors from this lesson, walk through which platform type you'd recommend, what tradeoff you're accepting, and one non-technical factor that could still change your answer.
