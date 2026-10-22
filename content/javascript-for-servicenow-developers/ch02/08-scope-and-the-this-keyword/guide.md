# Lesson 8 — Scope & the this Keyword

**Chapter 2 · JavaScript for Server-Side Scripting · Lesson 8 of 32**

## What you'll learn

- The real difference between `var` (function-scoped, hoisted) and `let`/`const` (block-scoped)
- Why referencing a `let` or `const` variable before its declaration line throws an error, where `var` silently returns `undefined`
- How `this` is determined in a regular function — by how the function is called, not where it's written
- Why `this` can point somewhere unexpected inside a callback, like an array's `.forEach()` callback
- Why switching that callback to an arrow function is the standard, practical fix

## var vs. let/const: scope and hoisting

`var` is function-scoped: a variable declared with `var` anywhere inside a function is visible throughout that entire function, even outside the block (like an `if` or `while`) where it was declared. `var` declarations are also hoisted — JavaScript moves the declaration, not the assignment, to the top of the function behind the scenes, so referencing a `var` before its line doesn't throw, it just returns `undefined`.

```javascript
function checkPriority(gr) {
    if (gr.priority == 1) {
        var isUrgent = true;
    }
    gs.log(isUrgent); // true — var leaked out of the if block
}
```

`let` and `const` are block-scoped: they only exist inside the `{ }` block where they're declared — an `if`, a `for` loop, a function body. Referencing one before its declaration line throws a real error rather than quietly returning `undefined`, because the variable isn't usable yet even though JavaScript already knows it exists in that block.

```javascript
function checkPriority(gr) {
    if (gr.priority == 1) {
        let isUrgent = true;
        gs.log(isUrgent); // fine — isUrgent only exists in this block
    }
    // gs.log(isUrgent); // would throw — isUrgent doesn't exist out here
}
```

In practice: prefer `let` and `const` in new server-side code. They catch real bugs — like the `var` leaking out of the `if` block above — at the moment you write them, instead of silently producing `undefined` somewhere downstream.

## this depends on how a function is called

In a regular (non-arrow) function, `this` is not fixed by where the function is written — it's determined by how the function is *called*. Call a method on an object, and `this` inside that method refers to the object. Pass that same function as a callback (to `.forEach()`, to a timer, to another function), and `this` can end up referring to something completely different.

```javascript
var utils = {
    label: 'Utils',
    logEach: function (items) {
        items.forEach(function (item) {
            gs.log(this.label + ': ' + item); // this is NOT utils here
        });
    }
};
utils.logEach(['a', 'b']);
// this.label is undefined — the forEach callback's `this` isn't utils
```

That's a real, common bug: the inner function passed to `.forEach()` is called by `.forEach()` itself, not by `utils`, so `this` inside it is not `utils`.

## Arrow functions inherit this lexically

An arrow function does not get its own `this` at all. It uses whatever `this` was in the enclosing scope at the point where the arrow function was written — this is called inheriting `this` lexically. That's exactly what fixes the bug above:

```javascript
var utils = {
    label: 'Utils',
    logEach: function (items) {
        items.forEach((item) => {
            gs.log(this.label + ': ' + item); // this is utils — inherited from logEach
        });
    }
};
utils.logEach(['a', 'b']);
// Utils: a
// Utils: b
```

Nothing else changed — only the inner function became an arrow function. Because arrow functions don't redefine `this`, the one from `logEach` (where `this` correctly is `utils`) carries through into the callback.

## Where this actually bites in ServiceNow scripts

This exact pattern shows up constantly in Script Includes: a method loops over an array or a result set and calls `.forEach()`, or passes a helper function somewhere, intending to reference `this.someProperty` inside. If that inner function is written the old way (`function (item) {...}`), `this` silently stops meaning what the developer expects. Rewriting the callback as an arrow function is the real, standard fix — not renaming variables, not adding `.bind()` everywhere (though `.bind(this)` is an older, valid alternative to the same problem).

## Key terms

| Term | Meaning |
|---|---|
| Function scope | A `var` is visible anywhere inside the function where it's declared, even outside nested blocks |
| Block scope | A `let`/`const` only exists inside the `{ }` block where it's declared |
| Hoisting | JavaScript moves a `var` declaration to the top of its function; using it early returns `undefined`, not an error |
| `this` (dynamic) | In a regular function, `this` is determined by how the function is called, not where it's written |
| Lexical `this` | An arrow function has no `this` of its own — it inherits `this` from its enclosing scope |

## Check yourself

You inherit a Script Include where a `.forEach()` callback references `this.recordCount` and it always logs `undefined`. Without changing anything else, what single change to that callback's function would most likely fix it, and why?
