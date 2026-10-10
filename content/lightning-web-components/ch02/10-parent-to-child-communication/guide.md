# Lesson 10 — Parent to Child Communication

**Chapter 2 · Connecting Components · Lesson 10 of 33**

## What you'll learn

- The standard pattern for a parent passing data down to a child: `@api` properties
- How a parent can also call a public method on a child directly
- How to get a reference to a child component from the parent
- Why this direction of communication never uses events

## Properties flow down through @api

The entire mechanism for parent-to-child communication is the `@api` decorator from Lesson 6, used from the other side: the parent sets values on the child's public properties through HTML attributes in its own template.

```js
// contactCard.js (child)
import { LightningElement, api } from 'lwc';

export default class ContactCard extends LightningElement {
    @api contactName;
    @api title = 'Contact';
}
```

```html
<!-- parent's template -->
<c-contact-card contact-name={selectedContact.Name}></c-contact-card>
```

Whenever `selectedContact` changes in the parent, the new value flows down into the child's `contactName` property automatically, and the child's template re-renders. This is a one-way flow: the parent sets, the child reads. If the child needs to change what it's displaying, that's a separate concern handled by Lesson 11's upward communication, not by the child mutating its own `@api` property.

## Calling a public method on a child

`@api` can also mark a method, which lets a parent trigger behavior on a specific child directly, rather than only passing data:

```js
// childForm.js
export default class ChildForm extends LightningElement {
    @api
    focusFirstField() {
        const input = this.template.querySelector('lightning-input');
        if (input) {
            input.focus();
        }
    }
}
```

A parent calls this through a reference to the rendered child element (see below), not through the template's data-binding syntax — public methods aren't invoked with `{}` the way properties are displayed.

## Getting a reference to a child

To call a public method, or to read a value directly off a child instance, the parent needs an actual reference to the rendered child element. The standard way is `this.template.querySelector`, typically from inside `renderedCallback()` or an event handler, targeting the child's tag name or a CSS selector:

```js
// parent.js
handleFocusClick() {
    const childForm = this.template.querySelector('c-child-form');
    if (childForm) {
        childForm.focusFirstField();
    }
}
```

Giving the child a unique identifier to query by (a class, or in newer API versions, an `lwc:ref` attribute paired with `this.refs`) is useful once a parent renders more than one instance of the same child component and needs to target a specific one.

## Why events don't flow downward

Events in LWC are deliberately a one-directional mechanism — they're for a component telling the outside world something happened, which naturally flows upward from where the thing happened toward whoever's listening. A parent could technically simulate "sending an event down," but there's no platform support for it, because it isn't the right tool for the job: a parent already has direct access to the child's public properties and methods, which is a simpler and more explicit way to hand data or trigger behavior downward than routing it through an event the child would have to dispatch on itself and then listen for.

## Key terms

| Term | Meaning |
|---|---|
| `@api` property | A child's public field, set by the parent through an HTML attribute |
| `@api` method | A child's public method, callable directly by a parent holding a reference to it |
| One-way data flow | Properties flow down from parent to child; the child does not mutate what it was given |
| `this.template.querySelector` | How a parent obtains a reference to a specific rendered child element |

## Lab

Design a parent component `caseDetailPanel` and a child `caseStatusBadge` with an `@api status` property and an `@api` method `pulse()` that briefly highlights the badge. Write the parent's template passing `status` down, and write the parent method that calls `pulse()` on the child via `this.template.querySelector`. Explain why `pulse()` can't be invoked from the template the way `status` is displayed.

## Check yourself

Can you explain the direction properties flow between a parent and child, and why it only goes one way? Can you write the syntax for a parent calling a public method on a specific child instance? Can you say why LWC doesn't support events flowing from parent down to child?
