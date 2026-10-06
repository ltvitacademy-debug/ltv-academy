# Script — Fuzz Testing With Foundry

## Segment 1 (title)

Writing a separate test for every boundary value is tedious and you'll still miss cases. Fuzz testing flips that: give the test a parameter instead of a hard-coded value, and Forge calls it hundreds of times with random input.

## Segment 2 (code: fuzz test syntax)

Any typed parameter on a test function gets fuzzed automatically — Forge runs it 256 times by default, each with a different random value, and reports a failure the moment any run breaks your assertion.

## Segment 3 (code: constraining input)

Most functions don't accept any uint256 — there are real constraints. vm.assume throws away runs outside your range; bound clamps the fuzzed value into the range instead, so every run counts. bound is usually the better choice.

## Segment 4 (code: foundry.toml fuzz config)

The fuzz table in foundry.toml tunes the campaign — raise runs from the 256 default to a thousand or more for a wider search, and set a fixed seed to make a failing run reproducible when you need to debug it.

## Segment 5 (outro)

A fuzz test still only calls one function, once, per run. It doesn't test sequences across multiple functions and actors — that's exactly what invariant testing adds, next.
