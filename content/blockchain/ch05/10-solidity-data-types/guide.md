# Lesson 10 — Solidity Data Types: uint, int, bool & address

**Chapter 5 · Solidity Programming · Lesson 10 of 10**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- The real difference between `uint` and `int`, and why Solidity has both
- Why smaller number types (`uint8`, `uint16`...) actually exist
- What a `bool` is, and what an `address` actually represents
- What `msg.sender` really means, demonstrated live with two different accounts

## uint: numbers that can never be negative

![The real, live-typed variable declarations from class: `uint public myNumber = 1;` and `uint public secondNumber = 25;`.](/courses/blockchain/ch05/10-solidity-data-types/shot_uint_declarations.png)
*Real uint declarations from class — each a whole number that's zero or positive, never negative.*

**`uint`** stands for **unsigned integer** — a whole number that's
always zero or positive, **never negative**. Try to assign a `uint` a
negative value in Remix, and you get a real, immediate red underline —
it simply can't be represented.

If you don't give a `uint` an initial value, its real default is
**zero** — demonstrated live by leaving one variable unset and watching
its getter return `0`.

### Why there's more than one size of uint

`uint` is really shorthand for **`uint256`** — a number using 256 bits
of storage, capable of holding values up to roughly `2^256 - 1` (about
`1.15 × 10^77`). But Solidity also offers smaller sizes: `uint8`
(max 255), `uint16` (max 65,535), `uint32` (max ~4.2 billion), and more.

**The real reason this matters**: the larger the `uint` size you use,
**the more gas it costs to store**. If you know a value will always
stay small — say, a percentage from 0–100 — using `uint8` instead of
`uint256` genuinely saves real gas. For most purposes, though, `uint256`
is the default, especially for financial values that can get
astronomically large.

## int: when negative numbers are possible

**`int`** (signed integer) works the same way, but allows **negative**
values too — just like `uint`, it comes in the same range of sizes
(`int8`, `int16`, `int32`... up to `int256`).

## bool: true or false, and nothing else

A **`bool`** (boolean) can only ever hold `true` or `false` — nothing
in between. A real example from class: `bool public isOpen = true;`.

## address: a real Ethereum account

![The full real contract from class, showing every data type declared together: uint, int, bool, and address — including the actual `owner` variable set to `msg.sender`.](/courses/blockchain/ch05/10-solidity-data-types/shot_all_data_types.png)
*The complete set of real data types covered in this lesson, all declared in the same contract.*

An **`address`** is a special data type holding exactly **20 bytes (40
hex characters)** — a real Ethereum account or contract address.

### msg.sender: a real global variable

`msg.sender` is a **global variable** that always refers to whoever (or
whatever) called the current function. The instructor demonstrated this
live: setting `address public owner = msg.sender;`, deploying with one
account, and confirming `owner` matched that account's address exactly
— then **switching to a different account and redeploying**, showing
`owner` change to match the new caller. This is the real mechanism
behind common patterns like "only the contract's original deployer can
do X."

## Key terms

| Term | Meaning |
|---|---|
| uint / int | Unsigned (never negative) and signed (can be negative) whole numbers |
| bool | A data type holding only `true` or `false` |
| address | A 20-byte value representing a real Ethereum account or contract |
| msg.sender | A global variable holding the address that called the current function |

## Check yourself

You've finished Chapter 5 when you can explain, in your own words, why a
developer might deliberately choose `uint8` over `uint256` for a
variable that will only ever hold small numbers.
