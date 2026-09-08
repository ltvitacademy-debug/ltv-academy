# Lesson 2 — Why Solidity? Alternatives, the EVM & Compilation

**Chapter 5 · Solidity Programming · Lesson 2 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- Who actually created Solidity, and why it's the dominant language on Ethereum
- Real alternative smart contract languages (and when they get used instead)
- What the EVM actually does with your compiled code
- What "readable" vs. "writable" functions really cost in gas

## Solidity's real origin

Solidity was created in **2014 by Gavin Wood** — also one of the original
co-founders of the Ethereum protocol, who later went on to create the
**Polkadot** blockchain. Solidity is managed and funded by the **Ethereum
Foundation**, whose developers actively maintain it.

**Why Solidity, and not something else?** Two real reasons: it has
**native support on Ethereum**, and it has the **strongest developer
ecosystem** of any smart contract language — the large majority of
DApps on Ethereum are written in it.

## Real alternatives to Solidity

Solidity isn't the only option. These are real languages the instructor
pulled up live, each with a different niche:

| Language | What makes it different |
|---|---|
| **Vyper** | "Pythonic" — if you know Python, Vyper's syntax will look familiar |
| **Fe** | Influenced by the Rust programming language |
| **Daisy (Fe→Vyper)** | An experimental language in the Lisp family, compiled through Vyper |
| **Yul** | An intermediate language used to hand-optimize gas costs |

![The real Yul documentation page, pulled up live in class, describing it as an intermediate language that compiles to bytecode for different backends.](/courses/blockchain/ch05/02-why-solidity-evm-compilation/shot_yul_docs.png)
*The actual Yul docs: an intermediate language commonly used inside Solidity contracts to optimize gas costs — powerful, but far less readable than Solidity itself.*

## The Ethereum stack, and what "compile" really means

The Ethereum stack has three real layers: **nodes** (computers running
the network), the **Ethereum protocol** itself, and the **EVM**
(Ethereum Virtual Machine) — a Turing-complete virtual machine that
executes contract bytecode.

![The real definition slide used in class: what "compile" actually means in Solidity — converting human-readable code into the machine-readable bytecode the EVM can understand.](/courses/blockchain/ch05/02-why-solidity-evm-compilation/shot_compile_flow.png)
*The real compilation flow shown in class: Solidity → Bytecode. Every `.sol` file goes through this exact pipeline before it can run.*

You write your program in Solidity, name the file ending in **`.sol`**,
then **compile** it — converting your human-readable code into
low-level **bytecode** the EVM can actually execute. Only after
compiling can you **deploy** it to the Ethereum blockchain, where anyone
can interact with it.

## Readable vs. writable functions: the real gas difference

This is one of the most practical distinctions in smart contract
development:

- A **readable function** doesn't change the blockchain's state — for
  example, checking your wallet balance. It costs **zero gas**.
- A **writable function** does change state — for example, actually
  swapping one token for another on Uniswap. It **costs gas**, because
  it requires validators to actually process and record a change.

## Key terms

| Term | Meaning |
|---|---|
| Bytecode | The low-level, machine-readable code the EVM actually executes |
| Compile | Converting human-readable Solidity into bytecode |
| Readable function | A function that doesn't change blockchain state — costs zero gas |
| Writable function | A function that changes blockchain state — costs gas |

## Check yourself

You've finished this lesson when you can explain, in your own words, why
checking a wallet balance costs nothing but actually sending a
transaction costs gas — even though both are "using" a smart contract.
