# Lesson 8 — How the EVM Works: Stack, Opcodes & Gas

**Chapter 5 · Solidity Programming · Lesson 8 of 8**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, referencing the real evm.codes opcode reference on screen.

## What you'll learn

- What "stack-based architecture" actually means, with a real physical analogy
- What an opcode actually is, using the real evm.codes reference
- How your Solidity code's real cost is determined, operation by operation
- Why EVM-compatibility lets a project move between blockchains

## The stack: a real, physical analogy

![The real ChatGPT-generated slide from class: "Ethereum's Stack-Based Architecture (EVM)."](/courses/blockchain/ch05/08-evm-stack-opcodes/shot_stack_architecture.png)
*The real slide: the EVM is a stack-based virtual machine — meaning it uses a Last-In-First-Out data structure.*

The EVM's **stack** is a **Last-In-First-Out (LIFO)** structure — and the
instructor used a real, physical analogy: **a stack of plates**. You can
only take a plate off the *top* of the stack, and you can only add a new
plate to the *top* — never the middle. Try to pull one from the middle,
and everything above it falls. That's exactly how the EVM's stack works:

- It holds up to **1,024 items**, each **256 bits** wide.
- Every operation pushes values onto the stack and pops them back off to
  compute a result — to calculate `2 + 3`, the values `2` and `3` are
  pushed on, the `ADD` operation pops them off, adds them, and pushes
  `5` back.

## Opcodes: the real instruction set

Below Solidity and above raw binary, there's a real, literal instruction
set the EVM actually executes: **opcodes**.

![The real evm.codes "Opcodes Interactive Reference" — the actual site referenced live in class, listing every real EVM instruction: STOP, ADD, MUL, SUB, DIV, and more.](/courses/blockchain/ch05/08-evm-stack-opcodes/shot_evm_codes_opcodes.png)
*evm.codes — the real, complete reference of every operation the EVM can perform, each with its own gas cost.*

A few real examples straight from that reference: `STOP` halts
execution, `ADD` adds two numbers, `MUL` multiplies, `SUB` subtracts,
`DIV` divides. Every one of these has its own **real gas cost** — and
your entire smart contract, no matter how it's written in Solidity,
ultimately breaks down into a sequence of these exact operations.

## Why your gas cost is what it is

This is the real mechanism behind gas pricing: the EVM adds up the cost
of every single opcode your contract actually executes. **The more
complex your contract, the more operations it runs, and the more gas it
costs** — because you're making the EVM do more real work.

## Why EVM-compatibility matters

Because Solidity compiles down to the same real EVM instruction set,
contracts can move between any **EVM-compatible chain** — Ethereum,
Polygon, Avalanche, and others — with minimal changes. This is real
leverage: a project can migrate to wherever its users actually are,
something chains built on entirely different virtual machines (like
Solana or Cardano) don't offer nearly as easily.

## Key terms

| Term | Meaning |
|---|---|
| Stack | The EVM's Last-In-First-Out data structure, holding up to 1,024 items |
| Opcode | A single, real EVM instruction (like ADD or STOP), each with its own gas cost |
| EVM-compatible | A blockchain that can run the same bytecode Ethereum's EVM runs |

## Check yourself

You've finished Chapter 5 when you can explain, in your own words, why a
more complex smart contract costs more gas — tracing the real path from
Solidity code, to opcodes, to an actual dollar cost.
