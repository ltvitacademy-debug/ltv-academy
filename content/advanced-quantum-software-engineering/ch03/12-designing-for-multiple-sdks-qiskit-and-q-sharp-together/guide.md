# Designing for Multiple SDKs: Qiskit & Q# Together

Teams increasingly need to support more than one quantum SDK — comparing results across them, or because different hardware partners require different toolchains. Doing this without the architecture from Lessons 10–11 produces an unmaintainable mess of SDK-specific branches threaded through every function.

## What you'll learn

- Why Qiskit and Q#/QDK can't share a process the way the backend-abstraction pattern's Python implementations do
- The SDK-adapter pattern: one more layer of abstraction above individual backends
- How to represent a circuit result in an SDK-neutral format for comparison or analysis
- A worked example: running the same logical algorithm on both SDKs and comparing results
- Where this pattern is worth the complexity, and where it isn't

## Why this is harder than swapping Qiskit backends

Lesson 11's `QuantumBackend` interface works because `LocalSimulatorBackend` and `IBMHardwareBackend` are both ordinary Python objects using Qiskit underneath — they can live in the same process, the same virtual environment, the same import graph. Q# is fundamentally different: it compiles through the QDK/.NET-based toolchain (or, for Azure Quantum, a separate service call), with its own package ecosystem that Lesson 3 already flagged as needing an isolated environment. You cannot simply write a `QSharpBackend(QuantumBackend)` class that imports `qsharp` alongside `qiskit` in the same file the way you could with two Qiskit-based backends.

## The SDK-adapter pattern

Add one more layer above the backend abstraction: an **SDK adapter** that represents "run this logical circuit description on SDK X" as a black-box operation, typically via a subprocess call or a thin RPC boundary, returning results in a shared, SDK-neutral format:

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class NeutralResult:
    """SDK-neutral representation of a measurement result."""
    counts: dict[str, int]
    shots: int
    sdk_name: str
    sdk_version: str

class SDKAdapter(ABC):
    @abstractmethod
    def run_bell_pair(self, shots: int) -> NeutralResult:
        """Run a standard Bell-pair circuit on this SDK and return a neutral result."""
        raise NotImplementedError
```

## The Qiskit adapter

```python
import qiskit

class QiskitAdapter(SDKAdapter):
    def __init__(self, backend: "QuantumBackend"):  # Lesson 11's interface
        self._backend = backend

    def run_bell_pair(self, shots: int) -> NeutralResult:
        qc = build_bell_pair()  # Lesson 10
        counts = self._backend.run(qc, shots=shots)
        return NeutralResult(counts=counts, shots=shots, sdk_name="qiskit", sdk_version=qiskit.__version__)
```

## The Q# adapter, isolated via subprocess

```python
import subprocess
import json

class QSharpAdapter(SDKAdapter):
    """Delegates to a separate qsharp-env/ virtual environment (Lesson 3)
    running a standalone script, rather than importing qsharp in-process."""

    def __init__(self, qsharp_env_python: str, script_path: str):
        self._python = qsharp_env_python  # e.g. "envs/qsharp-env/bin/python"
        self._script = script_path

    def run_bell_pair(self, shots: int) -> NeutralResult:
        proc = subprocess.run(
            [self._python, self._script, "--shots", str(shots)],
            capture_output=True, text=True, check=True,
        )
        data = json.loads(proc.stdout)
        return NeutralResult(
            counts=data["counts"], shots=shots,
            sdk_name="qsharp", sdk_version=data["qsharp_version"],
        )
```

The subprocess boundary is deliberate: it means the main process's dependency tree never has to reconcile Qiskit's and Q#'s packages, directly implementing the environment isolation Lesson 3 recommended.

## Comparing results across SDKs

Because both adapters return the same `NeutralResult` shape, cross-SDK comparison reuses the statistical-testing toolkit from Lesson 7 directly — the comparison is just "are these two count distributions statistically consistent with each other," the same chi-square-style reasoning applied to two samples instead of one sample against a theoretical expectation:

```python
def compare_sdks(qiskit_result: NeutralResult, qsharp_result: NeutralResult):
    assert qiskit_result.shots == qsharp_result.shots
    # Both SDKs implement the same logical Bell pair; counts should be
    # statistically consistent with each other within normal sampling variance.
    ...
```

## When the complexity is worth it

This pattern adds real overhead — process boundaries, a neutral result format, two separate environments to maintain. It's worth it when you have a genuine, ongoing need to run the same logical algorithm across SDKs: comparing hardware vendors, validating a result independent of any one SDK's potential bugs, or supporting customers who standardize on different toolchains. It is *not* worth it for a project that only ever targets one SDK — don't build the adapter layer speculatively "in case you need Q# later." Add it when a second SDK is an actual, current requirement, consistent with not over-engineering the backend interface in Lesson 11.

## Key terms

| Term | Meaning |
|---|---|
| SDK adapter | A layer representing "run this logical operation on SDK X" as a black-box call, used when SDKs can't coexist in one process |
| Neutral result format | A shared data structure (e.g. `NeutralResult`) that different SDK adapters all return, enabling cross-SDK comparison |
| Process/environment isolation | Running an incompatible SDK (like Q#) in a separate environment and process, communicating via subprocess or RPC rather than direct import |
| Speculative abstraction | Building a complex pattern (like a multi-SDK adapter) before there's an actual current need for it — generally worth avoiding |

## Check yourself

Explain, in your own words, why `QSharpAdapter` calls a subprocess rather than importing a `qsharp` Python package directly in the same process as `QiskitAdapter`, and connect this back to a specific concern raised in Lesson 3.
