# Lesson 1 — Imports, Libraries & OpenZeppelin

**Chapter 7 · Testing & Tooling (Foundry) · Lesson 1 of 1**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- How to actually import code from another file — three real ways
- What a real, audited library is, and why OpenZeppelin matters
- The real difference between a library and a contract
- How the `using` keyword attaches library functions directly to a type

## Why this matters before you build or test anything real

Before writing tests or deploying anything serious, real Solidity
developers almost never write everything from scratch. They import
**audited, battle-tested code** instead — the same real principle
behind every professional smart contract you'll ever encounter.

> "Import is like borrowing a tool from a neighbor instead of buying a
> new one. You're using code that already exists."

## Three real ways to import

```solidity
import "MathLibrary.sol";                      // simple: imports everything
import "MathLibrary.sol" as MyLib;              // alias: access via MyLib.someFunction()
import { MyStruct, myFunction } from "A.sol";   // selective: only brings in specific items
```

## Real code, reused without rewriting it

```solidity
// MathLibrary.sol
contract MathLibrary {
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}

// imports.sol
import "MathLibrary.sol";

contract MyContract {
    function addNumbers(uint x, uint y) public returns (uint) {
        return MathLibrary.add(x, y);
    }
}
```

## OpenZeppelin: the real, industry-standard library

![The real import statement from class, pulling `strings.sol` directly from OpenZeppelin's actual GitHub repository by URL.](/courses/blockchain/ch07/01-imports-libraries-openzeppelin/shot_openzeppelin_import.png)
*A real import, straight from OpenZeppelin's own GitHub — no need to copy-paste or rewrite anything.*

> "OpenZeppelin [provides] audited building blocks for Solidity
> code... they're safe, efficient, and they do what they outline to
> do."

You can import a real file directly from GitHub just by pasting its
URL into an `import` statement — exactly what the instructor
demonstrated live, pulling in OpenZeppelin's `strings.sol`.

## Libraries: a real toolbox of reusable functions

```solidity
library MathLib {
    function add(uint a, uint b) internal pure returns (uint) {
        return a + b;
    }
}

contract Calculator {
    function sum(uint x, uint y) public returns (uint) {
        return MathLib.add(x, y);
    }
}
```

**Real, concrete differences between a library and a contract:**

| | Library | Contract |
|---|---|---|
| State variables | Not allowed | Allowed |
| Inheritance | Not supported | Supported |
| Ether transfers | Never | Possible |
| Typical functions | `pure` / `view` only | Any kind |
| Real use case | Utility functions | Full application logic |

## using: attaching a library to a type

![The real `using MathLib for uint;` line from class — attaching library functions directly onto a native type.](/courses/blockchain/ch07/01-imports-libraries-openzeppelin/shot_library_using_keyword.png)
*A real, clean way to call library functions as if they were built directly into `uint` itself.*

```solidity
library MathLib {
    function double(uint x) internal pure returns (uint) {
        return x * 2;
    }
}

contract MyContract {
    using MathLib for uint;

    function example(uint val) public pure returns (uint) {
        return val.double(); // val is treated as a uint extended with double()
    }
}
```

## Embedded vs. deployed libraries

- **Embedded (internal functions only)** — Solidity copies the
  library's code directly into your contract at compile time. Simple
  and gas-efficient.
- **Deployed (has public/external functions)** — the library gets
  deployed and linked separately, which is more complex and more
  expensive in gas.

**Real best practice, straight from class**: keep libraries internal
where possible, and *"use trusted libraries like OpenZeppelin, SafeMath,
Address, etc."*

## Key terms

| Term | Meaning |
|---|---|
| import | Reuses code from another file instead of rewriting it |
| Library | A stateless collection of reusable, usually pure/view functions |
| using X for Y | Attaches a library's functions directly onto a type |
| OpenZeppelin | The real, industry-standard library of audited Solidity contracts |

## Check yourself

You've finished this lesson when you can explain, in your own words, why
a real production contract would import OpenZeppelin's code instead of
writing its own token logic from scratch.
