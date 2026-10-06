# Lesson 3 — Invariant Testing

**Chapter 1 · Testing Smart Contracts Rigorously · Lesson 3 of 29**

## What you'll learn

- What an "invariant" is: a property that must hold true no matter what sequence of calls happens
- The real syntax for an `invariant_` test function and `targetContract()`
- Why real invariant suites use a **handler** contract instead of fuzzing the real contract directly
- What "ghost variables" are and why handlers track them

## A property that must always hold

Lesson 2's fuzz tests still call one function, once, per run. Real contracts get broken by *sequences*: deposit, deposit, withdraw, deposit, withdraw, withdraw — hundreds of calls in random order, from random actors. An **invariant** is a property that has to stay true no matter what that sequence looks like — for example, "this vault can never pay out more ETH than was ever deposited into it."

```solidity
contract VaultInvariantTest is Test {
    Vault vault;

    function setUp() public {
        vault = new Vault();
        targetContract(address(vault));
    }

    function invariant_SolvencyCheck() public view {
        assertGe(address(vault).balance, vault.totalDeposits());
    }
}
```

`targetContract()` tells Forge which contract to fuzz calls against. Forge then generates a random sequence of calls to that contract's public functions, checking `invariant_SolvencyCheck` after every single call in the sequence — not just once at the end.

## Why real suites use a handler

Fuzzing a contract's raw public functions directly usually wastes most of the run on calls Forge has no way to constrain — deposit amounts with no realistic bound, withdrawals to addresses that were never set up as actors. A **handler** contract wraps the real contract's functions, constrains the inputs the same way `bound()` did in Lesson 2, and tracks cumulative state Forge can check against:

```solidity
contract VaultHandler is Test {
    uint256 public ghost_depositSum;
    uint256 public ghost_withdrawSum;

    function deposit(uint256 amount, uint256 actorSeed) external useActor(actorSeed) {
        amount = bound(amount, 0.01 ether, 10 ether);
        vault.deposit{value: amount}();
        ghost_depositSum += amount;
    }
}
```

`ghost_depositSum` is a **ghost variable** — state that doesn't exist on the real contract, kept purely so the invariant test can check that the real contract's balance matches what the handler actually sent it. `targetContract()` then points at the *handler*, not the vault directly, so Forge only calls the constrained, trackable entry points.

## Running it

```bash
forge test --match-contract VaultInvariantTest
```

When an invariant fails, Forge prints the exact call sequence that broke it, so you can reproduce the failure deterministically instead of guessing which of hundreds of random calls caused it.

## Key terms

| Term | Meaning |
|---|---|
| Invariant | A property that must hold true after any sequence of calls |
| `targetContract()` | Tells Forge which contract's functions to fuzz-call |
| Handler | A wrapper contract that constrains inputs and tracks ghost state |
| Ghost variable | Off-chain tracking state a handler keeps purely for invariant checks |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why do real invariant suites fuzz a handler contract instead of fuzzing the target contract's public functions directly?
