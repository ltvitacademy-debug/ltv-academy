# Comparing All Four Modalities

Four chapters, four very different ways of building a qubit — and after all of it, the honest answer to "which one wins" is: none of them, yet. This lesson puts superconducting, trapped-ion, photonic, and neutral-atom hardware side by side so you can see the real trade-offs instead of picking a favorite.

## What you'll learn

- A side-by-side comparison of all four modalities across temperature, connectivity, gate speed, and fidelity
- The single biggest open scaling bottleneck for each modality, stated plainly
- Why "no universal winner yet" is the accurate, defensible conclusion rather than a cop-out
- How to read a vendor's qubit-count or fidelity claim critically, regardless of which modality it comes from

## The four modalities, side by side

The table below is a qualitative summary, not a precise scoreboard — exact numbers shift with every generation of hardware and vary between labs within the same modality, so treat every entry as a directional comparison, not a benchmark result.

| Modality | Operating temperature | Native connectivity | Typical gate speed | Typical fidelity regime | Biggest open scaling bottleneck |
|---|---|---|---|---|---|
| Superconducting | Near absolute zero (dilution refrigerator) | Fixed, mostly nearest-neighbor on-chip wiring | Fast (gates on the order of tens of nanoseconds) | High for single-qubit gates; two-qubit gates improving but still a limiting factor | Wiring and control-line density as qubit counts grow, plus maintaining coherence through a large refrigerated system |
| Trapped ion | Near absolute zero / high vacuum (ion trap, laser-cooled) | High native connectivity among ions in the same trap | Slower gates (often microseconds), driven by laser operations | Very high gate fidelities reported, among the best of any platform | Scaling the number of ions in a single trap, or reliably linking multiple traps together |
| Photonic | Room temperature | Flexible routing via waveguides; photons travel rather than sit still | Fast transmission, but probabilistic gates in some architectures add overhead | Still catching up to superconducting/ion platforms for general-purpose fault-tolerant circuits | Photon loss during routing and detection, which has no direct error-correction analog |
| Neutral atom | Room temperature (laser-cooled atomic sample, no dilution refrigerator) | Reconfigurable via movable optical tweezers | Gate speed tied to laser excitation to Rydberg states | Improving, but has historically lagged the best superconducting/ion results | Gate fidelity, atom loss during trapping/excitation, and connectivity risk during array rearrangement |

## No universal winner yet — and that's the honest framing

It would be more satisfying to end this chapter by naming a winner, but the accurate statement, as of today, is that **no single modality dominates on every axis that matters**. Superconducting platforms lead on raw gate speed and have the most mature large-scale integration story, but need the heaviest cooling infrastructure and face real wiring-density limits as they grow. Trapped ions report some of the best fidelities and connectivity within a single trap, but scale more slowly in raw qubit count. Photonic systems offer room-temperature operation and a natural fit for networking between processors, but trail on general-purpose fault-tolerant performance and fight an essentially unrecoverable loss problem. Neutral-atom systems can genuinely load very large raw numbers of qubits and reconfigure their layout on the fly, but still have real gaps in gate fidelity and atom-loss management. Each of these is a serious, well-funded, scientifically credible approach — and each has a real, named weakness that hasn't been solved yet, not a minor footnote.

## Reading hardware claims critically, regardless of modality

The pattern that should carry forward from this entire chapter: whenever a company announces a record — most qubits, highest fidelity, fastest gate — ask what's being measured, under what conditions, and what isn't being claimed. A large raw qubit count says little without a fidelity number next to it. A high fidelity number on an isolated pair of qubits says little about how it holds up across a full connected array. A fast gate speed says little if the error rate per gate is high enough that more gates just means more accumulated error. None of the four modalities covered in this chapter gets a pass on this scrutiny, including whichever one ends up being your personal favorite — the discipline of asking "compared to what, and what's left out" is the actual skill this chapter is trying to build, more than memorizing any one platform's current numbers.

## Key terms

| Term | Meaning |
|---|---|
| Native connectivity | How directly a platform's qubits can interact with each other without extra routing or movement steps |
| Gate fidelity | How accurately a quantum gate operation matches its intended ideal operation, expressed as a rate |
| Scaling bottleneck | The specific physical or engineering constraint that most limits a platform's growth to larger, more useful systems |
| Modality | A fundamentally different physical approach to building a qubit (e.g., superconducting, trapped-ion, photonic, neutral-atom) |

## Check yourself

A friend asks you to just tell them "which quantum computing modality is the best." Using the comparison in this lesson, explain why that question doesn't have a single honest answer today, and what a better version of the question would look like.
