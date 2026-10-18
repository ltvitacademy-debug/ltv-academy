# Honest Limits of Quantum Finance Today

Every finance lesson in this chapter has included a caveat. This lesson collects those caveats into one place, states them without hedging, and gives you a clear framework for evaluating any future claim you encounter about "quantum computing for finance" — whether in a vendor pitch, a press release, or a research paper's abstract.

## What you'll learn

- A consolidated list of the specific, concrete limitations raised across Lessons 15-17
- The difference between a proven mathematical result and a demonstrated practical advantage
- Why problem size (qubit count) is the single most load-bearing limitation across every quantum finance application
- A short framework for evaluating any quantum finance claim you encounter in the future
- Why this honesty is the actual professional skill this chapter is building, not a disclaimer tacked onto real content

## The consolidated list

Pulling together what's already been said, explicitly, in this chapter:

1. **Portfolio QUBOs (Lesson 15)**: the 3-asset worked example is a faithful *formulation* exercise. Real portfolios have dozens to thousands of assets; current quantum hardware's qubit counts and noise levels have not demonstrated an advantage over classical portfolio solvers (quadratic programming solvers, genetic algorithms, and simpler heuristics) at any practically relevant scale.
2. **Amplitude estimation (Lesson 16)**: the quadratic query-count speedup (1/ε vs. 1/ε²) is mathematically proven, but realizing it in wall-clock terms requires a fault-tolerant quantum computer well beyond today's hardware, plus a nontrivial, currently unsolved oracle-construction problem for realistically complex financial models.
3. **Quantum Monte Carlo (Lesson 17)**: "quantum Monte Carlo" only accelerates the estimation step of a pipeline whose financial model is unchanged — it is not a more sophisticated model of markets, just a potentially faster way to query the same model.
4. **QAOA and VQE generally (Chapters 2-3)**: both are heuristics without a guarantee of finding the true optimum, both face classical-optimization difficulties (barren plateaus) that worsen with scale, and neither has been shown to outperform strong classical methods on any industrially-sized problem.

## Proven result vs. demonstrated advantage

This is the single most important distinction in the entire course, and it's worth stating as its own rule: **a mathematical proof that an algorithm has better asymptotic scaling is not the same claim as "this algorithm currently runs faster or better than the best classical alternative on real problems."** Amplitude estimation's 1/ε scaling is a proven theorem. Whether a quantum computer today, or in the near future, actually delivers a faster real-world risk calculation than a well-engineered classical Monte Carlo pipeline is a separate, empirical question — and as of today, the empirical answer across essentially every finance application examined in this chapter is "not yet demonstrated at practically relevant scale." Keeping these two claims distinct, in your own thinking and in anything you communicate to others, is the actual skill this lesson is teaching.

## Why qubit count is the load-bearing limitation

Across every application in this chapter, the same bottleneck recurs in a different costume: a usable qubit count. A portfolio QUBO needs roughly one qubit per asset (more with certain encodings); an amplitude estimation oracle needs enough qubits to encode a realistic model of portfolio outcomes; a VQE molecular Hamiltonian needs qubits scaling with the number of orbitals modeled. Current quantum hardware tops out in the tens to low hundreds of qubits, most of them noisy (not error-corrected) — and problems that would actually move the needle for a real financial institution typically need encodings into the thousands of qubits or more, run on fault-tolerant hardware that doesn't exist yet at useful scale. This single constraint is why "wait for bigger, better quantum computers" is the honest, unsatisfying, but accurate answer to "when will this become practically useful," rather than any specific algorithmic fix.

## A framework for evaluating future claims

When you encounter a claim about quantum computing solving a finance problem — in a vendor pitch, a paper, a press release — ask these questions, in order: (1) Is the claimed speedup theoretical (an asymptotic scaling result) or empirical (a measured wall-clock comparison against a *strong* classical baseline, not a weak one)? (2) What problem size was actually tested, and does it resemble a real-world instance, or a toy/demo scale? (3) Was the comparison against the best available classical method, or an unoptimized one chosen to make quantum look better? (4) Does the claim distinguish "ran on a simulator" from "ran on real noisy hardware"? A claim that survives all four questions honestly is rare and worth taking seriously; most marketing-driven claims fail at least one of them, usually silently.

## Why this honesty matters professionally

If you work in or around quantum computing for finance, your professional credibility depends on being able to tell the difference between what's proven, what's promising-but-unproven, and what's marketing. This chapter gave you the actual technical vocabulary (QUBO, QAOA, VQE, amplitude estimation) to engage with real claims rather than vague ones, and this lesson gave you the discipline to evaluate them rigorously. Chapter 5 takes this same discipline and formalizes it into an actual benchmarking methodology you can run yourself.

## Key terms

| Term | Meaning |
|---|---|
| Proven result | A mathematically established theorem about an algorithm's scaling behavior, independent of any hardware implementation |
| Demonstrated advantage | An empirically measured result showing a quantum method outperforming the best available classical method on a real problem instance |
| Fault-tolerant quantum computer | Error-corrected quantum hardware at a scale needed to realize many theoretical speedups in practice; not yet available |
| Qubit-count bottleneck | The recurring limitation that realistic financial problem sizes require far more usable qubits than current hardware provides |
| Claim-evaluation framework | The four-question check (theoretical vs. empirical, realistic scale, strong baseline, simulator vs. hardware) for assessing quantum finance claims |

## Check yourself

A press release claims: "Our quantum algorithm estimated portfolio risk 50x faster than classical methods." Using the four-question framework from this lesson, list the specific follow-up questions you would need answered before deciding whether this claim represents a genuine, practically relevant advance or an overstated marketing claim.
