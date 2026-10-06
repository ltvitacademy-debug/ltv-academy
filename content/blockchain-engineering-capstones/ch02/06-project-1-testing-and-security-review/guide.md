# Lesson 6 — Testing & Security Review

**Chapter 2 · Project 1 — A Full DeFi Protocol · Lesson 6 of 22**

## What you'll learn

- A three-layer testing pyramid for this pool: unit, fuzz, and invariant
  tests
- Real, verified Foundry syntax for a fuzz test and an invariant test
- A concrete, self-run security-review checklist — the same category of
  checks the Blockchain Testing & DevOps course applies to contracts
  generally, and the same AMM mechanics the DeFi & Token Engineering
  course covers, now applied to the pool you actually built
- Why emitting events matters for anything that will index this pool
  later

## The testing pyramid for this pool

- **Unit tests** confirm the happy path: deposit, swap, withdraw all
  behave as designed for specific, hand-picked numbers.
- **Fuzz tests** run the same function hundreds of times with randomized
  inputs, catching edge cases a handful of hand-picked numbers would
  never stumble into.
- **Invariant tests** check a property that must hold true no matter what
  sequence of calls happens — not "does this one function work," but
  "can anything ever break this rule."

A project with only unit tests has only proven the contract works when
used exactly as expected. Fuzz and invariant tests are what actually
probe for the failure modes real exploits come from.

## A fuzz test

```solidity
contract SimplePoolTest is Test {
    SimplePool pool;
    function setUp() public { pool = new SimplePool(tokenA, tokenB); }
    function testFuzz_Swap(uint256 amountIn) public {
        amountIn = bound(amountIn, 1, 1_000e18);
        uint256 kBefore = pool.reserveA() * pool.reserveB();
        pool.swapAforB(amountIn);
        assertGe(pool.reserveA() * pool.reserveB(), kBefore);
    }
}
```

Foundry fuzzes any parameter on a `test`-prefixed function automatically;
`bound()` clamps the randomized `amountIn` to a realistic range instead
of letting it run to nonsensical extremes. This test checks that a
fee-paying swap never decreases the pool's constant product — a direct,
executable check on the AMM mechanics this project's design is built on.

## An invariant test

```solidity
contract PoolInvariantTest is Test {
    SimplePool pool;
    function setUp() public { pool = deployPool(); targetContract(address(pool)); }
    function invariant_BalanceMatchesReserves() public view {
        assertGe(tokenA.balanceOf(address(pool)), pool.reserveA());
        assertGe(tokenB.balanceOf(address(pool)), pool.reserveB());
    }
}
```

`targetContract` tells Foundry to generate long, randomized sequences of
calls against the pool; `invariant_`-prefixed functions run after every
sequence. This one checks that the pool's actual token balance never
falls below what its own bookkeeping claims — exactly the class of
accounting bug that causes an insolvent pool, and exactly the kind of
property a single unit test could never catch because it depends on an
unpredictable sequence of calls, not one input.

## Security-review checklist

Run this checklist against your own contract, and write the results into
your README — a documented self-review is a real, honest deliverable,
even without a paid external audit:

- **Reentrancy**: confirmed checks-effects-interactions ordering in
  `swapAforB`, `swapBforA`, and `removeLiquidity` (Lesson 4).
- **Overflow/underflow**: covered automatically by Solidity 0.8's
  built-in checks — no manual `SafeMath` needed.
- **First-depositor / division-by-zero**: `addLiquidity`'s `totalShares
  == 0` branch avoids dividing by zero on the pool's first deposit;
  confirm a test covers this exact path.
- **Access control**: this pool is intentionally permissionless — no
  owner, no pause switch. State that explicitly, since "no access
  control" should be a stated decision, not an oversight.
- **Slippage / front-running**: flagged in Lesson 4 — swaps have no
  `minAmountOut`, so a transaction can be sandwiched or front-run for a
  worse price than quoted. State this as a known, unresolved limitation.
- **Rounding**: integer division in `addLiquidity` and `removeLiquidity`
  rounds down, which can trap tiny dust amounts in the pool over many
  operations — worth a one-line note, not a blocker for a teaching
  project.

## Events, for anything that indexes this pool later

```solidity
event Swap(address indexed trader, uint256 amountIn, uint256 amountOut, bool aForB);
event LiquidityAdded(address indexed provider, uint256 amtA, uint256 amtB, uint256 minted);
```

Emit one of these from each state-changing function. Nothing requires it
for the contract to function, but without events, reconstructing swap
history means replaying every block by hand — the same indexing problem
covered in this path's APIs & Backend material, just applied to your own
contract instead of a worked example.

## Key terms

| Term | Meaning |
|---|---|
| Fuzz test | A test run many times with randomized inputs to probe edge cases a fixed test case would miss |
| Invariant test | A property checked after long, randomized call sequences, rather than after one function call |
| `targetContract` | Foundry's call telling the invariant runner which contract to generate randomized call sequences against |

## Lab

Add `testFuzz_Swap` and `invariant_BalanceMatchesReserves` (or your own
variants) to your `test/` folder, run `forge test`, and write the
six-item security-review checklist above into your README with your own
findings for each line.

## Check yourself

- What does a fuzz test check that a unit test with fixed inputs cannot?
- What does `invariant_BalanceMatchesReserves` actually verify, and why
  does it matter for an AMM specifically?
- Name two items from the security-review checklist and what each one
  guards against.
