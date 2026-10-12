# Reentrancy Audit Checklist

A real checklist, not a theory recap — walk any contract you write (or
review) through this before you consider it done. It's built directly
from the two independent fixes Chapter 10 teaches, plus the exact bug
pattern Chapter 8's `EnglishAuction.withdraw()` warns about.

## Step 1 — Find every external call

Search the contract for each of these:

- `.call(...)` or `.call{value: ...}(...)`
- `.transfer(...)`
- `.send(...)`
- a call into any other contract's function (including an interface
  reference like `nft.transferFrom(...)`)

Any one of these can hand control to code you don't own — which is
exactly the mechanism a reentrancy attack hijacks through a malicious
`fallback()` function.

## Step 2 — For each external call, check the order around it

```text
BAD  (the DAO hack / original EtherStore pattern):
  1. read balance
  2. send ETH out            <- external call happens here
  3. zero out the balance    <- too late, attacker already re-entered

GOOD  (checks-effects-interactions):
  1. check   — require(bal > 0)
  2. effects — balances[msg.sender] = 0
  3. interact — (bool sent,) = msg.sender.call{value: bal}("")
```

For every external call found in Step 1, confirm: **has every piece of
state that call depends on already been updated before the call runs?**
If any state write happens *after* the external call, that's the exact
bug class that drained the DAO and the original `EtherStore` in class.

## Step 3 — Check for a reentrancy guard as a second, independent layer

```solidity
contract ReentrancyGuard {
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
}
```

- Is `noReentrant` (or OpenZeppelin's `nonReentrant`) applied to every
  function that sends value or calls into another contract?
- In production code, is this OpenZeppelin's audited `ReentrancyGuard`
  rather than a hand-rolled one? (The course's own hand-rolled version
  exists to teach the mechanism — real deployed contracts should import
  the audited version instead.)

## Step 4 — Trace the attack path by hand

For any function that fails Step 2, write out the actual call sequence
an attacker's fallback would take, the same way the course traces the
`Attack` → `EtherStore` loop:

```text
1. attacker calls the vulnerable function
2. vulnerable function sends ETH -> triggers attacker's fallback()
3. fallback() calls the SAME vulnerable function again
4. does the check in step 1 still pass, because state wasn't updated yet?
```

If the answer to the last line is yes, it's exploitable — fix it with
Step 2's reordering, Step 3's guard, or (preferably) both.

## Step 5 — Don't forget non-obvious "external calls"

- Sending ETH to **any** address counts, even one that looks like a
  simple refund (this is exactly what made `EnglishAuction.withdraw()`
  risky before its fix).
- Calling into another team's contract (an NFT contract's
  `transferFrom`, a price oracle, etc.) counts too — you don't control
  what that contract's code actually does once it's called.

## Sign-off

- [ ] Every external call identified (Step 1)
- [ ] Every external call has checks-effects-interactions ordering (Step 2)
- [ ] A reentrancy guard is applied to every value-transferring function (Step 3)
- [ ] The attack path was traced by hand for each function that moves ETH or external assets (Step 4)
- [ ] Non-obvious external calls (refunds, cross-contract calls) were included, not just the obvious `withdraw()` (Step 5)
