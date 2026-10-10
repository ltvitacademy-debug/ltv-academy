# Lesson 4 — JavaScript Fundamentals

**Chapter 1 · Component Basics · Lesson 4 of 33**

## What you'll learn

- Why every LWC component class extends `LightningElement`
- The strict rules around what a component's `constructor()` can and can't do
- How to define fields and methods on a component class
- How a component class connects back to its template without any extra wiring code

## LightningElement is the base class

Every LWC component's JavaScript file exports a single class that extends `LightningElement`, imported from the built-in `lwc` module:

```js
import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'Hello';
}
```

`LightningElement` is what gives your class its Salesforce-flavored superpowers — reactivity, decorators like `@api`/`@wire`, lifecycle hooks, and a `this.template` reference to the component's own rendered DOM. Under the hood, `LightningElement` itself is built on the browser's native `HTMLElement`, which is why an LWC component behaves like, and can be treated as, a real DOM element.

## The constructor's strict rules

If you define a `constructor()`, it must call `super()` as its very first statement — this is a hard JavaScript rule for any class extending another class, not something specific to LWC. Beyond that, the constructor runs *before* the component is connected to the DOM, so you cannot read attribute values passed from a parent, and you cannot touch `this.template` or any child elements yet:

```js
constructor() {
    super();
    // OK: initialize plain internal state
    this.internalCounter = 0;
    // NOT safe here: this.template.querySelector(...) — nothing is rendered yet
}
```

In practice, most components never need a constructor at all — class field initializers (like `greeting = 'Hello'` above) cover simple default values, and `connectedCallback()` (covered in Lesson 14) is the right place for logic that needs the component to actually exist in the DOM.

## Fields and methods

A component class is still a plain JavaScript class: fields hold data, methods hold behavior, and both are written exactly the way you'd write them in any ES6 class:

```js
export default class ContactCard extends LightningElement {
    firstName = 'Ada';
    lastName = 'Lovelace';

    handleEdit() {
        this.isEditing = true;
    }
}
```

What makes these fields special in LWC is not their syntax — it's that the framework watches them. Any field referenced by the template (directly, or through a getter) is automatically tracked, and the template re-renders when that field's value changes. You don't call a "render" or "setState" method yourself the way you might in some other frameworks; assignment alone (`this.isEditing = true;`) is enough to trigger a re-render of anything depending on `isEditing`.

## No manual wiring between class and template

Because the `.js` and `.html` files in a bundle share the same component name, the framework automatically connects them — there's no import statement or registration call linking a class to its template. Whatever the class exposes as a property, getter, or method, the matching template file can reference directly by name. This tight, convention-based coupling is part of why LWC bundles stay small and predictable: once you know the naming rule, you always know exactly which files belong together.

## Key terms

| Term | Meaning |
|---|---|
| `LightningElement` | The base class every LWC component extends, built on native `HTMLElement` |
| `constructor()` | The class method that runs before the component is connected to the DOM; rarely needed directly |
| `super()` | The call every constructor must make first when extending another class |
| Class field | A property defined directly on the class, optionally with a default value |
| Reactive tracking | The framework's automatic re-rendering of anything depending on a field that changes |

## Lab

Write (on paper or in a scratch file, no deploy needed) a component class named `greetingCard` that extends `LightningElement`, defines two fields `firstName` and `lastName` with default values, and a method `handleReset()` that sets both back to empty strings. Identify which of those three members (the two fields, the one method) could safely be referenced from the template without any extra decorator, and explain why none of them need a constructor to work.

## Check yourself

Can you explain what rule governs the very first line of any constructor that extends another class? Can you name two things you should never do inside an LWC component's constructor, and why? Can you describe, in your own words, how the framework knows to re-render a template when a class field changes?
