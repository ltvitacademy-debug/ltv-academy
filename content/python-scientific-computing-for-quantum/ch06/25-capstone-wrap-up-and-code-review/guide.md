# Capstone: Wrap-Up & Code Review

The toolkit runs. That's not the same question as "is the toolkit correct, tested, and something another person could pick up and trust?" This closing lesson is a real code review of what you built in Lessons 22-24, using the same habits a working quantum-software team would actually use.

## What you'll learn

- How to review numerical code against known, exactly-computable facts rather than "it looks right"
- A concrete test checklist for the toolkit's three modules
- What documentation the toolkit still needs before someone else could use it
- How to assess test coverage honestly, including what's still missing
- What a reasonable "next step" looks like once the core toolkit is solid

## Reviewing correctness against known facts, not intuition

The single most useful code-review question for numerical code is: "what specific, independently-verifiable fact should this function's output match, and does it?" For this toolkit, three such facts are already established from Lessons 23-24, and a reviewer should check the code against exactly these:

- `apply_gates([kron_gate(H, I), CNOT], zero_state(2))` must equal `[0.707107, 0, 0, 0.707107]` (confirmed in Lesson 23 via step-by-step matrix-vector multiplication).
- `probabilities(bell_state)` must equal `[0.5, 0, 0, 0.5]`, never anything with nonzero probability on `|01>` or `|10>` (confirmed in Lesson 24 — any other pattern means the gates or the probability function have a bug).
- `bloch_coordinates([1/sqrt(2), 1/sqrt(2)])` must equal `(1, 0, 0)` within floating-point tolerance (confirmed in Lesson 24).

A review that only checks "does it run without crashing" would miss a sign error that produces a different, equally plausible-looking (but wrong) state — exactly the kind of bug Lesson 23 warned about.

## A concrete test checklist

Turning the three facts above into actual automated tests closes the loop between "I reviewed it once" and "it stays correct as the code changes":

```python
# tests/test_toolkit.py
import numpy as np
from gates import H, I, CNOT, kron_gate
from simulate import zero_state, apply_gates, probabilities
from visualize import bloch_coordinates

def test_bell_state_construction():
    state = apply_gates([kron_gate(H, I), CNOT], zero_state(2))
    expected = np.array([1/np.sqrt(2), 0, 0, 1/np.sqrt(2)])
    assert np.allclose(state, expected)

def test_bell_state_probabilities():
    state = apply_gates([kron_gate(H, I), CNOT], zero_state(2))
    probs = probabilities(state)
    assert np.allclose(probs, [0.5, 0, 0, 0.5])

def test_plus_state_bloch_coordinates():
    plus_state = np.array([1/np.sqrt(2), 1/np.sqrt(2)])
    x, y, z = bloch_coordinates(plus_state)
    assert np.allclose([x, y, z], [1, 0, 0])
```

Each test uses `np.allclose` rather than `==`, applying Chapter 5's floating-point-tolerance lesson directly — these numbers involve `1/sqrt(2)`, which has no exact finite binary representation, so exact equality would fail even on correct code.

## What documentation is still missing

Code review isn't only about correctness — it's also "could someone else use this without reading every line?" At minimum, the toolkit needs: a short README stating its scope (1-2 qubits, X/H/CNOT gate set — and explicitly, what it does *not* support, per Lesson 22's scoping decision), a docstring on each public function stating its expected input shape and what it returns, and one worked example (the Bell-state walkthrough from Lessons 23-24) that a new user can run first to confirm their setup works.

## Assessing test coverage honestly

The three tests above cover the toolkit's main success path — but an honest review also names what's *not* yet tested: there's no test for an invalid input (e.g. calling `probabilities` on a non-normalized vector), no test for a single-qubit-only circuit (every test so far uses 2 qubits), and no test that `apply_gates` behaves correctly with an empty gate list. None of these gaps make the toolkit wrong — but naming them explicitly, rather than silently treating "the tests I happened to write" as "full coverage," is itself the honest documentation habit from Chapter 5 applied to testing instead of numerical results.

## What's a reasonable next step

Chapter 6 deliberately scoped this toolkit to 1-2 qubits and a three-gate set (Lesson 22). With the core correct and tested, legitimate next steps — explicitly *not* required to call this capstone done — include: adding a Pauli-Z or phase gate, extending `kron_gate` logic to build an arbitrary n-qubit identity-padded gate automatically instead of calling `np.kron` by hand each time, or adding a simple noise model. Recognizing that the current, smaller version is genuinely finished — rather than perpetually "almost done" while scope keeps growing — is the same discipline Lesson 22 opened with.

## Key terms

| Term | Meaning |
|---|---|
| Known-fact test | A test that checks a function's output against an independently, exactly-computable result, rather than a vague "looks right" check |
| Test coverage | How much of a codebase's behavior (including edge cases) is actually exercised by automated tests; honest review names the gaps, not just the successes |
| `np.allclose` | Compares arrays for equality within a floating-point tolerance, used here because `1/sqrt(2)` has no exact finite binary representation |
| Scope discipline | Treating a deliberately limited, well-tested version of a project as genuinely finished, rather than continuously expanding scope before shipping anything |

## Check yourself

Using the three known-fact tests in this lesson as a model, write (in words, not code) what a fourth test for a single-qubit-only circuit should check, and what exact expected numeric result it should assert.
