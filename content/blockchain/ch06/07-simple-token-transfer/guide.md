# Lesson 7 — A Simple Token Transfer Function

**Chapter 6 · Token Standards · Lesson 7 of 7**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- A real, complete token transfer function — the exact shape every ERC-20 uses
- Why the `require` check has to come before the balance changes, not after
- How `indexed` on both addresses makes a transfer searchable by sender or receiver
- How this one function ties together everything else in this chapter

## The real thing, all at once

Introduced directly by the instructor as: *"This is going to be a simple
token transfer example using an event."*

![The complete, real transfer function from class — mappings, a require guard, balance updates, and an event, all working together.](/courses/blockchain/ch06/07-simple-token-transfer/shot_transfer_function_complete.png)
*Every concept from this chapter, combined into one real, working function.*

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function transfer(address to, uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient funds");

    balances[msg.sender] -= amount;
    balances[to] += amount;

    emit Transfer(msg.sender, to, amount);
}
```

## Why the order of operations matters

1. **`require(balances[msg.sender] >= amount, "Insufficient funds")`**
   — check first. If the sender doesn't have enough, the entire
   transaction reverts immediately — none of the balance changes below
   it ever happen.
2. **`balances[msg.sender] -= amount;`** — subtract from the sender.
3. **`balances[to] += amount;`** — add to the receiver.
4. **`emit Transfer(msg.sender, to, amount);`** — announce that it
   happened, only after the state has actually changed.

## Both addresses are indexed — on purpose

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

Marking **both** `from` and `to` as `indexed` means a block explorer or
front end can search this event two different real ways: *"show me
every transfer this address ever sent"* or *"show me every transfer
this address ever received."* `amount` is left un-indexed since you
wouldn't typically search a log by exact amount.

## Everything in this chapter, in one function

Look at how much of Chapter 6 shows up in these five real lines:

- **A mapping** (`balances`) — Lesson 1.
- **A `require` guard** — the same pattern from Lesson 3's
  `removeAtIndex`.
- **State-changing arithmetic on a mapping's values** — the same shape
  as Lesson 4's struct-and-mapping combination.
- **A real `event`, fired with `emit`** — Lesson 6.

This is genuinely the core of what an ERC-20 token contract does: it's
a mapping of balances, guarded by requires, updated by arithmetic, and
announced by events. Everything more elaborate that a real token
contract adds — allowances, minting, burning — builds directly on top
of this same real shape.

## Key terms

| Term | Meaning |
|---|---|
| require-then-mutate-then-emit | The real, standard order of operations in a state-changing function |
| indexed (both sides) | Lets a transfer be searched by sender or by receiver |

## Check yourself

You've finished Chapter 6 when you can explain, in your own words, why
the `require` check in this function has to run *before* any balance is
changed, not after.
