# Architecture Lab

Hands-on lab: take a single tangled "does everything" function and refactor it through every layer this chapter built — separated construction/execution, a backend interface, and an optional SDK-adapter boundary — then verify the refactor didn't change behavior.

## What you'll learn

- A full refactor walkthrough, start to finish, on one realistic function
- How to verify a refactor is behavior-preserving using the statevector check from Lesson 8
- Where to stop adding abstraction layers for a project that doesn't need multi-SDK support
- A practical architecture review checklist you can apply to any quantum module
- How this chapter's pattern connects forward to Chapter 4's reproducibility requirements

## The starting point: a tangled function

```python
def estimate_ghz_fidelity(n_qubits, shots=2048, use_real_hardware=False):
    from qiskit import QuantumCircuit
    qc = QuantumCircuit(n_qubits)
    qc.h(0)
    for i in range(1, n_qubits):
        qc.cx(0, i)
    qc.measure_all()

    if use_real_hardware:
        from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2
        service = QiskitRuntimeService()
        backend = service.backend("ibm_brisbane")
        sampler = SamplerV2(mode=backend)
        job = sampler.run([qc], shots=shots)
        counts = job.result()[0].data.meas.get_counts()
    else:
        from qiskit_aer import AerSimulator
        sim = AerSimulator()
        counts = sim.run(qc, shots=shots).result().get_counts()

    n_correct = counts.get("0" * n_qubits, 0) + counts.get("1" * n_qubits, 0)
    fidelity_estimate = n_correct / shots
    print(f"Fidelity: {fidelity_estimate}")
    return fidelity_estimate
```

This single function has every problem Lessons 10–11 warned about: construction and execution fused, a backend chosen via a boolean flag instead of injection, and no way to test the circuit logic without running a backend.

## Step 1: extract pure circuit construction (Lesson 10)

```python
def build_ghz_circuit(n_qubits: int) -> QuantumCircuit:
    qc = QuantumCircuit(n_qubits)
    qc.h(0)
    for i in range(1, n_qubits):
        qc.cx(0, i)
    qc.measure_all()
    return qc
```

## Step 2: inject the backend via the shared interface (Lesson 11)

```python
def run_and_get_counts(circuit: QuantumCircuit, backend: QuantumBackend, shots: int) -> dict:
    return backend.run(circuit, shots=shots)
```

## Step 3: extract the analysis logic (Lesson 2's separation principle)

```python
def fidelity_from_counts(counts: dict, n_qubits: int, shots: int) -> float:
    n_correct = counts.get("0" * n_qubits, 0) + counts.get("1" * n_qubits, 0)
    return n_correct / shots
```

## Step 4: compose them, with the backend now a parameter

```python
def estimate_ghz_fidelity(n_qubits: int, backend: QuantumBackend, shots: int = 2048) -> float:
    qc = build_ghz_circuit(n_qubits)
    counts = run_and_get_counts(qc, backend, shots)
    return fidelity_from_counts(counts, n_qubits, shots)
```

Calling code now chooses the backend explicitly and uniformly:

```python
estimate_ghz_fidelity(4, backend=LocalSimulatorBackend(seed=42))     # dev/CI
estimate_ghz_fidelity(4, backend=IBMHardwareBackend("ibm_brisbane")) # production
```

## Verifying the refactor is behavior-preserving

A refactor that changes structure without changing behavior needs proof, not assumption. Use the statevector technique from Lesson 8 to confirm `build_ghz_circuit` produces the identical circuit the original inline code did:

```python
def test_refactored_circuit_matches_original_structure():
    qc = build_ghz_circuit(3)
    gate_names = [instr.operation.name for instr in qc.data if instr.operation.name != "measure"]
    assert gate_names == ["h", "cx", "cx"]  # identical to the original inline construction

def test_each_extracted_function_independently():
    # Construction test (Lesson 6) -- no backend needed
    qc = build_ghz_circuit(3)
    assert qc.num_qubits == 3
    # Pure analysis test -- no circuit or backend needed at all
    fidelity = fidelity_from_counts({"000": 900, "111": 80, "010": 20}, n_qubits=3, shots=1000)
    assert abs(fidelity - 0.98) < 1e-9
```

Notice the second test demonstrates the real payoff: `fidelity_from_counts` is now testable with a hand-constructed counts dictionary and zero quantum execution at all — impossible in the original tangled function.

## When to stop adding layers

This refactor stopped at the backend-abstraction layer (Lesson 11) and deliberately did not add an SDK-adapter layer (Lesson 12), because this project only targets Qiskit-compatible backends. Adding a `SDKAdapter` abstraction here, with no second SDK in sight, would be exactly the speculative over-engineering Lesson 12 warned against.

## Architecture review checklist

- [ ] Circuit construction, execution, and analysis are in separate functions
- [ ] The backend is a parameter, never hardcoded or selected via a boolean flag
- [ ] Each extracted function has an independent test that doesn't require the others
- [ ] No abstraction layer exists that the project doesn't currently need (Lesson 12's warning)
- [ ] The composed top-level function reads as a short, readable sequence of calls

## Key terms

| Term | Meaning |
|---|---|
| Behavior-preserving refactor | A restructuring of code that changes its organization without changing its observable behavior |
| Boolean-flag backend selection | An anti-pattern (like `use_real_hardware=True/False`) where backend choice is hardcoded as a branch instead of injected as a parameter |
| Architecture review | A deliberate check of a module's structure against separation-of-concerns and abstraction-appropriateness criteria |

## Check yourself

The refactored `estimate_ghz_fidelity` still hardcodes the fidelity formula (`"0"*n_qubits` and `"1"*n_qubits` as the only "correct" outcomes) inside `fidelity_from_counts`. Is this a structural problem this lab's refactor should have fixed, or a reasonable scope boundary? Justify your answer using this chapter's principles.
