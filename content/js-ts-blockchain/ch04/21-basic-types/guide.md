# Lesson 21 — Basic Types

**Chapter 4 · TypeScript Fundamentals · Lesson 21 of 39**

## What you'll learn

- The five primitive types: `string`, `number`, `boolean`, `null`, `undefined`
- Typing arrays with `number[]` / `Array<string>`, and fixed-shape tuples
- Why `bigint` exists, and why blockchain code needs it for wei values
- `any` vs `unknown` — and why `unknown` is almost always the better choice
- `void` and `never`

## The primitives

```ts
let name: string = "Ava";
let age: number = 29;
let isActive: boolean = true;
let nothing: null = null;
let notSet: undefined = undefined;
```

TypeScript doesn't separate integers from floats — `number` covers every
numeric value. `null` and `undefined` each get their own exact type,
matching JavaScript's own distinction between "intentionally empty" and
"never set."

## Arrays and tuples

```ts
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Ava", "Leo"];
let pair: [string, number] = ["ETH", 2531.14];
```

`number[]` (equivalent to `Array<number>`) describes an array of any
length, every element the same type. A **tuple** (`[string, number]`) is
stricter: it fixes both the exact length and the type at each position.

## Why wei values need bigint

```ts
let maxSafe: number = Number.MAX_SAFE_INTEGER; // 9_007_199_254_740_991
let weiAmount: bigint = 1_000_000_000_000_000_000n;
// a number literally can't hold this precisely
```

JavaScript's `number` can't safely represent integers beyond
`Number.MAX_SAFE_INTEGER`. Wei values (the smallest unit of ether) or raw
amounts of an 18-decimal token routinely exceed that for any real amount.
`bigint` — written with a trailing `n` — holds arbitrarily large integers
with no precision loss.

## any vs unknown

```ts
let loose: any = fetchSomething();
loose.whatever.goes(); // compiles, even if wrong

let safe: unknown = fetchSomething();
safe.whatever(); // Error: 'safe' is of type 'unknown'
```

`any` turns off type checking entirely for that value — it quietly defeats
the point of using TypeScript. `unknown` also accepts any value, but
**forces you to narrow it** (check its actual type) before you're allowed
to use it. Prefer `unknown` whenever you're tempted to reach for `any`.

## void and never

| Type | Describes |
|---|---|
| `void` | A function that doesn't return anything meaningful |
| `never` | A function that never returns at all — it always throws, or loops forever |

## Key terms

| Term | Meaning |
|---|---|
| Primitive | A basic built-in type: `string`, `number`, `boolean`, `null`, `undefined` |
| Tuple | An array type with a fixed length and a specific type at each position |
| `bigint` | A numeric type for arbitrarily large integers, written with a trailing `n` |
| `unknown` | Accepts any value but requires narrowing before use — the safe alternative to `any` |

## Lab

1. Declare a tuple representing a token transfer as `[string, string, bigint]` (from, to, amount) and assign it a value.
2. Declare a variable as `unknown`, then try to call a method on it directly — read the compiler error, then fix it by checking `typeof` first.
3. Write a `bigint` literal for 2.5 ETH in wei (2,500,000,000,000,000,000) and confirm `number` can't represent it exactly.

## Check yourself

You're ready for Lesson 22 when you can explain why `unknown` is generally
safer than `any`, and why wei amounts are typed `bigint` instead of
`number`.
