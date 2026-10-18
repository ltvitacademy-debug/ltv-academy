# Qubit Connectivity Graphs

Every chip or chain you've met so far — superconducting, trapped-ion, photonic, neutral-atom — has one more property that matters as much as qubit count or coherence time: which qubits can actually talk to each other. This lesson gives you the tool for describing that precisely: the connectivity graph.

## What you'll learn

- How to represent a device's qubits and allowed two-qubit gates as a graph
- The common real connectivity topologies: heavy-hex, grid/square lattice, and linear/all-to-all
- Why most hardware modalities physically cannot support arbitrary all-to-all connectivity
- Why superconducting chips specifically are wiring-constrained, not just "designed that way"
- How to read a connectivity graph as a first step before designing or compiling a circuit

## Representing a chip as a graph

A connectivity graph is a simple, exact way to describe what a piece of quantum hardware can actually do at the two-qubit-gate level. Each qubit is a node. An edge between two nodes means a two-qubit gate (commonly a CNOT or CZ) can be applied directly between those two physical qubits, with no intermediate steps. If there's no edge between two nodes, the hardware has no direct physical mechanism to couple those two qubits — full stop, regardless of what the circuit you want to run asks for. This graph is a property of the physical device, not of any particular circuit or algorithm, and every real backend publishes one (often called a "coupling map").

## Heavy-hex: the IBM superconducting layout

IBM's superconducting processors use a topology called heavy-hex: a hexagonal lattice where most qubits connect to two or three neighbors, and a smaller number of qubits (sitting at hexagon vertices) connect to just two. It looks sparse compared to a dense grid, and that's deliberate — the heavy-hex pattern was chosen specifically to reduce a frequency-collision problem common in densely packed superconducting qubits (two physically close qubits with near-identical resonant frequencies tend to leak into and interfere with each other). Trading some connectivity for fewer frequency collisions was judged, on balance, the better engineering tradeoff for scaling superconducting chips to larger qubit counts.

## Grid lattices and linear chains

Not every real or proposed topology is heavy-hex. Some superconducting and neutral-atom layouts instead use a square/grid lattice, where each qubit connects to up to four neighbors (up, down, left, right) — simpler to reason about, denser than heavy-hex, but reintroducing more frequency-collision risk. At the other extreme, a single trapped-ion chain (Chapter 2) behaves like a linear chain where, because of shared motional modes, every ion is effectively connected to every other ion in the same trap — all-to-all connectivity, not just nearest-neighbor. The same underlying idea — nodes and edges — describes all of these; only the edge pattern differs.

## Why arbitrary all-to-all connectivity isn't physically free

It's tempting to ask "why not just wire every qubit to every other qubit and skip this problem entirely?" For superconducting chips specifically, the answer is physical, not a design oversight. Each transmon qubit needs its own dedicated microwave control and readout lines, and each two-qubit coupling needs its own physical coupling element (commonly a tunable or fixed coupler, or a shared bus resonator) fabricated on the chip. Wiring every qubit to every other qubit scales the number of required couplers and control lines roughly with the square of the qubit count, which runs into real limits on chip real estate, how many lines can physically route off a dilution-refrigerator-cooled chip (Chapter 1), and how much unwanted crosstalk each additional nearby coupling element introduces between qubits that were never meant to interact. A fixed, sparse connectivity graph — heavy-hex or grid — is the practical consequence of those fabrication and crosstalk constraints, not an arbitrary limitation someone chose to impose.

## Reading a connectivity graph before you design anything

Before writing or compiling a circuit for a specific backend, the connectivity graph is the first thing worth checking — not an afterthought. It tells you, up front, which pairs of logical qubits you can place next to each other "for free" and which pairs will need help to interact at all, which is exactly the problem the next three lessons build on: circuit design under connectivity limits, the SWAP gates that compilers insert to work around them, and how to read a real device's published connectivity map.

## Key terms

| Term | Meaning |
|---|---|
| Connectivity graph (coupling map) | A graph whose nodes are a device's qubits and whose edges mark which pairs support a direct two-qubit gate |
| Heavy-hex lattice | IBM's superconducting qubit layout, based on a hexagonal pattern, chosen to reduce frequency collisions at the cost of some connectivity |
| Grid/square lattice | A layout where each qubit connects to up to four neighbors in a 2D grid |
| All-to-all connectivity | A layout where every qubit can interact directly with every other qubit, as in a single trapped-ion chain |
| Frequency collision | Interference between two physically close superconducting qubits whose resonant frequencies are too similar |

## Check yourself

Why does IBM use a sparser heavy-hex layout instead of a denser grid layout on its superconducting chips, given that a grid would allow more direct two-qubit connections per qubit?
