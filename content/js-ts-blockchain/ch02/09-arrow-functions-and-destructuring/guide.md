# Lesson 9 — Arrow Functions & Destructuring

**Chapter 2 · Modern JavaScript · Lesson 9 of 39**

## What you'll learn

- Arrow function syntax, including the implicit-return shorthand that shows up everywhere
- The real, practical difference between arrow functions and regular functions: how each one treats `this`
- Array destructuring — pulling values out of an array by position
- Object destructuring — pulling values out of an object by name, including renaming and defaults

## Arrow function syntax

```js
// Regular function
function double(n) {
  return n * 2;
}

// Arrow function, equivalent
const double2 = (n) => {
  return n * 2;
};

// Arrow function, implicit return (no braces, no "return")
const double3 = (n) => n * 2;
```

Arrow functions are shorter to write, and with a single expression body
(no `{ }`), the `return` is implicit — whatever the expression evaluates to
is automatically returned. This compact form is extremely common in real
code, especially passed as an argument to another function.

## The real difference: how `this` behaves

```js
class Wallet {
  constructor(balance) {
    this.balance = balance;
  }

  // Arrow function: "this" is inherited from the surrounding class, correctly
  logLater = () => {
    setTimeout(() => console.log(this.balance), 100);
  };
}
```

Arrow functions don't have their own `this` — they inherit it from
whatever scope they're written inside, at the time they're defined. Regular
functions get their own `this`, which depends on *how* they're called and
frequently isn't what you expect inside a callback. This is the actual
reason arrow functions are preferred for callbacks, not just that they're
shorter to type.

## Array destructuring

```js
const coords = [10, 20, 30];
const [x, y, z] = coords;

console.log(x, y, z); // 10 20 30

const [first, , third] = coords; // skip the middle one
console.log(first, third);       // 10 30
```

Destructuring pulls values out of an array into named variables, by
position, in one line — instead of writing `coords[0]`, `coords[1]`,
`coords[2]` separately.

## Object destructuring

```js
const transaction = { from: "0xAb12...", to: "0xCd34...", value: 100n };

const { from, to } = transaction;
console.log(from, to); // "0xAb12..." "0xCd34..."

const { value: amount } = transaction; // rename while destructuring
const { gasPrice = 0n } = transaction; // default if missing
```

Object destructuring pulls properties out by name instead of position.
You can rename a property while pulling it out (`value: amount`), and
supply a default value that only applies if the property is missing or
`undefined`.

## Key terms

| Term | Meaning |
|---|---|
| Implicit return | An arrow function with no `{ }` body automatically returns its expression's result |
| Lexical `this` | Arrow functions inherit `this` from their surrounding scope instead of having their own |

## Check yourself

You're ready for Lesson 10 when you can destructure two named properties
out of an object in one line, and explain why an arrow function is the
safer choice inside a class method's callback.
