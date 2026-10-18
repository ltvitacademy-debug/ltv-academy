# Trapped-Ion Platforms: IonQ, Quantinuum

The physics in the last three lessons is shared across every trapped-ion system, but the two companies that have turned it into commercial hardware — IonQ and Quantinuum — have made different engineering choices about which ion to use and how to scale past a single chain. Worth knowing both, and worth being skeptical of any specific number either one publishes.

## What you'll learn

- IonQ's choice of ytterbium ions and its all-to-all-connectivity positioning
- Quantinuum's choice of ions and its H-Series systems
- What a QCCD (quantum charge-coupled device) architecture is and the scaling problem it addresses
- Why reported qubit counts and fidelities should be treated as moving, hedged figures rather than fixed facts

## IonQ

IonQ builds its processors around trapped ytterbium ions (Yb+), using the single-chain, laser-controlled architecture covered in the previous three lessons: ions cooled toward their motional ground state, individually addressed with laser pulses for single-qubit gates, and entangled via Mølmer–Sørensen-style gates through the chain's shared motional modes. IonQ has marketed the all-to-all connectivity within its ion chains as a central differentiator relative to nearest-neighbor superconducting hardware, arguing that it lets certain algorithms run with meaningfully less compiled circuit overhead. IonQ makes its systems available through major cloud platforms, letting developers submit circuits without owning or operating the hardware directly — the same cloud-access model other quantum vendors, including superconducting ones, generally use. As with every vendor in this space, treat IonQ's own published qubit-count and performance figures as marketing-adjacent and likely to be out of date quickly; verify current specifics against primary sources before repeating them as fact.

## Quantinuum

Quantinuum (formed from the 2021 merger of Honeywell Quantum Solutions and Cambridge Quantum) builds its H-Series trapped-ion systems around ions such as calcium (Ca+) and barium (Ba+), often using one ion species as the qubit and a second as a "sympathetic cooling" partner that can be re-cooled with lasers without disturbing the qubit ion's stored state. Quantinuum has reported, in various benchmark announcements over recent years, two-qubit gate fidelities on the high end of what's been publicly demonstrated across the industry — treat any specific percentage as a snapshot from a particular announcement rather than a fixed, permanent spec, since these figures have been improving across hardware generations. Quantinuum's systems are built around a QCCD (quantum charge-coupled device) architecture, covered in more detail below, which is central to how the company talks about its path to scaling.

## QCCD: scaling by shuttling ions between zones

QCCD stands for quantum charge-coupled device — a name borrowed from conventional charge-coupled device sensors, where charge packets are shuttled between pixels. In a trapped-ion QCCD architecture, a single chip-scale trap is divided into multiple zones: some zones dedicated to storing idle ions, others dedicated to performing gate operations. Electrode voltages are dynamically adjusted to physically shuttle ions between these zones — splitting chains apart, moving individual ions through junctions, and recombining ions into new groupings as needed — so that gates can be run on small, manageable local chains even as the total number of ions in the whole device grows. This is the trapped-ion platform's practical answer to the motional-mode-crowding limit from the previous lesson: rather than growing one chain indefinitely, a QCCD device keeps individual chains short and well-controlled, and uses shuttling to let any ion eventually interact with any other ion across the whole device, at the cost of the extra time and potential error that shuttling introduces.

## Treat the numbers as a moving target

Both companies, like every quantum hardware vendor covered in this course, publish qubit counts, "quantum volume"-style composite metrics, and gate fidelity figures that improve across hardware generations and are frequently used in marketing. As of recent years, both have reported systems with qubit counts in the dozens and two-qubit gate fidelities often quoted at or above roughly 99%, but exact figures depend on which specific system generation and which specific benchmark methodology is being cited — and marketing materials don't always make that context obvious. The durable, hardware-level facts worth retaining from this lesson are architectural: which ion species, whether a QCCD design with shuttling is used, and why that shuttling exists — not whichever qubit-count press release happens to be current when you're reading this.

## Key terms

| Term | Meaning |
|---|---|
| IonQ | A trapped-ion quantum computing company using ytterbium (Yb+) ions and marketing all-to-all connectivity as a key differentiator |
| Quantinuum | A trapped-ion company (from the Honeywell Quantum Solutions / Cambridge Quantum merger) using ions such as Ca+ and Ba+ in its H-Series systems |
| Sympathetic cooling | Using a second ion species to absorb cooling laser light without disturbing the qubit state stored in the primary ion species |
| QCCD (quantum charge-coupled device) | A trapped-ion architecture that divides a trap into zones and shuttles ions between them to scale beyond one chain's practical length |
| Benchmark figure | A reported qubit count or fidelity tied to a specific system generation and test methodology, not a fixed permanent spec |

## Check yourself

A press release says a trapped-ion system has "industry-leading two-qubit gate fidelity." Based on this lesson, what two pieces of missing context would you want before treating that claim as meaningful, and why does the QCCD architecture matter for interpreting qubit-count claims specifically?
