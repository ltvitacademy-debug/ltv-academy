# Lesson 12 — Reading vs. Writing State: the view Keyword

**Chapter 5 · Solidity Programming · Lesson 12 of 12**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- The real rule for when a function needs to send a transaction
- What the `view` keyword actually promises the EVM
- How to write a function that returns a value
- What real gas costs look like, side by side, for a writable vs. a readable function

## The real rule: writing costs gas, reading doesn't

![The complete real `SimpleStorage` contract from class — a `set` function that writes to state, and a `get` function that reads it back using the `view` keyword.](/courses/blockchain/ch05/12-reading-writing-state-view/shot_simplestorage_contract.png)
*The real contract: to write or update a state variable, you need to send a transaction. To read one, you don't.*

```solidity
contract SimpleStorage {
    // State variable to store a number
    uint256 public num;

    // You need to send a transaction to write to a state variable
    function set(uint256 _num) public {
        num = _num;
    }

    // You can read from a state variable without sending a transaction
    function get() public view returns (uint256) {
        return num;
    }
}
```

## Two new pieces: view and returns

- **`view`** — a real promise to the compiler that this function
  **will not modify state**. It only reads.
- **`returns (uint256)`** — declares what type of value the function
  hands back when it's called.

## The real, visible cost difference

![The same contract after compiling — Remix shows the exact real gas estimate for each function: 22,514 gas to call `set`, versus just 2,453 gas to call `get`.](/courses/blockchain/ch05/12-reading-writing-state-view/shot_gas_annotations.png)
*Real, side-by-side gas costs: writing to state costs roughly 9x more than reading it, in this exact example.*

This is the concrete version of a rule from earlier in this chapter:

- **`set(_num)`** changes state — it costs **real gas** (Remix estimated
  22,514 gas) and requires an actual transaction.
- **`get()`** only reads state — it costs **far less** (2,453 gas) and,
  critically, doesn't require sending a transaction at all when called
  externally as a pure read.

Remix reflects this visually too: writable functions like `set` show
up in **orange** (requiring a real "transact" click), while readable
functions like `get` show up in **blue**.

## Watching it happen live

Deploying `SimpleStorage` and immediately calling `get()` returns `0` —
`num` was never initialized, so it defaults to zero. Calling
`set(5)` and pressing **transact** actually changes the contract's
state. Calling `get()` again now correctly returns `5`.

## Key terms

| Term | Meaning |
|---|---|
| view | A keyword promising a function only reads state, never writes it |
| returns | Declares the type of value a function sends back to its caller |
| Writable vs. readable function | Costs real gas and needs a transaction vs. free and instant |

## Check yourself

You've finished Chapter 5 when you can explain, in your own words, why
Remix shows `set` and `get` in different colors — and what that color
actually tells you about cost before you even call either one.
