# Lesson 24 — Generics, Basics

**Chapter 4 · TypeScript Fundamentals · Lesson 24 of 39**

## What you'll learn

- The type-information problem `any` creates for a reusable function
- How a generic placeholder (`<T>`) preserves that information per call
- Reading generic syntax: `<T>`, `arr: T[]`, `: T`
- Functions with more than one type parameter
- Why blockchain libraries lean heavily on generics

## The problem any creates

```ts
function first(arr: any[]): any {
  return arr[0];
}

const n = first([1, 2, 3]);   // typed any — lost the number
const s = first(["a", "b"]);  // also any — lost the string
```

`any` works for every array, but it throws away exactly the type
information you wanted back — both calls return `any`, no matter what was
actually passed in.

## A generic keeps that information

```ts
function first<T>(arr: T[]): T {
  return arr[0];
}

const n = first([1, 2, 3]);   // typed number
const s = first(["a", "b"]);  // typed string
```

`T` is a **placeholder type**, filled in per call site. TypeScript infers
it from the argument — no manual annotation needed, and each call keeps
its own correct, specific type.

## Reading the syntax

| Piece | Meaning |
|---|---|
| `<T>` | Declares a placeholder type available inside this function |
| `arr: T[]` | The parameter is an array of whatever `T` turns out to be |
| `: T` | The return type matches that same `T` |

## More than one placeholder

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const p = pair("balance", 2.5); // [string, number]
```

A generic function can take several type parameters at once — each one
inferred independently from its own argument.

## Why blockchain libraries lean on this

```ts
async function callContract<T>(method: string, args: unknown[]): Promise<T> {
  return contract[method](...args);
}

const balance = await callContract<bigint>("balanceOf", [address]);
```

One function handles calling any method on any contract, while the
**caller** still gets back a correctly typed result (`bigint` here) for
that specific call — rather than everyone settling for `any`.

## Key terms

| Term | Meaning |
|---|---|
| Generic | A function, type, or class parameterized by a placeholder type, filled in per use |
| Type parameter (`<T>`) | The placeholder itself, declared in angle brackets |
| Type inference (generics) | TypeScript determining `T` automatically from the argument passed, with no explicit annotation |

## Lab

1. Write a generic function `last<T>(arr: T[]): T` that returns an array's last element, and call it with both a number array and a string array.
2. Write a generic function with two type parameters that swaps and returns a tuple, e.g. `swap<A, B>(pair: [A, B]): [B, A]`.
3. Explicitly specify a type parameter at a call site, e.g. `first<number>([1, 2, 3])`, and confirm it still compiles the same as letting it infer.

## Check yourself

You're ready for Lesson 25 when you can explain, in one sentence, why
`function first<T>(arr: T[]): T` preserves type information that
`function first(arr: any[]): any` throws away.
