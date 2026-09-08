# Lesson 10 — Minting & Burning Your Own Tokens

**Chapter 6 · Token Standards · Lesson 10 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What the leading underscore on a function name really signals
- How to write real internal `_mint` and `_burn` logic
- Why minting and burning both use `address(0)` in their events
- The real difference between an internal function and its external wrapper

## What a leading underscore actually means

> "If you see a function that starts with an underscore at the
> beginning of its name, it's there for clarity, and it signals that
> function is not meant to be called directly by users or external
> contracts. It's used internally within the contract or by derived
> contracts."

## _mint: creating real new tokens

![The complete, real internal `_mint` and `_burn` functions, plus their public `mint` and `burn` wrappers.](/courses/blockchain/ch06/10-erc20-mint-burn/shot_mint_burn_functions.png)
*Four real functions: two internal engines, and two external doors that call them.*

```solidity
function _mint(address to, uint256 amount) internal {
    balanceOf[to] += amount;
    totalSupply += amount;
    emit Transfer(address(0), to, amount);
}
```

Minting does two real, necessary things: it increases the recipient's
balance, **and** it increases `totalSupply` — new tokens are actually
being created, not moved from somewhere else. That's why the
`Transfer` event uses `address(0)` as the "from" address: **this is
one of the only real cases where using the zero address is correct** —
there genuinely is no real sender, since these tokens didn't exist a
moment ago.

## _burn: the real inverse operation

```solidity
function _burn(address from, uint256 amount) internal {
    balanceOf[from] -= amount;
    totalSupply -= amount;
    emit Transfer(from, address(0), amount);
}
```

Burning permanently destroys tokens — it decreases both the holder's
balance and the real total supply. The tokens don't go anywhere; they
simply **cease to exist**, which is why `address(0)` appears as the
"to" address this time.

## Why both an internal and an external version exist

```solidity
function mint(address to, uint256 amount) external {
    _mint(to, amount);
}

function burn(address from, uint256 amount) external {
    _burn(from, amount);
}
```

The `internal` versions hold the real logic; the `external` versions
are what a user or another contract actually calls. Keeping them
separate is what lets other contracts safely reuse `_mint` and `_burn`
internally — for example, from a constructor — **without needing to
re-implement the same logic twice.**

## A real, important warning

Note that in this specific version, the external `mint` and `burn`
functions have **no access restriction** — anyone can call them. A
real production token would almost always guard these with an
`onlyOwner` modifier (from Chapter 6's earlier lesson) so that only a
designated address can actually create or destroy supply.

## Key terms

| Term | Meaning |
|---|---|
| _mint / _burn | Internal logic that creates or destroys tokens |
| address(0) | The zero address — the only real case where it's meaningfully used, standing in for "no sender" or "no recipient" |
| internal vs. external | Reusable core logic vs. the actual entry point callers use |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why a real production ERC-20 token would want to restrict who
can call `mint`.
