# The Backend-Abstraction Pattern

Lesson 10 injected a backend as a parameter. This lesson formalizes *what kind of object* that parameter should be: a shared interface that a simulator, a noisy simulator, and real hardware all implement identically, so algorithm code never needs to know or care which one it's talking to.

## What you'll learn

- How to define an abstract backend interface in Python using `abc.ABC`
- Implementing that interface for a local simulator and a (mocked) real-hardware backend
- Why this pattern makes CI testing, local development, and production runs use the exact same algorithm code
- How to swap backends via configuration rather than code changes
- The specific place this pattern breaks down: backend-specific features you must deliberately exclude from the shared interface

## Defining the interface

An abstract base class defines the contract every backend must fulfill — in this case, "given a circuit and a shot count, return counts":

```python
from abc import ABC, abstractmethod
from qiskit import QuantumCircuit

class QuantumBackend(ABC):
    @abstractmethod
    def run(self, circuit: QuantumCircuit, shots: int) -> dict:
        """Execute circuit for the given number of shots, returning {bitstring: count}."""
        raise NotImplementedError

    @abstractmethod
    def name(self) -> str:
        """A human-readable identifier for logging and reproducibility records (Chapter 4)."""
        raise NotImplementedError
```

## Implementing it for a local simulator

```python
from qiskit_aer import AerSimulator

class LocalSimulatorBackend(QuantumBackend):
    def __init__(self, seed: int | None = None):
        self._sim = AerSimulator(seed_simulator=seed)
        self._seed = seed

    def run(self, circuit: QuantumCircuit, shots: int) -> dict:
        result = self._sim.run(circuit, shots=shots).result()
        return result.get_counts()

    def name(self) -> str:
        return f"aer-simulator(seed={self._seed})"
```

## Implementing it for real hardware

```python
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2

class IBMHardwareBackend(QuantumBackend):
    def __init__(self, backend_name: str):
        service = QiskitRuntimeService()
        self._backend = service.backend(backend_name)
        self._sampler = SamplerV2(mode=self._backend)

    def run(self, circuit: QuantumCircuit, shots: int) -> dict:
        job = self._sampler.run([circuit], shots=shots)
        result = job.result()[0]
        return result.data.meas.get_counts()

    def name(self) -> str:
        return f"ibm-hardware({self._backend.name})"
```

## Algorithm code never changes

With both implementations satisfying the same `QuantumBackend` interface, algorithm code written against the interface works unmodified against either:

```python
def run_bell_experiment(backend: QuantumBackend, shots: int = 1024) -> dict:
    qc = build_bell_pair()  # from Lesson 10
    counts = backend.run(qc, shots=shots)
    return counts

# CI / local dev:
run_bell_experiment(LocalSimulatorBackend(seed=42), shots=1024)

# Production, same function, zero changes:
run_bell_experiment(IBMHardwareBackend("ibm_brisbane"), shots=1024)
```

This is the direct payoff of Lesson 10's separation: because `run_bell_experiment` never imports `AerSimulator` or `QiskitRuntimeService` directly, swapping the backend is a one-line change at the call site, not a code change inside the algorithm.

## Swapping backends via configuration

Combine this with Lesson 2's config-file pattern so the backend choice itself lives outside code:

```python
def backend_from_config(config: dict) -> QuantumBackend:
    if config["backend_type"] == "simulator":
        return LocalSimulatorBackend(seed=config.get("seed"))
    elif config["backend_type"] == "ibm_hardware":
        return IBMHardwareBackend(config["backend_name"])
    raise ValueError(f"Unknown backend_type: {config['backend_type']}")
```

A CI environment variable or config file can now select "simulator" while a production deployment selects "ibm_hardware," with no code deployed differently between the two.

## Where the abstraction deliberately breaks down

Not every backend capability belongs in the shared interface, and forcing one in is a common over-engineering mistake. Real hardware exposes things a simulator fundamentally cannot: queue position, calibration data, qubit-specific error rates. Don't add `get_calibration_data()` to the shared `QuantumBackend` interface just because real hardware has it — a simulator would have to fake a meaningless return value. Instead, expose hardware-specific capabilities through a separate, optional interface (or a hardware-specific subclass) that algorithm code only reaches for when it explicitly knows it's targeting real hardware, rather than polluting the common contract every backend must implement.

## Key terms

| Term | Meaning |
|---|---|
| Abstract base class (ABC) | A Python class defining a method contract (via `@abstractmethod`) that subclasses must implement, without providing a usable implementation itself |
| Backend interface | The shared contract (e.g. `run()`, `name()`) that every concrete backend implementation (simulator, hardware) satisfies identically |
| Backend-from-config | Selecting which concrete backend implementation to instantiate based on external configuration rather than hardcoded logic |
| Capability leakage | The mistake of adding a hardware-specific feature to a shared interface that other backends can't meaningfully support |

## Check yourself

A teammate wants to add `get_queue_position()` to the shared `QuantumBackend` interface so "all backends have it." Explain why this lesson would flag that as capability leakage, and propose where `get_queue_position()` should live instead.
