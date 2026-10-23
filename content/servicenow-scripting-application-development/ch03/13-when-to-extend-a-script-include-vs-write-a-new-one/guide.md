# Lesson 13 — When to Extend a Script Include vs. Write a New One

**Chapter 3 · Script Includes · Lesson 13 of 37**

## What you'll learn

- The real ServiceNow inheritance pattern using `Object.extendsObject()`
- How to call a parent class's `initialize` from a child — the real "calling super"
- A concrete, working example: a general class extended by a more specific one
- Real decision guidance: when a new class should extend an existing one
- Real decision guidance: when it should be its own, brand-new class instead

## The real inheritance pattern

Building on Lesson 12's `IncidentUtils`, here's a more specific class
that extends it:

```javascript
var PriorityIncidentUtils = Class.create();
PriorityIncidentUtils.prototype = Object.extendsObject(IncidentUtils, {
    initialize: function() {
        IncidentUtils.prototype.initialize.call(this);
        this.escalationHours = 4;
    },

    needsEscalation: function(gr) {
        return this.isHighPriority(gr) &&
            this.getOpenDurationHours(gr) > this.escalationHours;
    },

    type: 'PriorityIncidentUtils'
});
```

```javascript
var pUtils = new PriorityIncidentUtils();
if (pUtils.needsEscalation(current)) {
    current.escalation = 2; // Overdue
}
```

## Breaking down the inheritance

**`Object.extendsObject(IncidentUtils, { ... })`** is the real
ServiceNow API for prototype-based inheritance. The first argument is
the parent class; the second is an object literal with the child's
own methods. The result becomes `PriorityIncidentUtils.prototype` —
so `PriorityIncidentUtils` now has every method `IncidentUtils` had
(`isHighPriority`, `getOpenDurationHours`), plus its own
`needsEscalation`.

**`IncidentUtils.prototype.initialize.call(this)`** is the real
pattern for "calling super" in ServiceNow's class style. There's no
`super()` keyword here — you explicitly reach into the parent class's
prototype, grab its `initialize` method, and call it with `this` set
to the current (child) instance. That line runs the parent's setup
(`priorityThreshold = 2`) before the child adds its own
(`escalationHours = 4`). Skip that line, and the child silently loses
whatever the parent's constructor was supposed to set up.

## When to extend, and when not to

Extend an existing class when the new class **is a** more specific
version of it, and should inherit most of its behavior unchanged.
`PriorityIncidentUtils` *is an* `IncidentUtils` — it does everything
`IncidentUtils` does, plus escalation logic layered on top. That's a
real, meaningful parent-child relationship: shared state
(`priorityThreshold`), shared methods (`isHighPriority`), and a
genuine specialization.

Write a brand-new, unrelated class when the functionality doesn't
share that relationship — even if it happens to touch the same
table. A Script Include for formatting incident numbers for a report
and a Script Include for routing incidents to assignment groups both
work with the Incident table, but neither *is a* more specific
version of the other. Forcing an inheritance relationship between
them just to avoid writing two classes creates a false dependency:
a change meant for one purpose can now break the other.

## Key terms

| Term | Meaning |
|---|---|
| `Object.extendsObject()` | ServiceNow's real API for prototype-based inheritance between two classes |
| Calling super | Explicitly calling `ParentClass.prototype.initialize.call(this)` from the child's `initialize` |
| IS-A relationship | The real test for extending: the child is a more specific version of the parent |
| False dependency | Forcing unrelated classes into an inheritance relationship they don't actually have |

## Check yourself

Without looking back: in the `PriorityIncidentUtils` example, what
breaks if the line
`IncidentUtils.prototype.initialize.call(this);` is removed entirely,
and why does the mistake only show up once `isHighPriority` is
actually called?
