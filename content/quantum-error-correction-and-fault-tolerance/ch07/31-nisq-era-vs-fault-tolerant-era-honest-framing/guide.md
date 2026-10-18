# NISQ-Era vs. Fault-Tolerant Era: Honest Framing

The course's explicit honesty checkpoint. Two eras, defined precisely, with a clear statement of exactly which one we're in.

## What you'll learn

- The precise operating difference between NISQ-era and fault-tolerant-era computation
- What kinds of problems NISQ-era hardware is actually suited for
- What the fault-tolerant era would require operationally, not just in qubit count
- The single honest claim this lesson insists on, stated directly

## NISQ era: running without a safety net

**NISQ** (Noisy Intermediate-Scale Quantum) hardware runs circuits either with no error correction at all, or with only small-scale, demonstration-level error correction (chapter 7, lesson 30) — not enough to suppress errors below what the raw circuit accumulates over its run. This means NISQ-era algorithms have to be specifically chosen to tolerate that reality: **shallow circuits** (few enough sequential gates that accumulated error stays manageable), **variational methods** that use a classical computer to help compensate for some noise, or algorithms whose output can be **checked or post-selected** against noise classically. NISQ hardware is not a smaller, worse version of a fault-tolerant computer running the same algorithms slower — it's a fundamentally different operating regime, suited to a different, narrower set of problems.

## Fault-tolerant era: running indefinitely, reliably

The fault-tolerant era — not yet reached for general-purpose, useful computation — would mean running circuits of **arbitrary length and depth** reliably, by continuously detecting and correcting errors *faster than they accumulate* (exactly the threshold-theorem condition from chapter 6: operating below p_th, with a code distance chosen large enough for the task's required reliability). This isn't just "more qubits" — it requires the full stack this course has built: a code with a workable threshold (chapter 5's surface code), fault-tolerant gadgets for every operation including error correction itself (lesson 28), a complete universal gate set including magic-state-distilled T gates (lesson 29), and a decoder fast enough to keep up with continuous syndrome extraction (chapter 5, lesson 22) — all operating together, continuously, for as long as the computation runs.

## The central honest claim

State this directly, as the course's explicit checkpoint: **as of now, no quantum computer has run a classically-infeasible, practically useful algorithm end-to-end in the fault-tolerant regime.** The scientific and engineering milestones covered in lesson 30 are real and meaningful steps on the path there. But the transition from NISQ-era operation to genuine, useful-scale fault tolerance is the central **open** engineering challenge of this field — not a milestone that has already been passed, and not something this course should imply is "almost done" or "right around the corner." It is a real, hard, multi-decade engineering problem, with the pieces (codes, thresholds, gadgets, decoders) individually demonstrated at small scale but not yet integrated at the scale chapter 6's math shows is actually required.

## Why this framing matters for you

If you go on to work in this field, you'll encounter plenty of enthusiasm, funding pitches, and press coverage that blur this line. Being able to precisely state what's been demonstrated, what's still needed, and why the gap between them is measured in orders of magnitude of physical-qubit count (chapter 6) — not just "a few more years of engineering" — is a genuinely valuable, differentiating skill, and it's the single thing this course most wants you to carry forward.

## Key terms

| Term | Meaning |
|---|---|
| NISQ era | The current regime: noisy hardware running without full error correction, limited to noise-tolerant algorithm classes |
| Fault-tolerant era | The not-yet-reached regime: arbitrary-depth circuits run reliably via continuous, below-threshold error correction |
| Shallow circuit | A circuit with few enough sequential operations that accumulated noise stays manageable without full error correction |
| Open engineering challenge | A problem with no complete, demonstrated solution yet, as distinct from a solved problem being refined |

## Check yourself

Someone claims "fault-tolerant quantum computing has basically already been achieved — it's just a matter of scaling up what's already been demonstrated." Using this lesson's framing and chapter 6's resource-estimation math, what specifically is wrong or misleading about that claim?
