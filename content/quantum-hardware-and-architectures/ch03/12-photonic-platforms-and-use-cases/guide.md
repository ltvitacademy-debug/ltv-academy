# Photonic Platforms & Use Cases

Two companies dominate the public conversation about photonic quantum computing, and they're pursuing almost opposite strategies — one betting on a long, fault-tolerant road to a universal machine, the other shipping specialized cloud-accessible hardware today. Both stories matter, and neither is the whole picture.

## What you'll learn

- PsiQuantum's strategy: silicon-photonics manufacturing and a long-horizon bet on fault-tolerant, large-scale computing
- Xanadu's strategy: continuous-variable photonics, squeezed light, and devices like Borealis available via the cloud
- What Gaussian boson sampling is and why it's a natural fit for photonic hardware
- Why photonic platforms are honestly positioned as earlier-stage for universal, error-corrected computing than superconducting or trapped-ion systems
- The real advantages photonic approaches bring to networking and interconnects between quantum processors

## PsiQuantum: betting on manufacturing scale

PsiQuantum has staked its strategy on the idea that reaching a useful, fault-tolerant quantum computer is fundamentally a manufacturing problem, not just a physics problem, and that silicon photonics — leveraging the same kind of fabrication infrastructure used for conventional semiconductor chips — is the most credible path to producing the very large numbers of physical qubits that fault tolerance is expected to require. The company has pursued partnerships with existing chip foundries rather than building bespoke one-off hardware, and has publicly committed to a long-horizon roadmap aimed at large-scale, error-corrected systems rather than near-term small devices. This is a genuinely different bet than most other quantum hardware companies are making: rather than optimizing today's small noisy device, PsiQuantum is optimizing for what it believes the fabrication pipeline needs to look like once qubit counts climb far higher. Treat specific timeline and qubit-count claims from any company, including PsiQuantum, as roadmap statements rather than demonstrated results until independently verified.

## Xanadu: continuous-variable light and cloud access today

Xanadu has taken a different encoding approach, built around **continuous-variable** photonic qubits carried in squeezed states of light, and has prioritized getting real hardware into users' hands sooner, via cloud access, rather than only publishing a long-term fault-tolerant roadmap. Its publicly accessible devices, including the one known as **Borealis**, are built to run specific sampling-based algorithms rather than general-purpose universal programs. The headline use case for this style of hardware is **Gaussian boson sampling** — a computational task that maps naturally onto what squeezed-light photonic hardware does well, and one that has been used in some of the field's "quantum advantage" style demonstrations. It's worth being precise about what that means: performing a specific sampling task faster than certain classical methods is a meaningful hardware demonstration, but it's a long way from running arbitrary, fault-tolerant, general-purpose quantum programs.

## Where photonic approaches honestly stand today

Compared to superconducting platforms (IBM, Google, Rigetti) and trapped-ion platforms (IonQ, Quantinuum), photonic quantum computing is generally earlier-stage on the path to universal, fault-tolerant computation — gate fidelities and loss rates for general-purpose circuits haven't yet caught up to what the leading superconducting and ion platforms report. That's a fair and important caveat, not a dismissal: photonic hardware brings real, structural advantages that the other modalities don't have. Because photons already travel as light, they are a natural medium for connecting separate quantum processors or distant nodes — an interconnect and networking advantage that could matter a great deal for distributed or modular quantum architectures, regardless of which modality ends up winning on raw computation. Room-temperature operation (covered in the previous lesson) further means photonic components can plausibly integrate alongside conventional electronics in ways cryogenic platforms cannot.

## Key terms

| Term | Meaning |
|---|---|
| Silicon photonics | Fabricating optical quantum hardware using semiconductor-style manufacturing processes, PsiQuantum's core strategy |
| Continuous-variable (CV) photonics | Xanadu's encoding approach, carrying qubit information in squeezed light quadratures rather than discrete photon states |
| Borealis | A Xanadu cloud-accessible photonic device built around squeezed-light sampling tasks |
| Gaussian boson sampling | A sampling-based computational task that maps naturally onto squeezed-light photonic hardware's strengths |
| Quantum advantage demonstration | Showing a specific task is faster on quantum hardware than certain classical methods — not the same as general-purpose fault tolerance |

## Check yourself

PsiQuantum and Xanadu are both "photonic quantum computing companies," but their near-term strategies look very different. Explain the core difference in what each company is optimizing for right now.
