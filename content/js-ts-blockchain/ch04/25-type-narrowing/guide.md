# Lesson 25 — Type Narrowing

**Chapter 4 · TypeScript Fundamentals · Lesson 25 of 39**

## What you'll learn

- Why a union type like `string | number` blocks you from using either type's specific methods
- Narrowing with `typeof`
- Narrowing with `instanceof` and `Array.isArray`
- Discriminated unions — narrowing a whole object from one shared field
- The four narrowing tools you'll use most

## A broader type, unproven

```ts
function formatAmount(value: string | number) {
  return value.toFixed(2); // Error: 'toFixed' doesn't exist on 'string'
}
```

`toFixed` only exists on `number`. Since `value` could be either type here,
TypeScript refuses to let you call a `number`-only method until it's
certain which one you actually have.

## typeof narrows it

```ts
function formatAmount(value: string | number) {
  if (typeof value === "number") {
    return value.toFixed(2); // value is now just 'number' here
  }
  return value; // value is now just 'string' here
}
```

Inside the `if` block, TypeScript **proves** `value` is a `number` and
narrows it there — no cast, no `any` required. Outside that block, it
narrows to `string` instead.

## instanceof and Array.isArray

```ts
function describe(err: Error | string) {
  if (err instanceof Error) return err.message;
  return err;
}

function sum(input: number | number[]) {
  if (Array.isArray(input)) return input.reduce((a, b) => a + b, 0);
  return input;
}
```

`typeof` only covers primitives. `instanceof` narrows class instances
(`err instanceof Error`); `Array.isArray` narrows arrays specifically,
since `typeof` on an array unhelpfully just returns `"object"`.

## A discriminated union

```ts
type TxResult =
  | { status: "confirmed"; blockNumber: number }
  | { status: "failed"; reason: string };

function handle(result: TxResult) {
  if (result.status === "confirmed") return result.blockNumber;
  return result.reason; // TypeScript knows only 'reason' exists here
}
```

A shared literal field (`status`) lets TypeScript narrow the **entire
object** from one check — not just that one field — so `blockNumber` and
`reason` are each only accessible in their correct branch.

## The four narrowing tools

| Tool | Narrows |
|---|---|
| `typeof` | Primitives: `string`, `number`, `boolean` |
| `instanceof` | Class instances, like `Error` |
| `Array.isArray` | Confirms specifically an array |
| Discriminated unions | A shared literal field narrows the whole object |

## Key terms

| Term | Meaning |
|---|---|
| Narrowing | Proving to the compiler, via a runtime check, which part of a broader type a value currently is |
| Union type | A type allowing one of several specific types, written `A \| B` |
| Discriminated union | A union of object types sharing one literal field used to distinguish them |

## Lab

1. Write a function taking `string | number[]` and use `Array.isArray` to branch and handle each case correctly.
2. Write a discriminated union with three variants (not two) sharing a `kind` field, and a function that handles all three with narrowing.
3. Remove a narrowing check from one of this lesson's examples and read the resulting compiler error.

## Check yourself

Chapter 4 is complete when you can explain why `typeof value === "number"`
narrows `value` inside that `if` block, and why `Array.isArray` is needed
instead of `typeof` to detect an array.
