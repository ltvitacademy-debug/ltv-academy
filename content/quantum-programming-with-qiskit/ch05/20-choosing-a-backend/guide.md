# Choosing a Backend

Every circuit you've run so far has gone to a local simulator you fully control. The moment you point at real IBM Quantum hardware, you're choosing between multiple physical devices with different qubit counts, different layouts, different queues, and different native gate sets — and that choice meaningfully affects whether your circuit runs well, slowly, or at all.

## What you'll learn

- How to connect to IBM Quantum hardware through `qiskit-ibm-runtime`'s `QiskitRuntimeService`
- How to find the least-busy operational real backend programmatically
- The four real criteria that should drive backend selection: qubit count, queue length, connectivity, and basis gates
- Why you should always check the live IBM Quantum Platform dashboard instead of trusting a fixed device name or qubit count

## Connecting to the service and listing backends

`qiskit-ibm-runtime` is the current, supported library for talking to real IBM Quantum hardware — it replaced the older `qiskit-ibmq-provider`. Once you've saved or loaded your account credentials, you create a `QiskitRuntimeService` instance and ask it for backends:

```python
from qiskit_ibm_runtime import QiskitRuntimeService

service = QiskitRuntimeService(channel="ibm_quantum_platform")
backend = service.least_busy(operational=True, simulator=False)
print(backend.name, backend.num_qubits)
```

`least_busy(operational=True, simulator=False)` is doing real work here: it filters out any backend that's offline or under maintenance, excludes cloud simulators (you want actual hardware), and returns whichever remaining device currently has the shortest queue. This is usually a better starting point than hardcoding a device name, because which backends are available — and which one is quietest — changes over time and across accounts.

## Criterion 1: qubit count

Your circuit needs at least as many physical qubits as it uses logically. `backend.num_qubits` tells you how many are on the device. But "enough qubits" is necessary, not sufficient — a device with plenty of total qubits can still be a poor fit if your circuit's connectivity needs don't match how those qubits are wired together, which is the next criterion.

## Criterion 2: queue length

Real hardware is a shared, scarce resource. Every backend has a job queue, and you can check how backed up it currently is:

```python
status = backend.status()
print(status.pending_jobs)
```

A backend with fewer qubits but a short queue is often the better practical choice over a bigger, more popular device with a long line in front of you. `least_busy()` already factors this in when picking among candidates, but it's worth checking directly when you're deciding between a short list of backends that all meet your qubit and connectivity needs.

## Criterion 3: connectivity (the coupling map)

Qubits on real hardware are not all directly connected to each other. Each backend has a coupling map — a fixed graph of which physical qubit pairs support a native two-qubit gate. If your circuit applies a two-qubit gate between qubits that aren't adjacent on the device's coupling map, the transpiler has to insert extra SWAP gates to move the qubits' states into position first (covered in depth in the next lesson). A circuit whose entangling structure happens to match a backend's native connectivity well will transpile into far fewer gates than the same circuit run on a backend with a mismatched layout.

## Criterion 4: basis gate set

Different IBM processor families support different native gate sets — the specific single- and two-qubit gates the hardware can actually execute directly. Any circuit you write gets rewritten into this native set during transpilation regardless of what gates you used in `QuantumCircuit`. You don't usually need to hand-pick gates to match a basis set yourself, but it's worth knowing this is part of why the same abstract circuit can transpile very differently on two different backends.

## What changes over time — check the dashboard

IBM retires and introduces processors, adjusts free-tier access, and rebalances queues on an ongoing basis. Treat any specific device name, qubit count, or availability claim you read anywhere — including in this course — as a snapshot that may be stale. The IBM Quantum Platform dashboard is the authoritative, current source for which backends exist, how many qubits each has, and what their queues look like right now.

## Key terms

| Term | Meaning |
|---|---|
| `QiskitRuntimeService` | The `qiskit-ibm-runtime` class used to authenticate and interact with IBM Quantum backends |
| `least_busy()` | Service method that returns the operational, non-simulator backend with the shortest current queue |
| Coupling map | The fixed graph describing which physical qubit pairs on a backend support a native two-qubit gate |
| Basis gate set | The specific native gates a given backend can execute directly; all circuits are rewritten into this set before running |
| `pending_jobs` | A field on `backend.status()` showing how many jobs are currently queued ahead of yours |

## Check yourself

You have two real backends available: one has more total qubits but a long queue and a coupling map that doesn't match your circuit's entangling pattern well; the other has exactly enough qubits, a short queue, and connectivity that matches your circuit closely. Which would you choose, and what would you expect to happen differently if you ran the same circuit on each?
