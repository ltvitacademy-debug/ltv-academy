# Lesson 1 — Building an Ether Wallet

**Chapter 8 · Full-Stack DApp Development · Lesson 1 of 1**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- The real milestone this marks in the course: moving from concepts to actual applications
- How to build a working wallet contract, piece by piece
- What `receive()` actually does, and why it exists as its own special function
- Why `owner` has to be declared `payable` before you can send it Ether

## A real turning point in the course

> "Now we're at the point where we've gone over most of the basic
> concepts within Solidity... now we're going to be looking at real
> world applications that you might build... the first application
> we're going to be working on is an Ether wallet."

This is a genuine milestone: everything from pragma and contracts
through mappings, structs, modifiers, and events now gets applied to
something real — **a working wallet, like a simplified MetaMask.**

## The goal, stated plainly

> "Anyone can send ETH. Only the owner can withdraw."

![The real EtherWallet contract, mid-typing: the owner variable and its comment-documented purpose.](/courses/blockchain/ch08/01-ether-wallet/shot_etherwallet_start.png)
*The real start of the contract — three comments stating exactly what it needs to do, before a line of logic exists.*

## The complete, real contract

![The finished, real EtherWallet contract — owner, constructor, receive, withdraw, and getBalance, each annotated with its real gas cost.](/courses/blockchain/ch08/01-ether-wallet/shot_etherwallet_complete.png)
*Four real functions are all this wallet needs.*

```solidity
contract EtherWallet {
    // An example of a basic wallet
    // Anyone can send ETH
    // Only the owner can withdraw

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner, "Caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

## receive(): a real, special function

`receive()` is a genuinely special function — shown highlighted in a
different color in Remix specifically because of that. It's what lets
a contract actually **accept plain Ether transfers**, with no function
call attached. Marking it `external payable` is what makes "anyone can
send ETH" actually true.

## Why owner has to be payable

Solidity won't let you call `.transfer()` on a plain `address` — only
on an `address payable`. That's the real, concrete reason `owner` is
declared `address payable public owner`, and why `msg.sender` gets
explicitly cast with `payable(...)` inside the constructor.

## The real security check

```solidity
require(msg.sender == owner, "Caller is not owner");
```

Anyone can call `withdraw`, but only the address stored as `owner` will
ever pass this check — everyone else's transaction reverts immediately
with `"Caller is not owner"`.

## Key terms

| Term | Meaning |
|---|---|
| receive() | The special function that lets a contract accept plain Ether transfers |
| payable | Marks an address (or function) as able to send or receive Ether |
| address(this).balance | Reads the contract's own current Ether balance |

## Check yourself

You've finished this lesson when you can explain, in your own words, why
`receive()` needs to exist as its own dedicated function instead of
just being handled inside `withdraw` or the constructor.
