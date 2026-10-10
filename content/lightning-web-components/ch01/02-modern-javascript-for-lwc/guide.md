# Lesson 2 — Modern JavaScript for LWC

**Chapter 1 · Component Basics · Lesson 2 of 33**

## What you'll learn

- Why LWC requires a working knowledge of ES6+ JavaScript, not "classic" ES5 syntax
- `const`/`let`, arrow functions, template literals, and destructuring — the syntax you'll see in nearly every component
- The `import`/`export` module system that every component file uses
- Promises and `async`/`await`, which you'll use constantly once you start calling Apex

## LWC is modern JavaScript, not a dialect

Unlike Aura, which wrapped a lot of its own syntax around JavaScript, LWC components are written in standard ES6+ (ECMAScript 2015 and later) JavaScript, compiled and run natively by the browser. There is no proprietary templating language to learn for the JavaScript side — the better you know current JavaScript, the faster you'll be productive in LWC. This lesson is a fast review of the specific features you'll lean on constantly.

## Declarations: const and let, never var

Modern JavaScript code (and every LWC example you'll see from Salesforce) uses `const` for values that won't be reassigned and `let` for values that will. `var` is avoided because of its looser scoping rules, which cause subtle bugs. In an LWC class, most fields are declared with no keyword at all (they're class properties), but inside methods, you'll use `const` and `let` throughout.

## Arrow functions and template literals

Arrow functions (`(x) => x * 2`) are shorter and, critically, don't rebind `this` the way a traditional `function` does — which matters a lot inside a class method where you need `this` to keep referring to the component instance:

```js
handleClick(event) {
    this.items.forEach((item) => {
        // `this` here still refers to the component, because arrow
        // functions don't create their own `this` binding
        console.log(this.label, item);
    });
}
```

Template literals (backtick strings) let you embed expressions directly in a string instead of concatenating with `+`:

```js
const greeting = `Hello, ${this.firstName} ${this.lastName}!`;
```

## Destructuring

Destructuring pulls values out of objects and arrays into named variables in one step. You'll see this constantly in wire adapter handlers:

```js
@wire(getRecord, { recordId: '$recordId', fields: FIELDS })
wiredAccount({ data, error }) {
    if (data) {
        this.account = data;
    } else if (error) {
        this.error = error;
    }
}
```

That `{ data, error }` parameter is destructuring the object the wire service passes in, giving you two clean local names instead of writing `result.data` and `result.error` everywhere.

## Modules: import and export

Every LWC JavaScript file is an ES module. A component's class is the module's default export, and the file imports whatever it depends on — the `LightningElement` base class, decorators, Apex methods, other modules:

```js
import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactList extends LightningElement {
    @api recordId;
}
```

Named imports (in curly braces) pull specific exports out of a module; a default import (no curly braces) pulls the module's single default export — which is exactly why `getContacts` above has no braces but `LightningElement` does.

## Promises and async/await

Salesforce's server calls — Apex methods, Lightning Data Service writes — are asynchronous and return Promises. You can handle them with `.then()`/`.catch()`, or with the cleaner `async`/`await` syntax, which lets asynchronous code read top-to-bottom like synchronous code:

```js
async handleSave() {
    try {
        const result = await createRecord(this.recordInput);
        this.recordId = result.id;
    } catch (error) {
        this.errorMessage = error.body.message;
    }
}
```

You'll use this pattern every time you call Apex imperatively or write through Lightning Data Service.

## Key terms

| Term | Meaning |
|---|---|
| `const` / `let` | Block-scoped variable declarations; `const` for values that won't be reassigned |
| Arrow function | A shorter function syntax that doesn't rebind `this` |
| Template literal | A backtick string supporting `${expression}` interpolation |
| Destructuring | Extracting named values out of an object or array in one step |
| ES module | A JavaScript file that uses `import`/`export` to share code |
| Promise / async / await | JavaScript's pattern for handling asynchronous operations like server calls |

## Lab

Open any text editor and write a small plain-JavaScript snippet (no Salesforce needed yet) that: declares an object `{ data: 'ok', error: null }`, destructures it into `data` and `error` variables in one line, and uses a template literal to log `` `Result: ${data}` ``. Then write an `async` function that wraps that object in `Promise.resolve(...)`, awaits it, and logs the destructured result — this is the exact shape of code you'll write for every Apex call in this course.

## Check yourself

Can you explain why arrow functions are preferred inside class methods that need to keep referring to `this`? Can you write a one-line destructuring statement that pulls `data` and `error` out of an object parameter? Can you describe the difference between a named import and a default import?
