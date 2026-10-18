# Azure Quantum Hardware & Simulator Providers

"Run this on Azure Quantum" can mean three genuinely different things: run it on a simulator, project what it would cost on future fault-tolerant hardware, or run it on an actual physical quantum processor today. Picking the wrong one for the stage you're at wastes either your time or real money.

## What you'll learn

- The three categories of target behind "submit a job in Azure Quantum": local/cloud simulators, the resource estimator, and real hardware
- Why Azure Quantum is a marketplace model, not a single in-house quantum computer
- When to reach for each category during a realistic development cycle
- What changes about your results once you move from a simulator to real hardware

## Three categories, one submission model

Every target you can submit a Q# program to in Azure Quantum falls into one of three categories, and the submission code looks almost identical across all three — you select a different `target` string and the same `workspace.submit()` call routes the job appropriately.

**Simulators.** A full-state or sparse-state simulator computes the exact mathematical result of your program by literally tracking (or approximating) the quantum state vector in classical memory. This is what you've been using since Chapter 1 — it's exact (up to floating-point precision), free of real hardware noise, and limited by how many qubits you can afford to represent in memory (a full-state simulator roughly doubles its memory need per additional qubit, which caps it well below what real hardware can hold). Simulators are the right target for developing and debugging algorithm logic, because a wrong answer on a simulator is unambiguously a bug in your code, not noise.

**The resource estimator.** Covered in depth in the next lesson — this is not a simulator and it does not run your program to get a result. It analyzes your compiled Q# program and projects what running it would cost in physical qubits and time on a *future*, fault-tolerant quantum computer, under configurable hardware assumptions you supply.

**Real hardware.** Actual third-party quantum processing units (QPUs), accessed through Azure Quantum's provider marketplace. These give you a genuine quantum result, subject to today's real noise, qubit counts, and queue times — fundamentally different guarantees than a simulator.

## Azure Quantum is a marketplace, not a single machine

A common misconception is that "Azure Quantum" refers to one Microsoft-built quantum computer. It doesn't. Microsoft provides the workspace, the Q#/QDK tooling, the job-submission and billing layer, and the resource estimator — but the actual physical QPUs you can submit real-hardware jobs to come from separate third-party hardware partners who plug into Azure Quantum as providers, each with its own underlying qubit technology (for example, superconducting circuits or trapped-ion/neutral-atom systems, depending on which partners are available in a given workspace region at a given time), its own pricing, and its own queue. This marketplace structure is deliberate: it means your Q# code and resource-estimation workflow stay the same even as the underlying hardware landscape changes, and it means you're not locked into one hardware bet while fault-tolerant quantum computing is still being built out.

## Choosing a target for where you actually are

A realistic project moves through these targets in order, not all at once:

1. **Local/cloud simulator** while you're writing and debugging the algorithm itself — cheap, fast iteration, exact ground truth.
2. **Resource estimator** once the algorithm is correct and you want to know whether it's even in the realm of feasible on hardware that doesn't exist yet, and what hardware characteristics it would need.
3. **Real hardware** only once you have a specific reason to see how the algorithm behaves under today's actual noise — for research into error rates, demonstrating a result on physical qubits, or validating that a noise-mitigation strategy works, not as a first debugging step.

Running straight to real hardware before you've validated correctness on a simulator is a common and expensive mistake: queue times mean you wait for a job that was going to fail anyway, and noisy real-hardware output makes a logic bug and a hardware error look identical.

## Key terms

| Term | Meaning |
|---|---|
| Simulator target | A classical computation of the exact (or exact-up-to-approximation) result of a quantum program, run on conventional hardware |
| Resource estimator target | A projection of the physical qubits/runtime a program would need on future fault-tolerant hardware; does not execute the program |
| Real hardware (QPU) target | An actual third-party physical quantum processor, accessed through Azure Quantum's provider marketplace |
| Marketplace model | Microsoft supplies tooling/billing/submission; separate hardware partners supply the physical QPUs as providers |

## Check yourself

Your team has a Q# program that gives a clearly wrong answer when submitted to real hardware. Walk through why submitting it to a simulator first, before touching real hardware at all, would have saved time either way -- whether the bug turns out to be in the code or not.
