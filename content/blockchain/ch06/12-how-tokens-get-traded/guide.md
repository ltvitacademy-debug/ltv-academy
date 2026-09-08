# Lesson 12 — How Tokens Actually Get Bought and Sold

**Chapter 6 · Token Standards · Lesson 12 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE and answering real student questions.

## What you'll learn

- The real answer to "how do exchanges actually let you buy a token?"
- How to mint a real initial supply directly in the constructor
- The real, honest limits of the token contract built in this chapter
- Why a real token needs a DEX like Uniswap to actually become tradeable

## A real student question, answered directly

A student asked a genuinely good question: *"Is there an origin
address for blockchains like Ethereum to buy tokens? Are these
addresses utilized, or do exchanges act as intermediaries with their
own code?"*

The real answer: **"The built code that facilitates buying is built
into the contract itself, and exchanges are just intermediaries which
allow you to use the contract's public methods and functions."**

## What this contract can — and genuinely cannot — do

> "This contract only supports minting tokens to the deployer,
> transferring tokens, and approving allowances... there's no built-in
> marketplace or pricing logic."

This is an honest, important limitation: **you cannot buy or sell this
token for ETH directly through the contract itself.** What you
actually can do is transfer it manually, or expand the contract to
support buying and selling.

## The real path to becoming tradeable: a DEX

> "If we use something like Uniswap and we wanted people to trade our
> token on a DEX, we deploy our ERC20 token, then we add a liquidity
> pool on Uniswap or a similar DEX, and users can buy or sell using
> that platform's interface. That's how most real ERC20 tokens get
> traded."

This is genuinely how it works in practice: a centralized exchange
like Coinbase builds its own buy/sell system on top of a token's public
functions, while a decentralized exchange like Uniswap relies on a
real **liquidity pool** that anyone can trade against.

## Minting a real initial supply in the constructor

![The real, refined contract from class: a constructor that takes an `initialSupply` parameter and mints it directly to the deployer.](/courses/blockchain/ch06/12-how-tokens-get-traded/shot_initial_supply_constructor.png)
*The real, common pattern: give your token a starting supply the moment it's deployed.*

```solidity
constructor(uint initialSupply) {
    _mint(msg.sender, initialSupply);
}
```

This is a genuinely common real pattern — instead of starting at zero
and minting later, a token often mints its **entire starting supply
directly to whoever deploys it**, in the same transaction that creates
the contract.

## Key terms

| Term | Meaning |
|---|---|
| Liquidity pool | Real funds locked in a DEX contract that let people trade a token |
| DEX (decentralized exchange) | A platform like Uniswap where token trading actually happens on-chain |
| Initial supply | The starting amount of tokens minted at deployment, often to the deployer |

## Check yourself

You've finished Chapter 6 when you can explain, in your own words, why
deploying an ERC-20 token contract alone doesn't make it tradeable on
an exchange — and what real, additional step actually does.
