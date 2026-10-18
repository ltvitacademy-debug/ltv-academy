# Topology Lab: Reading a Real Device Map

Everything in this chapter so far has been conceptual. This lesson is the applied version: how to actually read a real published device connectivity map — the kind every provider console shows you — and use it to make a real decision about which physical qubits to run a circuit on.

## What you'll learn

- What a provider console's device map actually displays, node by node and edge by edge
- How to read per-edge two-qubit gate error rates on a real connectivity diagram
- How to spot a chip's low-error "sweet spot" region versus its weaker qubits and edges
- Why picking specific physical qubits for a circuit is a real optimization step, not a formality
- How to combine connectivity and calibration data into one practical qubit-selection decision

## What a device map actually shows you

Providers like IBM Quantum publish a visual map for each backend: a node for every physical qubit, laid out to match the chip's real topology (heavy-hex, grid, or whatever the device uses), with edges drawn between qubits that support a direct two-qubit gate — exactly the connectivity graph from earlier in this chapter, made concrete for one real, specific piece of hardware. These maps aren't static diagrams of wiring alone; they're usually overlaid with live or recent calibration data, meaning the nodes and edges are colored or labeled with real, measured numbers, not just a static "this pair is connected" fact.

## Reading the labels: what the numbers mean

On a typical device map, each qubit node carries its own measured numbers — things like single-qubit gate error rate, readout error rate, and T1/T2 coherence times from Chapter 1 — and each edge carries its own two-qubit gate error rate, measured specifically for that pair of qubits. This per-edge detail matters: two edges that look identical in the topology diagram (same hardware connection type, same chip region) can have measurably different real error rates, often by a factor of two or more, because of qubit-to-qubit manufacturing variation and local calibration drift (Chapter 5 covers drift in depth). The map is telling you, concretely, "this specific pair of qubits currently performs this well" — not an average, not a spec-sheet number, but a real measurement from that device, usually updated regularly (daily, on many provider consoles).

## Finding the sweet spot — and the qubits to avoid

Because error rates vary noticeably across a single chip, every real device map has better and worse regions, and reading one well means visually and numerically identifying both. A "sweet spot" is a small cluster of adjacent qubits whose nodes and connecting edges all show comparatively low error rates — these are the qubits worth building a circuit's most error-sensitive gates around. The opposite also shows up clearly: qubits with elevated readout error, a shortened T1/T2, or an edge with a noticeably higher two-qubit error than its neighbors. A practitioner reading the map isn't looking for "is this chip good," a single yes/no judgment — they're looking for which specific few qubits, out of however many the chip has, are currently performing best, because that's the resource actually available to use.

## Why qubit selection is a real optimization step

Given a circuit with a known connectivity pattern (built from logical qubits, with its graph distances determined by how you wrote it) and a device map showing which physical qubits currently perform best, picking which physical qubits to map the circuit onto is a genuine decision with a measurable payoff — not a courtesy step before "the real work" of running the circuit. Mapping a circuit's most error-sensitive gates onto the chip's current sweet-spot qubits and edges, rather than letting a default or naive assignment land on weaker qubits, can meaningfully change the circuit's real-world result without changing a single logical gate. Compilers' routing and layout stages (previous lesson) often take qubit quality into account automatically to some degree, but checking the actual device map yourself — especially for a circuit where a handful of gates matter most — is a real, practical step practitioners take rather than trusting a default assignment blindly.

## Putting it together: a practical reading checklist

When you open a real device's connectivity/calibration map, a useful sequence is: first, confirm the circuit's required two-qubit interactions are actually coverable by the device's topology (the lesson 17 question) or identify where SWAPs will be unavoidable; second, scan for the region of the chip with the lowest two-qubit edge errors and best readout/coherence numbers; third, check whether that sweet-spot region happens to also have the connectivity pattern your circuit needs, since a low-error region that doesn't match your circuit's connectivity may not help as much as a slightly higher-error region that does. That last tension — error quality versus connectivity fit — is usually the real decision, and it's one a static spec sheet can never answer for you; only the live device map can.

## Key terms

| Term | Meaning |
|---|---|
| Device map (calibration/connectivity map) | A provider console's visual display of a backend's qubits and couplings, overlaid with live or recent measured error data |
| Per-edge gate error rate | The measured two-qubit gate error specific to one pair of connected qubits, which can differ noticeably from other, topologically similar edges |
| Sweet spot | A cluster of adjacent qubits and edges on a chip currently showing comparatively low error rates, worth prioritizing for error-sensitive gates |
| Qubit selection | The practical step of choosing which specific physical qubits to map a circuit onto, based on current connectivity and calibration data |

## Check yourself

You're given two possible qubit regions on the same chip for your circuit: Region A has the connectivity your circuit needs natively (no SWAPs required) but middling two-qubit error rates; Region B has excellent error rates but would require 2 extra SWAPs to fit your circuit's connectivity. How would you decide between them, and what would you want to check before deciding?
