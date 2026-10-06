# Lesson 23 — Functions With Types

**Chapter 4 · TypeScript Fundamentals · Lesson 23 of 39**

## What you'll learn

- Typing parameters and return values
- Why you can usually skip the return-type annotation
- Optional (`?`) parameters vs. default values
- Typing a function itself, as a value — useful for callbacks
- Where typed callbacks show up constantly in real code

## Parameters and return type

```ts
function add(a: number, b: number): number {
  return a + b;
}

const sum: number = add(2, 3);
```

Each parameter gets its own `: type` annotation. The return type goes after
the parameter list's closing parenthesis, before the function body.

## Usually inferred, not required

```ts
function add(a: number, b: number) {
  return a + b; // TypeScript infers: number
}
```

TypeScript can usually infer a simple return type on its own. Annotating
it explicitly is optional — but still common on exported functions, purely
for readability.

## Optional and default parameters

```ts
function connect(url: string, timeoutMs?: number) { /* ... */ }
function connect(url: string, timeoutMs: number = 5000) { /* ... */ }
```

A `?` makes a parameter optional — it comes through as `undefined` if the
caller omits it. A default value also makes a parameter optional, but
fills in a real value when it's left out.

## Typing a function itself

```ts
let onConfirm: (txHash: string) => void;

onConfirm = (txHash) => console.log("Confirmed:", txHash);
onConfirm = (txHash, extra) => {}; // Error: too many parameters
```

A **function type** describes the parameter types and return type any
function assigned to that variable must match. A mismatch is caught at the
assignment — not later, whenever the function actually gets called.

## Where this shows up constantly

| Context | Example |
|---|---|
| Event handlers | `onClick: (e: Event) => void` |
| Array methods | `.map()`'s callback is already typed for you, based on the array's element type |
| Contract event listeners | A typed callback whose arguments match the event's ABI definition |

## Key terms

| Term | Meaning |
|---|---|
| Return type annotation | `: type` after a function's parameter list, describing what it returns |
| Type inference | TypeScript figuring out a type on its own, without an explicit annotation |
| Optional parameter | `name?: type` — may be omitted, comes through as `undefined` |
| Function type | A type describing a function's required parameter types and return type |

## Lab

1. Write `function multiply(a: number, b: number): number` and call it, then remove the return-type annotation and confirm TypeScript still infers it correctly.
2. Write a function with one required parameter and one optional parameter, and call it both with and without the optional one.
3. Declare a variable typed `(amount: bigint) => void` and assign two different arrow functions to it — one matching, one with the wrong parameter type — and read the error on the second.

## Check yourself

You're ready for Lesson 24 when you can explain the difference between an
optional parameter (`?`) and a default-valued parameter, and write the
function-type syntax for a callback that takes a `string` and returns
`void`.
