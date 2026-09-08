# Lesson 2 — Arrays & Enums

**Chapter 6 · Token Standards · Lesson 2 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- The real difference between a fixed-size and a dynamic array
- The three most common real array operations: push, index, length
- What an enum actually is, and why it makes code safer
- Why arrays and enums both matter for token contracts specifically

## Arrays: an ordered list, two real flavors

![The real slide from class: array types and the three most common operations — push, indexing, and length.](/courses/blockchain/ch06/02-arrays-enums/shot_arrays_slide.png)
*Arrays: an ordered list of items, with two real size options.*

An **array** is an ordered list of items. Solidity gives you two real
kinds:

- **Fixed-size**: `uint[5] numbers;` — locked to exactly 5 entries,
  forever.
- **Dynamic**: `uint[] public numbers;` — no size limit; it grows as you
  add to it.

### The three real operations you'll use constantly

```solidity
numbers.push(1);        // adds 1 to the end of the array
uint x = numbers[0];     // reads the value at index 0 (the first entry)
numbers.length;          // returns how many entries the array currently has
```

The instructor's real analogy: think of an **egg carton**. If you have
six eggs, each one has an index — but indexes always **start at zero**.
So six eggs occupy indexes `0` through `5`, not `1` through `6`.

## Enums: naming a fixed set of states

![The real slide from class: an enum defining shipping status, and how to read and assign one of its values.](/courses/blockchain/ch06/02-arrays-enums/shot_enums_slide.png)
*Enums: a real, safer way to represent a fixed set of named states.*

An **enum** is a user-defined type that assigns real names to a set of
integer values — improving both code clarity and safety over just using
raw numbers.

```solidity
enum Status { Pending, Shipped, Delivered }
Status public status;

status = Status.Shipped;
```

Instead of remembering that `"1 means shipped"` somewhere in your head,
the code itself says `Status.Shipped` — unambiguous, and impossible to
accidentally set to some invalid number outside the defined set.

## Why both of these matter for this chapter

Arrays and enums both show up constantly once you start building real
token contracts:

- **Arrays** are how you'd track something like *every address that
  currently holds a token* — since, as the previous lesson covered,
  mappings alone can't be looped through.
- **Enums** are a real, common way to represent a token's lifecycle
  state — for example, `enum SaleState { NotStarted, Active, Ended }`
  on a token sale contract.

## Key terms

| Term | Meaning |
|---|---|
| Fixed-size array | An array with a locked-in maximum length, set at declaration |
| Dynamic array | An array with no size limit, that grows as you push to it |
| Enum | A user-defined type naming a fixed set of integer values |

## Check yourself

You've finished this lesson when you can explain, in your own words, why
an enum like `Status.Shipped` is safer to use in real code than just
writing the raw number `1`.
