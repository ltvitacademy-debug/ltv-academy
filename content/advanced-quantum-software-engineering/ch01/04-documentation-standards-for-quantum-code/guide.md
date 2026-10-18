# Documentation Standards for Quantum Code

A docstring that says "builds the oracle" tells a reader nothing they couldn't guess from the function name. Quantum functions need to document things classical functions usually don't: which qubits play which role, what the expected output distribution looks like, and what assumptions about shots and backend the function was validated against.

## What you'll learn

- Why quantum docstrings need extra fields that classical docstrings don't: qubit roles, expected distribution, validated backend
- A concrete docstring template for a circuit-construction function
- How to document a statistical test's tolerance and the reasoning behind it, not just its pass/fail logic
- What belongs in a package-level README vs. a function-level docstring for a quantum library
- Where to record "visualize this to understand it" — figures that explain intent, not test results

## What a classical docstring is missing for quantum code

A typical Google-style or NumPy-style docstring documents parameters, return value, and raised exceptions. For quantum code, that's necessary but not sufficient. Consider a function that builds a 3-qubit GHZ state:

```python
def build_ghz_circuit(n_qubits: int) -> QuantumCircuit:
    """Builds an n-qubit GHZ state circuit.

    Args:
        n_qubits: Number of qubits in the GHZ state (must be >= 2).

    Returns:
        A QuantumCircuit implementing H(0), then CX(0,i) for i in 1..n_qubits-1.
    """
```

This is a perfectly fine classical-style docstring, and it's still missing the information a quantum reader actually needs: what should the output measurement distribution look like if this is correct? What was it validated against? A revised version:

```python
def build_ghz_circuit(n_qubits: int) -> QuantumCircuit:
    """Builds an n-qubit GHZ state circuit.

    Circuit: H(0), then CX(0, i) for i in 1..n_qubits-1.

    Args:
        n_qubits: Number of qubits in the GHZ state (must be >= 2).

    Returns:
        A QuantumCircuit implementing the GHZ state preparation above.

    Expected measurement distribution:
        Ideally, only the all-zeros ('000...0') and all-ones ('111...1')
        bitstrings should appear, each with probability ~0.5. See
        tests/test_ghz.py::test_ghz_statistical_distribution for the
        statistical test (chi-square, alpha=0.01) that validates this.

    Validated against:
        qiskit-aer 0.15.1 statevector simulator, and ibm_brisbane hardware
        (see docs/hardware_validation.md for the noisy-hardware tolerance
        used there, which is wider than the simulator tolerance).
    """
```

The second version tells a reader three things the first one doesn't: what "correct" looks like statistically, where the test living that claim is, and which backends it's actually been checked against.

## A docstring template for circuit-construction functions

Adopt a consistent template across a package so every circuit-building function documents the same fields:

| Field | Purpose |
|---|---|
| `Circuit:` | A one-line description of the gate sequence, for a reader who doesn't want to read the code |
| `Qubit roles:` | Which qubit indices play which logical role (e.g. "qubits 0-2 are the oracle's input register, qubit 3 is the ancilla") |
| `Expected measurement distribution:` | What a correct run should statistically look like, in enough detail to write a test against |
| `Validated against:` | Which backend(s) and SDK version(s) this function's expected behavior was actually confirmed on |

## Documenting a statistical test's tolerance

A statistical test (Chapter 2) without documentation of *why* its tolerance is what it is becomes impossible to maintain. A bare `assert z_score < 3` tells a future maintainer nothing about what would happen if they changed the shot count. Document the reasoning next to the test:

```python
def test_bell_state_correlation():
    """Checks the Bell state |00> + |11> shows the expected ~50/50 split.

    Uses a z-test against p=0.5 with alpha=0.01 (|z| < 2.58 to pass).
    At 1024 shots, this tolerance allows phat to range roughly between
    0.46 and 0.54 before failing -- tight enough to catch a genuinely
    biased circuit, loose enough to tolerate normal sampling variance.
    Raising shots to 4096 would tighten this range by about half.
    """
```

## README vs. docstring

A package-level `README.md` should answer "what is this library for and how do I install it" — not restate every function's docstring. For a quantum package specifically, the README should also state the SDKs and versions it targets (linking to the pinned `pyproject.toml` from Chapter 3), and link to a `docs/hardware_validation.md` recording which real backends the package has actually been tested against, since that's information a user needs before trusting results on their own hardware account.

## Key terms

| Term | Meaning |
|---|---|
| Qubit role documentation | Explicitly stating which qubit index serves which logical purpose (input, ancilla, output) in a circuit's docstring |
| Expected measurement distribution | The statistical shape a correct circuit's output should have, documented precisely enough to write a test against |
| Validated against | A documentation field recording which specific backend and SDK version a function's claimed behavior was actually confirmed on |
| Tolerance rationale | Documentation explaining why a statistical test's pass/fail threshold was set where it was, not just the threshold itself |

## Check yourself

Rewrite this docstring to include the two quantum-specific fields this lesson argues are missing: `def build_bell_pair(): """Builds a Bell pair circuit. Returns: A 2-qubit QuantumCircuit."""`. You don't need to write the circuit code — just the improved docstring text.
