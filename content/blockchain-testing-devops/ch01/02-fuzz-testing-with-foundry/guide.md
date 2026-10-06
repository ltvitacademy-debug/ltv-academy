# Lesson 2 — Fuzz Testing With Foundry

**Chapter 1 · Testing Smart Contracts Rigorously · Lesson 2 of 29**

## What you'll learn

- How a fuzz test differs from a regular test: Foundry supplies the inputs, not you
- The real syntax for a fuzz test function, and how many runs Forge executes by default
- How `vm.assume` and `bound()` keep random inputs inside a range your contract can actually handle
- How to tune fuzzing behavior (run count, seed) in `foundry.toml`

## Let Forge pick the inputs

Lesson 1 ended with boundary values: zero, the threshold, `type(uint256).max`. Writing a separate test for each one is tedious and you'll still miss cases. A **fuzz test** solves this differently — give the test function a parameter instead of a hard-coded value, and Forge calls it repeatedly with randomly generated inputs:

```solidity
function testFuzz_SetNumber(uint256 x) public {
    counter.setNumber(x);
    assertEq(counter.number(), x);
}
```

Forge runs this function repeatedly with different random values instead of a single execution — by default, **256 test cases per fuzz function**. Any function parameter Forge recognizes (uint, int, address, bytes, etc.) gets fuzzed automatically; you don't opt in per-parameter.

## Constraining the input space

Most functions don't accept *any* uint256 — they have real constraints (an amount can't exceed a user's balance, a percentage can't exceed 100). Two cheatcodes narrow the fuzzer's input space to values worth testing:

```solidity
// Reject (don't count) any run outside the range
vm.assume(amount > 0 && amount <= 1000 ether);

// Clamp the value into the range instead of rejecting the run
amount = bound(amount, 1, 1000 ether);
```

`vm.assume` throws away runs that don't satisfy the condition — too many rejected runs and Forge gives up (`max_test_rejects` in `foundry.toml`). `bound()` is usually the better choice: it *clamps* whatever value the fuzzer picked into your range, so every run counts instead of a fraction of them being discarded.

## Tuning the campaign

`foundry.toml`'s `[fuzz]` table controls the campaign:

```toml
[fuzz]
runs = 1000
max_test_rejects = 65536
seed = "0x1234"
```

Raising `runs` from the 256 default to 1000+ trades CI time for a wider random search — a reasonable trade to make in a dedicated CI job (Chapter 2) even if local runs stay fast. A fixed `seed` makes a fuzzing run reproducible, which matters when a fuzz failure needs to be debugged by re-running the exact same sequence.

## What fuzzing still doesn't do

A fuzz test still only calls **one function, once, per run**. It's a powerful upgrade over hand-picked boundary values, but it doesn't test sequences of calls across multiple functions and multiple actors — that's what Lesson 3's invariant testing adds.

## Key terms

| Term | Meaning |
|---|---|
| Fuzz test | A test function whose parameters Forge fills with random values across many runs |
| `vm.assume` | Rejects (doesn't count) a fuzz run that doesn't satisfy a condition |
| `bound()` | Clamps a fuzzed value into a given range instead of rejecting the run |
| `runs` | The number of random inputs Forge generates per fuzz test (default 256) |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why is `bound()` usually preferred over `vm.assume` for constraining a fuzzed input?
