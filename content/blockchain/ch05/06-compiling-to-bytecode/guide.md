# Lesson 6 — Compiling Your Contract & Viewing Bytecode

**Chapter 5 · Solidity Programming · Lesson 6 of 6**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding and compiling in the actual Remix IDE.

## What you'll learn

- How to finish a real multi-variable contract with proper key-value pairs
- The actual life cycle a contract goes through, from code to something the EVM can run
- How to compile a real contract in Remix and fix a real version-mismatch error
- What raw bytecode actually looks like — and why you'll never read it directly

## Finishing the contract

![The real, finished contract from class: three separate `string` variables — `message`, `alphabet`, and `color` — each documented with its own comment.](/courses/blockchain/ch05/06-compiling-to-bytecode/shot_final_contract.png)
*The actual finished `hello.sol` file from class — three string variables, each a real key-value pair.*

```solidity
pragma solidity 0.8.30;

// versioning below

// define contract or name your contract
contract Hello {
    // string called message with its associated value
    // these are all key value pairs
    string message = "Hello class";
    // string called alphabet with its associated value
    string alphabet = "ABCDEF";
    // string called color with its associated value
    string color = "Red";
}
```

Each line follows the same real pattern: a **data type** (`string`), a
**name** (`message`, `alphabet`, `color`), and a **value** in double
quotes. Each one is a real **key-value pair** — the same structure
you'll see again later when this course covers JSON and the ABI.

## The real life cycle of a contract

1. **Write** your contract — high-level, human-readable Solidity code.
2. **Compile** it — the compiler takes your readable code and outputs
   **bytecode**, the low-level format the EVM can actually execute.
3. **Deploy** it to the Ethereum blockchain.
4. **Interact** with it — you, or anyone else, can now call its
   functions.

## Compiling for real, and fixing a real error

In Remix's **Solidity Compiler** tab, the compiler version needs to
**match your pragma exactly**. The instructor deliberately mismatched
them live — set the pragma to `0.8.30` while the compiler was set to
`0.8.27` — and Remix immediately flagged it: *"source file requires
different compiler version."* Selecting the matching version (0.8.30)
made the error disappear, and pressing **Compile hello.sol** succeeded.

![The real Solidity Compiler panel in Remix: the "Compile Hello.sol" button, and the actual raw bytecode output below it after a successful compile.](/courses/blockchain/ch05/06-compiling-to-bytecode/shot_compile_bytecode.png)
*A real, successful compile — and the actual bytecode Remix generated: a long string of hex characters that means nothing to a human, but everything to the EVM.*

## What bytecode actually looks like

After compiling, Remix lets you copy the contract's real bytecode to
your clipboard — a long, unbroken string of letters and numbers. As the
instructor put it: **"This doesn't make any sense to me, but the EVM
understands this and it represents what the code is."** That's the
entire point of compiling — converting something a human can read into
something a machine can execute, without you ever needing to read the
bytecode yourself.

## Key terms

| Term | Meaning |
|---|---|
| Compile | Converting human-readable Solidity into EVM-executable bytecode |
| Bytecode | The low-level, hex-encoded output of a successful compile |
| Key-value pair | A variable's name paired with its actual value — the same structure JSON and the ABI use |

## Check yourself

You've finished Chapter 5 when you can explain, in your own words, why
the compiler version selected in Remix has to match the pragma line
exactly — and what actually happens when it doesn't.
