# How a Superconducting Qubit Works

A superconducting qubit is not a trapped atom or a defect in a crystal — it's a tiny electrical circuit, etched on a chip, cooled until it behaves like a single quantum object. Understanding how that circuit becomes a qubit is the foundation for everything else in this chapter.

## What you'll learn

- What a Josephson junction is and why it's the one essential ingredient every superconducting qubit needs
- Why a plain LC oscillator can't be a qubit, and what "anharmonicity" means
- How a nonlinear circuit isolates a clean two-level system out of infinitely many possible energy levels
- How microwave photons are used to encode, drive, and read out the |0⟩ and |1⟩ states
- Why the whole chip has to be cooled and controlled through microwave engineering, not simple wires

## The starting point: an electrical circuit, not an atom

Superconducting qubits take a completely different approach to building a quantum two-level system than trapped-ion or neutral-atom platforms. Instead of using a naturally occurring quantum system (an electron's spin, an atom's energy levels), they build an artificial one out of ordinary circuit elements — capacitors, inductors, and one special nonlinear component — fabricated on a chip with the same lithography techniques used for classical microchips. Below about 1 Kelvin, the aluminum or niobium wiring on the chip becomes a superconductor: electrical resistance drops to zero, and current can flow as a coherent quantum wave rather than a noisy classical signal. That's the precondition for everything else — without superconductivity, the circuit just behaves classically and dissipates energy too fast to hold any quantum state.

## The Josephson junction: the key nonlinear element

A plain capacitor and inductor wired together forms an **LC oscillator** — a circuit that, treated quantum-mechanically, has evenly spaced energy levels, like rungs on a ladder with identical spacing. That evenly-spaced structure is the problem: if you tried to use the bottom two rungs (ground and first excited state) as |0⟩ and |1⟩, a microwave pulse tuned to drive the 0→1 transition would, with equal ease, also drive the 1→2 transition, the 2→3 transition, and so on. You could never reliably address just two levels — the system would leak into higher states.

The fix is the **Josephson junction**: two superconducting electrodes separated by an extremely thin insulating barrier (often a few nanometers of aluminum oxide), through which paired electrons ("Cooper pairs") can tunnel. A Josephson junction behaves like an inductor, but a *nonlinear* one — its effective inductance depends on the current flowing through it. Swapping the junction in for the plain inductor turns the LC oscillator into a **nonlinear oscillator**, and a nonlinear oscillator's energy levels are *not* evenly spaced. The gap between the 0→1 transition and the 1→2 transition becomes different — this difference is called the circuit's **anharmonicity**.

## Why anharmonicity is what makes a usable qubit

Anharmonicity is the entire point. Once the 0→1 and 1→2 transition frequencies differ, a microwave pulse tuned precisely to the 0→1 frequency drives that transition while barely touching the 1→2 transition (and higher ones). That lets engineers treat just the bottom two energy levels — ground and first excited — as an isolated two-level system: |0⟩ and |1⟩, a genuine qubit, even though the physical circuit actually has many more energy levels above it that are mostly ignored by design. Every practical superconducting qubit variant (the transmon covered in the next lesson, and earlier charge and flux qubit designs) is built around this same core idea: one or more Josephson junctions providing the nonlinearity needed to carve a clean two-level system out of what would otherwise be a useless, evenly-spaced ladder.

## Driving and reading the qubit with microwave photons

Once the two-level system exists, it has to be controlled and measured, and both are done with microwave-frequency electromagnetic pulses — typically in the few-GHz range, which is why these devices are sometimes called "circuit QED" (circuit quantum electrodynamics) systems, borrowing directly from atomic physics techniques. A carefully shaped microwave pulse at the qubit's transition frequency, sent down a coaxial line onto the chip, rotates the qubit's quantum state — a short pulse can flip |0⟩ to |1⟩ (an X gate), or create a superposition partway between them. Readout works by coupling the qubit to a separate microwave resonator on the chip: the resonator's response (how it reflects or transmits a microwave probe tone) shifts slightly depending on whether the qubit is in |0⟩ or |1⟩, and that shift is what's actually measured, amplified, and digitized off-chip. The qubit's state is never read out directly — it's inferred from how it perturbs a microwave signal.

## Key terms

| Term | Meaning |
|---|---|
| Josephson junction | Two superconducting electrodes separated by a thin insulating barrier; behaves as a nonlinear inductor and is the essential nonlinear element in every superconducting qubit |
| Cooper pair | A bound pair of electrons that carries current without resistance in a superconductor |
| Anharmonicity | The difference between a circuit's 0→1 and 1→2 transition frequencies; needed to isolate a clean two-level qubit from a larger ladder of energy levels |
| LC oscillator | A simple circuit of a capacitor and inductor whose quantum energy levels are evenly spaced — on its own, not usable as a qubit |
| Circuit QED | The general approach of controlling and reading superconducting circuits with microwave photons, borrowing techniques from atomic cavity QED |

## Check yourself

If a Josephson junction were removed and replaced with an ordinary linear inductor, what specifically would go wrong when you tried to apply a microwave pulse meant to flip the qubit from |0⟩ to |1⟩?
