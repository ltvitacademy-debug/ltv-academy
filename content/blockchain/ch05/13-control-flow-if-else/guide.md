# Lesson 13 — Control Flow: if/else Statements & the Ternary Operator

**Chapter 5 · Solidity Programming · Lesson 13 of 13**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- How to write a real conditional check in Solidity
- What the `pure` keyword means, and how it differs from `view`
- A real, working age-checker contract, tested live with multiple inputs
- The shorthand ternary version of the same logic

## A real-world analogy first

Before writing any code, the instructor gave a simple, concrete
analogy: *"Imagine you walk into your house. If the light switch is on,
the lights turn on. Else, if it's off, the lights stay off."* The
condition is: **is the switch on?**

## The real AgeChecker contract

![The actual `IfElseExample` contract from class: a `checkAge` function that returns a different string depending on a real if/else condition.](/courses/blockchain/ch05/13-control-flow-if-else/shot_agechecker_contract.png)
*The real, complete contract — one condition, two possible outcomes.*

```solidity
contract IfElseExample {
    // Age checker
    function checkAge(uint age) public pure returns (string memory) {
        if (age >= 18) {
            return "You are an adult";
        } else {
            return "You are not an adult";
        }
    }
}
```

**`pure`** is a new keyword here, one step beyond `view`: it means the
function **neither reads nor writes any contract state at all** — it
only works with the values passed directly into it.

## Tested live, with real inputs

The instructor deployed this exact contract and called `checkAge` with
several real values:

| Input | Real output |
|---|---|
| 18 | "You are an adult" |
| 34 | "You are an adult" |
| 5 | "You are not an adult" |
| 17 | "You are not an adult" |

## Chaining conditions: if / else if / else

![A second real function, `foo`, showing a chained if/else-if/else structure, plus the shorthand `ternary` function just below it.](/courses/blockchain/ch05/13-control-flow-if-else/shot_ternary_operator.png)
*Real, multi-branch logic: `foo` checks two separate conditions, and `ternary` does the same thing in one line.*

```solidity
function foo(uint256 x) public pure returns (uint256) {
    if (x < 10) {
        return 0;
    } else if (x < 20) {
        return 1;
    } else {
        return 2;
    }
}
```

Tested live: `9` returns `0`, `18` returns `1`, and `30` returns `2` —
exactly matching each branch of the real condition chain.

## The shorthand: the ternary operator

The exact same two-branch logic can be written in one line using `?` and
`:`:

```solidity
function ternary(uint256 _x) public pure returns (uint256) {
    return _x < 10 ? 1 : 2;
}
```

Read it as: *"if `_x` is less than 10, return 1 — otherwise, return
2."* Same real result, far less code.

## Key terms

| Term | Meaning |
|---|---|
| pure | A function that reads and writes no contract state at all |
| if / else if / else | Real branching logic — run different code depending on a condition |
| Ternary operator | `condition ? valueIfTrue : valueIfFalse` — shorthand for a simple if/else |

## Check yourself

You've finished Chapter 5 when you can rewrite the `checkAge` function
using the ternary operator instead of a full if/else block, entirely on
your own.
