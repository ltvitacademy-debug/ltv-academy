# Lesson 9 — Implementing Transfer, Approve & TransferFrom

**Chapter 6 · Token Standards · Lesson 9 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- How to actually implement the three real functions every ERC-20 depends on
- Why `transferFrom` has to check and deduct an allowance before doing anything else
- How every one of these functions ends by emitting a real event and returning `true`

## transfer: the simplest real case

![The real, complete `transfer` function from class — updating both balances, emitting the event, and returning success.](/courses/blockchain/ch06/09-erc20-transfer-approve/shot_transfer_function.png)
*Three real steps: subtract from the sender, add to the recipient, announce it.*

```solidity
function transfer(address recipient, uint256 amount) external returns (bool) {
    balanceOf[msg.sender] -= amount;
    balanceOf[recipient] += amount;
    emit Transfer(msg.sender, recipient, amount);
    return true;
}
```

## approve and transferFrom: real delegated spending

![The complete real `approve` and `transferFrom` functions — the second lets a spender move tokens on someone else's behalf.](/courses/blockchain/ch06/09-erc20-transfer-approve/shot_approve_transferfrom.png)
*This is the real mechanism behind every "approve this app to spend your tokens" prompt you've ever seen in a wallet.*

```solidity
function approve(address spender, uint256 amount) external returns (bool) {
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
}

function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
    allowance[sender][msg.sender] -= amount;
    balanceOf[sender] -= amount;
    balanceOf[recipient] += amount;
    emit Transfer(sender, recipient, amount);
    return true;
}
```

## Why transferFrom checks the allowance first

`transferFrom` is what lets someone move tokens **on someone else's
behalf** — the real mechanism behind every "approve this app to spend
your tokens" step you've ever clicked through in a real wallet. Before
it moves a single token, it deducts from
`allowance[sender][msg.sender]` — if the caller was never approved for
enough, this line fails and the whole transaction reverts.

## The real, consistent pattern

Every one of these three functions follows the exact same real shape:

1. **Update the relevant state** (a balance, or an allowance).
2. **Emit the matching event** (`Transfer` or `Approval`).
3. **Return `true`** — signaling to any caller that the operation
   actually succeeded.

## Key terms

| Term | Meaning |
|---|---|
| Delegated spending | Approving another address to move tokens on your behalf |
| allowance[owner][spender] | How many tokens a spender may still move for a given owner |
| return true | The real ERC-20 convention confirming a call succeeded |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why `transferFrom` needs to reduce the allowance before it
touches either balance.
