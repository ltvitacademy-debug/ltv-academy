# Why Testing a Quantum Program Is Genuinely Different

`assertEqual` works when a function returns a deterministic value. A quantum circuit's measurement outcome is a random sample from a distribution — testing it requires a different vocabulary entirely, and conflating the two is the single most common quantum-testing mistake.

## What you'll learn

- Why `assertEqual(result, expected)` is the wrong tool for measurement outcomes, and where it's still the right tool
- The two genuinely different categories of quantum test: construction tests and statistical tests
- Why "the test passed once" and "the test is correct" are not the same claim for a probabilistic system
- What a flaky statistical test looks like, and why fixing it means fixing the tolerance or the shot count, not re-running until it passes
- How this chapter's lessons build on each other: construction tests, statistical tests, debugging, then a hands-on lab

## Two categories of test, not one

Every test you write against quantum code falls into one of two categories, and treating them the same way is the root of most bad quantum test suites:

1. **Construction tests** — deterministic checks of the circuit *before* it's run: gate count, qubit count, which parameters are bound where, whether a decomposition produced the expected gate sequence. These use ordinary `assertEqual`-style assertions because circuit construction is deterministic code, no different from testing a function that builds a list.
2. **Statistical tests** — checks of measurement *outcomes* after running the circuit some number of shots. These can never use exact equality, because the outcome is a random sample. They require a tolerance, a shot count, and a documented confidence level — covered in depth in Lesson 7.

## Where `assertEqual` is still correct

It's tempting to think "quantum code needs special testing" means every test must be statistical. That's wrong. If you're testing that `build_oracle(target=5, n_qubits=3)` produces a circuit with exactly 3 qubits and the right pattern of X gates marking the bitstring `101`, that's a construction test:

```python
def test_oracle_marks_correct_bitstring():
    circuit = build_oracle(target=5, n_qubits=3)
    assert circuit.num_qubits == 3
    x_gate_qubits = {instr.qubits[0]._index for instr, _, _ in circuit.data if instr.name == "x"}
    assert x_gate_qubits == {0, 2}  # bit pattern 101 -> qubits 0 and 2 need X-sandwiching
```

Nothing here is probabilistic. The oracle either has the right gates on the right qubits or it doesn't, and this test should pass or fail identically on every single run. Lesson 6 goes deep on this category.

## Where `assertEqual` breaks down

Now consider testing that a Hadamard gate on one qubit produces a fair coin flip. You cannot write `assert counts == {'0': 512, '1': 512}` — real sampling noise means you'll almost never see an exact 512/512 split even on perfectly correct code, and occasionally you'll see something like 480/544 purely by chance. This requires a statistical test with a calculated tolerance (Lesson 7), not a looser version of equality — the whole testing philosophy changes from "did this match exactly" to "is this sample consistent with the expected distribution within a confidence level I can justify."

## "Passed once" is not "is correct"

A statistical test that passed on one run tells you less than a construction test that passed once. Construction tests are deterministic — if `test_oracle_marks_correct_bitstring` passes, it will pass identically on every future run against unchanged code. A statistical test's single pass is itself a sample: given the inherent randomness, a statistical test on correct code can occasionally fail (a false negative, by design, at whatever confidence level you chose), and a statistical test on subtly broken code can occasionally pass (a false positive). This is why statistical tests need a stated confidence level — it's an explicit acknowledgment that the test itself has a known, calculated error rate, unlike a construction test.

## What a flaky statistical test actually means

If a statistical test fails intermittently on unchanged code, the instinct to "just re-run it" is exactly backwards. Intermittent failure on correct code means your tolerance is too tight for your shot count, which is a test design bug, not a fluke to ignore. The fix is either loosen the confidence threshold to match the stakes of what you're testing, or increase the shot count so sampling noise shrinks — both are concrete, calculable choices covered in Lesson 7, not a "run it again and see."

## How this chapter builds

- **Lesson 6** goes deep on construction tests: testing circuit structure without ever executing a circuit.
- **Lesson 7** builds the statistical-testing toolkit: z-tests and chi-square tests for measurement outcomes, with a worked, verified numeric example.
- **Lesson 8** covers debugging when a circuit's results are wrong — including distinguishing "this is a real bug" from "this is normal noise."
- **Lesson 9** is a hands-on lab combining all three into a real test suite.

## Key terms

| Term | Meaning |
|---|---|
| Construction test | A deterministic test of a circuit's structure (gates, qubits, parameters) before execution; never involves measurement randomness |
| Statistical test | A test of measurement outcomes after execution, requiring a tolerance and confidence level instead of exact equality |
| False negative (test) | A statistical test failing even though the underlying code is correct, due to normal sampling variance |
| False positive (test) | A statistical test passing even though the underlying code has a real bug, due to normal sampling variance |
| Confidence level | The stated probability threshold (e.g. alpha=0.01) a statistical test uses to decide pass/fail, acknowledging its own built-in error rate |

## Check yourself

A teammate writes `assert counts['00'] > 400` to test a Bell state circuit with 1024 shots, and says "it's basically a statistical test since it's not exact equality." Explain what's actually missing from their test that a real statistical test (covered in Lesson 7) would include.
