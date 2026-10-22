# Lesson 1 — Variables & Data Types

**Chapter 1 · JavaScript Fundamentals · Lesson 1 of 32**

## What you'll learn

- The real difference between `var`, `let`, and `const` — scoping, not just style
- Why ServiceNow's legacy server-side scripts conventionally use `var`
- The primitive types JavaScript gives you, and the one famous quirk among them
- How to use `typeof` to check what you're actually holding

## Three ways to declare a variable

JavaScript gives you three keywords for creating a variable: `var`, `let`,
and `const`. They are not interchangeable — each one scopes the variable
differently, and that difference causes real bugs if you don't know it.

`var` is **function-scoped**. A variable declared with `var` anywhere inside
a function is visible throughout that entire function, even outside the
block (`if`, `for`, `while`) where it was declared:

```javascript
function checkPriority(priority) {
  if (priority === 1) {
    var message = "Critical — page the on-call engineer";
  }
  console.log(message); // still accessible here, even outside the if-block
}
```

`let` and `const` are **block-scoped**. A variable declared with either one
only exists inside the nearest set of curly braces `{ }` — the `if` block,
the `for` loop, the function, whichever is closest:

```javascript
function checkPriority(priority) {
  if (priority === 1) {
    let message = "Critical — page the on-call engineer";
    console.log(message); // fine, still inside the block
  }
  console.log(message); // ReferenceError: message is not defined
}
```

The difference between `let` and `const` is simpler: `const` means the
variable can never be reassigned after its first value. `let` can be
reassigned as many times as you want.

```javascript
let retryCount = 0;
retryCount = retryCount + 1; // fine — let allows reassignment

const maxRetries = 3;
maxRetries = 5; // TypeError: Assignment to constant variable.
```

Note that `const` does not make an object or array *immutable* — it only
locks the variable binding itself. A `const` array can still have items
pushed into it; it just can't be pointed at a different array entirely.

## Why ServiceNow scripts still use `var` so often

If you open existing Business Rules or Script Includes on almost any
ServiceNow instance, you will see `var` everywhere, rarely `let` or `const`.
That's not an accident or bad habit — it's history. ServiceNow's server-side
scripting engine was built for years on **Rhino**, an older JavaScript engine
that never supported `let` and `const` at all. Chapter 2 of this course
covers that engine in depth, including the newer GraalVM runtime that
ServiceNow now offers, which *does* support modern syntax. For now, just
know this: on a modern instance, `let` and `const` work fine in your own
scripts, but you will be reading a lot of existing `var`-based code, so you
need to be fluent in both styles.

## The types a variable can hold

JavaScript variables aren't declared with a fixed type — the value you
assign carries its own type. There are five **primitive** types plus one
catch-all reference type:

```javascript
var ticketNumber = "INC0010042"; // String
var reopenCount = 2;             // Number
var isEscalated = true;          // Boolean
var assignedTo = null;           // deliberately "no value"
var resolvedAt;                  // undefined — declared, never assigned
var record = { priority: 1 };    // Object
```

`undefined` means a variable exists but was never given a value. `null`
means a developer deliberately set it to "nothing." They look similar but
mean different things, and code that checks for one won't automatically
catch the other.

## Checking a value's type with `typeof`

The `typeof` operator tells you what kind of value you're holding, which
matters constantly once you start working with data coming back from
ServiceNow APIs later in this course — you'll often need to confirm a field
actually came back as a string before working with it.

```javascript
typeof "INC0010042";   // "string"
typeof 2;               // "number"
typeof true;            // "boolean"
typeof undefined;       // "undefined"
typeof { priority: 1 }; // "object"
typeof null;            // "object"  <-- the famous JavaScript quirk
```

That last line is not a mistake — `typeof null` really does return
`"object"`, a bug baked into the language since 1995 that can never be
fixed without breaking the entire web. When you need to specifically detect
`null`, compare the value directly (`assignedTo === null`) rather than
relying on `typeof`.

## Key terms

| Term | Meaning |
|---|---|
| `var` | Function-scoped variable declaration; visible throughout the whole function |
| `let` | Block-scoped variable declaration; can be reassigned |
| `const` | Block-scoped variable declaration; cannot be reassigned after its first value |
| Primitive type | String, Number, Boolean, null, or undefined — a value, not a reference |
| `typeof` | Operator that returns a string naming a value's type |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does
a `var` declared inside an `if` block stay accessible after that block ends,
while a `let` declared the same way does not — and what does `typeof null`
actually return?
