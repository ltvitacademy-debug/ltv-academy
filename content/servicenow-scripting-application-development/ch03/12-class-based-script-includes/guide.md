# Lesson 12 — Class-Based Script Includes

**Chapter 3 · Script Includes · Lesson 12 of 37**

## What you'll learn

- The real `Class.create()` pattern ServiceNow developers write, piece by piece
- What `.prototype` actually defines, and why it reads closer to classical OOP than raw JavaScript
- Why `initialize` is the constructor, and exactly when it runs
- Why the trailing `type` property is required, not optional style
- How to read and write a complete class-based Script Include with confidence

## The pattern, in full

JavaScript for ServiceNow Developers showed you Script Includes at an
introductory level — mostly as a named container for a function or
two. Here's the real, standard pattern almost every production
Script Include on a real instance follows:

```javascript
var IncidentUtils = Class.create();
IncidentUtils.prototype = {
    initialize: function() {
        this.priorityThreshold = 2; // 1 = Critical, 2 = High
    },

    isHighPriority: function(gr) {
        return parseInt(gr.getValue('priority'), 10) <= this.priorityThreshold;
    },

    getOpenDurationHours: function(gr) {
        var opened = new GlideDateTime(gr.getValue('opened_at'));
        var now = new GlideDateTime();
        return gs.dateDiff(opened.getDisplayValue(), now.getDisplayValue(), true) / 3600;
    },

    type: 'IncidentUtils'
};
```

A caller uses it exactly like any other object:

```javascript
var utils = new IncidentUtils();
if (utils.isHighPriority(current)) {
    current.work_notes = 'Flagged as high priority on open.';
}
```

## Breaking down each piece

**`Class.create()`** is a real ServiceNow platform API (defined in a
global Script Include ServiceNow ships) that returns a constructor
function. Calling `new IncidentUtils()` later invokes that returned
constructor.

**`IncidentUtils.prototype = { ... }`** replaces the constructor's
default prototype with an object literal listing every method the
class has. This is deliberately closer to classical, Java-style OOP
than writing raw JavaScript prototype assignments one property at a
time — you see the whole class shape in one object.

**`initialize: function() { ... }`** is the constructor. It runs
automatically the instant `new IncidentUtils()` executes — not when
you call a method later, but immediately at construction. Use it to
set default property values the rest of the class depends on, the
way `priorityThreshold` is set above before any method reads it.

**`type: 'IncidentUtils'`** is a real, required ServiceNow
convention — not decoration. It's a string naming the class, matching
the variable name exactly, and the platform's internal reflection
uses it to identify the class correctly (for example, when logging
errors or when another part of the platform needs to know what kind
of object it's holding). Leaving it off, or letting it drift out of
sync with the actual class name after a rename, is a real, common bug.

## Key terms

| Term | Meaning |
|---|---|
| `Class.create()` | ServiceNow's API that returns a constructor function for a new class |
| `.prototype` | The object literal listing every method (and the constructor) the class provides |
| `initialize` | The constructor method; runs automatically the moment `new ClassName()` executes |
| `type` | A required string property matching the class name, used by the platform's internal reflection |

## Check yourself

Without looking back: if you renamed `IncidentUtils` to
`IncidentHelper` everywhere it's declared and called, but forgot to
update the `type: 'IncidentUtils'` line, would the code still run?
What's the real risk of leaving that mismatch in place?
