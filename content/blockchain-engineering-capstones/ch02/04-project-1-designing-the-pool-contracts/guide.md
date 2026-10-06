# Lesson 4 — Designing the Pool Contracts

**Chapter 2 · Project 1 — A Full DeFi Protocol · Lesson 4 of 22**

## What you'll learn

- The single-contract architecture this teaching pool uses, and why
- Real, simplified Solidity for `addLiquidity`, `swapAforB`, and
  `removeLiquidity`
- The design decisions that matter most for correctness: ordering of
  effects before external calls, and how first-depositor pricing works
- Exactly which parts of this contract are teaching simplifications, not
  production-ready code

**A note before the code:** everything in this lesson is simplified,
unaudited teaching code, written to be read and understood completely in
one sitting. It is not a drop-in replacement for a real, audited AMM, and
your own README should say so explicitly when you build on it.

## Architecture: one contract, no factory

A production AMM like Uniswap V2 splits responsibilities across a
factory (deploys pools), a pair contract (holds reserves), and often a
router (bundles multi-hop swaps for users). This teaching version
collapses all of that into one `SimplePool` contract holding two token
reserves directly — there's exactly one pool, for exactly two tokens,
and liquidity-provider shares are tracked with a plain `mapping` instead
of minting a separate ERC-20 LP token. A real implementation mints an
actual transferable LP token; this version trades that away for a
contract you can read start to finish in a few minutes.

## State

```solidity
pragma solidity ^0.8.24;
contract SimplePool {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint256 public reserveA;
    uint256 public reserveB;
    uint256 public totalShares;
    mapping(address => uint256) public shares;
}
```

Two token references, two reserve counters, a running total of LP
shares, and each address's own share balance.

## Adding liquidity

```solidity
function addLiquidity(uint256 amtA, uint256 amtB) external returns (uint256 minted) {
    tokenA.transferFrom(msg.sender, address(this), amtA);
    tokenB.transferFrom(msg.sender, address(this), amtB);
    minted = totalShares == 0 ? sqrt(amtA * amtB)
        : min(amtA * totalShares / reserveA, amtB * totalShares / reserveB);
    shares[msg.sender] += minted;
    totalShares += minted;
    (reserveA, reserveB) = (reserveA + amtA, reserveB + amtB);
}
```

The **first** depositor sets the pool's starting price implicitly —
there's no reserve ratio yet to match, so their shares are minted as
`sqrt(amtA * amtB)`. Every depositor after that mints shares
proportional to whichever side of their deposit is the smaller fraction
of the existing pool, which prevents a lopsided deposit from minting
more shares than it should.

## Swapping

```solidity
function swapAforB(uint256 amountIn) external returns (uint256 amountOut) {
    uint256 amtInFee = amountIn * 997 / 1000;
    amountOut = (amtInFee * reserveB) / (reserveA + amtInFee);
    tokenA.transferFrom(msg.sender, address(this), amountIn);
    reserveA += amountIn;
    reserveB -= amountOut;
    tokenB.transfer(msg.sender, amountOut);
}
```

This is the constant-product formula with a 0.3% fee baked in (`997 /
1000`): the more of token A you put in relative to the pool's reserve,
the worse your rate gets — that's what keeps the pool priced close to
the external market without an oracle. `swapBforA` mirrors this function
with the tokens reversed, rather than branching on a direction flag
inside one function — two small, readable functions instead of one
function with conditional logic in every line.

Notice the **order of operations**: reserves update, then the outbound
transfer happens last. That ordering — update your own state before
making an external call — is the checks-effects-interactions pattern,
and it's what prevents a malicious token contract from re-entering this
function mid-call and draining more than it should.

## Removing liquidity

```solidity
function removeLiquidity(uint256 sharesIn) external returns (uint256 amtA, uint256 amtB) {
    amtA = (sharesIn * reserveA) / totalShares;
    amtB = (sharesIn * reserveB) / totalShares;
    shares[msg.sender] -= sharesIn;
    totalShares -= sharesIn;
    (reserveA, reserveB) = (reserveA - amtA, reserveB - amtB);
    tokenA.transfer(msg.sender, amtA);
    tokenB.transfer(msg.sender, amtB);
}
```

A liquidity provider burns their shares and receives their proportional
slice of both reserves — again, state updates before the external
transfer calls.

## What this contract deliberately simplifies

- No reentrancy guard modifier — the checks-effects-interactions ordering
  above does the real work here, but a production contract would still
  add `nonReentrant` as defense in depth.
- No `minAmountOut` slippage parameter on swaps — a real swap function
  lets the caller specify the worst acceptable output and reverts
  otherwise. Lesson 6 flags this as a known gap.
- Solidity 0.8's built-in overflow/underflow checks replace the manual
  `SafeMath` library older contracts needed.
- LP shares use a `mapping`, not a minted ERC-20 token.

## Key terms

| Term | Meaning |
|---|---|
| Constant-product formula | The `x * y = k` pricing rule this pool's swap function approximates after fees |
| Checks-effects-interactions | Updating a contract's own state before making any external call, to block reentrancy |
| Reentrancy | An external call letting the called contract call back into the original function before it finishes, potentially draining funds |

## Lab

Write `SimplePool.sol` in your project's `contracts/` folder using the
functions above (plus `swapBforA`, `sqrt`, and `min` helpers — you can
use OpenZeppelin's `Math.sqrt` and `Math.min`, or write minimal versions
yourself). Add a short `TeachingToken.sol` — a plain OpenZeppelin ERC-20
with a public mint function — so you have two tokens to seed the pool
with locally. Confirm it compiles with `npx hardhat compile`.

## Check yourself

- Why does the first liquidity depositor's share amount use
  `sqrt(amtA * amtB)` instead of a ratio?
- What is checks-effects-interactions, and where does `swapAforB` apply
  it?
- Name two things this contract deliberately simplifies away from a
  production AMM.
