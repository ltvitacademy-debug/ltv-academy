# Lesson 10 — Template Literals

**Chapter 2 · Modern JavaScript · Lesson 10 of 39**

## What you'll learn

- Template literal syntax: backticks and `${}` interpolation
- Why template literals replace most string concatenation with `+`
- Multi-line strings, without the awkward `\n` escapes
- Tagged templates — a brief look at what they are, since you'll see the name in library docs

## Backticks and interpolation

```js
const name = "Ana";
const balance = 500n;

// Old way — string concatenation
const old = "Hello, " + name + ". Balance: " + balance + " wei";

// Template literal — backticks and ${} interpolation
const modern = `Hello, ${name}. Balance: ${balance} wei`;
```

A template literal uses backticks (`` ` ``) instead of quotes. Anything
inside `${ }` is a real JavaScript expression — not just a variable name —
that gets evaluated and inserted into the string. This replaces almost
every use of `+` concatenation in modern code, because it's far easier to
read at a glance which parts are literal text and which are data.

## Expressions inside ${}, not just variables

```js
const price = 10;
const quantity = 3;

console.log(`Total: $${price * quantity}`); // "Total: $30"
console.log(`Status: ${price > 5 ? "expensive" : "cheap"}`); // "Status: expensive"
```

`${ }` isn't limited to a plain variable — any valid JavaScript expression
works inside it, including math and even a ternary. This is routinely used
to format blockchain values for display, like converting raw wei into a
human-readable string in one line.

## Multi-line strings

```js
const message = `Transaction confirmed.
From: ${name}
Amount: ${balance} wei`;
```

A template literal can span multiple lines directly in the source code —
line breaks inside the backticks become real line breaks in the string, no
`\n` escape sequences required. Trying this with regular quotes is either
impossible or requires exactly that awkward `\n` syntax.

## Tagged templates, briefly

```js
function shout(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? "").toString().toUpperCase(), "");
}

shout`hello ${name}`; // a function processes the template before it's a string
```

A "tagged template" is a template literal immediately preceded by a
function name — the function receives the literal pieces and interpolated
values separately, before they're combined into a final string. This is
rare to write yourself as a beginner, but the term appears in library
documentation (some blockchain tooling uses it for safely building raw
SQL-like queries), so it's worth recognizing the name.

## Key terms

| Term | Meaning |
|---|---|
| Template literal | A string written with backticks, supporting `${}` interpolation |
| Interpolation | Inserting the result of an expression directly into a string |

## Check yourself

You're ready for Lesson 11 when you can write a template literal with two
interpolated values, one of which is a small expression (not just a bare
variable).
