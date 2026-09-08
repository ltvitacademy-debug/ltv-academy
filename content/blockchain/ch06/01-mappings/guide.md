# Lesson 1 — Mappings: Solidity's Key-Value Store

**Chapter 6 · Token Standards · Lesson 1 of 1**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What a mapping actually is, using a real phone-book analogy
- The real syntax: `get`, `set`, and `remove` functions on a mapping
- Why mappings can't be looped through, unlike arrays
- What a nested mapping actually looks like

## Why this matters for the rest of this chapter

Every token standard covered in this chapter — from a simple balance
tracker to a full ERC-20 — depends on exactly one core data structure to
track who owns what: **the mapping**. This lesson is the real foundation
everything else in Chapter 6 builds on.

## A mapping is a real phone book

> "A mapping in Solidity is like a dictionary or a phone book. It lets
> you store and look up values using a key. Each key is mapped to a
> specific value."

If **Alice** is the key, her phone number is the value. In Solidity,
this becomes:

```solidity
mapping(string => string) public phoneBook;
```

The real syntax is always: **`mapping(keyType => valueType) visibility
name;`**

## get, set, and remove — the real functions

![The complete real mapping contract from class: `mapping(address => uint256) public myMap;`, with `get`, `set`, and `remove` functions — and their real gas costs.](/courses/blockchain/ch06/01-mappings/shot_mapping_get_set_remove.png)
*The exact real pattern behind every token balance you'll write in this chapter.*

```solidity
mapping(address => uint256) public myMap;

function get(address _addr) public view returns (uint256) {
    // Mapping always returns a value.
    // If the value was never set, it returns a default value.
    return myMap[_addr];
}

function set(address _addr, uint256 _i) public {
    myMap[_addr] = _i;
}

function remove(address _addr) public {
    // Reset the value to the default value
    delete myMap[_addr];
}
```

This is real, working code — and it is *exactly* the shape a token's
balance tracker takes: an address (a person's account) mapped to a
`uint256` (how much they hold).

Tested live: setting an address's value to `555`, then calling `get`
on that same address, correctly returned `555`. Calling `remove`
reset it back to its default of `0` — proof that **`delete` doesn't
erase the mapping itself, only that one key's value.**

## The real limitation: no looping

> "Mappings do not store keys — only values. You cannot loop through a
> mapping. Solidity doesn't store a list of all keys."

This is a genuinely important constraint: if you need to list every
address that's ever held a balance, a mapping alone can't do it — you'd
need a separate array tracking the keys.

## Nested mappings: a mapping inside a mapping

![The real nested mapping syntax from class: `mapping(address => mapping(uint256 => bool)) public nested;`](/courses/blockchain/ch06/01-mappings/shot_nested_mapping.png)
*A mapping whose value is itself another mapping — read the `=>` as an arrow, not a comparison.*

```solidity
mapping(address => mapping(uint256 => bool)) public nested;
```

Read the `=>` as a literal arrow, not a mathematical comparison: an
**address** points to *another mapping*, which itself maps a
**`uint256`** to a **`bool`**. A real, if slightly mind-bending example
from class of what one path through this might represent: address
`0x...` → `123` → `true`.

## Key terms

| Term | Meaning |
|---|---|
| Mapping | A key-value store — like a dictionary or phone book |
| delete | Resets a mapping's value at a given key back to its default |
| Nested mapping | A mapping whose value is itself another mapping |

## Check yourself

You've finished this lesson when you can explain, in your own words, why
`mapping(address => uint256) public balances;` is the exact real
structure a token contract needs to track how much each account holds.
