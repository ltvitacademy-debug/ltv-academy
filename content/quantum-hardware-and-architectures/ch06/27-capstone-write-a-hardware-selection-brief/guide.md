# Capstone: Write a Hardware-Selection Brief

This course has spent six chapters teaching you how real quantum hardware actually behaves — its physics, its honest limitations, its real benchmarks, and how to match it to a workload. The capstone asks you to put all of it into the one artifact a real stakeholder would actually read: a short, written hardware-selection brief.

## What you'll learn

- Why a hardware decision is only as useful to an organization as the document that explains it
- The five sections every hardware-selection brief should contain
- How to write honest caveats and risks instead of overselling a recommendation
- A fully worked example brief for a stated, modest workload
- How to apply everything from Chapters 1 through 6 as one integrated decision, not five separate facts

## Why the brief matters as much as the decision

A correct hardware choice that lives only in one engineer's head is barely better than no decision at all — it can't be reviewed, challenged, handed off, or revisited when the device's calibration or the organization's budget changes six months later. The deliverable that actually survives is a short written brief: a document a manager, a collaborating team, or your future self can read in five minutes and understand not just *what* was chosen, but *why*, and what would have to change to choose differently. This is the same shift from "code" to "decision, written down" that shows up at every level of real engineering work — in quantum hardware selection, the decision is which platform, and the document is the brief.

## The five sections of a hardware-selection brief

**1. Requirements summary.** State the workload's real characteristics in the vocabulary this chapter built: qubit count needed, circuit depth, connectivity pattern, and error tolerance. This section should let a reader with no quantum background still understand roughly what's being asked of the hardware.

**2. Candidate platforms considered.** Name the realistic options and, briefly, why each was in contention — this shows the decision wasn't made by defaulting to the first vendor considered, and it gives a reader the chance to question a candidate you may have dismissed too quickly.

**3. The tradeoffs that actually drove the decision.** This is the section that matters most, and it should be specific: which metric (fidelity, connectivity, qubit count, queue time, cost) separated the winning platform from the alternatives, and why that metric mattered more than the others for *this* workload. A brief that just says "Platform X is best" without naming the deciding tradeoff has not actually explained the decision.

**4. Chosen platform, with honest caveats and risks.** State the recommendation plainly, then state what you're giving up and what could go wrong: a queue-time risk, a cost risk if volume grows, a connectivity limitation that will bite if the workload later changes shape, or an SDK immaturity that could cost engineering time. A brief with no caveats section is not more confident — it's less trustworthy, because every real platform has some.

**5. What would change the recommendation.** Name the specific conditions under which you'd recommend differently — a qubit-count requirement that grows past a threshold, a fidelity improvement on a competing platform, a cost change, a deadline that makes queue time decisive. This section is what makes the brief genuinely useful later, instead of a one-time snapshot that goes stale the moment anything shifts.

## Worked example: a brief for a modest workload

**Workload.** A university research group needs to run a small variational quantum eigensolver (VQE) experiment to estimate the ground-state energy of a simple molecule. The circuit uses roughly 8–10 qubits, is shallow per run (the VQE loop runs many shallow circuits, not one deep one), tolerates moderate per-run noise because the classical optimizer averages over many iterations, and the connectivity pattern needed is modest — mostly local qubit interactions with a handful of longer-range pairs.

**Requirements summary.** 8–10 qubits; shallow circuit depth per shot; moderate noise tolerance; mostly local connectivity with a few non-adjacent pairs; academic budget, no hard deadline.

**Candidates considered.** A superconducting cloud platform; a trapped-ion cloud platform; running on a classical simulator instead of real hardware for this scale.

**Deciding tradeoff.** At only 8–10 qubits and shallow depth, both superconducting and trapped-ion platforms have more than enough qubits and more than enough coherent depth for this workload — qubit count and raw coherence are not the deciding factor here. The deciding factor is connectivity versus cost: the handful of non-adjacent qubit pairs the Hamiltonian needs would require modest SWAP overhead on a superconducting grid, which is tolerable at this noise-tolerant scale, while the trapped-ion platform's stronger native connectivity would avoid that overhead but at meaningfully higher cost per shot and a longer queue on the academic group's budget tier.

**Chosen platform and caveats.** Recommend the superconducting cloud platform. Caveat: the modest SWAP overhead from the non-adjacent pairs will add some noise beyond the platform's raw per-gate fidelity, which should be acceptable given the VQE loop's noise tolerance, but should be checked against the actual converged energy estimate before trusting the result quantitatively. Risk: if the molecule being studied is later swapped for a larger one needing all-to-all connectivity among many more pairs, this recommendation should be revisited.

**What would change this.** If the group later needs a Hamiltonian with substantially more non-local qubit pairs, or if the target error tolerance tightens (e.g., for a publication requiring high-confidence energy estimates rather than a rough scan), the trapped-ion platform's connectivity advantage would likely outweigh its cost, and the recommendation would flip.

## Applying the whole course

Notice what this brief actually uses: Chapter 1's superconducting fidelity and scaling characteristics, Chapter 2's trapped-ion connectivity and cost tradeoffs, Chapter 4's SWAP-overhead mechanics, Chapter 5's reminder that calibration drifts and real numbers should be checked rather than assumed, and this chapter's discipline about metrics, benchmarks, and honest tradeoffs. A hardware-selection brief is where everything in this course becomes one decision instead of six separate topics — which is exactly why it's the course's capstone.

## Key terms

| Term | Meaning |
|---|---|
| Hardware-selection brief | A short written document stating a workload's requirements, the platforms considered, the deciding tradeoff, the recommendation with caveats, and what would change it |
| Deciding tradeoff | The specific metric or constraint that actually separated the chosen platform from its alternatives for a given workload |
| Caveat | An honestly stated limitation or risk of the recommended choice, included even though it weakens the pitch |
| Revisit condition | A stated future change (in requirements, cost, or hardware improvement) that would flip the recommendation |

## Check yourself

Using the same five-section structure from this lesson, draft your own short hardware-selection brief for a different workload: a deep, 4-qubit quantum simulation circuit (roughly 40 sequential two-qubit gate layers) that requires very high per-gate fidelity and can tolerate essentially no SWAP overhead, with no hard budget constraint but a six-month research timeline. State your requirements summary, the candidates you'd consider, the deciding tradeoff, your chosen platform with honest caveats, and the specific condition that would change your recommendation.
