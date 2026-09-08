# Lesson 3 — Arrays in Practice: push, pop & removeAtIndex

**Chapter 6 · Token Standards · Lesson 3 of 3**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- How to build a complete, working dynamic array contract from scratch
- The real difference between accessing, adding to, and reading the length of an array
- Why removing an item from the middle of an array is genuinely harder than it looks
- A real, working `require` statement guarding against an invalid index

## A complete, real dynamic array contract

![The four real functions built live in class: addNumber, getNumber, getAllNumbers, and getLength — each with its own real gas cost.](/courses/blockchain/ch06/03-arrays-in-practice/shot_dynamic_array_functions.png)
*A complete, working dynamic array — add, read by index, read the whole thing, and check its length.*

```solidity
uint[] public numbers;

function addNumber(uint _num) public {
    numbers.push(_num); // adds number to the end
}

function getNumber(uint _index) public view returns (uint) {
    return numbers[_index]; // access by index
}

function getAllNumbers() public view returns (uint[] memory) {
    return numbers;
}

function getLength() public view returns (uint) {
    return numbers.length;
}
```

Each function has a distinct, real job: `addNumber` grows the array,
`getNumber` reads one specific entry, `getAllNumbers` returns the whole
thing at once, and `getLength` reports how many entries currently
exist.

## Fixed-size arrays, briefly

The same class also covered a fixed-size version:

```solidity
uint[3] public data = [1, 2, 3];

function getSecond() public view returns (uint) {
    return data[1]; // returns 2 — remember, indexes start at 0
}
```

## The real problem: removing from the middle

Here's the genuinely tricky part. **You cannot push or pop on a
fixed-size array**, and even on a dynamic array, Solidity doesn't let
you directly remove a specific element and shrink the array in one
step. You have to build it yourself:

![The real, complete `removeAtIndex` function from class — shifting every element down by one, then popping off the now-duplicate last entry.](/courses/blockchain/ch06/03-arrays-in-practice/shot_removeatindex_function.png)
*A working solution to a genuinely tricky problem: removing an item from the middle of a dynamic array.*

```solidity
function removeAtIndex(uint _index) public {
    require(_index < numbers.length, "Invalid index");
    for (uint i = _index; i < numbers.length - 1; i++) {
        numbers[i] = numbers[i + 1];
    }
    numbers.pop();
}
```

This works in two real steps: first, a `for` loop **shifts every
element after the target index down by one position**, overwriting the
one you want gone. Then `numbers.pop()` removes the now-duplicated last
entry, shrinking the array by exactly one.

## require: a real, live guard rail

`require(_index < numbers.length, "Invalid index")` is a real safety
check — if someone calls this function with an index that doesn't
exist, the transaction reverts immediately with the message `"Invalid
index"`, instead of quietly doing something wrong.

## Why this matters for tokens specifically

The instructor named the real-world use cases directly: **token
balances, voting choices, whitelists, and history of actions** — every
one of these is commonly tracked with exactly the array patterns built
in this lesson.

## Key terms

| Term | Meaning |
|---|---|
| push / pop | Add to the end of a dynamic array / remove its last entry |
| require | A guard clause that reverts a transaction if a condition fails |
| removeAtIndex pattern | Shift elements down, then pop, to remove from the middle of an array |

## Check yourself

You've finished Chapter 6 when you can explain, in your own words, why
`removeAtIndex` needs a full `for` loop instead of just deleting one
element directly.
