# Lesson 11 — Building an ERC-20 Token with OpenZeppelin

**Chapter 6 · Token Standards · Lesson 11 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-browsing the actual OpenZeppelin GitHub repository.

## What you'll learn

- The real, practical alternative to writing an entire ERC-20 by hand
- How to find and import OpenZeppelin's actual ERC20 contract
- How inheritance (`is ERC20`) lets your token reuse all of that logic instantly
- Why this is genuinely the more common real-world approach

## Two real ways to build a token

By this point in the chapter, you've written a full ERC-20 by hand —
interface, events, state, transfer, approve, transferFrom, mint, and
burn. That's valuable for understanding *how* it all works. But real
production tokens almost always take a second, more practical real
path.

## Finding OpenZeppelin's real ERC20 contract

![The real GitHub search results for OpenZeppelin's repositories — the actual, audited source most production tokens are built on.](/courses/blockchain/ch06/11-erc20-openzeppelin/shot_openzeppelin_github_search.png)
*Searching GitHub directly for OpenZeppelin — the same audited building blocks introduced back in Chapter 7.*

The real path: go to **github.com/OpenZeppelin/openzeppelin-contracts**,
navigate to **contracts → token → ERC20**, and copy that file's real
URL.

## Importing it directly

![The real result: importing OpenZeppelin's ERC20.sol directly by URL, and declaring a new contract that inherits from it.](/courses/blockchain/ch06/11-erc20-openzeppelin/shot_erc20_import_openzeppelin.png)
*One import line, and your contract has every real ERC-20 function already implemented and audited.*

```solidity
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract ERC20Test is ERC20 {
    // your token's own logic goes here
}
```

The **`is ERC20`** part is real Solidity inheritance — your contract
now automatically has every function OpenZeppelin's `ERC20` defines:
`transfer`, `approve`, `transferFrom`, `balanceOf`, all of it, already
written, already audited, already used by thousands of real tokens.

## Why this is the more common real-world choice

Writing your own ERC-20 from scratch (the previous three lessons) is
genuinely valuable for understanding the mechanics. But in real
production code, developers overwhelmingly **import and extend
OpenZeppelin's version** instead — it's already been reviewed by
security researchers, and reinventing the same logic introduces real,
avoidable risk.

## Key terms

| Term | Meaning |
|---|---|
| `contract X is ERC20` | Real Solidity inheritance — X automatically gets every function ERC20 defines |
| OpenZeppelin's ERC20.sol | The real, audited, industry-standard base contract most tokens extend |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why extending OpenZeppelin's `ERC20` is generally safer than
writing every function yourself, even though you now know how to.
