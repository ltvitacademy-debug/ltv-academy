# Lesson 4 — Structs: Grouping Related Data

**Chapter 6 · Token Standards · Lesson 4 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What a struct actually is, using a real paper-form analogy
- How to build, populate, and read a real Person struct
- How structs combine with arrays and mappings — the exact pattern behind real token records
- A real, live demo of two different accounts getting two different results from the same function

## A struct is a real paper form

> "Imagine you're filling out a paper form at the doctor's office. You
> need to add your name, your age, your address, and your phone number.
> All of those fields belong together. They describe one person. A
> struct in Solidity works the same way."

A **struct** is a custom data type that groups related variables
together — your own type of object or record.

## Building a real Person struct

```solidity
struct Person {
    string name;
    uint age;
    address wallet;
}

Person public person1;

function setPerson() public {
    person1 = Person("Alice", 30, msg.sender);
}

function getName() public view returns (string memory) {
    return person1.name;
}
```

![The real setPerson and getName functions from class, showing the dot syntax used to read one specific field off a struct.](/courses/blockchain/ch06/04-structs/shot_person_struct_functions.png)
*Real, working code: setting every field of a struct at once, then reading just one of them back with dot syntax.*

Tested live: calling `getName()` before `setPerson()` returns nothing
(the struct's fields are all still at their defaults). After calling
`setPerson()`, `getName()` correctly returns `"Alice"`, and reading the
whole `person1` struct returns all three fields — name, age, and
wallet — together.

## The real combination: a struct inside a mapping

![The exact real pattern behind token-style records: `mapping(address => Person) public directory;` — one struct per address.](/courses/blockchain/ch06/04-structs/shot_struct_mapping_directory.png)
*A struct combined with a mapping — one complete record per address, looked up instantly by key.*

```solidity
struct Person {
    string name;
    uint age;
}

mapping(address => Person) public directory;

function addPerson(string memory _name, uint _age) public {
    directory[msg.sender] = Person(_name, _age);
}

function getMyInfo() public view returns (string memory, uint) {
    Person memory me = directory[msg.sender];
    return (me.name, me.age);
}
```

This is a genuinely important real pattern: **`msg.sender` as the
mapping's key** means every account automatically gets its own,
separate record — nobody can accidentally read or overwrite anyone
else's.

**Demonstrated live with two different accounts**: calling `addPerson`
as one account stored `"Carol", 56`; switching to a *different* account
and calling `addPerson` again stored `"Alice", 57` — completely
separately. Calling `getMyInfo()` from each account correctly returned
only that account's own data.

## Why this matters for token standards

This exact shape — **a struct describing one record, stored per-address
in a mapping** — is the real foundation behind more advanced token
patterns you'll meet later in this course, like tracking metadata for
an individual NFT or a staking position per account.

## Key terms

| Term | Meaning |
|---|---|
| Struct | A custom data type grouping multiple related fields into one unit |
| Dot syntax | Accessing one field of a struct, like `person1.name` |
| mapping(address => Struct) | One complete record per account, keyed by address |

## Check yourself

You've finished Chapter 6 when you can explain, in your own words, why
using `msg.sender` as the key in `directory[msg.sender]` guarantees each
account only ever sees and modifies its own record.
