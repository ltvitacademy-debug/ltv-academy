# Lesson 4 — Reading a Protocol's Docs & Contracts

**Chapter 1 · DeFi Building Blocks · Lesson 4 of 30**

## What you'll learn

- The four places to check before you trust a protocol with real funds
- How to tell a verified contract's "Read" functions from its "Write" functions on a block explorer
- What an admin key and a timelock actually control, and why that matters
- A short checklist to run through before interacting with any new protocol

## Where to actually look

A protocol's marketing site tells you what it wants you to believe. Four
other sources tell you what's actually true:

| Source | What it tells you |
|---|---|
| Official docs site | How the protocol is *supposed* to work — mechanics, parameters, fee structure |
| GitHub repository | The actual source code, commit history, and whether development is active |
| Verified contract on a block explorer (e.g. Etherscan) | The exact bytecode actually deployed on-chain, and every function it exposes |
| Audit reports | What independent security researchers checked, and what they flagged |

Docs can describe an idealized version of the protocol; the verified
contract on-chain is what you're actually interacting with. When the two
disagree, the contract wins — it's the only one enforced by code.

## Read functions vs. write functions

A verified contract on a block explorer exposes two tabs: **Read Contract**
and **Write Contract**. Read functions (`totalSupply`, `getReserves`,
`balanceOf`) cost no gas and change nothing — they just report the
contract's current state, which is how you can independently verify a
pool's reserves or a user's balance without trusting any front-end. Write
functions (`swap`, `mint`, `borrow`) actually change state and require a
signed transaction — these are the functions a front-end's "Swap" or
"Deposit" button is calling on your behalf.

```
Read Contract (free, no gas, no signature):
  getReserves() -> (reserve0, reserve1, timestamp)
  totalSupply() -> 1,204,391 LP tokens outstanding
  balanceOf(0xYourAddress) -> your exact token balance right now

Write Contract (costs gas, requires your signature):
  swap(amountIn, amountOutMin, path, to, deadline)
  mint(to) -> issues LP tokens for liquidity you deposited
```

## What actually controls the contract

Before trusting a contract with funds, find the answer to one question:
**who can change its behavior after you've deposited?** Look for an admin
key (a single address with special privileges — a red flag if it's not a
multisig) and a timelock (a mandatory delay, often 24–48 hours, between an
admin proposing a change and it taking effect, giving users time to exit
if they disagree). A protocol with no admin key and no timelock is either
fully immutable (rare, and inflexible if a bug is found) or it's lying
about being decentralized.

## A short pre-interaction checklist

```
Before depositing real funds into any new protocol, check:
[ ] Is the contract verified on a block explorer (source code visible)?
[ ] Has it been audited — by whom, and were findings fixed?
[ ] Is there an admin key? Is it a multisig, and is there a timelock?
[ ] Does the GitHub repo show active, recent development?
[ ] What's the total value locked (TVL), and is it consistent with the
    protocol's age and track record?
```

## Key terms

| Term | Meaning |
|---|---|
| Verified contract | A deployed contract whose source code has been published and matched to its bytecode |
| Read function | A contract function that reports state without costing gas or changing anything |
| Write function | A contract function that changes state, requiring a signed, gas-paying transaction |
| Admin key | An address with special privileges to change contract behavior |
| Timelock | A mandatory delay between an admin proposing a change and it taking effect |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why does
the verified contract on-chain take priority over what a protocol's own
docs claim, if the two ever disagree?
