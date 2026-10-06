# Lesson 21 — Whiteboard & Security Review Exercises

**Chapter 5 · Career Preparation · Lesson 21 of 22**

## What you'll learn

- A repeatable method for reviewing unfamiliar Solidity code under interview pressure
- How to find a reentrancy bug by tracing call order, not by pattern-matching
- How to find an integer overflow/underflow risk in code that predates or disables Solidity's default checks
- How to find an access-control gap by asking "who can call this, and should they be able to"

## The method, not the memorized bug list

A whiteboard security review isn't about recognizing a bug you've seen before — interviewers deliberately write new scenarios so memorization doesn't help. What transfers is a method you can run on code you've never seen:

1. **Read the function's purpose first.** What is it supposed to do, in one sentence?
2. **List every state variable it reads or writes**, and in what order.
3. **List every external call it makes** (a `.call`, `.transfer`, `.send`, or a call to another contract's function), and exactly where it sits relative to the state changes.
4. **Check every arithmetic operation** for whether it could overflow, underflow, or divide unexpectedly by zero.
5. **Check every state-changing function for access control** — ask explicitly "who can call this right now, and who should be able to?"

Walking an interviewer through this process out loud, even before you've spotted the bug, demonstrates the skill itself — which is often worth more than a fast but silent answer.

## Exercise 1: find the reentrancy bug

```solidity
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "insufficient balance");
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "transfer failed");
    balances[msg.sender] -= amount;
}
```

Applying the method: the function makes an external call (`msg.sender.call`) **before** it updates `balances[msg.sender]`. A malicious contract as `msg.sender` can implement a `receive()` function that calls `withdraw` again, and since `balances[msg.sender]` hasn't been decremented yet, the `require` check still passes — repeatedly, draining the contract. **The fix:** move the balance decrement above the external call (checks-effects-interactions), or add a reentrancy guard.

## Exercise 2: find the overflow/underflow risk

```solidity
function unstake(uint256 amount) external {
    unchecked {
        stakedBalance[msg.sender] -= amount;
    }
    token.transfer(msg.sender, amount);
}
```

Applying the method: this arithmetic is wrapped in `unchecked { }`, which disables Solidity 0.8's default overflow/underflow protection. If `amount` exceeds the caller's actual `stakedBalance`, the subtraction underflows and wraps to a huge number instead of reverting — and the function still happily transfers out `amount` tokens the caller never had. **The fix:** remove the `unchecked` block (checked subtraction will revert on underflow), or add an explicit `require(stakedBalance[msg.sender] >= amount)` before the unchecked block if the gas savings are genuinely needed and justified.

## Exercise 3: find the access-control gap

```solidity
function setFeeRecipient(address newRecipient) external {
    feeRecipient = newRecipient;
}
```

Applying the method: this function changes a critical piece of contract state — where protocol fees get sent — and has **no access control at all**. Any address can call it and redirect every future fee payment to themselves. **The fix:** add an `onlyOwner` modifier, or a role check against a dedicated `FEE_ADMIN_ROLE`, matching whatever access-control pattern the rest of the contract already uses.

## Presenting your reasoning, not just the answer

In a real whiteboard round, narrate the method as you apply it: "First let me understand what this is supposed to do... now let me trace the external calls relative to state changes... I notice the call happens before the balance update, which means..." This shows the interviewer you have a repeatable process, which is exactly what they're actually hiring for — not whether you've memorized this specific example.

## Key terms

| Term | Meaning |
|---|---|
| Checks-effects-interactions | Updating state before making external calls, to prevent reentrancy |
| `unchecked` block | A Solidity block that disables default overflow/underflow reverts, for gas savings in proven-safe spots |
| Access control gap | A state-changing function with no restriction on who may call it |

## Lab

Write one more deliberately buggy function of your own — pick reentrancy, an unchecked arithmetic risk, or a missing access check — and walk a study partner (or write out loud to yourself) through the five-step method to find it, without telling them in advance which category it is.

## Check yourself

Given an unfamiliar Solidity function, can you run all five steps of the method out loud, in order, before you've even spotted the bug?
