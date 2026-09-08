# Lesson 11 — The Constructor: Initializing Your Contract

**Chapter 5 · Solidity Programming · Lesson 11 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What a constructor actually does, and when it actually runs
- What `immutable` really means, and how it differs from a normal variable
- Why deploying a contract with a constructor requires you to supply real input
- How `msg.sender` gets captured permanently at deployment time

## A function that runs exactly once

![The real "Immutable" contract from class, showing `address public immutable MY_ADDRESS;`, `uint256 public immutable MY_UINT;`, and the constructor being written live.](/courses/blockchain/ch05/11-the-constructor/shot_constructor_typing.png)
*The real contract, mid-typing: immutable variables, and the constructor that will set them.*

A **constructor** is a special function that runs **exactly once** —
the moment a contract is deployed, and never again. Its real purpose:
initializing a contract's state at the exact instant it comes to life.

```solidity
contract Immutable {
    // styling convention to uppercase immutable variables
    address public immutable MY_ADDRESS;
    uint256 public immutable MY_UINT;

    constructor(uint256 _myUint) {
        MY_ADDRESS = msg.sender;
        MY_UINT = _myUint;
    }
}
```

## immutable: set once, locked forever after

**`immutable`** is a real keyword with a real, practical meaning:

- Its value can be set **inside the constructor**.
- Once the constructor finishes running, it **can never be modified
  again** — not by any function, not by anyone, ever.

This is genuinely useful for values that should be locked in at
deployment and never change — like recording exactly who deployed the
contract.

## What actually happens at deployment

![The completed, compiled constructor — Remix now requires a real uint256 input before it will let you deploy this contract at all.](/courses/blockchain/ch05/11-the-constructor/shot_constructor_complete.png)
*Because the constructor takes a real parameter, Remix requires you to actually supply a value before deployment is even possible.*

Because this constructor takes `_myUint` as input, **Remix won't let
you deploy the contract at all** without first typing in a real
`uint256` value. The instructor deployed live with the value `123`, and
the results were exactly as predicted:

- `MY_ADDRESS` was set to **whichever account actually deployed the
  contract** — captured live via `msg.sender`.
- `MY_UINT` was set to **`123`** — exactly the value passed in at
  deployment.

## Key terms

| Term | Meaning |
|---|---|
| Constructor | A special function that runs exactly once, at deployment |
| immutable | A variable set once in the constructor, then locked forever |
| msg.sender (at deployment) | The address of whoever actually deployed the contract |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why a real-world contract might want to permanently record the
address that deployed it.
