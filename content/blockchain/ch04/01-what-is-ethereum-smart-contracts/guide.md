# Lesson 1 — What Is Ethereum? Smart Contracts & the EVM

**Chapter 4 · Ethereum & Smart Contracts · Lesson 1 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- How Ethereum extends Bitcoin's idea instead of replacing it
- What a smart contract actually is, in plain terms
- Why Ethereum is called a "world computer" and what "Turing complete" means
- The real flashcard definitions for the EVM, state, variables, and accounts

## If Bitcoin is digital gold, Ethereum is a digital world computer

Bitcoin is a form of digital money — you can send it, receive it, and store
value with it, but that's essentially all it does. It isn't programmable.

Ethereum takes the same underlying idea — a shared, tamper-resistant ledger
secured by cryptography — and adds a programming layer on top of it. At the
time, developers wanted to build complex applications, not just send money,
and that's when Ethereum's creator, **Vitalik Buterin**, came up with the
idea of a programmable blockchain.

Ethereum is also **Turing complete**: if you can think of an application,
you can build it on Ethereum. Bitcoin does one thing well. Ethereum is a
platform for apps and innovation.

## Smart contracts, in two real analogies

A **smart contract** is code stored on the blockchain that runs
automatically when certain conditions are met — an agreement or transaction
without a middleman.

- **Mowing a lawn**: the terms are "once you mow my lawn, I'll give you
  $10 — not before." You do the work, you get paid. Do a bad job, or skip
  it, and you don't.
- **A vending machine**: select A4, insert your money, get your Cheetos.
  Skip the money, or pick the wrong slot, and nothing comes out. The
  machine only does exactly what its rules say — no more, no less.

## The real flashcards from class

These are the actual definitions reviewed on screen, word for word:

![The instructor's actual flashcard review slide, showing the real definitions for the Ethereum Virtual Machine, State, Variable, and Ethereum used in this class.](/courses/blockchain/ch04/01-what-is-ethereum-smart-contracts/shot_evm_flashcards.png)
*The instructor's real flashcard slide: EVM, State, Variable, and Ethereum — reviewed at the start of this session.*

| Term | Real definition from class |
|---|---|
| Ethereum Virtual Machine (EVM) | The decentralized runtime environment that executes smart contracts and manages the state of the Ethereum blockchain, ensuring all nodes process the same transactions consistently |
| State | The current data and conditions of the network — account balances, contract variables, and other stored information — updated with each transaction |
| Variable | A named container in a program that holds a value, such as a number, string, or address, which can change during execution |
| Ethereum | A decentralized blockchain that enables developers to build and deploy smart contracts and decentralized applications (DApps) |

## Variables, live in the instructor's own notes

Numbers, strings, and addresses — the three variable types that come up
constantly in Solidity — shown as the instructor actually typed them:

![The instructor's real note-taking app, showing a variable `x` set to a number (1), a string ("String"), and an Ethereum address (0xBd0Df9EE87A5e80C57BE8899B5c21B2cE6fb5F4D).](/courses/blockchain/ch04/01-what-is-ethereum-smart-contracts/shot_variables_notes.png)
*Real notes from the "Origins and Ethereum's Big Idea" session: the same variable `x` holding a number, a string, and an address.*

## More real terms from the flashcard review

| Term | Real definition from class |
|---|---|
| ETH | The native currency of the Ethereum network, the same way BTC is the native currency of Bitcoin |
| Turing complete | A system capable of performing any computation that can be described algorithmically, given enough time and resources — the EVM is Turing complete |
| Smart contract | A self-executing contract with the terms of the agreement written directly into code, automatically enforced when conditions are met |
| Runtime environment | A system that provides everything needed to execute a program: memory, storage, and processing rules |
| Program | A set of instructions written in code that a computer or virtual machine can execute |
| Virtual machine | A software-based program that runs like a physical machine but is isolated from the underlying hardware |
| Memory | Temporary, fast-access data storage used while a program is running |
| Storage | Long-term data saving that persists after a program ends — where smart contract state lives permanently on Ethereum |
| Solidity | The high-level programming language used to write smart contracts on Ethereum — what this course will actually teach next |
| Decentralized application (DApp) | Software that runs on a blockchain or peer-to-peer network instead of a central server |
| Externally owned account (EOA) | An Ethereum account controlled by a private key — typically a person — that can send transactions but doesn't contain executable code |
| Smart contract account | An Ethereum account controlled by the code of a smart contract, not a private key, that can store data and execute functions automatically |

## Why this matters for the rest of the course

Solidity, the language this course moves into next, exists specifically to
let you write the code that smart contract accounts run. Every term on
these flashcards — state, variables, memory, storage, accounts — is a piece
of vocabulary you'll need the moment real Solidity code shows up on screen.

## Key terms

| Term | Meaning |
|---|---|
| Turing complete | Capable of performing any computation, given enough time and resources |
| Smart contract | Self-executing code that runs automatically when its conditions are met |
| EOA vs. smart contract account | A private-key-controlled account vs. a code-controlled account |

## Check yourself

Before moving to the next lesson, make sure you can explain — in your own
words — why Ethereum is described as "programmable money" and Bitcoin is
not.
