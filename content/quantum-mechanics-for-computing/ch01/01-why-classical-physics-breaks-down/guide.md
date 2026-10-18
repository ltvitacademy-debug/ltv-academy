# Why Classical Physics Breaks Down

By the end of the 1800s, physics looked essentially finished — Newton's mechanics and Maxwell's electromagnetism explained almost everything anyone could measure. Then three stubborn experimental facts refused to fit, and the fix physicists were forced into is the same fix that makes a qubit behave nothing like a classical bit.

## What you'll learn

- Why classical physics predicted an "ultraviolet catastrophe" for hot glowing objects, and how Planck's quantized-energy fix avoided it
- Why dimmer below-threshold light never produces photoelectrons no matter how intense it gets, but any light above the threshold frequency does — and why only "light comes in discrete energy packets" explains that
- Why atoms emit and absorb light only at sharp, discrete wavelengths instead of a continuous rainbow
- Why all three failures point at the same gap in classical physics: continuous, arbitrarily divisible energy
- How this sets up the rest of the course: a classical bit lives in a world built on continuous, deterministic physics; a qubit does not

## The ultraviolet catastrophe: when a correct theory predicts nonsense

Classical physics treats energy as continuous — a hot object's electromagnetic field can vibrate at any frequency, and classical statistical mechanics says every available vibration mode should get, on average, an equal share of the object's thermal energy. That sounds reasonable until you count the modes. A glowing object has vastly more possible *high-frequency* vibration modes than low-frequency ones, and if each mode gets an equal share of energy, the object should radiate an essentially infinite amount of energy at ultraviolet and higher frequencies. Real hot objects obviously don't do this — a glowing coal or a hot oven radiates a well-behaved spectrum that rises, peaks, and falls back down. Classical physics, applied correctly, predicted a physically impossible result. This mismatch became known as the "ultraviolet catastrophe."

Max Planck found the fix in 1900, and it was deeply strange for its time: he assumed that the vibrating modes could only exchange energy in discrete chunks ("quanta"), not continuously, with each chunk's size tied to the mode's frequency. High-frequency modes need a much bigger minimum chunk to absorb any energy at all, and thermal energy at ordinary temperatures simply can't supply chunks that large — so those modes stay essentially unexcited, and the catastrophe never happens. Planck's assumption worked perfectly and matched every experiment, but it had no classical justification whatsoever. Energy, it turned out, is not infinitely divisible.

## The photoelectric effect: intensity isn't the lever, frequency is

Shine light on certain metals and electrons ("photoelectrons") pop out. Classical wave theory treats light as a continuous wave whose energy is proportional to its intensity — so a classical physicist's prediction is straightforward: brighter light carries more energy, so brighter light should always be able to knock electrons loose eventually, no matter the color, if you just turn up the brightness.

That is not what happens. Below a certain threshold *frequency* of light, no amount of intensity — however bright, however long you shine it — ever ejects a single electron. Above that threshold frequency, even very dim light ejects electrons immediately, and turning up the intensity just produces more of them (not higher-energy ones).

Einstein's 1905 explanation (for which he won the Nobel Prize) was that light itself is not a continuous wave of adjustable energy — it arrives in discrete packets called photons, and each photon's energy is fixed by its frequency alone, not its intensity. A single photon either carries enough energy to knock an electron loose or it doesn't; intensity only controls *how many* photons arrive per second, not how much energy each one carries. Below the threshold frequency, every single photon is individually too weak, and a million too-weak photons arriving together still can't combine their energy on one electron — so nothing happens, no matter how bright the light gets. Above the threshold, every single photon is individually strong enough, so even a faint beam ejects electrons immediately. This is exactly backward from what a continuous-wave theory of light predicts, and it only makes sense if light's energy is quantized per-photon.

## Atomic spectral lines: light from atoms is not a rainbow

If you heat up a thin gas of a single element — hydrogen, say — and look at the light it emits through a prism, you don't see a smooth, continuous rainbow. You see a small number of sharp, distinct lines at very specific wavelengths, with darkness everywhere in between. Every element has its own unmistakable fingerprint of lines, and the pattern is exactly reproducible every time, for every sample of that element, anywhere.

Classical physics has no explanation for this. In the classical picture, an electron orbiting a nucleus is just a charged particle on a curved path, and an accelerating charge should continuously radiate electromagnetic energy at whatever rate the orbit's geometry dictates — smoothly losing energy and spiraling into the nucleus, radiating a continuous smear of frequencies as it goes, not a few sharp lines. Classical mechanics also offers no reason why only certain orbits (and therefore only certain specific energies, and therefore only certain specific emitted wavelengths) would be allowed at all. The discreteness of spectral lines was a direct experimental signal that atomic energy is not continuous — electrons in atoms can only have certain fixed, separated energy values, and light is emitted only when an atom jumps between two of those fixed values, releasing a photon whose energy equals exactly the gap. No in-between energies, no in-between wavelengths, ever.

## The pattern, and why it matters for computing

All three failures are different faces of the same single crack in classical physics: classical physics assumes energy, and the physical quantities built from it, can take on any continuous value and change smoothly and deterministically over time. Nature, at the atomic scale, simply does not work that way. Energy comes in discrete, countable units; outcomes are restricted to specific allowed values; and (as the next lessons will show) even a particle's position and momentum resist the kind of definite, continuously-trackable trajectory classical mechanics assumes.

This matters directly for you as a software engineer learning quantum computing. A classical bit is a direct descendant of classical physics's comfortable assumptions: a voltage that is continuously adjustable in principle, but that engineers deliberately pin to one of two stable, deterministic values (0 or 1) and keep there until something explicitly changes it. A qubit is built on the physics you just saw break classical intuition — discrete allowed outcomes, probabilistic rather than deterministic behavior, and (as later lessons will formalize) states that are genuinely different from "secretly 0 or secretly 1 the whole time." Everything unusual about how qubits behave compared to classical bits traces back to exactly the kind of physics that forced Planck, Einstein, and the spectroscopists of the early 1900s to abandon classical assumptions.

## Key terms

| Term | Meaning |
|---|---|
| Ultraviolet catastrophe | Classical physics's (wrong) prediction that a hot object should radiate infinite energy at high frequencies |
| Quantization of energy | Planck's assumption that vibrational energy can only be exchanged in discrete chunks tied to frequency, not continuously |
| Photon | A discrete packet of light energy whose energy depends only on frequency, not on the light's intensity |
| Threshold frequency | The minimum light frequency below which no amount of intensity ejects photoelectrons from a given metal |
| Spectral lines | The sharp, discrete wavelengths of light an element emits or absorbs, rather than a continuous range |

## Check yourself

A colleague argues: "If light were really just a continuous wave, we could still explain the photoelectric effect — we'd just need a brighter lamp." Using the threshold-frequency behavior described above, explain precisely why no amount of brightness from a below-threshold-frequency lamp will ever produce a single photoelectron, and why this specific failure (not just "classical physics is sometimes wrong") is what forced Einstein's quantized-light explanation.
