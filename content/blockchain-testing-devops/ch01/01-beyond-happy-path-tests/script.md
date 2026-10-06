# Script — Beyond Happy-Path Tests

## Segment 1 (title)

A test that only calls your function correctly, once, with valid input, proves almost nothing. Most real-world smart contract exploits happened on code paths nobody wrote a test for.

## Segment 2 (code: the happy path)

Here's a typical happy-path test: deposit a clean amount, withdraw it, check the balance. It's not wrong to write — it just proves the function works once, called correctly, by someone not trying to break it.

## Segment 3 (code: the failure paths)

A rigorous test asserts the opposite: that withdrawing more than the balance reverts with the right error, and that an unauthorized caller can't reach a privileged function at all. Foundry's expectRevert and prank cheatcodes are built exactly for this — asserting failure, not just success.

## Segment 4 (steps: five categories)

Rigorous coverage means five categories: the happy path, boundary values like zero and max uint, every revert condition actually firing, access control holding under an unauthorized caller, and state staying correct across call sequences a single test never exercises.

## Segment 5 (outro)

The happy path is the easy ten percent. Lesson 2 automates the rest — fuzz testing throws thousands of boundary values at a function automatically, instead of you writing them by hand.
