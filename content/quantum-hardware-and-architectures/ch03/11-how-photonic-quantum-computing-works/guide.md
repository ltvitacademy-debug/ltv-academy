# How Photonic Quantum Computing Works

Instead of trapping something in place and cooling it down, photonic quantum computing sends information racing through optical circuits at the speed of light — and that single design choice changes almost everything about what's hard and what's easy.

## What you'll learn

- How a qubit can be encoded in a particle of light, and which photon properties carry the information
- Why photonic hardware runs at room temperature while superconducting and some trapped-ion systems need extreme cooling
- How beamsplitters and phase shifters perform single-qubit operations without any "trap" to hold the qubit still
- Why photon loss, not decoherence in the usual sense, is the dominant error source in photonic systems
- Why some two-photon gates are inherently probabilistic, and what "heralding" does about that

## Encoding information in light

A photonic qubit stores its 0 and 1 states in some measurable property of a single photon rather than in the internal state of a trapped atom or a superconducting circuit. Common encodings include **polarization** (horizontal vs. vertical), **path encoding** (which of two waveguides the photon travels down), and **time-bin encoding** (whether the photon arrives in an early or late time slot). A separate family of photonic approaches uses **continuous-variable encoding**, where information is carried in the quadratures of squeezed light states rather than in a discrete two-level system — this is the approach Xanadu has built much of its hardware around, covered in the next lesson. Whichever encoding is used, the photon itself is the physical carrier, and it moves through the circuit rather than sitting still in a trap.

## Room temperature is a genuine structural advantage

Superconducting qubits need a dilution refrigerator pushing toward millikelvin temperatures, and even trapped-ion systems need high vacuum and careful laser cooling. Photons don't interact with their thermal environment the way charge or spin qubits do, so photonic circuits can operate at or near room temperature. This removes an entire category of engineering overhead — no cryostat, no multi-day cooldown cycles, no limits on how large a chip can get before a refrigerator can't remove heat fast enough. It's a real and meaningful advantage, and it's one of the clearest reasons photonic approaches remain actively pursued even though they trail other modalities on other fronts.

## Gates: linear optics plus something nonlinear

Single-qubit operations on photonic qubits are carried out with **linear optical elements** — beamsplitters (which mix two optical paths) and phase shifters (which delay one path relative to another). These are mature, well-understood components, often fabricated directly into **photonic integrated circuits** using silicon photonics fabrication techniques borrowed from the semiconductor industry, which is part of why photonic approaches have a plausible path to large-scale manufacturing. The harder problem is two-qubit entangling gates: photons don't naturally interact with each other the way charged particles or atoms held close together do. Some architectures introduce genuine optical nonlinearities; others — notably linear-optical quantum computing approaches — perform two-photon gates **probabilistically**, using measurement and a technique called **heralding**, where an additional detection event signals ("heralds") that a gate succeeded, and failed attempts are discarded and retried.

## Photon loss: the central engineering problem

The property that makes photons attractive — they move at the speed of light and barely interact with their surroundings — is also the source of photonic computing's hardest problem. A trapped ion or a superconducting qubit that starts to decohere is still physically present; it can, in principle, be measured, corrected, or reset. A photon that is absorbed, scattered, or misdirected by an imperfect waveguide or detector is simply gone — there is no "storing" a lost photon and no way to directly observe where it went. Because there is no good error-correction analog for "the qubit's physical carrier ceased to exist," photon loss during transmission, routing, and detection is the dominant error source in photonic systems, and it scales with circuit depth and chip size in a way that has driven most of the architectural choices in this field.

## Key terms

| Term | Meaning |
|---|---|
| Path/polarization/time-bin encoding | Discrete ways of storing a qubit's 0/1 state in a measurable property of a single photon |
| Continuous-variable encoding | Encoding information in the quadratures of squeezed light rather than in discrete photon states |
| Linear optical elements | Beamsplitters and phase shifters used to perform single-qubit operations on photonic qubits |
| Heralding | Using an auxiliary detection event to confirm a probabilistic two-photon gate succeeded |
| Photonic integrated circuit | A chip (often silicon photonics) that fabricates optical components for scalable manufacturing |
| Photon loss | A photon being absorbed, scattered, or misdetected — the dominant and largely uncorrectable error source in photonic QC |

## Check yourself

A colleague says, "photonic qubits don't decohere the way superconducting qubits do, so photonic computers should have an easier error problem." What's missing from that claim, and what is the real dominant error source in photonic systems instead?
