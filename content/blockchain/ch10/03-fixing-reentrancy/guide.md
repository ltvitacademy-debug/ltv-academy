# Lesson 3 — Fixing Reentrancy: Checks-Effects-Interactions & the Guard Modifier

**Chapter 10 · Security Auditing · Lesson 3 of 3**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding both real fixes in Remix.

## What you'll learn

- The real, one-line reorder that neutralizes the exploit from the previous lesson
- What "checks-effects-interactions" actually means, in practice
- How a real reentrancy guard modifier works, using a simple lock
- Why production code (like OpenZeppelin's) typically uses the guard, not just careful ordering

## Fix #1: checks-effects-interactions

> "First you do checks, then you make state changes or effects, and
> finally you perform external interactions, like sending ether or
> calling another contract."

![The real, fixed withdraw function — with the actual checks/effects/interactions comments the instructor added live to label each step.](/courses/blockchain/ch10/03-fixing-reentrancy/shot_checks_effects_interactions.png)
*The real fix: the balance is reset to zero **before** any ETH is ever sent.*

```solidity
function withdraw() public {
    uint256 bal = balances[msg.sender];

    // Check
    require(bal > 0, "Insufficient balance");

    // Effects
    balances[msg.sender] = 0;

    // Interactions
    (bool sent, ) = msg.sender.call{value: bal}("");
    require(sent, "Failed to send Ether");
}
```

Only one real change from the vulnerable version: **the balance reset
now happens before the external call, not after.** Now, if the
`Attack` contract's fallback tries to call `withdraw` again, `bal`
will already be `0`, and the `require(bal > 0)` check fails
immediately — the exploit is neutralized.

## Fix #2: a real reentrancy guard modifier

![The complete, real `ReentrancyGuard` contract — a single boolean lock and the modifier that checks and sets it.](/courses/blockchain/ch10/03-fixing-reentrancy/shot_reentrancy_guard_contract.png)
*A second, independent real defense: physically locking the function while it's running.*

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

The real idea: **lock the contract while a function is executing, so
only one call can run at a time.** If an attacker's fallback tries to
call back into a function guarded by `noReentrant` while the first call
is still running, `locked` is already `true` — the `require` fails,
and the nested call reverts immediately.

## Why this genuinely matters in production

The instructor's real, honest closing note: *"If you see a reentrancy
guard in the wild, from a popular project, they're going to be using
OpenZeppelin's reentrancy guard... it's widely accepted that this is
the safest way."* Real production contracts don't typically write
their own guard from scratch — they import OpenZeppelin's audited
version and apply its `nonReentrant` modifier directly to any function
that sends value or calls external contracts.

## Key terms

| Term | Meaning |
|---|---|
| Checks-effects-interactions | Verify conditions, then update state, then make external calls — in that order |
| Reentrancy guard | A lock (boolean) preventing a function from being re-entered while it's already running |
| noReentrant / nonReentrant | The real modifier name applied to functions that need this protection |

## Check yourself

You've finished Chapter 10 when you can explain, in your own words, why
these two fixes are genuinely independent — a contract could use
either one alone and still be protected from the exact exploit built
in the previous lesson.
