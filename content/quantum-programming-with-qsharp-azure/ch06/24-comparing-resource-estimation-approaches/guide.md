# Comparing Resource-Estimation Approaches

Both tools let you reason about "how expensive is this program to run" — but they answer genuinely different questions, aimed at genuinely different hardware eras. Conflating them is a real mistake to avoid when you're the one explaining this choice to a team.

## What you'll learn

- What Qiskit's transpilation/depth-analysis tools actually measure, and for what hardware era
- What Azure Quantum's Resource Estimator measures, and for what hardware era
- Why these are not competing solutions to the same problem, but tools aimed at different problems
- A verified illustrative gate-count comparison, and why gate counts aren't the whole resource-estimation story

## What Qiskit's tooling actually measures

Qiskit's transpiler rewrites a circuit to match a specific target's native gate set and qubit connectivity, and in doing so produces real, useful numbers: circuit depth, gate counts by type, and how many of a specific hardware backend's actual two-qubit couplings your circuit needs. These numbers describe how expensive a circuit is to run on **today's**, or near-term, noisy hardware — they're inputs to questions like "will this circuit's depth fit within this specific real device's coherence time" or "how many SWAP gates does connectivity-constrained routing add." IBM and the broader research community also publish resource-estimation work for fault-tolerant scenarios, but it exists as separate research tooling and papers, not as one standardized, push-button service built into the core Qiskit toolchain the way the Resource Estimator is built into Azure Quantum.

## What the Azure Quantum Resource Estimator actually measures

The Resource Estimator, covered in Chapter 3, measures something categorically different: not "how does this run on a specific real device today," but "how many physical qubits and how much runtime would this need on a **future**, fault-tolerant device," under qubit-technology and error-correction assumptions you configure. It doesn't care about today's connectivity constraints or today's gate fidelities — it's answering a hardware/algorithm co-design question for an era of hardware that doesn't exist yet, which is precisely why it's useful for research planning and hardware-roadmap decisions years in advance.

## These are not the same question

It's tempting to treat "Qiskit has transpilation and depth analysis, Azure Quantum has the Resource Estimator" as two competing answers to one question — but they're not. Qiskit's tools answer "what does running this cost on real hardware roughly like what exists today," and the Resource Estimator answers "what would running this cost on fault-tolerant hardware that doesn't exist yet." A team deciding whether their circuit fits on an available noisy device this quarter needs Qiskit's transpilation numbers. A team deciding whether an algorithm is even worth continued investment, years before fault-tolerant hardware exists, needs the Resource Estimator. Neither tool is a substitute for the other, and the honest distinction — not "Azure Quantum's is simply better" — is that Microsoft built a standardized, integrated, free service specifically for the fault-tolerant-planning question, while that same kind of standardized integration doesn't exist inside Qiskit's own core toolchain for that specific question.

## A verified illustrative comparison: gate counts are identical where the algorithm is identical

To ground this rather than leaving it abstract: counting the elementary steps in the teleportation protocol from Chapter 4 — state prep (`H`, `CNOT`), Bell-basis change (`CNOT`, `H`), two measurements, and two classically-controlled corrections — gives exactly **8** steps whether you write it as a Qiskit gate list or a Q# operation body (verified by literally counting both lists against each other). This is an important, if slightly deflating, point: gate/step counts for the *same algorithm* are the same regardless of which language you wrote it in, because the algorithm's actual quantum structure doesn't change based on syntax. What differs between the tools isn't how many gates teleportation needs — it's whether you have a standardized way to ask "what would this cost on hardware that doesn't exist yet," which is a question gate-counting alone never answers.

## Key terms

| Term | Meaning |
|---|---|
| Transpilation depth/gate-count analysis | Qiskit's near-term-hardware cost metrics: circuit depth, gate counts, connectivity-driven routing overhead |
| Fault-tolerant resource estimation | Azure Quantum's forward-looking projection of physical qubits/runtime on future error-corrected hardware |
| Hardware era | The implicit assumption (today's noisy hardware vs. future fault-tolerant hardware) each tool's numbers are answering for |

## Check yourself

A team asks "should we use Qiskit's transpiler output or Azure Quantum's Resource Estimator to decide if our algorithm is worth pursuing?" What follow-up question would you ask them before answering, based on the distinction this lesson draws?
