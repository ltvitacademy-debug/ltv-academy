# Lesson 22 — Interfaces & Type Aliases

**Chapter 4 · TypeScript Fundamentals · Lesson 22 of 39**

## What you'll learn

- Naming an object's shape with `interface`
- Optional (`?`) and `readonly` properties
- Naming the same shape (and more) with `type`
- The one real structural difference: declaration merging
- A simple rule for which to reach for

## Giving shape to an object

```ts
interface Wallet {
  address: string;
  balance: number;
  isConnected: boolean;
}

const w: Wallet = { address: "0xAbC...", balance: 2.5, isConnected: true };
```

An `interface` names the shape a value must have: every required property,
and its type. An object missing a property, or with a mismatched type on
one, is rejected by the compiler.

## Optional and readonly properties

```ts
interface Wallet {
  address: string;
  nickname?: string;       // optional — can be omitted
  readonly chainId: number; // can be set once, never reassigned
}
```

A `?` after a property name makes it optional. `readonly` lets code read
the property freely but blocks reassigning it after the object is created.

## type does the same job, differently

```ts
type Wallet = {
  address: string;
  balance: number;
};

type Address = string;
type TxStatus = "pending" | "confirmed" | "failed";
```

A `type` alias can describe an object shape with nearly identical syntax to
an `interface` — but it can also name a primitive (`Address`), or a
**union** of specific allowed values (`TxStatus`), which `interface` simply
cannot express.

## Declaration merging — interface's one real edge

```ts
interface Wallet { address: string; }
interface Wallet { balance: number; }
// merges into: { address: string; balance: number; }

type Dup = { a: string };
type Dup = { b: number }; // Error: Duplicate identifier 'Dup'
```

Declaring the same `interface` name twice **merges** the two declarations'
members — useful when extending a type from a library. The same trick with
`type` is a compiler error.

## Which one to reach for

| Situation | Use |
|---|---|
| Shaping a plain object | Either works — many teams default to `interface` |
| A union, primitive alias, or tuple | `type` — `interface` can't express these |

## Key terms

| Term | Meaning |
|---|---|
| `interface` | Names an object's required shape; can be re-declared to merge members |
| `type` alias | Names any type — object shape, primitive, union, tuple — but can't be re-declared with the same name |
| Union type | A type allowing one of several specific values, written `"a" \| "b" \| "c"` |
| Declaration merging | TypeScript combining multiple `interface` declarations of the same name into one |

## Lab

1. Define a `Transaction` interface with `hash: string`, `amount: bigint`, and an optional `memo?: string`.
2. Add a `readonly` `blockNumber: number` to it and confirm the compiler rejects reassigning it after creation.
3. Define a `type TxStatus = "pending" | "confirmed" | "failed"` and try writing the same thing as an `interface` — confirm it doesn't compile.

## Check yourself

You're ready for Lesson 23 when you can explain what declaration merging
is, and name one thing a `type` alias can do that an `interface` cannot.
