# Lesson 5 — Your First Solidity Contract: Pragma, Contracts & Strings

**Chapter 5 · Solidity Programming · Lesson 5 of 6**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- How to actually write and name a Solidity file
- What the pragma line does, line by line
- How to define a contract and use curly braces correctly
- How to declare a `string` variable, and why naming it well matters

## Writing your first file

Every Solidity file has one non-negotiable rule: it must end in **`.sol`**.
In Remix, you create a new file, name it whatever you want — the
instructor named his `hello.sol` — and you get a blank editor to start
writing real code.

## Line one: the pragma

![The actual first two lines of code typed live in class: `pragma solidity ^0.8.0;` and `contract HelloWorld {`.](/courses/blockchain/ch05/05-your-first-contract/shot_pragma_contract.png)
*The real first lines of a Solidity file, typed live: the pragma (compiler version) and the contract definition.*

Every Solidity file starts with a **pragma** — the compiler version your
contract is written for:

```solidity
pragma solidity ^0.8.0;
```

Solidity's compiler has released many versions over the years (starting
around 0.4, now up to 0.8.30 as of this recording), each fixing bugs and
adding features. The real rule of thumb: **use the latest version you
have access to**, not the oldest — older versions carry bugs that later
releases already fixed. The **semicolon at the end is required** — leave
it off and Remix will show a real compiler error.

## Defining your contract

The next real line names your contract:

```solidity
contract Hello {
    ...
}
```

- The keyword `contract`, a space, then your contract's name.
- Contract names conventionally start with an **uppercase letter** — it
  still compiles if you don't, but it's a real style convention worth
  following.
- Everything the contract actually does lives inside the **curly
  braces** — Remix will even auto-insert the closing brace for you the
  moment you type the opening one.

## Declaring a string variable

![The real, completed line from class: `string message = "Hello class";` — a live-typed string variable inside the contract.](/courses/blockchain/ch05/05-your-first-contract/shot_string_variable.png)
*The actual line of code from class — a `string` variable named `message`, holding the value `"Hello class"`.*

```solidity
string message = "Hello class";
```

Breaking this down, piece by piece, exactly as it was taught:

- `string` — the **data type**. A string represents a word or a
  collection of letters.
- `message` — the variable's **name**. You could call it anything
  (`words`, `hello`, `alphabet`) — this is just what you'll reference it
  by later, so name it for what it actually holds.
- `=` — assignment. Whatever's on the right becomes the value of
  whatever's on the left.
- `"Hello class"` — the actual value, in **double quotes**. (Single
  quotes don't work in Solidity — it has to be double quotes.)
- `;` — the required semicolon.

## Comments: notes that aren't code

Two real ways to leave a note for yourself or other developers, neither
of which affects how the contract runs:

- **Single-line**: `// this is my comment`
- **Multi-line**: `/* this is line one, this is line two */`

## Key terms

| Term | Meaning |
|---|---|
| Pragma | The line declaring which Solidity compiler version a file targets |
| String | A data type representing a word or collection of letters |
| Comment | Text in the code meant for humans, ignored by the compiler |

## Check yourself

Before moving to the next lesson, try writing out — by hand, on paper or
in Remix — a one-line contract with a pragma, a contract name, and a
single string variable of your own choosing.
