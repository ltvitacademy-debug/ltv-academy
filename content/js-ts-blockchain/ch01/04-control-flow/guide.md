# Lesson 4 — Control Flow

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 4 of 39**

## What you'll learn

- How `if`/`else` lets a script make decisions instead of running the same way every time
- The crucial difference between `==` and `===`, and why this course only ever uses one of them
- `switch` as a cleaner alternative when you're checking one value against many possibilities
- The two loop forms you'll actually use: `for` and `while`

## if / else: making a decision

```js
const balance = 0;

if (balance > 0) {
  console.log("Funds available");
} else {
  console.log("Wallet is empty");
}
```

A script that always does the same thing isn't very useful. `if`/`else`
branches based on a condition — here, whether `balance` is greater than
zero. Only one branch ever runs.

## == vs. ===: always use the triple

```js
"5" == 5;    // true  -- loose equality converts types first, surprising
"5" === 5;   // false -- strict equality, no conversion, the honest answer

0 === 0;     // true
null === undefined; // false, even though == would say true
```

`==` quietly converts types before comparing, which produces results that
look like bugs (`"5" == 5` being `true`). `===` compares value *and* type
with no conversion. This course uses `===` exclusively — treat `==` as a
footgun to avoid, not a shortcut.

## switch: many possibilities, one value

```js
const network = "mainnet";

switch (network) {
  case "mainnet":
    console.log("Real funds — be careful");
    break;
  case "sepolia":
    console.log("Testnet — safe to experiment");
    break;
  default:
    console.log("Unknown network");
}
```

A `switch` checking one variable against several fixed values reads more
clearly than a long `if`/`else if`/`else if` chain. Don't forget `break` —
without it, execution "falls through" into the next case.

## Loops: for and while

```js
for (let i = 0; i < 3; i++) {
  console.log(`Block ${i}`);
}

let attempts = 0;
while (attempts < 3) {
  console.log("Retrying...");
  attempts++;
}
```

Use `for` when you know how many times you want to repeat something (like
looping over a fixed range). Use `while` when you're repeating until some
condition becomes false and you don't know the count in advance — like
retrying a failed network request.

## Key terms

| Term | Meaning |
|---|---|
| Strict equality (`===`) | Compares value and type with no automatic conversion |
| Fall-through | What happens in a `switch` case with no `break` — execution continues into the next case |

## Check yourself

You're ready for Lesson 5 when you can write an `if`/`else` that checks a
condition with `===`, and explain when you'd reach for a `for` loop instead
of a `while` loop.
