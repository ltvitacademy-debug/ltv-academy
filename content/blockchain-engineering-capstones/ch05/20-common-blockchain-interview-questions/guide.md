# Lesson 20 — Common Blockchain Interview Questions

**Chapter 5 · Career Preparation · Lesson 20 of 22**

## What you'll learn

- The transaction-lifecycle question almost every blockchain interview includes
- EVM fundamentals interviewers probe for: gas, storage vs. memory, msg.sender vs. tx.origin
- The security-pitfall questions that show up across junior through senior interviews
- Gas optimization questions, and the honest way to answer them

## "Walk me through what happens when a user calls a contract function"

This is close to a universal opener in blockchain interviews, and a strong answer covers the whole path, not just "it executes":

1. The user's wallet constructs and **signs** the transaction with their private key.
2. It's **broadcast** to the network and sits in the mempool.
3. The transaction's **nonce** determines its ordering for that sender; its **gas price/tip** affects how quickly it gets picked up.
4. A validator **includes it in a block**.
5. The EVM **executes** the called function's logic against current contract state — reading and writing storage, emitting events, possibly calling other contracts.
6. The transaction either **succeeds and updates state**, or **reverts** — in which case state changes roll back but gas already spent is not refunded.

Naming the nonce, the mempool, and the revert behavior specifically is what separates a strong answer from a vague one.

## EVM fundamentals interviewers actually probe

- **Gas.** What it measures (computational + storage cost), why `SSTORE` is expensive relative to `ADD`, and why an unbounded loop over user-controlled data is a red flag.
- **Storage vs. memory vs. calldata.** Storage persists between calls and is expensive; memory is temporary and cheaper; calldata is read-only and cheapest of all for external function arguments — knowing when Solidity requires you to specify which one is a real, commonly asked question.
- **`msg.sender` vs. `tx.origin`.** `msg.sender` is the immediate caller (could be another contract); `tx.origin` is always the original externally-owned account that started the whole call chain. Using `tx.origin` for authorization is a known vulnerability, because a malicious intermediate contract can trick a user into a call where `tx.origin` is still the legitimate user.

## Security pitfalls that come up at every level

- **Reentrancy.** An external call made before internal state is updated lets a malicious contract call back in and repeat an action before its effects are recorded. The fix: checks-effects-interactions ordering, and/or a reentrancy guard.
- **Integer overflow/underflow.** Solidity ≥0.8 checks this by default and reverts on overflow — but an `unchecked { }` block disables that protection, so interviewers ask when and why you'd ever use one (gas savings in a spot you've proven safe).
- **Access control gaps.** A function that changes critical state (minting, withdrawing, upgrading) with no `onlyOwner`/role check at all. This sounds obvious in the abstract but is a real, recurring cause of exploits.
- **Front-running / MEV.** Because pending transactions are visible in the mempool before confirmation, an attacker can see a profitable transaction and submit their own with higher gas to land first.

## Gas optimization questions

Common ones: why `uint256` is often cheaper than `uint8` for a standalone variable (due to EVM word-size padding, unless packed deliberately with neighboring smaller variables in a struct), why minimizing storage writes matters more than minimizing storage reads, and why `external` can be cheaper than `public` for functions never called internally. The honest answer pattern for all of these: explain the mechanism, not just the rule — an interviewer can tell the difference between "I memorized that external is cheaper" and "I understand why calldata avoids a copy that public's memory-based ABI decoding doesn't."

## Key terms

| Term | Meaning |
|---|---|
| Mempool | The pool of pending, unconfirmed transactions a network has seen but not yet included in a block |
| Checks-effects-interactions | The ordering pattern that updates state before making external calls, to prevent reentrancy |
| MEV | Maximal extractable value -- profit made by reordering, inserting, or censoring transactions within a block |

## Lab

Write out, from memory, the full transaction lifecycle answer in your own words, then write one sentence each explaining reentrancy, an access-control gap, and why `tx.origin` is unsafe for authorization — without looking back at this lesson.

## Check yourself

Can you explain why `tx.origin`-based authorization is unsafe, using a concrete scenario involving a malicious intermediate contract?
