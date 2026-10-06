# Lesson 26 — Typing Blockchain Data Structures

**Chapter 5 · TypeScript for Blockchain Development · Lesson 26 of 39**

## What you'll learn

- Why raw on-chain values (addresses, hashes, wei amounts) deserve their own TypeScript types instead of plain `string`/`number`
- Why wei amounts must be typed as `bigint`, never `number`
- How to model a `Transaction` and a `Block` with interfaces
- How a "branded type" stops a random string from being accidentally passed where an `Address` is expected

## Primitive aliases for on-chain data

Ethereum data is full of hex strings that all *look* the same type (`string`) but mean very
different things: an address, a transaction hash, raw calldata. Plain `string` lets you pass any
of them anywhere, which is exactly how bugs happen. Start by giving each one its own name:

```ts
type Address = `0x${string}`;
type Hash = `0x${string}`;
type HexData = `0x${string}`;
type Wei = bigint;
```

The first three use a TypeScript **template literal type** — it's still a string under the hood,
but TypeScript now knows it has to start with `0x`. That alone catches a surprising number of
typos (`"1x4a3f..."` instead of `"0x4a3f..."`) at compile time instead of at runtime, three hours
into a debugging session.

## Why wei needs bigint, not number

A `number` in JavaScript is a 64-bit float and loses precision above 2^53. One ETH is
1,000,000,000,000,000,000 wei — comfortably past that line. Use `bigint` for every wei amount,
every gas value, every token amount in base units:

```ts
const balance: Wei = 2_500_000_000_000_000_000n; // 2.5 ETH, exact
const rounded: number = 2_500_000_000_000_000_000; // silently wrong above 2^53
```

Note the trailing `n` — that's what makes `2_500_000_000_000_000_000n` a `bigint` literal instead
of a `number` literal.

## Modeling a Transaction and a Block

Interfaces turn a loose JSON blob from an RPC call into something your editor can autocomplete
and your compiler can check:

```ts
interface Transaction {
  hash: Hash;
  from: Address;
  to: Address | null; // null for a contract-creation transaction
  value: Wei;
  nonce: number;
  blockNumber: number | null; // null while still pending
}

interface Block {
  number: number;
  hash: Hash;
  timestamp: number; // unix seconds
  transactions: Hash[];
}
```

`to: Address | null` and `blockNumber: number | null` aren't decoration — they capture real facts
about Ethereum: a contract-creation transaction has no `to`, and a pending transaction has no
`blockNumber` yet. Modeling that forces every piece of code that reads these fields to handle
the `null` case instead of crashing on it in production.

## Branded types: stopping the mix-up

The template literal alias above still lets any `0x...` string pass as an `Address` — including a
transaction hash that happens to also start with `0x`. A **branded type** adds a fake, compile-time-only
tag so the two can't be confused:

```ts
type Address = string & { readonly __brand: "Address" };
type TxHash = string & { readonly __brand: "TxHash" };

function toAddress(s: string): Address {
  return s as Address; // the one place you're allowed to cast
}

function sendTo(addr: Address) { /* ... */ }

sendTo(toAddress(someAddressString)); // fine
sendTo(someTxHashString);             // compile error — not an Address
```

Nothing about this exists at runtime — it's erased when TypeScript compiles to JavaScript. It's
pure compile-time insurance that costs you one small `toAddress()` helper.

## Key terms

| Term | Meaning |
|---|---|
| Template literal type | A string type narrowed to a pattern, e.g. `` `0x${string}` `` |
| `bigint` | Arbitrary-precision integer type — required for wei/gas/token amounts |
| Branded type | A type with a fake compile-time tag that prevents mixing up two string-based types |
| `Address \| null` | A union that forces callers to handle the "no value" case |

## Lab

1. Write `type Address`, `type Hash`, and `type Wei` using the patterns above.
2. Write a `Transaction` interface with at least `hash`, `from`, `to`, `value`, and `blockNumber`.
3. Add a branded `Address` type plus a `toAddress()` helper, and prove in a comment why
   `sendTo(txHashString)` now fails to compile.

## Check yourself

You're ready for Lesson 27 when you can explain, without looking it up, why wei amounts must be
`bigint` and not `number`, and what a branded type buys you that a plain template literal type
doesn't.
