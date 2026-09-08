# Lesson 5 — Function Modifiers: onlyOwner & Access Control

**Chapter 6 · Token Standards · Lesson 5 of 7**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What a modifier actually is, and what the underscore inside one means
- The real `onlyOwner` pattern — the single most common access-control pattern in Solidity
- How to stack more than one modifier on the same function
- Why writing the same `require` check in five different functions is a real problem modifiers solve

## The real onlyOwner pattern

![The actual `onlyOwner` modifier from class, applied directly to a real `changeOwner` function.](/courses/blockchain/ch06/05-function-modifiers/shot_onlyowner_modifier.png)
*The single most common access-control pattern in real Solidity contracts, written live.*

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not the owner");
    _;
}

function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
}
```

- **`modifier`** — the keyword that starts a modifier definition.
- **The underscore (`_;`)** — this is the real placeholder for
  **"run the rest of the function body here."** Everything in the
  modifier before the underscore runs *first*.
- Applying it is simple: just write the modifier's name — `onlyOwner`
  — right after the visibility keyword in the function signature.

**Why this actually matters**: without a modifier, you'd have to
copy-paste the same `require(msg.sender == owner, ...)` check into
every single function that should be owner-only. One modifier, applied
everywhere it's needed, keeps the logic in exactly one place.

## A second real example: registered voters

![Two more real modifiers from class: `onlyRegisteredVoter`, applied to a `vote` function, and `costs`, which checks a minimum payment.](/courses/blockchain/ch06/05-function-modifiers/shot_registered_voter_modifier.png)
*Real-world analogy: only registered voters can vote — enforced by a modifier, not by hand in every function.*

```solidity
modifier onlyRegisteredVoter() {
    require(voters[msg.sender] == true, "Not registered to vote");
    _;
}

function vote(uint256 proposalId) public onlyRegisteredVoter {
    votes[proposalId]++;
}
```

The real analogy from class: *"Imagine you're building a smart contract
for a voting system. Only registered voters can vote."* Once this
modifier is applied, **all unregistered users are automatically
blocked** — no per-function repetition required.

## Modifiers can take real arguments too

```solidity
modifier costs(uint amount) {
    require(msg.value >= amount, "Not enough Ether sent");
    _;
}
```

This modifier isn't just a check — it takes a real parameter
(`amount`), making it reusable across functions with different price
requirements.

## Stacking modifiers

You can apply **more than one modifier to the same function**, and
each one runs in order:

```solidity
function secureAction() public onlyOwner whenNotPaused {
    // critical logic here
}
```

## Why this matters for token standards

Every real token contract you'll encounter uses this exact pattern —
`onlyOwner` guards functions like minting new tokens or pausing
transfers, so only the contract's deployer (or a designated admin) can
call them.

## Key terms

| Term | Meaning |
|---|---|
| Modifier | A reusable condition wrapped around a function's execution |
| `_;` | The placeholder marking where the rest of the function body runs |
| onlyOwner | The most common real access-control modifier pattern |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why copy-pasting the same `require` check into five different
functions is a worse approach than writing one modifier.
