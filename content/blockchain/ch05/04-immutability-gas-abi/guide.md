# Lesson 4 — Contract Immutability, Gas & the ABI

**Chapter 5 · Solidity Programming · Lesson 4 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- Why a deployed smart contract can never actually be changed
- The real workaround developers use when a deployed contract has a bug
- What the ABI actually is, and why your front end needs one
- What JSON looks like, in a real, live example

## Contract immutability: code is law

Once a smart contract is deployed, **it can never change.** If you find
a bug after deployment, you cannot go back and fix it directly — smart
contracts operate on the real principle of **"code is law"**: whatever
the code says, that's exactly what it does, no exceptions.

![The real flashcard-making tool used in class to review terms — smart contract deployment defined live: "the process of uploading a smart contract to the blockchain, making it live and accessible for interaction."](/courses/blockchain/ch05/04-immutability-gas-abi/shot_flashcard_maker.png)
*The real flash-card tool from class, mid-review of the session's terms.*

### The real exception: the upgrade pattern

There's one legitimate workaround: the **upgrade design pattern**. You
don't actually change the buggy contract's code — you deploy an
**entirely new smart contract** and direct users toward it instead. This
is the real, practical way developers protect users from bugs or
vulnerabilities after the fact, without violating immutability.

## Gas, once more: what actually drives the cost

As a recap: gas is Ethereum's computational cost meter, and the price
you pay depends on two real factors:

1. **Network congestion** — the busier Ethereum is, the higher gas
   prices climb.
2. **How well your contract is written** — a poorly optimized contract
   costs more gas to deploy and to use, for yourself and for every user
   who ever calls it.

## The ABI: the bridge between your front end and your contract

The **ABI (Application Binary Interface)** is what actually connects a
front end (the visual part of a website) to a deployed smart contract.
It's a **JSON-formatted** description of a contract's functions and
events — a bridge between your code and the blockchain.

![The real definition pulled up live in class: what JSON (JavaScript Object Notation) actually is — a lightweight, structured, human-readable data format used throughout web development and APIs.](/courses/blockchain/ch05/04-immutability-gas-abi/shot_json_definition.png)
*JSON, defined live in class — the exact data format an ABI is written in.*

**A real JSON example**, the way the instructor showed it: a list of
users, where each user has a real set of attributes — a user ID, first
name, last name, phone number, and email — organized as **key-value
pairs**. That structure (a key like `"firstName"` linked to a value like
`"Alice"`) is exactly how an ABI describes a contract's functions and
events to the outside world.

## Key terms

| Term | Meaning |
|---|---|
| Immutability | Once deployed, a smart contract's code can never be changed |
| Upgrade pattern | Deploying a new contract instead of editing the old one, to work around a bug |
| ABI | Application Binary Interface — the JSON bridge between a front end and a deployed contract |
| JSON | JavaScript Object Notation — a structured, human-readable data format using key-value pairs |

## Check yourself

You've finished Chapter 5 when you can explain, in your own words, why
"code is law" makes the upgrade pattern necessary — instead of simply
patching a bug the way you would in ordinary software.
